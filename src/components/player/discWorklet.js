// The record player of the site, in the audio thread (an AudioWorkletProcessor).
// It holds the whole song as 16-bit samples and reads them at a rate that can
// change at any moment: 1 is normal play, 0.5 is slow and low, 2 is fast and
// high, a negative rate plays backwards, 0 is silence. This file has no import:
// the browser loads it alone.
//
// Messages in:
//   { type: 'pcm', channels: [ArrayBuffer of Int16...], rate }  the song (once)
//   { type: 'run', rate, tau, gain }   turn by itself: go to `rate` with the time constant `tau` (s).
//                                      gain: 1, 0, or 'coast' (as loud as the disc still turns)
//   { type: 'hand', pos, rate }        a hand holds the disc: be at `pos` (s), moving at `rate`
//   { type: 'seek', pos }              jump to `pos` (s) with a short fade
// Messages out: { pos, rate, time } each few blocks: the playhead. { ended: true } at the end of the song.
const HAND_TAU = 0.03;  // s: the rate follows the hand with this time constant, so it does not zip
const PULL_TAU = 0.08;  // s: the playhead goes to the exact place of the hand with this time constant
const GAIN_TAU = 0.002; // s: every change of loudness is a ramp of about 8 ms (4 time constants): no click
const MAX_RATE = 16;    // the rate of the motor and of the hand stays inside -16 to 16
const LOUD_RATE = 4;    // above 4 times the play speed the sound gets quieter, as a fast spin does
const STILL = 20;        // the sound is full from 1/20 of the play speed and fades to nothing below it
const REPORT = 4;       // blocks between two playhead messages (about 12 ms)

class Disc extends AudioWorkletProcessor {
    constructor() {
        super();
        this.channels = [];
        this.length = 0;
        this.pcmRate = sampleRate;
        this.pos = 0;        // in samples of the song
        this.rate = 0;
        this.goalRate = 0;
        this.tau = 0.02;
        this.goalPos = null; // a hand holds the disc when this is a number
        this.gain = 0;
        this.gainGoal = 0;
        this.coast = false;
        this.seekTo = null;
        this.blocks = 0;
        this.port.onmessage = (event) => this.on(event.data);
    }

    on(message) {
        if (message.type === 'pcm') {
            this.channels = message.channels.map((buffer) => new Int16Array(buffer));
            this.length = this.channels[0]?.length ?? 0;
            this.pcmRate = message.rate;
        } else if (message.type === 'run') {
            this.goalRate = Math.max(-MAX_RATE, Math.min(MAX_RATE, message.rate));
            this.tau = message.tau;
            this.goalPos = null;
            this.coast = message.gain === 'coast';
            if (!this.coast) this.gainGoal = message.gain;
        } else if (message.type === 'hand') {
            this.goalRate = Math.max(-MAX_RATE, Math.min(MAX_RATE, message.rate));
            this.tau = HAND_TAU;
            this.goalPos = message.pos * this.pcmRate;
            this.coast = false;
            this.gainGoal = 1;
        } else if (message.type === 'seek') {
            this.seekTo = Math.max(0, Math.min(this.length - 1, message.pos * this.pcmRate));
        }
    }

    process(inputs, outputs) {
        const out = outputs[0];
        const frames = out[0].length;
        const last = this.length - 1;
        if (last < 1) return true;
        const ratio = this.pcmRate / sampleRate;
        const kRate = 1 - Math.exp(-1 / (this.tau * sampleRate));
        const kPull = 1 - Math.exp(-1 / (PULL_TAU * sampleRate));
        const kGain = 1 - Math.exp(-1 / (GAIN_TAU * sampleRate));
        const left = this.channels[0];
        const right = this.channels[1] ?? left;
        let ended = false;

        for (let i = 0; i < frames; i += 1) {
            // A jump: fade out, move, fade in.
            if (this.seekTo !== null && this.gain < 0.002) {
                this.pos = this.seekTo;
                this.seekTo = null;
            }
            if (this.coast) this.gainGoal = Math.min(1, Math.abs(this.rate) * 5);
            this.gain += ((this.seekTo !== null ? 0 : this.gainGoal) - this.gain) * kGain;
            this.rate += (this.goalRate - this.rate) * kRate;

            const before = this.pos;
            this.pos += this.rate * ratio;
            if (this.goalPos !== null) {
                // The hand: the place under the hand moves on between two messages, and the playhead goes to it.
                this.goalPos = Math.max(0, Math.min(last, this.goalPos + this.goalRate * ratio));
                this.pos += (this.goalPos - this.pos) * kPull;
            }
            if (this.pos >= last) {
                this.pos = last;
                if (this.goalPos === null && this.rate > 0) {
                    // The end of the song: the motor stops.
                    this.rate = 0;
                    this.goalRate = 0;
                    this.gainGoal = 0;
                    this.coast = false;
                    ended = true;
                }
            } else if (this.pos <= 0) {
                this.pos = 0; // the start of the song: the disc is at its first groove and makes no sound there
            }

            const speed = Math.abs(this.pos - before) / ratio;
            // A disc that does not move makes no sound: without this, a still disc holds one sample value (a steady push on the speaker).
            const loud = this.gain * (speed > LOUD_RATE ? LOUD_RATE / speed : Math.min(1, speed * STILL));
            const at = Math.min(last - 1, Math.floor(this.pos));
            const mix = this.pos - at;
            out[0][i] = ((left[at] * (1 - mix) + left[at + 1] * mix) / 32768) * loud;
            if (out[1]) out[1][i] = ((right[at] * (1 - mix) + right[at + 1] * mix) / 32768) * loud;
        }

        this.blocks += 1;
        if (ended || this.blocks % REPORT === 0) {
            this.port.postMessage({ pos: this.pos / this.pcmRate, rate: this.rate, time: currentTime, ended });
        }
        return true;
    }
}

registerProcessor('disc', Disc);
