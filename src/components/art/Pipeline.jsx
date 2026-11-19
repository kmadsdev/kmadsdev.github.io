// CI/CD chapter: a pipeline as one rail with a station for each stage.
// The commit is the packet. It goes from station to station: the stage that
// runs now is red, a finished stage gets a check mark, and the end of the rail
// turns mint when the last stage is done.
// Two drawings use it: the deploy job of consignado-api (7 stages, with what
// each stage does) and the workflow of this site (6 stages, names only).
// Wide box: the rail goes left to right and returns for a second row, as a
// line of text does. Narrow box: the rail goes top to bottom.
import { useRef } from 'react';
import { facts } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Halftone, Wire, useStep } from './kit/index.js';
import { Dot, Lines, TYPE, elbow, useUnits, wrap } from './artBKit.jsx';

const R = 7; // station radius
const LEFT = 22;

// Columns of the rail for a box width. 0 = top to bottom.
const COLUMNS = {
    pipeline: (W) => (W >= 640 ? 4 : 0),
    sitePipeline: (W) => (W >= 680 ? 6 : W >= 420 ? 3 : 0),
};

function build(W, stages, text, cols, detail) {
    const cell = (id, width) => ({
        id,
        label: wrap(text.stages[id].label, width, TYPE.name),
        does: detail ? wrap(text.stages[id].does, width, TYPE.note) : [],
    });
    const textH = (c) => c.label.length * TYPE.name.lead + c.does.length * TYPE.note.lead;

    if (!cols) {
        const tx = 30;
        let y = 16;
        const stations = stages.map((id) => {
            const c = { ...cell(id, W - tx), x: R + 1, y: y + 9, tx, ty: y + 13 };
            y += textH(c) + (detail ? 16 : 12);
            return c;
        });
        const end = { x: R + 1, y: y + 8 };
        const wires = stations.map((s, i) => (i ? `M${s.x} ${stations[i - 1].y + R}V${s.y - R - 1.5}` : `M${s.x} 1V${s.y - R - 1.5}`));
        const last = stations[stations.length - 1];
        return { width: W, height: end.y + 6, stations, wires, end, endWire: `M${end.x} ${last.y + R}V${end.y - 5.5}` };
    }

    const cellW = Math.floor((W - LEFT - 6) / cols);
    const rowsN = Math.ceil(stages.length / cols);
    const cells = stages.map((id) => cell(id, cellW - 14));
    const stations = [];
    const wires = [];
    let top = 0;
    for (let r = 0; r < rowsN; r += 1) {
        const row = cells.slice(r * cols, (r + 1) * cols);
        const y = top + R + 3;
        const rowH = R * 2 + 6 + 12 + Math.max(...row.map(textH));
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
    const lastCol = (stages.length - 1) % cols;
    const end = { x: lastCol < cols - 1 ? last.x + cellW : W - 6, y: last.y };
    return { width: W, height: top - 30 + 2, stations, wires, end, endWire: `M${last.x + R} ${last.y}H${end.x - 5.5}` };
}

function Scene({ layout, rest }) {
    const count = layout.stations.length;
    // Steps 0 to count - 1: that stage runs. Step `count`: all stages are done.
    const step = useStep(count + 1, 1500, rest);
    const done = step === count;
    const now = layout.stations[step];
    return (
        <>
            {now ? (
                <Halftone fill="signal" fade="radial" opacity={0.55}>
                    <circle cx={now.x} cy={now.y} r="32" />
                </Halftone>
            ) : null}
            {layout.wires.map((d, i) => (
                <Wire key={i} d={d} tone={i === step ? 'active' : i < step ? 'idle' : 'faint'} dashed={i > step} arrow={i <= step} />
            ))}
            <Wire d={layout.endWire} tone={done ? 'idle' : 'faint'} dashed={!done} />
            {done ? <Dot key="end" d={layout.endWire} ms={600} tone="mint" /> : <Dot key={step} d={layout.wires[step]} ms={1000} />}
            <circle className="artb-end" data-state={done ? 'live' : 'idle'} cx={layout.end.x} cy={layout.end.y} r="4" />
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

/**
 * id: 'pipeline' or 'sitePipeline' (a key of facts.art and of intro.art).
 * rest: the stage that the still picture shows as running.
 */
export function Rail({ id, detail = false, rest }) {
    const text = useLanguage().t.intro.art[id];
    const stages = facts.art[id].stages;
    const box = useRef(null);
    const W = useUnits(box);
    const layout = build(W, stages, text, COLUMNS[id](W), detail);
    return (
        <div ref={box} className="artb">
            <Art label={text.summary} width={layout.width} height={layout.height}>
                <Scene layout={layout} rest={stages.indexOf(rest)} />
            </Art>
        </div>
    );
}

// Still picture: the rollout runs, five stages are done, the smoke test waits.
export default function Pipeline() {
    return <Rail id="pipeline" detail rest="rollout" />;
}
