// The frame of every illustration.
//
//   <Art label="What the picture shows" width={560} height={240}> ...SVG parts... </Art>
//
// It gives: the aspect ratio (no layout shift), role="img" with the label (or
// `decorative` to hide it from screen readers), the shared defs, and a context:
//   useArt() -> { playing, motion, paint, width, height }
//     playing  true while the art is on screen and motion is allowed
//     motion   false when the visitor asked for less motion
//     paint    url(#...) values: signal, dots, halftone, halftoneUp, halftoneRadial, arrow, arrowRed
// SMIL animations (Packet) stop while the art is off screen.
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '../../../hooks.js';
import ArtDefs from './ArtDefs.jsx';

const ArtContext = createContext({ playing: false, motion: false, paint: {}, width: 0, height: 0 });

export const useArt = () => useContext(ArtContext);

export default function Art({ label, width = 360, height = 240, decorative = false, className = '', children }) {
    const ref = useRef(null);
    const uid = `art${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
    const inView = useInView(ref, { threshold: 0.2 });
    const reduced = useReducedMotion();
    const motion = !reduced;
    const playing = motion && inView;

    useEffect(() => {
        const svg = ref.current?.querySelector('svg');
        if (!svg?.pauseAnimations) return;
        if (playing) svg.unpauseAnimations();
        else svg.pauseAnimations();
    }, [playing]);

    const value = useMemo(() => {
        const url = (name) => `url(#${uid}-${name})`;
        return {
            playing,
            motion,
            width,
            height,
            paint: {
                signal: url('signal'),
                dots: url('dots'),
                halftone: url('halftone'),
                halftoneUp: url('halftone-up'),
                halftoneRadial: url('halftone-radial'),
                arrow: url('arrow'),
                arrowRed: url('arrow-red'),
            },
        };
    }, [playing, motion, width, height, uid]);

    const a11y = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': label };
    return (
        <figure ref={ref} className={`art ${className}`.trim()} data-playing={playing ? 'true' : 'false'} style={{ aspectRatio: `${width} / ${height}` }}>
            <svg viewBox={`0 0 ${width} ${height}`} focusable="false" {...a11y}>
                <ArtDefs uid={uid} width={width} height={height} />
                <ArtContext.Provider value={value}>{children}</ArtContext.Provider>
            </svg>
        </figure>
    );
}

/**
 * A counter that goes 0, 1, ... count - 1 and starts again, one step each `ms`,
 * only while the art plays. For a mechanism with stages (a route, a pipeline).
 * With reduced motion it stays at `rest`.
 */
export function useStep(count, ms = 1200, rest = 0) {
    const { playing, motion } = useArt();
    const [step, setStep] = useState(rest);
    useEffect(() => {
        if (!playing) return undefined;
        const timer = window.setInterval(() => setStep((value) => (value + 1) % count), ms);
        return () => window.clearInterval(timer);
    }, [playing, count, ms]);
    return motion ? step : rest;
}
