// CI/CD chapter: a pipeline as one rail with a station for each stage.
// The commit is the packet. It goes from station to station: the stage that
// runs now is red, a finished stage gets a check mark, and the end of the rail
// fills when the last stage is done (no status colour: order of 2026-11-20).
// The drawing: the deploy job of consignado-api (7 stages, with what each stage does).
// Wide box: the rail goes left to right and returns for a second row, as a
// line of text does. Narrow box: the rail goes top to bottom.
import { useRef } from 'react';
import { art } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Wire, useStep } from './kit/index.js';
import { Dot, Lines, TYPE, elbow, useUnits, wrap } from './artBKit.jsx';

const R = 7; // station radius
const LEFT = 22;

const HEAD = 24; // room above a row (or a station) for the name of a flow

/**
 * The layout of a rail for a box W units wide.
 * items   [{ id, label, does? }] in order: one station each
 * cols    stations in one row; 0 = top to bottom
 * heads   { <index of a station>: name } a name above the row (or the station) that starts there
 */
export function build(W, items, cols, { detail = false, heads = {} } = {}) {
    const cell = (item, width) => ({
        id: item.id,
        label: wrap(item.label, width, TYPE.name),
        does: detail && item.does ? wrap(item.does, width, TYPE.note) : [],
    });
    const textH = (c) => c.label.length * TYPE.name.lead + c.does.length * TYPE.note.lead;
    const labels = [];

    if (!cols) {
        const tx = 30;
        let y = 16;
        const stations = items.map((item, i) => {
            if (heads[i]) {
                labels.push({ text: heads[i], x: tx, y: y + 6 });
                y += HEAD;
            }
            const c = { ...cell(item, W - tx), x: R + 1, y: y + 9, tx, ty: y + 13 };
            y += textH(c) + (detail ? 16 : 12);
            return c;
        });
        const end = { x: R + 1, y: y + 8 };
        const wires = stations.map((s, i) => (i ? `M${s.x} ${stations[i - 1].y + R}V${s.y - R - 1.5}` : `M${s.x} 1V${s.y - R - 1.5}`));
        const last = stations[stations.length - 1];
        return { width: W, height: end.y + 6, stations, wires, end, endWire: `M${end.x} ${last.y + R}V${end.y - 5.5}`, labels };
    }

    const cellW = Math.floor((W - LEFT - 6) / cols);
    const rowsN = Math.ceil(items.length / cols);
    const cells = items.map((item) => cell(item, cellW - 14));
    const stations = [];
    const wires = [];
    let top = 0;
    for (let r = 0; r < rowsN; r += 1) {
        const head = heads[r * cols] ? HEAD : 0;
        if (head) labels.push({ text: heads[r * cols], x: LEFT, y: top + 12 });
        const row = cells.slice(r * cols, (r + 1) * cols);
        const y = top + head + R + 3;
        const rowH = head + R * 2 + 6 + 12 + Math.max(...row.map(textH));
        row.forEach((c, k) => {
            const x = LEFT + k * cellW + R;
            const prev = stations[stations.length - 1];
            if (!prev) wires.push(`M1 ${y}H${x - R - 1.5}`);
            else if (prev.y === y) wires.push(`M${prev.x + R} ${y}H${x - R - 1.5}`);
            else {
                // The return: to the right edge, down under the text of the row, back to the left edge, down to the next row.
                const back = top - 14;
                wires.push(elbow([[prev.x + R, prev.y], [W - 5, prev.y], [W - 5, back], [5, back], [5, y], [x - R - 1.5, y]], 7));
            }
            stations.push({ ...c, x, y, tx: x - R, ty: y + R + 22 });
        });
        top += rowH + 30;
    }
    const last = stations[stations.length - 1];
    const lastCol = (items.length - 1) % cols;
    const end = { x: lastCol < cols - 1 ? last.x + cellW : W - 6, y: last.y };
    return { width: W, height: top - 30 + 2, stations, wires, end, endWire: `M${last.x + R} ${last.y}H${end.x - 5.5}`, labels };
}

export function Scene({ layout, rest }) {
    const count = layout.stations.length;
    // Steps 0 to count - 1: that stage runs. Step `count`: all stages are done.
    const step = useStep(count + 1, 1500, rest);
    const done = step === count;
    return (
        <>
            {layout.wires.map((d, i) => (
                <Wire key={i} d={d} tone={i === step ? 'active' : i < step ? 'idle' : 'faint'} dashed={i > step} arrow={i <= step} />
            ))}
            <Wire d={layout.endWire} tone={done ? 'idle' : 'faint'} dashed={!done} />
            {done ? <Dot key="end" d={layout.endWire} ms={600} /> : <Dot key={step} d={layout.wires[step]} ms={1000} />}
            <circle className="artb-end" data-state={done ? 'done' : 'idle'} cx={layout.end.x} cy={layout.end.y} r="4" />
            {layout.labels.map((label) => <text key={label.text} className="art-text" data-tone="strong" x={label.x} y={label.y}>{label.text}</text>)}
            {layout.stations.map((s, i) => {
                const state = i < step ? 'done' : i === step ? 'active' : 'idle';
                return (
                    <g key={s.id} className="artb-stage" data-state={state}>
                        <circle className="artb-station" cx={s.x} cy={s.y} r={R} />
                        {state === 'active' ? <circle className="artb-station__core" cx={s.x} cy={s.y} r="2.5" /> : null}
                        {state === 'done' ? <path className="art-line artb-check" pathLength="1" d={`M${s.x - 3.2} ${s.y + 0.2}l2.3 2.4 4.2-5`} /> : null}
                        <Lines className="artb-name" lines={s.label} x={s.tx} y={s.ty} type={TYPE.name} />
                        {s.does.length ? <Lines className="artb-note" lines={s.does} x={s.tx} y={s.ty + s.label.length * TYPE.name.lead} type={TYPE.note} /> : null}
                    </g>
                );
            })}
        </>
    );
}

// Still picture: the rollout runs, five stages are done, the smoke test waits.
export default function Pipeline() {
    const text = useLanguage().t.intro.art.pipeline;
    const { stages } = art.pipeline;
    const box = useRef(null);
    const W = useUnits(box);
    const items = stages.map((id) => ({ id, ...text.stages[id] }));
    const layout = build(W, items, W >= 640 ? 4 : 0, { detail: true });
    return (
        <div ref={box} className="artb">
            <Art label={text.summary} width={layout.width} height={layout.height}>
                <Scene layout={layout} rest={stages.indexOf('rollout')} />
            </Art>
        </div>
    );
}
