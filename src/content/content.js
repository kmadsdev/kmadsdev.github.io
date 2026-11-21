// CONTENT: all the text and all the addresses of this site, in one file.
//
// HOW TO EDIT
//   Find a text      Search this file for words that you see on the page.
//   A sentence       Change it in PART 3 (English) and in PART 4 (Portuguese).
//   A link target    Change the address in PART 1 (links). Every button and link reads it there.
//   A number         Change it in PART 2 (facts). Both languages show the new value.
//   ${...}           Text in `backticks` can print a fact, for example ${picpay.name}.
//                    Keep the ${...} part when you change the words around it.
//   Then run         npm test. It fails when PART 3 and PART 4 do not have the same keys,
//                    when a link points to an anchor that does not exist, or when a
//                    text breaks a writing rule.
//
// CONTENTS
//   PART 1  links    profiles, live applications, repositories, documents, pictures, clips
//   PART 2  facts    numbers, dates, names, stacks, list orders, drawing data
//   PART 3  en       English text, in the order of the page:
//                    meta, nav, hero, intro, experience, cases, education, applications,
//                    more, figma, contact, footer, controls, art, notFound
//   PART 4  pt       Portuguese text: the same keys in the same order
//   To jump to a section, search for "en.hero", "pt.hero" (or any other key name).
//
// OTHER PLACES
//   index.html       Vite writes its title, description, link preview tags and
//                    <noscript> text from this file (vite.config.js, scripts/index-html.mjs).
//   public/sitemap.xml and public/robots.txt hold the site address by hand.
//                    Change them too when the address changes.
//
// HELPERS (code, not text)
//   link(text, to)   a link inside a paragraph (rich.js)
//   period(), years(), monthYear(), duration(), br()
//                    dates, times and numbers in the right form (format.js)
import { link } from './rich.js';
import { duration, monthYear, period, ptNumber as br, years } from './format.js';

// =============================================================================
// PART 1 · LINKS
// Every address of the site: profiles, live applications, source repositories,
// documents, pictures and clips, and the in-page addresses of the fixed controls.
// To change where a button or a link goes, change its address here.
// =============================================================================

const SITE = 'https://kmads.dev';
const GITHUB = 'https://github.com/kmadsdev';
const SOURCE_CODE = `${GITHUB}/kmadsdev.github.io`

export const links = {
    // This site
    site: SITE,
    domain: 'kmads.dev',
    home: '/',
    // The address /projects opens this page at the section with this id.
    cvPath: '/cv',
    projectsPath: '/projects',
    projectsSection: 'applications',
    siteRepo: `${SOURCE_CODE}`,
    siteWorkflow: `${SOURCE_CODE}/blob/main/.github/workflows/deploy.yml`,
    ogImage: `${SITE}/og.png`,
    favicon: '/assets/favicon.png',

    // In-page addresses of the fixed controls: the wordmark, the skip link, "Back to the top".
    // Each section link of the menu goes to '#' + its id (en.nav.items).
    // Links inside the text go to '#' + an id of facts.anchors.
    top: '#top',
    main: '#main',

    // Profiles and contact. A handle is the text shown for its address.
    email: 'contact@kmads.dev',
    github: GITHUB,
    githubHandle: 'kmadsdev',
    linkedin: 'https://linkedin.com/in/kaique-souza-kmads',
    linkedinHandle: 'kaique-souza-kmads',
    carGithub: 'https://github.com/ej8civic',
    carGithubHandle: 'ej8civic',
    carRepo: 'https://github.com/ej8civic/open-civic',

    // Live applications
    consignadoLive: 'https://consignado.kmads.dev',
    ruphLive: 'https://ruph.kmads.dev/',
    diabetesLive: `${SITE}/diabetes-indicator`,
    notesLive: `${SITE}/notes`,
    offmodeLive: `${SITE}/offmode`,
    doomLive: `${SITE}/doom`,
    agenticLive: `${SITE}/agentic`,
    customSquareLive: `${SITE}/custom-square`,
    trocatineLive: `${SITE}/trocatine`,

    // Source repositories
    consignadoApiRepo: `${GITHUB}/consignado-api`,
    consignadoServerlessRepo: `${GITHUB}/consignado-serverless`,
    consignadoFrontRepo: `${GITHUB}/consignado-front`,
    hivemindRepo: `${GITHUB}/hivemind-ml-api`,
    diabetesRepo: `${GITHUB}/diabetes-indicator-backend`,
    notesRepo: `${GITHUB}/notes`,
    doomRepo: `${GITHUB}/doom`,
    customSquareRepo: `${GITHUB}/custom-square`,
    trocatineRepo: `${GITHUB}/trocatine`,
    creditCardEngineRepo: `${GITHUB}/credit-card-engine`,
    paymentGatewayRepo: `${GITHUB}/simple-payment-gateway`,
    devopsChallengeRepo: `${GITHUB}/devops-challenge`,
    incidentApiRepo: `${GITHUB}/software-engineer-challenge-2`,
    legacyRepo: `${GITHUB}/glitch-legacy-projects`,
    studentToolsRepo: `${GITHUB}/engineer-student-tools`,

    // Documents
    consignadoDocsPlatform: `${GITHUB}/consignado-api/blob/main/docs/platform/README.md`,
    consignadoDocsArchitecture: `${GITHUB}/consignado-api/blob/main/docs/platform/architecture.md`,
    consignadoDocsDecisions: `${GITHUB}/consignado-api/blob/main/docs/platform/decisions.md`,
    consignadoAdrs: `${GITHUB}/consignado-api/tree/main/docs/adr`,
    consignadoWorkflow: `${GITHUB}/consignado-api/blob/main/.github/workflows/ci.yml`,
    notesRoadmap: `${GITHUB}/notes#roadmap`,

    // Pictures (files in public/assets/)
    photo: '/assets/me/kmads-portrait-1280.webp',
    photoSmall: '/assets/me/kmads-portrait-640.webp',
    badgeRing: '/assets/kmads-badge-ring.svg',
    badgeGlobe: '/assets/kmads-badge-globe.svg',
    sunset1440: '/assets/outro-sunset-1440.webp',
    sunset2880: '/assets/outro-sunset-2880.webp',
    figmaConsignadoAks: '/assets/figma/consignado-aks-flow.webp',
    figmaConsignadoAksThumb: '/assets/figma/consignado-aks-flow-thumb.webp',
    figmaConsignadoPodStart: '/assets/figma/consignado-pod-start.webp',
    figmaConsignadoPodStartThumb: '/assets/figma/consignado-pod-start-thumb.webp',
    figmaRuphShip: '/assets/figma/ruph-how-we-ship.webp',
    figmaRuphShipThumb: '/assets/figma/ruph-how-we-ship-thumb.webp',
    figmaDevopsChallenge: '/assets/figma/devops-challenge.webp',
    figmaDevopsChallengeThumb: '/assets/figma/devops-challenge-thumb.webp',

    // Clips of the applications and their poster pictures (files in public/assets/projects/)
    consignadoVideo: '/assets/projects/consignado-cloud.mp4',
    consignadoImage: '/assets/projects/consignado-cloud.jpg',
    consignadoLifecycleVideo: '/assets/projects/consignado-lifecycle.mp4',
    consignadoLifecycleImage: '/assets/projects/consignado-lifecycle.jpg',
    consignadoApiVideo: '/assets/projects/consignado-api.mp4',
    consignadoApiImage: '/assets/projects/consignado-api.jpg',
    consignadoStill1: '/assets/projects/consignado-cloud-1.webp',
    consignadoStill2: '/assets/projects/consignado-cloud-2.webp',
    consignadoStill3: '/assets/projects/consignado-cloud-3.webp',
    diabetesVideo: '/assets/projects/diabetes-indicator.mp4',
    diabetesImage: '/assets/projects/diabetes-indicator.jpg',
    notesVideo: '/assets/projects/notes.mp4',
    notesImage: '/assets/projects/notes.jpg',
    offmodeVideo: '/assets/projects/offmode.mp4',
    offmodeImage: '/assets/projects/offmode.jpg',
    doomVideo: '/assets/projects/doom.mp4',
    doomImage: '/assets/projects/doom.jpg',
    agenticVideo: '/assets/projects/agentic.mp4',
    agenticImage: '/assets/projects/agentic.jpg',
    customSquareVideo: '/assets/projects/custom-square.mp4',
    customSquareImage: '/assets/projects/custom-square.jpg',
    trocatineVideo: '/assets/projects/trocatine.mp4',
    trocatineImage: '/assets/projects/trocatine.jpg',
    creditCardEngineVideo: '/assets/projects/credit-card-engine.mp4',
    creditCardEngineImage: '/assets/projects/credit-card-engine.jpg',
    paymentGatewayVideo: '/assets/projects/payment-gateway.mp4',
    paymentGatewayImage: '/assets/projects/payment-gateway.jpg',
    devopsChallengeVideo: '/assets/projects/devops-challenge.mp4',
    devopsChallengeImage: '/assets/projects/devops-challenge.jpg',
};

// =============================================================================
// PART 2 · FACTS
// Numbers, dates, names, stacks, the order of each list and the data of the drawings.
// Both languages read these. Change a fact here and it changes in English and in
// Portuguese. Addresses come from PART 1.
//
// Rules for a new fact:
//   1. Kmads gave the number, or a public repository or page shows it. No guesses.
//   2. PicPay cards work: words only ("millions of requests"). No exact count.
//   3. ArgoCD, Tekton and SQS: in the PicPay context only.
//   4. Azure and Kubernetes belong to Consignado Cloud, my own project. Never "at work".
//   5. Number text is written the English way ('8.8M', '2,200'). PART 4 uses br().
// =============================================================================

// Order of the applications section. Each id is a key of facts.projects.
const appOrder = {
    // In production, sorted for a backend, architecture and cloud reader.
    live: ['consignado', 'ruph', 'diabetes', 'offmode', 'notes', 'doom', 'agentic', 'custom-square', 'trocatine'],
    // Study projects and repositories. Not hosted.
    study: ['credit-card-engine', 'payment-gateway', 'devops-challenge', 'incident-api', 'legacy', 'student-tools'],
    // These get an "architecture and goals" block.
    featured: ['consignado', 'ruph', 'diabetes'],
};

// Case files with a flowchart (Flow.jsx and tests/flow.test.js read this list).
const caseOrder = ['bodyshop', 'survey', 'oracle', 'hivemind', 'ruph'];
// All case files, in the order of `cases.items` in PART 3 and PART 4. `cards` is words only.
const caseFileOrder = ['cards', ...caseOrder];

// Order of the chapters of the introduction.
const chapterOrder = ['architecture', 'backend', 'cloud', 'cicd', 'fullstack', 'finance', 'ai', 'endtoend'];

export const facts = {
    person: {
        name: 'Kaique Souza',
        alias: 'Kmads',
        aliasUpper: 'KMADS',
        // The wordmark at the top left: one line of text per item.
        wordmark: ['KMA', 'DS'],
        codingSince: 2018,
        yearsEngineering: 3,
        yearsInTech: 8,
        city: 'São Paulo',
        state: 'SP',
        utc: 'UTC-3',
        timeZone: 'America/Sao_Paulo',
        // The one photo of him on the site: the opening block of the introduction.
        // The intro agent makes the files. Alt text: intro.opening.photo.alt.
        photo: {
            src: links.photo,
            small: links.photoSmall,
            width: 1280,
            height: 1280,
        },
    },

    site: {
        url: links.site,
        domain: links.domain,
        repo: links.siteRepo,
        workflow: links.siteWorkflow,
        applications: `${links.site}${links.projectsPath}`,
        ogImage: links.ogImage,
        // Cloudflare numbers, from the CV of 2026-11-13.
        monthlyVisitors: '4k',
        requests: '350k',
    },

    contact: {
        email: links.email,
        github: links.github,
        githubHandle: links.githubHandle,
        linkedin: links.linkedin,
        linkedinHandle: links.linkedinHandle,
        // The account for car work. Named on his LinkedIn profile.
        carGithub: links.carGithub,
        carGithubHandle: links.carGithubHandle,
        carRepo: links.carRepo,
    },

    picpay: {
        name: 'PicPay',
        registeredUsers: '70M',
        activeUsers: '39M+',
        fullTime: { start: '2025-12', end: null },
        partTime: { start: '2025-03', end: '2025-11' },
        // Tool names from his LinkedIn profile. PicPay context only.
        delivery: ['GitHub', 'ArgoCD', 'Tekton'],
        cards: {
            microservices: '10+',
            legacySystems: 4,
        },
        bodyshop: {
            name: 'BodyShop',
            customers: '8.8M',
            engineersLed: 6,
            teamSize: 7,
            services: 2,
            approvalRate: '99.9%',
            endToEnd: '15 s',
            curationVariants: 3,
        },
        survey: {
            name: 'Project Survey',
            employees: '7,000',
            teamSize: 7,
        },
        oracle: {
            viewLines: '10k+',
            // His LinkedIn profile, 2026-11-18.
            tables: '200+',
            speedupMin: 2,
            speedupMax: 5,
        },
    },

    startups: {
        start: '2024-01',
        end: '2025-12',
        hivemind: {
            name: 'HiveMind',
            year: 2025,
            developersLed: 8,
            trainingAccuracy: '97%',
            modelBefore: '700 MB',
            modelAfter: '1.2 KB',
            storageSaving: '99.99%',
            rating: '4.99/5',
            visitors: '2,200',
        },
        trocatine: {
            name: 'TrocaTine',
            year: 2024,
            frontendTeam: 2,
            // The MVP (the product). Not the landing page: that one is facts.projects.trocatine.
            mvpStack: ['React', 'Tailwind CSS', 'Java', 'Jakarta EE', 'JSP', 'JDBC', 'Apache Tomcat', 'PostgreSQL'],
            rating: '4.96/5',
            visitors: '2,000',
        },
    },

    // Given by Kmads on 2026-11-18. A hobby gets one short line: a mention, not a claim to build on.
    hobbies: {
        gym: { years: 3, bench: '110 kg', deadlift: '120 kg' },
        basketball: { years: 1 },
        chess: { years: 3, rating: '1600', bot: 'Komodo21', botRating: '2500', site: 'chess.com' },
    },

    earlier: {
        // His LinkedIn profile: bots, webhooks, Minescord, Glitch and Discloud.
        discord: {
            start: 2018,
            end: 2023,
            members: '10k',
            bridge: 'Minescord',
            stack: ['JavaScript', 'Node.js', 'Discord.js', 'Java', 'SQLite', 'MySQL'],
        },
        reddit: {
            start: 2022,
            end: 2024,
            people: '250+',
            communities: ['r/buildapc', 'r/pcmasterrace', 'r/computers'],
        },
    },

    // Repository kmadsdev/glitch-legacy-projects, read with the GitHub API on 2026-11-18.
    // 24 project folders. The repository says "between 2018-2022".
    // The dates in the folder names start at 2021-07-06 (export dates).
    legacy: {
        repo: links.legacyRepo,
        folders: 24,
        from: 2018,
        to: 2022,
    },

    education: {
        institution: 'Instituto J&F',
        start: '2024-01',
        end: '2026-12',
        years: 3,
        certificates: [
            { id: 'software-engineer', issuer: 'HackerRank', date: '2025-10' },
            { id: 'rest-api', issuer: 'HackerRank', date: '2025-10' },
            { id: 'sql', issuer: 'HackerRank', date: '2025-10' },
        ],
    },

    // Consignado Cloud. Sources: the READMEs of the three repositories, the platform
    // documents in consignado-api/docs/platform, and the live site consignado.kmads.dev.
    // Times were measured live on 2026-11-17.
    consignado: {
        name: 'Consignado Cloud',
        live: links.consignadoLive,
        liveSince: '2026-11-17',
        repos: {
            api: links.consignadoApiRepo,
            front: links.consignadoFrontRepo,
            serverless: links.consignadoServerlessRepo,
        },
        docs: {
            platform: links.consignadoDocsPlatform,
            architecture: links.consignadoDocsArchitecture,
            decisions: links.consignadoDocsDecisions,
            adrs: links.consignadoAdrs,
            workflow: links.consignadoWorkflow,
        },
        adrs: 13,
        // Counts from the CI output on main of 2026-11-18 ("Tests run"):
        // consignado-api 224 + 59 = 283 (run 44404217738), gateway 180 (run 44398266451).
        // The coverage gate is in the README of consignado-api.
        tests: { api: 283, gateway: 180, coverageGate: '80%', measured: '2026-11-18' },
        hosts: 2,
        serverless: { coldMin: '18.6', coldMax: '18.9', warmMin: '0.25', warmMax: '0.9', instances: 1 },
        cluster: {
            node: 'Standard_D2as_v4',
            nodes: 1,
            pods: 2,
            podsMax: 3,
            warm: '0.76',
            // 266 + 133 + 26 + 8 = 433 s = 7 min 13 s.
            coldStartSeconds: 433,
            readyWhenRunning: '2',
            nodePerHour: 'US$0.104',
            nodePerMonth: 'US$76',
        },
        window: { minutes: 15, perAccount: 3, perDay: 12, cost: 'US$0.04', coolDownMinutes: 15 },
        // The budget is set in BRL. The live site says "R$ 330 (about US$60)".
        budget: 'R$ 330',
        budgetUsd: 'US$60',
        rateLimit: { requests: 40, seconds: 10 },
        database: {
            engine: 'PostgreSQL 16',
            size: 'B1ms',
            region: 'North Central US',
            hostsRegion: 'Belgium Central',
            activateSeconds: '4.5',
        },
        data: { agreements: 4, customers: 50, simulations: 60, contracts: 30 },
        contractStates: 7,
        statusPairs: 49,
    },

    // Every anchor id that a section must render. A link `to: '#id'` in the
    // content must be in this list (tests/content.test.js checks it).
    anchors: {
        sections: ['top', 'intro', 'experience', 'education', 'applications', 'more', 'contact'],
        intro: chapterOrder.map((id) => `intro-${id}`),
        experience: ['exp-picpay', 'exp-cofounder', 'exp-discord', ...caseFileOrder.filter((id) => id !== 'ruph').map((id) => `case-${id}`)],
        education: ['edu-jf', 'edu-certs'],
        applications: [
            'applications-live',
            'applications-study',
            ...appOrder.live.map((id) => `app-${id}`),
            ...appOrder.study.map((id) => `app-${id}`),
        ],
        more: ['more-volunteering', 'more-languages', 'more-hobbies', 'more-future'],
    },

    chapterOrder,
    caseOrder,
    caseFileOrder,
    appOrder,

    // Case files. `flow` feeds Flow.jsx: nodes, and edges in the order of the steps.
    // `flow: null` means words only, no chart.
    cases: {
        cards: {
            stack: ['Java', 'Spring Boot', 'JPA', 'Go'],
            flow: null,
        },
        bodyshop: {
            stack: ['Go', 'Gin', 'MongoDB', 'Amazon S3', 'Amazon SQS', 'CloudFront', 'React', 'Vite', 'ArgoCD'],
            flow: {
                nodes: ['app', 'api', 'registry', 'model', 'storage', 'cdn', 'curation'],
                edges: [
                    ['app', 'api'], ['api', 'registry'], ['api', 'storage'], ['api', 'model'],
                    ['model', 'storage'], ['cdn', 'app'], ['curation', 'api'], ['api', 'model'], ['curation', 'storage'],
                ],
            },
        },
        survey: {
            stack: ['PHP', 'Hyperf', 'Angular', 'MySQL', 'Redis', 'CloudFront', 'AWS'],
            flow: {
                nodes: ['people', 'cdn', 'web', 'api', 'cache', 'db'],
                edges: [['people', 'cdn'], ['cdn', 'web'], ['web', 'api'], ['api', 'cache'], ['api', 'db']],
            },
        },
        oracle: {
            stack: ['Oracle SQL', 'Oracle Cloud HCM', 'OTBI'],
            flow: {
                nodes: ['hcm', 'map', 'queries', 'views', 'design', 'science'],
                edges: [['hcm', 'map'], ['map', 'queries'], ['views', 'design'], ['map', 'science']],
            },
        },
        hivemind: {
            stack: ['Python', 'FastAPI', 'scikit-learn', 'Pandas', 'Amazon S3', 'PostgreSQL', 'MongoDB', 'Redis'],
            flow: {
                nodes: ['train', 'bucket', 'api', 'client'],
                edges: [['train', 'bucket'], ['bucket', 'api'], ['client', 'api'], ['api', 'client']],
            },
            links: [{ label: 'hivemind-ml-api', url: links.hivemindRepo }],
        },
        // Shown in the applications section (app-ruph), with the same chart component.
        ruph: {
            stack: ['TypeScript', 'Hono', 'React', 'PostgreSQL', 'Cloud Run', 'Cloud SQL', 'Secret Manager', 'Terraform', 'GitHub Actions'],
            flow: {
                nodes: ['agent', 'human', 'api', 'ledger', 'providers', 'ci'],
                edges: [['agent', 'api'], ['human', 'api'], ['api', 'ledger'], ['api', 'providers'], ['ci', 'api']],
            },
            entries: 4,
            providers: 5,
            links: [{ label: 'ruph.kmads.dev', url: links.ruphLive }],
        },
    },

    // Applications and repositories. `status` is 'live' or 'study'.
    // `live` and `source` are links. `sources` is a list when one app has several repositories.
    // `image` is the poster of `video`. An entry with no `video` has no clip.
    projects: {
        consignado: {
            name: 'Consignado Cloud',
            status: 'live',
            stack: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL 16', 'AKS', 'Azure Functions', 'Blob Storage', 'Key Vault', 'Entra ID', 'Terraform', 'Cloudflare Workers', 'React', 'GitHub Actions'],
            live: links.consignadoLive,
            sources: [
                { label: 'consignado-api', url: links.consignadoApiRepo },
                { label: 'consignado-serverless', url: links.consignadoServerlessRepo },
                { label: 'consignado-front', url: links.consignadoFrontRepo },
            ],
            // Main clip: the loan preview with the live request diagram (recorded as a guest).
            image: links.consignadoImage,
            video: links.consignadoVideo,
            // More media, in this order. Captions and alt text: applications.live.items[0].media
            // in PART 3 and PART 4 (same ids). The coordinator removes the id of a file that is absent.
            media: [
                { id: 'preview', kind: 'clip', video: links.consignadoVideo, image: links.consignadoImage },
                { id: 'lifecycle', kind: 'clip', video: links.consignadoLifecycleVideo, image: links.consignadoLifecycleImage },
                { id: 'api', kind: 'clip', video: links.consignadoApiVideo, image: links.consignadoApiImage },
                { id: 'still-1', kind: 'still', image: links.consignadoStill1 },
                { id: 'still-2', kind: 'still', image: links.consignadoStill2 },
                { id: 'still-3', kind: 'still', image: links.consignadoStill3 },
            ],
        },
        ruph: {
            name: 'Ruph',
            status: 'live',
            stack: ['TypeScript', 'Hono', 'React', 'PostgreSQL', 'Cloud Run', 'Cloud SQL', 'Secret Manager', 'Terraform', 'GitHub Actions'],
            live: links.ruphLive,
            access: 'private',
        },
        diabetes: {
            name: 'Diabetes Indicator',
            status: 'live',
            stack: ['Python', 'FastAPI', 'scikit-learn', 'Pandas'],
            inputs: 17,
            endpoints: 4,
            live: links.diabetesLive,
            source: links.diabetesRepo,
            image: links.diabetesImage,
            video: links.diabetesVideo,
        },
        notes: {
            name: 'Notes',
            status: 'live',
            stack: ['Monaco', 'File System Access API', 'JavaScript'],
            languages: '80+',
            previews: 9,
            live: links.notesLive,
            source: links.notesRepo,
            image: links.notesImage,
            video: links.notesVideo,
        },
        offmode: {
            name: 'OffMode',
            status: 'live',
            stack: ['React', 'Python', 'FastAPI', 'Electron', 'Vercel'],
            live: links.offmodeLive,
            image: links.offmodeImage,
            video: links.offmodeVideo,
        },
        doom: {
            name: 'Doom, offline',
            status: 'live',
            stack: ['C', 'WebAssembly', 'JavaScript', 'gzip'],
            sizeBefore: '7 MB',
            sizeAfter: '4.4 MB',
            live: links.doomLive,
            source: links.doomRepo,
            image: links.doomImage,
            video: links.doomVideo,
        },
        agentic: {
            name: 'Agentic Template',
            status: 'live',
            stack: ['MCP', 'Skills', 'TDD', 'Claude Code', 'Codex'],
            live: links.agenticLive,
            image: links.agenticImage,
            video: links.agenticVideo,
        },
        'custom-square': {
            name: 'Custom Square',
            status: 'live',
            stack: ['JavaScript', 'CSS'],
            live: links.customSquareLive,
            source: links.customSquareRepo,
            image: links.customSquareImage,
            video: links.customSquareVideo,
        },
        trocatine: {
            // The landing page only: plain HTML, CSS and JavaScript (repository kmadsdev/trocatine).
            // The MVP stack is facts.startups.trocatine.mvpStack.
            name: 'TrocaTine landing page',
            status: 'live',
            stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
            live: links.trocatineLive,
            source: links.trocatineRepo,
            image: links.trocatineImage,
            video: links.trocatineVideo,
        },

        // Study projects with simulated data. No users, no real money.
        'credit-card-engine': {
            name: 'credit-card-engine',
            status: 'study',
            stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Testcontainers', 'ArchUnit', 'Docker', 'GitHub Actions'],
            variantCount: 4,
            variants: { base: 'R$2,000', platinum: 'R$8,000' },
            source: links.creditCardEngineRepo,
            image: links.creditCardEngineImage,
            video: links.creditCardEngineVideo,
        },
        'payment-gateway': {
            name: 'simple-payment-gateway',
            status: 'study',
            stack: ['Go', 'PostgreSQL', 'OpenAPI', 'Prometheus', 'Docker', 'GitHub Actions'],
            source: links.paymentGatewayRepo,
            image: links.paymentGatewayImage,
            video: links.paymentGatewayVideo,
        },
        'devops-challenge': {
            name: 'DevOps challenge',
            status: 'study',
            stack: ['Docker Compose', 'Python', 'Go', 'Node.js', 'Redis'],
            containers: 4,
            source: links.devopsChallengeRepo,
            image: links.devopsChallengeImage,
            video: links.devopsChallengeVideo,
        },
        'incident-api': {
            name: 'Incident alert API',
            status: 'study',
            stack: ['PHP', 'Hyperf', 'Swoole', 'MySQL', 'Redis', 'Docker', 'Python'],
            source: links.incidentApiRepo,
        },
        legacy: {
            name: 'glitch-legacy-projects',
            status: 'study',
            stack: ['JavaScript', 'Node.js', 'Discord.js', 'Express', 'HTML', 'CSS', 'SQLite'],
            source: links.legacyRepo,
        },
        'student-tools': {
            name: 'Engineer Student Tools',
            status: 'study',
            stack: ['Markdown'],
            source: links.studentToolsRepo,
        },
    },

    // Data of the drawings of the introduction. Labels are in PART 3 and PART 4
    // (intro.art). A number here has a source, or it is null.
    art: {
        // architecture: the request path of Consignado Cloud.
        // Source: consignado-api/docs/platform/architecture.md, diagrams a and b.
        requestPath: {
            nodes: ['browser', 'edge', 'site', 'gateway', 'function', 'balancer', 'pods', 'database'],
            // One label per edge, in this order.
            edges: [
                ['browser', 'edge'],
                ['edge', 'site'],
                ['edge', 'gateway'],
                ['gateway', 'function'],
                ['gateway', 'balancer'],
                ['balancer', 'pods'],
                ['function', 'database'],
                ['pods', 'database'],
            ],
            // Where each node runs.
            groups: {
                cloudflare: ['edge'],
                azure: ['site', 'gateway', 'function', 'balancer', 'pods', 'database'],
            },
        },

        // backend: two real requests through the gateway, serverless host.
        // `ms: null` = the trace of that call gave no time for the stage.
        trace: {
            // A signed-in write, warm. Live test of 2026-11-18.
            warm: {
                call: 'POST /api/v1/customers',
                status: 201,
                totalMs: 644,
                statements: { total: 3, select: 2, insert: 1 },
                stages: [
                    { id: 'request', ms: null },
                    { id: 'edge', ms: null },
                    { id: 'gateway', ms: null },
                    { id: 'identity', ms: null },
                    { id: 'keyvault', ms: null },
                    { id: 'host', ms: null },
                    { id: 'app', ms: null },
                    { id: 'database', ms: 339 },
                    { id: 'response', ms: null },
                ],
            },
            // The first call after idle time, a guest preview. Live test of 2026-11-17.
            cold: {
                call: 'POST /api/v1/simulations/preview',
                status: 200,
                totalMs: 18687,
                statements: null,
                stages: [
                    { id: 'request', ms: null },
                    { id: 'edge', ms: null },
                    { id: 'gateway', ms: null },
                    { id: 'keyvault', ms: null },
                    { id: 'coldStart', ms: 18600 },
                    { id: 'response', ms: null },
                ],
            },
        },

        // backend and finance: the contract state machine of consignado-api (its README).
        contractStates: {
            states: ['SIMULATED', 'PROPOSED', 'APPROVED', 'REJECTED', 'ACTIVE', 'SETTLED', 'CANCELLED'],
            initial: 'SIMULATED',
            terminal: ['REJECTED', 'SETTLED', 'CANCELLED'],
            // One label per transition id.
            transitions: [
                { id: 'propose', from: 'SIMULATED', target: 'PROPOSED' },
                { id: 'approve', from: 'PROPOSED', target: 'APPROVED' },
                { id: 'reject', from: 'PROPOSED', target: 'REJECTED' },
                { id: 'cancel', from: 'PROPOSED', target: 'CANCELLED' },
                { id: 'activate', from: 'APPROVED', target: 'ACTIVE' },
                { id: 'cancel', from: 'APPROVED', target: 'CANCELLED' },
                { id: 'settle', from: 'ACTIVE', target: 'SETTLED' },
                { id: 'cancel', from: 'ACTIVE', target: 'CANCELLED' },
            ],
        },

        // cloud: the services of each cloud. One label and one use per node id.
        clouds: {
            order: ['aws', 'gcp', 'azure'],
            aws: ['cloudfront', 's3', 'sqs', 'ec2', 'rds'],
            gcp: ['cloudRun', 'cloudSql', 'secretManager', 'iam', 'terraform', 'actions'],
            azure: ['aks', 'functions', 'blob', 'keyVault', 'postgres', 'entra', 'registry', 'tables'],
            // Services that talk: [from, to] node ids. Each pair is a sentence of the content:
            // aws    "S3 behind CloudFront", "a FastAPI service on EC2 that loads the newest model from S3"
            // gcp    "GitHub Actions deploys", "Secret Manager for the secrets", "Cloud Run for the API,
            //        Cloud SQL for the PostgreSQL ledger", "IAM: access rules, managed by Terraform"
            // azure  the edges of requestPath (gateway -> pods, both hosts -> database), plus
            //        "Secrets, mounted by the CSI driver", "Images tagged with the commit" and
            //        "Users, sessions and engine state of the gateway"
            edges: {
                aws: [['cloudfront', 's3'], ['s3', 'ec2']],
                gcp: [['actions', 'cloudRun'], ['secretManager', 'cloudRun'], ['cloudRun', 'cloudSql'], ['terraform', 'iam']],
                azure: [['functions', 'aks'], ['keyVault', 'aks'], ['registry', 'aks'], ['aks', 'postgres'], ['functions', 'postgres'], ['functions', 'tables']],
            },
        },

        // cloud: the measured start of the stopped AKS cluster (consignado-api README).
        coldStart: {
            totalSeconds: 433,
            parts: [
                { id: 'controlPlane', seconds: 266 },
                { id: 'node', seconds: 133 },
                { id: 'app', seconds: 26 },
                { id: 'balancer', seconds: 8 },
            ],
        },

        // cicd: the deploy job of consignado-api (ci.yml), in order.
        // Source: consignado-api README "Deployment" and architecture.md diagram g.
        pipeline: {
            url: links.consignadoWorkflow,
            stages: ['test', 'image', 'login', 'push', 'cluster', 'rollout', 'smoke'],
        },
        // cicd: the workflow of this site (.github/workflows/deploy.yml), in order.
        sitePipeline: {
            url: links.siteWorkflow,
            stages: ['test', 'build', 'browser', 'responsive', 'publish', 'verify'],
        },

        // fullstack: one label per id. `to` is the proof.
        timeline: [
            { year: 2018, id: 'bots', to: links.legacyRepo },
            { year: 2021, id: 'sites', to: links.legacyRepo },
            { year: 2024, id: 'trocatine', to: '#app-trocatine' },
            { year: 2025, id: 'work', to: '#case-bodyshop' },
            { year: 2026, id: 'consignado', to: '#app-consignado' },
        ],

        // finance: the margin check of consignado-api, with the example of its README.
        margin: {
            netSalary: 'R$ 4,200.00',
            capPercent: '35%',
            marginLimit: 'R$ 1,470.00',
            principal: 'R$ 15,000.00',
            termMonths: 84,
            monthlyRate: '1.85%',
            installment: 'R$ 353.24',
            largestInstallment: 'R$ 354.04',
            totalPayable: 'R$ 29,672.96',
            withinMargin: true,
            // The refused case of the same README: income cut to R$ 1,000.00.
            refused: { income: 'R$ 1,000.00', marginLimit: 'R$ 350.00', committed: 'R$ 353.24', status: 422 },
        },
    },

    // "From my Figma": the four originals that Kmads approved on 2026-11-18. No other
    // Figma picture is public. `width` and `height` are the pixels of the full picture.
    // `chapters` and `anchors` say where the row shows the picture.
    // Title, caption and alt text: `figma.items` in PART 3 and PART 4.
    figmaOrder: ['consignado-aks', 'consignado-pod-start', 'ruph-ship', 'devops-challenge'],
    figma: {
        'consignado-aks': {
            src: links.figmaConsignadoAks,
            thumb: links.figmaConsignadoAksThumb,
            width: 1310,
            height: 834,
            chapters: ['architecture', 'cloud'],
            anchors: ['app-consignado'],
        },
        'consignado-pod-start': {
            src: links.figmaConsignadoPodStart,
            thumb: links.figmaConsignadoPodStartThumb,
            width: 1512,
            height: 397,
            chapters: ['cloud'],
            anchors: ['app-consignado'],
        },
        'ruph-ship': {
            src: links.figmaRuphShip,
            thumb: links.figmaRuphShipThumb,
            width: 2040,
            height: 1400,
            chapters: ['cicd'],
            anchors: ['app-ruph'],
        },
        'devops-challenge': {
            src: links.figmaDevopsChallenge,
            thumb: links.figmaDevopsChallengeThumb,
            width: 516,
            height: 338,
            chapters: [],
            anchors: ['app-devops-challenge'],
        },
    },

    // Future projects: only items that a kmadsdev repository states as planned.
    // Text: more.future.items in PART 3 and PART 4 (same ids, same order).
    future: [
        // README of kmadsdev/notes, section "Roadmap".
        { id: 'notes', to: links.notesRoadmap },
        // README of kmadsdev/doom: MicroDOOM v1.1 is marked "WIP".
        { id: 'microdoom', to: links.doomRepo },
    ],

    // Reference marks of the board labels, as on a circuit board ("D3 · Request path").
    // One mark per tile kind. `art` also marks the drawings and the flowcharts.
    boardMarks: { claim: 'U', art: 'D', stat: 'TP', media: 'DS', list: 'RN', link: 'J' },

    // Skill names are the same in both languages.
    skills: {
        languages: ['Java', 'Go', 'Python', 'TypeScript', 'JavaScript', 'PHP', 'SQL'],
        backend: ['REST API design', 'System design', 'Microservices', 'Layered monoliths', 'Spring Boot', 'JPA', 'Gin', 'FastAPI', 'Hono', 'Hyperf', 'Jakarta EE'],
        data: ['PostgreSQL', 'MySQL', 'Oracle SQL', 'MongoDB', 'Redis', 'Pandas', 'scikit-learn'],
        cloud: ['AWS (EC2, S3, RDS, CloudFront, IAM)', 'GCP (Cloud Run, Cloud SQL, Secret Manager, IAM)', 'Azure (AKS, Functions, Blob Storage, Key Vault)', 'Cloudflare', 'Vercel', 'Docker', 'Terraform', 'GitHub Actions'],
        ai: ['MCP servers', 'Skills', 'Claude Code', 'Codex', 'Vitest', 'Playwright'],
    },

    // Tools of each chapter of the introduction. Names from `skills`, or from a public repository.
    chapterTools: {
        architecture: ['System design', 'REST API design', 'Layered monoliths', 'Microservices'],
        backend: ['Java', 'Spring Boot', 'JPA', 'Go', 'Gin', 'PHP', 'Hyperf', 'PostgreSQL', 'MySQL', 'Oracle SQL', 'MongoDB', 'Redis', 'Flyway', 'Testcontainers', 'ArchUnit'],
        cloud: ['AWS (EC2, S3, RDS, CloudFront, IAM)', 'GCP (Cloud Run, Cloud SQL, Secret Manager, IAM)', 'Azure (AKS, Functions, Blob Storage, Key Vault)', 'Cloudflare', 'Terraform', 'Docker'],
        cicd: ['GitHub Actions', 'Terraform', 'Docker', 'OIDC'],
        fullstack: ['JavaScript', 'TypeScript', 'React', 'Vite', 'Angular', 'Node.js', 'Express', 'HTML', 'CSS'],
        finance: ['Java', 'Spring Boot', 'Go', 'PostgreSQL'],
        ai: ['MCP servers', 'Skills', 'Claude Code', 'Codex', 'Vitest', 'Playwright'],
        endtoend: [],
    },
};

// =============================================================================
// SHORT NAMES
// Short names for the facts that the sentences of PART 3 and PART 4 read.
// Example: `${picpay.name}` in a sentence prints facts.picpay.name ("PicPay").
// =============================================================================

const { person, picpay, startups, earlier, consignado: c, site, legacy, art, education: edu, contact, hobbies } = facts;
const { bodyshop, survey, cards, oracle } = picpay;
const { hivemind, trocatine } = startups;
const { reddit } = earlier;
const p = facts.projects;
const card = p['credit-card-engine'];
const ruph = facts.cases.ruph;
// The margin example of the consignado-api README (chapter "finance").
const m = art.margin;
// The start of the stopped AKS cluster, as text: coldStart = '7 min 13 s', part.node = '2 min 13 s'.
const part = Object.fromEntries(art.coldStart.parts.map((item) => [item.id, duration(item.seconds)]));
const coldStart = duration(art.coldStart.totalSeconds);
const clusterStart = duration(c.cluster.coldStartSeconds);

// =============================================================================
// PART 3 · ENGLISH (en)
// Every sentence, label, button text, alt text and caption in English, in the
// order of the page. PART 4 has the same keys in the same order.
//
// Text inside `backticks` can show a fact: ${person.name}. Keep the ${...} part.
// A paragraph with links is a list: ['text ', link('link text', '#anchor'), '.'].
// =============================================================================

const en = {
    // ─── en.meta ────────────────────────────────────────────────────────────
    // Page title and description: the browser tab, link previews, search engines.
    // index.html gets them at build. noscript: the text for a browser with no JavaScript.
    meta: {
        htmlLang: 'en',
        ogLocale: 'en_US',
        title: `Kaique Souza - Software Engineer`,
        description: `Software Engineer, Backend, Architecture and Cloud in JavaScript, Python, Go, Java and SQL. Multicloud knowledge at AWS, GCP and Azure. Real practical technical experience since early 2018.`,
        noscript: 'This page needs JavaScript to show the experience and the projects.',
    },

    // ─── en.nav ─────────────────────────────────────────────────────────────
    // Top bar: skip link, wordmark, section menu, language switch.
    nav: {
        skip: 'Skip to content',
        home: 'Back to the top',
        menu: 'Sections',
        items: [
            { id: 'intro', label: 'Introduction' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'applications', label: 'Applications' },
            { id: 'more', label: 'More' },
            { id: 'contact', label: 'Contact' },
        ],
        open: 'Open the menu',
        close: 'Close the menu',
        language: 'Language',
        languages: { en: 'English', pt: 'Portuguese' },
        // The text on the two buttons of the language switch.
        codes: { en: 'EN', pt: 'PT' },
    },

    // ─── en.hero ────────────────────────────────────────────────────────────
    // First screen: name, role, a short summary, the location and four links (addresses: PART 1).
    hero: {
        name: person.name,
        alias: person.aliasUpper,
        role: 'Software Engineer',
        focus: 'Architecture & Cloud',
        summary: `I focus on backend, architecture and cloud, and most of all on reliability and performance. I have ${person.yearsEngineering} years of engineering experience and ${person.yearsInTech} years in tech, and today I work on the credit card engines of ${picpay.name}.`,
        location: [`${person.city}, ${person.state}, Brazil`, 'Remote', person.utc],
        localTime: 'Local time',
        links: [
            { id: 'applications', label: 'Curriculum', href: links.cvPath },
            { id: 'email', label: 'Email', href: `mailto:${links.email}` },
            { id: 'linkedin', label: 'LinkedIn', href: links.linkedin },
            { id: 'github', label: 'GitHub', href: links.github }
        ],
        scroll: 'Scroll',
    },

    // ─── en.intro ───────────────────────────────────────────────────────────
    // "Introduction": who I am and what I do. Each claim links to its proof lower on the page
    // or to a public repository. A tile holds one idea: a title of 6 words or less and a text
    // of 160 characters or less. Every tile has the same 8 keys: the unused ones are null.
    intro: {
        label: 'Introduction',
        title: 'I design, build and run backend systems, from the architecture to the first API call in prod.',
        lead: `${person.yearsEngineering} years of engineering experience and ${person.yearsInTech} years in tech, on systems that answer millions of requests at work and on platforms that I pay for myself.`,
        proofLabel: 'Proof',
        toolsLabel: 'Tools',
        sourceLabel: 'Source',

        opening: {
            label: 'Who I am',
            title: '👋 Hello, ',
            photo: { alt: ` < Nice ass photo here, showcasing the person YOU should hire > ` },
            paragraphs: [
                [`I am ${person.name}, and most people online call me ${person.alias}. As a software engineer in ${person.city}, I work on backend, architecture and cloud: the services and the data that a product runs on, and the infrastructure under them.`],
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
                    `Performance engineering is the part I like most. At work I made Oracle queries ${oracle.speedupMin} to ${oracle.speedupMax} times faster. On ${c.name} I `,
                    link('measured a cluster start in four parts', '#intro-cloud'),
                    `. I advised ${earlier.reddit.people} people on `,
                    link('PC builds', '#more-volunteering'),
                    ', and in my free time I study ',
                    link('the engine control units of old Honda Civics', '#more-hobbies'),
                    '.',
                ],
            ],
        },

        chaptersLabel: 'What I do',
        chapters: [
            {
                id: 'architecture',
                label: 'Architecture',
                poster: 'Trade-offs',
                headline: 'I ask what a design costs before I draw it.',
                lead: `On ${survey.name} the first question was how many services. On ${bodyshop.name} it was how many calls to a model, and on ${c.name} how many hosts.`,
                paragraphs: [
                    [
                        'On ',
                        link(survey.name, '#case-survey'),
                        `, at ${picpay.name}, the first plan was a set of microservices. I asked why. The answer was one product, one team of ${survey.teamSize} and one database, so the team built a layered monolith in PHP for a platform that serves about ${survey.employees} employees.`,
                    ],
                    [
                        `I led ${bodyshop.engineersLed} engineers on `,
                        link(bodyshop.name, '#case-bodyshop'),
                        `, a platform in QA that shows each customer a picture of their own car. We generate one image for each brand, model, year and color, keep it at a fixed S3 path, and ask a registry before we call any model. In the pilot, ${bodyshop.approvalRate} of the images passed approval at generation, in under ${bodyshop.endToEnd} from request to image. When staff replace a bad image, the new file takes the same path and the app needs no release.`,
                    ],
                    [
                        link(c.name, '#app-consignado'),
                        ' is my answer to a question I had about hosts: what does the same API cost on Kubernetes and on serverless? The same jar runs as pods on AKS and inside an Azure Function. One Java gateway stands in front of both, checks each token and returns a trace of each call. The ',
                        link('decision table', c.docs.decisions),
                        ' gives the trade-off of each choice and what a bank would do in its place, and ',
                        link(`${c.adrs} decision records`, c.docs.adrs),
                        ' hold the details.',
                    ],
                ],
                tiles: [
                    {
                        id: 'request-path',
                        kind: 'art',
                        title: 'One API, two hosts',
                        text: 'Browser, Cloudflare edge and one Java gateway. Then the same jar on Azure Functions and on AKS pods, with one PostgreSQL.',
                        value: null,
                        source: null,
                        art: 'requestPath',
                        to: null,
                    },
                    {
                        id: 'approval',
                        kind: 'stat',
                        title: 'Approved at generation',
                        text: `${bodyshop.name} pilot images that needed no manual curation, in under ${bodyshop.endToEnd} each.`,
                        value: bodyshop.approvalRate,
                        source: `${bodyshop.name} pilot at ${picpay.name}`,
                        art: null,
                        to: null,
                    },
                    {
                        id: 'monolith',
                        kind: 'stat',
                        title: 'Employees, one monolith',
                        text: `${survey.name} went from a microservices plan to one layered monolith after one question.`,
                        value: survey.employees,
                        source: `${survey.name} at ${picpay.name}`,
                        art: null,
                        to: null,
                    },
                    {
                        id: 'adrs',
                        kind: 'stat',
                        title: 'Decision records',
                        text: 'Layering, money and rounding, concurrency, the outbox, two hosts, the gateway, the edge, the budget.',
                        value: `${c.adrs}`,
                        source: 'consignado-api, folder docs/adr',
                        art: null,
                        to: null,
                    },
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
                    {
                        id: 'trace',
                        kind: 'art',
                        title: 'One request, stage by stage',
                        text: `A signed-in write took ${art.trace.warm.totalMs} ms at the gateway. The database used ${art.trace.warm.stages.find((s) => s.id === 'database').ms} ms of it, in ${art.trace.warm.statements.total} statements.`,
                        value: null,
                        source: null,
                        art: 'trace',
                        to: null,
                    },
                    {
                        id: 'states',
                        kind: 'art',
                        title: 'The contract state machine',
                        text: 'One transition table. Approval checks the margin again. Activation writes the installment schedule.',
                        value: null,
                        source: null,
                        art: 'contractStates',
                        to: null,
                    },
                    {
                        id: 'tests',
                        kind: 'stat',
                        title: 'Tests in consignado-api',
                        text: `Unit, web slice, repository, integration and architecture tests. The build fails below ${c.tests.coverageGate} line coverage.`,
                        value: `${c.tests.api}`,
                        source: 'CI run of consignado-api on main, 2026-11-18',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'oracle',
                        kind: 'stat',
                        title: 'Times faster, Oracle queries',
                        text: `${oracle.tables} tables and views at ${picpay.name}. Queries went from thousands of lines to hundreds.`,
                        value: `${oracle.speedupMin} to ${oracle.speedupMax}`,
                        source: `My LinkedIn profile, ${picpay.name} entry`,
                        art: null,
                        to: null,
                    },
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
                headline: 'I pick a cloud service by what it does and what it costs per hour.',
                lead: `One real integration on each cloud: AWS at ${picpay.name} and in a startup MVP, GCP for my own platform, Azure for ${c.name}.`,
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
                        `, my own platform, runs on GCP: Cloud Run for the API, Cloud SQL for the PostgreSQL ledger, Secret Manager for the secrets, and Terraform for the access rules. GitHub Actions deploys a new version only after the tests and the health checks pass.`,
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
                    {
                        id: 'clouds',
                        kind: 'art',
                        title: 'Three clouds, by service',
                        text: `AWS at ${picpay.name} and in ${hivemind.name}. GCP for Ruph, my own platform. Azure for ${c.name}.`,
                        value: null,
                        source: null,
                        art: 'clouds',
                        to: null,
                    },
                    {
                        id: 'cold-start',
                        kind: 'art',
                        title: 'A cold start in four parts',
                        text: `Control plane ${part.controlPlane}, node ${part.node}, Spring Boot and database ${part.app}, load balancer ${part.balancer}.`,
                        value: coldStart,
                        source: 'consignado-api README, measured on 2026-11-17',
                        art: 'coldStart',
                        to: null,
                    },
                    {
                        id: 'budget',
                        kind: 'stat',
                        title: 'Monthly budget, with a guard',
                        text: `At 100% the gateway pauses the engine and stops the cluster. One access window costs about ${c.window.cost}.`,
                        value: c.budget,
                        source: 'consignado.kmads.dev, section on cost',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'builds',
                        kind: 'stat',
                        title: 'People advised on PC builds',
                        text: `Parts, budgets and repairs for gaming, workstation and server builds on Reddit, ${earlier.reddit.start} to ${earlier.reddit.end}.`,
                        value: earlier.reddit.people,
                        source: 'My LinkedIn profile, volunteering',
                        art: null,
                        to: null,
                    },
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
                        `, GitHub Actions runs the test suite and the PostgreSQL migration tests, and it deploys only after the health checks pass.`,
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
                    {
                        id: 'pipeline',
                        kind: 'art',
                        title: 'One push, seven stages',
                        text: 'Build and test, image, OIDC sign-in, push, cluster start, rollout, smoke test inside the cluster.',
                        value: null,
                        source: null,
                        art: 'pipeline',
                        to: null,
                    },
                    {
                        id: 'passwords',
                        kind: 'stat',
                        title: 'Stored deploy passwords',
                        text: 'GitHub Actions, pods and functions prove who they are with OIDC, workload identity and managed identities.',
                        value: '0',
                        source: 'consignado-api, docs/platform/architecture.md',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'repositories',
                        kind: 'stat',
                        title: 'Repositories that deploy on push',
                        text: `The API, the serverless side and the site of ${c.name}. Each image tag is the commit.`,
                        value: '3',
                        source: 'consignado.kmads.dev, section Delivery',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'site-workflow',
                        kind: 'link',
                        title: 'The workflow of this site',
                        text: `Test, build, browser check, publish. Then a check that ${site.domain} serves this commit.`,
                        value: null,
                        source: null,
                        art: 'sitePipeline',
                        to: site.workflow,
                    },
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
                    {
                        id: 'timeline',
                        kind: 'art',
                        title: `${person.codingSince} to 2026`,
                        text: 'Discord bots, Express pages, a startup landing page, a curation app at work, a site that draws its own requests.',
                        value: null,
                        source: null,
                        art: 'timeline',
                        to: null,
                    },
                    {
                        id: 'legacy',
                        kind: 'stat',
                        title: 'Legacy projects, public',
                        text: 'Discord bots in Node.js, Express and Fastify sites with HTML and CSS, and one Minecraft server setup.',
                        value: `${legacy.folders}`,
                        source: 'Repository kmadsdev/glitch-legacy-projects',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'visitors',
                        kind: 'stat',
                        title: 'Visitors a month',
                        text: `${site.domain} and the apps under it answer ${site.requests} requests a month.`,
                        value: site.monthlyVisitors,
                        source: `Cloudflare analytics of ${site.domain}`,
                        art: null,
                        to: null,
                    },
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
                lead: `Cards at ${picpay.name}, in words only. Payroll loans, a card engine and a payment gateway in my own projects, with synthetic data.`,
                paragraphs: [
                    [
                        'At ',
                        link(picpay.name, '#exp-picpay'),
                        ' I work on ',
                        link('card acquisition and upgrade', '#case-cards'),
                        `: the engines that decide, in real time, whether a client gets a card and which one. The same services answer customer requests that arrive through the central bank, and internal audits. I describe that work in words only, because the code and the numbers belong to ${picpay.name}.`,
                    ],
                    [
                        'To show the same domain with public code, I built three projects of my own with synthetic data. ',
                        link('consignado-api', '#app-consignado'),
                        ` is a payroll loan API (crédito consignado). The installment leaves the paycheck, so the employer agreement caps the share of the net salary that installments can take. With a net salary of ${m.netSalary} and a cap of ${m.capPercent}, the margin is ${m.marginLimit}. A loan of ${m.principal} over ${m.termMonths} months at ${m.monthlyRate} a month has a fixed installment of ${m.installment} on a Price schedule. The API compares the largest installment, ${m.largestInstallment}, with the free margin, at simulation and again at approval.`,
                    ],
                    [
                        'The ',
                        link('credit card engine', '#app-credit-card-engine'),
                        ` has an acquisition flow for new clients and an upgrade flow for existing clients, ${card.variantCount} card variants, and one policy module that stores each decision with its reasons. The `,
                        link('payment gateway', '#app-payment-gateway'),
                        ' in Go authorizes, captures and refunds with idempotency keys, a double-entry ledger and signed webhooks. None of the three has real customers or real money. The README of consignado-api lists what is not built, for example IOF, CET and payroll integration.',
                    ],
                ],
                tiles: [
                    {
                        id: 'margin',
                        kind: 'art',
                        title: 'The margin rule, worked',
                        text: `Net salary ${m.netSalary} at ${m.capPercent} gives ${m.marginLimit}. The largest installment, ${m.largestInstallment}, fits.`,
                        value: null,
                        source: null,
                        art: 'margin',
                        to: null,
                    },
                    {
                        id: 'pairs',
                        kind: 'stat',
                        title: 'Status pairs tested',
                        text: `One transition table decides each move between the ${c.contractStates} contract states. A unit test covers all the pairs.`,
                        value: `${c.statusPairs}`,
                        source: 'consignado-api README, section Tests',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'variants',
                        kind: 'stat',
                        title: 'Card variants, one policy',
                        text: `Debit, Credit Base up to ${card.variants.base}, Platinum up to ${card.variants.platinum}, and Black above that.`,
                        value: `${card.variantCount}`,
                        source: 'Repository kmadsdev/credit-card-engine',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'synthetic',
                        kind: 'note',
                        title: 'Synthetic data only',
                        text: `${c.data.agreements} agreements, ${c.data.customers} customers, ${c.data.simulations} simulations and ${c.data.contracts} contracts. No real customer and no credit offer.`,
                        value: null,
                        source: null,
                        art: null,
                        to: null,
                    },
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
                    ['I work with Claude Code and Codex under test-first rules: the test exists before the code. Since 2025 I also study the layer below the agent: local models, quantization and fine-tuning.'],
                ],
                tiles: [
                    {
                        id: 'context',
                        kind: 'stat',
                        title: 'People, one agent context',
                        text: `Task, progress and knowledge files that each agent on the ${bodyshop.name} team read first.`,
                        value: `${bodyshop.teamSize}`,
                        source: `${bodyshop.name} team at ${picpay.name}`,
                        art: null,
                        to: null,
                    },
                    {
                        id: 'entries',
                        kind: 'stat',
                        title: 'Ways into Ruph',
                        text: 'Web, REST, CLI and an MCP server share one API. An agent plans and a person approves.',
                        value: `${ruph.entries}`,
                        source: 'Ruph, my own platform',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'template',
                        kind: 'link',
                        title: 'Agentic Template',
                        text: 'The public page of the template: files, rules, MCP servers and skills.',
                        value: null,
                        source: null,
                        art: null,
                        to: facts.projects.agentic.live,
                    },
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
                        link(`${facts.appOrder.live.length} applications`, '#applications-live'),
                        ' run in production today, and ',
                        link(`${facts.appOrder.study.length} study repositories`, '#applications-study'),
                        ' have public code.',
                    ],
                ],
                tiles: [
                    {
                        id: 'live',
                        kind: 'link',
                        title: 'In production',
                        text: `${c.name}, my own platform and the public apps. Each runs at a live address, and only I can sign in to Ruph.`,
                        value: null,
                        source: null,
                        art: null,
                        to: '#applications-live',
                    },
                    {
                        id: 'study',
                        kind: 'link',
                        title: 'Study repositories',
                        text: 'A card engine, a payment gateway and two challenges, with public source code.',
                        value: null,
                        source: null,
                        art: null,
                        to: '#applications-study',
                    },
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
                        sqs: { label: 'SQS', use: `Queue between the app request and the image service of ${bodyshop.name}` },
                        ec2: { label: 'EC2', use: `${hivemind.name} API and ML service` },
                        rds: { label: 'RDS', use: `PostgreSQL at ${picpay.name}: client accounts, issued cards, transactions` },
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
                    trocatine: { label: `${trocatine.name} MVP and landing page`, text: 'React MVP, landing page in plain HTML, CSS and JavaScript' },
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
    },

    // ─── en.experience ──────────────────────────────────────────────────────
    // "Experience": company, period, role, responsibilities, impact. Under each company:
    // the case files of the projects I built or led there (ids of cases).
    experience: {
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
                        title: 'Software Engineer, Finance',
                        period: period(picpay.fullTime, 'en'),
                        note: 'Cards area, credit acquisition. Also the Vehicle Hub in the bills area and the engineering team of the HR area.',
                    },
                    {
                        title: 'Software Engineer, HR',
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
    },

    // ─── en.cases ───────────────────────────────────────────────────────────
    // Case files: one problem, the decisions, the result and a flowchart.
    // flow.nodes: one label per node id of facts.cases[id].flow.nodes.
    // flow.steps: one sentence per edge of facts.cases[id].flow.edges, in the same order.
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
                kicker: `${picpay.name} · cards area · in production`,
                title: 'Cards engines: who gets which card',
                problem: `The cards area decides credit in real time: requests for a new card, requests for an upgrade, and customer requests that arrive through the central bank or an internal audit. The work runs on ${cards.microservices} microservices in Java and Go and on the legacy systems around them. They answer millions of requests from hundreds of thousands of clients.`,
                decisions: [
                    'I write and maintain the Java (Spring Boot, JPA) and Go services of the acquisition and upgrade flows, with messaging, CI/CD and observability.',
                    'I read an incident across the microservices until I find the defect. Then I write the test, and then the fix.',
                    'I built self-healing jobs that clean the database with no manual work.',
                ],
                result: `I found and fixed bugs and hidden defects in ${cards.legacySystems} legacy Java systems and closed hundreds of client incidents.`,
                stats: [
                    { value: cards.microservices, label: 'microservices in the area' },
                    { value: `${cards.legacySystems}`, label: 'legacy Java systems with fixes' },
                ],
                flow: null,
            },
            {
                id: 'bodyshop',
                anchor: 'case-bodyshop',
                kicker: `${picpay.name} · internal platform · in QA`,
                title: `${bodyshop.name}: a picture of each customer's own car`,
                problem: `${bodyshop.customers} customers opened the app and saw a car that was not theirs: a generic picture, or the wrong model, year or color. An internal study showed that satisfaction and retention can rise when the exact car appears.`,
                decisions: [
                    'Generate once. One image for each brand, model, year and color. A registry answers before any model is called.',
                    'Reserve the storage path first. The image always lives at the same S3 path, so a better image replaces a bad one and the app needs no release.',
                    `Let people correct the machine. Staff write what is wrong, a more accurate model returns ${bodyshop.curationVariants} variants, and the one they pick overwrites the old file.`,
                    'Generate off the request path. A request for a new car goes to an SQS queue. The image service takes it from the queue, stores the image in S3 and writes the car details to MongoDB.',
                    'One layered Go monolith with REST APIs, MongoDB as an indexed registry, and S3 behind CloudFront.',
                ],
                result: `In the pilot, ${bodyshop.approvalRate} of the images passed approval at generation, with no manual curation, in under ${bodyshop.endToEnd} from request to image. The team ran latency, uptime, concurrency and security tests in QA, with governance approval.`,
                stats: [
                    { value: bodyshop.customers, label: 'customers in scope' },
                    { value: bodyshop.approvalRate, label: 'approved at generation (pilot)' },
                    { value: `< ${bodyshop.endToEnd}`, label: 'request to image' },
                    { value: `${bodyshop.engineersLed}`, label: 'engineers I led' },
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
                        `The API calls a more accurate model and gets ${bodyshop.curationVariants} variants.`,
                        'The chosen variant overwrites the same path. The app shows the new image with no release.',
                    ],
                },
            },
            {
                id: 'survey',
                anchor: 'case-survey',
                kicker: `${picpay.name} · internal platform`,
                title: `${survey.name}: one platform in place of many paid tools`,
                problem: `About ${survey.employees} employees answered NPS and workplace surveys on several paid tools, with little room to customize them and little control of privacy. The first plan for the replacement was a set of microservices.`,
                decisions: [
                    'I asked why the plan needed microservices. One product, one team and one database did not need them. The team moved to a layered monolith.',
                    'I worked on the backend API and its CI/CD tests in PHP (Hyperf).',
                    'I planned the MySQL schema and indexes for survey and answer data, with Redis as a cache.',
                ],
                result: 'The old setup cost tens of thousands of US dollars a year in licenses. The projected saving is hundreds of thousands of BRL a year, with more control of privacy and of the questions.',
                stats: [
                    { value: survey.employees, label: 'employees served' },
                    { value: `${survey.teamSize}`, label: 'people on the team' },
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
                kicker: `${picpay.name} · HR data`,
                title: 'Oracle HCM: a map for data that had none',
                problem: `Hundreds of Oracle Cloud HCM databases, and no documentation. People kept writing new queries on top of legacy views of ${oracle.viewLines} lines, with no index and no cache.`,
                decisions: [
                    'I read the data itself to find what each table and column means, and I wrote it down as an index.',
                    `I rewrote large queries across ${oracle.tables} tables and views. They went from thousands of lines to hundreds and ran ${oracle.speedupMin} to ${oracle.speedupMax} times faster.`,
                    'I wrote SQL automations and decision-support queries on top of the index.',
                    'I planned a database design that replaces the legacy views.',
                ],
                result: 'The index saved hundreds of hours of research for engineers and analysts, and HR got organized data for predictive models.',
                stats: [
                    { value: '100+', label: 'databases mapped' },
                    { value: `${oracle.speedupMin} to ${oracle.speedupMax}x`, label: 'faster queries' },
                    { value: oracle.viewLines, label: 'lines in one legacy view' }
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
                kicker: `Startup MVP · ${hivemind.year}`,
                title: `${hivemind.name}: a ${hivemind.modelBefore} model that became ${hivemind.modelAfter}`,
                problem: `${hivemind.name} scores how well a company matches a product, from a short survey. The first model was a Random Forest file of about ${hivemind.modelBefore}, stored in S3 and loaded by the API.`,
                decisions: [
                    `I moved the model from Random Forest to Logistic Regression: about ${hivemind.trainingAccuracy} training accuracy in a file of ${hivemind.modelAfter}.`,
                    'I built a FastAPI service that loads the newest model from S3 and swaps it while it runs. A new model needs no redeploy.',
                    'I modeled the data in PostgreSQL, MongoDB and Redis, and set up CI/CD on AWS and GitHub.',
                ],
                result: `Storage cost for models fell by up to ${hivemind.storageSaving}. About ${hivemind.visitors} visitors at ExpoTech ${hivemind.year} rated the product ${hivemind.rating}. It was an MVP before launch, with no real users.`,
                stats: [
                    { value: hivemind.modelAfter, label: `model file, from ${hivemind.modelBefore}` },
                    { value: hivemind.storageSaving, label: 'lower model storage cost' },
                    { value: hivemind.trainingAccuracy, label: 'training accuracy' },
                    { value: hivemind.rating, label: `from about ${hivemind.visitors} visitors` },
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
                problem: 'I run several apps on GCP, Cloudflare, Vercel, Supabase and Neon. I wanted one place that knows every app and every environment, and I wanted AI agents to help with the work without the power to change production alone.',
                decisions: [
                    'One registry of apps and environments, with one API. The web dashboard, the CLI and the MCP server all use it.',
                    'No change without a plan. An agent or a person writes the plan. Only a person approves it.',
                    'Each apply is written to an append-only ledger. Budgets warn or pause the work.',
                    'Provider plugins for GCP, Cloudflare, Vercel, Supabase and Neon. Terraform manages the access rules.',
                ],
                result: `Ruph deploys and provisions my own apps in QA and in production. GitHub Actions runs the test suite and the PostgreSQL migration tests, and deploys only after the health checks pass. It is a private platform: I am its only operator.`,
                stats: [
                    { value: '4', label: 'ways in: web, REST, CLI, MCP' },
                    { value: '5', label: 'cloud providers behind one API' },
                ],
                flow: {
                    title: 'Plan, approve, apply, record',
                    nodes: {
                        agent: 'AI agent',
                        human: 'Me',
                        api: 'Ruph API (Hono)',
                        ledger: 'Ledger (PostgreSQL)',
                        providers: 'Cloud providers',
                        ci: 'GitHub Actions',
                    },
                    steps: [
                        'An agent writes a plan through the MCP server or the CLI.',
                        'I read the plan and approve it. An agent cannot approve.',
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
        title: 'One technical program and three certificates.',
        lead: `Three years at ${edu.institution} and three HackerRank certificates.`,
        program: {
            id: 'jf',
            anchor: 'edu-jf',
            title: 'Software Development Technical Program',
            place: edu.institution,
            period: period(edu, 'en'),
            length: `${edu.years} years`,
            note: `Expected in ${monthYear(edu.end, 'en')}.`,
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
            note: 'The three tests cover algorithms, REST APIs, software engineering, data modeling, query optimization and window functions. I solved them in Python, C/C++ and MySQL.',
            items: edu.certificates.map((item) => ({
                id: item.id,
                title: {
                    'software-engineer': 'Software Engineer',
                    'rest-api': 'REST API (Intermediate)',
                    sql: 'SQL (Advanced)',
                }[item.id],
                issuer: item.issuer,
                date: monthYear(item.date, 'en'),
            })),
        },
    },

    // ─── en.applications ────────────────────────────────────────────────────
    // "Applications". Names, addresses, stacks and clips: facts.projects.
    // live: facts.appOrder.live, in production. study: facts.appOrder.study, not hosted.
    // The ids of facts.appOrder.featured have an `architecture` and a `goals` block.
    applications: {
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
            lead: 'Each one runs at a live address now. Ruph is private: only I can sign in.',
            items: [
                {
                    id: 'consignado',
                    anchor: 'app-consignado',
                    tagline: 'One API on two Azure hosts, with each request drawn',
                    text: `A payroll loan API in Java 21 and Spring Boot 3.5 that runs unchanged as pods on AKS and inside an Azure Function, behind one Java gateway and a Cloudflare edge. The site draws each request as a live diagram, with the measured time of each stage. It is a technical demo with synthetic data and no credit offer.`,
                    architecture: [
                        `Edge: a Cloudflare Worker with TLS, a cache for static files and a limit of ${c.rateLimit.requests} requests per ${c.rateLimit.seconds} s per IP on the API.`,
                        'Gateway: Java 21 on Azure Functions. It checks the Entra ID token, applies the access rules, starts and stops the cluster, and returns a trace of each call.',
                        `Hosts: the same jar on Azure Functions (cold call ${c.serverless.coldMin} to ${c.serverless.coldMax} s, warm call ${c.serverless.warmMin} to ${c.serverless.warmMax} s) and on AKS (${c.cluster.nodes} node, ${c.cluster.pods} pods behind an internal load balancer, warm call about ${c.cluster.warm} s).`,
                        `Cluster: stopped by default. A signed-in visitor starts it for a ${c.window.minutes}-minute window. A start from stopped took ${clusterStart}.`,
                        `Data and delivery: ${c.database.engine} with Flyway. Terraform creates the Azure resources, and GitHub Actions deploys each repository with OIDC.`,
                    ],
                    goals: [
                        'Compare one API on Kubernetes and on serverless, with measured cost and latency.',
                        `Stay inside a monthly budget of ${c.budget}: the gateway pauses the engine at 100%.`,
                        'Show the rules of a payroll loan in code: margin, Price schedule, contract states, optimistic concurrency and a transactional outbox.',
                    ],
                    caseId: null,
                    media: {
                        preview: { caption: 'A guest sends one real loan preview to the serverless host. The trace replays that request stage by stage, and the Request Inspector opens on it.', alt: `Clip of the ${c.name} site: the loan preview form, then the request diagram with the time of each stage.` },
                        lifecycle: { caption: 'A replay of one recorded AKS cluster start at 8 times the real speed. The slider jumps to 6 min 15 s, and the replay runs to the end.', alt: `Clip of the ${c.name} site: the replay of an AKS cluster start, stage by stage, until the cluster is ready.` },
                        api: { caption: 'The API alone, in a local run: an agreement, a customer and a loan of 84 months.', alt: 'Terminal recording: curl creates an agreement and a customer, then simulates a loan and prints the installment.' },
                        'still-1': { caption: 'The loan preview: the form with its result, and whether the installment fits the margin.', alt: `Screen of the ${c.name} site: the loan preview form with its result and the margin check.` },
                        'still-2': { caption: 'One warm preview as a trace, with the Request Inspector open on the same request.', alt: `Screen of the ${c.name} site: the trace of one request from the browser to the Spring Boot API, and the Request Inspector panel.` },
                        'still-3': { caption: 'The replay of one AKS cluster start, each stage with its measured time.', alt: `Screen of the ${c.name} site: the diagram of an AKS cluster start at the end of its replay.` },
                    },
                },
                {
                    id: 'ruph',
                    anchor: 'app-ruph',
                    tagline: 'One control plane for every app I run',
                    text: 'My own platform. It keeps one registry of my apps and environments behind one API, and it deploys and provisions them in QA and in production on GCP, Cloudflare, Vercel, Supabase and Neon. An AI agent can write a plan there, and only a person approves it. It is private: I am its only operator.',
                    architecture: [
                        'One API in TypeScript (Hono). The web dashboard, the CLI and the MCP server all use it.',
                        'Cloud Run for the API, Cloud SQL for the PostgreSQL ledger, Secret Manager for the secrets, and Terraform for the access rules.',
                        `GitHub Actions runs the test suite and the PostgreSQL migration tests, and deploys only after the health checks pass.`,
                    ],
                    goals: [
                        'One place that knows each app and each environment.',
                        'AI agents that help with operations and cannot change production alone.',
                        'A record of each apply in an append-only ledger, with budgets that warn or pause the work.',
                    ],
                    caseId: 'ruph',
                    media: null,
                },
                {
                    id: 'diabetes',
                    anchor: 'app-diabetes',
                    tagline: `A risk estimate from ${p.diabetes.inputs} answers`,
                    text: `A FastAPI service validates ${p.diabetes.inputs} inputs, loads the newest scikit-learn model and returns a risk estimate with its confidence. The model is a Random Forest trained on public Kaggle data. It started as my CS50x final project. It is not a medical diagnosis.`,
                    architecture: [
                        `A static page sends the ${p.diabetes.inputs} answers to the API.`,
                        'The FastAPI service validates each input, runs the model and answers with the estimate and its confidence.',
                        `${p.diabetes.endpoints} endpoints: status, health, models and predict.`,
                    ],
                    goals: [
                        'Take a model from a notebook to a live API.',
                        'Serve the newest trained model with no change to the code.',
                    ],
                    caseId: null,
                    media: null,
                },
                {
                    id: 'offmode',
                    anchor: 'app-offmode',
                    tagline: 'A Pomodoro timer for deep focus',
                    text: 'A focus timer for the web and the desktop. It tracks your focus time across sessions, with login and sync to a server.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'notes',
                    anchor: 'app-notes',
                    tagline: 'A code editor in one HTML file',
                    text: `A notepad that looks and works like VS Code, with no backend and no account. Monaco highlights ${p.notes.languages} languages. Files stay in the browser, or save straight to your disk in Chrome and Edge. It has ${p.notes.previews} live previews, from Markdown to Mermaid.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'doom',
                    anchor: 'app-doom',
                    tagline: 'Doom in one file, with no server',
                    text: `The 1993 game compiled from C to WebAssembly, packed with gzip into a single HTML file that unpacks itself in the browser. The packed game went from ${p.doom.sizeBefore} to ${p.doom.sizeAfter}. I built it to study compression.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'agentic',
                    anchor: 'app-agentic',
                    tagline: 'One context for every AI coding agent',
                    text: 'A template for a repository that AI agents can work in: task, progress and knowledge files, test-first rules, and a fixed set of MCP servers and skills.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'custom-square',
                    anchor: 'app-custom-square',
                    tagline: 'A CSS playground',
                    text: 'Change CSS properties, gradients and colors and see the result at once. Plain JavaScript, with the theme saved in the browser.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'trocatine',
                    anchor: 'app-trocatine',
                    tagline: 'The landing page of my first startup MVP',
                    text: `The public page of ${startups.trocatine.name}, an exchange of children's clothes and toys. This address is the landing page only: plain HTML, CSS and JavaScript on GitHub Pages. The MVP of the product was a separate application in React and Tailwind CSS.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
            ],
        },
        study: {
            anchor: 'applications-study',
            title: 'Study projects and repositories',
            lead: 'Not hosted. Simulated data, no users and no real money. The code is public.',
            items: [
                {
                    id: 'credit-card-engine',
                    anchor: 'app-credit-card-engine',
                    tagline: 'Who gets which card, and why',
                    text: `A card engine in Java 21 and Spring Boot with two flows: acquisition for new clients and upgrade for existing clients. Four variants: Debit (limit 0), Credit Base (up to ${card.variants.base}), Credit Platinum (up to ${card.variants.platinum}) and Credit Black (above ${card.variants.platinum}). All credit rules are in one table-driven policy module, and each decision is stored with its reasons.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'payment-gateway',
                    anchor: 'app-payment-gateway',
                    tagline: 'Authorize, capture and refund, with no double charge',
                    text: 'A simulated payment gateway for an online store, in Go and PostgreSQL, backend only. Card tokenization and Pix, a state machine for authorize, capture and refund, idempotency keys, a double-entry ledger, and signed webhooks through a transactional outbox. CI runs the tests with the race detector against a real PostgreSQL.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'devops-challenge',
                    anchor: 'app-devops-challenge',
                    tagline: 'Four containers, one command',
                    text: `A distributed system on Docker Compose with ${p['devops-challenge'].containers} containers: a Python writer, a Go reader, a Node.js web front end and Redis between them.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'incident-api',
                    anchor: 'app-incident-api',
                    tagline: 'Alerts and incidents, with a terminal UI',
                    text: 'An alert and incident service in PHP (Hyperf, Swoole) that ingests metrics and stores them in MySQL and Redis. It comes with a terminal interface in Python.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'legacy',
                    anchor: 'app-legacy',
                    tagline: `Where I started, ${legacy.from} to ${legacy.to}`,
                    text: `${legacy.folders} projects from my Glitch years: Discord bots in Node.js with Discord.js and SQLite, small Express and Fastify sites with HTML and CSS pages, and one Minecraft server setup. It is the code I learned on.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'student-tools',
                    anchor: 'app-student-tools',
                    tagline: 'Free tools for engineering students',
                    text: 'A curated list of the free developer tools and credits in the GitHub Student Developer Pack. A contribution to the community, with no code.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
            ],
        },
        // Used by the link list at the end of the section.
        more: { text: 'More repositories are on my GitHub profile.', label: 'GitHub profile', to: facts.contact.github },
        siteNote: `${site.domain} and the apps under it get more than ${site.monthlyVisitors} visitors and ${site.requests} requests a month, measured at Cloudflare.`,
    },

    // ─── en.more ────────────────────────────────────────────────────────────
    // "More": volunteering, languages, hobbies and future projects. Numbers: facts.hobbies.
    more: {
        label: 'More',
        title: 'Volunteering, languages and what I do for fun.',
        lead: 'I like performance engineering in servers, in PC cases and under a car hood.',
        volunteering: {
            anchor: 'more-volunteering',
            title: 'Volunteering',
            role: 'Hardware and IT advisor',
            place: 'Reddit',
            period: years(reddit),
            text: `I helped ${reddit.people} people to design and build PCs for gaming, professional work and servers: part choice, budget and repairs on Windows, macOS and Linux. It was before AI assistants, so each answer came from research, benchmarks and my own builds.`,
            communitiesLabel: 'Communities',
            communities: reddit.communities,
        },
        languages: {
            anchor: 'more-languages',
            title: 'Languages',
            items: [
                { id: 'pt', name: 'Portuguese', level: 'Native' },
                { id: 'en', name: 'English', level: 'C1' },
                { id: 'es', name: 'Spanish', level: 'Basic' },
            ],
        },
        hobbies: {
            anchor: 'more-hobbies',
            title: 'Hobbies',
            items: [
                {
                    id: 'ecu',
                    title: 'Car ECU tuning',
                    text: `I study the engine control units and the tuning of 1990 to 2002 Honda Civics. The notes go to an open archive under my second GitHub account, ${contact.carGithubHandle}.`,
                    link: { label: 'open-civic', to: contact.carRepo },
                },
                { id: 'pc', title: 'PC hardware', text: 'I build PCs and homelabs, and I read the benchmarks before I buy a part.', link: null },
                { id: 'gym', title: 'Gym', text: `I have trained for ${hobbies.gym.years} years, mostly hypertrophy and powerlifting. My best bench press is ${hobbies.gym.bench} and my best deadlift is ${hobbies.gym.deadlift}.`, link: null },
                { id: 'basketball', title: 'Basketball', text: `I have played for ${hobbies.basketball.years} year, on weekends with friends.`, link: null },
                { id: 'chess', title: 'Chess', text: `I have played for ${hobbies.chess.years} years and my rating is above ${hobbies.chess.rating}. I once beat ${hobbies.chess.bot}, a ${hobbies.chess.site} bot rated ${hobbies.chess.botRating}.`, link: null },
            ],
        },
        future: {
            anchor: 'more-future',
            title: 'Future projects',
            lead: 'Only what my public repositories state as planned.',
            // Same ids and order as facts.future. An empty list hides the block.
            items: [
                { id: 'notes', title: 'Notes: the roadmap', text: 'Offline support with a service worker, a folder view with a file tree, export of the preview to PDF and HTML, and snippets shared through the URL.' },
                { id: 'microdoom', title: 'MicroDOOM v1.1', text: 'The next version of my own Doom-like game in plain JavaScript. Its README marks it as work in progress.' },
            ],
        },
    },

    // ─── en.figma ───────────────────────────────────────────────────────────
    // The row "From my Figma" of original diagrams. Files, sizes and places: facts.figma,
    // in the order of facts.figmaOrder.
    figma: {
        title: 'From my Figma',
        lead: 'The drawings I made while I designed these systems.',
        open: 'Open the diagram at full size',
        close: 'Close the diagram',
        items: {
            'consignado-aks': {
                title: 'Consignado API on AKS, first version',
                caption: `My first drawing of the Kubernetes host of ${c.name}: a load balancer, one service, two pods and PostgreSQL over TLS. The live platform now has a gateway and an internal load balancer in front.`,
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
            'devops-challenge': {
                title: 'DevOps challenge architecture',
                caption: 'A browser, a frontend, a Python writer and a Go reader, with Redis between the two services.',
                alt: 'Diagram with four boxes. The browser talks to the frontend over HTTP. The frontend sends and fetches data: it posts to a writer service in Python and gets from a reader service in Go. The writer posts to Redis and the reader gets from Redis.',
            },
        },
    },

    // ─── en.contact ─────────────────────────────────────────────────────────
    // "Contact" at the end of the page. The address: links.email.
    contact: {
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
    },

    // ─── en.footer ──────────────────────────────────────────────────────────
    // The last line of the page.
    footer: {
        line: `Designed and built by ${person.name}.`,
        source: 'Source code of this site',
        license: 'Code under the MIT license. Texts and images are mine.',
        top: 'Back to the top',
    },

    // ─── en.controls ────────────────────────────────────────────────────────
    // Names of the controls that are not part of one section (screen readers, buttons).
    controls: {
        external: 'opens in a new tab',
        stopBadge: 'Stop the badge',
        // Disclosures: long text and details open in place.
        readMore: 'Read the full story',
        readLess: 'Show less',
        showDetails: 'Show the details',
        hideDetails: 'Hide the details',
        playBadge: 'Turn the badge',
        pauseDrawing: 'Pause the drawing',
        playDrawing: 'Play the drawing',
    },

    // ─── en.art ─────────────────────────────────────────────────────────────
    // Drawings that are not in the introduction (labels for screen readers, names on the drawing).
    // Text of the illustrations (labels for screen readers, names on the drawings)
    // of the drawings that are not in the introduction.
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
};

// =============================================================================
// PART 4 · PORTUGUESE (pt)
// The same keys as PART 3, in the same order. Brazilian Portuguese, "você".
// br(value) writes a number the Brazilian way: br('8.8M') gives '8,8M'.
// =============================================================================

// Numbers of PART 2 in the Brazilian form, for PART 4.
const mBr = Object.fromEntries(Object.entries(art.margin).map(([key, value]) => [key, typeof value === 'string' ? br(value) : value]));
const refused = { income: br(art.margin.refused.income), marginLimit: br(art.margin.refused.marginLimit), status: art.margin.refused.status };
const warmDb = art.trace.warm.stages.find((stage) => stage.id === 'database').ms;

const pt = {
    // ─── pt.meta ────────────────────────────────────────────────────────────
    // Page title and description: the browser tab, link previews, search engines.
    // index.html gets them at build. noscript: the text for a browser with no JavaScript.
    meta: {
        htmlLang: 'pt-BR',
        ogLocale: 'pt_BR',
        title: `${person.name} (${person.aliasUpper}) · Engenheiro de Software · Arquitetura & Cloud`,
        description: `Engenheiro de Software no ${picpay.name}. Backend, arquitetura e cloud com Java, Go, Python e SQL: AWS no trabalho, GCP e Azure nos meus próprios projetos. Experiência profissional, aplicações em produção com a arquitetura de cada uma e código público.`,
        noscript: 'Esta página precisa de JavaScript para mostrar a experiência e as aplicações.',
    },

    // ─── pt.nav ─────────────────────────────────────────────────────────────
    // Top bar: skip link, wordmark, section menu, language switch.
    nav: {
        skip: 'Pular para o conteúdo',
        home: 'Voltar ao topo',
        menu: 'Seções',
        items: [
            { id: 'intro', label: 'Introdução' },
            { id: 'experience', label: 'Experiência' },
            { id: 'education', label: 'Formação' },
            { id: 'applications', label: 'Aplicações' },
            { id: 'more', label: 'Mais' },
            { id: 'contact', label: 'Contato' },
        ],
        open: 'Abrir o menu',
        close: 'Fechar o menu',
        language: 'Idioma',
        languages: { en: 'Inglês', pt: 'Português' },
        // O texto dos dois botões da troca de idioma.
        codes: { en: 'EN', pt: 'PT' },
    },

    // ─── pt.hero ────────────────────────────────────────────────────────────
    // First screen: name, role, a short summary, the location and four links (addresses: PART 1).
    hero: {
        status: `Engenheiro de Software no ${picpay.name}`,
        name: person.name,
        alias: person.aliasUpper,
        role: 'Engenheiro de Software',
        focus: 'Arquitetura & Cloud',
        summary: `Meu foco é backend, arquitetura e cloud, e acima de tudo confiabilidade e performance. Tenho ${person.yearsEngineering} anos de experiência em engenharia e ${person.yearsInTech} anos em tecnologia, e hoje trabalho nos motores de cartão de crédito do ${picpay.name}.`,
        location: [`${person.city}, ${person.state}, Brasil`, 'Remoto', person.utc],
        localTime: 'Hora local',
        links: [
            { id: 'applications', label: 'Aplicações', href: links.projectsPath },
            { id: 'github', label: 'GitHub', href: links.github },
            { id: 'linkedin', label: 'LinkedIn', href: links.linkedin },
            { id: 'email', label: 'Email', href: `mailto:${links.email}` },
        ],
        scroll: 'Role',
    },

    // ─── pt.intro ───────────────────────────────────────────────────────────
    // "Introduction": who I am and what I do. Each claim links to its proof lower on the page
    // or to a public repository. A tile holds one idea: a title of 6 words or less and a text
    // of 160 characters or less. Every tile has the same 8 keys: the unused ones are null.
    intro: {
        label: 'Introdução',
        title: 'Eu projeto, construo e opero sistemas de backend, do primeiro diagrama até a fatura.',
        lead: `${person.yearsEngineering} anos de experiência em engenharia e ${person.yearsInTech} anos em tecnologia, em sistemas que respondem milhões de requisições no trabalho e em plataformas que eu mesmo pago.`,
        proofLabel: 'Provas',
        toolsLabel: 'Ferramentas',
        sourceLabel: 'Fonte',

        opening: {
            label: 'Quem eu sou',
            title: 'Quem sou eu?',
            photo: { alt: `${person.name}: uma selfie de perto, com cabelo escuro e cacheado e uma cúpula de abajur creme atrás.` },
            paragraphs: [
                [`Eu sou ${person.name}, e quase todo mundo na internet me chama de ${person.alias}. Sou engenheiro de software em ${person.city} e trabalho com backend, arquitetura e cloud: os serviços e os dados em que um produto roda, e a infraestrutura por baixo deles.`],
                [
                    `Tenho ${person.yearsEngineering} anos de experiência em engenharia e ${person.yearsInTech} anos em tecnologia. Escrevi meu primeiro código em ${person.codingSince}, em `,
                    link('bots de Discord', '#exp-discord'),
                    ` que rodavam em comunidades de até ${earlier.discord.members} membros. Hoje trabalho no `,
                    link(picpay.name, '#exp-picpay'),
                    `, uma fintech brasileira com cerca de ${picpay.registeredUsers} de usuários cadastrados, nos motores que decidem quem recebe um cartão de crédito.`,
                ],
                [
                    'Também construo e opero meus próprios sistemas, porque quero conhecer uma plataforma até a fatura dela. O ',
                    link(c.name, '#app-consignado'),
                    ' roda uma API em Spring Boot em dois hosts da Azure atrás de um gateway, e o site dele desenha cada requisição com o tempo que cada etapa levou. O ',
                    link('Ruph', '#app-ruph'),
                    ' é a minha própria plataforma na GCP: ele faz o deploy dos meus apps, e um agente de IA pode planejar uma mudança ali, mas só eu posso aprovar.',
                ],
                [
                    `Engenharia de performance é a parte de que eu mais gosto. No trabalho, deixei consultas em Oracle de ${oracle.speedupMin} a ${oracle.speedupMax} vezes mais rápidas. No ${c.name}, `,
                    link('medi a subida de um cluster em quatro partes', '#intro-cloud'),
                    `. Orientei ${earlier.reddit.people} pessoas em `,
                    link('montagens de PC', '#more-volunteering'),
                    ', e no tempo livre estudo ',
                    link('a injeção eletrônica de Honda Civics antigos', '#more-hobbies'),
                    '.',
                ],
            ],
        },

        chaptersLabel: 'O que eu faço',
        chapters: [
            {
                id: 'architecture',
                label: 'Arquitetura',
                poster: 'Trade-offs',
                headline: 'Pergunto quanto uma arquitetura custa antes de desenhar.',
                lead: `No ${survey.name}, a primeira pergunta foi quantos serviços. No ${bodyshop.name} foi quantas chamadas a um modelo, e no ${c.name}, quantos hosts.`,
                paragraphs: [
                    [
                        'No ',
                        link(survey.name, '#case-survey'),
                        `, no ${picpay.name}, o primeiro plano era um conjunto de microsserviços. Perguntei por quê. A resposta era um produto, um time de ${survey.teamSize} pessoas e um banco de dados, então o time construiu um monólito em camadas em PHP para uma plataforma que atende cerca de ${br(survey.employees)} funcionários.`,
                    ],
                    [
                        `Liderei ${bodyshop.engineersLed} engenheiros no `,
                        link(bodyshop.name, '#case-bodyshop'),
                        `, uma plataforma em QA que mostra a cada cliente uma imagem do próprio carro. Geramos uma imagem para cada marca, modelo, ano e cor, guardamos em um caminho fixo no S3 e consultamos um registro antes de chamar qualquer modelo. No piloto, ${br(bodyshop.approvalRate)} das imagens foram aprovadas já na geração, em menos de ${bodyshop.endToEnd} do pedido até a imagem. Quando a equipe troca uma imagem ruim, o arquivo novo ocupa o mesmo caminho e o app não precisa de release.`,
                    ],
                    [
                        'O ',
                        link(c.name, '#app-consignado'),
                        ' é a minha resposta para uma dúvida que eu tinha sobre hosts: quanto custa a mesma API em Kubernetes e em serverless? O mesmo jar roda como pods no AKS e dentro de uma Azure Function. Um gateway em Java fica na frente dos dois, valida cada token e devolve um trace de cada chamada. A ',
                        link('tabela de decisões', c.docs.decisions),
                        ' traz o trade-off de cada escolha e o que um banco faria no lugar, e ',
                        link(`${c.adrs} registros de decisão`, c.docs.adrs),
                        ' guardam os detalhes.',
                    ],
                ],
                tiles: [
                    {
                        id: 'request-path',
                        kind: 'art',
                        title: 'Uma API, dois hosts',
                        text: 'Navegador, edge na Cloudflare e um gateway em Java. Depois o mesmo jar em Azure Functions e em pods no AKS, com um PostgreSQL.',
                        value: null,
                        source: null,
                        art: 'requestPath',
                        to: null,
                    },
                    {
                        id: 'approval',
                        kind: 'stat',
                        title: 'Aprovadas na geração',
                        text: `Imagens do piloto do ${bodyshop.name} que não precisaram de curadoria manual, em menos de ${bodyshop.endToEnd} cada.`,
                        value: br(bodyshop.approvalRate),
                        source: `Piloto do ${bodyshop.name} no ${picpay.name}`,
                        art: null,
                        to: null,
                    },
                    {
                        id: 'monolith',
                        kind: 'stat',
                        title: 'Funcionários, um monólito',
                        text: `O ${survey.name} saiu de um plano de microsserviços para um monólito em camadas depois de uma pergunta.`,
                        value: br(survey.employees),
                        source: `${survey.name} no ${picpay.name}`,
                        art: null,
                        to: null,
                    },
                    {
                        id: 'adrs',
                        kind: 'stat',
                        title: 'Registros de decisão',
                        text: 'Camadas, dinheiro e arredondamento, concorrência, outbox, dois hosts, o gateway, o edge e o orçamento.',
                        value: `${c.adrs}`,
                        source: 'consignado-api, pasta docs/adr',
                        art: null,
                        to: null,
                    },
                ],
                tools: facts.chapterTools.architecture,
                proof: [
                    { label: survey.name, to: '#case-survey' },
                    { label: bodyshop.name, to: '#case-bodyshop' },
                    { label: c.name, to: '#app-consignado' },
                    { label: 'Diagramas de arquitetura', to: c.docs.architecture },
                ],
            },
            {
                id: 'backend',
                label: 'Backend',
                poster: 'Serviços',
                headline: 'Escrevo serviços que continuam corretos quando duas requisições chegam juntas.',
                lead: `Java e Go nos motores de cartões do ${picpay.name}, PHP em uma plataforma interna, Oracle SQL em dados de RH. Meus projetos mostram o mesmo trabalho com código público.`,
                paragraphs: [
                    [
                        'No ',
                        link(picpay.name, '#exp-picpay'),
                        ' eu trabalho nos ',
                        link('motores de aquisição e upgrade de cartões', '#case-cards'),
                        `: ${cards.microservices} microsserviços em Java (Spring Boot, JPA) e Go, com os sistemas legados em volta deles. Eles respondem milhões de requisições de centenas de milhares de clientes. Encontrei e corrigi defeitos em ${cards.legacySystems} sistemas legados em Java e criei jobs que limpam o banco de dados sem trabalho manual.`,
                    ],
                    [
                        'Antes da área de cartões, passei nove meses em ',
                        link('Oracle SQL', '#case-oracle'),
                        `: ${oracle.tables} tabelas e views sem documentação. Reduzi consultas de milhares de linhas para centenas e deixei cada uma de ${oracle.speedupMin} a ${oracle.speedupMax} vezes mais rápida. No `,
                        link(bodyshop.name, '#case-bodyshop'),
                        ' escolhi Go com Gin e MongoDB. No ',
                        link(survey.name, '#case-survey'),
                        ' trabalhei na API em PHP (Hyperf) e nos índices do MySQL.',
                    ],
                    [
                        'O código público está no ',
                        link('consignado-api', c.repos.api),
                        `: Java 21 e Spring Boot 3.5, com ${c.tests.api} testes e um build que falha abaixo de ${c.tests.coverageGate} de cobertura de linhas. Um contrato passa por ${c.contractStates} estados seguindo uma única tabela de transições. Cada contrato tem uma versão, então uma requisição com o header If-Match desatualizado recebe 412. Um lock na linha do cliente impede que duas aprovações usem a mesma margem.`,
                    ],
                    [
                        'Os eventos saem dessa API por um transactional outbox que mantém a ordem por contrato entre os pods. O ',
                        link('payment gateway em Go', '#app-payment-gateway'),
                        ' aplica as mesmas ideias com idempotency keys e um ledger em partidas dobradas, e o ',
                        link('motor de cartões de crédito', '#app-credit-card-engine'),
                        ' concentra todas as regras de crédito em um módulo de policy.',
                    ],
                ],
                tiles: [
                    {
                        id: 'trace',
                        kind: 'art',
                        title: 'Uma requisição, etapa por etapa',
                        text: `Uma escrita autenticada levou ${art.trace.warm.totalMs} ms no gateway. O banco de dados usou ${warmDb} ms disso, em ${art.trace.warm.statements.total} comandos SQL.`,
                        value: null,
                        source: null,
                        art: 'trace',
                        to: null,
                    },
                    {
                        id: 'states',
                        kind: 'art',
                        title: 'A máquina de estados do contrato',
                        text: 'Uma tabela de transições. A aprovação confere a margem de novo. A ativação grava as parcelas.',
                        value: null,
                        source: null,
                        art: 'contractStates',
                        to: null,
                    },
                    {
                        id: 'tests',
                        kind: 'stat',
                        title: 'Testes no consignado-api',
                        text: `Testes de unidade, web, repositório, integração e arquitetura. O build falha abaixo de ${c.tests.coverageGate} de cobertura de linhas.`,
                        value: `${c.tests.api}`,
                        source: 'Execução do CI do consignado-api na main, 18/11/2026',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'oracle',
                        kind: 'stat',
                        title: 'Vezes mais rápidas, em Oracle',
                        text: `${oracle.tables} tabelas e views no ${picpay.name}. As consultas foram de milhares de linhas para centenas.`,
                        value: `${oracle.speedupMin} a ${oracle.speedupMax}`,
                        source: `Meu perfil no LinkedIn, experiência no ${picpay.name}`,
                        art: null,
                        to: null,
                    },
                ],
                tools: facts.chapterTools.backend,
                proof: [
                    { label: 'Motores de cartões', to: '#case-cards' },
                    { label: 'Oracle HCM', to: '#case-oracle' },
                    { label: c.name, to: '#app-consignado' },
                    { label: 'Payment gateway', to: '#app-payment-gateway' },
                    { label: 'Motor de cartões de crédito', to: '#app-credit-card-engine' },
                ],
            },
            {
                id: 'cloud',
                label: 'Cloud',
                poster: coldStart,
                headline: 'Escolho um serviço de cloud pelo que ele faz e pelo quanto custa por hora.',
                lead: `Uma integração real em cada cloud: AWS no ${picpay.name} e em um MVP de startup, GCP na minha própria plataforma, Azure no ${c.name}.`,
                paragraphs: [
                    [
                        'Na AWS, o ',
                        link(bodyshop.name, '#case-bodyshop'),
                        ' guarda a imagem de cada carro no S3, atrás do CloudFront. O caminho de uma imagem nunca muda, então uma imagem corrigida chega ao app sem release. Para o ',
                        link(hivemind.name, '#case-hivemind'),
                        ` construí um serviço em FastAPI no EC2 que carrega o modelo mais novo do S3 e faz a troca em execução. A mudança de Random Forest para Regressão Logística levou o arquivo do modelo de ${hivemind.modelBefore} para ${br(hivemind.modelAfter)}.`,
                    ],
                    [
                        'O ',
                        link('Ruph', '#app-ruph'),
                        `, minha própria plataforma, roda na GCP: Cloud Run para a API, Cloud SQL para o ledger em PostgreSQL, Secret Manager para os segredos e Terraform para as regras de acesso. O GitHub Actions só faz o deploy de uma versão nova depois que os testes e os health checks passam.`,
                    ],
                    [
                        'O ',
                        link(c.name, '#app-consignado'),
                        ` fica na Azure, e o Terraform cria os recursos: AKS, dois function apps, Blob Storage para o site, Key Vault, PostgreSQL e as identidades. O cluster tem um node ${c.cluster.node} a ${br(c.cluster.nodePerHour)} por hora. Isso dá cerca de ${c.cluster.nodePerMonth} em um mês inteiro, mais do que todo o orçamento mensal de ${c.budget} (cerca de ${c.budgetUsd}). Por isso o cluster fica parado por padrão, e um visitante autenticado liga o cluster por uma janela de ${c.window.minutes} minutos, que custa cerca de ${br(c.window.cost)}.`,
                    ],
                    [
                        `Medi em partes a subida desse cluster parado. Foram ${coldStart} até a primeira resposta: ${part.controlPlane} do control plane, ${part.node} do node, ${part.app} do Spring Boot com o banco de dados e ${part.balancer} do load balancer. A Azure também recusou partes do primeiro plano. O Front Door é proibido em assinatura de estudante, então o edge é um Worker da Cloudflare. A região ${c.database.hostsRegion} não tinha capacidade para o tamanho do banco de dados, então o PostgreSQL fica em ${c.database.region}, e cada comando SQL atravessa um oceano. A `,
                        link('tabela de decisões', c.docs.decisions),
                        ' traz o custo de cada uma dessas escolhas.',
                    ],
                    [
                        `Meu interesse começa abaixo do serviço gerenciado. De ${earlier.reddit.start} a ${earlier.reddit.end} eu `,
                        link(`orientei ${earlier.reddit.people} pessoas`, '#more-volunteering'),
                        ' no Reddit sobre peças para PCs de jogos, de trabalho e servidores. Escolho o tamanho de uma instância do jeito que escolho uma CPU: pela carga e pelo preço.',
                    ],
                ],
                tiles: [
                    {
                        id: 'clouds',
                        kind: 'art',
                        title: 'Três clouds, por serviço',
                        text: `AWS no ${picpay.name} e no ${hivemind.name}. GCP no Ruph, minha própria plataforma. Azure no ${c.name}.`,
                        value: null,
                        source: null,
                        art: 'clouds',
                        to: null,
                    },
                    {
                        id: 'cold-start',
                        kind: 'art',
                        title: 'Um cold start em quatro partes',
                        text: `Control plane ${part.controlPlane}, node ${part.node}, Spring Boot com banco de dados ${part.app}, load balancer ${part.balancer}.`,
                        value: coldStart,
                        source: 'README do consignado-api, medido em 17/11/2026',
                        art: 'coldStart',
                        to: null,
                    },
                    {
                        id: 'budget',
                        kind: 'stat',
                        title: 'Orçamento mensal, com trava',
                        text: `Em 100%, o gateway pausa o motor e para o cluster. Uma janela de acesso custa cerca de ${br(c.window.cost)}.`,
                        value: c.budget,
                        source: 'consignado.kmads.dev, seção de custo',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'builds',
                        kind: 'stat',
                        title: 'Pessoas orientadas em PCs',
                        text: `Peças, orçamento e consertos para PCs de jogos, de trabalho e servidores no Reddit, de ${earlier.reddit.start} a ${earlier.reddit.end}.`,
                        value: earlier.reddit.people,
                        source: 'Meu perfil no LinkedIn, voluntariado',
                        art: null,
                        to: null,
                    },
                ],
                tools: facts.chapterTools.cloud,
                proof: [
                    { label: `${bodyshop.name} na AWS`, to: '#case-bodyshop' },
                    { label: `${hivemind.name} na AWS`, to: '#case-hivemind' },
                    { label: 'Ruph na GCP', to: '#app-ruph' },
                    { label: `${c.name} na Azure`, to: '#app-consignado' },
                    { label: 'Consultoria de hardware', to: '#more-volunteering' },
                ],
            },
            {
                id: 'cicd',
                label: 'CI/CD',
                poster: 'Push na main',
                headline: 'Meus pipelines fazem o deploy a cada push e depois conferem o resultado no ar.',
                lead: 'O GitHub Actions entra com OIDC, então nenhuma senha de deploy fica guardada. Cada imagem leva o commit como tag.',
                paragraphs: [
                    [
                        'O pipeline do ',
                        link('consignado-api', c.docs.workflow),
                        ' roda a cada push na main. Ele compila e testa, monta a imagem, entra na Azure com o OIDC do GitHub, envia a imagem com o commit como tag, liga o cluster quando ele está parado, aplica os manifests, espera o rollout e roda um smoke test dentro do cluster. A identidade de deploy tem permissão em um único namespace. Cada action é fixada em um SHA de commit, e o inspetor de requisições do site liga uma requisição ao commit que respondeu.',
                    ],
                    [
                        'O Terraform cria os recursos da Azure com remote state. Eu rodo o Terraform à mão, porque ele precisa do meu login. No ',
                        link('Ruph', '#app-ruph'),
                        `, o GitHub Actions roda a suíte de testes e os testes de migração do PostgreSQL, e só faz o deploy depois que os health checks passam.`,
                    ],
                    [
                        link('O workflow deste site', site.workflow),
                        ` segue o mesmo padrão em escala menor. Cada pull request passa pelos testes, pelo build, por uma checagem em navegador real e por uma checagem de responsividade. Depois de um push na main, o workflow publica o build, espera até o ${site.domain} servir exatamente aquele commit e então confere cada link no endereço real.`,
                    ],
                    [
                        'No ',
                        link(picpay.name, '#exp-picpay'),
                        ` meu trabalho de CI/CD e de testes unitários roda em ${picpay.delivery.join(', ').replace(/, ([^,]*)$/, ' e $1')}, e o `,
                        link(bodyshop.name, '#case-bodyshop'),
                        ' foi para QA com aprovação da governança.',
                    ],
                ],
                tiles: [
                    {
                        id: 'pipeline',
                        kind: 'art',
                        title: 'Um push, sete etapas',
                        text: 'Build e testes, imagem, login com OIDC, push, ligar o cluster, rollout e smoke test dentro do cluster.',
                        value: null,
                        source: null,
                        art: 'pipeline',
                        to: null,
                    },
                    {
                        id: 'passwords',
                        kind: 'stat',
                        title: 'Senhas de deploy guardadas',
                        text: 'GitHub Actions, pods e functions provam quem são com OIDC, workload identity e managed identities.',
                        value: '0',
                        source: 'consignado-api, docs/platform/architecture.md',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'repositories',
                        kind: 'stat',
                        title: 'Repositórios com deploy no push',
                        text: `A API, a parte serverless e o site do ${c.name}. A tag de cada imagem é o commit.`,
                        value: '3',
                        source: 'consignado.kmads.dev, seção Delivery',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'site-workflow',
                        kind: 'link',
                        title: 'O workflow deste site',
                        text: `Testes, build, checagem em navegador e publicação. Depois, uma checagem de que o ${site.domain} serve este commit.`,
                        value: null,
                        source: null,
                        art: 'sitePipeline',
                        to: site.workflow,
                    },
                ],
                tools: facts.chapterTools.cicd,
                proof: [
                    { label: 'Workflow do consignado-api', to: c.docs.workflow },
                    { label: 'Workflow deste site', to: site.workflow },
                    { label: 'Ruph', to: '#app-ruph' },
                    { label: picpay.name, to: '#exp-picpay' },
                ],
            },
            {
                id: 'fullstack',
                label: 'Full-stack',
                poster: `Desde ${person.codingSince}`,
                headline: `Minhas primeiras aplicações web rodaram em ${person.codingSince}, em JavaScript e HTML.`,
                lead: 'Hoje eu construo o frontend quando o sistema precisa de um, e sei o que ele pede da API e da infraestrutura por trás.',
                paragraphs: [
                    [
                        `Comecei em ${person.codingSince} com `,
                        link('bots de Discord', '#exp-discord'),
                        ' em JavaScript, hospedados no Glitch. Ao lado dos bots eu fazia sites pequenos em Express, com páginas em HTML e CSS. ',
                        link(`${legacy.folders} desses projetos`, legacy.repo),
                        ' estão públicos em um repositório.',
                    ],
                    [
                        `Em ${trocatine.year} liderei o time de frontend de duas pessoas do ${trocatine.name}. O MVP era em React e Tailwind CSS, e `,
                        link('a landing page pública', '#app-trocatine'),
                        ` é em HTML, CSS e JavaScript puros. No ${picpay.name}, o `,
                        link(bodyshop.name, '#case-bodyshop'),
                        ' tem um app de curadoria em React e Vite, e o ',
                        link(survey.name, '#case-survey'),
                        ' tem um app em Angular na frente da API em PHP.',
                    ],
                    [
                        'Meu maior frontend é o site do ',
                        link(c.name, '#app-consignado'),
                        '. Ele é feito em React com Cloudscape. O diagrama dele vem do trace que o gateway devolve: cada etapa com os milissegundos medidos, e um selo de cold start que só o gateway pode marcar. ',
                        link('Este site', site.repo),
                        ' é React e Vite sem biblioteca de UI, e os fluxogramas leem o mesmo arquivo de dados que o texto.',
                    ],
                ],
                tiles: [
                    {
                        id: 'timeline',
                        kind: 'art',
                        title: `De ${person.codingSince} a 2026`,
                        text: 'Bots de Discord, páginas em Express, a landing page de uma startup, um app de curadoria no trabalho e um site que desenha as próprias requisições.',
                        value: null,
                        source: null,
                        art: 'timeline',
                        to: null,
                    },
                    {
                        id: 'legacy',
                        kind: 'stat',
                        title: 'Projetos antigos, públicos',
                        text: 'Bots de Discord em Node.js, sites em Express e Fastify com HTML e CSS, e a configuração de um servidor de Minecraft.',
                        value: `${legacy.folders}`,
                        source: 'Repositório kmadsdev/glitch-legacy-projects',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'visitors',
                        kind: 'stat',
                        title: 'Visitantes por mês',
                        text: `O ${site.domain} e os apps dentro dele respondem ${site.requests} requisições por mês.`,
                        value: site.monthlyVisitors,
                        source: `Analytics da Cloudflare para o ${site.domain}`,
                        art: null,
                        to: null,
                    },
                ],
                tools: facts.chapterTools.fullstack,
                proof: [
                    { label: 'glitch-legacy-projects', to: legacy.repo },
                    { label: 'Anos de Discord', to: '#exp-discord' },
                    { label: `Landing page do ${trocatine.name}`, to: '#app-trocatine' },
                    { label: `Site do ${c.name}`, to: '#app-consignado' },
                    { label: 'Código-fonte deste site', to: site.repo },
                ],
            },
            {
                id: 'finance',
                label: 'Sistemas financeiros',
                poster: 'Margem',
                headline: 'Sei como funcionam uma decisão de cartão e um crédito consignado, regra por regra.',
                lead: `Cartões no ${picpay.name}, só em palavras. Crédito consignado, um motor de cartões e um payment gateway nos meus próprios projetos, com dados sintéticos.`,
                paragraphs: [
                    [
                        'No ',
                        link(picpay.name, '#exp-picpay'),
                        ' eu trabalho com ',
                        link('aquisição e upgrade de cartões', '#case-cards'),
                        `: os motores que decidem, em tempo real, se um cliente recebe um cartão e qual. Os mesmos serviços respondem solicitações de clientes que chegam pelo Banco Central e auditorias internas. Descrevo esse trabalho só em palavras, porque o código e os números pertencem ao ${picpay.name}.`,
                    ],
                    [
                        'Para mostrar o mesmo domínio com código público, construí três projetos meus com dados sintéticos. O ',
                        link('consignado-api', '#app-consignado'),
                        ` é uma API de crédito consignado. A parcela sai da folha de pagamento, então o convênio limita a fatia do salário líquido que as parcelas podem ocupar. Com salário líquido de ${mBr.netSalary} e limite de ${mBr.capPercent}, a margem é de ${mBr.marginLimit}. Um empréstimo de ${mBr.principal} em ${mBr.termMonths} meses, a ${mBr.monthlyRate} ao mês, tem parcela fixa de ${mBr.installment} na tabela Price. A API compara a maior parcela, ${mBr.largestInstallment}, com a margem livre, na simulação e de novo na aprovação.`,
                    ],
                    [
                        'O ',
                        link('motor de cartões de crédito', '#app-credit-card-engine'),
                        ` tem um fluxo de aquisição para clientes novos e um de upgrade para clientes existentes, ${card.variantCount} variantes de cartão e um módulo de policy que salva cada decisão com os motivos. O `,
                        link('payment gateway', '#app-payment-gateway'),
                        ' em Go faz authorize, capture e refund com idempotency keys, um ledger em partidas dobradas e webhooks assinados. Nenhum dos três tem clientes reais ou dinheiro real. O README do consignado-api lista o que não foi construído, por exemplo IOF, CET e a integração com a folha.',
                    ],
                ],
                tiles: [
                    {
                        id: 'margin',
                        kind: 'art',
                        title: 'A regra da margem, na prática',
                        text: `Salário líquido de ${mBr.netSalary} a ${mBr.capPercent} dá ${mBr.marginLimit}. A maior parcela, ${mBr.largestInstallment}, cabe.`,
                        value: null,
                        source: null,
                        art: 'margin',
                        to: null,
                    },
                    {
                        id: 'pairs',
                        kind: 'stat',
                        title: 'Pares de estados testados',
                        text: `Uma tabela de transições decide cada passagem entre os ${c.contractStates} estados do contrato. Um teste de unidade cobre todos os pares.`,
                        value: `${c.statusPairs}`,
                        source: 'README do consignado-api, seção Tests',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'variants',
                        kind: 'stat',
                        title: 'Variantes de cartão, uma policy',
                        text: `Débito, Crédito Base até ${br(card.variants.base)}, Platinum até ${br(card.variants.platinum)} e Black acima disso.`,
                        value: `${card.variantCount}`,
                        source: 'Repositório kmadsdev/credit-card-engine',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'synthetic',
                        kind: 'note',
                        title: 'Só dados sintéticos',
                        text: `${c.data.agreements} convênios, ${c.data.customers} clientes, ${c.data.simulations} simulações e ${c.data.contracts} contratos. Nenhum cliente real e nenhuma oferta de crédito.`,
                        value: null,
                        source: null,
                        art: null,
                        to: null,
                    },
                ],
                tools: facts.chapterTools.finance,
                proof: [
                    { label: 'Motores de cartões', to: '#case-cards' },
                    { label: c.name, to: '#app-consignado' },
                    { label: 'Motor de cartões de crédito', to: '#app-credit-card-engine' },
                    { label: 'Payment gateway', to: '#app-payment-gateway' },
                ],
            },
            {
                id: 'ai',
                label: 'Agentes de IA para código',
                poster: 'Um contexto',
                headline: 'Dou aos agentes de IA regras, ferramentas e um contexto compartilhado.',
                lead: `Antes do kickoff do ${bodyshop.name}, escrevi o template de onde partiram os agentes das ${bodyshop.teamSize} pessoas do time.`,
                paragraphs: [
                    [
                        'O ',
                        link('Agentic Template', '#app-agentic'),
                        ' é uma estrutura de repositório: arquivos compartilhados de tarefas, progresso e conhecimento, regras de teste primeiro e um conjunto fixo de servidores MCP e skills. No ',
                        link(bodyshop.name, '#case-bodyshop'),
                        ` os agentes das ${bodyshop.teamSize} pessoas partiram desse mesmo contexto.`,
                    ],
                    [
                        'O ',
                        link('Ruph', '#app-ruph'),
                        ' tem um servidor MCP ao lado do dashboard web, da API REST e da CLI. Um agente pode escrever um plano por ele. Só uma pessoa aprova um plano, e cada apply vai para um ledger append-only.',
                    ],
                    ['Trabalho com Claude Code e Codex com regras de teste primeiro: o teste existe antes do código. Desde 2025 também estudo a camada abaixo do agente: modelos locais, quantização e fine-tuning.'],
                ],
                tiles: [
                    {
                        id: 'context',
                        kind: 'stat',
                        title: 'Pessoas, um contexto de agente',
                        text: `Arquivos de tarefas, progresso e conhecimento que cada agente do time do ${bodyshop.name} lia primeiro.`,
                        value: `${bodyshop.teamSize}`,
                        source: `Time do ${bodyshop.name} no ${picpay.name}`,
                        art: null,
                        to: null,
                    },
                    {
                        id: 'entries',
                        kind: 'stat',
                        title: 'Entradas do Ruph',
                        text: 'Web, REST, CLI e um servidor MCP usam a mesma API. Um agente planeja e uma pessoa aprova.',
                        value: `${ruph.entries}`,
                        source: 'Ruph, minha própria plataforma',
                        art: null,
                        to: null,
                    },
                    {
                        id: 'template',
                        kind: 'link',
                        title: 'Agentic Template',
                        text: 'A página pública do template: arquivos, regras, servidores MCP e skills.',
                        value: null,
                        source: null,
                        art: null,
                        to: facts.projects.agentic.live,
                    },
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
                label: 'De ponta a ponta',
                poster: null,
                headline: 'Levo um projeto do primeiro commit até um endereço no ar.',
                lead: 'Nos meus projetos eu faço o desenho, o código, os testes, a infraestrutura e o deploy, e pago a fatura.',
                paragraphs: [
                    [
                        'O ',
                        link(c.name, '#app-consignado'),
                        ' e o ',
                        link('Ruph', '#app-ruph'),
                        ' são os dois maiores. ',
                        link(`${facts.appOrder.live.length} aplicações`, '#applications-live'),
                        ' rodam em produção hoje, e ',
                        link(`${facts.appOrder.study.length} repositórios de estudo`, '#applications-study'),
                        ' têm código público.',
                    ],
                ],
                tiles: [
                    {
                        id: 'live',
                        kind: 'link',
                        title: 'Em produção',
                        text: `${c.name}, minha própria plataforma e os apps públicos. Todos rodam em um endereço no ar, e só eu consigo entrar no Ruph.`,
                        value: null,
                        source: null,
                        art: null,
                        to: '#applications-live',
                    },
                    {
                        id: 'study',
                        kind: 'link',
                        title: 'Repositórios de estudo',
                        text: 'Um motor de cartões, um payment gateway e dois desafios, com código-fonte público.',
                        value: null,
                        source: null,
                        art: null,
                        to: '#applications-study',
                    },
                ],
                tools: facts.chapterTools.endtoend,
                proof: [
                    { label: 'Aplicações em produção', to: '#applications-live' },
                    { label: 'Projetos de estudo e repositórios', to: '#applications-study' },
                ],
            },
        ],

        // Rótulos dos desenhos. Estrutura e números: facts.art.
        // `summary` é o desenho em texto (leitores de tela, movimento reduzido).
        art: {
            requestPath: {
                title: `Caminho de uma requisição no ${c.name}`,
                summary: 'Uma requisição sai do navegador para um Worker da Cloudflare. As páginas vêm de um site estático no Blob Storage. As chamadas de API vão para um gateway em Java no Azure Functions. O gateway encaminha para o host serverless ou, por um load balancer interno, para os pods no AKS. Os dois hosts rodam o mesmo jar e usam um único banco de dados PostgreSQL.',
                groups: { cloudflare: 'Cloudflare', azure: 'Azure' },
                nodes: {
                    browser: { label: 'Navegador', note: 'Visitante ou usuário autenticado' },
                    edge: { label: 'Worker da Cloudflare', note: `TLS, cache, ${c.rateLimit.requests} requisições a cada ${c.rateLimit.seconds} s por IP` },
                    site: { label: 'Site estático', note: 'Blob Storage' },
                    gateway: { label: 'Gateway em Java', note: 'Azure Functions. Valida o token, aplica limites, gera o trace' },
                    function: { label: 'Host serverless', note: 'O jar da API no Azure Functions' },
                    balancer: { label: 'Load balancer interno', note: 'Sem endereço público' },
                    pods: { label: 'Pods no AKS', note: `O mesmo jar, ${c.cluster.pods} pods` },
                    database: { label: c.database.engine, note: 'Um banco de dados para os dois hosts' },
                },
                edges: [
                    'HTTPS',
                    'Páginas, em cache',
                    'Chamadas de API, com a chave do edge',
                    'Rota serverless, com a chave do host',
                    'Rota do Kubernetes, endereço privado',
                    'Service',
                    'SQL com TLS',
                    'SQL com TLS',
                ],
            },
            trace: {
                title: 'Duas requisições reais, por etapa',
                summary: `Uma escrita autenticada, com o host quente, levou ${art.trace.warm.totalMs} ms no gateway, com ${warmDb} ms no banco de dados em ${art.trace.warm.statements.total} comandos SQL. A primeira chamada depois de um tempo parado levou ${br((art.trace.cold.totalMs / 1000).toFixed(1))} s, e o cold start do host serverless usou 18,6 s disso.`,
                total: 'Total no gateway',
                noTime: 'Sem tempo no trace',
                statements: 'comandos SQL',
                warm: { label: 'Chamada quente', note: 'Cadastro de um cliente, autenticado, host serverless' },
                cold: { label: 'Chamada fria', note: 'Simulação de um visitante, primeira chamada depois de um tempo parado' },
                stages: {
                    request: 'Requisição',
                    edge: 'Edge',
                    gateway: 'Gateway',
                    identity: 'Validação do token',
                    keyvault: 'Key Vault',
                    host: 'Host do Functions',
                    coldStart: 'Cold start do host',
                    app: 'Aplicação',
                    database: 'Banco de dados',
                    response: 'Resposta',
                },
            },
            contractStates: {
                title: 'Estados do contrato no consignado-api',
                summary: 'Uma simulação vira um contrato proposto. Um contrato proposto é aprovado, rejeitado ou cancelado. Um contrato aprovado fica ativo ou é cancelado. Um contrato ativo é liquidado ou cancelado. Rejeitado, liquidado e cancelado são estados finais.',
                states: {
                    SIMULATED: 'Simulado',
                    PROPOSED: 'Proposto',
                    APPROVED: 'Aprovado',
                    REJECTED: 'Rejeitado',
                    ACTIVE: 'Ativo',
                    SETTLED: 'Liquidado',
                    CANCELLED: 'Cancelado',
                },
                transitions: {
                    propose: 'Criar o contrato',
                    approve: 'Aprovar, com a margem conferida de novo',
                    reject: 'Rejeitar',
                    cancel: 'Cancelar',
                    activate: 'Ativar, com as parcelas gravadas',
                    settle: 'Liquidar',
                },
            },
            clouds: {
                title: 'Três clouds, por serviço',
                summary: `AWS: trabalho no ${picpay.name} e o MVP do ${hivemind.name}. GCP: Ruph, minha própria plataforma. Azure: ${c.name}, meu próprio projeto.`,
                aws: {
                    name: 'AWS',
                    context: `${picpay.name} e ${hivemind.name}`,
                    nodes: {
                        cloudfront: { label: 'CloudFront', use: `Entrega as imagens do ${bodyshop.name} e o app do ${survey.name}` },
                        s3: { label: 'S3', use: `Imagens do ${bodyshop.name} em caminhos fixos, arquivos de modelo do ${hivemind.name}` },
                        sqs: { label: 'SQS', use: `Fila entre o pedido do app e o serviço de imagens do ${bodyshop.name}` },
                        ec2: { label: 'EC2', use: `API e serviço de ML do ${hivemind.name}` },
                        rds: { label: 'RDS', use: `PostgreSQL no ${picpay.name}: contas de clientes, cartões emitidos, transações` },
                    },
                },
                gcp: {
                    name: 'GCP',
                    context: 'Ruph, minha própria plataforma',
                    nodes: {
                        cloudRun: { label: 'Cloud Run', use: 'Roda a API do Ruph' },
                        cloudSql: { label: 'Cloud SQL', use: 'PostgreSQL do ledger' },
                        secretManager: { label: 'Secret Manager', use: 'Origem dos segredos' },
                        iam: { label: 'IAM', use: 'Regras de acesso, gerenciadas pelo Terraform' },
                        terraform: { label: 'Terraform', use: 'Cria e altera os recursos' },
                        actions: { label: 'GitHub Actions', use: 'Testes, e deploy depois dos health checks' },
                    },
                },
                azure: {
                    name: 'Azure',
                    context: `${c.name}, meu próprio projeto`,
                    nodes: {
                        aks: { label: 'AKS', use: `${c.cluster.nodes} node, de ${c.cluster.pods} a ${c.cluster.podsMax} pods, parado por padrão` },
                        functions: { label: 'Azure Functions', use: 'O gateway e o host serverless' },
                        blob: { label: 'Blob Storage', use: 'O site estático' },
                        keyVault: { label: 'Key Vault', use: 'Segredos, montados pelo CSI driver' },
                        postgres: { label: 'Azure Database for PostgreSQL', use: 'Um banco de dados para os dois hosts' },
                        entra: { label: 'Entra ID', use: 'Login, workload identity e OIDC para os deploys' },
                        registry: { label: 'Container Registry', use: 'Imagens com o commit como tag' },
                        tables: { label: 'Table Storage', use: 'Usuários, sessões e estado do motor do gateway' },
                    },
                },
            },
            coldStart: {
                title: 'Subida de um cluster AKS parado',
                summary: `Do pedido da janela até a primeira resposta: ${coldStart}. Control plane ${part.controlPlane}, node ${part.node}, Spring Boot com banco de dados ${part.app}, load balancer ${part.balancer}. Uma execução medida em 17/11/2026.`,
                total: 'Do pedido à primeira resposta',
                parts: {
                    controlPlane: 'Control plane',
                    node: 'Node',
                    app: 'Spring Boot e banco de dados',
                    balancer: 'Load balancer',
                },
            },
            pipeline: {
                title: 'Job de deploy do consignado-api',
                summary: 'A cada push na main: compilar e testar, montar a imagem, entrar com OIDC, enviar a imagem com o commit como tag, ligar o cluster quando ele está parado, aplicar os manifests e esperar o rollout, rodar um smoke test dentro do cluster.',
                stages: {
                    test: { label: 'Build e testes', does: 'Maven verify com PostgreSQL em Testcontainers e a trava de cobertura' },
                    image: { label: 'Imagem', does: 'Monta a imagem do container e roda um smoke test nela' },
                    login: { label: 'Login com OIDC', does: 'O GitHub prova a execução para o Entra ID. Nenhuma senha guardada' },
                    push: { label: 'Push', does: 'Envia a imagem para o registry. A tag é o commit' },
                    cluster: { label: 'Ligar o cluster', does: 'Liga o cluster AKS quando ele está parado' },
                    rollout: { label: 'Rollout', does: 'Aplica os manifests em um namespace e espera os pods' },
                    smoke: { label: 'Smoke test', does: 'Chama a API dentro do cluster e confere o endereço do load balancer' },
                },
            },
            sitePipeline: {
                title: 'Workflow deste site',
                summary: `Testes, build, uma checagem em navegador real e uma checagem de responsividade. Na main: publicar no GitHub Pages, esperar o ${site.domain} servir o commit e conferir cada link.`,
                stages: {
                    test: { label: 'Testes', does: 'Regras de conteúdo e testes de componentes' },
                    build: { label: 'Build', does: 'Build com Vite' },
                    browser: { label: 'Checagem em navegador', does: 'Abre o build em um navegador real' },
                    responsive: { label: 'Checagem de responsividade', does: 'Confere o layout nos tamanhos de tela da lista' },
                    publish: { label: 'Publicação', does: 'Envia o build para o GitHub Pages' },
                    verify: { label: 'Checagem no ar', does: `Espera o ${site.domain} servir este commit e confere cada link` },
                },
            },
            timeline: {
                title: `Trabalho full-stack, de ${person.codingSince} a 2026`,
                summary: 'Bots de Discord em JavaScript em 2018. Sites em Express com HTML e CSS até 2021. A landing page do TrocaTine em 2024. Apps em React e Angular no trabalho em 2025. O site do Consignado Cloud e este site em 2026.',
                items: {
                    bots: { label: 'Bots de Discord', text: 'JavaScript no Glitch' },
                    sites: { label: 'Sites em Express', text: 'Páginas em HTML e CSS ao lado dos bots' },
                    trocatine: { label: `MVP e landing page do ${trocatine.name}`, text: 'MVP em React, landing page em HTML, CSS e JavaScript puros' },
                    work: { label: `Apps no ${picpay.name}`, text: 'App de curadoria em React, app de pesquisas em Angular' },
                    consignado: { label: `Site do ${c.name}`, text: 'Desenha cada requisição a partir do trace' },
                },
            },
            margin: {
                title: 'Conferência de margem de um crédito consignado',
                summary: `Salário líquido de ${mBr.netSalary} vezes o limite de ${mBr.capPercent} dá uma margem de ${mBr.marginLimit}. Um empréstimo de ${mBr.principal} em ${mBr.termMonths} meses, a ${mBr.monthlyRate} ao mês, tem parcela de ${mBr.installment}. A maior parcela é de ${mBr.largestInstallment}, abaixo da margem, então o empréstimo cabe. Com renda de ${refused.income} o limite é de ${refused.marginLimit}, e a API recusa com status ${refused.status}.`,
                rule: 'A maior parcela precisa caber na margem livre.',
                labels: {
                    netSalary: 'Salário líquido',
                    cap: 'Limite do convênio',
                    marginLimit: 'Margem',
                    principal: 'Empréstimo',
                    term: 'Meses',
                    rate: 'Taxa ao mês',
                    installment: 'Parcela',
                    largest: 'Maior parcela',
                    total: 'Total a pagar',
                    fits: 'Cabe na margem',
                    refused: 'Recusado: renda baixa demais',
                    synthetic: 'Exemplo do README. Números sintéticos.',
                },
            },
        },
    },

    // ─── pt.experience ──────────────────────────────────────────────────────
    // "Experience": company, period, role, responsibilities, impact. Under each company:
    // the case files of the projects I built or led there (ids of cases).
    experience: {
        label: 'Experiência',
        title: 'Onde trabalhei e o que mudei em cada lugar.',
        lead: 'Uma fintech, dois MVPs de startup e cinco anos de bots de Discord.',
        labels: {
            current: 'Atual',
            responsibilities: 'Responsabilidades',
            impact: 'Impacto',
            projects: 'Projetos',
            tools: 'Ferramentas de entrega',
            stack: 'Stack',
        },
        items: [
            {
                id: 'picpay',
                anchor: 'exp-picpay',
                company: picpay.name,
                context: `Fintech brasileira com cerca de ${picpay.registeredUsers} de usuários cadastrados e ${picpay.activeUsers} ativos.`,
                current: true,
                roles: [
                    {
                        title: 'Engenheiro de Software, Financeiro',
                        period: period(picpay.fullTime, 'pt'),
                        note: 'Área de cartões, aquisição de crédito. Também o Hub de Veículos na área de contas e o time de engenharia da área de RH.',
                    },
                    {
                        title: 'Engenheiro de Software, RH',
                        period: period(picpay.partTime, 'pt'),
                        note: 'TI corporativa, squad de Oracle HCM. Contato próximo com RH, Jurídico e Compliance.',
                    },
                ],
                responsibilities: [
                    `Escrevo e mantenho microsserviços em Java (Spring Boot, JPA) e Go na área de cartões, com mensageria, CI/CD e observabilidade. A área roda ${cards.microservices} microsserviços e sistemas legados que respondem milhões de requisições de centenas de milhares de clientes.`,
                    'Analiso incidentes em vários microsserviços e cuido da confiabilidade do backend.',
                    'Desenho arquitetura dentro das diretrizes de compliance da empresa.',
                    `Faço o trabalho de CI/CD e de testes unitários em ${picpay.delivery.join(', ').replace(/, ([^,]*)$/, ' e $1')}.`,
                    'Modelo bancos de dados e otimizo consultas.',
                ],
                impact: [
                    `Encontrei e corrigi bugs e defeitos escondidos em ${cards.legacySystems} sistemas legados em Java, resolvi centenas de incidentes de clientes e criei jobs de autocorreção que limpam o banco de dados sem trabalho manual.`,
                    `Liderei ${bodyshop.engineersLed} engenheiros no ${bodyshop.name}: ${bodyshop.services} serviços internos, feitos para trocar a imagem errada ou genérica de carro que ${br(bodyshop.customers)} de clientes veem. Tomei as decisões de stack e de escopo e levei o projeto até QA com aprovação da governança.`,
                    `Escrevi o Agentic Template do ${bodyshop.name} antes do kickoff: arquivos compartilhados de tarefas, progresso e conhecimento, regras de teste primeiro, servidores MCP e skills. Os agentes de IA das ${bodyshop.teamSize} pessoas do time trabalharam a partir de um só contexto.`,
                    `No ${survey.name}, em um time de ${survey.teamSize} pessoas, trabalhei na API de backend, na modelagem e nos índices do MySQL e na infraestrutura de uma plataforma de pesquisas para cerca de ${br(survey.employees)} funcionários.`,
                    `No squad de Oracle HCM, deixei consultas em ${oracle.tables} tabelas e views de ${oracle.speedupMin} a ${oracle.speedupMax} vezes mais rápidas, e o trabalho economizou centenas de horas de pesquisa de engenheiros e analistas.`,
                ],
                tools: picpay.delivery,
                stacks: [],
                projects: ['cards', 'bodyshop', 'survey', 'oracle'],
                links: [],
            },
            {
                id: 'cofounder',
                anchor: 'exp-cofounder',
                company: `${hivemind.name} e ${trocatine.name}`,
                context: 'Dois MVPs de startup em pré-lançamento, apresentados ao público na ExpoTech. Não foram empregos em tempo integral, e não tiveram usuários reais.',
                current: false,
                roles: [
                    {
                        title: 'Cofundador',
                        period: period(startups, 'pt'),
                        note: `${trocatine.name} em ${trocatine.year}, ${hivemind.name} em ${hivemind.year}.`,
                    },
                ],
                responsibilities: [
                    `${hivemind.name} (lead scoring B2B): liderei ${hivemind.developersLed} desenvolvedores no time de backend e dados, treinei os modelos e construí um serviço em FastAPI na AWS que carrega o modelo mais novo do S3 e faz a troca sem novo deploy.`,
                    `${trocatine.name} (troca de roupas e brinquedos infantis): liderei o time de frontend de ${trocatine.frontendTeam} pessoas no MVP, feito em React e Tailwind CSS. Cuidei do backend dele em Java (Jakarta EE, JSP, JDBC, Apache Tomcat) e dos bancos de dados PostgreSQL na Aiven e no Docker.`,
                    `A landing page pública do ${trocatine.name} é um site separado, em HTML, CSS e JavaScript puros.`,
                ],
                impact: [
                    `O modelo do ${hivemind.name} foi de ${hivemind.modelBefore} para ${br(hivemind.modelAfter)}, e o custo de armazenamento dele caiu até ${br(hivemind.storageSaving)}.`,
                    `Cerca de ${br(hivemind.visitors)} visitantes da ExpoTech deram nota ${br(hivemind.rating)} ao ${hivemind.name}.`,
                    `Cerca de ${br(trocatine.visitors)} visitantes da ExpoTech deram nota ${br(trocatine.rating)} ao ${trocatine.name}.`,
                ],
                tools: [],
                stacks: [
                    { label: `MVP do ${trocatine.name}`, items: trocatine.mvpStack },
                    { label: hivemind.name, items: facts.cases.hivemind.stack },
                ],
                projects: ['hivemind'],
                links: [{ label: `Landing page do ${trocatine.name}`, to: '#app-trocatine' }],
            },
            {
                id: 'discord',
                anchor: 'exp-discord',
                company: 'Comunidades de Discord',
                context: 'Autodidata e autônomo. Foi onde aprendi a programar.',
                current: false,
                roles: [
                    {
                        title: 'Desenvolvedor de bots e aplicações',
                        period: years(earlier.discord),
                        note: 'JavaScript (Node.js, Discord.js), Java para servidores de Minecraft, SQLite e MySQL. Hospedagem no Glitch e na Discloud.',
                    },
                ],
                responsibilities: [
                    'Construí bots de moderação, tickets, pesquisas, música e jogos (um RPG e um simulador de vida), além de webhooks.',
                    `Construí o ${earlier.discord.bridge}, uma ponte de chat entre um servidor de Minecraft e o Discord: quem está no jogo conversa com quem está no Discord.`,
                ],
                impact: [
                    `Os bots rodaram em comunidades de até ${earlier.discord.members} membros.`,
                    `${legacy.folders} projetos daqueles anos estão públicos em um repositório.`,
                ],
                tools: [],
                stacks: [{ label: 'Bots', items: earlier.discord.stack }],
                projects: [],
                links: [{ label: 'glitch-legacy-projects', to: legacy.repo }],
            },
        ],
    },

    // ─── pt.cases ───────────────────────────────────────────────────────────
    // Case files: one problem, the decisions, the result and a flowchart.
    // flow.nodes: one label per node id of facts.cases[id].flow.nodes.
    // flow.steps: one sentence per edge of facts.cases[id].flow.edges, in the same order.
    // flow: null = words only, no chart.
    cases: {
        label: 'Casos',
        labels: {
            problem: 'O problema',
            decisions: 'O que eu decidi',
            result: 'O resultado',
            flow: 'Como funciona',
            stack: 'Stack',
            step: 'Passo',
            links: 'Links',
            prev: 'Passo anterior',
            next: 'Próximo passo',
            play: 'Reproduzir os passos',
            pause: 'Pausar os passos',
            wordsOnly: 'Só texto. Os sistemas e os dados pertencem à empresa.',
        },
        items: [
            {
                id: 'cards',
                anchor: 'case-cards',
                kicker: `${picpay.name} · área de cartões · em produção`,
                title: 'Motores de cartões: quem recebe qual cartão',
                problem: `A área de cartões decide crédito em tempo real: pedidos de cartão novo, pedidos de upgrade e solicitações de clientes que chegam pelo Banco Central ou por auditoria interna. O trabalho roda em ${cards.microservices} microsserviços em Java e Go e nos sistemas legados em volta deles. Eles respondem milhões de requisições de centenas de milhares de clientes.`,
                decisions: [
                    'Escrevo e mantenho os serviços em Java (Spring Boot, JPA) e Go dos fluxos de aquisição e upgrade, com mensageria, CI/CD e observabilidade.',
                    'Sigo um incidente pelos microsserviços até achar o defeito. Depois escrevo o teste, e depois a correção.',
                    'Criei jobs de autocorreção que limpam o banco de dados sem trabalho manual.',
                ],
                result: `Encontrei e corrigi bugs e defeitos escondidos em ${cards.legacySystems} sistemas legados em Java e resolvi centenas de incidentes de clientes.`,
                stats: [
                    { value: cards.microservices, label: 'microsserviços na área' },
                    { value: `${cards.legacySystems}`, label: 'sistemas legados em Java com correções' },
                ],
                flow: null,
            },
            {
                id: 'bodyshop',
                anchor: 'case-bodyshop',
                kicker: `${picpay.name} · plataforma interna · em QA`,
                title: `${bodyshop.name}: a imagem do carro de cada cliente`,
                problem: `${br(bodyshop.customers)} de clientes abriam o app e viam um carro que não era o deles: uma imagem genérica, ou o modelo, o ano ou a cor errados. Um estudo interno mostrou que satisfação e retenção podem subir quando o carro exato aparece.`,
                decisions: [
                    'Gerar uma vez só. Uma imagem para cada marca, modelo, ano e cor. Um registro responde antes de qualquer modelo ser chamado.',
                    'Reservar o caminho no storage primeiro. A imagem sempre fica no mesmo caminho do S3, então uma imagem melhor substitui a ruim e o app não precisa de release.',
                    `Deixar as pessoas corrigirem a máquina. A equipe escreve o que está errado, um modelo mais preciso devolve ${bodyshop.curationVariants} variações, e a escolhida sobrescreve o arquivo antigo.`,
                    'Gerar fora do caminho da requisição. O pedido de um carro novo entra em uma fila SQS. O serviço de imagens pega o pedido na fila, grava a imagem no S3 e os dados do carro no MongoDB.',
                    'Um monólito em camadas em Go com APIs REST, MongoDB como registro indexado e S3 atrás do CloudFront.',
                ],
                result: `No piloto, ${br(bodyshop.approvalRate)} das imagens foram aprovadas já na geração, sem curadoria manual, em menos de ${bodyshop.endToEnd} do pedido até a imagem. O time rodou testes de latência, disponibilidade, concorrência e segurança em QA, com aprovação da governança.`,
                stats: [
                    { value: br(bodyshop.customers), label: 'clientes no escopo' },
                    { value: br(bodyshop.approvalRate), label: 'aprovadas na geração (piloto)' },
                    { value: `< ${bodyshop.endToEnd}`, label: 'do pedido até a imagem' },
                    { value: `${bodyshop.engineersLed}`, label: 'engenheiros que liderei' },
                ],
                flow: {
                    title: 'Gerar uma vez, depois curar',
                    nodes: {
                        app: 'App do cliente',
                        api: 'API em Go (Gin)',
                        registry: 'Registro de veículos (MongoDB)',
                        model: 'Modelo de imagem',
                        storage: 'Amazon S3',
                        cdn: 'CloudFront',
                        curation: 'App de curadoria (React)',
                    },
                    steps: [
                        'O app pede a imagem de um carro: marca, modelo, ano e cor.',
                        'A API consulta o registro. Um carro que já tem imagem recebe o caminho na hora.',
                        'Para um carro novo, a API reserva um caminho no S3.',
                        'A API coloca o pedido em uma fila SQS. O serviço de imagens pega o pedido e chama o modelo uma única vez, com as regras de negócio.',
                        'A imagem é gravada no caminho reservado.',
                        'O CloudFront entrega a imagem ao app.',
                        'Uma pessoa da equipe marca uma imagem ruim e escreve o que corrigir.',
                        `A API chama um modelo mais preciso e recebe ${bodyshop.curationVariants} variações.`,
                        'A variação escolhida sobrescreve o mesmo caminho. O app mostra a imagem nova sem release.',
                    ],
                },
            },
            {
                id: 'survey',
                anchor: 'case-survey',
                kicker: `${picpay.name} · plataforma interna`,
                title: `${survey.name}: uma plataforma no lugar de várias ferramentas pagas`,
                problem: `Cerca de ${br(survey.employees)} funcionários respondiam pesquisas de NPS e de clima em várias ferramentas pagas, com pouco espaço para customizar e pouco controle de privacidade. O primeiro plano para a substituta era um conjunto de microsserviços.`,
                decisions: [
                    'Perguntei por que o plano precisava de microsserviços. Um produto, um time e um banco de dados não precisavam. O time mudou para um monólito em camadas.',
                    'Trabalhei na API de backend e nos testes de CI/CD dela, em PHP (Hyperf).',
                    'Planejei o schema e os índices do MySQL para os dados de pesquisas e respostas, com Redis como cache.',
                ],
                result: 'A estrutura antiga custava dezenas de milhares de dólares por ano em licenças. A economia projetada é de centenas de milhares de reais por ano, com mais controle da privacidade e das perguntas.',
                stats: [
                    { value: br(survey.employees), label: 'funcionários atendidos' },
                    { value: `${survey.teamSize}`, label: 'pessoas no time' },
                    { value: '1', label: 'monólito no lugar de um plano de microsserviços' },
                ],
                flow: {
                    title: 'Uma requisição, um serviço',
                    nodes: {
                        people: 'Funcionários',
                        cdn: 'CloudFront',
                        web: 'App em Angular',
                        api: 'API em PHP (Hyperf)',
                        cache: 'Redis',
                        db: 'MySQL',
                    },
                    steps: [
                        'Um funcionário abre uma pesquisa.',
                        'O CloudFront entrega o app em Angular.',
                        'O app envia as respostas para uma única API.',
                        'A API lê os dados da pesquisa no cache do Redis.',
                        'A API grava as respostas no MySQL, em tabelas indexadas.',
                    ],
                },
            },
            {
                id: 'oracle',
                anchor: 'case-oracle',
                kicker: `${picpay.name} · dados de RH`,
                title: 'Oracle HCM: um mapa para dados que não tinham nenhum',
                problem: `Centenas de bancos de dados do Oracle Cloud HCM, e nenhuma documentação. As pessoas continuavam escrevendo consultas novas em cima de views legadas de ${oracle.viewLines} linhas, sem índice e sem cache.`,
                decisions: [
                    'Li os próprios dados para descobrir o que cada tabela e cada coluna significa, e registrei tudo em um índice.',
                    `Reescrevi consultas grandes em ${oracle.tables} tabelas e views. Elas foram de milhares de linhas para centenas e ficaram de ${oracle.speedupMin} a ${oracle.speedupMax} vezes mais rápidas.`,
                    'Escrevi automações em SQL e consultas de apoio à decisão em cima do índice.',
                    'Planejei uma modelagem de banco de dados que substitui as views legadas.',
                ],
                result: 'O índice economizou centenas de horas de pesquisa de engenheiros e analistas, e o RH recebeu dados organizados para modelos preditivos.',
                stats: [
                    { value: '100+', label: 'bancos de dados mapeados' },
                    { value: `${oracle.speedupMin} a ${oracle.speedupMax}x`, label: 'consultas mais rápidas' },
                    { value: oracle.viewLines, label: 'linhas em uma view legada' }
                ],
                flow: {
                    title: 'De dados desconhecidos a respostas',
                    nodes: {
                        hcm: 'Oracle Cloud HCM',
                        map: 'Índice dos dados',
                        queries: 'Automações em SQL',
                        views: 'Views legadas',
                        design: 'Nova modelagem',
                        science: 'Modelos preditivos',
                    },
                    steps: [
                        'Mapeio cada banco de dados: tabelas, colunas e o que elas significam.',
                        'As consultas e automações usam o índice, não um palpite.',
                        'A modelagem que substitui as views legadas sai do mesmo índice.',
                        'Os dados de RH organizados vão para o time de ciência de dados.',
                    ],
                },
            },
            {
                id: 'hivemind',
                anchor: 'case-hivemind',
                kicker: `MVP de startup · ${hivemind.year}`,
                title: `${hivemind.name}: um modelo de ${hivemind.modelBefore} que virou ${br(hivemind.modelAfter)}`,
                problem: `O ${hivemind.name} calcula o quanto uma empresa combina com um produto, a partir de um questionário curto. O primeiro modelo era um arquivo de Random Forest com cerca de ${hivemind.modelBefore}, guardado no S3 e carregado pela API.`,
                decisions: [
                    `Troquei o modelo de Random Forest por Regressão Logística: cerca de ${hivemind.trainingAccuracy} de acurácia de treino em um arquivo de ${br(hivemind.modelAfter)}.`,
                    'Construí um serviço em FastAPI que carrega o modelo mais novo do S3 e faz a troca em execução. Um modelo novo não precisa de novo deploy.',
                    'Modelei os dados em PostgreSQL, MongoDB e Redis e montei o CI/CD na AWS e no GitHub.',
                ],
                result: `O custo de armazenamento dos modelos caiu até ${br(hivemind.storageSaving)}. Cerca de ${br(hivemind.visitors)} visitantes da ExpoTech ${hivemind.year} deram nota ${br(hivemind.rating)} ao produto. Era um MVP em pré-lançamento, sem usuários reais.`,
                stats: [
                    { value: br(hivemind.modelAfter), label: `arquivo do modelo, antes ${hivemind.modelBefore}` },
                    { value: br(hivemind.storageSaving), label: 'a menos no custo de armazenamento' },
                    { value: hivemind.trainingAccuracy, label: 'de acurácia de treino' },
                    { value: br(hivemind.rating), label: `de cerca de ${br(hivemind.visitors)} visitantes` },
                ],
                flow: {
                    title: 'Um modelo novo sem novo deploy',
                    nodes: {
                        train: 'Treino',
                        bucket: 'Amazon S3',
                        api: 'Serviço em FastAPI',
                        client: 'Questionário de vendas',
                    },
                    steps: [
                        'Um treino grava um arquivo de modelo novo no S3.',
                        'O serviço carrega o modelo mais novo e faz a troca em memória.',
                        'O questionário envia as respostas de uma empresa.',
                        'O serviço devolve a nota de compatibilidade.',
                    ],
                },
            },
            {
                id: 'ruph',
                // No anchor of its own: the Applications section shows this case inside app-ruph.
                anchor: null,
                kicker: 'Minha própria plataforma · em produção',
                title: 'Ruph: um control plane para todos os apps que eu mantenho',
                problem: 'Mantenho vários apps em GCP, Cloudflare, Vercel, Supabase e Neon. Eu queria um lugar só que conhecesse cada app e cada ambiente, e queria agentes de IA ajudando no trabalho sem o poder de mudar a produção sozinhos.',
                decisions: [
                    'Um registro de apps e ambientes, com uma única API. O dashboard web, a CLI e o servidor MCP usam a mesma API.',
                    'Nenhuma mudança sem um plano. Um agente ou uma pessoa escreve o plano. Só uma pessoa aprova.',
                    'Cada apply fica gravado em um ledger append-only. Orçamentos avisam ou pausam o trabalho.',
                    'Plugins de provedor para GCP, Cloudflare, Vercel, Supabase e Neon. O Terraform gerencia as regras de acesso.',
                ],
                result: `O Ruph faz o deploy e o provisionamento dos meus próprios apps em QA e em produção. O GitHub Actions roda a suíte de testes e os testes de migração do PostgreSQL, e só faz o deploy depois que os health checks passam. É uma plataforma privada: eu sou o único operador.`,
                stats: [
                    { value: '4', label: 'entradas: web, REST, CLI, MCP' },
                    { value: '5', label: 'provedores de cloud atrás de uma API' },
                ],
                flow: {
                    title: 'Planejar, aprovar, aplicar, registrar',
                    nodes: {
                        agent: 'Agente de IA',
                        human: 'Eu',
                        api: 'API do Ruph (Hono)',
                        ledger: 'Ledger (PostgreSQL)',
                        providers: 'Provedores de cloud',
                        ci: 'GitHub Actions',
                    },
                    steps: [
                        'Um agente escreve um plano pelo servidor MCP ou pela CLI.',
                        'Eu leio o plano e aprovo. Um agente não pode aprovar.',
                        'A API grava o apply no ledger append-only.',
                        'A API muda os recursos nos provedores de cloud.',
                        'O GitHub Actions só publica uma versão nova depois que os testes e os health checks passam.',
                    ],
                },
            },
        ],
    },

    // ─── pt.education ───────────────────────────────────────────────────────
    // "Education": one program and three certificates. Nothing else goes here.
    education: {
        label: 'Formação',
        title: 'Um curso técnico e três certificados.',
        lead: `Três anos no ${edu.institution} e três certificados do HackerRank.`,
        program: {
            id: 'jf',
            anchor: 'edu-jf',
            title: 'Curso Técnico em Desenvolvimento de Software',
            place: edu.institution,
            period: period(edu, 'pt'),
            length: `${edu.years} anos`,
            note: `Previsão de conclusão: ${monthYear(edu.end, 'pt')}.`,
            subjectsLabel: 'Disciplinas',
            subjects: [
                'Engenharia de software, DevOps, SDLC e CI/CD',
                'Desenvolvimento backend e frontend',
                'Modelagem de dados (PostgreSQL, MongoDB, Redis, Neo4j)',
                'Programação orientada a objetos',
                'Ciência de dados e machine learning',
                'Arquitetura de computadores, hardware e sistemas operacionais (Linux)',
                'Git e GitHub: branching e gestão de releases',
            ],
        },
        certificates: {
            anchor: 'edu-certs',
            title: 'Certificados',
            note: 'As três provas cobrem algoritmos, REST APIs, engenharia de software, modelagem de dados, otimização de consultas e window functions. Resolvi as provas em Python, C/C++ e MySQL.',
            items: edu.certificates.map((item) => ({
                id: item.id,
                title: {
                    'software-engineer': 'Software Engineer',
                    'rest-api': 'REST API (Intermediate)',
                    sql: 'SQL (Advanced)',
                }[item.id],
                issuer: item.issuer,
                date: monthYear(item.date, 'pt'),
            })),
        },
    },

    // ─── pt.applications ────────────────────────────────────────────────────
    // "Applications". Names, addresses, stacks and clips: facts.projects.
    // live: facts.appOrder.live, in production. study: facts.appOrder.study, not hosted.
    // The ids of facts.appOrder.featured have an `architecture` and a `goals` block.
    applications: {
        label: 'Aplicações',
        title: 'O que roda hoje, e o que construí para estudar.',
        lead: 'Abra os que estão no ar. Leia o código dos que são públicos.',
        labels: {
            live: 'Abrir no ar',
            source: 'Código-fonte',
            privateSource: 'Código privado',
            stack: 'Stack',
            architecture: 'Arquitetura',
            goals: 'Objetivos',
            statusLive: 'No ar',
            statusStudy: 'Projeto de estudo',
            playClip: 'Reproduzir o clipe',
            pauseClip: 'Pausar o clipe',
        },
        live: {
            anchor: 'applications-live',
            title: 'Em produção',
            lead: 'Cada um roda em um endereço no ar. O Ruph é privado: só eu consigo entrar.',
            items: [
                {
                    id: 'consignado',
                    anchor: 'app-consignado',
                    tagline: 'Uma API em dois hosts da Azure, com cada requisição desenhada',
                    text: 'Uma API de crédito consignado em Java 21 e Spring Boot 3.5 que roda sem alteração como pods no AKS e dentro de uma Azure Function, atrás de um gateway em Java e de um edge na Cloudflare. O site desenha cada requisição como um diagrama ao vivo, com o tempo medido de cada etapa. É uma demonstração técnica com dados sintéticos, sem oferta de crédito.',
                    architecture: [
                        `Edge: um Worker da Cloudflare com TLS, cache para arquivos estáticos e limite de ${c.rateLimit.requests} requisições a cada ${c.rateLimit.seconds} s por IP na API.`,
                        'Gateway: Java 21 no Azure Functions. Ele valida o token do Entra ID, aplica as regras de acesso, liga e desliga o cluster e devolve um trace de cada chamada.',
                        `Hosts: o mesmo jar no Azure Functions (chamada fria de ${br(c.serverless.coldMin)} a ${br(c.serverless.coldMax)} s, chamada quente de ${br(c.serverless.warmMin)} a ${br(c.serverless.warmMax)} s) e no AKS (${c.cluster.nodes} node, ${c.cluster.pods} pods atrás de um load balancer interno, chamada quente em cerca de ${br(c.cluster.warm)} s).`,
                        `Cluster: parado por padrão. Um visitante autenticado liga o cluster por uma janela de ${c.window.minutes} minutos. Uma subida a partir do cluster parado levou ${clusterStart}.`,
                        `Dados e entrega: ${c.database.engine} com Flyway. O Terraform cria os recursos da Azure, e o GitHub Actions faz o deploy de cada repositório com OIDC.`,
                    ],
                    goals: [
                        'Comparar uma API em Kubernetes e em serverless, com custo e latência medidos.',
                        `Ficar dentro de um orçamento mensal de ${c.budget}: o gateway pausa o motor em 100%.`,
                        'Mostrar em código as regras de um crédito consignado: margem, tabela Price, estados do contrato, concorrência otimista e transactional outbox.',
                    ],
                    caseId: null,
                    media: {
                        preview: { caption: 'Um visitante envia uma simulação real para o host serverless. O trace repete a requisição etapa por etapa, e o Request Inspector abre nela.', alt: `Clipe do site do ${c.name}: o formulário de simulação e depois o diagrama da requisição com o tempo de cada etapa.` },
                        lifecycle: { caption: 'O replay de uma subida gravada do cluster AKS, a 8 vezes a velocidade real. O slider pula para 6 min 15 s, e o replay vai até o fim.', alt: `Clipe do site do ${c.name}: o replay da subida de um cluster AKS, etapa por etapa, até o cluster ficar pronto.` },
                        api: { caption: 'A API sozinha, em uma execução local: um convênio, um cliente e um empréstimo de 84 meses.', alt: 'Gravação de terminal: o curl cria um convênio e um cliente, depois simula um empréstimo e mostra a parcela.' },
                        'still-1': { caption: 'A simulação: o formulário com o resultado, e se a parcela cabe na margem.', alt: `Tela do site do ${c.name}: o formulário da simulação com o resultado e a checagem da margem.` },
                        'still-2': { caption: 'Uma simulação com o host quente, em forma de trace, com o Request Inspector aberto na mesma requisição.', alt: `Tela do site do ${c.name}: o trace de uma requisição do navegador até a API Spring Boot, e o painel Request Inspector.` },
                        'still-3': { caption: 'O replay de uma subida do cluster AKS, cada etapa com o tempo medido.', alt: `Tela do site do ${c.name}: o diagrama da subida de um cluster AKS no fim do replay.` },
                    },
                },
                {
                    id: 'ruph',
                    anchor: 'app-ruph',
                    tagline: 'Um control plane para todos os apps que eu mantenho',
                    text: 'Minha própria plataforma. Ela mantém um registro dos meus apps e ambientes atrás de uma única API, e faz o deploy e o provisionamento deles em QA e em produção na GCP, Cloudflare, Vercel, Supabase e Neon. Um agente de IA pode escrever um plano ali, e só uma pessoa aprova. É privada: eu sou o único operador.',
                    architecture: [
                        'Uma API em TypeScript (Hono). O dashboard web, a CLI e o servidor MCP usam a mesma API.',
                        'Cloud Run para a API, Cloud SQL para o ledger em PostgreSQL, Secret Manager para os segredos e Terraform para as regras de acesso.',
                        `O GitHub Actions roda a suíte de testes e os testes de migração do PostgreSQL, e só faz o deploy depois que os health checks passam.`,
                    ],
                    goals: [
                        'Um lugar que conhece cada app e cada ambiente.',
                        'Agentes de IA que ajudam na operação e não mudam a produção sozinhos.',
                        'Um registro de cada apply em um ledger append-only, com orçamentos que avisam ou pausam o trabalho.',
                    ],
                    caseId: 'ruph',
                    media: null,
                },
                {
                    id: 'diabetes',
                    anchor: 'app-diabetes',
                    tagline: `Uma estimativa de risco a partir de ${p.diabetes.inputs} respostas`,
                    text: `Um serviço em FastAPI valida ${p.diabetes.inputs} entradas, carrega o modelo scikit-learn mais novo e devolve uma estimativa de risco com a confiança. O modelo é um Random Forest treinado com dados públicos do Kaggle. Começou como meu projeto final do CS50x. Não é um diagnóstico médico.`,
                    architecture: [
                        `Uma página estática envia as ${p.diabetes.inputs} respostas para a API.`,
                        'O serviço em FastAPI valida cada entrada, roda o modelo e responde com a estimativa e a confiança.',
                        `${p.diabetes.endpoints} endpoints: status, health, models e predict.`,
                    ],
                    goals: [
                        'Levar um modelo de um notebook até uma API no ar.',
                        'Servir o modelo treinado mais novo sem mudar o código.',
                    ],
                    caseId: null,
                    media: null,
                },
                {
                    id: 'offmode',
                    anchor: 'app-offmode',
                    tagline: 'Um timer Pomodoro para foco profundo',
                    text: 'Um timer de foco para web e desktop. Ele acompanha seu tempo de foco entre as sessões, com login e sincronização com o servidor.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'notes',
                    anchor: 'app-notes',
                    tagline: 'Um editor de código em um único arquivo HTML',
                    text: `Um bloco de notas com a cara e o jeito do VS Code, sem backend e sem conta. O Monaco destaca ${p.notes.languages} linguagens. Os arquivos ficam no navegador, ou vão direto para o seu disco no Chrome e no Edge. Tem ${p.notes.previews} previews ao vivo, de Markdown a Mermaid.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'doom',
                    anchor: 'app-doom',
                    tagline: 'Doom em um arquivo, sem servidor',
                    text: `O jogo de 1993 compilado de C para WebAssembly e compactado com gzip em um único arquivo HTML que se descompacta no navegador. O jogo compactado foi de ${p.doom.sizeBefore} para ${br(p.doom.sizeAfter)}. Fiz o projeto para estudar compressão.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'agentic',
                    anchor: 'app-agentic',
                    tagline: 'Um contexto para todos os agentes de IA',
                    text: 'Um template de repositório em que agentes de IA conseguem trabalhar: arquivos de tarefas, progresso e conhecimento, regras de teste primeiro e um conjunto fixo de servidores MCP e skills.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'custom-square',
                    anchor: 'app-custom-square',
                    tagline: 'Um playground de CSS',
                    text: 'Mude propriedades de CSS, gradientes e cores e veja o resultado na hora. JavaScript puro, com o tema salvo no navegador.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'trocatine',
                    anchor: 'app-trocatine',
                    tagline: 'A landing page do meu primeiro MVP de startup',
                    text: `A página pública do ${startups.trocatine.name}, uma plataforma de troca de roupas e brinquedos infantis. Este endereço é só a landing page: HTML, CSS e JavaScript puros no GitHub Pages. O MVP do produto era uma aplicação separada, em React e Tailwind CSS.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
            ],
        },
        study: {
            anchor: 'applications-study',
            title: 'Projetos de estudo e repositórios',
            lead: 'Sem hospedagem. Dados simulados, sem usuários e sem dinheiro real. O código é público.',
            items: [
                {
                    id: 'credit-card-engine',
                    anchor: 'app-credit-card-engine',
                    tagline: 'Quem recebe qual cartão, e por quê',
                    text: `Um motor de cartões em Java 21 e Spring Boot com dois fluxos: aquisição para clientes novos e upgrade para clientes existentes. Quatro variantes: Débito (limite 0), Crédito Base (até ${br(card.variants.base)}), Crédito Platinum (até ${br(card.variants.platinum)}) e Crédito Black (acima de ${br(card.variants.platinum)}). Todas as regras de crédito ficam em um módulo de policy guiado por tabelas, e cada decisão é salva com os motivos.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'payment-gateway',
                    anchor: 'app-payment-gateway',
                    tagline: 'Authorize, capture e refund, sem cobrança em dobro',
                    text: 'Um payment gateway simulado para uma loja online, em Go e PostgreSQL, só backend. Tokenização de cartão e Pix, uma state machine para authorize, capture e refund, idempotency keys, um ledger em partidas dobradas e webhooks assinados via transactional outbox. O CI roda os testes com race detector contra um PostgreSQL real.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'devops-challenge',
                    anchor: 'app-devops-challenge',
                    tagline: 'Quatro containers, um comando',
                    text: `Um sistema distribuído em Docker Compose com ${p['devops-challenge'].containers} containers: um writer em Python, um reader em Go, um front end web em Node.js e o Redis entre eles.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'incident-api',
                    anchor: 'app-incident-api',
                    tagline: 'Alertas e incidentes, com interface de terminal',
                    text: 'Um serviço de alertas e incidentes em PHP (Hyperf, Swoole) que recebe métricas e grava em MySQL e Redis. Vem com uma interface de terminal em Python.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'legacy',
                    anchor: 'app-legacy',
                    tagline: `Onde eu comecei, de ${legacy.from} a ${legacy.to}`,
                    text: `${legacy.folders} projetos dos meus anos de Glitch: bots de Discord em Node.js com Discord.js e SQLite, sites pequenos em Express e Fastify com páginas em HTML e CSS, e a configuração de um servidor de Minecraft. Foi nesse código que eu aprendi.`,
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
                {
                    id: 'student-tools',
                    anchor: 'app-student-tools',
                    tagline: 'Ferramentas gratuitas para estudantes de engenharia',
                    text: 'Uma lista curada das ferramentas e dos créditos gratuitos do GitHub Student Developer Pack. Uma contribuição para a comunidade, sem código.',
                    architecture: null,
                    goals: null,
                    caseId: null,
                    media: null,
                },
            ],
        },
        // Usado pela lista de links no fim da seção.
        more: { text: 'Há mais repositórios no meu perfil do GitHub.', label: 'Perfil no GitHub', to: facts.contact.github },
        siteNote: `O ${site.domain} e os apps dentro dele recebem mais de ${site.monthlyVisitors} visitantes e ${site.requests} requisições por mês, medidos na Cloudflare.`,
    },

    // ─── pt.more ────────────────────────────────────────────────────────────
    // "More": volunteering, languages, hobbies and future projects. Numbers: facts.hobbies.
    more: {
        label: 'Mais',
        title: 'Voluntariado, idiomas e o que eu faço por diversão.',
        lead: 'Gosto de engenharia de performance em servidores, em gabinetes de PC e debaixo do capô de um carro.',
        volunteering: {
            anchor: 'more-volunteering',
            title: 'Voluntariado',
            role: 'Consultor de hardware e TI',
            place: 'Reddit',
            period: years(reddit),
            text: `Ajudei ${reddit.people} pessoas a planejar e montar PCs para jogos, trabalho profissional e servidores: escolha de peças, orçamento e consertos em Windows, macOS e Linux. Foi antes dos assistentes de IA, então cada resposta saía de pesquisa, de benchmarks e das minhas próprias montagens.`,
            communitiesLabel: 'Comunidades',
            communities: reddit.communities,
        },
        languages: {
            anchor: 'more-languages',
            title: 'Idiomas',
            items: [
                { id: 'pt', name: 'Português', level: 'Nativo' },
                { id: 'en', name: 'Inglês', level: 'C1' },
                { id: 'es', name: 'Espanhol', level: 'Básico' },
            ],
        },
        hobbies: {
            anchor: 'more-hobbies',
            title: 'Hobbies',
            items: [
                {
                    id: 'ecu',
                    title: 'Acerto de injeção eletrônica',
                    text: `Estudo a injeção eletrônica e o acerto de Honda Civics de 1990 a 2002. As anotações vão para um acervo aberto na minha segunda conta do GitHub, ${contact.carGithubHandle}.`,
                    link: { label: 'open-civic', to: contact.carRepo },
                },
                { id: 'pc', title: 'Hardware de PC', text: 'Monto PCs e homelabs, e leio os benchmarks antes de comprar uma peça.', link: null },
                { id: 'gym', title: 'Academia', text: `Treino há ${hobbies.gym.years} anos, com foco em hipertrofia e powerlifting. Meu recorde no supino é ${hobbies.gym.bench} e no levantamento terra é ${hobbies.gym.deadlift}.`, link: null },
                { id: 'basketball', title: 'Basquete', text: `Jogo há ${hobbies.basketball.years} ano, nos fins de semana com amigos.`, link: null },
                { id: 'chess', title: 'Xadrez', text: `Jogo há ${hobbies.chess.years} anos e meu rating passa de ${hobbies.chess.rating}. Já venci o ${hobbies.chess.bot}, um bot do ${hobbies.chess.site} com rating ${hobbies.chess.botRating}.`, link: null },
            ],
        },
        future: {
            anchor: 'more-future',
            title: 'Projetos futuros',
            lead: 'Só o que os meus repositórios públicos indicam como planejado.',
            // Mesmos ids e mesma ordem de facts.future. Uma lista vazia esconde o bloco.
            items: [
                { id: 'notes', title: 'Notes: o roadmap', text: 'Suporte offline com service worker, abertura de uma pasta com árvore de arquivos, exportação do preview para PDF e HTML, e trechos compartilhados pela URL.' },
                { id: 'microdoom', title: 'MicroDOOM v1.1', text: 'A próxima versão do meu próprio jogo no estilo Doom, em JavaScript puro. O README marca essa versão como em andamento.' },
            ],
        },
    },

    // ─── pt.figma ───────────────────────────────────────────────────────────
    // The row "From my Figma" of original diagrams. Files, sizes and places: facts.figma,
    // in the order of facts.figmaOrder.
    figma: {
        title: 'Do meu Figma',
        lead: 'Os desenhos que fiz enquanto projetava estes sistemas.',
        open: 'Abrir o diagrama em tamanho original',
        close: 'Fechar o diagrama',
        items: {
            'consignado-aks': {
                title: 'API do consignado no AKS, primeira versão',
                caption: `Meu primeiro desenho do host Kubernetes do ${c.name}: um load balancer, um service, dois pods e PostgreSQL com TLS. A plataforma no ar hoje tem um gateway e um load balancer interno na frente.`,
                alt: 'Diagrama de arquitetura. Um usuário envia HTTP para um load balancer que aceita só endereços IP permitidos. O load balancer envia a requisição para o service consignado-api em um cluster AKS com 2 a 3 pods. Dois pods em Spring Boot se conectam ao Azure PostgreSQL com TLS. Linhas tracejadas saem do cluster para ACR, Key Vault e Entra ID, usados só quando um pod sobe. Logs e métricas vão para o Azure Monitor.',
            },
            'consignado-pod-start': {
                title: 'Como um pod sobe sem segredo guardado',
                caption: 'Sete passos, do agendamento do pod até o primeiro tráfego. As linhas rosa são confiança sem segredo guardado.',
                alt: 'Diagrama de sete passos em linha. 1: o AKS agenda o pod no node. 2: o kubelet baixa a imagem do ACR. 3: o token da service account vira um token da Azure no Entra ID, por workload identity. 4: o CSI driver lê a senha do banco de dados no Key Vault. 5: o container do Spring Boot sobe com a senha. 6: o Flyway migra o Azure PostgreSQL com TLS e o readiness fica ativo. 7: o pod está pronto e o Service envia tráfego para ele.',
            },
            'ruph-ship': {
                title: 'Como o Ruph faz deploy',
                caption: 'Uma mudança no GitHub dispara os testes automáticos e um build. O build vai para QA e depois para PROD. O GitHub entra sem chave guardada (WIF), e o rollback é um clique.',
                alt: 'Fluxograma com o título "How we ship". O GitHub dispara os testes automáticos, que levam a um build do app em um container. O build vai para QA, onde é conferido primeiro, e depois é promovido para PROD. Uma linha tracejada sai do build para a caixa "No stored keys: GitHub proves who it is (WIF)". Uma linha tracejada sai de PROD para "One-click rollback". Uma nota diz que nada chega a PROD sem passar pelos testes e por QA.',
            },
            'devops-challenge': {
                title: 'Arquitetura do desafio de DevOps',
                caption: 'Um navegador, um frontend, um writer em Python e um reader em Go, com o Redis entre os dois serviços.',
                alt: 'Diagrama com quatro caixas. O navegador fala com o frontend por HTTP. O frontend envia e busca dados: faz POST em um serviço writer em Python e GET em um serviço reader em Go. O writer faz POST no Redis e o reader faz GET no Redis.',
            },
        },
    },

    // ─── pt.contact ─────────────────────────────────────────────────────────
    // "Contact" at the end of the page. The address: links.email.
    contact: {
        label: 'Contato',
        title: 'Escreva para mim sobre um sistema, uma vaga ou um bug.',
        text: 'Respondo em português e em inglês. Conte sobre o sistema, o time e o problema, e eu digo como posso ajudar.',
        emailCta: 'Escrever para mim',
        copy: 'Copiar o endereço',
        copied: 'Endereço copiado',
        channels: [
            { id: 'email', label: 'Email', value: facts.contact.email },
            { id: 'linkedin', label: 'LinkedIn', value: facts.contact.linkedinHandle },
            { id: 'github', label: 'GitHub', value: facts.contact.githubHandle },
        ],
    },

    // ─── pt.footer ──────────────────────────────────────────────────────────
    // The last line of the page.
    footer: {
        line: `Desenhado e construído por ${person.name}.`,
        source: 'Código-fonte deste site',
        license: 'Código sob a licença MIT. Os textos e as imagens são meus.',
        top: 'Voltar ao topo',
    },

    // ─── pt.controls ────────────────────────────────────────────────────────
    // Names of the controls that are not part of one section (screen readers, buttons).
    controls: {
        external: 'abre em uma nova aba',
        stopBadge: 'Parar o selo',
        // Textos longos e detalhes abrem no lugar.
        readMore: 'Ler a história completa',
        readLess: 'Mostrar menos',
        showDetails: 'Mostrar os detalhes',
        hideDetails: 'Ocultar os detalhes',
        playBadge: 'Girar o selo',
        pauseDrawing: 'Pausar o desenho',
        playDrawing: 'Continuar o desenho',
    },

    // ─── pt.art ─────────────────────────────────────────────────────────────
    // Drawings that are not in the introduction (labels for screen readers, names on the drawing).
    // Texto das ilustrações (descrições para leitores de tela, nomes nos desenhos)
    // dos desenhos que não estão na introdução.
    art: {
        fuelMap: {
            label: 'Desenho do mapa de combustível de uma central de injeção: uma superfície sobre uma grade de rotação e carga do motor. Um ponto vermelho mostra a célula em uso durante uma aceleração.',
            rpm: 'RPM',
            load: 'Carga',
        },
    },

    // ─── pt.notFound ────────────────────────────────────────────────────────
    // The 404 page (scripts/build-404.mjs writes it at build).
    notFound: {
        title: 'Esta página não existe',
        text: 'O endereço está errado ou a página mudou de lugar. O portfólio é uma página só, e começa aqui:',
        cta: 'Abrir o portfólio',
    },
};

/** All the text of the site: content.en and content.pt. */
export const content = { en, pt };
