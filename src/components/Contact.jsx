import { useState } from 'react';
import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import Icon from './Icon.jsx';
import Section from './Section.jsx';

const HREF = {
    email: `mailto:${facts.contact.email}`,
    linkedin: facts.contact.linkedin,
    github: facts.contact.github,
};

export default function Contact() {
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
        <Section id="contact" index="07" label={contact.label} title={contact.title} intro={contact.text} className="contact">
            <p className="contact-address">
                <a className="wh-headline contact-email" href={HREF.email}>{facts.contact.email}</a>
            </p>
            <p className="contact-actions">
                <a className="button button-primary" href={HREF.email}>
                    <Icon name="mail" />
                    <span>{contact.emailCta}</span>
                </a>
                <button type="button" className="button" onClick={copyAddress}>
                    <Icon name={copied ? 'check' : 'copy'} />
                    <span aria-live="polite">{copied ? contact.copied : contact.copy}</span>
                </button>
            </p>
            <ul className="wh-spec channels">
                {contact.channels.map((channel) => (
                    <li className="wh-spec__row" key={channel.id}>
                        <span className="wh-spec__name wh-label">{channel.label}</span>
                        <span className="wh-spec__body">
                            {channel.id === 'email' ? (
                                <a className="link" href={HREF.email}>{channel.value}</a>
                            ) : (
                                <ExternalLink href={HREF[channel.id]}>{channel.value}</ExternalLink>
                            )}
                        </span>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
