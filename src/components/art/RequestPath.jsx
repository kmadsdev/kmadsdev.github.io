// The request path of Consignado Cloud, from facts.art.requestPath.
// Browser -> Cloudflare Worker -> (static site) or (Java gateway on Azure
// Functions) -> the serverless host, or the internal load balancer and the pods
// on AKS -> one PostgreSQL.
// One request travels at a time: first the serverless route, then the Kubernetes
// route, then a page from the static site. The line in use is red, the part of
// the route that the request already crossed keeps the signal colour, and the
// readout names the hop.
import { facts } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Label, Packet, Wire, useStep } from './kit/index.js';
import { Box, Fit, Readout } from './artAKit.jsx';

const DATA = facts.art.requestPath;
const edgeIndex = (from, to) => DATA.edges.findIndex(([a, b]) => a === from && b === to);
// A route is a list of nodes. The hops are edges of the data.
const ROUTES = [
    ['browser', 'edge', 'gateway', 'function', 'database'],
    ['browser', 'edge', 'gateway', 'balancer', 'pods', 'database'],
    ['browser', 'edge', 'site'],
];
const STEPS = ROUTES.flatMap((nodes, route) =>
    nodes.slice(1).map((to, hop) => ({ route, hop, edge: edgeIndex(nodes[hop], to) })),
).filter((step) => step.edge > -1);
// With reduced motion: the gateway sends the request to the private address of the cluster.
const REST = Math.max(0, STEPS.findIndex((step) => DATA.edges[step.edge].join('>') === 'gateway>balancer'));

const WIDE = {
    width: 664,
    height: 304,
    at: {
        browser: { x: 8, y: 122, w: 88 },
        edge: { x: 124, y: 122 },
        gateway: { x: 264, y: 122 },
        function: { x: 404, y: 58 },
        database: { x: 544, y: 58 },
        balancer: { x: 404, y: 186 },
        pods: { x: 544, y: 186 },
        site: { x: 264, y: 240 },
    },
    w: 112,
    h: 46,
    wires: {
        'browser>edge': 'M96 145H124',
        'edge>site': 'M180 168V255Q180 263 188 263H264',
        'edge>gateway': 'M236 145H264',
        'gateway>function': 'M376 145H382Q390 145 390 137V89Q390 81 398 81H404',
        'gateway>balancer': 'M376 145H382Q390 145 390 153V201Q390 209 398 209H404',
        'balancer>pods': 'M516 209H544',
        'function>database': 'M516 81H544',
        'pods>database': 'M600 186V104',
    },
    azure: { x: 252, y: 30, width: 408, height: 268, label: { x: 264, y: 49, anchor: 'start' } },
    cloudflare: { x: 115, y: 112, width: 130, height: 66, label: { x: 116, y: 103, anchor: 'start' } },
    readout: { x: 8, y: 22, max: 26 },
};
const NARROW = {
    width: 300,
    height: 492,
    at: {
        browser: { x: 8, y: 8 },
        edge: { x: 8, y: 92 },
        gateway: { x: 8, y: 178 },
        site: { x: 160, y: 178 },
        function: { x: 8, y: 266 },
        balancer: { x: 160, y: 266 },
        pods: { x: 160, y: 346 },
        database: { x: 84, y: 432 },
    },
    w: 132,
    h: 44,
    wires: {
        'browser>edge': 'M74 52V92',
        'edge>site': 'M140 114H218Q226 114 226 122V178',
        'edge>gateway': 'M74 136V178',
        'gateway>function': 'M74 222V266',
        'gateway>balancer': 'M74 222V236Q74 244 82 244H218Q226 244 226 252V266',
        'balancer>pods': 'M226 310V346',
        'function>database': 'M74 310V403Q74 411 82 411H142Q150 411 150 419V432',
        'pods>database': 'M226 390V403Q226 411 218 411H158Q150 411 150 419V432',
    },
    azure: { x: 2, y: 166, width: 296, height: 320, label: { x: 288, y: 476, anchor: 'end' } },
    cloudflare: { x: 2, y: 84, width: 144, height: 60, label: { x: 156, y: 102, anchor: 'start' } },
    readout: { x: 160, y: 20, max: 16 },
};

function Scene({ text, layout }) {
    const index = useStep(STEPS.length, 1100, REST);
    const step = STEPS[index];
    const [from, to] = DATA.edges[step.edge];
    const route = ROUTES[step.route];
    // Hops of this route that the request crossed before this one.
    const crossed = new Set(route.slice(0, step.hop).map((node, i) => `${node}>${route[i + 1]}`));
    const seen = new Set(route.slice(0, step.hop));
    const size = (id) => ({ w: layout.at[id].w ?? layout.w, h: layout.h });

    return (
        <>
            {/* Where each part runs. */}
            {Object.keys(DATA.groups).map((group) => {
                const frame = layout[group];
                return (
                    <g key={group}>
                        <rect className="art-line art-line--faint art-frame" x={frame.x} y={frame.y} width={frame.width} height={frame.height} rx="14" />
                        <Label x={frame.label.x} y={frame.label.y} anchor={frame.label.anchor}>{text.groups[group]}</Label>
                    </g>
                );
            })}

            {DATA.edges.map(([a, b]) => {
                const key = `${a}>${b}`;
                const tone = a === from && b === to ? 'active' : crossed.has(key) ? 'signal' : 'idle';
                return <Wire key={key} d={layout.wires[key]} tone={tone} arrow />;
            })}
            <Packet key={index} d={layout.wires[`${from}>${to}`]} dur={1.1} />

            {DATA.nodes.map((id) => (
                <Box
                    key={id}
                    x={layout.at[id].x}
                    y={layout.at[id].y}
                    {...size(id)}
                    name={text.nodes[id].label}
                    state={id === from || id === to ? 'active' : seen.has(id) ? 'seen' : 'idle'}
                    pin={id === to ? 'live' : 'on'}
                />
            ))}

            <Readout {...layout.readout} text={text.edges[step.edge]} />
        </>
    );
}

export default function RequestPath() {
    const text = useLanguage().t.intro.art.requestPath;
    return (
        <Fit limit={520}>
            {(narrow) => {
                const layout = narrow ? NARROW : WIDE;
                return (
                    <Art label={text.summary} width={layout.width} height={layout.height} className={narrow ? 'art--narrow art-a--narrow' : 'art-a'}>
                        <Scene text={text} layout={layout} />
                    </Art>
                );
            }}
        </Fit>
    );
}
