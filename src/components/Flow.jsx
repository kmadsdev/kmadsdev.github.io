// Live flowchart of one case file.
//
// The chart (SVG) and the step list show the same data: facts.cases[id].flow
// gives the nodes and edges, the language file gives the labels and one
// sentence per edge. One step is active at a time.
//
// The chart keeps a readable size: on a narrow screen its frame scrolls
// sideways, and the frame follows the active step.
import { useEffect, useId, useRef } from 'react';
import { GRID, LAYOUTS, buildLines, center, segment, size, splitLabel } from './flowGeometry.js';
import { useReducedMotion } from '../hooks.js';
import Icon from './Icon.jsx';

const two = (n) => String(n).padStart(2, '0');

function Arrow({ line, state }) {
    return (
        <path
            className="wh-flow__head"
            data-state={state}
            d="M0 0l-7 -3.5v7z"
            transform={`translate(${line.x2} ${line.y2}) rotate(${line.angle})`}
        />
    );
}

/** Keeps the active line in view when the stage is narrower than the chart. */
function useFollow(stageRef, line, width, step) {
    const reduced = useReducedMotion();
    // Runs when the step changes, not on every render: a visitor who scrolls the frame keeps the place.
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage || !line || stage.scrollWidth <= stage.clientWidth + 1) return;
        const scale = stage.scrollWidth / width;
        const middle = ((line.x1 + line.x2) / 2) * scale;
        stage.scrollTo({ left: Math.max(0, middle - stage.clientWidth / 2), behavior: reduced ? 'auto' : 'smooth' });
    }, [step]); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * caseId     key of LAYOUTS and of facts.cases
 * structure  facts.cases[caseId].flow ({ nodes, edges })
 * text       the language file's flow ({ title, nodes, steps })
 * player     useFlowPlayer(structure.edges.length)
 * labels     { prev, next, play, pause }
 * n          optional silk-screen number of the board label (D<n> · title)
 */
export function FlowChart({ caseId, structure, text, player, labels, n }) {
    const layout = LAYOUTS[caseId];
    const { width, height } = size(layout.cells);
    const lines = buildLines(structure.edges, layout.cells);
    const [from, to] = structure.edges[player.active];
    const activeLine = lines.find((line) => line.steps.includes(player.active));
    const stageRef = useRef(null);
    const signal = `flow-signal-${useId().replace(/:/g, '')}`;
    useFollow(stageRef, activeLine, width, player.active);

    return (
        <figure
            className="wh-flow"
            ref={player.ref}
            onPointerEnter={player.hold}
            onPointerLeave={player.release}
            onFocus={player.hold}
            onBlur={player.release}
        >
            <div className="wh-flow__bar">
                <figcaption className="wh-label wh-flow__title">
                    {n ? <span aria-hidden="true">D{n} · </span> : null}
                    {text.title}
                </figcaption>
                <div className="wh-flow__controls">
                    <span className="wh-flow__count" aria-hidden="true">{two(player.active + 1)} / {two(structure.edges.length)}</span>
                    <button type="button" className="wh-flow__button" onClick={player.prev} aria-label={labels.prev}><Icon name="prev" /></button>
                    {player.canPlay ? (
                        <button type="button" className="wh-flow__button" onClick={player.toggle} aria-label={player.playing ? labels.pause : labels.play}>
                            <Icon name={player.playing ? 'pause' : 'play'} />
                        </button>
                    ) : null}
                    <button type="button" className="wh-flow__button" onClick={player.next} aria-label={labels.next}><Icon name="next" /></button>
                </div>
            </div>

            <div className="wh-flow__stage" ref={stageRef}>
                <svg
                    className="wh-flow__svg"
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ '--flow-w': `${width}px` }}
                    role="img"
                    aria-label={`${text.title}. ${Object.values(text.nodes).join(', ')}.`}
                >
                    <defs>
                        <linearGradient id={signal} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#B300FF" />
                            <stop offset="1" stopColor="#009DFF" />
                        </linearGradient>
                    </defs>
                    {(layout.links ?? []).map(([a, b]) => {
                        const link = segment(center(layout.cells[a]), center(layout.cells[b]));
                        return <line key={`${a}-${b}`} className="wh-flow__edge wh-flow__edge--link" x1={link.x1} y1={link.y1} x2={link.x2} y2={link.y2} />;
                    })}
                    {lines.map((line) => {
                        const state = line === activeLine ? 'active' : 'idle';
                        return (
                            <g key={line.key}>
                                <line className="wh-flow__edge" data-state={state} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
                                <Arrow line={line} state={state} />
                            </g>
                        );
                    })}
                    {activeLine ? (
                        <circle key={player.active} className="wh-flow__packet" r="4" cx={activeLine.x1} cy={activeLine.y1} fill={`url(#${signal})`}>
                            <animate attributeName="cx" from={activeLine.x1} to={activeLine.x2} dur="1.1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.65 0 0.35 1" />
                            <animate attributeName="cy" from={activeLine.y1} to={activeLine.y2} dur="1.1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.65 0 0.35 1" />
                        </circle>
                    ) : null}
                    {structure.nodes.map((id) => {
                        const c = center(layout.cells[id]);
                        const { name, sub } = splitLabel(text.nodes[id]);
                        const x = c.x - GRID.nodeW / 2;
                        const y = c.y - GRID.nodeH / 2;
                        return (
                            <g key={id} className="wh-flow__node" data-state={id === from || id === to ? 'active' : 'idle'}>
                                <rect x={x} y={y} width={GRID.nodeW} height={GRID.nodeH} rx="8" />
                                <circle className="wh-flow__pin" cx={x + GRID.nodeW - 10} cy={y + 10} r="2" />
                                <text className="wh-flow__node-name" x={x + 12} y={sub ? c.y - 3 : c.y + 4}>{name}</text>
                                {sub ? <text className="wh-flow__node-sub" x={x + 12} y={c.y + 13}>{sub}</text> : null}
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="wh-flow__caption" aria-live="off">
                <span className="wh-flow__caption-index">{two(player.active + 1)}</span>
                <p className="wh-flow__caption-text">{text.steps[player.active]}</p>
            </div>
        </figure>
    );
}

export function FlowSteps({ structure, text, player, stepLabel }) {
    return (
        <ol className="wh-steps">
            {structure.edges.map(([from, to], i) => (
                <li className="wh-steps__item" key={`${from}-${to}-${i}`}>
                    <button type="button" className="wh-steps__button" aria-current={player.active === i ? 'step' : undefined} onClick={() => player.select(i)}>
                        <span className="wh-steps__index">
                            <span className="visually-hidden">{stepLabel} </span>
                            {two(i + 1)}
                        </span>
                        <span>
                            <span className="wh-steps__route">
                                {text.nodes[from]}
                                <span aria-hidden="true"> → </span>
                                <span className="visually-hidden"> &gt; </span>
                                {text.nodes[to]}
                            </span>
                            <span className="wh-steps__text">{text.steps[i]}</span>
                        </span>
                    </button>
                </li>
            ))}
        </ol>
    );
}
