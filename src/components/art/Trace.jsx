// Two real requests through the gateway of Consignado Cloud, from facts.art.trace.
// A waterfall: the stages in order, one row each. A stage with a time in the
// trace is a bar, and its length is its share of the total. A stage with no time
// is a dashed slot with no number: its place in the order is real, its width is not.
// The playhead crosses the warm call, then the cold call. Under the waterfall,
// the two totals stand on one scale.
import { facts } from '../../content/index.js';
import { local } from '../../content/format.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Halftone, Label, useArt, useStep } from './kit/index.js';
import { Fit, Lines, wrap } from './artAKit.jsx';

const DATA = facts.art.trace;
const CALLS = ['warm', 'cold'].filter((id) => DATA[id]);
const HOLD = 3; // steps that the finished call stays on screen
const MIN = 0.028; // least width of a slot with no time, as a share of the track
const LONGEST = Math.max(...CALLS.map((id) => DATA[id].totalMs));

// Each stage as a share of the track: [start, end].
function slots(call) {
    const timed = call.stages.reduce((sum, stage) => sum + (stage.ms ?? 0), 0) / call.totalMs;
    const open = call.stages.filter((stage) => stage.ms == null).length;
    const share = (stage) => (stage.ms == null ? Math.max(MIN, (1 - timed) / Math.max(1, open)) : stage.ms / call.totalMs);
    const sum = call.stages.reduce((total, stage) => total + share(stage), 0);
    let at = 0;
    return call.stages.map((stage) => {
        const start = at;
        at += share(stage) / sum;
        return { ...stage, start, end: at };
    });
}
const SLOTS = Object.fromEntries(CALLS.map((id) => [id, slots(DATA[id])]));

// One list of steps: each stage of each call, then the hold.
const STEPS = CALLS.flatMap((id) => [
    ...DATA[id].stages.map((_, stage) => ({ call: id, stage })),
    ...Array.from({ length: HOLD }, () => ({ call: id, stage: DATA[id].stages.length })),
]);
// With reduced motion: the warm call, complete.
const REST = DATA.warm ? DATA.warm.stages.length : 0;

const time = (ms, lang) => (ms >= 10000 ? `${local((ms / 1000).toFixed(1), lang)} s` : `${ms} ms`);

const WIDE = { width: 640, height: 292, names: 8, track: [150, 540], times: 632, head: 18, note: 36, noteMax: 84, rows: [54, 170], bar: 10, stacked: false, total: 250, totals: [266, 283] };
const NARROW = { width: 300, height: 410, names: 8, track: [8, 292], times: 292, head: 16, note: 48, noteMax: 50, rows: [78, 216], bar: 6, stacked: true, total: 320, totals: [338, 366] };

function Scene({ text, layout, lang }) {
    const { paint } = useArt();
    const index = useStep(STEPS.length, 650, REST);
    const { call: id, stage: now } = STEPS[index];
    const call = DATA[id];
    const stages = SLOTS[id];
    const [x0, x1] = layout.track;
    const [top, tall] = layout.rows;
    const rowH = tall / stages.length;
    const at = (share) => x0 + share * (x1 - x0);
    const done = now >= stages.length;
    const head = done ? x1 : at(stages[now].end);
    const timed = stages.find((stage) => stage.ms != null);

    return (
        <>
            {/* Which call, and what it was. */}
            <Label x={layout.names} y={layout.head} tone="strong">{text[id].label}</Label>
            <text className="art-text trace-call" x={layout.stacked ? layout.names : x0} y={layout.stacked ? layout.head + 16 : layout.head}>
                {call.call} <tspan className="trace-status">{call.status}</tspan>
            </text>
            <Lines className="trace-note" x={layout.stacked ? layout.names : x0} y={layout.note} text={text[id].note} max={layout.noteMax} lead={13} />

            {timed && !layout.stacked ? (
                <Halftone fill="signal" fade="up" opacity={0.42}>
                    <rect x={at(timed.start)} y={top} width={at(timed.end) - at(timed.start)} height={tall} />
                </Halftone>
            ) : null}
            {layout.stacked ? null : (
                <>
                    <line className="art-line art-line--faint" x1={x0} y1={top - 4} x2={x0} y2={top + tall + 4} />
                    <line className="art-line art-line--faint" x1={x1} y1={top - 4} x2={x1} y2={top + tall + 4} />
                </>
            )}

            {stages.map((stage, i) => {
                const rowTop = top + i * rowH;
                const mid = layout.stacked ? rowTop + 18 : rowTop + rowH / 2;
                const state = i < now ? 'done' : i === now ? 'now' : 'next';
                const name = text.stages[stage.id];
                const detail = stage.id === 'database' && call.statements ? `${name} · ${call.statements.total} ${text.statements}` : name;
                const box = { x: at(stage.start) + 1, y: mid - layout.bar / 2, width: Math.max(3, at(stage.end) - at(stage.start) - 2), height: layout.bar, rx: 2.5 };
                const y = layout.stacked ? rowTop + 10 : mid + 4;
                return (
                    <g key={stage.id} className="trace-row" data-state={state}>
                        <text className="art-name" x={layout.names} y={y}>{detail}</text>
                        {stage.ms == null ? (
                            <rect className="art-line trace-slot" {...box} />
                        ) : (
                            <>
                                <rect className="trace-bar" {...box} fill={paint.signal} />
                                <text className="art-text art-num" data-tone="strong" x={layout.times} y={y} textAnchor="end">{time(stage.ms, lang)}</text>
                            </>
                        )}
                    </g>
                );
            })}

            {/* The playhead: where the request is now. In the narrow layout it marks the bar of the stage. */}
            {layout.stacked ? (
                done ? null : (
                    <g className="trace-head" style={{ transform: `translateX(${head.toFixed(1)}px)` }}>
                        <line className="art-line art-line--red" x1="0" y1={top + now * rowH + 12} x2="0" y2={top + now * rowH + 24} />
                    </g>
                )
            ) : (
                <g className="trace-head" style={{ transform: `translateX(${head.toFixed(1)}px)` }}>
                    <line className="art-line art-line--red" x1="0" y1={top - 6} x2="0" y2={top + tall + 6} />
                    <rect x="-3" y={top - 9} width="6" height="6" fill="#FF014F" />
                </g>
            )}

            {/* The two totals on one scale. */}
            <line className="art-line art-line--faint" x1={layout.names} y1={layout.total - 14} x2={layout.times} y2={layout.total - 14} />
            <Label x={layout.names} y={layout.total}>{text.total}</Label>
            {CALLS.map((other, i) => {
                const y = layout.totals[i];
                const width = Math.max(3, (DATA[other].totalMs / LONGEST) * (x1 - x0));
                const lit = other === id;
                return (
                    <g key={other} className="trace-total" data-lit={lit ? 'true' : 'false'}>
                        <text className="art-name" x={layout.names} y={y}>{text[other].label}</text>
                        <rect className="trace-bar" x={x0} y={layout.stacked ? y + 6 : y - 8} width={width} height={layout.stacked ? 6 : 8} rx="2.5" fill={lit ? paint.signal : undefined} />
                        <text className="art-text art-num" data-tone="strong" x={layout.times} y={y} textAnchor="end">{time(DATA[other].totalMs, lang)}</text>
                    </g>
                );
            })}

            {/* What a dashed slot means. */}
            <g>
                <rect className="art-line trace-slot trace-slot--key" x={layout.stacked ? layout.names : layout.times - wrap(text.noTime, 99)[0].length * 7.3 - 26} y={(layout.stacked ? layout.height - 8 : layout.head) - 8} width="16" height="8" rx="2.5" />
                <Label x={layout.stacked ? layout.names + 24 : layout.times} y={layout.stacked ? layout.height - 8 : layout.head} anchor={layout.stacked ? 'start' : 'end'}>{text.noTime}</Label>
            </g>
        </>
    );
}

export default function Trace() {
    const { t, lang } = useLanguage();
    const text = t.intro.art.trace;
    return (
        <Fit>
            {(narrow) => {
                const layout = narrow ? NARROW : WIDE;
                return (
                    <Art label={text.summary} width={layout.width} height={layout.height} className={narrow ? 'art--narrow art-a--narrow' : 'art-a'}>
                        <Scene text={text} layout={layout} lang={lang} />
                    </Art>
                );
            }}
        </Fit>
    );
}
