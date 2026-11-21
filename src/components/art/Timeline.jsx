// Full-stack chapter: 2018 to 2026 on one axis, one tick per year.
// An entry is one year or a range of years (`from`, `to` in art.timeline). A range is a
// strong segment of the axis. Wide box: the axis goes left to right and each entry stands
// at its first year, on a stem above or below the axis. Narrow box: the axis goes top to
// bottom, and a year with no entry is a small tick between two entries.
// The label of an entry is rich text with links to the proof. So this drawing is HTML on
// top of an SVG: the SVG (axis, ticks, stems, the packet) is decorative and hidden from
// screen readers, and the entries are a real ordered list.
// Motion: a packet goes along the axis from one entry to the next. The entry
// that it reached is red. Still picture: the last entry.
import { useRef } from 'react';
import { art } from '../../content/index.js';
import { plain } from '../../content/rich.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import Rich from '../Rich.jsx';
import { Art, Wire, useStep } from './kit/index.js';
import { Dot, TYPE, useUnits, wrap } from './artBKit.jsx';

// `year` is where the entry stands on the axis: its first year.
const ENTRIES = art.timeline.map((entry) => ({ ...entry, year: entry.from }));
const FIRST = Math.min(...ENTRIES.map((e) => e.from));
const LAST = Math.max(...ENTRIES.map((e) => e.to));
/** '2018–2020' for a range, '2024' for one year. */
const yearsOf = (entry) => (entry.from === entry.to ? `${entry.from}` : `${entry.from}–${entry.to}`);
const YEARS = Array.from({ length: LAST - FIRST + 1 }, (_, i) => FIRST + i);
const YEAR_H = 26; // the line of the year number
const STEM = 14; // from the axis to the first block
const ICON = 20; // room for the arrow after the name

function block(entry, text, width) {
    const label = wrap(plain(text.items[entry.id].label), width - ICON, TYPE.name);
    const note = wrap(text.items[entry.id].text, width, TYPE.note);
    return { ...entry, label, note, w: width, h: YEAR_H + label.length * TYPE.name.lead + note.length * TYPE.note.lead };
}

// Entries on one side must not touch: a block, or the stem of a block that is farther from the axis.
function place(W, text, bw, xOf, mask) {
    const placed = [];
    ENTRIES.forEach((entry, i) => {
        const b = block(entry, text, bw);
        const side = i % 2 ? 'below' : 'above';
        const x = xOf(entry.year);
        // Bit i of the mask: the text of entry i stands on the left of its stem.
        const both = [{ align: 'start', left: x + 12 }, { align: 'end', left: x - 12 - bw }];
        const options = ((mask >> i) & 1 ? both.reverse() : both).filter((o) => o.left >= 0 && o.left + bw <= W).slice(0, 1);
        const same = placed.filter((p) => p.side === side);
        const inside = (px, left) => px > left - 8 && px < left + bw + 8;
        const free = (o, level) => same.every((p) => {
            if (p.level === level && o.left < p.left + bw + 12 && p.left < o.left + bw + 12) return false;
            if (p.level <= level && inside(x, p.left)) return false;
            if (p.level >= level && inside(p.x, o.left)) return false;
            return true;
        });
        for (let level = 0; ; level += 1) {
            const fit = options.find((o) => free(o, level));
            if (fit || level > 4) {
                placed.push({ ...b, ...(fit || options[0] || { align: 'start', left: Math.max(0, Math.min(W - bw, x + 12)) }), side, level, x });
                break;
            }
        }
    });
    return placed;
}

function buildWide(W, text) {
    const x0 = 12;
    const x1 = W - 12;
    const xOf = (year) => x0 + ((x1 - x0) * (year - FIRST)) / (LAST - FIRST);
    // The widest block that keeps every entry next to the axis, for any choice of sides of the stems.
    // If no width does that, the choice with the fewest levels.
    let placed = null;
    let best = Infinity;
    for (let bw = 212; bw >= 140 && best; bw -= 12) {
        for (let mask = 0; mask < 2 ** ENTRIES.length && best; mask += 1) {
            const trial = place(W, text, bw, xOf, mask);
            const depth = trial.reduce((sum, p) => sum + p.level, 0);
            if (depth < best) { best = depth; placed = trial; }
        }
    }
    const levelH = (side) => Math.max(0, ...placed.filter((p) => p.side === side).map((p) => p.h));
    const levels = (side) => Math.max(-1, ...placed.filter((p) => p.side === side).map((p) => p.level)) + 1;
    const offset = (p) => STEM + p.level * (levelH(p.side) + 16);
    const axis = Math.max(8, 2 + STEM + levels('above') * (levelH('above') + 16) - 16);
    const height = Math.max(axis + 8, axis + STEM + levels('below') * (levelH('below') + 16) - 16 + 2);
    const entries = placed.map((p) => {
        const near = p.side === 'above' ? axis - offset(p) : axis + offset(p);
        const far = p.side === 'above' ? near - p.h : near + p.h;
        return { ...p, cx: p.x, cy: axis, top: Math.min(near, far), stem: `M${p.x} ${p.side === 'above' ? axis - 6 : axis + 6}V${far}` };
    });
    return {
        wide: true,
        width: W,
        height,
        entries,
        ticks: YEARS.map((year) => `M${xOf(year)} ${axis - 4}V${axis + 4}`),
        spans: ENTRIES.filter((e) => e.to > e.from).map((e) => `M${xOf(e.from)} ${axis}H${xOf(e.to)}`),
        hops: entries.map((e, i) => (i ? `M${entries[i - 1].cx} ${axis}H${e.cx}` : null)),
    };
}

function buildTall(W, text) {
    const ax = 8;
    const left = 30;
    let y = 2;
    const ticks = [];
    const entries = ENTRIES.map((entry, i) => {
        const b = block(entry, text, W - left);
        const e = { ...b, side: 'tall', align: 'start', left, top: y, cx: ax, cy: y + 12, stem: `M${ax + 6} ${y + 12}H${left - 8}` };
        y += b.h + 18;
        const next = ENTRIES[i + 1];
        // Years with no entry: one small tick each.
        if (next) for (let year = entry.to + 1; year < next.from; year += 1) { ticks.push(`M${ax - 3} ${y}H${ax + 3}`); y += 14; }
        if (next && next.from - entry.to > 1) y += 4;
        return e;
    });
    return {
        wide: false,
        width: W,
        height: y - 18 + 2,
        entries,
        ticks,
        spans: [],
        hops: entries.map((e, i) => (i ? `M${ax} ${entries[i - 1].cy}V${e.cy}` : null)),
    };
}

function Scene({ layout }) {
    const { entries, hops, ticks, spans } = layout;
    const step = useStep(entries.length, 1800, entries.length - 1);
    return (
        <>
            {hops.map((d, i) => (d ? <Wire key={i} d={d} tone={i === step ? 'signal' : i < step ? 'idle' : 'faint'} /> : null))}
            {ticks.map((d) => <path key={d} className="art-line art-line--faint" d={d} />)}
            {spans.map((d) => <path key={d} className="art-line art-line--strong artb-tl__span" d={d} />)}
            {entries.map((e, i) => (
                <path key={e.id} className={`art-line ${i === step ? 'art-line--strong' : 'art-line--faint'}`} d={e.stem} />
            ))}
            {hops[step] ? <Dot key={step} d={hops[step]} ms={1100} /> : null}
            {entries.map((e, i) => (
                <circle key={e.id} className="artb-year" data-state={i === step ? 'active' : i < step ? 'done' : 'idle'} cx={e.cx} cy={e.cy} r="5" />
            ))}
        </>
    );
}

/** One entry: the year or the range, the label (its links go to the proof), the note. */
function Entry({ entry, text }) {
    return (
        <div className="artb-tl__entry">
            <span className="artb-tl__year">{yearsOf(entry)}</span>
            <span className="artb-tl__label"><Rich text={text.items[entry.id].label} linkClassName="artb-tl__link" /></span>
            <span className="artb-tl__note">{text.items[entry.id].text}</span>
        </div>
    );
}

export default function Timeline() {
    const text = useLanguage().t.intro.art.timeline;
    const box = useRef(null);
    const W = useUnits(box, { min: 232, max: 1400 });
    const layout = W >= 600 ? buildWide(W, text) : buildTall(W, text);
    const pct = (value, of) => `${((value / of) * 100).toFixed(3)}%`;
    return (
        <div ref={box} className="artb artb-tl" data-layout={layout.wide ? 'wide' : 'tall'}>
            <Art decorative width={layout.width} height={layout.height}>
                <Scene layout={layout} />
            </Art>
            <ol className="artb-tl__list" aria-label={text.title}>
                {layout.entries.map((entry) => (
                    <li
                        key={entry.id}
                        data-align={entry.align}
                        style={{ left: pct(entry.left, layout.width), top: pct(entry.top, layout.height), width: pct(entry.w, layout.width) }}
                    >
                        <Entry entry={entry} text={text} />
                    </li>
                ))}
            </ol>
        </div>
    );
}
