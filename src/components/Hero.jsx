import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';

export default function Hero() {
    const { t } = useLanguage();
    const { hero } = t;
    return (
        <section id="top" className="hero" aria-labelledby="hero-title">
            <p className="hero-meta">
                <span className="status"><span className="status-dot" aria-hidden="true" />{hero.status}</span>
                <span className="hero-location">{hero.location}</span>
            </p>
            <p className="hero-name">
                {hero.name} <span className="hero-alias">{hero.alias}</span>
            </p>
            <h1 id="hero-title" className="hero-headline">{hero.headline}</h1>
            <p className="hero-lead">{hero.lead}</p>
            <p className="hero-actions">
                <a className="button button-primary" href="#cases">{hero.primaryCta}</a>
                <a className="button" href={`mailto:${facts.contact.email}`}>{hero.secondaryCta}</a>
            </p>
            <dl className="hero-stats">
                {hero.stats.map((stat) => (
                    <div className="stat" key={stat.label}>
                        <dt className="stat-label">{stat.label}</dt>
                        <dd className="stat-value">{stat.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
