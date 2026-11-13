import { useEffect, useState } from 'react';
import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Icon from './Icon.jsx';

const clock = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });

/** The time in Brazil (UTC-3), refreshed each 20 seconds. */
function useLocalTime() {
    const [time, setTime] = useState(() => clock.format(new Date()));
    useEffect(() => {
        const timer = window.setInterval(() => setTime(clock.format(new Date())), 20000);
        return () => window.clearInterval(timer);
    }, []);
    return time;
}

export default function Hero() {
    const { t } = useLanguage();
    const { hero } = t;
    const time = useLocalTime();
    const words = hero.headline.split(' ');
    return (
        <section id="top" className="hero" aria-labelledby="hero-title">
            <div className="hero-top">
                <p className="status wh-label"><span className="status-dot" aria-hidden="true" />{hero.status}</p>
                <p className="wh-label hero-place">
                    <span>{hero.location}</span>
                    <span className="hero-time"><span className="visually-hidden">{hero.localTime} </span>{time}</span>
                </p>
            </div>

            <div className="hero-main">
                <p className="hero-name">
                    <strong>{hero.name}</strong> <span>{hero.alias}</span>
                </p>
                <h1 id="hero-title" className="wh-headline wh-headline--hero hero-headline" key={hero.headline}>
                    {words.map((word, i) => (
                        <span key={`${word}-${i}`}>
                            <span className="hero-word" style={{ '--i': i }}>{word}</span>
                            {i < words.length - 1 ? ' ' : ''}
                        </span>
                    ))}
                </h1>
                <div className="hero-lower">
                    <p className="hero-lead">{hero.lead}</p>
                    <p className="hero-actions">
                        <a className="button button-primary" href="#cases">
                            <span>{hero.primaryCta}</span>
                            <Icon name="arrow-down" />
                        </a>
                        <a className="button" href={`mailto:${facts.contact.email}`}>
                            <Icon name="mail" />
                            <span>{hero.secondaryCta}</span>
                        </a>
                    </p>
                </div>
            </div>

            <dl className="wh-readout hero-readout">
                {hero.stats.map((stat) => (
                    <div className="wh-readout__cell" key={stat.label}>
                        <dt className="wh-readout__label">{stat.label}</dt>
                        <dd className="wh-readout__value">{stat.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
