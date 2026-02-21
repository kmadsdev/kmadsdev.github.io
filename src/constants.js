export const COLORS = {
    white: '#ffffff',
    bg: '#131313',
    secondary: '#1e1e1e',
    special: '#ff014f',
    textGray: '#c4cfde',
};

export const SITE_CONFIG = {
    name: 'Kmadsdev',
    title: 'Kaique Souza',
    description: 'Software Engineer • Open-Source Developer',
    copyright: '© 2026 kmads.dev All rights reserved.',
    resumeUrl: 'https://kmads.dev/cv',
};

export const HERO_CONTENT = {
    greeting: '👋 HELLO, MY NAME IS KAIQUE, ALSO KNOWN AS',
    highlightName: 'KMADS',
    description: [
        "Full-time Engineer + Full-time student",
        "I love contributing to the community and building useful projects.",
        "I'm familiar with SDLC, System Designs & patterns, DevOps and Cloud..",
        "I'm also an Hardware Engineer experienced with PC/Server hardware, IoT and networks."
    ],
};

export const ABOUT_CONTENT = {
    paragraphs: [
        'Hi! My name is Kaique Souza, i\'m an systems engineer (Software/Hardware/Mechanics) from from Brazil.',
        'My journey started in 2018, building Discord bots and applications, which sparked my passion for software development.',
        'Since then, I\'ve been honing my skills and expanding my knowledge across various domains in technology.',
    ],
    skillsIntro: 'My Tech Stack/Skills include:',
    skills: [
        'Full Stack Web Application Development',
        'Software Architecture & Systems Design (Scalability, Performance, Security, Maintainability)',
        'DevOps (CI/CD Workflows, Containerization, Life Cycle Management)',
        'Cloud Architecture (Amazon Web Services, Google Cloud Platform, Vercel)',
        'Scrum (Agile Project Management, Kanban, Jira, Monday, Google Workspace)',
        'Hardware & IoT (PC Hardware Build/Maintenace, Server Hardware, Networks)',
    ],
};

export const CONTACT = {
    linkedin: 'https://kmads.dev/linkedin',
    github: 'https://kmads.dev/github',
    email: 'contact@kmads.dev',
};

export const NAV_LINKS = [
    { label: 'Home',       id: 'home' },
    { label: 'About',      id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills',     id: 'skills' },
    { label: 'Projects',   id: 'projects' },
];

export const FOOTER_CONFIG = {
    columns: [
        {
            title: 'Navigation',
            links: [
                { label: 'Home',       href: '#home', isSection: true },
                { label: 'About',      href: '#about', isSection: true },
                { label: 'Experience', href: '#experience', isSection: true },
                { label: 'Skills',     href: '#skills', isSection: true },
                { label: 'Projects',   href: '#projects', isSection: true },
            ],
        }, {
            title: 'Connect',
            links: [
                { label: 'GitHub',   href: CONTACT.github, external: true },
                { label: 'LinkedIn', href: CONTACT.linkedin, external: true },
                { label: 'Email',    href: CONTACT.email, external: true },
            ],
        }, {
            title: 'Resources',
            links: [
                { label: 'My Projects',     href: '/projects', external: false },
                { label: 'Resume',          href: SITE_CONFIG.resumeUrl, external: true },
                { label: 'My Repositories', href: 'https://github.com/kmadsdev/?tab=repositories', external: true },
            ],
        },
    ],
    showBackToTop: true,
    showSponsor: true,
    sponsorLink: 'https://github.com/sponsors/kmadsdev',
    socialLinks: [
        { name: 'GitHub', icon: 'github-icon-red.svg', href: 'https://kmads.dev/github' },
        { name: 'LinkedIn', icon: 'linkedin-icon-red.svg', href: 'https://kmads.dev/linkedin' },
    ],
};



export const TECH_SKILLS = [
    // languages
        { name: 'Python', icon: 'python.svg' },
        { name: 'JavaScript', icon: 'javascript.svg' },
        { name: 'TypeScript', icon: 'typescript.svg' },
        { name: 'Php', icon: 'php.svg' },
        // { name: 'Java', icon: 'java.svg' },
        { name: 'C', icon: 'c.svg' },
    // backend
        { name: 'FastAPI', icon: 'fastapi.svg' },
        { name: 'NodeJS', icon: 'nodejs.svg' },
        { name: 'Hyperf', icon: 'hyperf.svg' },
        { name: 'Laravel', icon: 'laravel.svg' },
    // frontend
        { name: 'React', icon: 'react.svg' },
        { name: 'Vite', icon: 'vite.svg' },
    // database
        { name: 'PostgreSQL', icon: 'postgresql.svg' },
        { name: 'MySQL', icon: 'mysql.svg' },
        // { name: 'SQLite', icon: 'sqlite.svg' },
        { name: 'Redis', icon: 'redis.svg' },
    // cloud & devops
        { name: 'AWS', icon: 'aws.svg' },
        { name: 'GCP', icon: 'gcp.svg' },
        { name: 'Vercel', icon: 'vercel.svg' },
        { name: 'GitHub Actions', icon: 'githubactions.svg' },
        { name: 'Docker', icon: 'docker.svg' },
    // data science & ml
        // { name: 'Pandas', icon: 'pandas.svg' },
        // { name: 'Scikit Learn', icon: 'scikit.svg' },
];



export const EXPERIENCES = [
    {
        company: 'PicPay',
        role: 'Software Engineer • Full-time',
        period: 'Dec 2025 - Present',
        current: true,
        description: [
            'Allocated on the Engineering Squad (IT Corp / HR Division) at PicPay',
            'Working on the Project Survey, an internal platform designed to replace multiple third-party employee satisfaction survey tools.',
            'The initiative centralizes and modernizes survey management, increasing customization, resilience, and scalability while significantly reducing operational costs. ',
            'The project have the potential to save the company millions annually while improving the overall employee experience.'
        ]
    }, {
        company: 'PicPay',
        role: 'Data Engineer • Part-time',
        period: 'Mar 2025 - Nov 2025',
        current: false,
        description: [
            'Allocated on the Oracle HCM Squad (IT Corp / HR division) at PicPay',
            'Supporting Corporate HR initiatives through data analysis and reporting.',
            'Acted as a bridge between technical and business teams, delivering insights that supported strategic HR and operational decisions.'    
        ]
    }, {
        company: 'HiveMind',
        role: 'Co-Founder & ML Engineer - Full-time',
        period: 'Jan 2025 • Dec 2025',
        current: false,
        description: [
            'Led the Data Engineering Team and the Machine Learning Project - HiveMind Client Potential',
            'Developed, trained, and managed Machine Learning models mainly using Python',
            'Managed SQL & NoSQL datasets on AWS',
            'Modeled PostgreSQL, MongoDB and Redis databases'
        ]
    }, {
        company: 'TrocaTine',
        role: 'Co-Founder & Software Engineer • Full-time',
        period: 'Jan 2024 - Dec 2024',
        current: false,
        description: [
            'Led the Landing Page Project',
            'Led market research and financial planning, estimating 30% lower costs for users compared to buying new items',
            'Managed the main web page server using java, jdbc, apache tomcat',
            'Managed SQL based databases on Aiven and Docker'
        ]
    }, {
        company: 'Reddit Communities',
        role: 'Hardware & IT Advisor • Self-employed',
        period: '2022 - 2024',
        current: false,
        description: [
            'Assisted 250+ individuals across multiple technical communities (including r/buildapc, r/pcmasterrace, r/computers, and others) in designing and building custom PCs',
            'Provided hardware architecture recommendations, part selection optimization, and cross-platform troubleshooting (Windows, macOS, Linux).',
            'Supported users across Brazil, the United States, and other regions',
            'Contributed to the successful build of hundreds of systems',
            'Helped individuals optimize budgets and avoid costly hardware mismatches'
        ]
    }, {
        company: 'Discord',
        role: 'Application Developer • Self-employed',
        period: '2018 - 2023',
        current: false,
        description: [
            'Over 6 years i\'ve served tens to hundreds of discord communities with up to 10k+ members in various countries.',
            'I built and maintained lots of Discord Applications within: ',
            'Gaming Bots for entertainment like RPG and Life Simulator.',
            'Moderation, Server Administration, Ticket and Survey Orchestration Systems.',
            'Music Bots, Webhooks, Rich Presence, Observability for APIs, Cloud Monitoring.',
            'Discord x Minecraft Chat Integration Plugin (Minescord).',
        ]
    },
];



export const EDUCATION = [
    {
        institution: 'J&F Institute',
        degree: 'HS Diploma - Computer Science & Software Development',
        period: '2024-2026',
        description: 'At J&F Tech, I gained both theoretical and applied skills across programming, data analysis, and cloud infrastructure'
    },
];



export const COURSEWORK = [
    {
        institution: 'Harvard University, SEAS & Extension School (YouTube/EdX)',
        courses: [
            'Computer Science (CS50x)',
            'Mobile Software Engineering (CS164)',
            'Advanced Algorithms (CS224)',
            'Algoritms for Big Data (CS229r)'
        ]
    }, {
        institution: 'J&F Tech',
        courses: [
            'Software Development, DevOps and CI/CD',
            'FullStack Development and OOP',
            'Advanced Data Modeling & Databases',
            'Data Science & Machine Learning',
            'Computer Architecture, OS and Hardware',
            'Git/Github Branching and Release Management'
        ]
    }, {
        institution: 'AWS, PMI, Databricks & Botcity',
        courses: [
            'AWS Cloud Practitioner Essentials',
            'Agile Software Development & Project Management (PMI)',
            'Advanced Scrum (PMI)',
            'Databricks Fundamentals',
            'Get Started with SQL Analytics and BI (Databricks)',
            'Introduction to Python for Data Science and Data Engineering (Databricks)',
            'RPA & SAP Automation on Python (BotCity)'
        ]
    },
];



export const PROJECTS = [
    {
        title: 'OffMode',
        description: 'Offmode is a Pomodoro Timer App that helps you stay focused and productive by managing your work sessions and break intervals.',
        image: '/assets/projects/offmode.png',
        video: null,
        tags: ['Python', 'Desktop', 'Productivity'],
        link: 'https://kmads.dev/offmode'
    }, {
        title: 'Diabetes Indicator',
        description: 'A survey that can indicate the probability of you having diabetes or not.',
        image: '/assets/projects/diabetes-indicator.png',
        video: '/assets/projects/diabetes-indicator-demo.mp4',
        tags: ['Python', 'ML', 'Healthcare'],
        link: 'https://kmads.dev/diabetes-indicator'
    }, {
        title: 'TrocaTine',
        description: 'TrocaTine was a platform for exchanging children\'s items (like clothes & toys).',
        image: '/assets/projects/trocatine.png',
        video: null,
        tags: ['Java', 'Web', 'E-commerce'],
        link: 'https://kmads.dev/trocatine/'
    },
];

export const SCROLL_CONFIG = {
    lerp: 0.075,
    smooth: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 0.5,
    horizontalScrollSpeed: 1.2,
};

export const ANIMATION_CONFIG = {
    fadeInDuration: 0.8,
    staggerDelay: 0.1,
    horizontalScrollDuration: 1,
};
