// The sound engine of the music player, behind one small interface:
//
//   warm()             load the song now (called after the page load, never before)
//   play() / pause()   the motor. play() must be called inside a gesture of the visitor.
//   seek(seconds)      jump
//   hold()             a hand is on the disc
//   hand(seconds, rate) the hand is at this place of the song and turns at this rate (1 = play speed)
//   release(playing)   the hand lets go: the disc goes back to the play speed, or it stops
//   position()         the playhead in seconds: the ONE source of truth for the ring of the badge
//   travel()           the playhead plus the full songs already played (the song loops): the ring angle comes from this, so it never turns back at the loop
//   setVolume(0..1)    the loudness, changed with a short ramp
//   duration()         seconds, 0 while the song is not loaded
//   destroy()
// Callbacks: onEnd() only from an engine that cannot loop by itself, onChange() when the playhead or the length changed by a jump.
//
// Two engines have this interface:
//   - createDiscEngine: Web Audio. The song is decoded once and an AudioWorklet (discWorklet.js)
//     reads it at any rate, forward and backward. This is the record: the sound follows the hand.
//   - createElementEngine: an <audio> element, for a browser with no AudioWorklet. The sound
//     stops while the hand holds the disc and plays on from the new place after the release.
import workletUrl from './discWorklet.js?url';

export const PLATTER_TAU = 0.25; // s: the disc goes from the speed of the hand to the play speed with this time constant
const START_TAU = 0.02;          // s: play and pause take the motor at once
const DECODE_RATE = 44100;       // Hz: the song is kept at this rate

export { workletUrl };

/** True when this browser can run the record engine. */
export const canScratch = () => typeof window !== 'undefined'
    && typeof window.AudioContext === 'function'
    && typeof window.OfflineAudioContext === 'function'
    && typeof window.AudioWorkletNode === 'function';

/** Float samples to 16-bit: half the memory of the decoded song. */
export function toInt16(samples) {
    const out = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i += 1) out[i] = Math.max(-32768, Math.min(32767, Math.round(samples[i] * 32767)));
    return out;
}

export function createDiscEngine({ src, volume, onChange = () => {} }) {
    let context = null;
    let node = null;
    let pcm = null;       // { channels: [Int16Array], rate, seconds } until it is given to the worklet
    let seconds = 0;
    let loading = null;
    let wired = null;
    let dead = false;
    let want = { type: 'run', rate: 0, tau: START_TAU, gain: 0 }; // the last order, sent when the worklet is ready
    let head = { pos: 0, rate: 0, time: 0, laps: 0 };
    let gain = null;
    let level = volume;
    let pendingSeek = null;

    const post = (message) => {
        if (message.type !== 'seek') want = message;
        if (node && wired === true) node.port.postMessage(message);
    };

    /** Fetch and decode. No AudioContext that can make sound is needed for this, so it can run with no gesture. */
    const warm = () => {
        loading ??= (async () => {
            const response = await fetch(src);
            if (!response.ok) throw new Error(`song: HTTP ${response.status}`);
            const bytes = await response.arrayBuffer();
            const decoder = new window.OfflineAudioContext(2, 1, DECODE_RATE);
            const buffer = await decoder.decodeAudioData(bytes);
            const channels = [];
            for (let c = 0; c < Math.min(2, buffer.numberOfChannels); c += 1) channels.push(toInt16(buffer.getChannelData(c)));
            pcm = { channels, rate: buffer.sampleRate };
            seconds = buffer.duration;
            onChange();
        })();
        loading.catch(() => {});
        return loading;
    };

    /** Inside a gesture: make the context, then load the worklet and give it the song. */
    const wire = () => {
        if (wired !== null) return wired === true ? Promise.resolve() : wired;
        context = new window.AudioContext({ sampleRate: DECODE_RATE, latencyHint: 'interactive' });
        wired = (async () => {
            await Promise.all([context.audioWorklet.addModule(workletUrl), warm()]);
            if (dead) return;
            node = new window.AudioWorkletNode(context, 'disc', { numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2] });
            gain = context.createGain();
            gain.gain.value = level; // a gain node: it also works where an <audio> volume is ignored (iOS)
            node.connect(gain).connect(context.destination);
            node.port.onmessage = ({ data }) => {
                head = data;
            };
            const buffers = pcm.channels.map((channel) => channel.buffer);
            node.port.postMessage({ type: 'pcm', channels: buffers, rate: pcm.rate }, buffers); // moved, not copied
            pcm = null;
            wired = true;
            if (pendingSeek !== null) node.port.postMessage({ type: 'seek', pos: pendingSeek });
            pendingSeek = null;
            node.port.postMessage(want);
        })();
        wired.catch(() => { wired = null; });
        return wired;
    };
    const awake = () => {
        const ready = wire();
        if (context?.state === 'suspended') context.resume().catch(() => {});
        return ready;
    };

    const position = () => {
        if (pendingSeek !== null) return pendingSeek;
        const moved = context ? (context.currentTime - head.time) * head.rate : 0;
        return Math.max(0, Math.min(seconds || Infinity, head.pos + moved));
    };

    return {
        kind: 'disc',
        warm,
        play() {
            const ready = awake();
            if (seconds && position() >= seconds - 0.05) this.seek(0);
            post({ type: 'run', rate: 1, tau: START_TAU, gain: 1 });
            return ready;
        },
        pause() {
            post({ type: 'run', rate: 0, tau: START_TAU, gain: 0 });
        },
        seek(time) {
            const to = Math.max(0, seconds ? Math.min(seconds, time) : time);
            if (node && wired === true) {
                node.port.postMessage({ type: 'seek', pos: to });
                head = { ...head, pos: to, time: context.currentTime };
            } else {
                pendingSeek = to;
            }
            onChange();
        },
        hold() {
            awake();
        },
        hand(time, rate) {
            if (wired !== true) pendingSeek = Math.max(0, time); // the song is not loaded yet: keep the place of the hand
            post({ type: 'hand', pos: time, rate });
        },
        release(playing) {
            post({ type: 'run', rate: playing ? 1 : 0, tau: PLATTER_TAU, gain: playing ? 1 : 'coast' });
        },
        position,
        travel: () => position() + (head.laps || 0) * seconds,
        setVolume(value) {
            level = Math.max(0, Math.min(1, value));
            // A ramp of some tens of milliseconds: a moving slider makes no zipper noise.
            if (gain) gain.gain.setTargetAtTime(level, context.currentTime, 0.02);
        },
        duration: () => seconds,
        destroy() {
            dead = true;
            node?.disconnect();
            context?.close().catch(() => {});
        },
    };
}

export function createElementEngine({ src, volume, onEnd = () => {}, onChange = () => {} }) {
    let audio = null;
    let level = volume;
    let lastSeek = 0;
    let resume = false;
    const ensure = (preload = 'none') => {
        if (audio) return audio;
        audio = document.createElement('audio');
        audio.preload = preload;
        audio.src = src;
        audio.volume = level;
        audio.loop = true;
        audio.addEventListener('ended', onEnd);
        for (const type of ['seeked', 'durationchange']) audio.addEventListener(type, onChange);
        return audio;
    };
    const length = () => (Number.isFinite(audio?.duration) ? audio.duration : 0);
    const clamp = (time) => Math.max(0, length() ? Math.min(length(), time) : time);
    return {
        kind: 'element',
        warm: () => Promise.resolve(ensure('auto')),
        play: () => Promise.resolve(ensure().play()),
        pause: () => audio?.pause(),
        seek(time) {
            ensure().currentTime = clamp(time);
            onChange();
        },
        hold() {
            resume = !ensure().paused;
            audio.pause();
        },
        hand(time) {
            const now = performance.now();
            if (now - lastSeek < 80) return;
            lastSeek = now;
            audio.currentTime = clamp(time);
        },
        release(playing, time) {
            if (time !== undefined) audio.currentTime = clamp(time);
            if (playing && resume) Promise.resolve(audio.play()).catch(() => {});
            onChange();
        },
        position: () => audio?.currentTime ?? 0,
        travel: () => audio?.currentTime ?? 0,
        setVolume(value) {
            level = Math.max(0, Math.min(1, value));
            if (audio) audio.volume = level;
        },
        duration: length,
        destroy() {
            audio?.pause();
            audio = null;
        },
    };
}

/** The record engine where the browser can run it, else the plain one. */
export const createEngine = (options) => (canScratch() ? createDiscEngine(options) : createElementEngine(options));
