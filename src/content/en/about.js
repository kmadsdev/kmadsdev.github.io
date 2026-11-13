// "About" section.
import { facts } from '../facts.js';

const { person, picpay, site } = facts;

export const about = {
    label: 'About',
    title: 'Eight years in tech, three of them as an engineer.',
    paragraphs: [
        `I wrote my first code in ${person.codingSince}, for Discord bots that ran in communities of up to ${facts.earlier.discord.members} members. Today I have ${person.yearsEngineering} years of engineering experience and ${person.yearsInTech} years in tech.`,
        `At ${picpay.name}, a Brazilian fintech with about ${picpay.registeredUsers} registered and ${picpay.activeUsers} active users, I work on the backend of the cards area: ${picpay.cards.microservices} Java and Go microservices and the legacy systems around them. They answer millions of requests and write billions of log lines a day.`,
        `I also co-founded two startup MVPs, and I run my own apps in production on ${site.domain}: more than ${site.monthlyVisitors} visitors and ${site.requests} requests a month, measured at Cloudflare.`,
    ],
    principlesTitle: 'How I work',
    principles: [
        {
            title: 'I ask why before I ask what',
            text: 'A stack is a decision, and each decision has a cost. On Project Survey, one question about the plan moved the team from microservices to a layered monolith.',
        },
        {
            title: 'I read the system before I change it',
            text: 'Legacy code with no documents still tells the truth in its data and its logs. I start there, then I write the test, then I write the fix.',
        },
        {
            title: 'I give AI agents rules, not wishes',
            text: 'Shared task files, test-first rules and a fixed set of MCP servers and skills. Every agent on the team starts from the same context.',
        },
    ],
};
