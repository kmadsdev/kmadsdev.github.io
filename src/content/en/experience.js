// "Experience" section. Dates and numbers come from facts.js.
import { facts } from '../facts.js';
import { period, years } from '../format.js';

const { picpay, startups, earlier } = facts;
const { bodyshop, survey, cards, oracle } = picpay;
const { hivemind, trocatine } = startups;

export const experience = {
    label: 'Experience',
    title: 'Where I worked and what I changed there.',
    intro: 'Newest first. Each line is something I did, not something I watched.',
    current: 'Current',
    items: [
        {
            id: 'picpay-full-time',
            role: 'Software Engineer (Full-time)',
            company: picpay.name,
            period: period(picpay.fullTime, 'en'),
            context: `Brazilian fintech with about ${picpay.registeredUsers} registered and ${picpay.activeUsers} active users.`,
            bullets: [
                `I write and maintain Java (Spring Boot, JPA) and Go microservices for the cards area, with messaging, CI/CD and observability. The area runs ${cards.microservices} microservices and legacy systems that answer millions of requests from hundreds of thousands of clients.`,
                `I found and fixed bugs and hidden defects in ${cards.legacySystems} legacy Java systems, closed hundreds of client incidents, and built self-healing jobs that clean the database with no manual work.`,
                `I led ${bodyshop.engineersLed} engineers on ${bodyshop.name}: ${bodyshop.services} internal services that replace the wrong or generic car image shown to ${bodyshop.customers} customers. I made the stack and scope decisions and took it to QA with governance approval.`,
                `I wrote the ${bodyshop.name} Agentic Template before kickoff: shared task, progress and knowledge files, test-first rules, MCP servers and skills. The AI coding agents of all ${bodyshop.teamSize} people on the team worked from one context.`,
                `On ${survey.name}, in a team of ${survey.teamSize}, I worked on the backend API, the MySQL design and indexes, and the infrastructure of a survey platform for about ${survey.employees} employees.`,
            ],
        },
        {
            id: 'picpay-part-time',
            role: 'Software Engineer (Part-time)',
            company: picpay.name,
            period: period(picpay.partTime, 'en'),
            context: 'Corporate IT, HR data. Close contact with HR, Legal and Compliance.',
            bullets: [
                'I indexed and mapped hundreds of Oracle Cloud HCM databases and organized the HR data that feeds predictive models.',
                `I reverse-engineered legacy Oracle systems that run since the ${oracle.legacySince} and have no documents. The data was the only source.`,
                `I wrote SQL automations and decision-support queries, and I planned the database design that replaces legacy views of ${oracle.viewLines} lines with no index.`,
                'The work saved hundreds of hours of research for engineers and analysts.',
            ],
        },
        {
            id: 'startups',
            role: 'Co-founder',
            company: `${hivemind.name} and ${trocatine.name}`,
            period: period(startups, 'en'),
            context: 'Two startup MVPs before launch, shown to the public at ExpoTech. Not full-time jobs.',
            bullets: [
                `${hivemind.name} (${hivemind.year}, B2B lead scoring): I led ${hivemind.developersLed} developers on the backend and data team, trained the models, and built a FastAPI service that loads the newest model from S3 and swaps it with no redeploy.`,
                `About ${hivemind.visitors} ExpoTech visitors rated ${hivemind.name} ${hivemind.rating}.`,
                `${trocatine.name} (${trocatine.year}, exchange of children's clothes and toys): I led the frontend team of ${trocatine.frontendTeam}, built the landing page, and ran the Java backend (JDBC, Apache Tomcat) and the SQL databases on Aiven and Docker.`,
                `About ${trocatine.visitors} ExpoTech visitors rated ${trocatine.name} ${trocatine.rating}.`,
            ],
        },
    ],
    earlierTitle: 'Before that',
    earlier: [
        {
            id: 'discord',
            title: 'Discord bot developer, self-taught',
            period: years(earlier.discord),
            text: `Moderation, ticket, survey, game and music bots, plus webhooks, for communities of up to ${earlier.discord.members} members. JavaScript (Node.js, Discord.js), SQLite and Java.`,
        },
        {
            id: 'reddit',
            title: 'PC build advisor, volunteer',
            period: years(earlier.reddit),
            text: `I helped ${earlier.reddit.people} people on Reddit to choose parts, stay in budget and repair their computers on Windows, macOS and Linux.`,
        },
    ],
};
