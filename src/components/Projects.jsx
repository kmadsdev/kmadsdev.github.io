import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import Section from './Section.jsx';

function Links({ data, labels }) {
    return (
        <p className="project-links">
            {data.live ? <ExternalLink href={data.live}>{labels.live}</ExternalLink> : null}
            {data.source ? <ExternalLink href={data.source}>{labels.source}</ExternalLink> : null}
            {!data.live && !data.source ? <span className="project-private wh-label">{labels.privateRepo}</span> : null}
        </p>
    );
}

function Project({ item, labels, featured }) {
    const data = facts.projects[item.id];
    return (
        <li className={featured ? 'project project-featured' : 'project'}>
            {featured ? (
                <div className="project-media" data-fit={data.imageFit ?? 'cover'}>
                    <img src={data.image} alt="" loading="lazy" decoding="async" />
                </div>
            ) : null}
            <div className="project-body">
                <h3 className={featured ? 'wh-headline wh-headline--item' : 'project-name'}>{data.name}</h3>
                <p className="project-tagline">{item.tagline}</p>
                <p className="project-text">{item.text}</p>
                <ul className="wh-tags" aria-label={labels.stack}>
                    {data.stack.map((name) => <li key={name}>{name}</li>)}
                </ul>
                <Links data={data} labels={labels} />
            </div>
        </li>
    );
}

export default function Projects() {
    const { projects } = useLanguage().t;
    const featured = projects.items.filter((item) => facts.projects[item.id].image);
    const rest = projects.items.filter((item) => !facts.projects[item.id].image);
    return (
        <Section id="projects" index="04" label={projects.label} title={projects.title} intro={projects.intro} className="section-wide">
            <ul className="project-features">
                {featured.map((item) => <Project key={item.id} item={item} labels={projects} featured />)}
            </ul>
            <ul className="project-index">
                {rest.map((item) => <Project key={item.id} item={item} labels={projects} />)}
            </ul>
        </Section>
    );
}
