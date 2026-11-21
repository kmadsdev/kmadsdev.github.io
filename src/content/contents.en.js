// CONTENTS · ENGLISH: every sentence, label, button text, alt text and caption in English.
// contents.pt.js has the same keys in the same order.
//
// HOW TO EDIT
//   Find a text      Search this file for words that you see on the page.
//   A sentence       Change it here and in contents.pt.js.
//   A number         Change it in contents.global.js. Text in `backticks` prints it: ${picpay.cards.legacySystems}.
//                    Keep the ${...} part when you change the words around it.
//   A link target    Change the address in contents.global.js.
//   Rich text        A paragraph with links or bold text is a list of parts:
//                    'plain text', { text: 'link text', to: '#anchor' }, { text: 'bold text', strong: true }.
//                    `to` is an id of `anchors` in contents.global.js with '#', or an https address.
//   Page metadata    Not here. It is `meta` in contents.global.js, in English only.
//   Then run         npx vitest run tests/contents.test.js
//
// CONTENTS (in the order of the page; search for "─── en.<name>")
//   nav, hero, intro (opening, chapters, art), experience, cases, education,
//   applications, hobbies, figma, contact, footer, controls, player, rulers, art, notFound, noscript
import { art, consignado, discord, education, hobbies, languages, legacy, links, order, person, picpay, projects, reddit, startups } from './contents.global.js';
import { duration, monthYear, period } from './format.js';

// Names of the music player controls, for screen readers. The same keys are in contents.pt.js.
export const player = {
    play: 'Play the music',
    pause: 'Pause the music',
    restart: 'Start the music again',
    openOnSpotify: 'Open the song on Spotify',
    nowPlaying: 'Now playing',
};

// Name of the ruler at the right side, which is in step with the scroll bar.
export const rulers = {
    scroll: 'Page scroll',
};

export const en = {
    // ─── en.nav ─────────────────────────────────────────────────────────────
    // Top bar: skip link, section menu, language switch.
    nav: {
        skip: 'Skip to content',
        menu: 'Sections',
        items: [
            { id: 'intro', label: 'Introduction' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'applications', label: 'Applications' },
            { id: 'more', label: 'Hobbies' },
            { id: 'contact', label: 'Contact' },
        ],
        open: 'Open the menu',
        close: 'Close the menu',
        language: 'Language',
        languages: { en: 'English', pt: 'Portuguese' },
        codes: { en: 'EN', pt: 'PT' },
    },

    // ─── en.hero ────────────────────────────────────────────────────────────
    // First screen: the name (contents.global.js), the role, a summary, the location and four links.
    hero: {
        role: 'Software Engineer',
        focus: 'Architecture & Cloud',
        summary: [
            `My focus is on backend development, on the architecture of scalable, reliable and performant systems, and on cloud. I have ${person.yearsEngineering} years of engineering experience, but I've been in tech since ${person.codingSince}, and today I work on credit engines at `,
            { text: 'PicPay', to: links.picpay },
            `, impacting over ${picpay.customersMillions} million account holders in Brazil.`,
        ],
        location: [`${person.city}, ${person.state}, Brazil`, 'Remote', person.utc],
        localTime: 'Local time',
        links: [
            { id: 'cv', label: 'Curriculum', href: links.cvPath },
            { id: 'email', label: 'Email', href: `mailto:${links.email}` },
            { id: 'linkedin', label: 'LinkedIn', href: links.linkedin },
            { id: 'github', label: 'GitHub', href: links.github },
        ],
        scroll: 'Scroll',
    },

    // ─── en.intro ───────────────────────────────────────────────────────────
    // "Introduction": who I am and what I do, in an opening block and eight chapters.
    intro: {
        label: 'Introduction',
        title: 'I design, build and run backend systems, from the architecture to the first API call in prod',
        lead: `${person.yearsEngineering} years operating systems that answer millions of requests at PicPay on AWS, and on my own infrastructure on GCP for my personal projects.`,
        proofLabel: 'Proof',
        toolsLabel: 'Tools',
        sourceLabel: 'Source',

        // ─── en.intro.opening ───────────────────────────────────────────────
        // Each paragraph starts with a bold part.
        opening: {
            title: '👋 Hello,',
            // The owner's own joke. He asked to keep it (2026-11-20).
            photo: { alt: 'Nice ass photo here, you should hire this guy.' },
            paragraphs: [
                [
                    { text: `My name is ${person.name}`, strong: true },
                    ', and most people online call me ',
                    { text: person.alias, strong: true },
                    ". I'm a Software Engineer who mainly works on backend systems, and I architect scalable and reliable solutions for cloud environments and full end-to-end software services. That means what the product runs on, the data that serves it and the infrastructure under all of that.",
                ],
                [
                    { text: `I have been working as a Software Engineer since early ${person.engineerSince}`, strong: true },
                    `, but I've been coding small projects since early ${person.codingSince}, while I served a few hundred people in communities on Discord, Minecraft and Reddit.`,
                ],
                [
                    { text: 'I wrote my very first code in JavaScript', strong: true },
                    ', while I was (trying to) create a ',
                    { text: 'Discord bot', to: '#exp-discord' },
                    ` that would run in one of my communities with ${discord.firstCommunity} users. After several months of work I had a full backend application that could administrate my server automatically (event-based): assign roles in mass, create events, run games (an RPG and a GTA-like game with no interface), play music on calls (Spotify API integration), and even send warnings through webhooks to users who broke the rules (moderation).`,
                ],
                [
                    { text: 'Today I work at ', strong: true },
                    { text: 'PicPay', to: '#exp-picpay', strong: true },
                    `, a Brazilian fintech with about ${picpay.customersMillions}M registered users, on the engines that decide who gets a credit card.`,
                ],
                [
                    { text: 'In my free time', strong: true },
                    ', I build and run my own systems, because I want to learn how a platform infrastructure works, down to its finest details. I created ',
                    { text: 'Ruph', to: projects.ruph.live },
                    ', which is my own platform running on GCP. It deploys my apps, runs CD pipelines and IaC, sets budget and FinOps rules, and provisions resources (compute, storage, auth, CI/CD and more) across multiple providers (GCP, AWS, Azure, Vercel) in one unified visual interface.',
                ],
                [
                    { text: 'Recently, to learn more about Kubernetes and Azure', strong: true },
                    ', I created ',
                    { text: 'Consignado Cloud', to: projects.consignado.live },
                    ', which is a Spring Boot payroll-loan calculator. It runs on AKS or Azure Functions, with a real-time visual diagram of the infrastructure of my Azure account. ',
                    { text: 'Source', to: projects['consignado-api'].repo },
                ],
                [
                    { text: "I'm also very passionate about performance engineering", strong: true },
                    `. At work I made Oracle SQL queries from hundreds of HCM sources ${picpay.oracle.speedupMin}-${picpay.oracle.speedupMax}x faster. On Consignado Cloud I measured a cluster start in four parts. `,
                    { text: `I advised ${reddit.people} people on their PC builds`, to: '#more-volunteering' },
                    ', and in my free time I study ECU/EFI tuning and the engine control units of old Honda Civics. ',
                    { text: 'Source', to: links.carRepo },
                ],
            ],
        },

        // ─── en.intro.chapters ──────────────────────────────────────────────
        // One chapter: label, headline, optional lead, paragraphs, optional story (opens with
        // "Read the full story"), drawings, stats (number rows) and proof links.
        // Tool names: chapterTools in contents.global.js.
        chaptersLabel: 'What I do',
        chapters: [
            {
                id: 'architecture',
                label: 'Architecture',
                poster: 'Trade-offs',
                headline: "Give me any project, and I'll draw it, end to end",
                paragraphs: [
                    [
                        'On ',
                        { text: 'Consignado Cloud', to: '#app-consignado' },
                        " the flow is very simple on purpose: User's browser -> DNS & WAF -> Gateway -> AKS or Azure Functions -> Azure DB for Postgres. It's a study project that showcases, in a visual way, how a straightforward but real architecture should run. It also makes improvement points easier to find, for example the exact stop between services to put a cache.",
                    ],
                    [
                        `On Project Survey, at PicPay, the first plan was microservices, Redis and several databases. I asked why: one product, a team of ${picpay.survey.teamSize} and one database, about ${picpay.survey.employees} users, a few hundred concurrent. After analysing the variables, we agreed on a simple Angular interface connected to a layered monolith in PHP Hyperf, using MySQL. Redis came after.`,
                    ],
                ],
                drawings: [
                    {
                        id: 'request-path',
                        art: 'requestPath',
                        title: 'One API, two hosts',
                        text: 'Browser, Cloudflare Worker and one Java gateway. Then the same jar on a serverless host and on two AKS pods, with one database.',
                    },
                ],
                stats: [],
                proof: [
                    { label: 'Project Survey', to: '#case-survey' },
                    { label: 'Consignado Cloud', to: '#app-consignado' },
                ],
            },
            {
                id: 'backend',
                label: 'Backend',
                poster: 'Services',
                headline: 'I write services that stay correct when two requests arrive at once',
                lead: 'Java and Go on the credit and card engines at PicPay, PHP on an internal platform, Oracle SQL on HR data. My own projects show the same work logic as open source code.',
                paragraphs: [
                    [
                        'At ',
                        { text: 'PicPay', to: '#exp-picpay' },
                        ` I work on the engines of the credit calculator and of card acquisition and upgrade: ${picpay.cards.microservices} microservices, mainly in Java (Spring Boot, JPA), with the legacy systems around them. They answer millions of requests from hundreds of thousands of clients. I found and fixed defects in ${picpay.cards.legacySystems} legacy Java systems and built jobs that clean the database with no manual work.`,
                    ],
                ],
                drawings: [
                    {
                        id: 'trace',
                        art: 'trace',
                        title: 'One request, stage by stage',
                        text: `A signed-in write took ${art.trace.warm.totalMs} ms at the gateway. The database used ${art.trace.warm.ms.database} ms of it, in ${art.trace.warm.statements} statements.`,
                    },
                    {
                        id: 'states',
                        art: 'contractStates',
                        title: 'The contract state machine',
                        text: 'One transition table. Approval checks the margin again. Activation writes the installment schedule.',
                    },
                ],
                stats: [
                    {
                        id: 'tests',
                        value: `${consignado.tests}`,
                        title: 'Tests in consignado-api',
                        source: 'CI run of consignado-api on main, 2026-11-18',
                    },
                    {
                        id: 'oracle',
                        value: `${picpay.oracle.speedupMin}-${picpay.oracle.speedupMax}x`,
                        title: 'Times faster, Oracle queries',
                        source: 'My LinkedIn profile, PicPay entry',
                    },
                ],
                proof: [
                    { label: 'Cards engines', to: '#case-cards' },
                    { label: 'Oracle HCM', to: '#case-oracle' },
                    { label: 'Consignado Cloud', to: '#app-consignado' },
                    { label: 'Payment gateway', to: '#app-payment-gateway' },
                    { label: 'Credit card engine', to: '#app-credit-card-engine' },
                ],
            },
            {
                id: 'cloud',
                label: 'Cloud',
                headline: 'I select a cloud service by what it provides and at what cost',
                lead: 'One real integration on each cloud: AWS at PicPay and in a startup MVP, GCP for my own platform, Azure for Consignado Cloud.',
                paragraphs: [
                    [
                        'On AWS, ',
                        { text: 'BodyShop', to: '#case-bodyshop' },
                        ' keeps each car image in S3 behind CloudFront. The path of an image never changes, so a corrected image reaches the app with no release. For ',
                        { text: 'HiveMind', to: '#case-hivemind' },
                        ` I built a FastAPI service on EC2 that loads the newest model from S3 and swaps it while it runs. The change from Random Forest to Logistic Regression took the model file from ${startups.hivemind.modelBefore} to ${startups.hivemind.modelAfter}.`,
                    ],
                    [
                        { text: 'Ruph', to: '#app-ruph' },
                        ', my own platform, runs on GCP: Cloud Run for the API, Cloud SQL for the PostgreSQL ledger, Secret Manager for the secrets, and Terraform for the access rules. GitHub Actions deploys a new version only after the tests and the health checks pass.',
                    ],
                    [
                        { text: 'Consignado Cloud', to: '#app-consignado' },
                        ` is on Azure, and Terraform creates the resources: AKS, two function apps, Blob Storage for the site, Key Vault, PostgreSQL and the identities. The cluster has one ${consignado.cluster.node} node at ${consignado.cluster.nodePerHour} per hour, which is about ${consignado.cluster.nodePerMonth} for a full month. So the cluster is stopped by default, and a signed-in visitor starts it for a ${consignado.window.minutes}-minute window that costs about ${consignado.window.cost}.`,
                    ],
                    [
                        `I measured the start of that stopped cluster in four parts: the control plane, the node, Spring Boot with the database, and the load balancer. Azure also refused parts of the first plan. Front Door is forbidden on a student subscription, so the edge is a Cloudflare Worker. ${consignado.database.hostsRegion} had no capacity for the database size, so PostgreSQL is in ${consignado.database.region}, and each statement crosses an ocean. The `,
                        { text: 'decision table', to: links.consignadoDecisions },
                        ' has the cost of each of these.',
                    ],
                    [
                        `My interest starts below the managed service. From ${reddit.start} to ${reddit.end} I `,
                        { text: 'advised people on Reddit', to: '#more-volunteering' },
                        ' about parts for gaming, workstation and server builds. I choose an instance size the way I choose a CPU: by the workload and the price.',
                    ],
                ],
                drawings: [
                    {
                        id: 'clouds',
                        art: 'clouds',
                        title: 'AWS, GCP and Azure examples',
                        text: 'AWS at PicPay and in HiveMind. GCP for Ruph, my own platform. Azure for Consignado Cloud.',
                    },
                    {
                        id: 'cold-start',
                        art: 'coldStart',
                        title: 'A cold start in four parts',
                        text: 'The control plane, the node, Spring Boot with the database, and the load balancer.',
                    },
                ],
                stats: [],
                proof: [
                    { label: 'BodyShop on AWS', to: '#case-bodyshop' },
                    { label: 'HiveMind on AWS', to: '#case-hivemind' },
                    { label: 'Ruph on GCP', to: '#app-ruph' },
                    { label: 'Consignado Cloud on Azure', to: '#app-consignado' },
                    { label: 'Hardware advice', to: '#more-volunteering' },
                ],
            },
            {
                id: 'cicd',
                label: 'CI/CD',
                poster: 'Push to main',
                headline: 'My pipelines run the tests, deploy, and roll back automatically on a failure, from a single push',
                paragraphs: [
                    [
                        'The Continuous Deployment pipeline of ',
                        { text: 'consignado-api', to: projects['consignado-api'].repo },
                        ' runs on each push to main.',
                    ],
                    ['It runs all the unit tests, builds the image, signs in to Azure with GitHub OIDC, pushes the image with the commit as its tag, starts the cluster if it is stopped, applies the manifests, waits for the rollout and runs a smoke test inside the cluster.'],
                    ['The deploy identity has rights in one namespace. Each action is pinned to a commit SHA, and the request inspector of the site links a request to the commit that answered it.'],
                ],
                drawings: [
                    {
                        id: 'pipeline',
                        art: 'pipeline',
                        title: 'One push, seven stages',
                        text: 'Build and test, image, OIDC sign-in, push, cluster start, rollout, smoke test inside the cluster.',
                    },
                    {
                        id: 'default-workflow',
                        art: 'defaultWorkflow',
                        title: 'My personal default CI/CD workflow',
                        text: 'Two flows with the same steps: a feature branch goes to QA, and QA goes to production.',
                    },
                ],
                stats: [],
                proof: [
                    { label: 'Workflow of consignado-api', to: links.consignadoWorkflow },
                    { label: 'Workflow of this website', to: links.workflow },
                ],
            },
            {
                id: 'fullstack',
                label: 'Full-stack',
                poster: `Since ${person.codingSince}`,
                headline: `My first web applications were made in ${person.codingSince}, using JavaScript and HTML`,
                paragraphs: [
                    ['Today I build the frontend when the system needs one, and I know what it asks of the API and of the infrastructure behind it.'],
                    [
                        `I started in ${person.codingSince} with simple websites and `,
                        { text: 'applications for Discord', to: '#exp-discord' },
                        ` in JavaScript, hosted on Glitch.com (a retired platform). Next to the bots I built small Express sites with HTML and CSS. Now ${legacy.folders} of those projects are available `,
                        { text: 'on my GitHub', to: legacy.repo },
                        " (I couldn't recover all of them).",
                    ],
                ],
                story: [
                    [
                        `In ${startups.trocatine.year} I led the two-person frontend team of TrocaTine. The MVP was React and Tailwind CSS, and its public landing page is plain HTML, CSS and JavaScript. At PicPay, BodyShop has a curation app in React and Vite, and Project Survey has an Angular app in front of the PHP API.`,
                    ],
                    [
                        'My largest frontend is the site of Consignado Cloud. It is React with Cloudscape. Its diagram comes from the trace that the gateway returns: each stage with its measured milliseconds, and a cold badge that only the gateway can set. ',
                        { text: 'This site', to: links.repo },
                        ' is React and Vite with no UI library, and its flowcharts read the same data file as its text.',
                    ],
                ],
                drawings: [
                    {
                        id: 'timeline',
                        art: 'timeline',
                        title: `Full-stack work, ${person.codingSince} to 2026`,
                        text: 'Discord bots, Express sites, a startup MVP, apps at PicPay, and a site that draws its own requests.',
                    },
                ],
                stats: [
                    {
                        id: 'legacy',
                        value: `${legacy.folders}`,
                        title: 'Legacy projects, public',
                        source: 'Repository kmadsdev/glitch-legacy-projects',
                    },
                ],
                proof: [
                    { label: 'glitch-legacy-projects', to: legacy.repo },
                    { label: 'Discord years', to: '#exp-discord' },
                    { label: 'TrocaTine landing page', to: '#app-trocatine' },
                    { label: 'Site of Consignado Cloud', to: '#app-consignado' },
                    { label: 'Source code of this website', to: links.repo },
                ],
            },
            {
                id: 'finance',
                label: 'Financial systems',
                poster: 'Margin',
                headline: 'I know how card and loan decisions are made at the business level',
                lead: [
                    "At PicPay I had close contact with the whole pipeline: from the acquisition of a client, through the process of getting a card, to the card that arrives at the customer's house. I used that knowledge to create simulations of ",
                    { text: 'payroll loans', to: projects['consignado-api'].repo },
                    ', a ',
                    { text: 'card engine', to: projects['credit-card-engine'].repo },
                    ' and a ',
                    { text: 'payment gateway', to: projects['payment-gateway'].repo },
                    ' as study projects.',
                ],
                paragraphs: [
                    [
                        'At ',
                        { text: 'PicPay', to: '#exp-picpay' },
                        ' I work on ',
                        { text: 'card acquisition and upgrade', to: '#case-cards' },
                        ': the engines that decide, in real time, whether a client gets a card and which one. The same services answer customer requests that arrive through the central bank, and internal audits. I describe that work in words only, because the code and the numbers belong to PicPay.',
                    ],
                    [
                        'To show the same domain with public code, I built three projects of my own with synthetic data. ',
                        { text: 'consignado-api', to: '#app-consignado' },
                        ` is a payroll loan API (crédito consignado). The installment leaves the paycheck, so the employer agreement caps the share of the net salary that installments can take. With a net salary of ${art.margin.netSalary} and a cap of ${art.margin.capPercent}, the margin is ${art.margin.marginLimit}. A loan of ${art.margin.principal} over ${art.margin.termMonths} months at ${art.margin.monthlyRate} a month has a fixed installment of ${art.margin.installment} on a Price schedule. The API compares the largest installment, ${art.margin.largestInstallment}, with the free margin, at simulation and again at approval.`,
                    ],
                    [
                        'The ',
                        { text: 'credit card engine', to: '#app-credit-card-engine' },
                        ` has an acquisition flow for new clients and an upgrade flow for existing clients, ${consignado.cardVariants} card variants, and one policy module that stores each decision with its reasons. The `,
                        { text: 'payment gateway', to: '#app-payment-gateway' },
                        ' in Go authorizes, captures and refunds with idempotency keys, a double-entry ledger and signed webhooks. None of the three has real customers or real money. The README of consignado-api lists what is not built, for example IOF, CET and payroll integration.',
                    ],
                ],
                drawings: [
                    {
                        id: 'margin',
                        art: 'margin',
                        title: 'Check for a payroll loan',
                        text: `Net salary ${art.margin.netSalary} at ${art.margin.capPercent} gives ${art.margin.marginLimit}. The largest installment, ${art.margin.largestInstallment}, fits.`,
                    },
                ],
                stats: [],
                proof: [
                    { label: 'Cards engines', to: '#case-cards' },
                    { label: 'Consignado Cloud', to: '#app-consignado' },
                    { label: 'Credit card engine', to: '#app-credit-card-engine' },
                    { label: 'Payment gateway', to: '#app-payment-gateway' },
                ],
            },
            {
                id: 'ai',
                label: 'AI coding agents',
                poster: 'One context',
                headline: 'I give AI coding agents rules, tools and one shared context',
                lead: `Before the BodyShop kickoff I wrote the template that the agents of all ${picpay.bodyshop.teamSize} people on the team worked from.`,
                paragraphs: [
                    [
                        'The ',
                        { text: 'Agentic Template', to: '#app-agentic' },
                        ' is a repository layout: shared task, progress and knowledge files, test-first rules, and a fixed set of MCP servers and skills. On ',
                        { text: 'BodyShop', to: '#case-bodyshop' },
                        ` the agents of all ${picpay.bodyshop.teamSize} people started from that one context.`,
                    ],
                ],
                drawings: [],
                stats: [],
                proof: [
                    { label: 'Agentic Template', to: '#app-agentic' },
                    { label: 'BodyShop', to: '#case-bodyshop' },
                ],
            },
            {
                id: 'endtoend',
                label: 'End to end',
                headline: 'I take an idea, turn it into code and then into a live address',
                lead: 'On my own projects I start from an insight and do the design, the code, the tests, the infrastructure and the deploy.',
                paragraphs: [
                    [
                        { text: 'Consignado Cloud', to: '#app-consignado' },
                        ' and ',
                        { text: 'Ruph', to: '#app-ruph' },
                        ' are the two largest. ',
                        { text: `${order.apps.production.length + order.apps.other.length} applications`, to: '#applications-live' },
                        ' run in production today, and ',
                        { text: `${order.apps.study.length} study repositories`, to: '#applications-study' },
                        ' have public code.',
                    ],
                ],
                drawings: [],
                stats: [],
                proof: [
                    { label: 'Applications in production', to: '#applications-live' },
                    { label: 'Study and other projects', to: '#applications-study' },
                ],
            },
        ],

        // ─── en.intro.art ───────────────────────────────────────────────────
        // Labels of the drawings. Structure and numbers: `art` in contents.global.js.
        // `summary` is the text form of the drawing (screen readers, reduced motion).
        art: {
            requestPath: {
                title: 'Consignado Cloud architecture',
                summary: 'A request goes from the browser to a Cloudflare Worker. Inside Azure, the Worker sends pages to a static site and API calls to one Java gateway. The gateway forwards to the serverless host or to a load balancer. The load balancer sends the request to pod 1 or pod 2 on AKS. The serverless host and the two pods use one Azure database.',
                frames: { azure: 'Azure', aks: 'AKS' },
                nodes: {
                    browser: { label: 'Browser', note: 'Guest or signed-in user' },
                    worker: { label: 'Cloudflare Worker', note: `TLS, cache, ${consignado.rateLimit.requests} requests per ${consignado.rateLimit.seconds} s per IP` },
                    gateway: { label: 'Java gateway', note: 'Azure Functions. Token check, limits, trace' },
                    serverless: { label: 'Serverless host', note: 'The API jar on Azure Functions' },
                    database: { label: 'Azure DB', note: `${consignado.database.engine}, one database for both hosts` },
                    site: { label: 'Static site', note: 'Blob Storage' },
                    balancer: { label: 'Load balancer', note: 'Internal, no public address' },
                    pod1: { label: 'Pod #1', note: 'The same jar' },
                    pod2: { label: 'Pod #2', note: 'The same jar' },
                },
                edges: [
                    'HTTPS',
                    'API calls, with the edge key',
                    'Pages, cached',
                    'Serverless route, with the host key',
                    'Kubernetes route, private address',
                    'SQL over TLS',
                    'Service',
                    'Service',
                    'SQL over TLS',
                    'SQL over TLS',
                ],
            },
            trace: {
                title: 'Two real requests, by stage',
                summary: `A warm signed-in write took ${art.trace.warm.totalMs} ms at the gateway, with ${art.trace.warm.ms.database} ms in the database for ${art.trace.warm.statements} statements. The first call after idle time took ${art.trace.cold.totalSeconds} s, and the cold start of the serverless host used ${consignado.serverless.coldMin} s of it.`,
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
                title: 'AWS, GCP and Azure examples',
                summary: 'AWS: work at PicPay and the HiveMind MVP. GCP: Ruph, my own platform. Azure: Consignado Cloud, my own project.',
                aws: {
                    name: 'AWS',
                    context: 'PicPay and HiveMind',
                    nodes: {
                        cloudfront: { label: 'CloudFront', use: 'Serves BodyShop images and the Project Survey app' },
                        s3: { label: 'S3', use: 'BodyShop images at fixed paths, HiveMind model files' },
                        sqs: { label: 'SQS', use: 'Queue between the app request and the image service of BodyShop' },
                        ec2: { label: 'EC2', use: 'HiveMind API and ML service' },
                        rds: { label: 'RDS', use: 'PostgreSQL at PicPay: client accounts, issued cards, transactions' },
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
                    context: 'Consignado Cloud, my own project',
                    nodes: {
                        aks: { label: 'AKS', use: `${consignado.cluster.nodes} node, ${consignado.cluster.pods} to ${consignado.cluster.podsMax} pods, stopped by default` },
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
                summary: `From the window request to the first answer: ${duration(art.coldStart.seconds.total)}. Control plane ${duration(art.coldStart.seconds.controlPlane)}, node ${duration(art.coldStart.seconds.node)}, Spring Boot and database ${duration(art.coldStart.seconds.app)}, load balancer ${duration(art.coldStart.seconds.balancer)}. One measured run on 2026-11-17.`,
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
            defaultWorkflow: {
                title: 'My personal default CI/CD workflow',
                summary: `QA: a pull request from ${art.defaultWorkflow.flows[0].from} to ${art.defaultWorkflow.flows[0].to} runs the unit tests, the merge deploys QA, then a live check and a smoke test run, and notifications go out. Production: the same steps for a pull request from ${art.defaultWorkflow.flows[1].from} to ${art.defaultWorkflow.flows[1].to}.`,
                // Two flows with the same six steps, in order. Branch names, addresses and
                // notification channels: art.defaultWorkflow in contents.global.js.
                flows: {
                    qa: {
                        label: 'QA',
                        steps: [
                            `PR from ${art.defaultWorkflow.flows[0].from} to ${art.defaultWorkflow.flows[0].to}`,
                            'Run the unit tests on a Linux machine (provisioned by Actions)',
                            `Merge to ${art.defaultWorkflow.flows[0].to}`,
                            `Deploy QA (${art.defaultWorkflow.flows[0].address})`,
                            `Live check (${art.defaultWorkflow.flows[0].telemetry}) and smoke test`,
                            `Notifications (${art.defaultWorkflow.notifications.join(', ')})`,
                        ],
                    },
                    production: {
                        label: 'PRODUCTION',
                        steps: [
                            `PR from ${art.defaultWorkflow.flows[1].from} to ${art.defaultWorkflow.flows[1].to}`,
                            'Run the unit tests on a Linux machine (provisioned by Actions)',
                            `Merge to ${art.defaultWorkflow.flows[1].to}`,
                            `Deploy PROD (${art.defaultWorkflow.flows[1].address})`,
                            `Live check (${art.defaultWorkflow.flows[1].telemetry}) and smoke test`,
                            `Notifications (${art.defaultWorkflow.notifications.join(', ')})`,
                        ],
                    },
                },
            },
            timeline: {
                title: `Full-stack work, ${person.codingSince} to 2026`,
                summary: 'Discord bots in JavaScript from 2018 to 2020. Express sites with HTML and CSS from 2021 to 2023. The TrocaTine MVP and landing page in 2024. React and Angular apps at PicPay in 2025. The site of Consignado Cloud in 2026.',
                items: {
                    bots: { label: ['Discord bots'], text: 'JavaScript on Glitch' },
                    sites: { label: ['Express sites'], text: 'HTML and CSS pages next to the bots' },
                    trocatine: {
                        label: [{ text: 'TrocaTine MVP and landing page', to: '#exp-cofounder' }, ', ', { text: 'personal projects', to: '#applications' }],
                        text: 'React MVP, landing page in plain HTML, CSS and JavaScript',
                    },
                    work: {
                        label: [{ text: 'Apps at PicPay', to: '#exp-picpay' }, ', ', { text: 'personal projects', to: '#applications' }],
                        text: 'React curation app, Angular survey app',
                    },
                    consignado: {
                        label: [{ text: 'Consignado Cloud', to: '#app-consignado' }, ', ', { text: 'personal projects', to: '#applications' }],
                        text: 'Draws each request from its trace',
                    },
                },
            },
            margin: {
                title: 'Check for a payroll loan',
                summary: `Net salary ${art.margin.netSalary} times the cap of ${art.margin.capPercent} gives a margin of ${art.margin.marginLimit}. A loan of ${art.margin.principal} over ${art.margin.termMonths} months at ${art.margin.monthlyRate} a month has an installment of ${art.margin.installment}. The largest installment is ${art.margin.largestInstallment}, below the margin, so the loan fits. With an income of ${art.margin.refused.income} the limit is ${art.margin.refused.marginLimit}, and the API refuses with status ${art.margin.refused.status}.`,
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
    },

    // ─── en.experience ──────────────────────────────────────────────────────
    // "Experience": per company a context line, the impact, the responsibilities (PicPay only)
    // and the timeline. The case files of a company: order.companyCases in contents.global.js.
    experience: {
        label: 'Experience',
        title: 'Where I worked and my impact',
        labels: {
            current: 'Current',
            impact: 'Impact',
            currentResponsibilities: 'Current responsibilities',
            previousResponsibilities: 'Previous responsibilities',
            timeline: 'Experience timeline',
            projects: 'Projects',
            links: 'Links',
        },
        items: [
            {
                id: 'picpay',
                anchor: 'exp-picpay',
                company: picpay.name,
                context: [
                    `Brazilian digital bank with ${picpay.customersMillions}M customers, recently `,
                    { text: 'listed on Nasdaq', to: links.picpayNasdaq },
                    '.',
                ],
                impact: [
                    `I found and fixed bugs and hidden defects in ${picpay.cards.legacySystems} legacy Java systems, closed hundreds of client incidents, and built self-healing jobs that clean the database with no manual work.`,
                    `I led ${picpay.bodyshop.engineersLed} engineers on BodyShop: ${picpay.bodyshop.services} internal services, built to replace the wrong or generic car image that ${picpay.bodyshop.customers} customers see. I made the stack and scope decisions and took it to QA with governance approval.`,
                    `I wrote the BodyShop Agentic Template before kickoff: shared task, progress and knowledge files, test-first rules, MCP servers and skills. The AI coding agents of all ${picpay.bodyshop.teamSize} people on the team worked from one context.`,
                    `On Project Survey, in a team of ${picpay.survey.teamSize}, I worked on the backend API, the MySQL design and indexes, and the infrastructure of a survey platform for about ${picpay.survey.employees} employees.`,
                    `In the Oracle HCM squad I made queries across ${picpay.oracle.tables} tables and views ${picpay.oracle.speedupMin} to ${picpay.oracle.speedupMax} times faster, and the work saved hundreds of hours of research for engineers and analysts.`,
                ],
                currentResponsibilities: [
                    `Write and maintain Java (Spring Boot, JPA) microservices with messaging: ${picpay.cards.microservices} microservices and legacy systems that answer millions of requests from hundreds of thousands of clients.`,
                    'Analyze incidents across multiple microservices and keep the backend reliable.',
                ],
                previousResponsibilities: [
                    `Write and maintain Go microservices with messaging: ${picpay.vehicleHub.goServices} microservices for an AI-native image generation application for PicPay's Vehicle Hub.`,
                    'Design reliable architectures for new applications or features.',
                    'Develop CI/CD pipelines and unit tests on GitHub, ArgoCD and Tekton.',
                    'Model databases and optimize queries.',
                ],
                timeline: [
                    {
                        period: period(picpay.roles.cards, 'en'),
                        current: true,
                        title: 'Software Engineer, Cards',
                        note: 'Cards area, high-net-worth (HNW) acquisition.',
                    },
                    {
                        period: period(picpay.roles.hr, 'en'),
                        current: false,
                        title: 'Software Engineer, Human Resources',
                        note: 'IT Corp, Oracle HCM squad. Close contact with HR, Legal and Compliance.',
                    },
                ],
                links: [],
            },
            {
                id: 'cofounder',
                anchor: 'exp-cofounder',
                company: 'HiveMind and TrocaTine',
                context: ['Two startup MVPs before launch, shown to the public at ExpoTech. Not full-time jobs, and no real users.'],
                impact: [
                    'I planned, wrote and deployed an ML model that predicts the "match" of an industry company to our solution.',
                    `Later I improved the model accuracy to about ${startups.hivemind.trainingAccuracy} (training accuracy) while I cut storage costs by ${startups.hivemind.storageSaving}.`,
                    `About ${startups.hivemind.visitors} ExpoTech ${startups.hivemind.year} visitors, rated ${startups.hivemind.rating} stars.`,
                    `About ${startups.trocatine.visitors} ExpoTech ${startups.trocatine.year} visitors, rated ${startups.trocatine.rating} stars.`,
                ],
                timeline: [
                    {
                        period: `${period(startups.hivemind, 'en')} (1 yr)`,
                        current: false,
                        title: 'Co-founder',
                        note: 'Data Engineering Team Lead, HiveMind Client Potential (Python ML application).',
                    },
                    {
                        period: `${period(startups.trocatine, 'en')} (1 yr)`,
                        current: false,
                        title: 'Co-founder',
                        note: 'Frontend Team Lead, landing page and MVP.',
                    },
                ],
                links: [
                    { label: 'TrocaTine landing page', to: startups.trocatine.page },
                    { label: 'HiveMind Client Potential', to: startups.hivemind.page },
                ],
            },
            {
                id: 'discord',
                anchor: 'exp-discord',
                company: 'Discord communities',
                context: ['Self-taught. This is where I learned to write code.'],
                impact: [
                    `The bots ran in communities with up to ${discord.members} members.`,
                    'Hundreds of daily requests from my servers.',
                    `The bots automatically managed an online store on Discord with ${discord.storeCustomers} active customers.`,
                ],
                timeline: [
                    {
                        period: `${discord.start} – ${discord.end} (${discord.years} yr)`,
                        current: false,
                        title: 'Application developer',
                        note: 'JavaScript (Node.js, Discord.js), Java for Minecraft servers, SQLite and MySQL for storage. Everything ran on Glitch.com, Discloud and GitHub.',
                    },
                ],
                links: [],
            },
        ],
    },

    // ─── en.cases ───────────────────────────────────────────────────────────
    // Case files: one problem, the decisions, the result and a flowchart.
    // flow.nodes: one label per node id of cases[id].flow.nodes (contents.global.js).
    // flow.steps: one sentence per edge of cases[id].flow.edges, in the same order.
    // flow: null = words only, no chart.
    cases: {
        label: 'Case files',
        labels: {
            problem: 'The problem',
            decisions: 'What I decided',
            result: 'The result',
            flow: 'How it runs',
            stack: 'Stack',
            step: 'Step',
            links: 'Links',
            prev: 'Previous step',
            next: 'Next step',
            play: 'Play the steps',
            pause: 'Pause the steps',
            wordsOnly: 'Words only. The systems and their data belong to the company.',
        },
        items: [
            {
                id: 'cards',
                anchor: 'case-cards',
                kicker: 'PicPay · cards area · in production',
                title: 'Cards engines: who gets which card',
                problem: `The cards area decides credit in real time: requests for a new card, requests for an upgrade, and customer requests that arrive through the central bank or an internal audit. The work runs on ${picpay.cards.microservices} microservices in Java and Go and on the legacy systems around them. They answer millions of requests from hundreds of thousands of clients.`,
                decisions: [
                    'I write and maintain the Java (Spring Boot, JPA) and Go services of the acquisition and upgrade flows, with messaging, CI/CD and observability.',
                    'I read an incident across the microservices until I find the defect. Then I write the test, and then the fix.',
                    'I built self-healing jobs that clean the database with no manual work.',
                ],
                result: `I found and fixed bugs and hidden defects in ${picpay.cards.legacySystems} legacy Java systems and closed hundreds of client incidents.`,
                stats: [
                    { value: picpay.cards.microservices, label: 'microservices in the area' },
                    { value: `${picpay.cards.legacySystems}`, label: 'legacy Java systems with fixes' },
                ],
                flow: null,
            },
            {
                id: 'bodyshop',
                anchor: 'case-bodyshop',
                kicker: 'PicPay · internal platform · in QA',
                title: "BodyShop: a picture of each customer's own car",
                problem: `${picpay.bodyshop.customers} customers opened the app and saw a car that was not theirs: a generic picture, or the wrong model, year or color. An internal study showed that satisfaction and retention can rise when the exact car appears.`,
                decisions: [
                    'Generate once. One image for each brand, model, year and color. A registry answers before any model is called.',
                    'Reserve the storage path first. The image always lives at the same S3 path, so a better image replaces a bad one and the app needs no release.',
                    `Let people correct the machine. Staff write what is wrong, a more accurate model returns ${picpay.bodyshop.curationVariants} variants, and the one they pick overwrites the old file.`,
                    'Generate off the request path. A request for a new car goes to an SQS queue. The image service takes it from the queue, stores the image in S3 and writes the car details to MongoDB.',
                    'One layered Go monolith with REST APIs, MongoDB as an indexed registry, and S3 behind CloudFront.',
                ],
                result: `In the pilot, ${picpay.bodyshop.approvalRate} of the images passed approval at generation, with no manual curation, in under ${picpay.bodyshop.endToEnd} from request to image. The team ran latency, uptime, concurrency and security tests in QA, with governance approval.`,
                stats: [
                    { value: picpay.bodyshop.customers, label: 'customers in scope' },
                    { value: picpay.bodyshop.approvalRate, label: 'approved at generation (pilot)' },
                    { value: `< ${picpay.bodyshop.endToEnd}`, label: 'request to image' },
                    { value: `${picpay.bodyshop.engineersLed}`, label: 'engineers I led' },
                ],
                flow: {
                    title: 'Generate once, then curate',
                    nodes: {
                        app: 'Customer app',
                        api: 'Go API (Gin)',
                        registry: 'Vehicle registry (MongoDB)',
                        model: 'Image model',
                        storage: 'Amazon S3',
                        cdn: 'CloudFront',
                        curation: 'Curation app (React)',
                    },
                    steps: [
                        'The app asks for the image of one car: brand, model, year and color.',
                        'The API looks in the registry. A car that already has an image gets its path at once.',
                        'For a new car, the API reserves one S3 path.',
                        'The API puts the request on an SQS queue. The image service takes it and calls the model one time, with the business rules.',
                        'The image is stored at the reserved path.',
                        'CloudFront serves the image to the app.',
                        'A staff member marks a bad image and writes what to fix.',
                        `The API calls a more accurate model and gets ${picpay.bodyshop.curationVariants} variants.`,
                        'The chosen variant overwrites the same path. The app shows the new image with no release.',
                    ],
                },
            },
            {
                id: 'survey',
                anchor: 'case-survey',
                kicker: 'PicPay · internal platform',
                title: 'Project Survey: one platform in place of many paid tools',
                problem: `About ${picpay.survey.employees} employees answered NPS and workplace surveys on several paid tools, with little room to customize them and little control of privacy. The first plan for the replacement was a set of microservices.`,
                decisions: [
                    'I asked why the plan needed microservices. One product, one team and one database did not need them. The team moved to a layered monolith.',
                    'I worked on the backend API and its CI/CD tests in PHP (Hyperf).',
                    'I planned the MySQL schema and indexes for survey and answer data, with Redis as a cache.',
                ],
                result: 'The old setup cost tens of thousands of US dollars a year in licenses. The projected saving is hundreds of thousands of BRL a year, with more control of privacy and of the questions.',
                stats: [
                    { value: picpay.survey.employees, label: 'employees served' },
                    { value: `${picpay.survey.teamSize}`, label: 'people on the team' },
                    { value: '1', label: 'monolith in place of a microservices plan' },
                ],
                flow: {
                    title: 'One request, one service',
                    nodes: {
                        people: 'Employees',
                        cdn: 'CloudFront',
                        web: 'Angular app',
                        api: 'PHP API (Hyperf)',
                        cache: 'Redis',
                        db: 'MySQL',
                    },
                    steps: [
                        'An employee opens a survey.',
                        'CloudFront delivers the Angular app.',
                        'The app sends the answers to one API.',
                        'The API reads survey data from the Redis cache.',
                        'The API writes the answers to MySQL, on indexed tables.',
                    ],
                },
            },
            {
                id: 'oracle',
                anchor: 'case-oracle',
                kicker: 'PicPay · HR data',
                title: 'Oracle HCM: a map for data that had none',
                problem: `Hundreds of Oracle Cloud HCM databases, and no documentation. People kept writing new queries on top of legacy views of ${picpay.oracle.viewLines} lines, with no index and no cache.`,
                decisions: [
                    'I read the data itself to find what each table and column means, and I wrote it down as an index.',
                    `I rewrote large queries across ${picpay.oracle.tables} tables and views. They went from thousands of lines to hundreds and ran ${picpay.oracle.speedupMin} to ${picpay.oracle.speedupMax} times faster.`,
                    'I wrote SQL automations and decision-support queries on top of the index.',
                    'I planned a database design that replaces the legacy views.',
                ],
                result: 'The index saved hundreds of hours of research for engineers and analysts, and HR got organized data for predictive models.',
                stats: [
                    { value: picpay.oracle.databases, label: 'databases mapped' },
                    { value: `${picpay.oracle.speedupMin} to ${picpay.oracle.speedupMax}x`, label: 'faster queries' },
                    { value: picpay.oracle.viewLines, label: 'lines in one legacy view' },
                ],
                flow: {
                    title: 'From unknown data to answers',
                    nodes: {
                        hcm: 'Oracle Cloud HCM',
                        map: 'Data index',
                        queries: 'SQL automations',
                        views: 'Legacy views',
                        design: 'New database design',
                        science: 'Predictive models',
                    },
                    steps: [
                        'I map each database: tables, columns and what they mean.',
                        'Queries and automations use the index, not a guess.',
                        'The design that replaces the legacy views comes from the same index.',
                        'Organized HR data goes to the data science team.',
                    ],
                },
            },
            {
                id: 'hivemind',
                anchor: 'case-hivemind',
                kicker: `Startup MVP · ${startups.hivemind.year}`,
                title: `HiveMind: a ${startups.hivemind.modelBefore} model that became ${startups.hivemind.modelAfter}`,
                problem: `HiveMind scores how well a company matches a product, from a short survey. The first model was a Random Forest file of about ${startups.hivemind.modelBefore}, stored in S3 and loaded by the API.`,
                decisions: [
                    `I moved the model from Random Forest to Logistic Regression: about ${startups.hivemind.trainingAccuracy} training accuracy in a file of ${startups.hivemind.modelAfter}.`,
                    'I built a FastAPI service that loads the newest model from S3 and swaps it while it runs. A new model needs no redeploy.',
                    'I modeled the data in PostgreSQL, MongoDB and Redis, and set up CI/CD on AWS and GitHub.',
                ],
                result: `Storage cost for models fell by up to ${startups.hivemind.storageSaving}. About ${startups.hivemind.visitors} visitors at ExpoTech ${startups.hivemind.year} rated the product ${startups.hivemind.rating}/5. It was an MVP before launch, with no real users.`,
                stats: [
                    { value: startups.hivemind.modelAfter, label: `model file, from ${startups.hivemind.modelBefore}` },
                    { value: startups.hivemind.storageSaving, label: 'lower model storage cost' },
                    { value: startups.hivemind.trainingAccuracy, label: 'training accuracy' },
                    { value: `${startups.hivemind.rating}/5`, label: `from about ${startups.hivemind.visitors} visitors` },
                ],
                flow: {
                    title: 'A new model with no redeploy',
                    nodes: {
                        train: 'Training run',
                        bucket: 'Amazon S3',
                        api: 'FastAPI service',
                        client: 'Sales survey',
                    },
                    steps: [
                        'A training run writes a new model file to S3.',
                        'The service loads the newest model and swaps it in memory.',
                        'The survey sends the answers of a company.',
                        'The service returns the match score.',
                    ],
                },
            },
            {
                id: 'ruph',
                // No anchor of its own: the Applications section shows this case inside app-ruph.
                anchor: null,
                kicker: 'My own platform · in production',
                title: 'Ruph: one control plane for every app I run',
                problem: 'I run several apps on GCP, Cloudflare, Vercel, Supabase and Neon. I wanted one place that knows every app and every environment.',
                decisions: [
                    'One registry of apps and environments, with one API. The web dashboard and the CLI use it.',
                    'No change without a plan. I write the plan, and then I approve it.',
                    'Each apply is written to an append-only ledger. Budgets warn or pause the work.',
                    'Provider plugins for GCP, Cloudflare, Vercel, Supabase and Neon. Terraform manages the access rules.',
                ],
                result: 'Ruph deploys and provisions my own apps in QA and in production. GitHub Actions runs the test suite and the PostgreSQL migration tests, and deploys only after the health checks pass. It is a private platform: I am its only operator.',
                stats: [],
                flow: {
                    title: 'Plan, approve, apply, record',
                    nodes: {
                        human: 'Me',
                        api: 'Ruph API (Hono)',
                        ledger: 'Ledger (PostgreSQL)',
                        providers: 'Cloud providers',
                        ci: 'GitHub Actions',
                    },
                    steps: [
                        'I write a plan in the dashboard or the CLI.',
                        'I read the plan and approve it.',
                        'The API writes the apply to the append-only ledger.',
                        'The API changes the resources at the cloud providers.',
                        'GitHub Actions deploys a new version only after tests and health checks pass.',
                    ],
                },
            },
        ],
    },

    // ─── en.education ───────────────────────────────────────────────────────
    // "Education": one program and three certificates. Nothing else goes here.
    education: {
        label: 'Education',
        title: 'Formation',
        program: {
            anchor: 'edu-jf',
            period: `${period(education, 'en')} (${education.years} years)`,
            title: 'Software Development Technical Program',
            place: education.institution,
            subjectsLabel: 'Subjects',
            subjects: [
                'Software engineering, DevOps, SDLC and CI/CD',
                'Backend and frontend development',
                'Data modeling (PostgreSQL, MongoDB, Redis, Neo4j)',
                'Object-oriented programming',
                'Data science and machine learning',
                'Computer architecture, hardware and operating systems (Linux)',
                'Git and GitHub: branching and release management',
            ],
        },
        certificates: {
            anchor: 'edu-certs',
            title: 'Certificates',
            // One date per certificate id. Id, title and issuer: education.certificates in contents.global.js.
            dates: {
                'software-engineer': monthYear(education.certificates[0].date, 'en'),
                'rest-api': monthYear(education.certificates[1].date, 'en'),
                sql: monthYear(education.certificates[2].date, 'en'),
            },
            note: 'The three tests cover algorithms, REST APIs, software engineering, data modeling, query optimization, recursive CTEs and window functions. I solved them in Python, C/C++ and MySQL.',
        },
    },

    // ─── en.applications ────────────────────────────────────────────────────
    // "Applications". Names, addresses, stacks and clips: `projects` in contents.global.js.
    // Three lists, in the order of order.apps: production, other, study. No status is shown.
    applications: {
        label: 'Applications',
        title: 'What runs today, and what I built to study',
        labels: {
            live: 'Open live',
            source: 'Source code',
            privateSource: 'Private source',
            stack: 'Stack',
            architecture: 'Architecture',
            goals: 'Goals',
            playClip: 'Play the clip',
            pauseClip: 'Pause the clip',
        },
        production: {
            anchor: 'applications-live',
            title: 'In production',
            items: [
                {
                    id: 'consignado',
                    anchor: 'app-consignado',
                    tagline: 'One API on two Azure hosts, with each request drawn',
                    paragraphs: [
                        `A payroll loan API in Java 21 and Spring Boot 3.5 that runs on ${consignado.cluster.pods} pods on AKS and inside an Azure Function, behind one Java gateway and a Cloudflare edge.`,
                        'The site draws each request as a live diagram, with the measured time of each stage. It is a technical demo with synthetic data and no credit offer.',
                        'This platform was created so that aspiring software architects and SREs can follow a real engine that works on multiple cloud services in real time, in a visual-friendly interface that showcases the latency and the progress of each step, with a built-in replay.',
                    ],
                    architecture: [
                        `Edge: a Cloudflare Worker with TLS, a cache for static files and a limit of ${consignado.rateLimit.requests} requests per ${consignado.rateLimit.seconds} s per IP on the API.`,
                        'Gateway: Java 21 on Azure Functions. It checks the Entra ID token, applies the access rules, starts and stops the cluster, and returns a trace of each call.',
                        `Hosts: the same jar on Azure Functions (cold call ${consignado.serverless.coldMin} to ${consignado.serverless.coldMax} s, warm call ${consignado.serverless.warmMin} to ${consignado.serverless.warmMax} s) and on AKS (${consignado.cluster.nodes} node, ${consignado.cluster.pods} pods behind an internal load balancer, warm call about ${consignado.cluster.warm} s).`,
                        `Cluster: stopped by default. A signed-in visitor starts it for a ${consignado.window.minutes}-minute window. A start from stopped took ${duration(art.coldStart.seconds.total)}.`,
                        `Data and delivery: ${consignado.database.engine} with Flyway. Terraform creates the Azure resources, and GitHub Actions deploys each repository with OIDC.`,
                    ],
                    goals: [
                        'Compare one API on Kubernetes and on serverless, with measured cost and latency.',
                        `Stay inside a monthly budget of ${consignado.budget}: the gateway pauses the engine at 100%.`,
                        'Show the rules of a payroll loan in code: margin, Price schedule, contract states, optimistic concurrency and a transactional outbox.',
                    ],
                    media: {
                        preview: { caption: 'A guest sends one real loan preview to the serverless host. The trace replays that request stage by stage, and the Request Inspector opens on it.', alt: 'Clip of the Consignado Cloud site: the loan preview form, then the request diagram with the time of each stage.' },
                        lifecycle: { caption: 'A replay of one recorded AKS cluster start at 8 times the real speed. The slider jumps to 6 min 15 s, and the replay runs to the end.', alt: 'Clip of the Consignado Cloud site: the replay of an AKS cluster start, stage by stage, until the cluster is ready.' },
                        api: { caption: 'The API alone, in a local run: an agreement, a customer and a loan of 84 months.', alt: 'Terminal recording: curl creates an agreement and a customer, then simulates a loan and prints the installment.' },
                        'still-1': { caption: 'The loan preview: the form with its result, and whether the installment fits the margin.', alt: 'Screen of the Consignado Cloud site: the loan preview form with its result and the margin check.' },
                        'still-2': { caption: 'One warm preview as a trace, with the Request Inspector open on the same request.', alt: 'Screen of the Consignado Cloud site: the trace of one request from the browser to the Spring Boot API, and the Request Inspector panel.' },
                        'still-3': { caption: 'The replay of one AKS cluster start, each stage with its measured time.', alt: 'Screen of the Consignado Cloud site: the diagram of an AKS cluster start at the end of its replay.' },
                    },
                },
                {
                    id: 'ruph',
                    anchor: 'app-ruph',
                    tagline: 'One control plane for every app I run',
                    paragraphs: [
                        'My own platform. It keeps one registry of all my apps and environments, and it deploys and provisions everything I need in QA and in production on GitHub, GCP, Cloudflare, Vercel, Supabase, Neon, Claude Platform, AWS, Azure, Doppler and more.',
                        'This platform has saved me hours of engineering on repeated work, because it provisions a whole standardized infrastructure for all my public and internal applications.',
                    ],
                    architecture: [
                        'One API in TypeScript (Hono). The web dashboard and the CLI use it.',
                        'Cloud Run for the API, Cloud SQL for the PostgreSQL ledger, Secret Manager for the secrets, and Terraform for the access rules.',
                        'GitHub Actions runs the test suite and the PostgreSQL migration tests, and deploys only after the health checks pass.',
                    ],
                    goals: [
                        'One place that knows each app and each environment.',
                        'A record of each apply in an append-only ledger, with budgets that warn or pause the work.',
                    ],
                    // The case file `ruph` of en.cases, with its flowchart, shows here.
                    caseId: 'ruph',
                },
                {
                    id: 'diabetes',
                    anchor: 'app-diabetes',
                    tagline: `Predicts and estimates your risk of diabetes from ${projects.diabetes.inputs} answers`,
                    paragraphs: [
                        `A FastAPI service validates ${projects.diabetes.inputs} inputs, loads the newest scikit-learn model and returns a risk estimate with its confidence. The model is a Random Forest trained on public Kaggle data. It started as my CS50x final project. It is not a medical diagnosis.`,
                    ],
                    architecture: [
                        `A static page sends the ${projects.diabetes.inputs} answers to the API.`,
                        'The FastAPI service validates each input, runs the model and answers with the estimate and its confidence.',
                        `${projects.diabetes.endpoints} endpoints: status, health, models and predict.`,
                    ],
                    goals: [
                        'Take a model from a notebook to a live API.',
                        'Serve the newest trained model with no change to the code.',
                    ],
                },
            ],
        },
        other: {
            anchor: 'applications-other',
            title: 'Other production apps',
            items: [
                {
                    id: 'offmode',
                    anchor: 'app-offmode',
                    tagline: 'A Pomodoro timer for deep focus',
                    text: 'A focus timer for the web and the desktop. It tracks your focus time across sessions, with login and sync to a server.',
                },
                {
                    id: 'notes',
                    anchor: 'app-notes',
                    tagline: 'A code editor in one HTML file',
                    text: `A notepad that looks and works like VS Code, with no backend and no account. Monaco highlights ${projects.notes.languages} languages. Files stay in the browser, or save straight to your disk in Chrome and Edge. It has ${projects.notes.previews} live previews, from Markdown to Mermaid.`,
                },
                {
                    id: 'doom',
                    anchor: 'app-doom',
                    tagline: 'Doom in one file, with no server',
                    text: `The 1993 game compiled from C to WebAssembly, packed with gzip into a single HTML file that unpacks itself in the browser. The packed game went from ${projects.doom.sizeBefore} to ${projects.doom.sizeAfter}. I built it to study compression.`,
                },
                {
                    id: 'agentic',
                    anchor: 'app-agentic',
                    tagline: 'One context for every AI coding agent',
                    text: 'A template for a repository that AI agents can work in: task, progress and knowledge files, test-first rules, and a fixed set of MCP servers and skills.',
                },
                {
                    id: 'custom-square',
                    anchor: 'app-custom-square',
                    tagline: 'A CSS playground',
                    text: 'Change CSS properties, gradients and colors and see the result at once. Plain JavaScript, with the theme saved in the browser.',
                },
                {
                    id: 'trocatine',
                    anchor: 'app-trocatine',
                    tagline: 'The landing page of my first startup MVP',
                    text: "The public page of TrocaTine, an exchange of children's clothes and toys. This address is the landing page only: plain HTML, CSS and JavaScript on GitHub Pages. The MVP of the product was a separate application in React and Tailwind CSS.",
                },
            ],
        },
        // Cards with no picture: the name, the repository and the stack come from `projects`.
        study: {
            anchor: 'applications-study',
            title: 'Study and other projects',
            items: [
                {
                    id: 'consignado-api',
                    anchor: 'app-consignado-api',
                    line: 'The payroll loan API behind Consignado Cloud: margin check, Price schedule, contract states, optimistic concurrency and a transactional outbox.',
                },
                {
                    id: 'payment-gateway',
                    anchor: 'app-payment-gateway',
                    line: 'A simulated payment gateway for an online store, backend only: authorize, capture and refund with idempotency keys, a double-entry ledger and signed webhooks.',
                },
                {
                    id: 'credit-card-engine',
                    anchor: 'app-credit-card-engine',
                    line: 'A card engine with an acquisition flow for new clients and an upgrade flow for existing clients. One policy module stores each decision with its reasons.',
                },
                {
                    id: 'devops-challenge',
                    anchor: 'app-devops-challenge',
                    line: `A distributed system on Docker Compose with ${projects['devops-challenge'].containers} containers: a Python writer, a Go reader, a Node.js web front end and Redis between them.`,
                },
                {
                    id: 'incident-api',
                    anchor: 'app-incident-api',
                    line: 'A REST API that manages alerts and incidents and exposes the metrics and the health of the application, with MySQL.',
                },
                {
                    id: 'student-tools',
                    anchor: 'app-student-tools',
                    line: 'A curated list of the free developer tools and credits in the GitHub Student Developer Pack. A contribution to the community, with no code.',
                },
                {
                    id: 'client-potential',
                    anchor: 'app-client-potential',
                    line: `The page of the HiveMind model: you answer ${projects['client-potential'].questions} questions, and the model predicts whether the company is a potential client.`,
                },
                {
                    id: 'legacy',
                    anchor: 'app-legacy',
                    line: `${legacy.folders} projects from my Glitch years: Discord bots in Node.js with Discord.js and SQLite, small Express sites with HTML and CSS, and one Minecraft server setup.`,
                },
            ],
        },
        more: ['More repositories are on my ', { text: 'GitHub profile', to: links.github }, '.'],
    },

    // ─── en.hobbies ─────────────────────────────────────────────────────────
    // "Hobbies" (the section id is still `more`): volunteering, hobbies, languages, future projects.
    // Numbers: `reddit`, `hobbies` and `languages` in contents.global.js.
    hobbies: {
        label: 'Hobbies',
        title: 'What I do for fun',
        lead: 'Outside of software engineering, I like performance engineering in PCs, in servers and under a car hood.',
        volunteering: {
            anchor: 'more-volunteering',
            title: 'Volunteering',
            value: reddit.people,
            line: 'Individuals helped on their builds',
            role: `Hardware and IT advisor @ Reddit (${reddit.start} – ${reddit.end})`,
            text: `I helped ${reddit.people} people to design and build their PCs for gaming and work, and some enthusiast builds and servers. That includes part choice, assembly, budget, troubleshooting and repairs for Windows, macOS and Linux.`,
            // The tags are reddit.communities in contents.global.js.
            tagsLabel: 'Communities',
            peek: {
                open: 'Peek',
                close: 'Unpeek',
                text: 'It was before AI assistants, so each answer came from research, benchmarks and my own builds.',
            },
        },
        list: {
            anchor: 'more-hobbies',
            title: 'Some of my hobbies',
            items: [
                {
                    id: 'ecu',
                    name: 'Car ECU tuning',
                    text: [
                        'I study the engine control units and the tuning of 1990 to 2002 Honda Civics. I have an open archive under my second GitHub account: ',
                        { text: 'open-civic', to: links.carRepo },
                        '.',
                    ],
                },
                {
                    id: 'pc',
                    name: 'PC hardware',
                    text: ['I build PCs, servers and homelabs.'],
                },
                {
                    id: 'gym',
                    name: 'Gym',
                    text: [`I've been training consistently for ${hobbies.gym.years} years (${hobbies.gym.workouts} workouts, and my longest streak is ${hobbies.gym.streakWeeks} weeks), with a focus on strength. My bench press PR is ${hobbies.gym.bench}, my deadlift PR is ${hobbies.gym.deadlift}, and I can row ${hobbies.gym.row} with each hand.`],
                },
                {
                    id: 'basketball',
                    name: 'Basketball',
                    text: [`I've been playing for ${hobbies.basketball.years} year, usually on weekends with friends.`],
                },
                {
                    id: 'chess',
                    name: 'Chess',
                    text: [`I have played for ${hobbies.chess.years} years and my rating was above ${hobbies.chess.rating} Elo. I once beat ${hobbies.chess.bot}, a ${hobbies.chess.site} bot rated ${hobbies.chess.botRating} Elo.`],
                },
            ],
        },
        languages: {
            anchor: 'more-languages',
            title: 'Languages',
            // Same order as `languages` in contents.global.js (the code is there).
            items: [
                { name: 'Portuguese', level: 'Native' },
                { name: 'English', study: `${languages[1].studyYears} years of study`, level: 'C1' },
                { name: 'Spanish', study: `${languages[2].studyYears} years of study`, level: 'Basic' },
            ],
        },
        // Shown in full, with no disclosure.
        future: {
            anchor: 'more-future',
            title: 'Future projects',
            items: [
                {
                    id: 'burnrate',
                    name: 'BurnRate',
                    text: 'A finance tracking application for small developers. It unifies all development costs (cloud, tools, subscriptions, AI, PAYG and more) in a single dashboard, with ML-powered cost prediction.',
                },
                {
                    id: 'pocket-k3',
                    name: 'Pocket K3',
                    text: 'A 2.7T-parameter model with MXFP4 quantization that runs off 50 GB of unified GPU memory (M1 Max) and minimal SSD streaming (300-600 GB at 7 Gbps), with advanced caching algorithms, a VQ-VAE tokenizer and the NCM (Next-Concept Modeling) generation framework.',
                },
                {
                    id: 'llm-lens',
                    name: 'LLM lens',
                    text: 'A telemetry platform to orchestrate local AI models that run on a single machine. It runs on Docker, paired with LiteLLM.',
                },
            ],
        },
    },

    // ─── en.figma ───────────────────────────────────────────────────────────
    // The row "From my Figma" of original diagrams. Files, sizes and places: `figma`
    // in contents.global.js (same ids).
    figma: {
        title: 'From my Figma',
        lead: 'The drawings I made while I designed these systems.',
        open: 'Open the diagram at full size',
        close: 'Close the diagram',
        items: {
            'consignado-aks': {
                title: 'Consignado API on AKS, first version',
                caption: 'My first drawing of the Kubernetes host of Consignado Cloud: a load balancer, one service, two pods and PostgreSQL over TLS. The live platform now has a gateway and an internal load balancer in front.',
                alt: 'Architecture diagram. A user sends HTTP to a load balancer that accepts only allowed IP addresses. The load balancer sends the request to the service consignado-api in an AKS cluster with 2 to 3 pods. Two Spring Boot pods connect to Azure PostgreSQL over TLS. Dashed lines go from the cluster to ACR, Key Vault and Entra ID, which are used only when a pod starts. Logs and metrics go to Azure Monitor.',
            },
            'consignado-pod-start': {
                title: 'How a pod starts with no stored secret',
                caption: 'Seven steps, from the schedule of the pod to its first traffic. The pink lines are trust with no stored secret.',
                alt: 'Diagram of seven steps in a line. 1: AKS schedules the pod on the node. 2: the kubelet pulls the image from ACR. 3: the service account token becomes an Azure token at Entra ID, by workload identity. 4: the CSI driver reads the database password from Key Vault. 5: the Spring Boot container starts with the password. 6: Flyway migrates Azure PostgreSQL over TLS and readiness is up. 7: the pod is ready and the Service sends traffic to it.',
            },
            'ruph-ship': {
                title: 'How Ruph ships',
                caption: 'A change on GitHub triggers the automatic tests and a build. The build goes to QA and then to PROD. GitHub signs in with no stored key (WIF), and a rollback is one click.',
                alt: 'Flow diagram with the title "How we ship". GitHub triggers automatic tests, which lead to a build of the app in a container. The build is deployed to QA, where it is checked first, and then promoted to PROD. A dashed line from the build goes to a box "No stored keys: GitHub proves who it is (WIF)". A dashed line from PROD goes to "One-click rollback". A note says that nothing reaches PROD without passing tests and QA.',
            },
        },
    },

    // ─── en.contact ─────────────────────────────────────────────────────────
    // "Contact" at the end of the page. The address: links.email. Then one row:
    // LinkedIn, "Go back to the top", GitHub (handles: links.linkedinHandle, links.githubHandle).
    contact: {
        label: 'Contact',
        title: 'Ask me about a system, a bug or a role',
        lead: [
            'I can answer in English or Portuguese.',
            'Tell me about the system, the team and the issue, and I will tell you how I can help.',
        ],
        emailCta: 'E-mail me',
        copy: 'Copy the address',
        copied: 'Address copied',
        linkedin: 'LinkedIn',
        top: 'Go back to the top',
        github: 'GitHub',
    },

    // ─── en.footer ──────────────────────────────────────────────────────────
    // Three parts. Left: "© <year> " + credit (the year is the build year, not typed here).
    // Centre: top (goes to links.main). Right: source (goes to links.repo) with the GitHub mark.
    footer: {
        credit: `${links.domain}. Built by ${person.name}.`,
        top: 'Back to the top',
        source: 'Source code of this website',
        githubMark: 'GitHub',
    },

    // ─── en.controls ────────────────────────────────────────────────────────
    // Names of the controls that are not part of one section (screen readers, buttons).
    controls: {
        external: 'opens in a new tab',
        // The badge of the hero. With no music file it only turns.
        playBadge: 'Turn the badge',
        stopBadge: 'Stop the badge',
        spinBadge: 'Hold and turn the badge',
        // Disclosure: long text opens in place.
        readMore: 'Read the full story',
        readLess: 'Show less',
        pauseDrawing: 'Pause the drawing',
        playDrawing: 'Play the drawing',
    },

    // ─── en.player ──────────────────────────────────────────────────────────
    // The music player of the badge and the scroll ruler (defined at the top of this file).
    player,
    rulers,

    // ─── en.art ─────────────────────────────────────────────────────────────
    // Drawings that are not in the introduction (labels for screen readers, names on the drawing).
    art: {
        fuelMap: {
            label: 'Drawing of the fuel map of an engine control unit: a surface over a grid of engine speed and load. A red point shows the cell in use during one pull through the gears.',
            rpm: 'RPM',
            load: 'Load',
        },
    },

    // ─── en.notFound ────────────────────────────────────────────────────────
    // The 404 page (scripts/build-404.mjs writes it at build).
    notFound: {
        title: 'This page does not exist',
        text: 'The address is wrong, or the page moved. The portfolio is one page, and it starts here:',
        cta: 'Open the portfolio',
    },

    // ─── en.noscript ────────────────────────────────────────────────────────
    // The text for a browser with no JavaScript (index.html).
    noscript: 'This page needs JavaScript to show the experience and the projects.',
};
