// FACTS: every number, date, name and link of the site.
//
// Both languages read this file. Change a fact here and it changes in English
// and in Portuguese. The files in en/ and pt/ hold sentences only.
//
// Rules for a new fact:
//   1. Kmads gave the number, or a public repo shows it. No guesses.
//   2. PicPay cards work: words only ("millions of requests"). No exact count.
//   3. No tool name for messaging or observability until Kmads confirms one.

const SITE = 'https://kmads.dev';
const GITHUB = 'https://github.com/kmadsdev';

export const facts = {
    person: {
        name: 'Kaique Souza',
        alias: 'Kmads',
        codingSince: 2018,
        yearsEngineering: 3,
        yearsInTech: 8,
    },

    site: {
        url: SITE,
        domain: 'kmads.dev',
        repo: `${GITHUB}/kmadsdev.github.io`,
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
    },

    picpay: {
        name: 'PicPay',
        registeredUsers: '70M',
        activeUsers: '39M+',
        fullTime: { start: '2025-12', end: null },
        partTime: { start: '2025-03', end: '2025-11' },
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
            rating: '4.96/5',
            visitors: '2,000',
        },
    },

    earlier: {
        discord: { start: 2018, end: 2023, members: '10k' },
        reddit: { start: 2022, end: 2024, people: '250+' },
    },

    education: {
        institution: 'J&F Institute',
        start: '2024-01',
        end: '2026-12',
    },

    // Shown in this order in the "Case files" section.
    caseOrder: ['bodyshop', 'survey', 'oracle', 'hivemind', 'ruph'],

    cases: {
        bodyshop: {
            stack: ['Go', 'Gin', 'MongoDB', 'Amazon S3', 'CloudFront', 'React', 'Vite'],
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
            stack: ['Oracle SQL', 'Oracle Cloud HCM'],
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
        ruph: {
            stack: ['TypeScript', 'Hono', 'React', 'PostgreSQL', 'Cloud Run', 'Cloud SQL', 'Terraform', 'GitHub Actions'],
            flow: {
                nodes: ['agent', 'human', 'api', 'ledger', 'providers', 'ci'],
                edges: [['agent', 'api'], ['human', 'api'], ['api', 'ledger'], ['api', 'providers'], ['ci', 'api']],
            },
            tests: '2,000+',
            links: [{ label: 'ruph.kmads.dev', url: 'https://ruph.kmads.dev/' }],
        },
    },

    // Shown in this order in the "Projects" section.
    projectOrder: [
        'consignado-api',
        'credit-card-engine',
        'payment-gateway',
        'notes',
        'diabetes',
        'offmode',
        'doom',
        'overclock',
        'burnrate',
        'agentic',
        'devops-challenge',
        'incident-api',
        'custom-square',
        'trocatine',
        'student-tools',
    ],

    projects: {
        // Study projects with simulated data. No users, no real money.
        'consignado-api': {
            name: 'consignado-api',
            stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Testcontainers', 'Docker', 'GitHub Actions'],
            tests: 183,
            source: `${GITHUB}/consignado-api`,
        },
        'credit-card-engine': {
            name: 'credit-card-engine',
            stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Testcontainers', 'ArchUnit', 'Docker', 'GitHub Actions'],
            variants: { base: 'R$2,000', platinum: 'R$8,000' },
            source: `${GITHUB}/credit-card-engine`,
        },
        'payment-gateway': {
            name: 'simple-payment-gateway',
            stack: ['Go', 'PostgreSQL', 'OpenAPI', 'Prometheus', 'Docker', 'GitHub Actions'],
            source: `${GITHUB}/simple-payment-gateway`,
        },
        notes: {
            name: 'Notes',
            stack: ['Monaco', 'File System Access API', 'JavaScript'],
            languages: '80+',
            previews: 9,
            live: `${SITE}/notes`,
            source: `${GITHUB}/notes`,
            image: '/assets/projects/notes.jpg',
            video: '/assets/projects/notes.mp4',
        },
        diabetes: {
            name: 'Diabetes Indicator',
            stack: ['Python', 'FastAPI', 'scikit-learn', 'Pandas'],
            inputs: 17,
            live: `${SITE}/diabetes-indicator`,
            source: `${GITHUB}/diabetes-indicator-backend`,
            image: '/assets/projects/diabetes-indicator.jpg',
            video: '/assets/projects/diabetes-indicator.mp4',
        },
        offmode: {
            name: 'OffMode',
            stack: ['React', 'Python', 'FastAPI', 'Electron', 'Vercel'],
            live: `${SITE}/offmode`,
            image: '/assets/projects/offmode.jpg',
            video: '/assets/projects/offmode.mp4',
        },
        doom: {
            name: 'Doom, offline',
            stack: ['C', 'WebAssembly', 'JavaScript', 'gzip'],
            sizeBefore: '7 MB',
            sizeAfter: '4.4 MB',
            live: `${SITE}/doom`,
            image: '/assets/projects/doom.jpg',
            video: '/assets/projects/doom.mp4',
        },
        overclock: {
            name: 'Overclock',
            stack: ['TypeScript', 'React', 'React Native', 'Expo', 'PostgreSQL'],
            attributes: 22,
            pillars: 4,
        },
        burnrate: {
            name: 'BurnRate',
            stack: ['React', 'Express', 'PostgreSQL', 'Cloud Run'],
        },
        agentic: {
            name: 'Agentic Template',
            stack: ['MCP', 'Skills', 'TDD', 'Claude Code', 'Codex'],
            live: `${SITE}/agentic`,
            image: '/assets/projects/agentic.jpg',
            video: '/assets/projects/agentic.mp4',
        },
        'devops-challenge': {
            name: 'DevOps challenge',
            stack: ['Docker Compose', 'Python', 'Go', 'Node.js', 'Redis'],
            containers: 4,
            source: `${GITHUB}/devops-challenge`,
            image: '/assets/projects/devops-challenge.jpg',
            video: '/assets/projects/devops-challenge.mp4',
        },
        'incident-api': {
            name: 'Incident alert API',
            stack: ['PHP', 'Hyperf', 'Swoole', 'MySQL', 'Redis', 'Docker', 'Python'],
            source: `${GITHUB}/software-engineer-challenge-2`,
        },
        'custom-square': {
            name: 'Custom Square',
            stack: ['JavaScript', 'CSS'],
            live: `${SITE}/custom-square`,
            source: `${GITHUB}/custom-square`,
            image: '/assets/projects/custom-square.jpg',
            video: '/assets/projects/custom-square.mp4',
        },
        trocatine: {
            name: 'TrocaTine landing page',
            stack: ['React', 'Tailwind CSS', 'GitHub Pages'],
            live: `${SITE}/trocatine/`,
            image: '/assets/projects/trocatine.jpg',
            video: '/assets/projects/trocatine.mp4',
        },
        'student-tools': {
            name: 'Engineer Student Tools',
            stack: ['Markdown'],
            source: `${GITHUB}/engineer-student-tools`,
        },
    },

    // Skill names are the same in both languages. Group titles are in en/ and pt/.
    skills: {
        languages: ['Java', 'Go', 'Python', 'TypeScript', 'JavaScript', 'PHP', 'SQL'],
        backend: ['REST API design', 'System design', 'Microservices', 'Layered monoliths', 'Spring Boot', 'JPA', 'Gin', 'FastAPI', 'Hono', 'Hyperf', 'Jakarta EE'],
        data: ['PostgreSQL', 'MySQL', 'Oracle SQL', 'MongoDB', 'Redis', 'Pandas', 'scikit-learn'],
        cloud: ['AWS (EC2, S3, RDS, CloudFront, IAM)', 'GCP (Cloud Run, Cloud SQL, Secret Manager, IAM)', 'Cloudflare', 'Vercel', 'Docker', 'Terraform', 'GitHub Actions'],
        ai: ['MCP servers', 'Skills', 'Claude Code', 'Codex', 'Vitest', 'Playwright'],
    },

    courses: {
        cs50x: { name: 'CS50x', provider: 'Harvard / edX', year: 2025, url: `${GITHUB}/CS50x` },
        selfStudy: ['CS164', 'CS224', 'CS229r'],
    },
};
