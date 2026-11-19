// The margin check of a payroll loan, from facts.art.margin (the worked example
// of the consignado-api README, synthetic numbers).
// Each gauge is one net salary. The cap of the agreement is a share of the
// salary, so the cap line stands at the same place on both gauges. The bar is the
// largest installment as a share of that salary. With a salary of R$ 4,200.00 the
// bar stays far inside the margin. With an income of R$ 1,000.00 the same loan
// crosses the line by a little, and the API refuses it.
import { facts } from '../../content/index.js';
import { local } from '../../content/format.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Halftone, Label, Packet, Wire, useArt, useStep } from './kit/index.js';
import { Fit, Lines } from './artAKit.jsx';

const DATA = facts.art.margin;
// 'R$ 4,200.00' -> 4200, '35%' -> 35
const number = (value) => Number(String(value).replace(/[^0-9.]/g, ''));
const CAP = number(DATA.capPercent) / 100;
const FITS = number(DATA.largestInstallment) / number(DATA.netSalary);
const OVER = number(DATA.refused.committed) / number(DATA.refused.income);
const STEPS = 6;

const WIDE = { width: 600, height: 286, x0: 8, x1: 592 };
const NARROW = { width: 300, height: 432, x0: 8, x1: 292 };

/** A small name over its value. */
function Pair({ x, y, name, value, lit = true }) {
    return (
        <g className="margin-part" data-lit={lit ? 'true' : 'false'}>
            <Label x={x} y={y}>{name}</Label>
            <text className="art-name margin-value" x={x} y={y + 18}>{value}</text>
        </g>
    );
}

/** One line: the name on the left, the value on the right. */
function Row({ x0, x1, y, name, value, tone = 'strong' }) {
    return (
        <>
            <Label x={x0} y={y}>{name}</Label>
            <Label x={x1} y={y} anchor="end" tone={tone}>{value}</Label>
        </>
    );
}

function Check({ x, y }) {
    return <path className="art-line art-line--strong" d={`M${x} ${y - 4}l3.2 3.4 6-7`} />;
}

/** The salary as a track, the margin as a halftone zone, the installment as a bar. */
function Gauge({ layout, y, h, share, refused, grown }) {
    const { paint } = useArt();
    const { x0, x1 } = layout;
    const cap = x0 + (x1 - x0) * CAP;
    const end = x0 + (x1 - x0) * share;
    const pad = h > 24 ? 4 : 3;
    return (
        <>
            <Halftone fill={refused ? 'ink' : 'signal'} opacity={refused ? 0.5 : 0.6}>
                <rect x={x0} y={y} width={cap - x0} height={h} />
            </Halftone>
            <rect className="art-line art-line--faint" x={x0} y={y} width={x1 - x0} height={h} rx="5" />
            <g className="margin-bar" data-grown={grown ? 'true' : 'false'}>
                <rect x={x0} y={y + pad} width={Math.min(end, cap) - x0} height={h - pad * 2} rx="2.5" fill={refused ? 'rgb(255 255 255 / 0.34)' : paint.signal} />
                {end > cap ? <rect x={cap} y={y + pad} width={Math.max(2, end - cap)} height={h - pad * 2} fill="#FF014F" /> : null}
            </g>
            <line className={`art-line margin-cap ${refused && grown ? 'art-line--red' : 'art-line--strong'}`} x1={cap} y1={y - 7} x2={cap} y2={y + h + 7} />
        </>
    );
}

function Scene({ text, layout, lang, narrow }) {
    const step = useStep(STEPS, 1500, STEPS - 1);
    const L = text.labels;
    const money = (value) => local(value, lang);
    const { x0, x1 } = layout;
    const cap = x0 + (x1 - x0) * CAP;
    const shown = { loan: true, fits: step >= 1, refused: step >= 3, over: step >= 4 };
    const capText = `${L.cap} ${DATA.capPercent}`;
    const fitsText = L.fits;
    const refusedText = `${DATA.refused.status} · ${L.refused}`;

    if (narrow) {
        const feed = 'M32 128V160';
        return (
            <>
                <Lines x={x0} y={16} text={text.rule} max={38} />
                <Pair x={8} y={54} name={L.principal} value={money(DATA.principal)} />
                <Pair x={160} y={54} name={L.term} value={DATA.termMonths} />
                <Pair x={8} y={94} name={L.rate} value={money(DATA.monthlyRate)} />
                <Pair x={160} y={94} name={L.installment} value={money(DATA.installment)} />
                <line className="art-line art-line--faint" x1={x0} y1={128} x2={x1} y2={128} />
                <Wire d={feed} tone={step === 0 ? 'active' : 'idle'} arrow />
                {step === 0 ? <Packet key="feed" d={feed} dur={1.5} /> : null}
                <Label x={46} y={150}>{capText}</Label>

                <Gauge layout={layout} y={162} h={24} share={FITS} grown={shown.fits} />
                <g className="margin-part" data-lit={shown.fits ? 'true' : 'false'}>
                    <Row x0={x0} x1={x1} y={212} name={L.netSalary} value={money(DATA.netSalary)} />
                    <Row x0={x0} x1={x1} y={228} name={L.marginLimit} value={money(DATA.marginLimit)} />
                    <Row x0={x0} x1={x1} y={244} name={L.largest} value={money(DATA.largestInstallment)} />
                    <Check x={x0 + 1} y={263} />
                    <Label x={x0 + 18} y={264} tone="strong">{fitsText}</Label>
                </g>

                <g className="margin-part" data-lit={shown.refused ? 'true' : 'false'}>
                    <Gauge layout={layout} y={288} h={24} share={OVER} refused grown={shown.over} />
                    <Row x0={x0} x1={x1} y={338} name={L.netSalary} value={money(DATA.refused.income)} />
                    <Row x0={x0} x1={x1} y={354} name={L.marginLimit} value={money(DATA.refused.marginLimit)} />
                    <Row x0={x0} x1={x1} y={370} name={L.installment} value={money(DATA.refused.committed)} tone={shown.over ? 'red' : 'strong'} />
                </g>
                <g className="margin-part" data-lit={shown.over ? 'true' : 'false'}>
                    <Lines x={x0} y={390} text={refusedText} max={38} tone="red" />
                </g>
                <Lines x={x0} y={410} text={L.synthetic} max={40} />
            </>
        );
    }

    const feed = 'M430 66V78Q430 86 422 86H40Q32 86 32 94V112';
    const pass = 'M32 150V200';
    return (
        <>
            <Label x={x0} y={16}>{text.rule}</Label>
            <Pair x={8} y={40} name={L.principal} value={money(DATA.principal)} />
            <Pair x={150} y={40} name={L.term} value={DATA.termMonths} />
            <Pair x={232} y={40} name={L.rate} value={money(DATA.monthlyRate)} />
            <Wire d="M346 50H384" arrow />
            <Pair x={398} y={40} name={L.installment} value={money(DATA.installment)} />

            <Wire d={feed} tone={step === 0 ? 'active' : 'idle'} arrow />
            {step === 0 ? <Packet key="feed" d={feed} dur={1.5} /> : null}
            <Wire d={pass} tone={step === 3 ? 'active' : 'idle'} arrow />
            {step === 3 ? <Packet key="pass" d={pass} dur={1.5} /> : null}

            <Label x={cap - 8} y={108} anchor="end" tone="strong">{`${L.marginLimit} ${money(DATA.marginLimit)}`}</Label>
            <Label x={cap + 8} y={108}>{capText}</Label>
            <Label x={x1} y={108} anchor="end">{`${L.netSalary} ${money(DATA.netSalary)}`}</Label>
            <Gauge layout={layout} y={116} h={30} share={FITS} grown={shown.fits} />
            <g className="margin-part" data-lit={shown.fits ? 'true' : 'false'}>
                <Label x={46} y={166}>{`${L.largest} ${money(DATA.largestInstallment)}`}</Label>
                <Check x={x1 - fitsText.length * 7.3 - 16} y={165} />
                <Label x={x1} y={166} anchor="end" tone="strong">{fitsText}</Label>
            </g>

            <g className="margin-part" data-lit={shown.refused ? 'true' : 'false'}>
                <Label x={x1} y={194} anchor="end">{`${L.netSalary} ${money(DATA.refused.income)}`}</Label>
                <Gauge layout={layout} y={202} h={30} share={OVER} refused grown={shown.over} />
                <Label x={x0} y={252}>{`${L.marginLimit} ${money(DATA.refused.marginLimit)} · ${L.installment} ${money(DATA.refused.committed)}`}</Label>
            </g>
            <g className="margin-part" data-lit={shown.over ? 'true' : 'false'}>
                <Label x={x1} y={252} anchor="end" tone="red">{refusedText}</Label>
            </g>
            <Label x={x0} y={layout.height - 6}>{L.synthetic}</Label>
        </>
    );
}

export default function Margin() {
    const { t, lang } = useLanguage();
    const text = t.intro.art.margin;
    return (
        <Fit limit={520}>
            {(narrow) => {
                const layout = narrow ? NARROW : WIDE;
                return (
                    <Art label={text.summary} width={layout.width} height={layout.height} className={narrow ? 'art--narrow art-a--narrow' : 'art-a'}>
                        <Scene text={text} layout={layout} lang={lang} narrow={narrow} />
                    </Art>
                );
            }}
        </Fit>
    );
}
