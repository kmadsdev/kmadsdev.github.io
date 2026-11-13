import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import { FlowChart, FlowSteps } from './Flow.jsx';
import Section from './Section.jsx';
import { useFlowPlayer } from './useFlowPlayer.js';

const two = (n) => String(n).padStart(2, '0');

function CaseFile({ item, position, total, labels }) {
    const data = facts.cases[item.id];
    const player = useFlowPlayer(data.flow.edges.length);
    return (
        <article className="case" id={`case-${item.id}`} aria-labelledby={`case-${item.id}-title`}>
            <header className="case-head">
                <p className="wh-label case-kicker">
                    <span className="case-number" aria-hidden="true">{two(position)}<span>/{two(total)}</span></span>
                    {item.kicker}
                </p>
                <h3 id={`case-${item.id}-title`} className="wh-headline wh-headline--item case-title">{item.title}</h3>
            </header>

            <dl className="wh-readout wh-readout--surface case-readout">
                {item.stats.map((stat) => (
                    <div className="wh-readout__cell" key={stat.label}>
                        <dt className="wh-readout__label">{stat.label}</dt>
                        <dd className="wh-readout__value">{stat.value}</dd>
                    </div>
                ))}
            </dl>

            <div className="case-grid">
                <div className="case-scope">
                    <h4 className="visually-hidden">{labels.flow}</h4>
                    <FlowChart caseId={item.id} structure={data.flow} text={item.flow} player={player} labels={labels} />
                    <ul className="wh-tags case-stack" aria-label={labels.stack}>
                        {data.stack.map((name) => <li key={name}>{name}</li>)}
                    </ul>
                    {data.links ? (
                        <p className="case-links">
                            {data.links.map((link) => (
                                <ExternalLink key={link.url} href={link.url}>{link.label}</ExternalLink>
                            ))}
                        </p>
                    ) : null}
                </div>

                <div className="case-story">
                    <div className="case-block">
                        <h4 className="wh-label wh-label--accent">{labels.problem}</h4>
                        <p className="case-problem">{item.problem}</p>
                    </div>
                    <div className="case-block">
                        <h4 className="wh-label">{labels.decisions}</h4>
                        <ol className="case-decisions">
                            {item.decisions.map((text) => <li key={text}>{text}</li>)}
                        </ol>
                    </div>
                    <div className="case-block">
                        <h4 className="wh-label">{labels.result}</h4>
                        <p className="case-result">{item.result}</p>
                    </div>
                    <div className="case-block">
                        <h4 className="wh-label">{labels.flow}</h4>
                        <FlowSteps structure={data.flow} text={item.flow} player={player} stepLabel={labels.step} />
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function Cases() {
    const { cases } = useLanguage().t;
    return (
        <Section id="cases" index="03" label={cases.label} title={cases.title} intro={cases.intro} className="section-wide">
            <div className="case-list">
                {cases.items.map((item, i) => (
                    <CaseFile key={item.id} item={item} position={i + 1} total={cases.items.length} labels={cases.labels} />
                ))}
            </div>
        </Section>
    );
}
