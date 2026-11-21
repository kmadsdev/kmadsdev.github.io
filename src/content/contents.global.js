// CONTENTS · GLOBAL: everything that is the same in English and in Portuguese.
// Addresses, numbers, years, dates, counts, names, stacks, list orders, drawing data,
// page metadata and the music block. The sentences are in contents.en.js and contents.pt.js.
//
// HOW TO EDIT
//   An address       Change it here. Every button and link reads it from this file.
//   A number, a date Change it here. Both languages show the new value.
//   Number text      Write it the English way ('8.8M', '2,200'). contents.pt.js converts it.
//   Page metadata    `meta` below. English only. scripts/index-html.mjs writes it into index.html.
//   Site address     Change `SITE`, then run `node scripts/seo-files.mjs`. It writes
//                    public/robots.txt, public/sitemap.xml and public/llms.txt again.
//   Last change date `meta.lastModified`. The sitemap shows it. Change it when the text changes.
//   Music            `music.src` is the path of the audio file under public/. The player shows
//                    only when the file is in the build. Add the file only with the right to publish it.
//   Then run         npx vitest run tests/contents.test.js
//
// CONTENTS (search for the name)
//   links          this site, profiles, documents, pictures
//   person         name, years, place, photo
//   meta           title, description, Open Graph, Twitter, JSON-LD
//   music          the one song of the badge player
//   anchors        every id that a link on the page can go to
//   order          chapters, case files, applications
//   picpay         numbers and dates of the PicPay entry
//   startups       HiveMind and TrocaTine
//   discord        the Discord years
//   reddit         volunteering
//   legacy         the repository of the first projects
//   education      program and certificates
//   languages      spoken languages
//   hobbies        gym, basketball, chess
//   consignado     numbers of Consignado Cloud
//   projects       applications and repositories: name, addresses, stack, media
//   cases          case files: stack and flowchart
//   art            data of the drawings of the introduction
//   figma          the pictures of the row "From my Figma"
//   chapterTools   tool names of each chapter

const SITE = 'https://kmads.dev';
const GITHUB = 'https://github.com/kmadsdev';

// =============================================================================
// LINKS · this site, profiles, documents, pictures
// The addresses of an application are in `projects`.
// =============================================================================
export const links = {
    // This site
    site: SITE,
    domain: 'kmads.dev',
    repo: `${GITHUB}/kmadsdev.github.io`,
    workflow: `${GITHUB}/kmadsdev.github.io/blob/main/.github/workflows/deploy.yml`,
    cvPath: '/cv',
    cvLatest: `${SITE}/cv/latest`,
    // The address /projects opens this page at the section with this id.
    projectsPath: '/projects',
    projectsSection: 'applications',
    favicon: '/assets/favicon.png',
    // In-page addresses of the fixed controls.
    top: '#top',
    main: '#main',

    // Profiles and contact. A handle is the text shown for its address.
    email: 'contact@kmads.dev',
    github: GITHUB,
    githubHandle: 'kmadsdev',
    linkedin: 'https://linkedin.com/in/kaique-souza-kmads',
    linkedinHandle: 'kaique-souza-kmads',
    // The second GitHub account, for car work.
    carRepo: 'https://github.com/ej8civic/open-civic',

    // Other sites
    picpay: 'https://picpay.com/',
    // PicPay investor relations. It names the Nasdaq listing. Checked on 2026-11-20: it answers 200.
    picpayNasdaq: 'https://investor.picpay.com/about-us/',

    // Documents of Consignado Cloud
    consignadoDecisions: `${GITHUB}/consignado-api/blob/main/docs/platform/decisions.md`,
    consignadoWorkflow: `${GITHUB}/consignado-api/blob/main/.github/workflows/ci.yml`,

    // Pictures (files in public/assets/)
    badgeRing: '/assets/kmads-badge-ring.svg',
    badgeGlobe: '/assets/kmads-badge-globe.svg',
    sunset1440: '/assets/outro-sunset-1440.webp',
    sunset2880: '/assets/outro-sunset-2880.webp',
};

// =============================================================================
// PERSON
// =============================================================================
export const person = {
    name: 'Kaique Souza',
    alias: 'Kmads',
    aliasUpper: 'KMADS',
    codingSince: 2018,
    engineerSince: 2024,
    yearsEngineering: 3,
    city: 'São Paulo',
    state: 'SP',
    country: 'BR',
    utc: 'UTC-3',
    timeZone: 'America/Sao_Paulo',
    // The one photo of him on the site: the opening block of the introduction.
    photo: {
        src: '/assets/me/kmads-portrait-1280.webp',
        small: '/assets/me/kmads-portrait-640.webp',
        width: 1280,
        height: 1280,
    },
};

// =============================================================================
// META · page metadata, in English only (the page text changes language, this does not)
// title        60 characters or less. Search engines cut a longer title.
// description  150 to 160 characters. Facts only.
// keywords     Not set. Google and Bing ignore the keywords tag.
// jsonLd       schema.org data for search engines and agents: one Person, one WebSite.
// =============================================================================
export const meta = {
    lang: 'en',
    title: 'Kaique Souza - Software Engineer, Backend and Cloud',
    description: 'Kaique Souza (Kmads) is a Software Engineer in São Paulo, Brazil. He builds backend systems in Java, Go and Python and operates them on AWS, GCP and Azure.',
    author: 'Kaique Souza',
    robots: 'index, follow',
    canonical: `${SITE}/`,
    alternates: {
        en: `${SITE}/?lang=en`,
        'pt-BR': `${SITE}/?lang=pt`,
        'x-default': `${SITE}/`,
    },
    // The date of the last text change (ISO). public/sitemap.xml shows it.
    lastModified: '2026-11-20',
    openGraph: {
        type: 'website',
        siteName: 'kmads.dev',
        locale: 'en_US',
        localeAlternate: 'pt_BR',
        image: `${SITE}/og.png`,
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: 'Kaique Souza, Software Engineer. Backend, architecture and cloud.',
    },
    twitter: {
        card: 'summary_large_image',
    },
    jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': `${SITE}/#person`,
                name: 'Kaique Souza',
                alternateName: 'Kmads',
                url: `${SITE}/`,
                image: `${SITE}/assets/me/kmads-portrait-1280.webp`,
                email: 'mailto:contact@kmads.dev',
                jobTitle: 'Software Engineer',
                worksFor: {
                    '@type': 'Organization',
                    name: 'PicPay',
                    url: 'https://picpay.com/',
                },
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'São Paulo',
                    addressRegion: 'SP',
                    addressCountry: 'BR',
                },
                alumniOf: {
                    '@type': 'EducationalOrganization',
                    name: 'Instituto J&F',
                },
                knowsLanguage: ['pt-BR', 'en', 'es'],
                knowsAbout: [
                    'Backend development',
                    'Software architecture',
                    'Cloud computing',
                    'Java',
                    'Spring Boot',
                    'Go',
                    'Python',
                    'TypeScript',
                    'JavaScript',
                    'PHP',
                    'SQL',
                    'PostgreSQL',
                    'MySQL',
                    'Oracle SQL',
                    'MongoDB',
                    'Redis',
                    'Amazon Web Services',
                    'Google Cloud Platform',
                    'Microsoft Azure',
                    'Kubernetes',
                    'Docker',
                    'Terraform',
                    'GitHub Actions',
                    'CI/CD',
                ],
                sameAs: [GITHUB, 'https://linkedin.com/in/kaique-souza-kmads'],
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE}/#website`,
                url: `${SITE}/`,
                name: 'kmads.dev',
                description: 'Portfolio of Kaique Souza: experience, applications in production and study projects.',
                inLanguage: ['en', 'pt-BR'],
                author: { '@id': `${SITE}/#person` },
            },
        ],
    },
};

// =============================================================================
// MUSIC · the one song of the badge player
// `src` is the path of the file under public/. With no file in the build, the status line
// and the music controls do not render. Add the file only with the right to publish it.
// =============================================================================
export const music = {
    title: 'May',
    artist: 'Birocratic',
    album: 'Beets 3',
    spotifyUrl: 'https://open.spotify.com/track/2DGWfQ3dl9afw25URyU3TX',
    src: '/assets/audio/may-birocratic.mp3',
    // The album cover, shown small beside the song name. 96 x 96 pixels.
    cover: '/assets/audio/beets-3-cover-96.jpg',
    credit: {
        text: '"may" by Birocratic, from the album "beets 3" (2015)',
        url: 'https://birocratic.com',
    },
    // The loudness at the start: 20% (order of 2026-11-21).
    volume: 0.2,
    // The song starts by itself. A browser gives no sound before the first action of the
    // visitor, so it starts with the first click, tap or key. A pause is kept for the visit.
    autoplay: true,
};

// =============================================================================
// LATEST WORK · the small diagram of the card under the photo
// A cut of the request path that consignado.kmads.dev shows. The names are the
// names on that site (English). `time` is the time of the stage in the recorded
// replay of the Kubernetes host (screen of the site, 2026-11-21).
// =============================================================================
export const latestWork = {
    project: 'consignado',
    source: 'consignado-api',
    nodes: [
        { id: 'user', name: 'User', sub: 'browser', time: '342 ms' },
        { id: 'edge', name: 'Cloudflare edge', sub: 'TLS, cache', time: '31 ms' },
        { id: 'gateway', name: 'Gateway', sub: 'token, routing', time: '221 ms' },
        { id: 'balancer', name: 'Load balancer', sub: 'internal', time: '7.7 s' },
        { id: 'pod', name: 'Pod ×2', sub: 'Spring Boot', time: '17.4 s' },
        { id: 'database', name: 'PostgreSQL', sub: 'Azure', time: '2.9 s' },
    ],
    edges: { edge: 'HTTPS', gateway: '/api/*', balancer: 'API call', database: 'JDBC' },
    frame: 'AKS cluster',
};

// =============================================================================
// ANCHORS · every id that a link `to: '#id'` can go to
// A section renders each id of its group as an `id` attribute.
// =============================================================================
export const anchors = {
    shell: ['main'],
    sections: ['top', 'intro', 'experience', 'education', 'applications', 'more', 'contact'],
    intro: ['intro-architecture', 'intro-backend', 'intro-cloud', 'intro-cicd', 'intro-fullstack', 'intro-finance', 'intro-ai', 'intro-endtoend'],
    experience: ['exp-picpay', 'exp-cofounder', 'exp-discord', 'case-cards', 'case-bodyshop', 'case-survey', 'case-oracle', 'case-hivemind'],
    education: ['edu-jf', 'edu-certs'],
    applications: [
        'applications-live',
        'applications-other',
        'applications-study',
        'app-consignado',
        'app-ruph',
        'app-diabetes',
        'app-offmode',
        'app-notes',
        'app-doom',
        'app-agentic',
        'app-custom-square',
        'app-trocatine',
        'app-consignado-api',
        'app-payment-gateway',
        'app-credit-card-engine',
        'app-devops-challenge',
        'app-incident-api',
        'app-student-tools',
        'app-client-potential',
        'app-legacy',
    ],
    // The section "Hobbies" keeps the ids of the old section "More".
    more: ['more-volunteering', 'more-hobbies', 'more-languages', 'more-future'],
};

// =============================================================================
// ORDER · the order of each list of the page
// =============================================================================
export const order = {
    chapters: ['architecture', 'backend', 'cloud', 'cicd', 'fullstack', 'finance', 'ai', 'endtoend'],
    // Case files. A case with `flow: null` in `cases` is words only.
    cases: ['cards', 'bodyshop', 'survey', 'oracle', 'hivemind', 'ruph'],
    // Case files under each company of the experience section.
    companyCases: {
        picpay: ['cards', 'bodyshop', 'survey', 'oracle'],
        cofounder: ['hivemind'],
        discord: [],
    },
    // Applications. Each id is a key of `projects`.
    apps: {
        production: ['consignado', 'ruph', 'diabetes'],
        other: ['offmode', 'notes', 'doom', 'agentic', 'custom-square', 'trocatine'],
        study: ['consignado-api', 'payment-gateway', 'credit-card-engine', 'devops-challenge', 'incident-api', 'student-tools', 'client-potential', 'legacy'],
    },
};

// =============================================================================
// PICPAY
// Rules: cards work in words only, no exact count. ArgoCD, Tekton and SQS in this context only.
// =============================================================================
export const picpay = {
    name: 'PicPay',
    customersMillions: 70,
    roles: {
        cards: { start: '2025-12', end: null },
        hr: { start: '2025-03', end: '2025-11' },
    },
    cards: {
        microservices: '10+',
        legacySystems: 4,
    },
    vehicleHub: {
        goServices: 3,
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
        tables: '200+',
        viewLines: '10k+',
        databases: '100+',
        speedupMin: 2,
        speedupMax: 5,
    },
};

// =============================================================================
// STARTUPS · HiveMind and TrocaTine (MVPs before launch, no real users)
// =============================================================================
export const startups = {
    hivemind: {
        name: 'HiveMind',
        start: '2025-01',
        end: '2025-12',
        year: 2025,
        trainingAccuracy: '97%',
        modelBefore: '700 MB',
        modelAfter: '1.2 KB',
        storageSaving: '99.99%',
        rating: '4.99',
        visitors: '2,200',
        page: `${GITHUB}/hivemind-client-potential`,
    },
    trocatine: {
        name: 'TrocaTine',
        start: '2024-01',
        end: '2024-12',
        year: 2024,
        rating: '4.96',
        visitors: '2,000',
        page: `${SITE}/trocatine`,
    },
};

// =============================================================================
// DISCORD · the years of bots and communities
// =============================================================================
export const discord = {
    start: 2018,
    end: 2023,
    years: 6,
    members: '10k',
    firstCommunity: '2k',
    storeCustomers: '1k+',
};

// =============================================================================
// REDDIT · volunteering
// =============================================================================
export const reddit = {
    start: 2022,
    end: 2024,
    people: '250+',
    communities: ['r/buildapc', 'r/pcmasterrace', 'r/computers', 'r/craftmybox'],
};

// =============================================================================
// LEGACY · repository kmadsdev/glitch-legacy-projects (24 project folders)
// =============================================================================
export const legacy = {
    repo: `${GITHUB}/glitch-legacy-projects`,
    folders: 24,
};

// =============================================================================
// EDUCATION
// =============================================================================
export const education = {
    institution: 'Instituto J&F',
    start: '2024-01',
    end: '2026-12',
    years: 3,
    certificates: [
        { id: 'software-engineer', title: 'Software Engineer', issuer: 'HackerRank', date: '2025-10' },
        { id: 'rest-api', title: 'REST API (Intermediate)', issuer: 'HackerRank', date: '2025-10' },
        { id: 'sql', title: 'SQL (Advanced)', issuer: 'HackerRank', date: '2025-10' },
    ],
};

// =============================================================================
// LANGUAGES · names and levels are in the language files, in this order
// =============================================================================
export const languages = [
    { code: 'pt' },
    { code: 'en', studyYears: '10+' },
    { code: 'es', studyYears: '3+' },
];

// =============================================================================
// HOBBIES · numbers given by Kmads on 2026-11-20
// =============================================================================
export const hobbies = {
    gym: { years: 3, streakWeeks: '40+', workouts: '300+', bench: '110 kg', deadlift: '140 kg', row: '120 kg' },
    basketball: { years: 1 },
    chess: { years: 3, rating: '1600', bot: 'Komodo21', botRating: '2500', site: 'chess.com' },
};

// =============================================================================
// CONSIGNADO CLOUD · numbers
// Sources: the READMEs of its repositories and the live site. Times measured on 2026-11-17.
// =============================================================================
export const consignado = {
    // CI output on main ("Tests run"): 224 + 59 = 283.
    tests: 283,
    testsMeasured: '2026-11-18',
    rateLimit: { requests: 40, seconds: 10 },
    serverless: { coldMin: '18.6', coldMax: '18.9', warmMin: '0.25', warmMax: '0.9' },
    cluster: {
        node: 'Standard_D2as_v4',
        nodes: 1,
        pods: 2,
        podsMax: 3,
        warm: '0.76',
        nodePerHour: 'US$0.104',
        nodePerMonth: 'US$76',
    },
    window: { minutes: 15, cost: 'US$0.04' },
    budget: 'R$ 330',
    database: {
        engine: 'PostgreSQL 16',
        region: 'North Central US',
        hostsRegion: 'Belgium Central',
    },
    cardVariants: 4,
};

// =============================================================================
// PROJECTS · applications and repositories
// `live` and `repo` are addresses. `repos` is a list when one app has several repositories.
// `image` is the poster of `video`. An entry with no `video` has no clip.
// No status is shown on the page: the list of `order.apps` says where an entry goes.
// =============================================================================
export const projects = {
    // ─── In production ──────────────────────────────────────────────────────
    consignado: {
        name: 'Consignado Cloud',
        live: 'https://consignado.kmads.dev',
        repos: [
            { label: 'consignado-api', url: `${GITHUB}/consignado-api` },
            { label: 'consignado-serverless', url: `${GITHUB}/consignado-serverless` },
            { label: 'consignado-front', url: `${GITHUB}/consignado-front` },
        ],
        stack: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL 16', 'AKS', 'Azure Functions', 'Blob Storage', 'Key Vault', 'Entra ID', 'Terraform', 'Cloudflare Workers', 'React', 'GitHub Actions'],
        // Captions and alt text: applications.production.items[0].media in the language files (same ids).
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
        live: 'https://ruph.kmads.dev/',
        // A live address with sign-in and no public source.
        privateSource: true,
        stack: ['TypeScript', 'Hono', 'React', 'PostgreSQL', 'Cloud Run', 'Cloud SQL', 'Secret Manager', 'Terraform', 'GitHub Actions'],
    },
    diabetes: {
        name: 'Diabetes Indicator',
        live: `${SITE}/diabetes-indicator`,
        repo: `${GITHUB}/diabetes-indicator-backend`,
        stack: ['Python', 'FastAPI', 'scikit-learn', 'Pandas'],
        inputs: 17,
        endpoints: 4,
        image: '/assets/projects/diabetes-indicator.jpg',
        video: '/assets/projects/diabetes-indicator.mp4',
    },

    // ─── Other production apps ──────────────────────────────────────────────
    offmode: {
        name: 'OffMode',
        live: `${SITE}/offmode`,
        stack: ['React', 'Python', 'FastAPI', 'Electron', 'Vercel'],
        image: '/assets/projects/offmode.jpg',
        video: '/assets/projects/offmode.mp4',
    },
    notes: {
        name: 'Notes',
        live: `${SITE}/notes`,
        repo: `${GITHUB}/notes`,
        stack: ['Monaco', 'File System Access API', 'JavaScript'],
        languages: '80+',
        previews: 9,
        image: '/assets/projects/notes.jpg',
        video: '/assets/projects/notes.mp4',
    },
    doom: {
        name: 'Doom Offline',
        live: `${SITE}/doom`,
        repo: `${GITHUB}/doom`,
        stack: ['C', 'WebAssembly', 'JavaScript', 'gzip'],
        sizeBefore: '7 MB',
        sizeAfter: '4.4 MB',
        image: '/assets/projects/doom.jpg',
        video: '/assets/projects/doom.mp4',
    },
    agentic: {
        name: 'Agentic Template',
        live: `${SITE}/agentic`,
        stack: ['MCP', 'Skills', 'TDD', 'Claude Code', 'Codex'],
        image: '/assets/projects/agentic.jpg',
        video: '/assets/projects/agentic.mp4',
    },
    'custom-square': {
        name: 'Custom Square',
        live: `${SITE}/custom-square`,
        repo: `${GITHUB}/custom-square`,
        stack: ['JavaScript', 'CSS'],
        image: '/assets/projects/custom-square.jpg',
        video: '/assets/projects/custom-square.mp4',
    },
    trocatine: {
        // The landing page only (repository kmadsdev/trocatine). The MVP was another application.
        name: 'TrocaTine Landing Page',
        live: `${SITE}/trocatine`,
        repo: `${GITHUB}/trocatine`,
        stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
        image: '/assets/projects/trocatine.jpg',
        video: '/assets/projects/trocatine.mp4',
    },

    // ─── Study and other projects: cards with no picture ────────────────────
    'consignado-api': {
        name: 'Consignado Cloud',
        repoName: 'consignado-api',
        repo: `${GITHUB}/consignado-api`,
        stack: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL 16', 'Flyway', 'Docker', 'GitHub Actions'],
    },
    'payment-gateway': {
        name: 'Simple Payment Gateway',
        repoName: 'simple-payment-gateway',
        repo: `${GITHUB}/simple-payment-gateway`,
        stack: ['Go', 'PostgreSQL', 'OpenAPI', 'Prometheus', 'Docker', 'GitHub Actions'],
    },
    'credit-card-engine': {
        name: 'Credit Card Engine',
        repoName: 'credit-card-engine',
        repo: `${GITHUB}/credit-card-engine`,
        stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Testcontainers', 'ArchUnit', 'Docker', 'GitHub Actions'],
    },
    'devops-challenge': {
        name: 'DevOps Challenge',
        repoName: 'devops-challenge',
        repo: `${GITHUB}/devops-challenge`,
        stack: ['Docker Compose', 'Python', 'Go', 'Node.js', 'Redis'],
        containers: 4,
    },
    'incident-api': {
        name: 'Incident Alert API',
        repoName: 'software-engineer-challenge-1',
        repo: `${GITHUB}/software-engineer-challenge-1`,
        stack: ['PHP', 'MySQL', 'Docker'],
    },
    'student-tools': {
        name: 'Engineer Student Tool',
        repoName: 'engineer-student-tools',
        repo: `${GITHUB}/engineer-student-tools`,
        stack: ['Markdown'],
    },
    'client-potential': {
        name: 'Client Potential, HiveMind',
        repoName: 'hivemind-client-potential',
        repo: `${GITHUB}/hivemind-client-potential`,
        stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
        questions: 10,
    },
    legacy: {
        name: 'Legacy Projects, Glitch.com',
        repoName: 'glitch-legacy-projects',
        repo: `${GITHUB}/glitch-legacy-projects`,
        stack: ['JavaScript', 'Node.js', 'Discord.js', 'Express', 'HTML', 'CSS', 'SQLite'],
    },
};

// =============================================================================
// CASES · case files: stack and flowchart
// `flow` feeds Flow.jsx: nodes, and edges in the order of the steps of the language files.
// `flow: null` means words only, no chart.
// =============================================================================
export const cases = {
    cards: {
        stack: ['Java', 'Spring Boot', 'JPA', 'Go'],
        flow: null,
    },
    bodyshop: {
        stack: ['Go', 'Gin', 'MongoDB', 'Amazon S3', 'Amazon SQS', 'CloudFront', 'React', 'Vite', 'ArgoCD'],
        flow: {
            nodes: ['app', 'api', 'registry', 'model', 'storage', 'cdn', 'curation'],
            edges: [
                ['app', 'api'],
                ['api', 'registry'],
                ['api', 'storage'],
                ['api', 'model'],
                ['model', 'storage'],
                ['cdn', 'app'],
                ['curation', 'api'],
                ['api', 'model'],
                ['curation', 'storage'],
            ],
        },
    },
    survey: {
        stack: ['PHP', 'Hyperf', 'Angular', 'MySQL', 'Redis', 'CloudFront', 'AWS'],
        flow: {
            nodes: ['people', 'cdn', 'web', 'api', 'cache', 'db'],
            edges: [
                ['people', 'cdn'],
                ['cdn', 'web'],
                ['web', 'api'],
                ['api', 'cache'],
                ['api', 'db'],
            ],
        },
    },
    oracle: {
        stack: ['Oracle SQL', 'Oracle Cloud HCM', 'OTBI'],
        flow: {
            nodes: ['hcm', 'map', 'queries', 'views', 'design', 'science'],
            edges: [
                ['hcm', 'map'],
                ['map', 'queries'],
                ['views', 'design'],
                ['map', 'science'],
            ],
        },
    },
    hivemind: {
        stack: ['Python', 'FastAPI', 'scikit-learn', 'Pandas', 'Amazon S3', 'PostgreSQL', 'MongoDB', 'Redis'],
        flow: {
            nodes: ['train', 'bucket', 'api', 'client'],
            edges: [
                ['train', 'bucket'],
                ['bucket', 'api'],
                ['client', 'api'],
                ['api', 'client'],
            ],
        },
        links: [{ label: 'hivemind-ml-api', url: `${GITHUB}/hivemind-ml-api` }],
    },
    // Shown in the applications section (app-ruph), with the same chart component.
    // The chart follows the drawing "Ruph Architecture", layer 1: clients, one edge,
    // the control plane in production with what it uses and manages, and a separate QA instance.
    ruph: {
        stack: ['TypeScript', 'Hono', 'React', 'PostgreSQL', 'Cloud Run', 'Cloud SQL', 'Secret Manager', 'Terraform', 'GitHub Actions'],
        flow: {
            nodes: ['clients', 'edge', 'api', 'identity', 'store', 'providers', 'apps', 'qa'],
            edges: [
                ['clients', 'edge'],
                ['edge', 'api'],
                ['api', 'identity'],
                ['api', 'store'],
                ['api', 'store'],
                ['api', 'providers'],
                ['api', 'apps'],
                ['edge', 'qa'],
            ],
        },
        links: [{ label: 'ruph.kmads.dev', url: 'https://ruph.kmads.dev/' }],
    },
};

// =============================================================================
// ART · data of the drawings of the introduction
// Labels: intro.art in the language files. A number here has a source.
// =============================================================================
export const art = {
    // architecture: the request path of Consignado Cloud, in the layout that Kmads drew.
    // `grid` is [column, row] of each node. A frame holds nodes or another frame.
    requestPath: {
        nodes: ['browser', 'worker', 'gateway', 'serverless', 'database', 'site', 'balancer', 'pod1', 'pod2'],
        grid: {
            browser: [0, 0],
            worker: [1, 0],
            gateway: [2, 0],
            serverless: [3, 0],
            database: [5, 0],
            site: [2, 1],
            balancer: [3, 2],
            pod1: [4, 2],
            pod2: [4, 3],
        },
        frames: [
            { id: 'azure', holds: ['gateway', 'serverless', 'database', 'site', 'balancer', 'aks'] },
            { id: 'aks', holds: ['pod1', 'pod2'] },
        ],
        // One label per edge, in this order.
        edges: [
            ['browser', 'worker'],
            ['worker', 'gateway'],
            ['worker', 'site'],
            ['gateway', 'serverless'],
            ['gateway', 'balancer'],
            ['serverless', 'database'],
            ['balancer', 'pod1'],
            ['balancer', 'pod2'],
            ['pod1', 'database'],
            ['pod2', 'database'],
        ],
    },

    // backend: two real requests through the gateway, serverless host.
    // `ms` holds the stages that the trace gave a time for. A stage with no entry has no number.
    trace: {
        // A signed-in write, warm. Live test of 2026-11-18.
        warm: {
            call: 'POST /api/v1/customers',
            status: 201,
            totalMs: 644,
            statements: 3,
            stages: ['request', 'edge', 'gateway', 'identity', 'keyvault', 'host', 'app', 'database', 'response'],
            ms: { database: 339 },
        },
        // The first call after idle time, a guest preview. Live test of 2026-11-17.
        cold: {
            call: 'POST /api/v1/simulations/preview',
            status: 200,
            totalMs: 18687,
            totalSeconds: '18.7',
            stages: ['request', 'edge', 'gateway', 'keyvault', 'coldStart', 'response'],
            ms: { coldStart: 18600 },
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
    // `edges`: services that talk, as [from, to] node ids.
    clouds: {
        order: ['aws', 'gcp', 'azure'],
        aws: ['cloudfront', 's3', 'sqs', 'ec2', 'rds'],
        gcp: ['cloudRun', 'cloudSql', 'secretManager', 'iam', 'terraform', 'actions'],
        azure: ['aks', 'functions', 'blob', 'keyVault', 'postgres', 'entra', 'registry', 'tables'],
        edges: {
            aws: [
                ['cloudfront', 's3'],
                ['s3', 'ec2'],
            ],
            gcp: [
                ['actions', 'cloudRun'],
                ['secretManager', 'cloudRun'],
                ['cloudRun', 'cloudSql'],
                ['terraform', 'iam'],
            ],
            azure: [
                ['functions', 'aks'],
                ['keyVault', 'aks'],
                ['registry', 'aks'],
                ['aks', 'postgres'],
                ['functions', 'postgres'],
                ['functions', 'tables'],
            ],
        },
    },

    // cloud: the measured start of the stopped AKS cluster (consignado-api README).
    // 266 + 133 + 26 + 8 = 433 s = 7 min 13 s.
    coldStart: {
        parts: ['controlPlane', 'node', 'app', 'balancer'],
        seconds: { total: 433, controlPlane: 266, node: 133, app: 26, balancer: 8 },
    },

    // cicd: the deploy job of consignado-api (ci.yml), in order.
    pipeline: {
        stages: ['test', 'image', 'login', 'push', 'cluster', 'rollout', 'smoke'],
    },

    // cicd: "My personal default CI/CD workflow". Two flows with the same six steps.
    // The steps, in order, are in the language files (intro.art.defaultWorkflow) and read these values.
    defaultWorkflow: {
        flows: [
            { id: 'qa', from: 'feat/name', to: 'qa', address: '<application>.qa.kmads.dev', telemetry: 'Ruph for QA Telemetry' },
            { id: 'production', from: 'qa', to: 'main', address: '<application>.kmads.dev', telemetry: 'Ruph Telemetry' },
        ],
        notifications: ['Resend e-mail', 'FCM mobile push'],
    },

    // fullstack: the timeline. A row is one year (`from` equal to `to`) or a range of years.
    // The label of a row is rich text in the language files, with the links.
    timeline: [
        { id: 'bots', from: 2018, to: 2020 },
        { id: 'sites', from: 2021, to: 2023 },
        { id: 'trocatine', from: 2024, to: 2024 },
        { id: 'work', from: 2025, to: 2025 },
        { id: 'consignado', from: 2026, to: 2026 },
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
};

// =============================================================================
// FIGMA · the row "From my Figma": the originals that Kmads approved on 2026-11-18
// `width` and `height` are the pixels of the full picture. `chapters` and `anchors`
// say where the row shows the picture. Title, caption and alt text: figma.items in the
// language files (same ids).
// =============================================================================
export const figma = [
    {
        id: 'consignado-aks',
        src: '/assets/figma/consignado-aks-flow.webp',
        thumb: '/assets/figma/consignado-aks-flow-thumb.webp',
        width: 1310,
        height: 834,
        chapters: ['architecture', 'cloud'],
        anchors: ['app-consignado'],
    },
    {
        id: 'consignado-pod-start',
        src: '/assets/figma/consignado-pod-start.webp',
        thumb: '/assets/figma/consignado-pod-start-thumb.webp',
        width: 1512,
        height: 397,
        chapters: ['cloud'],
        anchors: ['app-consignado'],
    },
    {
        // The picture "GCP Continuous Delivery Pipeline" of the CI/CD chapter and of Ruph.
        id: 'ruph-ship',
        src: '/assets/figma/ruph-cd-pipeline.webp',
        thumb: '/assets/figma/ruph-cd-pipeline-thumb.webp',
        width: 2560,
        height: 986,
        chapters: ['cicd'],
        anchors: ['app-ruph'],
    },
];

// =============================================================================
// CHAPTER TOOLS · tool names of each chapter of the introduction
// =============================================================================
export const chapterTools = {
    architecture: ['System design', 'REST API design', 'Layered monoliths', 'Microservices'],
    backend: ['Java', 'Spring Boot', 'JPA', 'Go', 'Gin', 'PHP', 'Hyperf', 'PostgreSQL', 'MySQL', 'Oracle SQL', 'MongoDB', 'Redis', 'Flyway', 'Testcontainers', 'ArchUnit'],
    cloud: ['AWS (EC2, S3, RDS, CloudFront, IAM)', 'GCP (Cloud Run, Cloud SQL, Secret Manager, IAM)', 'Azure (AKS, Functions, Blob Storage, Key Vault)', 'Cloudflare', 'Terraform', 'Docker'],
    cicd: ['GitHub Actions', 'Terraform', 'Docker', 'OIDC'],
    fullstack: ['JavaScript', 'TypeScript', 'React', 'Vite', 'Angular', 'Node.js', 'Express', 'HTML', 'CSS'],
    finance: ['Java', 'Spring Boot', 'Go', 'PostgreSQL'],
    ai: ['MCP servers', 'Skills', 'Claude Code', 'Codex', 'Vitest', 'Playwright'],
    endtoend: [],
};
