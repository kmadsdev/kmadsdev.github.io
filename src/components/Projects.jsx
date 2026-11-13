import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import Section from './Section.jsx';

function Project({ item, labels }) {
    const data = facts.projects[item.id];
    const isPrivate = !data.live && !data.source;
    return (
        <li className={`project${data.image ? ' project-with-image' : ''}`}>
            {data.image ? (
                <div className="project-media">
                    <img src={data.image} alt="" loading="lazy" decoding="async" />
                </div>
            ) : null}
            <div className="project-body">
                <h3 className="project-name">{data.name}</h3>
                <p className="project-tagline">{item.tagline}</p>
                <p className="project-text">{item.text}</p>
                <ul className="tags" aria-label={labels.stack}>
                    {data.stack.map((name) => <li key={name}>{name}</li>)}
                </ul>
                <p className="project-links">
                    {data.live ? <ExternalLink href={data.live}>{labels.live}</ExternalLink> : null}
                    {data.source ? <ExternalLink href={data.source}>{labels.source}</ExternalLink> : null}
                    {isPrivate ? <span className="project-private">{labels.privateRepo}</span> : null}
                </p>
            </div>
        </li>
    );
}

export default function Projects() {
    const { projects } = useLanguage().t;
    return (
        <Section id="projects" index="04" label={projects.label} title={projects.title} intro={projects.intro}>
            <ul className="project-list">
                {projects.items.map((item) => <Project key={item.id} item={item} labels={projects} />)}
            </ul>
        </Section>
    );
}
