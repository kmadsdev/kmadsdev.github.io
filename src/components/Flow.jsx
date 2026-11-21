// Live flowchart of one case file.
//
// The chart (SVG) and the step list show the same data: cases[id].flow (contents.global.js)
// gives the nodes and edges, the language file gives the labels and one
// sentence per edge. One step is active at a time.
//
// Two layouts (flowGeometry.js): the wide one, and a tall one with at most two
// nodes side by side. The frame width chooses: a frame narrower than the wide
// chart (a phone, a narrow column) gets the tall chart, whole and at full size.
// No sideways scroll.
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { LAYOUTS, MAX_CHARS, buildLines, center, layoutFor, segment, size, splitLabel, wrapLabel } from './flowGeometry.js';
import Icon from './Icon.jsx';

const two = (n) => String(n).padStart(2, '0');
const LINE = 15; // px between two lines of one node name

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

/** True while the frame is narrower than the wide chart. Measured before paint, and again on resize. */
function useNarrow(ref, wideWidth) {
    const [narrow, setNarrow] = useState(false);
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const update = () => {
            const w = el.clientWidth;
            if (w > 0) setNarrow(w < wideWidth);
        };
        update();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, wideWidth]);
    return narrow;
}

/** One node: a box, its name on one or two lines, and the detail under it. No corner dot. */
function Node({ id, cell, grid, label, active, max }) {
    const c = center(cell, grid);
    const { name, sub } = splitLabel(label);
    const lines = wrapLabel(name, max);
    const total = (lines.length - 1) * LINE + (sub ? 16 : 0);
    const first = c.y - total / 2 + (sub ? 5 : 4);
    const x = c.x - grid.nodeW / 2;
    const y = c.y - grid.nodeH / 2;
    return (
        <g className="wh-flow__node" data-state={active ? 'active' : 'idle'} data-node={id}>
            <rect x={x} y={y} width={grid.nodeW} height={grid.nodeH} rx="8" />
            <text className="wh-flow__node-name" x={x + 12} y={first}>
                {lines.map((line, i) => <tspan key={line} x={x + 12} dy={i ? LINE : 0}>{line}</tspan>)}
            </text>
            {sub ? <text className="wh-flow__node-sub" x={x + 12} y={first + (lines.length - 1) * LINE + 16}>{sub}</text> : null}
        </g>
    );
}

/**
 * caseId     key of LAYOUTS and of `cases`
 * structure  cases[caseId].flow ({ nodes, edges })
 * text       the language file's flow ({ title, nodes, steps })
 * player     useFlowPlayer(structure.edges.length)
 * labels     { prev, next, play, pause }
 */
export function FlowChart({ caseId, structure, text, player, labels }) {
    const stageRef = useRef(null);
    const wide = size(LAYOUTS[caseId].cells);
    const narrow = useNarrow(stageRef, wide.width);
    const { cells, links, grid } = layoutFor(caseId, narrow);
    const { width, height } = size(cells, grid);
    const lines = buildLines(structure.edges, cells, grid);
    const [from, to] = structure.edges[player.active];
    const activeLine = lines.find((line) => line.steps.includes(player.active));
    const signal = `flow-signal-${useId().replace(/:/g, '')}`;
    const max = narrow ? MAX_CHARS.narrow : MAX_CHARS.wide;

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
                <figcaption className="wh-label wh-flow__title">{text.title}</figcaption>
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
                    data-layout={narrow ? 'narrow' : 'wide'}
                    role="img"
                    aria-label={`${text.title}. ${Object.values(text.nodes).join(', ')}.`}
                >
                    <defs>
                        <linearGradient id={signal} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#B300FF" />
                            <stop offset="1" stopColor="#009DFF" />
                        </linearGradient>
                    </defs>
                    {links.map(([a, b]) => {
                        const link = segment(center(cells[a], grid), center(cells[b], grid), 0, grid);
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
                        <circle key={`${player.active}-${narrow}`} className="wh-flow__packet" r="4" cx={activeLine.x1} cy={activeLine.y1} fill={`url(#${signal})`}>
                            <animate attributeName="cx" from={activeLine.x1} to={activeLine.x2} dur="1.1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.65 0 0.35 1" />
                            <animate attributeName="cy" from={activeLine.y1} to={activeLine.y2} dur="1.1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.65 0 0.35 1" />
                        </circle>
                    ) : null}
                    {structure.nodes.map((id) => (
                        <Node key={id} id={id} cell={cells[id]} grid={grid} label={text.nodes[id]} active={id === from || id === to} max={max} />
                    ))}
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
