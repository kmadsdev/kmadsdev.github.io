// The end of the page: the contact block, the sunset, the footer line.
// The sun is a picture made from scripts/sources/sunset.svg (see scripts/sunset.mjs).
// It keeps its proportions at every width, and the footer line is its horizon.
import { useState } from 'react';
import { facts, links } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import Icon from './Icon.jsx';

const HREF = {
    email: `mailto:${links.email}`,
    linkedin: links.linkedin,
    github: links.github,
};

export function Contact() {
    const { contact } = useLanguage().t;
    const [copied, setCopied] = useState(false);

    async function copyAddress() {
        try {
            await navigator.clipboard.writeText(facts.contact.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = HREF.email;
        }
    }

    return (
        <section id="contact" className="outro" aria-labelledby="contact-title">
            <div className="outro-text">
                <p className="wh-label chapter-label">{contact.label}</p>
                <h2 id="contact-title" className="wh-headline wh-headline--section">{contact.title}</h2>
                <p className="outro-lead">{contact.text}</p>
                <p className="outro-address">
                    <a className="wh-headline outro-email" href={HREF.email} translate="no">{facts.contact.email}</a>
                </p>
                <p className="outro-actions">
                    <a className="button button-primary" href={HREF.email}>
                        <Icon name="mail" />
                        <span>{contact.emailCta}</span>
                    </a>
                    <button type="button" className="button" onClick={copyAddress}>
                        <Icon name={copied ? 'check' : 'copy'} />
                        <span aria-live="polite">{copied ? contact.copied : contact.copy}</span>
                    </button>
                </p>
                <ul className="outro-channels">
                    {contact.channels.filter((channel) => channel.id !== 'email').map((channel) => (
                        <li key={channel.id}>
                            <span className="wh-label">{channel.label}</span>
                            <ExternalLink href={HREF[channel.id]}>{channel.value}</ExternalLink>
                        </li>
                    ))}
                </ul>
            </div>
            <img
                className="outro-sun"
                src={links.sunset1440}
                srcSet={`${links.sunset1440} 1440w, ${links.sunset2880} 2880w`}
                sizes="(max-width: 600px) 130vw, 70rem"
                width="1440"
                height="844"
                alt=""
                loading="lazy"
                decoding="async"
            />
        </section>
    );
}

export function Footer() {
    const { footer } = useLanguage().t;
    return (
        <footer className="site-footer">
            <div className="footer-row">
                <p>© {new Date().getFullYear()} {facts.site.domain}. {footer.line}</p>
                <p>{footer.license} <ExternalLink href={links.siteRepo}>{footer.source}</ExternalLink></p>
                <p><a className="link" href={links.top}><span>{footer.top}</span><Icon name="arrow-up" size={14} /></a></p>
            </div>
        </footer>
    );
}
