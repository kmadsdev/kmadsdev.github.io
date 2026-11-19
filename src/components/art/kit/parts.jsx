// The parts every illustration is drawn with. One hand: 1.5px strokes, round
// joins, the palette of the tokens, halftone for tone. Styles: src/styles/art.css.
import { useArt } from './Art.jsx';
import { INK } from './palette.js';

/**
 * A line between two things.
 * tone: 'idle' (grey), 'faint', 'active' (red: the line in use now), 'signal' (the gradient).
 */
export function Wire({ d, tone = 'idle', arrow = false, dashed = false }) {
    const { paint } = useArt();
    const marker = arrow ? (tone === 'active' ? paint.arrowRed : paint.arrow) : undefined;
    return (
        <path
            className="art-line art-wire"
            data-tone={tone}
            d={d}
            stroke={tone === 'signal' ? paint.signal : undefined}
            strokeDasharray={dashed ? '2 5' : undefined}
            markerEnd={marker}
        />
    );
}

/**
 * A dot that moves on a path: one unit of data. It is not drawn with reduced motion.
 * tone: 'signal' (violet to blue on the way), 'red', 'mint'.
 * Give it a `key` that changes with the path, so that it starts at the start.
 */
export function Packet({ d, dur = 1.2, delay = 0, tone = 'signal', r = 3.2, repeat = 'indefinite' }) {
    const { motion } = useArt();
    if (!motion) return null;
    const fill = tone === 'signal' ? INK.violet : INK[tone];
    const timing = { dur: `${dur}s`, begin: `${delay}s`, repeatCount: repeat };
    return (
        <circle className="art-packet" r={r} fill={fill}>
            <animateMotion path={d} calcMode="spline" keyTimes="0;1" keySplines="0.65 0 0.35 1" {...timing} />
            {tone === 'signal' ? <animate attributeName="fill" values={`${INK.violet};${INK.blue}`} {...timing} /> : null}
        </circle>
    );
}

/**
 * A box with a name: a service, a host, a stage.
 * state: 'idle' or 'active'. pin: 'off', 'on' (grey) or 'live' (mint: it is healthy).
 */
export function Node({ x, y, w = 88, h = 44, name, sub, state = 'idle', pin = 'on' }) {
    return (
        <g className="art-node" data-state={state}>
            <rect x={x} y={y} width={w} height={h} rx="9" />
            {pin !== 'off' ? <circle className="art-pin" data-pin={pin} cx={x + w - 10} cy={y + 10} r="2" /> : null}
            <text className="art-name" x={x + 11} y={sub ? y + h / 2 - 1 : y + h / 2 + 4}>{name}</text>
            {sub ? <text className="art-text" x={x + 11} y={y + h / 2 + 13}>{sub}</text> : null}
        </g>
    );
}

/** Mono text on the drawing: an axis name, a unit. tone: 'muted', 'strong' or 'red'. */
export function Label({ x, y, anchor = 'start', tone = 'muted', children, ...rest }) {
    return <text className="art-text" data-tone={tone} x={x} y={y} textAnchor={anchor} {...rest}>{children}</text>;
}

/**
 * Tone as dots, for an area that carries meaning (a zone, the filled part of a bar).
 * The children are shapes; they are filled and cut into the halftone. Flat: it has no fade, it is not a light.
 * fill: 'signal', 'red' or 'ink'.
 */
export function Halftone({ fill = 'ink', opacity = 1, children }) {
    const { paint } = useArt();
    const colour = fill === 'signal' ? paint.signal : fill === 'red' ? INK.red : 'rgb(255 255 255 / 0.5)';
    return <g opacity={opacity} mask={paint.halftone} fill={colour} stroke="none">{children}</g>;
}
