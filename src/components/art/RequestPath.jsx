// D10, the request path of Consignado Cloud, from `art.requestPath` (contents.global.js),
// in the layout that the owner drew (ORDER-2026-11-20, "Consignado Cloud Architecture"):
//
//   Browser -> Cloudflare Worker -> | AZURE: Java gateway -+-> Serverless host ------> Azure DB
//                     |             |                      |                              ^
//                     +-----------> | Static site          +-> Load Bal. -+- | AKS: Pod #1 -+
//                                   |                                     +- |      Pod #2 -+
//
// Wide box: the nodes stand on the [column, row] grid of the data, and each wire is drawn
// as in his layout. Narrow box: the same graph, top to bottom.
// One request travels at a time, on every route from the browser to an end node, in the
// order of the edges. The wire in use is red, the part of the route that the request already
// crossed keeps the signal colour, and the readout names the hop (and, wide, the node).
// Reduced motion: the still picture of the gateway that sends a request to the cluster.
import { art } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Label, Packet, Wire, useStep } from './kit/index.js';
import { Box, Fit, Lines, wrap } from './artAKit.jsx';

const DATA = art.requestPath;
const keyOf = ([a, b]) => `${a}>${b}`;
const EDGE = Object.fromEntries(DATA.edges.map((edge, i) => [keyOf(edge), i]));

// Every route from the first node to a node with no way out, in the order of the edges.
function routes(from, path = [from]) {
    const next = DATA.edges.filter(([a]) => a === from).map(([, b]) => b);
    if (!next.length) return [path];
    return next.flatMap((to) => routes(to, [...path, to]));
}
const ROUTES = routes(DATA.nodes[0]);
const STEPS = ROUTES.flatMap((nodes, route) => nodes.slice(1).map((to, hop) => ({ route, hop, edge: EDGE[`${nodes[hop]}>${to}`] })));
const REST = Math.max(0, STEPS.findIndex((step) => keyOf(DATA.edges[step.edge]) === 'gateway>balancer'));

// ---------- Wide: the grid of the data ----------
// Left edge of each grid column, top of each grid row, width of each node.
const COL_X = [0, 112, 300, 462, 642, 744];
const ROW_Y = [40, 100, 164, 224];
const H = 40;
const WIDTH = { browser: 80, worker: 140, gateway: 120, serverless: 128, database: 96, site: 120, balancer: 128, pod1: 104, pod2: 104 };
const wideAt = Object.fromEntries(DATA.nodes.map((id) => {
    const [col, row] = DATA.grid[id];
    return [id, { x: COL_X[col], y: ROW_Y[row], w: WIDTH[id] }];
}));
const WIDE = {
    width: 872,
    height: 302,
    at: wideAt,
    h: H,
    pad: { aks: 14, azure: 22 },
    // Each wire as the owner drew it: a branch leaves its node on one line and splits at a junction.
    wires: {
        'browser>worker': 'M80 60H112',
        'worker>gateway': 'M252 60H300',
        'worker>site': 'M182 80V112Q182 120 190 120H300',
        'gateway>serverless': 'M420 60H462',
        'gateway>balancer': 'M420 60H432Q440 60 440 68V176Q440 184 448 184H462',
        'serverless>database': 'M590 60H744',
        'balancer>pod1': 'M590 184H642',
        'balancer>pod2': 'M590 184H602Q610 184 610 192V236Q610 244 618 244H642',
        'pod1>database': 'M746 184H792Q800 184 800 176V80',
        'pod2>database': 'M746 244H792Q800 244 800 236V80',
    },
    readout: { x: 0, y: 178, max: 34, note: true },
};

// ---------- Narrow: top to bottom ----------
const NARROW = {
    width: 306,
    height: 476,
    at: {
        browser: { x: 8, y: 8, w: 132 },
        worker: { x: 8, y: 76, w: 132 },
        gateway: { x: 8, y: 160, w: 132 },
        site: { x: 160, y: 160, w: 132 },
        serverless: { x: 8, y: 240, w: 132 },
        balancer: { x: 160, y: 240, w: 132 },
        pod1: { x: 160, y: 320, w: 62 },
        pod2: { x: 230, y: 320, w: 62 },
        database: { x: 8, y: 420, w: 132 },
    },
    h: H,
    // The pods stand side by side and their wires cross the top of the AKS frame,
    // so its name stands inside, at the bottom right.
    pad: { aks: { t: 6, r: 6, b: 20, l: 6 }, azure: 6 },
    inside: ['aks'],
    wires: {
        'browser>worker': 'M74 48V76',
        'worker>gateway': 'M74 116V160',
        'worker>site': 'M140 96H218Q226 96 226 104V160',
        'gateway>serverless': 'M74 200V240',
        'gateway>balancer': 'M74 200V212Q74 220 82 220H218Q226 220 226 228V240',
        'serverless>database': 'M74 280V420',
        'balancer>pod1': 'M226 280V284Q226 292 218 292H199Q191 292 191 300V320',
        'balancer>pod2': 'M226 280V284Q226 292 234 292H253Q261 292 261 300V320',
        'pod1>database': 'M191 360V432Q191 440 183 440H140',
        'pod2>database': 'M261 360V432Q261 440 253 440H140',
    },
    readout: { x: 152, y: 18, max: 19, note: false },
};

/** The box around the nodes of a frame (and around a frame that it holds), with its padding. */
function frames(layout) {
    const out = {};
    // Inner frames first: a frame can hold another frame.
    for (const frame of [...DATA.frames].reverse()) {
        const boxes = frame.holds.map((id) => out[id] ?? { x: layout.at[id].x, y: layout.at[id].y, width: layout.at[id].w, height: layout.h });
        const p = layout.pad[frame.id];
        const pad = typeof p === 'number' ? { t: p, r: p, b: p, l: p } : p;
        const x = Math.min(...boxes.map((b) => b.x)) - pad.l;
        const y = Math.min(...boxes.map((b) => b.y)) - pad.t;
        out[frame.id] = {
            x,
            y,
            width: Math.max(...boxes.map((b) => b.x + b.width)) + pad.r - x,
            height: Math.max(...boxes.map((b) => b.y + b.height)) + pad.b - y,
            inside: Boolean(layout.inside?.includes(frame.id)),
        };
    }
    return out;
}
const FRAMES = { wide: frames(WIDE), narrow: frames(NARROW) };

/** A frame as in the owner's drawing: a line, and its name cut into the top line. */
function Frame({ box, name }) {
    const tag = name.length * 7.3 + 12; // 7.3: the advance of one mono capital at 11 units
    return (
        <g className="rp-frame">
            <rect className="art-line art-line--faint art-frame" x={box.x} y={box.y} width={box.width} height={box.height} rx="10" />
            {box.inside ? (
                <Label x={box.x + box.width - 8} y={box.y + box.height - 7} anchor="end">{name}</Label>
            ) : (
                <>
                    <rect className="rp-frame__tag" x={box.x + 10} y={box.y - 7} width={tag} height="14" />
                    <Label x={box.x + 16} y={box.y + 4}>{name}</Label>
                </>
            )}
        </g>
    );
}

function Scene({ text, layout, boxes }) {
    const index = useStep(STEPS.length, 1100, REST);
    const step = STEPS[index];
    const [from, to] = DATA.edges[step.edge];
    const route = ROUTES[step.route];
    // Hops of this route that the request crossed before this one.
    const crossed = new Set(route.slice(0, step.hop).map((node, i) => `${node}>${route[i + 1]}`));
    const seen = new Set(route.slice(0, step.hop));
    const { readout } = layout;
    const label = wrap(text.edges[step.edge], readout.max);
    const note = readout.note ? wrap(`${text.nodes[to].label}: ${text.nodes[to].note}`, readout.max + 6) : [];

    return (
        <>
            {DATA.frames.map((frame) => <Frame key={frame.id} box={boxes[frame.id]} name={text.frames[frame.id]} />)}

            {DATA.edges.map((edge) => {
                const key = keyOf(edge);
                const tone = edge[0] === from && edge[1] === to ? 'active' : crossed.has(key) ? 'signal' : 'idle';
                return <Wire key={key} d={layout.wires[key]} tone={tone} arrow />;
            })}
            <Packet key={index} d={layout.wires[`${from}>${to}`]} dur={1.1} />

            {DATA.nodes.map((id) => (
                <Box
                    key={id}
                    x={layout.at[id].x}
                    y={layout.at[id].y}
                    w={layout.at[id].w}
                    h={layout.h}
                    name={text.nodes[id].label}
                    state={id === from || id === to ? 'active' : seen.has(id) ? 'seen' : 'idle'}
                />
            ))}

            {/* The hop in words: a red mark, the edge, then (wide) the node it reaches. */}
            <g className="rp-readout">
                <rect x={readout.x} y={readout.y - 7} width="6" height="6" fill="#FF014F" />{/* the red of the line in use */}
                <Lines x={readout.x + 13} y={readout.y} text={label} tone="strong" />
                {note.length ? <Lines x={readout.x + 13} y={readout.y + label.length * 14 + 6} text={note} className="art-text rp-readout__note" /> : null}
            </g>
        </>
    );
}

export default function RequestPath() {
    const text = useLanguage().t.intro.art.requestPath;
    return (
        <Fit limit={700}>
            {(narrow) => {
                const layout = narrow ? NARROW : WIDE;
                return (
                    <Art label={text.summary} width={layout.width} height={layout.height} className={narrow ? 'art--narrow art-a--narrow' : 'art-a rp-wide'}>
                        <Scene text={text} layout={layout} boxes={FRAMES[narrow ? 'narrow' : 'wide']} />
                    </Art>
                );
            }}
        </Fit>
    );
}
