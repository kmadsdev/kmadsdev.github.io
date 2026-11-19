// One case file under a company: a native <details>.
// Closed, it is one row: title, where it ran, and its first number.
// Open: the numbers, the problem, the flowchart with its steps as text, the
// decisions, the result, the stack and the links.
// Native <details>: Enter and Space open it, and find-in-page opens it too.
import { facts } from '../../content/index.js';
import ExternalLink from '../ExternalLink.jsx';
import { FlowChart, FlowSteps } from '../Flow.jsx';
import { useFlowPlayer } from '../useFlowPlayer.js';

function CaseFlow({ id, text, labels, n }) {
    const structure = facts.cases[id].flow;
    const player = useFlowPlayer(structure.edges.length);
    return (
        <div className="xp-case__flow">
            <FlowChart caseId={id} structure={structure} text={text} player={player} labels={labels} n={n} />
            <div className="xp-case__steps">
                <h5 className="wh-label">{labels.flow}</h5>
                <FlowSteps structure={structure} text={text} player={player} stepLabel={labels.step} />
            </div>
        </div>
    );
}

export default function CaseFile({ item, labels, open, onToggle, n }) {
    const data = facts.cases[item.id];
    const [first] = item.stats;

    return (
        <details
            className="xp-case"
            id={item.anchor}
            open={open}
            onToggle={(event) => onToggle(item.id, event.currentTarget.open)}
        >
            <summary className="xp-case__summary">
                <span className="xp-case__head">
                    <h4 className="xp-case__title">{item.title}</h4>
                    <span className="xp-case__kicker">{item.kicker}</span>
                </span>
                {first ? (
                    <span className="xp-case__peek">
                        <span className="xp-case__peek-value">{first.value}</span>
                        <span className="xp-case__peek-label">{first.label}</span>
                    </span>
                ) : null}
                <span className="xp-case__toggle" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M3 8h10" />
                        <path className="xp-case__toggle-bar" d="M8 3v10" />
                    </svg>
                </span>
            </summary>

            <div className="xp-case__body">
                <dl className="wh-readout xp-case__readout">
                    {item.stats.map((stat) => (
                        <div className="wh-readout__cell" key={stat.label}>
                            <dt className="wh-readout__label">{stat.label}</dt>
                            <dd className="wh-readout__value">{stat.value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="xp-case__problem">
                    <h5 className="wh-label">{labels.problem}</h5>
                    <p>{item.problem}</p>
                </div>

                {item.flow && data.flow ? (
                    <CaseFlow id={item.id} text={item.flow} labels={labels} n={n} />
                ) : (
                    <p className="xp-case__words">{labels.wordsOnly}</p>
                )}

                <div className="xp-case__story">
                    <div>
                        <h5 className="wh-label">{labels.decisions}</h5>
                        <ol className="xp-case__decisions">
                            {item.decisions.map((text) => <li key={text}>{text}</li>)}
                        </ol>
                    </div>
                    <div>
                        <h5 className="wh-label">{labels.result}</h5>
                        <p className="xp-case__result">{item.result}</p>
                    </div>
                </div>

                <div className="xp-case__foot">
                    <div className="xp-case__stack">
                        <h5 className="wh-label">{labels.stack}</h5>
                        <ul className="wh-tags">
                            {data.stack.map((name) => <li key={name}>{name}</li>)}
                        </ul>
                    </div>
                    {data.links?.length ? (
                        <div className="xp-case__links">
                            <h5 className="wh-label">{labels.links}</h5>
                            <p>
                                {data.links.map((link) => (
                                    <ExternalLink key={link.url} href={link.url}>{link.label}</ExternalLink>
                                ))}
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </details>
    );
}
