// Shared parts of the drawings of intro part B (clouds, cold start, pipelines, timeline).
//
// These drawings are fluid: the viewBox is as wide as the box that holds the
// drawing, so 1 unit is 1px at the base font size and a label of 11 units is
// never smaller than 11px. The layout is a function of that width. A narrow box
// gets the stacked layout, on a phone and also in a small tile on a wide screen.
import { useEffect, useLayoutEffect, useState } from 'react';
import { useArt } from './kit/index.js';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * The width of the box in design units (px at a 16px root), in steps of 4.
 * The root font size grows on very wide screens, and the drawing grows with it.
 */
export function useUnits(ref, { min = 232, max = 760 } = {}) {
    const [units, setUnits] = useState(() => (typeof window !== 'undefined' && window.matchMedia?.('(max-width: 599.98px)').matches ? Math.max(min, 304) : Math.min(max, 640)));
    useIsoLayoutEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const read = () => {
            const px = el.clientWidth;
            if (!px) return;
            const root = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
            const next = Math.min(max, Math.max(min, Math.floor((px * 16) / root / 4) * 4));
            setUnits((now) => (now === next ? now : next));
        };
        read();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const observer = new ResizeObserver(read);
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, min, max]);
    return units;
}

// Text measure without a canvas: advance of each character in em, by class.
// The numbers are a little wide on purpose, so that a line never overflows.
const NARROW = new Set(" .,:;'|!ilIjtfr()[]/-".split(''));
const WIDE = new Set('mwMW@%'.split(''));
function advance(ch) {
    if (NARROW.has(ch)) return 0.34;
    if (WIDE.has(ch)) return 0.9;
    if (ch >= 'A' && ch <= 'Z') return 0.7;
    if (ch >= '0' && ch <= '9') return 0.62;
    return 0.57;
}
/** Text styles of these drawings: [font size, kind]. `mono` is uppercase with tracking. */
export const TYPE = {
    name: { size: 13, lead: 17, mono: false },
    note: { size: 12, lead: 16, mono: false },
    mono: { size: 11, lead: 15, mono: true },
    head: { size: 16, lead: 20, mono: false },
};
export function measure(text, type) {
    const value = String(text);
    if (type.mono) return value.length * type.size * 0.665;
    let em = 0;
    for (const ch of value) em += advance(ch);
    return em * type.size;
}
/** Break a text into lines that fit `width` units. A word that is too long stays whole. */
export function wrap(text, width, type) {
    const lines = [];
    let line = '';
    for (const word of String(text).split(/\s+/)) {
        const next = line ? `${line} ${word}` : word;
        if (line && measure(next, type) > width) {
            lines.push(line);
            line = word;
        } else {
            line = next;
        }
    }
    if (line) lines.push(line);
    return lines;
}

/** Lines of text in an SVG. `y` is the baseline of the first line. */
export function Lines({ lines, x, y, type, className, anchor = 'start', ...rest }) {
    return (
        <text className={className} x={x} y={y} textAnchor={anchor} {...rest}>
            {lines.map((line, i) => (
                <tspan key={i} x={x} dy={i ? type.lead : 0}>{line}</tspan>
            ))}
        </text>
    );
}

/** A path with round corners through points that differ in x or in y, one axis at a time. */
export function elbow(all, r = 6) {
    const points = all.filter((p, i) => !i || p[0] !== all[i - 1][0] || p[1] !== all[i - 1][1]);
    let d = `M${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i += 1) {
        const [x, y] = points[i];
        const [px, py] = points[i - 1];
        const next = points[i + 1];
        if (!next) {
            d += `L${x} ${y}`;
            break;
        }
        const len = Math.hypot(x - px, y - py);
        const lenNext = Math.hypot(next[0] - x, next[1] - y);
        const k = Math.min(r, len / 2, lenNext / 2);
        const ax = x - ((x - px) / len) * k;
        const ay = y - ((y - py) / len) * k;
        const bx = x + ((next[0] - x) / lenNext) * k;
        const by = y + ((next[1] - y) / lenNext) * k;
        d += `L${ax.toFixed(1)} ${ay.toFixed(1)}Q${x} ${y} ${bx.toFixed(1)} ${by.toFixed(1)}`;
    }
    return d;
}

/**
 * A packet that goes once along the path `d` and stays at its end. It starts
 * when it is mounted (give it a `key` that changes with the step), so it is in
 * time with the step. tone: 'signal' (violet to blue) or 'mint'. Not drawn with reduced motion.
 */
export function Dot({ d, ms = 1000, tone = 'signal', r = 3.2 }) {
    const { motion } = useArt();
    if (!motion || !d) return null;
    return <circle className="artb-dot" data-tone={tone} r={r} style={{ offsetPath: `path("${d}")`, animationDuration: `${ms}ms` }} />;
}
