// FACTS: every number, date, name, link, anchor and diagram structure of the site.
//
// Both languages read this file. Change a fact here and it changes in English
// and in Portuguese. The files in en/ and pt/ hold sentences only.
//
// Rules for a new fact:
//   1. Kmads gave the number, or a public repository or page shows it. No guesses.
//   2. PicPay cards work: words only ("millions of requests"). No exact count.
//   3. ArgoCD, Tekton and SQS: in the PicPay context only.
//   4. Azure and Kubernetes belong to Consignado Cloud, my own project. Never "at work".
//   5. Number text is written the English way ('8.8M', '2,200'). pt/ files use ptNumber().

const SITE = 'https://kmads.dev';
const GITHUB = 'https://github.com/kmadsdev';
const CONSIGNADO = 'https://consignado.kmads.dev';
const CONSIGNADO_DOCS = `${GITHUB}/consignado-api/blob/main/docs/platform`;

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
// All case files, in the order of `cases.items` in en/ and pt/. `cards` is words only.
const caseFileOrder = ['cards', ...caseOrder];

// Order of the chapters of the introduction.
const chapterOrder = ['architecture', 'backend', 'cloud', 'cicd', 'fullstack', 'finance', 'ai', 'endtoend'];

export const facts = {
    person: {
        name: 'Kaique Souza',
        alias: 'Kmads',
        aliasUpper: 'KMADS',
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
            src: '/assets/me/kmads-portrait-1280.webp',
            small: '/assets/me/kmads-portrait-640.webp',
            width: 1280,
            height: 1280,
        },
    },

    site: {
        url: SITE,
        domain: 'kmads.dev',
        repo: `${GITHUB}/kmadsdev.github.io`,
        workflow: `${GITHUB}/kmadsdev.github.io/blob/main/.github/workflows/deploy.yml`,
        applications: `${SITE}/projects`,
        ogImage: `${SITE}/og.png`,
        // Cloudflare numbers, from the CV of 2026-11-13.
        monthlyVisitors: '4k',
        requests: '350k',
    },

    contact: {
        email: 'contact@kmads.dev',
        github: GITHUB,
        githubHandle: 'kmadsdev',
        linkedin: 'https://linkedin.com/in/kaique-souza-kmads',
        linkedinHandle: 'kaique-souza-kmads',
        // The account for car work. Named on his LinkedIn profile.
        carGithub: 'https://github.com/ej8civic',
        carGithubHandle: 'ej8civic',
        carRepo: 'https://github.com/ej8civic/open-civic',
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
            legacySince: '1990s',
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
        repo: `${GITHUB}/glitch-legacy-projects`,
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
        live: CONSIGNADO,
        liveSince: '2026-11-17',
        repos: {
            api: `${GITHUB}/consignado-api`,
            front: `${GITHUB}/consignado-front`,
            serverless: `${GITHUB}/consignado-serverless`,
        },
        docs: {
            platform: `${CONSIGNADO_DOCS}/README.md`,
            architecture: `${CONSIGNADO_DOCS}/architecture.md`,
            decisions: `${CONSIGNADO_DOCS}/decisions.md`,
            adrs: `${GITHUB}/consignado-api/tree/main/docs/adr`,
            workflow: `${GITHUB}/consignado-api/blob/main/.github/workflows/ci.yml`,
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
            links: [{ label: 'hivemind-ml-api', url: `${GITHUB}/hivemind-ml-api` }],
        },
        // Shown in the applications section (app-ruph), with the same chart component.
        ruph: {
            stack: ['TypeScript', 'Hono', 'React', 'PostgreSQL', 'Cloud Run', 'Cloud SQL', 'Secret Manager', 'Terraform', 'GitHub Actions'],
            flow: {
                nodes: ['agent', 'human', 'api', 'ledger', 'providers', 'ci'],
                edges: [['agent', 'api'], ['human', 'api'], ['api', 'ledger'], ['api', 'providers'], ['ci', 'api']],
            },
            tests: '2,000+',
            entries: 4,
            providers: 5,
            links: [{ label: 'ruph.kmads.dev', url: 'https://ruph.kmads.dev/' }],
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
            live: CONSIGNADO,
            sources: [
                { label: 'consignado-api', url: `${GITHUB}/consignado-api` },
                { label: 'consignado-serverless', url: `${GITHUB}/consignado-serverless` },
                { label: 'consignado-front', url: `${GITHUB}/consignado-front` },
            ],
            // Main clip: the loan preview with the live request diagram (recorded as a guest).
            image: '/assets/projects/consignado-cloud.jpg',
            video: '/assets/projects/consignado-cloud.mp4',
            // More media, in this order. Captions and alt text: applications.live.items[0].media
            // in en/ and pt/ (same ids). The coordinator removes the id of a file that is absent.
            media: [
                { id: 'preview', kind: 'clip', video: '/assets/projects/consignado-cloud.mp4', image: '/assets/projects/consignado-cloud.jpg' },
                { id: 'lifecycle', kind: 'clip', video: '/assets/projects/consignado-lifecycle.mp4', image: '/assets/projects/consignado-lifecycle.jpg' },
                { id: 'api', kind: 'clip', video: '/assets/projects/consignado-api.mp4', image: '/assets/projects/consignado-api.jpg' },
                { id: 'still-1', kind: 'still', image: '/assets/projects/consignado-cloud-1.webp' },
                { id: 'still-2', kind: 'still', image: '/assets/projects/consignado-cloud-2.webp' },
                { id: 'still-3', kind: 'still', image: '/assets/projects/consignado-cloud-3.webp' },
            ],
        },
        ruph: {
            name: 'Ruph',
            status: 'live',
            stack: ['TypeScript', 'Hono', 'React', 'PostgreSQL', 'Cloud Run', 'Cloud SQL', 'Secret Manager', 'Terraform', 'GitHub Actions'],
            live: 'https://ruph.kmads.dev/',
            access: 'private',
        },
        diabetes: {
            name: 'Diabetes Indicator',
            status: 'live',
            stack: ['Python', 'FastAPI', 'scikit-learn', 'Pandas'],
            inputs: 17,
            endpoints: 4,
            live: `${SITE}/diabetes-indicator`,
            source: `${GITHUB}/diabetes-indicator-backend`,
            image: '/assets/projects/diabetes-indicator.jpg',
            video: '/assets/projects/diabetes-indicator.mp4',
        },
        notes: {
            name: 'Notes',
            status: 'live',
            stack: ['Monaco', 'File System Access API', 'JavaScript'],
            languages: '80+',
            previews: 9,
            live: `${SITE}/notes`,
            source: `${GITHUB}/notes`,
            image: '/assets/projects/notes.jpg',
            video: '/assets/projects/notes.mp4',
        },
        offmode: {
            name: 'OffMode',
            status: 'live',
            stack: ['React', 'Python', 'FastAPI', 'Electron', 'Vercel'],
            live: `${SITE}/offmode`,
            image: '/assets/projects/offmode.jpg',
            video: '/assets/projects/offmode.mp4',
        },
        doom: {
            name: 'Doom, offline',
            status: 'live',
            stack: ['C', 'WebAssembly', 'JavaScript', 'gzip'],
            sizeBefore: '7 MB',
            sizeAfter: '4.4 MB',
            live: `${SITE}/doom`,
            source: `${GITHUB}/doom`,
            image: '/assets/projects/doom.jpg',
            video: '/assets/projects/doom.mp4',
        },
        agentic: {
            name: 'Agentic Template',
            status: 'live',
            stack: ['MCP', 'Skills', 'TDD', 'Claude Code', 'Codex'],
            live: `${SITE}/agentic`,
            image: '/assets/projects/agentic.jpg',
            video: '/assets/projects/agentic.mp4',
        },
        'custom-square': {
            name: 'Custom Square',
            status: 'live',
            stack: ['JavaScript', 'CSS'],
            live: `${SITE}/custom-square`,
            source: `${GITHUB}/custom-square`,
            image: '/assets/projects/custom-square.jpg',
            video: '/assets/projects/custom-square.mp4',
        },
        trocatine: {
            // The landing page only: plain HTML, CSS and JavaScript (repository kmadsdev/trocatine).
            // The MVP stack is facts.startups.trocatine.mvpStack.
            name: 'TrocaTine landing page',
            status: 'live',
            stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
            live: `${SITE}/trocatine/`,
            source: `${GITHUB}/trocatine`,
            image: '/assets/projects/trocatine.jpg',
            video: '/assets/projects/trocatine.mp4',
        },

        // Study projects with simulated data. No users, no real money.
        'credit-card-engine': {
            name: 'credit-card-engine',
            status: 'study',
            stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Testcontainers', 'ArchUnit', 'Docker', 'GitHub Actions'],
            variantCount: 4,
            variants: { base: 'R$2,000', platinum: 'R$8,000' },
            source: `${GITHUB}/credit-card-engine`,
            image: '/assets/projects/credit-card-engine.jpg',
            video: '/assets/projects/credit-card-engine.mp4',
        },
        'payment-gateway': {
            name: 'simple-payment-gateway',
            status: 'study',
            stack: ['Go', 'PostgreSQL', 'OpenAPI', 'Prometheus', 'Docker', 'GitHub Actions'],
            source: `${GITHUB}/simple-payment-gateway`,
            image: '/assets/projects/payment-gateway.jpg',
            video: '/assets/projects/payment-gateway.mp4',
        },
        'devops-challenge': {
            name: 'DevOps challenge',
            status: 'study',
            stack: ['Docker Compose', 'Python', 'Go', 'Node.js', 'Redis'],
            containers: 4,
            source: `${GITHUB}/devops-challenge`,
            image: '/assets/projects/devops-challenge.jpg',
            video: '/assets/projects/devops-challenge.mp4',
        },
        'incident-api': {
            name: 'Incident alert API',
            status: 'study',
            stack: ['PHP', 'Hyperf', 'Swoole', 'MySQL', 'Redis', 'Docker', 'Python'],
            source: `${GITHUB}/software-engineer-challenge-2`,
        },
        legacy: {
            name: 'glitch-legacy-projects',
            status: 'study',
            stack: ['JavaScript', 'Node.js', 'Discord.js', 'Express', 'HTML', 'CSS', 'SQLite'],
            source: `${GITHUB}/glitch-legacy-projects`,
        },
        'student-tools': {
            name: 'Engineer Student Tools',
            status: 'study',
            stack: ['Markdown'],
            source: `${GITHUB}/engineer-student-tools`,
        },
    },

    // Data of the drawings of the introduction. Labels are in en/intro.js and pt/intro.js
    // (key `art`). A number here has a source, or it is null.
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
            url: `${GITHUB}/consignado-api/blob/main/.github/workflows/ci.yml`,
            stages: ['test', 'image', 'login', 'push', 'cluster', 'rollout', 'smoke'],
        },
        // cicd: the workflow of this site (.github/workflows/deploy.yml), in order.
        sitePipeline: {
            url: `${GITHUB}/kmadsdev.github.io/blob/main/.github/workflows/deploy.yml`,
            stages: ['test', 'build', 'browser', 'responsive', 'publish', 'verify'],
        },

        // fullstack: one label per id. `to` is the proof.
        timeline: [
            { year: 2018, id: 'bots', to: `${GITHUB}/glitch-legacy-projects` },
            { year: 2021, id: 'sites', to: `${GITHUB}/glitch-legacy-projects` },
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
    // Title, caption and alt text: `figma.items` in en/site.js and pt/site.js.
    figmaOrder: ['consignado-aks', 'consignado-pod-start', 'ruph-ship', 'devops-challenge'],
    figma: {
        'consignado-aks': {
            src: '/assets/figma/consignado-aks-flow.webp',
            thumb: '/assets/figma/consignado-aks-flow-thumb.webp',
            width: 1310,
            height: 834,
            chapters: ['architecture', 'cloud'],
            anchors: ['app-consignado'],
        },
        'consignado-pod-start': {
            src: '/assets/figma/consignado-pod-start.webp',
            thumb: '/assets/figma/consignado-pod-start-thumb.webp',
            width: 1512,
            height: 397,
            chapters: ['cloud'],
            anchors: ['app-consignado'],
        },
        'ruph-ship': {
            src: '/assets/figma/ruph-how-we-ship.webp',
            thumb: '/assets/figma/ruph-how-we-ship-thumb.webp',
            width: 2040,
            height: 1400,
            chapters: ['cicd'],
            anchors: ['app-ruph'],
        },
        'devops-challenge': {
            src: '/assets/figma/devops-challenge.webp',
            thumb: '/assets/figma/devops-challenge-thumb.webp',
            width: 516,
            height: 338,
            chapters: [],
            anchors: ['app-devops-challenge'],
        },
    },

    // Future projects: only items that a kmadsdev repository states as planned.
    // Text: more.future.items in en/more.js and pt/more.js (same ids, same order).
    future: [
        // README of kmadsdev/notes, section "Roadmap".
        { id: 'notes', to: `${GITHUB}/notes#roadmap` },
        // README of kmadsdev/doom: MicroDOOM v1.1 is marked "WIP".
        { id: 'microdoom', to: `${GITHUB}/doom` },
    ],

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
