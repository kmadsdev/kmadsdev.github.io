// Cloud chapter: three clouds, one real integration each, as three small boards.
// Each cloud is a rail of pads, one pad per service, with its name and its use.
// A trace on the left of the rail joins two services that talk to each other.
// One trace is in use at a time: it is red, and a packet goes along it.
// Wide box: three columns to compare. Narrow box: the three clouds stack.
import { useRef } from 'react';
import { facts } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Wire, useStep } from './kit/index.js';
import { Dot, Lines, TYPE, elbow, useUnits, wrap } from './artBKit.jsx';

// Who talks to whom: [from, to] pairs per cloud, in facts.art.clouds.edges.
const TRACES = facts.art.clouds.edges;
const ORDER = facts.art.clouds.order;
const STEPS = ORDER.flatMap((cloud) => TRACES[cloud].map(([from, to]) => ({ cloud, from, to })));
// Still picture: the gateway on Azure Functions forwards to the pods on AKS.
const REST = STEPS.findIndex((s) => s.cloud === 'azure' && s.from === 'functions' && s.to === 'aks');

const GAP = 28;
const LANE = 7;
const PAD = { w: 8, h: 18 };

// A lane for each trace of one cloud, so that two traces never share a vertical line.
function lanes(ids, traces) {
    const spans = traces.map(([from, to], i) => {
        const a = ids.indexOf(from);
        const b = ids.indexOf(to);
        return { i, lo: Math.min(a, b), hi: Math.max(a, b) };
    });
    const taken = [];
    const lane = [];
    for (const span of [...spans].sort((p, q) => p.hi - p.lo - (q.hi - q.lo))) {
        let n = 0;
        while ((taken[n] || []).some((other) => span.lo <= other.hi && other.lo <= span.hi)) n += 1;
        (taken[n] ||= []).push(span);
        lane[span.i] = n;
    }
    return { lane, count: taken.length };
}

function build(W, text) {
    const three = W >= 680;
    const colW = three ? Math.floor((W - GAP * 2) / 3) : W;
    const laneOf = Object.fromEntries(ORDER.map((cloud) => [cloud, lanes(facts.art.clouds[cloud], TRACES[cloud])]));
    const gutter = 12 + Math.max(...ORDER.map((cloud) => laneOf[cloud].count)) * LANE;
    const textW = colW - gutter - 18;
    const heads = ORDER.map((cloud) => wrap(text[cloud].context, colW - 2, TYPE.mono));
    const headLines = Math.max(...heads.map((h) => h.length));

    let top = 0;
    let height = 0;
    const clouds = ORDER.map((cloud, c) => {
        const x = three ? c * (colW + GAP) : 0;
        const y0 = three ? 0 : top;
        const rail = x + gutter;
        const ruleY = y0 + 22 + (three ? headLines : heads[c].length) * TYPE.mono.lead + 10;
        let y = ruleY + 18;
        const pads = {};
        const rows = facts.art.clouds[cloud].map((id) => {
            const label = wrap(text[cloud].nodes[id].label, textW, TYPE.name);
            const use = wrap(text[cloud].nodes[id].use, textW, TYPE.note);
            const row = { id, y, cy: y + 9, label, use };
            pads[id] = row.cy;
            y += label.length * TYPE.name.lead + use.length * TYPE.note.lead + 14;
            return row;
        });
        const bottom = y - 14;
        top = bottom + 34;
        height = Math.max(height, bottom);
        const traces = TRACES[cloud].map(([from, to], i) => {
            const lx = rail - PAD.w / 2 - 8 - laneOf[cloud].lane[i] * LANE;
            const d = elbow([[rail - PAD.w / 2, pads[from] + 4], [lx, pads[from] + 4], [lx, pads[to] - 4], [rail - PAD.w / 2 - 1.5, pads[to] - 4]], 5);
            return { from, to, d };
        });
        return { cloud, x, y0, w: colW, ruleY, rail, head: heads[c], rows, traces, pads };
    });
    return { width: W, height: height + 2, clouds };
}

function Scene({ layout, text }) {
    const step = useStep(STEPS.length, 1500, REST);
    const now = STEPS[step];
    return layout.clouds.map((col) => {
        const live = now.cloud === col.cloud ? now : null;
        const hot = live ? col.traces.find((t) => t.from === live.from && t.to === live.to) : null;
        return (
            <g key={col.cloud}>
                <text className="artb-head" x={col.x} y={col.y0 + 15}>{text[col.cloud].name}</text>
                <Lines className="art-text" lines={col.head} x={col.x} y={col.y0 + 36} type={TYPE.mono} />
                <line className="art-line art-line--faint" x1={col.x} y1={col.ruleY} x2={col.x + col.w} y2={col.ruleY} />
                <line className="art-line art-line--faint" x1={col.rail} y1={col.rows[0].cy} x2={col.rail} y2={col.rows[col.rows.length - 1].cy} />
                {col.traces.filter((t) => t !== hot).map((t) => (
                    <Wire key={`${t.from}-${t.to}`} d={t.d} tone="idle" arrow />
                ))}
                {hot ? <Wire d={hot.d} tone="active" arrow /> : null}
                {hot ? <Dot key={step} d={hot.d} ms={1100} /> : null}
                {col.rows.map((row) => {
                    const on = live && (row.id === live.from || row.id === live.to);
                    return (
                        <g key={row.id} className="artb-row" data-state={on ? 'active' : 'idle'}>
                            <rect className="artb-pad" x={col.rail - PAD.w / 2} y={row.cy - PAD.h / 2} width={PAD.w} height={PAD.h} rx="3" />
                            <Lines className="artb-name" lines={row.label} x={col.rail + 18} y={row.y + 13} type={TYPE.name} />
                            <Lines className="artb-note" lines={row.use} x={col.rail + 18} y={row.y + 13 + row.label.length * TYPE.name.lead} type={TYPE.note} />
                        </g>
                    );
                })}
            </g>
        );
    });
}

export default function Clouds() {
    const text = useLanguage().t.intro.art.clouds;
    const box = useRef(null);
    const layout = build(useUnits(box), text);
    return (
        <div ref={box} className="artb">
            <Art label={text.summary} width={layout.width} height={layout.height}>
                <Scene layout={layout} text={text} />
            </Art>
        </div>
    );
}
