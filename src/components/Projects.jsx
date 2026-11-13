import { useRef, useState } from 'react';
import { facts } from '../content/index.js';
import { useReducedMotion } from '../hooks.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import Icon from './Icon.jsx';
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

/**
 * Poster image of a project. When the project has a clip, the clip plays under
 * the pointer and stops when the pointer leaves; the button does the same for
 * touch and keyboard. The clip loads only on the first play. With reduced
 * motion, only the poster shows.
 */
function Media({ data, labels }) {
    const video = useRef(null);
    const [playing, setPlaying] = useState(false);
    const reduced = useReducedMotion();

    if (!data.video || reduced) {
        return (
            <div className="project-media">
                <img src={data.image} alt="" loading="lazy" decoding="async" />
            </div>
        );
    }

    const play = () => {
        const started = video.current?.play();
        if (started?.catch) started.catch(() => {});
    };
    const pause = () => video.current?.pause();
    const byMouse = (action) => (event) => {
        if (event.pointerType === 'mouse') action();
    };

    return (
        <div className="project-media project-clip" data-playing={playing} onPointerEnter={byMouse(play)} onPointerLeave={byMouse(pause)}>
            <video
                ref={video}
                muted
                loop
                playsInline
                preload="none"
                poster={data.image}
                tabIndex={-1}
                aria-hidden="true"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
            >
                <source src={data.video} type="video/mp4" />
            </video>
            <button type="button" className="clip-button" onClick={playing ? pause : play} aria-label={`${playing ? labels.pauseClip : labels.playClip}: ${data.name}`}>
                <Icon name={playing ? 'pause' : 'play'} />
            </button>
        </div>
    );
}

function Project({ item, labels, featured }) {
    const data = facts.projects[item.id];
    return (
        <li className={featured ? 'project project-featured' : 'project'}>
            {featured ? <Media data={data} labels={labels} /> : null}
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
