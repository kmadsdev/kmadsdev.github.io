// First view: name, role, short summary, four links (the first one is the main one), place and local time.
// The dot field lives only in this box. The badge is its second body.
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Badge from './Badge.jsx';
import DotField from './DotField.jsx';
import Icon from './Icon.jsx';
import Rich from './Rich.jsx';
import { PROJECTS_PATH, openProjects } from '../routes.js';
import { person } from '../content/index.js';

const clock = new Intl.DateTimeFormat('en-GB', { timeZone: person.timeZone, hour: '2-digit', minute: '2-digit' });

/** The time in São Paulo (UTC-3), refreshed each 20 seconds. */
function useLocalTime() {
    const [time, setTime] = useState(() => clock.format(new Date()));
    useEffect(() => {
        const timer = window.setInterval(() => setTime(clock.format(new Date())), 20000);
        return () => window.clearInterval(timer);
    }, []);
    return time;
}

/** The icon of a link comes from its address, not from its id: a place on this page, a letter, or another page. */
const iconOf = (href) => (/^mailto:/.test(href) ? 'mail' : href === PROJECTS_PATH || href.startsWith('#') ? 'arrow-down' : 'arrow-up-right');

function HeroLink({ link, external, primary }) {
    const outside = /^https:/.test(link.href);
    const icon = iconOf(link.href);
    return (
        <a
            className={`button ${primary ? 'button-primary' : ''}`.trim()}
            href={link.href}
            onClick={link.href === PROJECTS_PATH ? openProjects : undefined}
            {...(outside ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            {icon === 'mail' ? <Icon name={icon} /> : null}
            <span>{link.label}</span>
            {icon === 'mail' ? null : <Icon name={icon} />}
            {outside ? <span className="visually-hidden"> ({external})</span> : null}
        </a>
    );
}

export default function Hero() {
    const { t } = useLanguage();
    const { hero } = t;
    const time = useLocalTime();
    const badgeRef = useRef(null);
    const [first, ...rest] = person.name.split(' ');

    return (
        <section id="top" className="hero" aria-labelledby="hero-title">
            <DotField bodyRef={badgeRef} />

            <div className="hero-top">
                {hero.status ? <p className="wh-label">{hero.status}</p> : null}
                <p className="wh-label hero-place">
                    {hero.location.map((part) => <span key={part}>{part}</span>)}
                    <span className="hero-time"><span className="visually-hidden">{hero.localTime} </span>{time}</span>
                </p>
            </div>

            <div className="hero-main">
                <div className="hero-figure">
                    <Badge ref={badgeRef} className="hero-badge" />
                </div>
                <div className="hero-text">
                    <div className="hero-id">
                        <h1 id="hero-title" className="wh-headline hero-name" translate="no">
                            <span className="hero-word" style={{ '--i': 0 }}>{first}</span>{' '}
                            <span className="hero-word" style={{ '--i': 1 }}>{rest.join(' ')}</span>
                        </h1>
                        <p className="hero-alias" translate="no">{person.aliasUpper}</p>
                    </div>
                    <p className="hero-role">
                        <span>{hero.role}</span>
                        <span className="hero-focus">{hero.focus}</span>
                    </p>
                    {/* A string in the old content file, rich text (with links) in the new ones. */}
                    <p className="hero-summary">{Array.isArray(hero.summary) ? <Rich text={hero.summary} /> : hero.summary}</p>
                    <ul className="hero-links">
                        {hero.links.map((link, i) => (
                            <li key={link.id}><HeroLink link={link} external={t.controls.external} primary={i === 0} /></li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="hero-scroll wh-label" aria-hidden="true">
                <Icon name="arrow-down" size={14} />
                {hero.scroll}
            </p>
        </section>
    );
}
