import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks.js';

const STEP_MS = 3200;

/**
 * State of one flowchart: which step is active and whether it plays.
 * It plays only while the chart is on screen, the pointer is not on it,
 * and the visitor did not ask for less motion.
 */
export function useFlowPlayer(count) {
    const ref = useRef(null);
    const [active, setActive] = useState(0);
    const [wantsPlay, setWantsPlay] = useState(true);
    const [held, setHeld] = useState(false);
    const inView = useInView(ref, { threshold: 0.35 });
    const reduced = useReducedMotion();
    const playing = wantsPlay && !reduced;
    const running = playing && inView && !held;

    useEffect(() => {
        if (!running) return undefined;
        const timer = window.setInterval(() => setActive((i) => (i + 1) % count), STEP_MS);
        return () => window.clearInterval(timer);
    }, [running, count]);

    const select = useCallback((index) => {
        setActive(((index % count) + count) % count);
        setWantsPlay(false);
    }, [count]);

    return {
        ref,
        active,
        playing,
        select,
        next: () => select(active + 1),
        prev: () => select(active - 1),
        toggle: () => setWantsPlay((value) => !value),
        hold: () => setHeld(true),
        release: () => setHeld(false),
        canPlay: !reduced,
    };
}
