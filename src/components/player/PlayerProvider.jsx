// The music player of the page: one song and one sound engine (engine.js).
//
// - The song starts by itself (`music.autoplay`). A browser gives no sound before the
//   first action of the visitor, so the start is the first click, tap or key on the
//   page. A pause by the visitor is kept for the visit: the song does not start again
//   by itself after it. Not with "save data" and not on a 2g connection.
// - The song is the last thing that the page loads. Nothing of it is asked for
//   while the page loads. 2.5 s after the `load` event, at the next idle moment,
//   the engine loads and decodes it, so the first play starts at once. Not with
//   "save data" and not on a 2g connection: there it loads on the first play.
// - The playhead of the engine is the one source of truth: `position()`. The ring
//   of the badge reads it each frame, so "the ring turns" and "the song plays"
//   cannot disagree.
// - The badge holds the disc with its hand: holdDisc(), moveDisc(), dropDisc().
// - The song loops: after its end it plays again from 0:00.
// - The loudness is one number, 0 to 1 (`volume`). It is kept for the visit (sessionStorage).
// - The system media keys work through the Media Session.
// With an empty address (`music.src`) the player is off: `enabled` is false and
// every action does nothing.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createEngine } from './engine.js';
import { music } from './playerText.js';

const noop = () => {};
const OFF = {
    enabled: false,
    playing: false,
    toggle: noop,
    restart: noop,
    seekBy: () => 0,
    holdDisc: () => 0,
    moveDisc: noop,
    dropDisc: noop,
    position: () => 0,
    travel: () => 0,
    duration: () => 0,
    onTime: () => noop,
    volume: 0,
    muted: false,
    setVolume: noop,
    toggleMute: noop,
};
const PlayerContext = createContext(OFF);

const VOLUME_KEY = 'kmads.volume';
const AUTO_KEY = 'kmads.autoplay';
// Keys that are no action on the page: the song does not start with them.
const QUIET_KEYS = new Set(['Tab', 'Escape', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'ContextMenu']);
const remember = (key, value) => {
    try { window.sessionStorage.setItem(key, value); } catch { /* no storage: it lives as long as the page */ }
};
const autoOff = () => {
    try { return window.sessionStorage.getItem(AUTO_KEY) === 'off'; } catch { return false; }
};
function storedVolume() {
    try {
        const raw = window.sessionStorage.getItem(VOLUME_KEY);
        const value = raw === null ? NaN : Number(raw);
        return value >= 0 && value <= 1 ? value : null;
    } catch {
        return null;
    }
}

/** The player of the page. Outside a PlayerProvider it is the player with no song. */
export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider({ children, src = music.src, engine: makeEngine = createEngine, autoplay = Boolean(music.autoplay) }) {
    const enabled = Boolean(src);
    const [playing, setPlaying] = useState(false);
    // The loudness: the level of the data at first, then what the visitor chose in this visit (not kept after it).
    const [volume, setVolumeState] = useState(() => storedVolume() ?? music.volume);
    const live = useRef({ playing: false, volume, last: volume || music.volume, auto: false });
    const engineRef = useRef(null);
    const listeners = useRef(new Set());

    const tell = useCallback(() => {
        for (const listener of listeners.current) listener();
    }, []);
    const setPlay = useCallback((value) => {
        live.current.playing = value;
        setPlaying(value);
        if ('mediaSession' in navigator) navigator.mediaSession.playbackState = value ? 'playing' : 'paused';
        tell();
    }, [tell]);

    /** The one engine. It is made on first need and it makes no request and no sound by being made. */
    const engine = useCallback(() => {
        if (!enabled) return null;
        engineRef.current ??= makeEngine({
            src,
            volume: live.current.volume,
            // The song plays again when it ends. The record engine loops by itself; this is for an engine that cannot.
            onEnd: () => {
                if (!live.current.playing) return;
                engineRef.current?.seek(0);
                Promise.resolve(engineRef.current?.play()).catch(() => setPlay(false));
            },
            onChange: tell,
        });
        return engineRef.current;
    }, [enabled, src, makeEngine, setPlay, tell]);

    const play = useCallback(() => {
        const e = engine();
        if (!e) return;
        setPlay(true);
        // A browser that refuses the sound, or a file that is not there: back to the paused state.
        Promise.resolve(e.play()).catch(() => setPlay(false));
    }, [engine, setPlay]);
    const pause = useCallback(() => {
        setPlay(false);
        engineRef.current?.pause();
    }, [setPlay]);
    /** The visitor's own play and pause. The choice is kept for the visit. */
    const toggle = useCallback(() => {
        // The same click that started the song by itself is not also a pause.
        if (live.current.auto) return;
        const next = !live.current.playing;
        remember(AUTO_KEY, next ? 'on' : 'off');
        if (next) play();
        else pause();
    }, [pause, play]);

    const seekTo = useCallback((time) => {
        const e = engine();
        if (!e) return 0;
        const end = e.duration();
        const to = Math.max(0, end ? Math.min(end, time) : time);
        e.seek(to);
        return to;
    }, [engine]);
    /** Move the playhead by `seconds`. Returns the seconds that it moved (less at an end of the song). */
    const seekBy = useCallback((seconds) => {
        const e = engine();
        if (!e) return 0;
        const from = e.position();
        return seekTo(from + seconds) - from;
    }, [engine, seekTo]);
    const restart = useCallback(() => {
        if (!engine()) return;
        seekTo(0);
        play();
    }, [engine, seekTo, play]);

    /** The hand is on the disc. Returns the playhead in seconds. */
    const holdDisc = useCallback(() => {
        const e = engine();
        if (!e) return 0;
        e.hold();
        return e.position();
    }, [engine]);
    /** The hand is at `time` of the song and turns at `rate` (1 = the play speed): the sound follows it. */
    const moveDisc = useCallback((time, rate) => engineRef.current?.hand(time, rate), []);
    /** The hand lets go at `time`: the disc goes back to the play speed, or it stops when the song is paused. */
    const dropDisc = useCallback((time) => {
        engineRef.current?.release(live.current.playing, time);
        tell();
    }, [tell]);

    const setVolume = useCallback((value) => {
        const level = Math.max(0, Math.min(1, Number(value) || 0));
        if (level > 0) live.current.last = level;
        live.current.volume = level;
        setVolumeState(level);
        engineRef.current?.setVolume(level);
        try { window.sessionStorage.setItem(VOLUME_KEY, String(level)); } catch { /* no storage: the level lives as long as the page */ }
    }, []);
    /** Sound off, or back to the last level that was not zero. */
    const toggleMute = useCallback(() => setVolume(live.current.volume > 0 ? 0 : live.current.last), [setVolume]);

    const position = useCallback(() => engineRef.current?.position() ?? 0, []);
    const travel = useCallback(() => engineRef.current?.travel?.() ?? engineRef.current?.position() ?? 0, []);
    const duration = useCallback(() => engineRef.current?.duration() ?? 0, []);
    const onTime = useCallback((listener) => {
        listeners.current.add(listener);
        return () => listeners.current.delete(listener);
    }, []);

    // The start by itself: the first action of the visitor on the page.
    useEffect(() => {
        if (!enabled || !autoplay || autoOff()) return undefined;
        const link = navigator.connection;
        if (link?.saveData || /(^|-)2g$/.test(link?.effectiveType ?? '')) return undefined;
        const stop = () => {
            window.removeEventListener('click', start, true);
            window.removeEventListener('keydown', start, true);
        };
        function start(event) {
            if (event.type === 'keydown' && QUIET_KEYS.has(event.key)) return;
            stop();
            if (live.current.playing || autoOff()) return;
            live.current.auto = true;
            window.setTimeout(() => { live.current.auto = false; }, 0);
            play();
        }
        window.addEventListener('click', start, true);
        window.addEventListener('keydown', start, true);
        return stop;
    }, [enabled, autoplay, play]);

    // Last to load: after the page is complete and the browser is idle, and only on a connection that can take it.
    useEffect(() => {
        if (!enabled) return undefined;
        let idle = 0;
        let timer = 0;
        const warm = () => {
            const link = navigator.connection;
            if (link?.saveData || /(^|-)2g$/.test(link?.effectiveType ?? '')) return;
            Promise.resolve(engine()?.warm()).catch(() => {});
        };
        // 2.5 s after `load` (the pictures and the fonts of the first screen are in), then the next idle moment.
        const wait = () => {
            timer = window.setTimeout(() => {
                if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(warm, { timeout: 2000 });
                else warm();
            }, 2500);
        };
        if (document.readyState === 'complete') wait();
        else window.addEventListener('load', wait, { once: true });
        return () => {
            window.removeEventListener('load', wait);
            window.cancelIdleCallback?.(idle);
            window.clearTimeout(timer);
        };
    }, [enabled, engine]);

    // The media keys of the system and of a headset.
    useEffect(() => {
        if (!enabled || !('mediaSession' in navigator)) return undefined;
        const session = navigator.mediaSession;
        if (typeof window.MediaMetadata === 'function') {
            // The credit that the artist asks for: his name and the album, where the system shows the song.
            session.metadata = new window.MediaMetadata({ title: music.title, artist: music.artist, album: music.album });
        }
        const stopByVisitor = () => {
            remember(AUTO_KEY, 'off');
            pause();
        };
        const handlers = {
            play,
            pause: stopByVisitor,
            stop: stopByVisitor,
            previoustrack: restart,
            seekbackward: (details) => seekBy(-(details?.seekOffset || 10)),
            seekforward: (details) => seekBy(details?.seekOffset || 10),
            seekto: (details) => seekTo(details?.seekTime ?? 0),
        };
        for (const [action, handler] of Object.entries(handlers)) {
            try { session.setActionHandler(action, handler); } catch { /* this browser does not know the action */ }
        }
        return () => {
            for (const action of Object.keys(handlers)) {
                try { session.setActionHandler(action, null); } catch { /* same */ }
            }
        };
    }, [enabled, play, pause, restart, seekBy, seekTo]);

    // The sound stops with the page that made it.
    useEffect(() => () => {
        engineRef.current?.destroy();
        engineRef.current = null;
    }, []);

    const value = useMemo(
        () => (enabled
            ? { enabled, playing, toggle, restart, seekBy, holdDisc, moveDisc, dropDisc, position, travel, duration, onTime, volume, muted: volume === 0, setVolume, toggleMute }
            : OFF),
        [enabled, playing, toggle, restart, seekBy, holdDisc, moveDisc, dropDisc, position, travel, duration, onTime, volume, setVolume, toggleMute],
    );
    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}
