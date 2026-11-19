// "Experience" section: company, period, role, responsibilities, impact.
// Under each company: the projects I built or led there (ids of `cases`, see cases.js).
// Dates and numbers come from facts.js.
import { facts } from '../facts.js';
import { period, years } from '../format.js';

const { picpay, startups, earlier, legacy } = facts;
const { bodyshop, survey, cards, oracle } = picpay;
const { hivemind, trocatine } = startups;

export const experience = {
    label: 'Experience',
    title: 'Where I worked and what I changed there.',
    lead: 'One fintech, two startup MVPs and five years of Discord bots.',
    labels: {
        current: 'Current',
        responsibilities: 'Responsibilities',
        impact: 'Impact',
        projects: 'Projects',
        tools: 'Delivery tools',
        stack: 'Stack',
    },
    items: [
        {
            id: 'picpay',
            anchor: 'exp-picpay',
            company: picpay.name,
            context: `Brazilian fintech with about ${picpay.registeredUsers} registered and ${picpay.activeUsers} active users.`,
            current: true,
            roles: [
                {
                    title: 'Software Engineer (Full-time)',
                    period: period(picpay.fullTime, 'en'),
                    note: 'Cards area, credit acquisition. Also the Vehicle Hub in the bills area and the engineering team of the HR area.',
                },
                {
                    title: 'Software Engineer (Part-time)',
                    period: period(picpay.partTime, 'en'),
                    note: 'Corporate IT, Oracle HCM squad. Close contact with HR, Legal and Compliance.',
                },
            ],
            responsibilities: [
                `I write and maintain Java (Spring Boot, JPA) and Go microservices for the cards area, with messaging, CI/CD and observability. The area runs ${cards.microservices} microservices and legacy systems that answer millions of requests from hundreds of thousands of clients.`,
                'I analyze incidents across the microservices and keep the backend reliable.',
                'I design architecture inside the compliance guidelines of the company.',
                `I do the CI/CD and unit test work on ${picpay.delivery.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`,
                'I model databases and optimize queries.',
            ],
            impact: [
                `I found and fixed bugs and hidden defects in ${cards.legacySystems} legacy Java systems, closed hundreds of client incidents, and built self-healing jobs that clean the database with no manual work.`,
                `I led ${bodyshop.engineersLed} engineers on ${bodyshop.name}: ${bodyshop.services} internal services, built to replace the wrong or generic car image that ${bodyshop.customers} customers see. I made the stack and scope decisions and took it to QA with governance approval.`,
                `I wrote the ${bodyshop.name} Agentic Template before kickoff: shared task, progress and knowledge files, test-first rules, MCP servers and skills. The AI coding agents of all ${bodyshop.teamSize} people on the team worked from one context.`,
                `On ${survey.name}, in a team of ${survey.teamSize}, I worked on the backend API, the MySQL design and indexes, and the infrastructure of a survey platform for about ${survey.employees} employees.`,
                `In the Oracle HCM squad I made queries across ${oracle.tables} tables and views ${oracle.speedupMin} to ${oracle.speedupMax} times faster, and the work saved hundreds of hours of research for engineers and analysts.`,
            ],
            tools: picpay.delivery,
            stacks: [],
            projects: ['cards', 'bodyshop', 'survey', 'oracle'],
            links: [],
        },
        {
            id: 'cofounder',
            anchor: 'exp-cofounder',
            company: `${hivemind.name} and ${trocatine.name}`,
            context: 'Two startup MVPs before launch, shown to the public at ExpoTech. Not full-time jobs, and no real users.',
            current: false,
            roles: [
                {
                    title: 'Co-founder',
                    period: period(startups, 'en'),
                    note: `${trocatine.name} in ${trocatine.year}, ${hivemind.name} in ${hivemind.year}.`,
                },
            ],
            responsibilities: [
                `${hivemind.name} (B2B lead scoring): I led ${hivemind.developersLed} developers on the backend and data team, trained the models, and built a FastAPI service on AWS that loads the newest model from S3 and swaps it with no redeploy.`,
                `${trocatine.name} (exchange of children's clothes and toys): I led the frontend team of ${trocatine.frontendTeam} on the MVP, built in React and Tailwind CSS. I ran its Java backend (Jakarta EE, JSP, JDBC, Apache Tomcat) and its PostgreSQL databases on Aiven and Docker.`,
                `The public landing page of ${trocatine.name} is a separate site in plain HTML, CSS and JavaScript.`,
            ],
            impact: [
                `The ${hivemind.name} model went from ${hivemind.modelBefore} to ${hivemind.modelAfter}, and its storage cost fell by up to ${hivemind.storageSaving}.`,
                `About ${hivemind.visitors} ExpoTech visitors rated ${hivemind.name} ${hivemind.rating}.`,
                `About ${trocatine.visitors} ExpoTech visitors rated ${trocatine.name} ${trocatine.rating}.`,
            ],
            tools: [],
            stacks: [
                { label: `${trocatine.name} MVP`, items: trocatine.mvpStack },
                { label: hivemind.name, items: facts.cases.hivemind.stack },
            ],
            projects: ['hivemind'],
            links: [{ label: `${trocatine.name} landing page`, to: '#app-trocatine' }],
        },
        {
            id: 'discord',
            anchor: 'exp-discord',
            company: 'Discord communities',
            context: 'Self-taught and self-employed. This is where I learned to write code.',
            current: false,
            roles: [
                {
                    title: 'Bot and application developer',
                    period: years(earlier.discord),
                    note: 'JavaScript (Node.js, Discord.js), Java for Minecraft servers, SQLite and MySQL. Hosted on Glitch and Discloud.',
                },
            ],
            responsibilities: [
                'I built bots for moderation, tickets, surveys, music and games (an RPG and a life simulator), plus webhooks.',
                `I built ${earlier.discord.bridge}, a chat bridge between a Minecraft server and Discord: players in the game talk with people on Discord.`,
            ],
            impact: [
                `The bots ran in communities of up to ${earlier.discord.members} members.`,
                `${legacy.folders} projects from those years are public in one repository.`,
            ],
            tools: [],
            stacks: [{ label: 'Bots', items: earlier.discord.stack }],
            projects: [],
            links: [{ label: 'glitch-legacy-projects', to: legacy.repo }],
        },
    ],
};
