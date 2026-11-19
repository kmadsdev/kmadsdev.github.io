// First view: name, role, short summary, four links, place and local time.
// The dot field lives only in this box. The badge is its second body.
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Badge from './Badge.jsx';
import DotField from './DotField.jsx';
import Icon from './Icon.jsx';

const clock = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });

/** The time in São Paulo (UTC-3), refreshed each 20 seconds. */
function useLocalTime() {
    const [time, setTime] = useState(() => clock.format(new Date()));
    useEffect(() => {
        const timer = window.setInterval(() => setTime(clock.format(new Date())), 20000);
        return () => window.clearInterval(timer);
    }, []);
    return time;
}

const ICON = { applications: 'arrow-down', github: 'arrow-up-right', linkedin: 'arrow-up-right', email: 'mail' };

function HeroLink({ link, external }) {
    const outside = /^https:/.test(link.href);
    return (
        <a
            className={`button ${link.id === 'applications' ? 'button-primary' : ''}`.trim()}
            href={link.href}
            {...(outside ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            {link.id === 'email' ? <Icon name={ICON.email} /> : null}
            <span>{link.label}</span>
            {link.id === 'email' ? null : <Icon name={ICON[link.id]} />}
            {outside ? <span className="visually-hidden"> ({external})</span> : null}
        </a>
    );
}

export default function Hero() {
    const { t } = useLanguage();
    const { hero } = t;
    const time = useLocalTime();
    const badgeRef = useRef(null);
    const [first, ...rest] = hero.name.split(' ');

    return (
        <section id="top" className="hero" aria-labelledby="hero-title">
            <DotField bodyRef={badgeRef} />

            <div className="hero-top">
                <p className="status wh-label"><span className="status-dot" aria-hidden="true" />{hero.status}</p>
                <p className="wh-label hero-place">
                    {hero.location.map((part) => <span key={part}>{part}</span>)}
                    <span className="hero-time"><span className="visually-hidden">{hero.localTime} </span>{time}</span>
                </p>
            </div>

            <div className="hero-main">
                <div className="hero-figure">
                    <div className="hero-light" aria-hidden="true" />
                    <Badge ref={badgeRef} className="hero-badge" />
                </div>
                <div className="hero-text">
                    <div className="hero-id">
                        <h1 id="hero-title" className="wh-headline hero-name" translate="no">
                            <span className="hero-word" style={{ '--i': 0 }}>{first}</span>{' '}
                            <span className="hero-word" style={{ '--i': 1 }}>{rest.join(' ')}</span>
                        </h1>
                        <p className="hero-alias" translate="no">{hero.alias}</p>
                    </div>
                    <p className="hero-role">
                        <span>{hero.role}</span>
                        <span className="hero-focus">{hero.focus}</span>
                    </p>
                    <p className="hero-summary">{hero.summary}</p>
                    <ul className="hero-links">
                        {hero.links.map((link) => (
                            <li key={link.id}><HeroLink link={link} external={t.controls.external} /></li>
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
