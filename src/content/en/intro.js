// "Introduction" section: who I am and what I do. The claims are here, and each
// claim links to its proof lower on the page or in a public repository.
//
// Shape: .claude/backlog/redesign/CONTENT-SHAPE.md. Numbers come from facts.js.
// A tile holds one idea: a title of 6 words or less and a text of 160 characters or less.
import { facts } from '../facts.js';
import { duration } from '../format.js';
import { link } from '../rich.js';

const { person, picpay, startups, earlier, consignado: c, site, legacy, art } = facts;
const { bodyshop, survey, cards, oracle } = picpay;
const { hivemind, trocatine } = startups;
const ruph = facts.cases.ruph;
const m = art.margin;
const card = facts.projects['credit-card-engine'];
const part = Object.fromEntries(art.coldStart.parts.map((p) => [p.id, duration(p.seconds)]));
const coldStart = duration(art.coldStart.totalSeconds);

/** One tile. Keys that a kind does not use are null. */
const tile = (id, kind, title, text, extra = {}) => ({ id, kind, title, text, value: null, source: null, art: null, to: null, ...extra });

export const intro = {
    label: 'Introduction',
    title: 'I design, build and run backend systems, from the first diagram to the bill.',
    lead: `${person.yearsEngineering} years of engineering experience and ${person.yearsInTech} years in tech, on systems that answer millions of requests at work and on platforms that I pay for myself.`,
    proofLabel: 'Proof',
    toolsLabel: 'Tools',
    sourceLabel: 'Source',

    opening: {
        label: 'Who I am',
        title: 'Who am I?',
        photo: { alt: `${person.name}: a close portrait, with curly dark hair.` },
        paragraphs: [
            [`I am ${person.name}, and most people online call me ${person.alias}. I am a software engineer. My work is backend, architecture and cloud: the services, the data and the infrastructure that a product runs on.`],
            [
                `I have ${person.yearsEngineering} years of engineering experience and ${person.yearsInTech} years in tech. I wrote my first code in ${person.codingSince}, for `,
                link('Discord bots', '#exp-discord'),
                ` that ran in communities of up to ${earlier.discord.members} members. Today I work at `,
                link(picpay.name, '#exp-picpay'),
                `, a Brazilian fintech with about ${picpay.registeredUsers} registered users, on the engines that decide who gets a credit card.`,
            ],
            [
                'I also build and run my own systems, because I want to know a platform down to its bill. ',
                link(c.name, '#app-consignado'),
                ' runs one Spring Boot API on two Azure hosts behind one gateway, and its site draws each request with the time that each stage took. ',
                link('Ruph', '#app-ruph'),
                ' is my own platform on GCP: it deploys my apps, and an AI agent can plan a change there, but only I can approve it.',
            ],
            [
                `Performance engineering is the part I like most. At work I made Oracle queries ${oracle.speedupMin} to ${oracle.speedupMax} times faster. On my own project I measured a cluster start in four parts. I advised ${earlier.reddit.people} people on `,
                link('PC builds', '#more-volunteering'),
                ', and in my free time I study ',
                link('the engine control units of old Honda Civics', '#more-hobbies'),
                '.',
            ],
        ],
        // The last line of his LinkedIn "About". Optional for the section agent.
        signature: 'Always building and always learning.',
    },

    chaptersLabel: 'What I do',
    chapters: [
        {
            id: 'architecture',
            label: 'Architecture',
            poster: 'Trade-offs',
            headline: 'I ask what a design costs before I draw it.',
            lead: 'Each design here started as a question about cost: how many services, how many hosts, how many calls to a model.',
            paragraphs: [
                [
                    'On ',
                    link(survey.name, '#case-survey'),
                    `, at ${picpay.name}, the first plan was a set of microservices. I asked why. The answer was one product, one team of ${survey.teamSize} and one database, so the team built a layered monolith in PHP for a platform that serves about ${survey.employees} employees.`,
                ],
                [
                    `I led ${bodyshop.engineersLed} engineers on `,
                    link(bodyshop.name, '#case-bodyshop'),
                    `, which gives each customer a picture of their own car. We generate one image for each brand, model, year and color, keep it at a fixed S3 path, and ask a registry before we call any model. In the pilot, ${bodyshop.approvalRate} of the images passed approval at generation, in under ${bodyshop.endToEnd} from request to image. When staff replace a bad image, the new file takes the same path and the app needs no release.`,
                ],
                [
                    link(c.name, '#app-consignado'),
                    ' is my answer to a question I had about hosts: what does the same API cost on Kubernetes and on serverless? One build artifact runs as pods on AKS and inside an Azure Function. One Java gateway stands in front of both, checks each token and returns a trace of each call. The ',
                    link('decision table', c.docs.decisions),
                    ' gives the trade-off of each choice and what a bank would do in its place, and ',
                    link(`${c.adrs} decision records`, c.docs.adrs),
                    ' hold the details.',
                ],
            ],
            tiles: [
                tile('request-path', 'art', 'One API, two hosts', 'Browser, Cloudflare edge and one Java gateway. Then the same jar on Azure Functions and on AKS pods, with one PostgreSQL.', { art: 'requestPath' }),
                tile('approval', 'stat', 'Approved at generation', `${bodyshop.name} pilot images that needed no manual curation, in under ${bodyshop.endToEnd} each.`, { value: bodyshop.approvalRate, source: `${bodyshop.name} pilot at ${picpay.name}` }),
                tile('monolith', 'stat', 'Employees, one monolith', `${survey.name} went from a microservices plan to one layered monolith after one question.`, { value: survey.employees, source: `${survey.name} at ${picpay.name}` }),
                tile('adrs', 'stat', 'Decision records', 'Layering, money and rounding, concurrency, the outbox, two hosts, the gateway, the edge, the budget.', { value: `${c.adrs}`, source: 'consignado-api, folder docs/adr' }),
            ],
            tools: facts.chapterTools.architecture,
            proof: [
                { label: survey.name, to: '#case-survey' },
                { label: bodyshop.name, to: '#case-bodyshop' },
                { label: c.name, to: '#app-consignado' },
                { label: 'Architecture diagrams', to: c.docs.architecture },
            ],
        },
        {
            id: 'backend',
            label: 'Backend',
            poster: 'Services',
            headline: 'I write services that stay correct when two requests arrive at once.',
            lead: `Java and Go on the cards engines at ${picpay.name}, PHP on an internal platform, Oracle SQL on HR data. My own projects show the same work with public code.`,
            paragraphs: [
                [
                    'At ',
                    link(picpay.name, '#exp-picpay'),
                    ' I work on ',
                    link('the engines of card acquisition and upgrade', '#case-cards'),
                    `: ${cards.microservices} microservices in Java (Spring Boot, JPA) and Go, with the legacy systems around them. They answer millions of requests from hundreds of thousands of clients. I found and fixed defects in ${cards.legacySystems} legacy Java systems and built jobs that clean the database with no manual work.`,
                ],
                [
                    'Before the cards area I spent nine months in ',
                    link('Oracle SQL', '#case-oracle'),
                    `: ${oracle.tables} tables and views with no documents. I cut queries from thousands of lines to hundreds and made them ${oracle.speedupMin} to ${oracle.speedupMax} times faster. On `,
                    link(bodyshop.name, '#case-bodyshop'),
                    ' I chose Go with Gin and MongoDB. On ',
                    link(survey.name, '#case-survey'),
                    ' I worked on the API in PHP (Hyperf) and on the MySQL indexes.',
                ],
                [
                    'The public code is in ',
                    link('consignado-api', c.repos.api),
                    `: Java 21 and Spring Boot 3.5, with ${c.tests.api} tests and a build that fails below ${c.tests.coverageGate} line coverage. A contract moves through ${c.contractStates} states by one transition table. Each contract has a version, so a request with a stale If-Match header gets 412. A row lock on the customer stops two approvals from using the same margin.`,
                ],
                [
                    'Events leave that API through a transactional outbox that keeps the order per contract across pods. The ',
                    link('payment gateway in Go', '#app-payment-gateway'),
                    ' applies the same ideas with idempotency keys and a double-entry ledger, and the ',
                    link('credit card engine', '#app-credit-card-engine'),
                    ' keeps all credit rules in one policy module.',
                ],
            ],
            tiles: [
                tile('trace', 'art', 'One request, stage by stage', `A signed-in write took ${art.trace.warm.totalMs} ms at the gateway. The database used ${art.trace.warm.stages.find((s) => s.id === 'database').ms} ms of it, in ${art.trace.warm.statements.total} statements.`, { art: 'trace' }),
                tile('states', 'art', 'The contract state machine', 'One transition table. Approval checks the margin again. Activation writes the installment schedule.', { art: 'contractStates' }),
                tile('tests', 'stat', 'Tests in consignado-api', `Unit, web slice, repository, integration and architecture tests. The build fails below ${c.tests.coverageGate} line coverage.`, { value: `${c.tests.api}`, source: 'CI run of consignado-api on main, 2026-11-18' }),
                tile('oracle', 'stat', 'Times faster, Oracle queries', `${oracle.tables} tables and views at ${picpay.name}. Queries went from thousands of lines to hundreds.`, { value: `${oracle.speedupMin} to ${oracle.speedupMax}`, source: `My LinkedIn profile, ${picpay.name} entry` }),
            ],
            tools: facts.chapterTools.backend,
            proof: [
                { label: 'Cards engines', to: '#case-cards' },
                { label: 'Oracle HCM', to: '#case-oracle' },
                { label: c.name, to: '#app-consignado' },
                { label: 'Payment gateway', to: '#app-payment-gateway' },
                { label: 'Credit card engine', to: '#app-credit-card-engine' },
            ],
        },
        {
            id: 'cloud',
            label: 'Cloud',
            poster: coldStart,
            headline: 'I know what each cloud service does and what it costs per hour.',
            lead: `One real integration on each cloud: AWS at ${picpay.name} and in a startup MVP, GCP under my own platform, Azure under ${c.name}.`,
            paragraphs: [
                [
                    'On AWS, ',
                    link(bodyshop.name, '#case-bodyshop'),
                    ' keeps each car image in S3 behind CloudFront. The path of an image never changes, so a corrected image reaches the app with no release. For ',
                    link(hivemind.name, '#case-hivemind'),
                    ` I built a FastAPI service on EC2 that loads the newest model from S3 and swaps it while it runs. The change from Random Forest to Logistic Regression took the model file from ${hivemind.modelBefore} to ${hivemind.modelAfter}.`,
                ],
                [
                    link('Ruph', '#app-ruph'),
                    `, my own platform, runs on GCP: Cloud Run for the API, Cloud SQL for the PostgreSQL ledger, Secret Manager for the secrets, and Terraform for the access rules. GitHub Actions deploys a new version only after ${ruph.tests} tests and the health checks pass.`,
                ],
                [
                    link(c.name, '#app-consignado'),
                    ` is on Azure, and Terraform creates the resources: AKS, two function apps, Blob Storage for the site, Key Vault, PostgreSQL and the identities. The cluster has one ${c.cluster.node} node at ${c.cluster.nodePerHour} per hour. That is about ${c.cluster.nodePerMonth} for a full month, more than the whole monthly budget of ${c.budget} (about ${c.budgetUsd}). So the cluster is stopped by default, and a signed-in visitor starts it for a ${c.window.minutes}-minute window that costs about ${c.window.cost}.`,
                ],
                [
                    `I measured the start of that stopped cluster in parts. It took ${coldStart} to the first answer: ${part.controlPlane} for the control plane, ${part.node} for the node, ${part.app} for Spring Boot and the database, and ${part.balancer} for the load balancer. Azure also refused parts of the first plan. Front Door is forbidden on a student subscription, so the edge is a Cloudflare Worker. ${c.database.hostsRegion} had no capacity for the database size, so PostgreSQL is in ${c.database.region}, and each statement crosses an ocean. The `,
                    link('decision table', c.docs.decisions),
                    ' has the cost of each of these.',
                ],
                [
                    `My interest starts below the managed service. From ${earlier.reddit.start} to ${earlier.reddit.end} I `,
                    link(`advised ${earlier.reddit.people} people`, '#more-volunteering'),
                    ' on Reddit about parts for gaming, workstation and server builds. I choose an instance size the way I choose a CPU: by the workload and the price.',
                ],
            ],
            tiles: [
                tile('clouds', 'art', 'Three clouds, by service', `AWS at ${picpay.name} and in ${hivemind.name}. GCP under my own platform. Azure under ${c.name}.`, { art: 'clouds' }),
                tile('cold-start', 'art', 'A cold start in four parts', `Control plane ${part.controlPlane}, node ${part.node}, Spring Boot and database ${part.app}, load balancer ${part.balancer}.`, { art: 'coldStart', value: coldStart, source: 'consignado-api README, measured on 2026-11-17' }),
                tile('budget', 'stat', 'Monthly budget, with a guard', `At 100% the gateway pauses the engine and stops the cluster. One access window costs about ${c.window.cost}.`, { value: c.budget, source: 'consignado.kmads.dev, section on cost' }),
                tile('builds', 'stat', 'People advised on PC builds', `Parts, budgets and repairs for gaming, workstation and server builds on Reddit, ${earlier.reddit.start} to ${earlier.reddit.end}.`, { value: earlier.reddit.people, source: 'My LinkedIn profile, volunteering' }),
            ],
            tools: facts.chapterTools.cloud,
            proof: [
                { label: `${bodyshop.name} on AWS`, to: '#case-bodyshop' },
                { label: `${hivemind.name} on AWS`, to: '#case-hivemind' },
                { label: 'Ruph on GCP', to: '#app-ruph' },
                { label: `${c.name} on Azure`, to: '#app-consignado' },
                { label: 'Hardware advice', to: '#more-volunteering' },
            ],
        },
        {
            id: 'cicd',
            label: 'CI/CD',
            poster: 'Push to main',
            headline: 'My pipelines deploy on a push and then check the live result.',
            lead: 'GitHub Actions signs in with OIDC, so no deploy password is stored. Each image carries its commit as the tag.',
            paragraphs: [
                [
                    'The pipeline of ',
                    link('consignado-api', c.docs.workflow),
                    ' runs on each push to main. It builds and tests, builds the image, signs in to Azure with GitHub OIDC, pushes the image with the commit as its tag, starts the cluster when it is stopped, applies the manifests, waits for the rollout and runs a smoke test inside the cluster. The deploy identity has rights in one namespace. Each action is pinned to a commit SHA, and the request inspector of the site links a request to the commit that answered it.',
                ],
                [
                    'Terraform creates the Azure resources with remote state. I run it by hand, because it needs my sign-in. On ',
                    link('Ruph', '#app-ruph'),
                    `, GitHub Actions runs ${ruph.tests} tests and the PostgreSQL migration tests, and it deploys only after the health checks pass.`,
                ],
                [
                    link('The workflow of this site', site.workflow),
                    ` is the same pattern in small. Each pull request gets the tests, the build, a check in a real browser and a responsive check. After a push to main, the workflow publishes the build, waits until ${site.domain} serves that exact commit, and then checks every link on the live address.`,
                ],
                [
                    'At ',
                    link(picpay.name, '#exp-picpay'),
                    ` my CI/CD and unit test work runs on ${picpay.delivery.join(', ').replace(/, ([^,]*)$/, ' and $1')}, and `,
                    link(bodyshop.name, '#case-bodyshop'),
                    ' went to QA with governance approval.',
                ],
            ],
            tiles: [
                tile('pipeline', 'art', 'One push, seven stages', 'Build and test, image, OIDC sign-in, push, cluster start, rollout, smoke test inside the cluster.', { art: 'pipeline' }),
                tile('passwords', 'stat', 'Stored deploy passwords', 'GitHub Actions, pods and functions prove who they are with OIDC, workload identity and managed identities.', { value: '0', source: 'consignado-api, docs/platform/architecture.md' }),
                tile('repositories', 'stat', 'Repositories that deploy on push', `The API, the serverless side and the site of ${c.name}. Each image tag is the commit.`, { value: '3', source: 'consignado.kmads.dev, section Delivery' }),
                tile('site-workflow', 'link', 'The workflow of this site', `Test, build, browser check, publish. Then a check that ${site.domain} serves this commit.`, { art: 'sitePipeline', to: site.workflow }),
            ],
            tools: facts.chapterTools.cicd,
            proof: [
                { label: 'Workflow of consignado-api', to: c.docs.workflow },
                { label: 'Workflow of this site', to: site.workflow },
                { label: 'Ruph', to: '#app-ruph' },
                { label: picpay.name, to: '#exp-picpay' },
            ],
        },
        {
            id: 'fullstack',
            label: 'Full-stack',
            poster: `Since ${person.codingSince}`,
            headline: `My first web applications ran in ${person.codingSince}, in JavaScript and HTML.`,
            lead: 'Today I build the frontend when the system needs one, and I know what it asks of the API and of the infrastructure behind it.',
            paragraphs: [
                [
                    `I started in ${person.codingSince} with `,
                    link('Discord bots', '#exp-discord'),
                    ' in JavaScript, hosted on Glitch. Next to the bots I built small Express sites with HTML and CSS pages. ',
                    link(`${legacy.folders} of those projects`, legacy.repo),
                    ' are public in one repository.',
                ],
                [
                    `In ${trocatine.year} I led the two-person frontend team of ${trocatine.name}. The MVP was React and Tailwind CSS, and `,
                    link('its public landing page', '#app-trocatine'),
                    ` is plain HTML, CSS and JavaScript. At ${picpay.name}, `,
                    link(bodyshop.name, '#case-bodyshop'),
                    ' has a curation app in React and Vite, and ',
                    link(survey.name, '#case-survey'),
                    ' has an Angular app in front of the PHP API.',
                ],
                [
                    'My largest frontend is the site of ',
                    link(c.name, '#app-consignado'),
                    '. It is React with Cloudscape. Its diagram comes from the trace that the gateway returns: each stage with its measured milliseconds, and a cold badge that only the gateway can set. ',
                    link('This site', site.repo),
                    ' is React and Vite with no UI library, and its flowcharts read the same data file as its text.',
                ],
            ],
            tiles: [
                tile('timeline', 'art', `${person.codingSince} to 2026`, 'Discord bots, Express pages, a startup landing page, a curation app at work, a site that draws its own requests.', { art: 'timeline' }),
                tile('legacy', 'stat', 'Legacy projects, public', 'Discord bots in Node.js, Express and Fastify sites with HTML and CSS, and one Minecraft server setup.', { value: `${legacy.folders}`, source: 'Repository kmadsdev/glitch-legacy-projects' }),
                tile('visitors', 'stat', 'Visitors a month', `${site.domain} and the apps under it answer ${site.requests} requests a month.`, { value: site.monthlyVisitors, source: `Cloudflare analytics of ${site.domain}` }),
            ],
            tools: facts.chapterTools.fullstack,
            proof: [
                { label: 'glitch-legacy-projects', to: legacy.repo },
                { label: 'Discord years', to: '#exp-discord' },
                { label: `${trocatine.name} landing page`, to: '#app-trocatine' },
                { label: `Site of ${c.name}`, to: '#app-consignado' },
                { label: 'Source code of this site', to: site.repo },
            ],
        },
        {
            id: 'finance',
            label: 'Financial systems',
            poster: 'Margin',
            headline: 'I know how a card decision and a payroll loan work, rule by rule.',
            lead: `Cards at ${picpay.name}, in words only. Payroll loans, a card engine and a payment gateway in my own study projects, with synthetic data.`,
            paragraphs: [
                [
                    'At ',
                    link(picpay.name, '#exp-picpay'),
                    ' I work on ',
                    link('card acquisition and upgrade', '#case-cards'),
                    `: the engines that decide, in real time, whether a client gets a card and which one. The same services answer customer requests that arrive through the central bank, and internal audits. I describe that work in words only, because the code and the numbers belong to ${picpay.name}.`,
                ],
                [
                    'To show the same domain with public code, I built three study projects with synthetic data. ',
                    link('consignado-api', '#app-consignado'),
                    ` is a payroll loan (crédito consignado). The installment leaves the paycheck, so the employer agreement caps the share of the net salary that installments can take. With a net salary of ${m.netSalary} and a cap of ${m.capPercent}, the margin is ${m.marginLimit}. A loan of ${m.principal} over ${m.termMonths} months at ${m.monthlyRate} a month has a fixed installment of ${m.installment} on a Price schedule. The API compares the largest installment, ${m.largestInstallment}, with the free margin, at simulation and again at approval.`,
                ],
                [
                    'The ',
                    link('credit card engine', '#app-credit-card-engine'),
                    ` has an acquisition flow for new clients and an upgrade flow for existing clients, ${card.variantCount} card variants, and one policy module that stores each decision with its reasons. The `,
                    link('payment gateway', '#app-payment-gateway'),
                    ' in Go authorizes, captures and refunds with idempotency keys, a double-entry ledger and signed webhooks. None of the three has real customers or real money. The README of consignado-api lists what is not built, from IOF and CET to payroll integration.',
                ],
            ],
            tiles: [
                tile('margin', 'art', 'The margin rule, worked', `Net salary ${m.netSalary} at ${m.capPercent} gives ${m.marginLimit}. The largest installment, ${m.largestInstallment}, fits.`, { art: 'margin' }),
                tile('pairs', 'stat', 'Status pairs tested', `One transition table decides each move between the ${c.contractStates} contract states. A unit test covers all the pairs.`, { value: `${c.statusPairs}`, source: 'consignado-api README, section Tests' }),
                tile('variants', 'stat', 'Card variants, one policy', `Debit, Credit Base up to ${card.variants.base}, Platinum up to ${card.variants.platinum}, and Black above that.`, { value: `${card.variantCount}`, source: 'Repository kmadsdev/credit-card-engine' }),
                tile('synthetic', 'note', 'Synthetic data only', `${c.data.agreements} agreements, ${c.data.customers} customers, ${c.data.simulations} simulations and ${c.data.contracts} contracts. No real customer and no credit offer.`),
            ],
            tools: facts.chapterTools.finance,
            proof: [
                { label: 'Cards engines', to: '#case-cards' },
                { label: c.name, to: '#app-consignado' },
                { label: 'Credit card engine', to: '#app-credit-card-engine' },
                { label: 'Payment gateway', to: '#app-payment-gateway' },
            ],
        },
        {
            id: 'ai',
            label: 'AI coding agents',
            poster: 'One context',
            headline: 'I give AI coding agents rules, tools and one shared context.',
            lead: `Before the ${bodyshop.name} kickoff I wrote the template that the agents of all ${bodyshop.teamSize} people on the team worked from.`,
            paragraphs: [
                [
                    'The ',
                    link('Agentic Template', '#app-agentic'),
                    ' is a repository layout: shared task, progress and knowledge files, test-first rules, and a fixed set of MCP servers and skills. On ',
                    link(bodyshop.name, '#case-bodyshop'),
                    ` the agents of all ${bodyshop.teamSize} people started from that one context.`,
                ],
                [
                    link('Ruph', '#app-ruph'),
                    ' has an MCP server next to its web dashboard, its REST API and its CLI. An agent can write a plan through it. Only a person approves a plan, and each apply goes to an append-only ledger.',
                ],
                ['I work with Claude Code and Codex under test-first rules: the test exists before the code. Since 2025 I also study the layer below the agent, from local models to quantization and fine-tuning.'],
            ],
            tiles: [
                tile('context', 'stat', 'People, one agent context', `Task, progress and knowledge files that each agent on the ${bodyshop.name} team read first.`, { value: `${bodyshop.teamSize}`, source: `${bodyshop.name} team at ${picpay.name}` }),
                tile('entries', 'stat', 'Ways into Ruph', 'Web, REST, CLI and an MCP server share one API. An agent plans and a person approves.', { value: `${ruph.entries}`, source: 'Ruph, my own platform' }),
                tile('template', 'link', 'Agentic Template', 'The public page of the template: files, rules, MCP servers and skills.', { to: facts.projects.agentic.live }),
            ],
            tools: facts.chapterTools.ai,
            proof: [
                { label: 'Agentic Template', to: '#app-agentic' },
                { label: bodyshop.name, to: '#case-bodyshop' },
                { label: 'Ruph', to: '#app-ruph' },
            ],
        },
        {
            id: 'endtoend',
            label: 'End to end',
            poster: null,
            headline: 'I take a project from the first commit to a live address.',
            lead: 'On my own projects I do the design, the code, the tests, the infrastructure and the deploy, and I pay the bill.',
            paragraphs: [
                [
                    link(c.name, '#app-consignado'),
                    ' and ',
                    link('Ruph', '#app-ruph'),
                    ' are the two largest. ',
                    link('The applications in production', '#applications-live'),
                    ' come first, then ',
                    link('the study repositories', '#applications-study'),
                    ' that are not hosted.',
                ],
            ],
            tiles: [
                tile('live', 'link', 'In production', `${c.name}, my own platform and the public apps, each with its live address.`, { to: '#applications-live' }),
                tile('study', 'link', 'Study repositories', 'A card engine, a payment gateway and two challenges, with public source code.', { to: '#applications-study' }),
            ],
            tools: facts.chapterTools.endtoend,
            proof: [
                { label: 'Applications in production', to: '#applications-live' },
                { label: 'Study projects and repositories', to: '#applications-study' },
            ],
        },
    ],

    // Labels of the drawings. Structure and numbers: facts.art.
    // `summary` is the text form of the drawing (screen readers, reduced motion).
    art: {
        requestPath: {
            title: `Request path of ${c.name}`,
            summary: 'A request goes from the browser to a Cloudflare Worker. Pages come from a static site in Blob Storage. API calls go to one Java gateway on Azure Functions. The gateway forwards to the serverless host or, through an internal load balancer, to the pods on AKS. Both hosts run the same jar and use one PostgreSQL database.',
            groups: { cloudflare: 'Cloudflare', azure: 'Azure' },
            nodes: {
                browser: { label: 'Browser', note: 'Guest or signed-in user' },
                edge: { label: 'Cloudflare Worker', note: `TLS, cache, ${c.rateLimit.requests} requests per ${c.rateLimit.seconds} s per IP` },
                site: { label: 'Static site', note: 'Blob Storage' },
                gateway: { label: 'Java gateway', note: 'Azure Functions. Token check, limits, trace' },
                function: { label: 'Serverless host', note: 'The API jar on Azure Functions' },
                balancer: { label: 'Internal load balancer', note: 'No public address' },
                pods: { label: 'AKS pods', note: `The same jar, ${c.cluster.pods} pods` },
                database: { label: c.database.engine, note: 'One database for both hosts' },
            },
            edges: [
                'HTTPS',
                'Pages, cached',
                'API calls, with the edge key',
                'Serverless route, with the host key',
                'Kubernetes route, private address',
                'Service',
                'SQL over TLS',
                'SQL over TLS',
            ],
        },
        trace: {
            title: 'Two real requests, by stage',
            summary: `A warm signed-in write took ${art.trace.warm.totalMs} ms at the gateway, with ${art.trace.warm.stages.find((s) => s.id === 'database').ms} ms in the database for ${art.trace.warm.statements.total} statements. The first call after idle time took ${(art.trace.cold.totalMs / 1000).toFixed(1)} s, and the cold start of the serverless host used 18.6 s of it.`,
            total: 'Total at the gateway',
            noTime: 'No time in the trace',
            statements: 'statements',
            warm: { label: 'Warm call', note: 'Add a customer, signed in, serverless host' },
            cold: { label: 'Cold call', note: 'Loan preview by a guest, first call after idle time' },
            stages: {
                request: 'Request',
                edge: 'Edge',
                gateway: 'Gateway',
                identity: 'Token check',
                keyvault: 'Key Vault',
                host: 'Functions host',
                coldStart: 'Cold start of the host',
                app: 'Application',
                database: 'Database',
                response: 'Response',
            },
        },
        contractStates: {
            title: 'Contract states of consignado-api',
            summary: 'A simulation becomes a proposed contract. A proposed contract is approved, rejected or cancelled. An approved contract becomes active or is cancelled. An active contract is settled or cancelled. Rejected, settled and cancelled are final.',
            states: {
                SIMULATED: 'Simulated',
                PROPOSED: 'Proposed',
                APPROVED: 'Approved',
                REJECTED: 'Rejected',
                ACTIVE: 'Active',
                SETTLED: 'Settled',
                CANCELLED: 'Cancelled',
            },
            transitions: {
                propose: 'Create the contract',
                approve: 'Approve, margin checked again',
                reject: 'Reject',
                cancel: 'Cancel',
                activate: 'Activate, schedule written',
                settle: 'Settle',
            },
        },
        clouds: {
            title: 'Three clouds, by service',
            summary: `AWS: work at ${picpay.name} and the ${hivemind.name} MVP. GCP: Ruph, my own platform. Azure: ${c.name}, my own project.`,
            aws: {
                name: 'AWS',
                context: `${picpay.name} and ${hivemind.name}`,
                nodes: {
                    cloudfront: { label: 'CloudFront', use: `Serves ${bodyshop.name} images and the ${survey.name} app` },
                    s3: { label: 'S3', use: `${bodyshop.name} images at fixed paths, ${hivemind.name} model files` },
                    sqs: { label: 'SQS', use: `Queue in the ${bodyshop.name} stack` },
                    ec2: { label: 'EC2', use: `${hivemind.name} API and ML service` },
                    rds: { label: 'RDS', use: 'Managed relational databases' },
                },
            },
            gcp: {
                name: 'GCP',
                context: 'Ruph, my own platform',
                nodes: {
                    cloudRun: { label: 'Cloud Run', use: 'Runs the Ruph API' },
                    cloudSql: { label: 'Cloud SQL', use: 'PostgreSQL for the ledger' },
                    secretManager: { label: 'Secret Manager', use: 'Source of the secrets' },
                    iam: { label: 'IAM', use: 'Access rules, managed by Terraform' },
                    terraform: { label: 'Terraform', use: 'Creates and changes the resources' },
                    actions: { label: 'GitHub Actions', use: 'Tests, then deploy after health checks' },
                },
            },
            azure: {
                name: 'Azure',
                context: `${c.name}, my own project`,
                nodes: {
                    aks: { label: 'AKS', use: `${c.cluster.nodes} node, ${c.cluster.pods} to ${c.cluster.podsMax} pods, stopped by default` },
                    functions: { label: 'Azure Functions', use: 'The gateway and the serverless host' },
                    blob: { label: 'Blob Storage', use: 'The static site' },
                    keyVault: { label: 'Key Vault', use: 'Secrets, mounted by the CSI driver' },
                    postgres: { label: 'Azure Database for PostgreSQL', use: 'One database for both hosts' },
                    entra: { label: 'Entra ID', use: 'Sign-in, workload identity, OIDC for deploys' },
                    registry: { label: 'Container Registry', use: 'Images tagged with the commit' },
                    tables: { label: 'Table Storage', use: 'Users, sessions and engine state of the gateway' },
                },
            },
        },
        coldStart: {
            title: 'Start of a stopped AKS cluster',
            summary: `From the window request to the first answer: ${coldStart}. Control plane ${part.controlPlane}, node ${part.node}, Spring Boot and database ${part.app}, load balancer ${part.balancer}. One measured run on 2026-11-17.`,
            total: 'Request to first answer',
            parts: {
                controlPlane: 'Control plane',
                node: 'Node',
                app: 'Spring Boot and database',
                balancer: 'Load balancer',
            },
        },
        pipeline: {
            title: 'Deploy job of consignado-api',
            summary: 'On a push to main: build and test, build the image, sign in with OIDC, push the image with the commit as its tag, start the cluster when it is stopped, apply the manifests and wait for the rollout, run a smoke test inside the cluster.',
            stages: {
                test: { label: 'Build and test', does: 'Maven verify with PostgreSQL in Testcontainers and the coverage gate' },
                image: { label: 'Image', does: 'Builds the container image and runs a smoke test on it' },
                login: { label: 'OIDC sign-in', does: 'GitHub proves the run to Entra ID. No stored password' },
                push: { label: 'Push', does: 'Sends the image to the registry. The tag is the commit' },
                cluster: { label: 'Cluster start', does: 'Starts the AKS cluster when it is stopped' },
                rollout: { label: 'Rollout', does: 'Applies the manifests in one namespace and waits for the pods' },
                smoke: { label: 'Smoke test', does: 'Calls the API inside the cluster and checks the load balancer address' },
            },
        },
        sitePipeline: {
            title: 'Workflow of this site',
            summary: `Tests, build, a check in a real browser and a responsive check. On main: publish to GitHub Pages, wait until ${site.domain} serves the commit, check every link.`,
            stages: {
                test: { label: 'Tests', does: 'Content rules and component tests' },
                build: { label: 'Build', does: 'Vite build' },
                browser: { label: 'Browser check', does: 'Opens the build in a real browser' },
                responsive: { label: 'Responsive check', does: 'Checks the layout at the screen sizes of the list' },
                publish: { label: 'Publish', does: 'Sends the build to GitHub Pages' },
                verify: { label: 'Live check', does: `Waits until ${site.domain} serves this commit, then checks every link` },
            },
        },
        timeline: {
            title: `Full-stack work, ${person.codingSince} to 2026`,
            summary: 'Discord bots in JavaScript in 2018. Express sites with HTML and CSS by 2021. The TrocaTine landing page in 2024. React and Angular apps at work in 2025. The site of Consignado Cloud and this site in 2026.',
            items: {
                bots: { label: 'Discord bots', text: 'JavaScript on Glitch' },
                sites: { label: 'Express sites', text: 'HTML and CSS pages next to the bots' },
                trocatine: { label: `${trocatine.name}: MVP in React, landing page`, text: 'Plain HTML, CSS and JavaScript' },
                work: { label: `Apps at ${picpay.name}`, text: 'React curation app, Angular survey app' },
                consignado: { label: `Site of ${c.name}`, text: 'Draws each request from its trace' },
            },
        },
        margin: {
            title: 'Margin check of a payroll loan',
            summary: `Net salary ${m.netSalary} times the cap of ${m.capPercent} gives a margin of ${m.marginLimit}. A loan of ${m.principal} over ${m.termMonths} months at ${m.monthlyRate} a month has an installment of ${m.installment}. The largest installment is ${m.largestInstallment}, below the margin, so the loan fits. With an income of ${m.refused.income} the limit is ${m.refused.marginLimit}, and the API refuses with status ${m.refused.status}.`,
            rule: 'The largest installment must fit in the free margin.',
            labels: {
                netSalary: 'Net salary',
                cap: 'Cap of the agreement',
                marginLimit: 'Margin',
                principal: 'Loan',
                term: 'Months',
                rate: 'Rate a month',
                installment: 'Installment',
                largest: 'Largest installment',
                total: 'Total payable',
                fits: 'Fits in the margin',
                refused: 'Refused: income too low',
                synthetic: 'Example from the README. Synthetic numbers.',
            },
        },
    },
};
