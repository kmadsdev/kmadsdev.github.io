// The numbers and the small maths of the disc (the ring of the badge).
// Angles are degrees, clockwise is positive, as on a record: clockwise = forward.

export const DISC = {
    secondsPerTurn: 20,   // one full turn of the ring = 20 seconds of the song (the song of 162.5 s is 8.1 turns)
    idleSpeed: -7.5,      // deg/s with no song: one turn in 48 s, against the clock, as before the player
    idleSettle: 0.45,     // s: with no song, the time constant with which the turn speed goes to its target
    grabDistance: 6,      // px on the arc after which the hand holds the disc (less is a press that shook)
    grabTime: 180,        // ms of press after which the hand holds the disc
    catchUp: 0.1,         // s: time constant with which the ring comes back to the playhead after a jump or a grab
    keyStep: 5,           // s for an arrow key
    pageStep: 20,         // s for a Page key: one turn
    globePaused: 0.84,    // size of the globe while the song is paused
    globePressed: 0.96,   // times the size while a finger is down on it
    springResponse: 0.35, // s
    springDamping: 0.8,   // a little overshoot: the globe is pressed by a hand
};

/** Degrees of turn for one second of the song. */
export const DEG_PER_SECOND = 360 / DISC.secondsPerTurn;

/** The angle of the ring for a playhead in seconds. This is the only way the ring gets its angle while the page has a song. */
export const angleOf = (seconds) => seconds * DEG_PER_SECOND;

/** The angle of the point (x, y) around (cx, cy), in degrees. Clockwise is positive on a screen. */
export const angleAt = (x, y, cx, cy) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI;

/** The short way from angle `from` to angle `to`: a step never jumps when the pointer crosses 180 degrees. */
export function turnBetween(from, to) {
    let d = to - from;
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    return d;
}

/** Turn speed (deg/s) of the hand from its last samples `[{ t, a }]`. A hand that stopped has no speed. */
export function handSpeed(samples, now) {
    if (samples.length < 2) return 0;
    const last = samples[samples.length - 1];
    if (now - last.t > 80) return 0;
    const first = samples.find((sample) => last.t - sample.t <= 120) ?? samples[0];
    const dt = (last.t - first.t) / 1000;
    return dt > 0.008 ? (last.a - first.a) / dt : 0;
}

/** One step of a damped spring. Returns [value, speed]. */
export function springStep(value, speed, target, dt, response = DISC.springResponse, damping = DISC.springDamping) {
    const w = (2 * Math.PI) / response;
    let v = speed;
    let x = value;
    // Small fixed steps: stable when a frame is late.
    for (let left = dt; left > 0; left -= 1 / 240) {
        const h = Math.min(left, 1 / 240);
        v += (-w * w * (x - target) - 2 * damping * w * v) * h;
        x += v * h;
    }
    return [x, v];
}

/** Seconds as m:ss. */
export function clock(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
