export const COLORS = {
    white: '#ffffff',
    bg: '#131313',
    secondary: '#1e1e1e',
    special: '#ff014f',
    textGray: '#c4cfde',
};

export const SITE_CONFIG = {
    name: 'kmadsdev',
    title: 'Kaique Souza - Software Engineer',
    description: 'Software Engineer • Data Engineer',
    copyright: '© 2025 Kmads. All rights reserved.',
    // resumeUrl: 'https://kmads.dev/cv',
};

export const CONTACT = {
    linkedin: 'https://kmads.dev/linkedin',
    github: 'https://kmads.dev/github',
    email: 'contact@kmads.dev',
};

export const NAV_LINKS = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
];

export const FOOTER_CONFIG = {
    columns: [
        {
            title: 'Navigation',
            links: [
                { label: 'Home', href: '#home', isSection: true },
                { label: 'About', href: '#about', isSection: true },
                { label: 'Experience', href: '#experience', isSection: true },
                { label: 'Skills', href: '#skills', isSection: true },
                { label: 'Projects', href: '#projects', isSection: true },
            ],
        },
        {
            title: 'Connect',
            links: [
                { label: 'GitHub', href: 'https://kmads.dev/github', external: true },
                { label: 'LinkedIn', href: 'https://kmads.dev/linkedin', external: true },
                { label: 'Email', href: 'mailto:contact@kmads.dev', external: true },
            ],
        },
        {
            title: 'Resources',
            links: [
                { label: 'My Projects', href: '/projects', external: false },
                { label: 'Resume', href: 'https://kmads.dev/cv', external: true },
                { label: 'My Repositories', href: 'https://github.com/kmadsdev/?tab=repositories', external: true },
            ],
        },
    ],
    showBackToTop: true,
    showSponsor: true,
    sponsorLink: 'https://github.com/sponsors/kmadsdev',
    socialLinks: [
        { name: 'GitHub', icon: 'github.svg', href: 'https://kmads.dev/github' },
        { name: 'LinkedIn', icon: 'linkedin.svg', href: 'https://kmads.dev/linkedin' },
    ],
};



export const TECH_SKILLS = [
    { name: 'Python', icon: 'python.svg' },
    { name: 'Pandas', icon: 'pandas.svg' },
    { name: 'FastAPI', icon: 'fastapi.svg' },
    { name: 'Scikit', icon: 'scikit.svg' },
    { name: 'Tkinter', icon: 'tkinter.svg' },
    { name: 'Java', icon: 'java.svg' },

    { name: 'PostgreSQL', icon: 'postgresql.svg' },
    { name: 'MySQL', icon: 'mysql.svg' },
    { name: 'SQLite', icon: 'sqlite.svg' },
    { name: 'Redis', icon: 'redis.svg' },
    { name: 'JavaScript', icon: 'javascript.svg' },
    { name: 'Node.js', icon: 'nodejs.svg' },
    
    { name: 'AWS', icon: 'aws.svg' },
    { name: 'GCP', icon: 'gcp.svg' },
    { name: 'Vercel', icon: 'vercel.svg' },
    { name: 'GithubActions', icon: 'githubactions.svg' },
    { name: 'Docker', icon: 'docker.svg' },
];



export const EXPERIENCES = [
    {
        company: 'PicPay',
        role: 'Software Engineer • Part-time',
        period: 'Dec 2025 - Present',
        current: true,
        description: [
            'Currently working as a Software Engineer at PicPay, focusing on developing scalable backend services',
            'and enhancing system performance using PHP, Hyperf and Laravel.',
        ]
    }, {
        company: 'PicPay',
        role: 'Data Engineer • Part-time',
        period: 'Mar 2025 - Nov 2025',
        current: false,
        description: [
            'As a Data Engineer at the Oracle HCM Squad (side by side with the  Corporate HR and the Corporate IT) i’ve:',
            'Created efficient decision-making relatories using data from the Oracle Cloud using SQL',
            'Had the opportunity to work face-to-face with CTOs, Tech Managers and Senior Engineer'
        ]
    }, {
        company: 'HiveMind',
        role: 'Co-Founder & ML Engineer - Full-time',
        period: 'Jan 2025 • Dec 2025',
        current: false,
        description: [
            'As a Machine Learning Engineer at the TimeLean app, i\'ve:',
            'Developed, trained, and managed Machine Learning models mainly using Python',
            'Managed SQL & NoSQL based databases on AWS, Firebase, Aiven and Docker',
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
        company: 'Discord',
        role: 'Application Developer • Self-employed',
        period: '2018 - 2023',
        current: false,
        description: [
            'Over the course of 5 years i\'ve built and maintained lots of Discord Applications, like:',
            'Entertainment and Games like RPG and Life Simulator.',
            'Moderation, Server Administration, Ticket and Survey Orchestration System.',
            'Music Bots, Webhooks, Rich Presence, Observability for APIs, Cloud Monitoring.',
            'Discord x Minecraft Chat Integration Plugin (Minescord).',
            'I built bots and served comminites with over 200-2k+ members',
            'For those Apps i mainly used: JavaScript, Node.JS (Discord.JS Framework), SQLite and Java.',
            'They were hosted on Github Pages, Glitch.com (legacy) or on Discloud.'
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
        description: 'Offmode is an Pomodoro desktop application that helps you stay focused and productive by managing your work and break intervals.',
        image: '/assets/projects/offmode.png',
        video: null,
        tags: ['Python', 'Desktop', 'Productivity'],
        // link: 'https://kmads.dev/offmode'
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
