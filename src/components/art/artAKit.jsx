// Shared parts of the drawings of intro part A (request path, trace, contract
// states, margin check).
//
// Each drawing has two layouts: a wide one and a narrow one. The box that holds
// the drawing chooses the layout, not the screen: a small tile on a wide screen
// gets the narrow layout too.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * <Fit>{(narrow) => <Art ... />}</Fit>
 * `narrow` is true when the box is less than `limit` px wide.
 */
export function Fit({ limit = 560, children }) {
    const ref = useRef(null);
    const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(max-width: 599.98px)').matches));
    useIsoLayoutEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const read = () => {
            const px = el.clientWidth;
            if (px) setNarrow(px < limit);
        };
        read();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const observer = new ResizeObserver(read);
        observer.observe(el);
        return () => observer.disconnect();
    }, [limit]);
    return <div ref={ref} className="art-fit">{children(narrow)}</div>;
}

/** Breaks a text into lines of at most `max` characters, at the spaces. */
export function wrap(text, max) {
    const lines = [];
    let line = '';
    for (const word of String(text).split(' ')) {
        if (line && line.length + 1 + word.length > max) {
            lines.push(line);
            line = word;
        } else {
            line = line ? `${line} ${word}` : word;
        }
    }
    if (line) lines.push(line);
    return lines;
}

/** Mono text on one or more lines. `text` is a string (wrapped at `max`) or an array of lines. */
export function Lines({ x, y, text, max = 40, lead = 14, anchor = 'start', tone = 'muted', className = 'art-text' }) {
    const lines = Array.isArray(text) ? text : wrap(text, max);
    return (
        <text className={className} data-tone={tone} x={x} y={y} textAnchor={anchor}>
            {lines.map((line, i) => (
                <tspan key={i} x={x} dy={i ? lead : 0}>{line}</tspan>
            ))}
        </text>
    );
}

/**
 * A box with a name that can take two lines. `final` draws the double border
 * of a final state. state: 'idle', 'seen' or 'active'. pin: 'off', 'on', 'live'.
 */
export function Box({ x, y, w = 112, h = 46, name, state = 'idle', pin = 'on', final = false }) {
    const lines = wrap(name, Math.max(6, Math.floor((w - 22) / 6.6)));
    const first = y + h / 2 + 4 - (lines.length - 1) * 7;
    return (
        <g className="art-node" data-state={state}>
            <rect x={x} y={y} width={w} height={h} rx="9" />
            {final ? <rect className="art-node__inner" x={x + 3.5} y={y + 3.5} width={w - 7} height={h - 7} rx="6" /> : null}
            {pin !== 'off' ? <circle className="art-pin" data-pin={pin} cx={x + w - 10} cy={y + 10} r="2" /> : null}
            <text className="art-name" x={x + 11} y={first}>
                {lines.map((line, i) => (
                    <tspan key={i} x={x + 11} dy={i ? 14 : 0}>{line}</tspan>
                ))}
            </text>
        </g>
    );
}

/** The step in words: a red mark and the name of what happens now. */
export function Readout({ x, y, text, max = 28 }) {
    return (
        <g>
            <rect x={x} y={y - 7} width="6" height="6" fill="#FF014F" />
            <Lines x={x + 13} y={y} text={text} max={max} tone="strong" />
        </g>
    );
}
