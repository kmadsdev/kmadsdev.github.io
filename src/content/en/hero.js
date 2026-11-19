// First screen: name, role, a short summary, the location and four links.
import { facts } from '../facts.js';

const { person, picpay, contact } = facts;

export const hero = {
    status: `Software Engineer at ${picpay.name}`,
    name: person.name,
    alias: person.aliasUpper,
    role: 'Software Engineer',
    focus: 'Architecture & Cloud',
    summary: `I focus on backend, architecture and cloud, and most of all on reliability and performance. I have ${person.yearsEngineering} years of engineering experience and ${person.yearsInTech} years in tech, and today I work on the credit card engines of ${picpay.name}.`,
    location: [`${person.city}, ${person.state}, Brazil`, 'Remote', person.utc],
    localTime: 'Local time',
    links: [
        { id: 'applications', label: 'Applications', href: '/projects' },
        { id: 'github', label: 'GitHub', href: contact.github },
        { id: 'linkedin', label: 'LinkedIn', href: contact.linkedin },
        { id: 'email', label: 'Email', href: `mailto:${contact.email}` },
    ],
    scroll: 'Scroll',
};
