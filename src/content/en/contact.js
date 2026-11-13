// "Contact" section and the controls that are not part of a section.
import { facts } from '../facts.js';

export const contact = {
    label: 'Contact',
    title: 'Write to me about a system, a role or a bug.',
    text: 'I answer in English and in Portuguese. Tell me about the system, the team and the problem, and I will tell you how I can help.',
    emailCta: 'Write to me',
    copy: 'Copy the address',
    copied: 'Address copied',
    channels: [
        { id: 'email', label: 'Email', value: facts.contact.email },
        { id: 'linkedin', label: 'LinkedIn', value: facts.contact.linkedinHandle },
        { id: 'github', label: 'GitHub', value: facts.contact.githubHandle },
    ],
};

export const controls = {
    theme: 'Theme',
    themes: { dark: 'Dark', light: 'Light' },
    switchToDark: 'Use the dark theme',
    switchToLight: 'Use the light theme',
    external: 'opens in a new tab',
};
