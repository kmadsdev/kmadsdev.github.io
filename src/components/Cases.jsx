import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import Flow from './Flow.jsx';
import Section from './Section.jsx';

function CaseFile({ item, number, labels }) {
    const data = facts.cases[item.id];
    return (
        <article className="case" id={`case-${item.id}`} aria-labelledby={`case-${item.id}-title`}>
            <header className="case-head">
                <p className="case-kicker">
                    <span className="case-number" aria-hidden="true">{number}</span>
                    {item.kicker}
                </p>
                <h3 id={`case-${item.id}-title`} className="case-title">{item.title}</h3>
            </header>

            <dl className="case-stats">
                {item.stats.map((stat) => (
                    <div className="stat" key={stat.label}>
                        <dt className="stat-label">{stat.label}</dt>
                        <dd className="stat-value">{stat.value}</dd>
                    </div>
                ))}
            </dl>

            <div className="case-story">
                <div className="case-block case-problem">
                    <h4>{labels.problem}</h4>
                    <p>{item.problem}</p>
                </div>
                <div className="case-block case-decisions">
                    <h4>{labels.decisions}</h4>
                    <ol>
                        {item.decisions.map((text) => <li key={text}>{text}</li>)}
                    </ol>
                </div>
                <div className="case-block case-result">
                    <h4>{labels.result}</h4>
                    <p>{item.result}</p>
                </div>
            </div>

            <div className="case-flow">
                <h4 className="visually-hidden">{labels.flow}</h4>
                <Flow caseId={item.id} structure={data.flow} text={item.flow} stepLabel={labels.step} />
            </div>

            <footer className="case-foot">
                <h4 className="visually-hidden">{labels.stack}</h4>
                <ul className="tags">
                    {data.stack.map((name) => <li key={name}>{name}</li>)}
                </ul>
                {data.links ? (
                    <p className="case-links">
                        {data.links.map((link) => (
                            <ExternalLink key={link.url} href={link.url}>{link.label}</ExternalLink>
                        ))}
                    </p>
                ) : null}
            </footer>
        </article>
    );
}

export default function Cases() {
    const { cases } = useLanguage().t;
    return (
        <Section id="cases" index="03" label={cases.label} title={cases.title} intro={cases.intro}>
            <div className="case-list">
                {cases.items.map((item, i) => (
                    <CaseFile key={item.id} item={item} number={`${String(i + 1).padStart(2, '0')}/${String(cases.items.length).padStart(2, '0')}`} labels={cases.labels} />
                ))}
            </div>
        </Section>
    );
}
