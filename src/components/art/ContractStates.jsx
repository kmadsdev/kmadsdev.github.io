// The contract state machine of consignado-api, from facts.art.contractStates.
// One contract moves through the states: to the end of a paid loan, then to a
// rejection, then to a cancellation after approval. The transition in use is red,
// the way the contract came keeps the signal colour, and the readout names the
// transition. A final state has a double border. The dot is the start.
import { facts } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art, Halftone, Packet, Wire, useStep } from './kit/index.js';
import { Box, Fit, Readout } from './artAKit.jsx';

const DATA = facts.art.contractStates;
const FINAL = new Set(DATA.terminal);
const find = (from, target) => DATA.transitions.find((t) => t.from === from && t.target === target);
// The lives of one contract, as lists of states. Each move is a transition of the data.
const LIVES = [
    ['SIMULATED', 'PROPOSED', 'APPROVED', 'ACTIVE', 'SETTLED'],
    ['SIMULATED', 'PROPOSED', 'REJECTED'],
    ['SIMULATED', 'PROPOSED', 'APPROVED', 'CANCELLED'],
].filter((life) => life.every((state, i) => i === 0 || find(life[i - 1], state)));
const STEPS = LIVES.flatMap((life, n) => life.map((_, at) => ({ life: n, at })));
// With reduced motion: the approval, where the API checks the margin again.
const REST = Math.max(0, STEPS.findIndex((step) => step.life === 0 && LIVES[0][step.at] === 'APPROVED'));

const WIDE = {
    width: 610,
    height: 204,
    w: 96,
    h: 44,
    at: {
        SIMULATED: { x: 26, y: 30 },
        PROPOSED: { x: 146, y: 30 },
        APPROVED: { x: 266, y: 30 },
        ACTIVE: { x: 386, y: 30 },
        SETTLED: { x: 506, y: 30 },
        REJECTED: { x: 26, y: 150 },
        CANCELLED: { x: 266, y: 150 },
    },
    wires: {
        'SIMULATED>PROPOSED': 'M122 52H146',
        'PROPOSED>APPROVED': 'M242 52H266',
        'APPROVED>ACTIVE': 'M362 52H386',
        'ACTIVE>SETTLED': 'M482 52H506',
        'PROPOSED>REJECTED': 'M176 74V164Q176 172 168 172H122',
        'PROPOSED>CANCELLED': 'M212 74V104Q212 112 220 112H286Q294 112 294 120V150',
        'APPROVED>CANCELLED': 'M314 74V150',
        'ACTIVE>CANCELLED': 'M416 74V104Q416 112 408 112H342Q334 112 334 120V150',
    },
    start: { dot: [9, 52], wire: 'M13 52H26' },
    readout: { x: 390, y: 160, max: 26 },
    glow: 76,
};
const NARROW = {
    width: 300,
    height: 364,
    w: 124,
    h: 44,
    at: {
        SIMULATED: { x: 8, y: 30 },
        PROPOSED: { x: 8, y: 100 },
        APPROVED: { x: 8, y: 170 },
        ACTIVE: { x: 8, y: 240 },
        SETTLED: { x: 8, y: 310 },
        REJECTED: { x: 168, y: 100 },
        CANCELLED: { x: 168, y: 205 },
    },
    wires: {
        'SIMULATED>PROPOSED': 'M70 74V100',
        'PROPOSED>APPROVED': 'M70 144V170',
        'APPROVED>ACTIVE': 'M70 214V240',
        'ACTIVE>SETTLED': 'M70 284V310',
        'PROPOSED>REJECTED': 'M132 114H168',
        'PROPOSED>CANCELLED': 'M132 134H142Q150 134 150 142V219Q150 227 158 227H168',
        'APPROVED>CANCELLED': 'M132 192H142Q150 192 150 200V219Q150 227 158 227H168',
        'ACTIVE>CANCELLED': 'M132 262H142Q150 262 150 254V235Q150 227 158 227H168',
    },
    start: { dot: [70, 9], wire: 'M70 13V30' },
    readout: { x: 168, y: 292, max: 15 },
    glow: 64,
};

function Scene({ text, layout }) {
    const index = useStep(STEPS.length, 1200, REST);
    const step = STEPS[index];
    const life = LIVES[step.life];
    const here = life[step.at];
    const before = step.at > 0 ? life[step.at - 1] : null;
    const move = before ? find(before, here) : null;
    const came = new Set(life.slice(0, step.at).map((state, i) => `${state}>${life[i + 1]}`));
    const seen = new Set(life.slice(0, step.at));
    const spot = layout.at[here];

    return (
        <>
            <Halftone fill="signal" fade="radial" opacity={0.45}>
                <circle className="states-glow" r={layout.glow} style={{ transform: `translate(${spot.x + layout.w / 2}px, ${spot.y + layout.h / 2}px)` }} />
            </Halftone>

            <circle cx={layout.start.dot[0]} cy={layout.start.dot[1]} r="3.5" fill="rgb(255 255 255 / 0.5)" />
            <Wire d={layout.start.wire} tone={move ? 'idle' : 'active'} arrow />
            {DATA.transitions.map(({ from, target }) => {
                const key = `${from}>${target}`;
                const active = move && from === before && target === here;
                return <Wire key={key} d={layout.wires[key]} tone={active ? 'active' : came.has(key) && !active ? 'signal' : 'idle'} arrow />;
            })}
            {move ? <Packet key={index} d={layout.wires[`${before}>${here}`]} dur={1.2} /> : null}

            {DATA.states.map((state) => (
                <Box
                    key={state}
                    {...layout.at[state]}
                    w={layout.w}
                    h={layout.h}
                    name={text.states[state]}
                    state={state === here ? 'active' : seen.has(state) ? 'seen' : 'idle'}
                    pin="off"
                    final={FINAL.has(state)}
                />
            ))}

            <Readout {...layout.readout} text={move ? text.transitions[move.id] : text.states[here]} />
        </>
    );
}

export default function ContractStates() {
    const text = useLanguage().t.intro.art.contractStates;
    return (
        <Fit>
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
