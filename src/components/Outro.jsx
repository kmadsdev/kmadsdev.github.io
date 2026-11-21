// The end of the page: the contact block, the sunset, the footer line.
// The sun is a picture made from scripts/sources/sunset.svg (see scripts/sunset.mjs).
// It keeps its proportions at every width, and the footer line is its horizon.
// Under the sun the footer keeps what is left of it: small red dots (site.css, .site-footer::before).
//
// Contact: the headline, two lead lines, the address as the main object with "E-mail me"
// and "Copy the address", then one row: LinkedIn, "Go back to the top", GitHub.
// Footer: three parts. Left the year of the build and the credit, centre "Back to the top",
// right the source code of this website with a GitHub mark.
import { useState } from 'react';
import { links } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import Icon from './Icon.jsx';

const MAILTO = `mailto:${links.email}`;
// The year of the build (vite.config.js defines __BUILD_YEAR__). Without it, the year of the visit.
// eslint-disable-next-line no-undef -- a build-time constant of vite.config.js
const YEAR = typeof __BUILD_YEAR__ !== 'undefined' ? __BUILD_YEAR__ : new Date().getFullYear();

export function Contact() {
    const { contact } = useLanguage().t;
    const [copied, setCopied] = useState(false);

    async function copyAddress() {
        try {
            await navigator.clipboard.writeText(links.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = MAILTO;
        }
    }

    return (
        <section id="contact" className="outro" aria-labelledby="contact-title">
            <div className="outro-text">
                <p className="wh-label chapter-label">{contact.label}</p>
                <h2 id="contact-title" className="wh-headline wh-headline--section">{contact.title}</h2>
                <div className="outro-lead">
                    {contact.lead.map((line) => <p key={line}>{line}</p>)}
                </div>
                <p className="outro-address">
                    <a className="wh-headline outro-email" href={MAILTO} translate="no">{links.email}</a>
                </p>
                <p className="outro-actions">
                    <a className="button button-primary" href={MAILTO}>
                        <Icon name="mail" />
                        <span>{contact.emailCta}</span>
                    </a>
                    <button type="button" className="button" onClick={copyAddress}>
                        <Icon name={copied ? 'check' : 'copy'} />
                        <span aria-live="polite">{copied ? contact.copied : contact.copy}</span>
                    </button>
                </p>
                <ul className="outro-row">
                    <li>
                        <span className="wh-label">{contact.linkedin}</span>
                        <ExternalLink href={links.linkedin}><span translate="no">{links.linkedinHandle}</span></ExternalLink>
                    </li>
                    <li>
                        <a className="link" href={links.top}><span>{contact.top}</span><Icon name="arrow-up" size={14} /></a>
                    </li>
                    <li>
                        <span className="wh-label">{contact.github}</span>
                        <ExternalLink href={links.github}><span translate="no">{links.githubHandle}</span></ExternalLink>
                    </li>
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

/** The GitHub mark, in one colour (the colour of the text). 16 units, the size of the icons. */
function GitHubMark({ name }) {
    return (
        <svg className="icon footer-mark" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" role="img" aria-label={name} focusable="false">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
    );
}

export function Footer() {
    const { footer, controls } = useLanguage().t;
    return (
        <footer className="site-footer">
            <div className="footer-row">
                <p className="footer-row__credit">© {YEAR} {footer.credit}</p>
                <p className="footer-row__top">
                    <a className="link" href={links.main}><span>{footer.top}</span><Icon name="arrow-up" size={14} /></a>
                </p>
                <p className="footer-row__source">
                    <a className="link" href={links.repo} target="_blank" rel="noopener noreferrer">
                        <span>{footer.source}</span>
                        <GitHubMark name={footer.githubMark} />
                        <span className="visually-hidden"> ({controls.external})</span>
                    </a>
                </p>
            </div>
        </footer>
    );
}
