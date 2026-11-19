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
    external: 'opens in a new tab',
    stopBadge: 'Stop the badge',
    // Disclosures: long text and details open in place.
    readMore: 'Read the full story',
    readLess: 'Show less',
    showDetails: 'Show the details',
    hideDetails: 'Hide the details',
    playBadge: 'Turn the badge',
};
