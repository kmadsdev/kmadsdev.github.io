import { useState } from 'react';
import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
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
            <p className="contact-actions">
                <a className="button button-primary" href={HREF.email}>{contact.emailCta}</a>
                <button type="button" className="button" onClick={copyAddress}>
                    <span aria-live="polite">{copied ? contact.copied : contact.copy}</span>
                </button>
            </p>
            <ul className="channels">
                {contact.channels.map((channel) => (
                    <li className="channel" key={channel.id}>
                        <span className="channel-label">{channel.label}</span>
                        {channel.id === 'email' ? (
                            <a href={HREF.email}>{channel.value}</a>
                        ) : (
                            <ExternalLink href={HREF[channel.id]}>{channel.value}</ExternalLink>
                        )}
                    </li>
                ))}
            </ul>
        </Section>
    );
}
