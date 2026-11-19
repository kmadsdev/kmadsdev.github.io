// "Applications" section. Names, links, stacks and media are in facts.js (facts.projects).
// List 1: facts.appOrder.live, in production. List 2: facts.appOrder.study, not hosted.
// The ids of facts.appOrder.featured have an `architecture` and a `goals` block.
import { facts } from '../facts.js';
import { duration } from '../format.js';

const p = facts.projects;
const { consignado: c, legacy, startups, site } = facts;
const ruph = facts.cases.ruph;
const card = p['credit-card-engine'];
const coldStart = duration(c.cluster.coldStartSeconds);

/** One application. `architecture` and `goals` are null when the app is not featured. */
const app = (id, tagline, text, extra = {}) => ({ id, anchor: `app-${id}`, tagline, text, architecture: null, goals: null, caseId: null, media: null, ...extra });

export const applications = {
    label: 'Applications',
    title: 'What runs today, and what I built to study.',
    lead: 'Open the live ones. Read the code of the public ones.',
    labels: {
        live: 'Open live',
        source: 'Source code',
        privateSource: 'Private source',
        stack: 'Stack',
        architecture: 'Architecture',
        goals: 'Goals',
        statusLive: 'Live',
        statusStudy: 'Study project',
        playClip: 'Play the clip',
        pauseClip: 'Pause the clip',
    },
    live: {
        anchor: 'applications-live',
        title: 'In production',
        lead: 'Each one has a live address that you can open now.',
        items: [
            app(
                'consignado',
                'One API on two Azure hosts, with each request drawn',
                `A payroll loan API in Java 21 and Spring Boot 3.5 that runs unchanged as pods on AKS and inside an Azure Function, behind one Java gateway and a Cloudflare edge. The site draws each request as a live diagram, with the measured time of each stage. It is a technical demo with synthetic data and no credit offer.`,
                {
                    media: {
                        preview: { caption: 'A guest runs the loan preview, and the diagram lights the path of that request.', alt: `Clip of the ${c.name} site: the loan preview form, then the request diagram with the time of each stage.` },
                        lifecycle: { caption: 'The stages of a cluster start, as the access window page shows them. This clip is a simulation.', alt: 'Clip of the access window page: the stages of an AKS cluster start, one after the other, until the window is ready.' },
                        api: { caption: 'The API alone, in a local run: an agreement, a customer and a loan of 84 months.', alt: 'Terminal recording: curl creates an agreement and a customer, then simulates a loan and prints the installment.' },
                        'still-1': { caption: `${c.name}, screen 1 of 3.`, alt: `Screen of the ${c.name} site, picture 1 of 3.` },
                        'still-2': { caption: `${c.name}, screen 2 of 3.`, alt: `Screen of the ${c.name} site, picture 2 of 3.` },
                        'still-3': { caption: `${c.name}, screen 3 of 3.`, alt: `Screen of the ${c.name} site, picture 3 of 3.` },
                    },
                    architecture: [
                        `Edge: a Cloudflare Worker with TLS, a cache for static files and a limit of ${c.rateLimit.requests} requests per ${c.rateLimit.seconds} s per IP on the API.`,
                        'Gateway: Java 21 on Azure Functions. It checks the Entra ID token, applies the access rules, starts and stops the cluster, and returns a trace of each call.',
                        `Hosts: the same jar on Azure Functions (cold call ${c.serverless.coldMin} to ${c.serverless.coldMax} s, warm call ${c.serverless.warmMin} to ${c.serverless.warmMax} s) and on AKS (${c.cluster.nodes} node, ${c.cluster.pods} pods behind an internal load balancer, warm call about ${c.cluster.warm} s).`,
                        `Cluster: stopped by default. A signed-in visitor starts it for a ${c.window.minutes}-minute window. A start from stopped took ${coldStart}.`,
                        `Data and delivery: ${c.database.engine} with Flyway. Terraform creates the Azure resources, and GitHub Actions deploys each repository with OIDC.`,
                    ],
                    goals: [
                        'Compare one API on Kubernetes and on serverless, with measured cost and latency.',
                        `Stay inside a monthly budget of ${c.budget}: the gateway pauses the engine at 100%.`,
                        'Show the rules of a payroll loan in code: margin, Price schedule, contract states, optimistic concurrency and a transactional outbox.',
                    ],
                },
            ),
            app(
                'ruph',
                'One control plane for every app I run',
                'My own platform. It keeps one registry of my apps and environments behind one API, and it deploys and provisions them in QA and in production on GCP, Cloudflare, Vercel, Supabase and Neon. An AI agent can write a plan there, and only a person approves it. It is private: I am its only operator.',
                {
                    caseId: 'ruph',
                    architecture: [
                        'One API in TypeScript (Hono). The web dashboard, the CLI and the MCP server all use it.',
                        'Cloud Run for the API, Cloud SQL for the PostgreSQL ledger, Secret Manager for the secrets, and Terraform for the access rules.',
                        `GitHub Actions runs ${ruph.tests} tests and the PostgreSQL migration tests, and deploys only after the health checks pass.`,
                    ],
                    goals: [
                        'One place that knows each app and each environment.',
                        'AI agents that help with operations and cannot change production alone.',
                        'A record of each apply in an append-only ledger, with budgets that warn or pause the work.',
                    ],
                },
            ),
            app(
                'diabetes',
                `A risk estimate from ${p.diabetes.inputs} answers`,
                `A FastAPI service validates ${p.diabetes.inputs} inputs, loads the newest scikit-learn model and returns a risk estimate with its confidence. The model is a Random Forest trained on public Kaggle data. It was my CS50x final project. It is not a medical diagnosis.`,
                {
                    architecture: [
                        `A static page sends the ${p.diabetes.inputs} answers to the API.`,
                        'The FastAPI service validates each input, runs the model and answers with the estimate and its confidence.',
                        `${p.diabetes.endpoints} endpoints: status, health, models and predict.`,
                    ],
                    goals: [
                        'Take a model from a notebook to a live API.',
                        'Serve the newest trained model with no change to the code.',
                    ],
                },
            ),
            app('offmode', 'A Pomodoro timer that remembers', 'A focus timer for the web and the desktop. It tracks your focus time across sessions, with login and sync to a server.'),
            app('notes', 'A code editor in one HTML file', `A notepad that looks and works like VS Code, with no backend and no account. Monaco highlights ${p.notes.languages} languages. Files stay in the browser, or save straight to your disk in Chrome and Edge. It has ${p.notes.previews} live previews, from Markdown to Mermaid.`),
            app('doom', 'Doom in one file, with no server', `The 1993 game compiled from C to WebAssembly, packed with gzip into a single HTML file that unpacks itself in the browser. The packed game went from ${p.doom.sizeBefore} to ${p.doom.sizeAfter}. I built it to study compression.`),
            app('agentic', 'One context for every AI coding agent', 'A template for a repository that AI agents can work in: task, progress and knowledge files, test-first rules, and a fixed set of MCP servers and skills.'),
            app('custom-square', 'A CSS playground', 'Change CSS properties, gradients and colors and see the result at once. Plain JavaScript, with the theme saved in the browser.'),
            app('trocatine', 'The landing page of my first startup MVP', `The public page of ${startups.trocatine.name}, an exchange of children's clothes and toys. This address is the landing page only: plain HTML, CSS and JavaScript on GitHub Pages. The MVP of the product was a separate application in React and Tailwind CSS.`),
        ],
    },
    study: {
        anchor: 'applications-study',
        title: 'Study projects and repositories',
        lead: 'Not hosted. Simulated data, no users and no real money. The code is public.',
        items: [
            app('credit-card-engine', 'Who gets which card, and why', `A card engine in Java 21 and Spring Boot with two flows: acquisition for new clients and upgrade for existing clients. Four variants: Debit (limit 0), Credit Base (up to ${card.variants.base}), Credit Platinum (up to ${card.variants.platinum}) and Credit Black (above ${card.variants.platinum}). All credit rules are in one table-driven policy module, and each decision is stored with its reasons.`),
            app('payment-gateway', 'Authorize, capture and refund, with no double charge', 'A simulated payment gateway for an online store, in Go and PostgreSQL, backend only. Card tokenization and Pix, a state machine for authorize, capture and refund, idempotency keys, a double-entry ledger, and signed webhooks through a transactional outbox. CI runs the tests with the race detector against a real PostgreSQL.'),
            app('devops-challenge', 'Four containers, one command', `A distributed system on Docker Compose with ${p['devops-challenge'].containers} containers: a Python writer, a Go reader, a Node.js web front end and Redis between them.`),
            app('incident-api', 'Alerts and incidents, with a terminal UI', 'An alert and incident service in PHP (Hyperf, Swoole) that ingests metrics and stores them in MySQL and Redis. It comes with a terminal interface in Python.'),
            app('legacy', `Where I started, ${legacy.from} to ${legacy.to}`, `${legacy.folders} projects from my Glitch years: Discord bots in Node.js with Discord.js and SQLite, small Express and Fastify sites with HTML and CSS pages, and one Minecraft server setup. The repository gives the years ${legacy.from} to ${legacy.to}. It is the code I learned on.`),
            app('student-tools', 'Free tools for engineering students', 'A curated list of the free developer tools and credits in the GitHub Student Developer Pack. A contribution to the community, with no code.'),
        ],
    },
    // Used by the link list at the end of the section.
    more: { text: 'More repositories are on my GitHub profile.', label: 'GitHub profile', to: facts.contact.github },
    siteNote: `${site.domain} and the apps under it get more than ${site.monthlyVisitors} visitors and ${site.requests} requests a month, measured at Cloudflare.`,
};
