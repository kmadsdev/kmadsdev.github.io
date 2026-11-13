// First screen.
import { facts } from '../facts.js';

const { person, picpay } = facts;

export const hero = {
    status: `Software Engineer at ${picpay.name}`,
    location: 'Brazil (UTC-3)',
    name: person.name,
    alias: `also known as ${person.alias}`,
    headline: 'I build backend systems and fix the ones nobody wants to open.',
    lead: `Backend Software Engineer at ${picpay.name}. Java, Go, Python, PHP, SQL and MongoDB. I design systems that scale, and I give AI coding agents a structure to follow.`,
    primaryCta: 'Read the case files',
    secondaryCta: 'Send an email',
    scroll: 'Scroll',
    localTime: 'Local time',
    stats: [
        { value: `${person.yearsEngineering}`, label: 'years of engineering work' },
        { value: `${person.codingSince}`, label: 'first line of code' },
        { value: picpay.bodyshop.customers, label: `customers in the scope of ${picpay.bodyshop.name}` },
        { value: picpay.bodyshop.approvalRate, label: 'of pilot images approved with no manual work' },
    ],
};
