// Example 1 of the art kit: a small architecture that runs.
// Browser -> edge -> gateway -> one of two hosts -> database.
// The gateway sends each request to the next host in turn (round robin), so the
// picture shows a real mechanism. The line in use is red; the packet is the request.
import { useMediaQuery } from '../../hooks.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Halftone, Node, Packet, Wire, useStep } from './kit/index.js';

const W = 88;
const H = 44;
// Two layouts of the same graph: left to right on a wide tile, top to bottom on a phone.
const WIDE = {
    width: 560,
    height: 216,
    at: { browser: { x: 4, y: 86 }, edge: { x: 120, y: 86 }, gateway: { x: 236, y: 86 }, hostA: { x: 352, y: 22 }, hostB: { x: 352, y: 150 }, db: { x: 468, y: 86 } },
};
const TALL = {
    width: 236,
    height: 372,
    at: { browser: { x: 74, y: 4 }, edge: { x: 74, y: 84 }, gateway: { x: 74, y: 164 }, hostA: { x: 8, y: 244 }, hostB: { x: 140, y: 244 }, db: { x: 74, y: 324 } },
};
const R = 8;

// From one node to the next, with round corners: along x in the wide layout, along y in the tall one.
function route(layout, from, to) {
    const a = layout.at[from];
    const b = layout.at[to];
    if (layout === WIDE) {
        const [x1, y1, x2, y2] = [a.x + W, a.y + H / 2, b.x, b.y + H / 2];
        if (y1 === y2) return `M${x1} ${y1}H${x2}`;
        const mid = (x1 + x2) / 2;
        const dir = y2 > y1 ? 1 : -1;
        return `M${x1} ${y1}H${mid - R}Q${mid} ${y1} ${mid} ${y1 + R * dir}V${y2 - R * dir}Q${mid} ${y2} ${mid + R} ${y2}H${x2}`;
    }
    const [x1, y1, x2, y2] = [a.x + W / 2, a.y + H, b.x + W / 2, b.y];
    if (x1 === x2) return `M${x1} ${y1}V${y2}`;
    const mid = (y1 + y2) / 2;
    const dir = x2 > x1 ? 1 : -1;
    return `M${x1} ${y1}V${mid - R}Q${x1} ${mid} ${x1 + R * dir} ${mid}H${x2 - R * dir}Q${x2} ${mid} ${x2} ${mid + R}V${y2}`;
}
const PATHS = {
    A: [['browser', 'edge'], ['edge', 'gateway'], ['gateway', 'hostA'], ['hostA', 'db']],
    B: [['browser', 'edge'], ['edge', 'gateway'], ['gateway', 'hostB'], ['hostB', 'db']],
};
const WIRES = [['browser', 'edge'], ['edge', 'gateway'], ['gateway', 'hostA'], ['gateway', 'hostB'], ['hostA', 'db'], ['hostB', 'db']];

function Scene({ names, layout }) {
    const AT = layout.at;
    // 8 steps: four hops through host A, then four hops through host B.
    const step = useStep(8, 1100, 2);
    const hops = step < 4 ? PATHS.A : PATHS.B;
    const [from, to] = hops[step % 4];
    const active = route(layout, from, to);
    return (
        <>
            <Halftone fill="signal" fade="radial" opacity={0.5}>
                <circle cx={AT.gateway.x + W / 2} cy={AT.gateway.y + H / 2} r="88" />
            </Halftone>
            {WIRES.map(([a, b]) => (
                <Wire key={`${a}-${b}`} d={route(layout, a, b)} tone={a === from && b === to ? 'active' : 'idle'} arrow />
            ))}
            <Packet key={step} d={active} dur={1.1} />
            {Object.keys(AT).map((id) => (
                <Node key={id} {...AT[id]} w={W} h={H} name={names[id]} state={id === from || id === to ? 'active' : 'idle'} pin={id === to ? 'live' : 'on'} />
            ))}
        </>
    );
}

export default function ArchRuns() {
    const { art } = useLanguage().t;
    const layout = useMediaQuery('(max-width: 599.98px)') ? TALL : WIDE;
    return (
        <Art label={art.archRuns.label} width={layout.width} height={layout.height} className={layout === TALL ? 'art--narrow' : ''}>
            <Scene names={art.archRuns.nodes} layout={layout} />
        </Art>
    );
}
