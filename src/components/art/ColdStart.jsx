// Cloud chapter: the measured start of the stopped AKS cluster, in its parts.
// Time is length. The top line is the whole start with one tick per minute.
// Under it, each part is a bar that starts where the part before it ends, so
// the longest part is the longest bar. While the drawing is on screen the start
// runs at a constant speed: the part that runs now is red, a finished part is
// dotted, and the end of the line turns mint at the first answer.
// Still picture: all parts finished, the longest one in red.
import { useRef } from 'react';
import { facts } from '../../content/index.js';
import { duration } from '../../content/format.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Halftone, useArt, useStep } from './kit/index.js';
import { Lines, TYPE, measure, useUnits, wrap } from './artBKit.jsx';

const DATA = facts.art.coldStart;
const TOTAL = DATA.totalSeconds;
// Each part with the second at which it starts.
const PARTS = DATA.parts.reduce((list, part) => [...list, { ...part, start: list.length ? list[list.length - 1].start + list[list.length - 1].seconds : 0 }], []);
const LONGEST = PARTS.reduce((a, b) => (b.seconds > a.seconds ? b : a)).id;
const MS_PER_SECOND = 18; // one measured second is 18 ms on the drawing
const RUN = TOTAL * MS_PER_SECOND;
const HOLD = 3200;
const BAR = 16;

function build(W, text) {
    const wide = W >= 520;
    const times = Object.fromEntries(PARTS.map((p) => [p.id, duration(p.seconds)]));
    const timeW = Math.ceil(Math.max(measure(duration(TOTAL), TYPE.name), ...PARTS.map((p) => measure(times[p.id], TYPE.name)))) + 4;
    const names = [text.total, ...PARTS.map((p) => text.parts[p.id])];
    if (wide) {
        const nameW = Math.min(Math.ceil(Math.max(...names.map((n) => measure(n, TYPE.mono)))), Math.floor(W * 0.32));
        const x0 = nameW + 18;
        const x1 = W - timeW - 14;
        let y = 4;
        const rows = names.map((name, i) => {
            const lines = wrap(name, nameW, TYPE.mono);
            const h = Math.max(34, lines.length * TYPE.mono.lead + 16);
            const row = { lines, cy: y + h / 2, nameX: 0, nameY: y + h / 2 + 4 - ((lines.length - 1) * TYPE.mono.lead) / 2, timeY: y + h / 2 + 4.5, gap: i === 0 ? 8 : 0 };
            y += h + row.gap;
            return row;
        });
        return { wide, width: W, height: y + 2, x0, x1, rows, times };
    }
    const nameW = W - timeW - 12;
    let y = 0;
    const rows = names.map((name, i) => {
        const lines = wrap(name, nameW, TYPE.mono);
        const textH = lines.length * TYPE.mono.lead;
        const row = { lines, nameX: 0, nameY: y + 11, timeY: y + 11.5, cy: y + textH + 6 + BAR / 2 };
        y += textH + 6 + BAR + (i === 0 ? 20 : 16);
        return row;
    });
    return { wide, width: W, height: y - 14, x0: 1, x1: W - 5, rows, times };
}

function Scene({ layout, text }) {
    const { motion } = useArt();
    // One run of the start, then a rest. The key starts the CSS animations again.
    const run = useStep(1000, RUN + HOLD, 0);
    const { x0, x1, rows, times } = layout;
    const at = (seconds) => x0 + ((x1 - x0) * seconds) / TOTAL;
    const total = rows[0];
    const minutes = [];
    for (let s = 60; s < TOTAL; s += 60) minutes.push(s);
    const timing = (part) => ({ '--t': `${part.start * MS_PER_SECOND}ms`, '--d': `${part.seconds * MS_PER_SECOND}ms` });

    return (
        <g key={run} className="artb-cold" data-run={motion ? 'on' : 'off'}>
            {/* The whole start: a line with one tick per minute. */}
            <Lines className="art-text" lines={total.lines} x={total.nameX} y={total.nameY} type={TYPE.mono} />
            <text className="artb-name artb-num" data-tone="strong" x={layout.width} y={total.timeY} textAnchor="end">{duration(TOTAL)}</text>
            <line className="art-line" x1={x0} y1={total.cy} x2={x1} y2={total.cy} />
            <line className="art-line" x1={x0} y1={total.cy - 5} x2={x0} y2={total.cy + 5} />
            {minutes.map((s) => (
                <line key={s} className="art-line art-line--faint" x1={at(s)} y1={total.cy} x2={at(s)} y2={total.cy + 5} />
            ))}
            {/* Where each part starts, from the line down to its bar. */}
            {PARTS.slice(1).map((part, i) => (
                <line key={part.id} className="art-line art-line--faint" strokeDasharray="1 4" x1={at(part.start)} y1={total.cy} x2={at(part.start)} y2={rows[i + 2].cy - BAR / 2} />
            ))}

            {PARTS.map((part, i) => {
                const row = rows[i + 1];
                const box = { x: at(part.start), y: row.cy - BAR / 2, width: Math.max(2, at(part.start + part.seconds) - at(part.start)), height: BAR, rx: 3 };
                return (
                    <g key={part.id} style={timing(part)}>
                        <Lines className="art-text" lines={row.lines} x={row.nameX} y={row.nameY} type={TYPE.mono} />
                        <text className="artb-name artb-num" data-tone="strong" x={layout.width} y={row.timeY} textAnchor="end">{times[part.id]}</text>
                        <rect className="artb-cold__track" {...box} />
                        <rect className="artb-cold__grow artb-cold__ink" {...box} />
                        <Halftone fill="ink" opacity={0.9}>
                            <rect className="artb-cold__grow" {...box} />
                        </Halftone>
                        <rect className="artb-cold__grow artb-cold__hot" data-longest={part.id === LONGEST ? 'true' : undefined} {...box} />
                    </g>
                );
            })}

            {/* The clock on the line, and the first answer at its end. */}
            <circle className="artb-cold__clock" cx={x0} cy={total.cy} r="3.5" style={{ '--w': `${x1 - x0}px`, '--d': `${RUN}ms` }} />
            <circle className="artb-cold__answer" cx={x1} cy={total.cy} r="4" style={{ '--t': `${RUN}ms` }} />
        </g>
    );
}

export default function ColdStart() {
    const text = useLanguage().t.intro.art.coldStart;
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
