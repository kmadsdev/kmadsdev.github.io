// Example 2 of the art kit: the fuel map of an engine control unit.
// A surface over a grid: engine speed to the right, load to the back. The ECU
// reads the cell under the operating point. The point drives one pull: idle,
// throttle open, the revs climb at high load, throttle shut, the revs fall.
// The drawing has no numbers: the shape is typical, not a measured map.
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Label, useArt, useStep } from './kit/index.js';

const COLS = 10; // cells of engine speed
const ROWS = 7; // cells of load
const O = { x: 14, y: 196 };
const CELL = { x: 26, back: 12.5, up: 13.5, tilt: 3.4, lift: 92 };

// Height of the map at a grid point, 0 to 1: more fuel with more load, and a hump where the engine breathes best.
function height(i, j) {
    const u = i / COLS;
    const v = j / ROWS;
    return (0.16 + 0.84 * v ** 0.9) * (0.5 + 0.5 * Math.exp(-((u - 0.62) ** 2) / 0.085));
}
function project(i, j, h = height(i, j)) {
    return [O.x + i * CELL.x + j * CELL.back, O.y - j * CELL.up + i * CELL.tilt - h * CELL.lift];
}
const pt = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const quad = (i, j) => [project(i, j), project(i + 1, j), project(i + 1, j + 1), project(i, j + 1)].map(pt).join(' ');
const centre = (i, j) => project(i + 0.5, j + 0.5, (height(i, j) + height(i + 1, j) + height(i + 1, j + 1) + height(i, j + 1)) / 4);

// Tone of a cell: higher cells are a little lighter.
function tone(i, j) {
    const h = (height(i, j) + height(i + 1, j + 1)) / 2;
    const c = (from, to) => Math.round(from + (to - from) * h);
    return `rgb(${c(18, 46)} ${c(18, 44)} ${c(26, 62)})`;
}

const CELLS = [];
for (let j = ROWS - 1; j >= 0; j -= 1) for (let i = 0; i < COLS; i += 1) CELLS.push([i, j]);

// One pull, cell by cell: [speed, load].
const RUN = [[1, 1], [2, 1], [2, 3], [3, 5], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [9, 4], [8, 2], [7, 1], [6, 1], [5, 1], [4, 1], [3, 1], [2, 1]];
const TAIL = 6;

function Scene({ text }) {
    const { paint } = useArt();
    const step = useStep(RUN.length, 430, 7);
    const [ci, cj] = RUN[step];
    const [px, py] = centre(ci, cj);
    const floor = project(ci + 0.5, cj + 0.5, 0);
    const trail = [];
    for (let k = TAIL; k >= 0; k -= 1) trail.push(centre(...RUN[(step - k + RUN.length) % RUN.length]));
    const base = [project(0, 0, 0), project(COLS, 0, 0), project(COLS, ROWS, 0), project(0, ROWS, 0)];

    return (
        <>
            {/* The floor of the map and its two axes. */}
            <polygon className="art-line art-line--faint" points={base.map(pt).join(' ')} strokeDasharray="2 4" />
            {[0, COLS].map((i) => (
                <line key={i} className="art-line art-line--faint" x1={project(i, ROWS, 0)[0]} y1={project(i, ROWS, 0)[1]} x2={project(i, ROWS)[0]} y2={project(i, ROWS)[1]} />
            ))}
            {Array.from({ length: COLS + 1 }, (_, i) => {
                const [x, y] = project(i, 0, 0);
                return <line key={i} className="art-line art-line--faint" x1={x} y1={y + 4} x2={x} y2={y + (i % 5 === 0 ? 11 : 8)} />;
            })}
            <Label x={project(COLS / 2, 0, 0)[0]} y={project(COLS / 2, 0, 0)[1] + 28} anchor="middle">{text.rpm}</Label>
            <Label x={project(COLS, ROWS / 2, 0)[0] + 14} y={project(COLS, ROWS / 2, 0)[1] + 4}>{text.load}</Label>

            {/* The surface, from the back row to the front row. */}
            {CELLS.map(([i, j]) => (
                <polygon key={`${i}-${j}`} className="art-line fuel-cell" points={quad(i, j)} fill={tone(i, j)} />
            ))}

            {/* The cell in use, the way to it, and the point. */}
            <polygon className="art-line art-line--red" points={quad(ci, cj)} fill="rgb(255 1 79 / 0.28)" />
            <polyline className="art-line" points={trail.map(pt).join(' ')} stroke={paint.signal} strokeWidth="2" />
            <line className="art-line art-line--red" x1={floor[0]} y1={floor[1]} x2={px} y2={py} strokeDasharray="1 4" />
            <circle cx={floor[0]} cy={floor[1]} r="2" fill="#FF014F" opacity="0.6" />
            <g className="fuel-point" style={{ transform: `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)` }}>
                <circle r="8" fill="rgb(255 1 79 / 0.22)" />
                <circle r="3.6" fill="#FF014F" />
            </g>
        </>
    );
}

export default function FuelMap() {
    const { art } = useLanguage().t;
    return (
        <Art label={art.fuelMap.label} width={420} height={258}>
            <Scene text={art.fuelMap} />
        </Art>
    );
}
