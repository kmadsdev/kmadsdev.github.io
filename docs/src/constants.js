export const COLORS = {
    white: '#ffffff',
    bg: '#131313',
    secondary: '#1e1e1e',
    special: '#ff014f',
};



export const CONTACT = {
    linkedin: 'https://kmads.dev/linkedin',
    github: 'https://kmads.dev/github',
    email: 'contact@kmads.dev',
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
    { name: 'Jupyter', icon: 'jupyter.svg' },
];



export const EXPERIENCES = [
    {
        company: 'PicPay',
        role: 'Data Engineer Intern',
        period: 'Mar 2025 - Present',
        current: true,
        description: [
          'As a Data Engineer at the Oracle HCM Squad (side by side with the  Corporate HR and the Corporate IT) i’ve:',
          'Created efficient decision-making relatories using data from the Oracle Cloud using SQL',
          'Had the opportunity to work face-to-face with CTOs, Tech Managers and Senior Engineer'
        ]
    }, {
        company: 'HiveMind',
        role: 'Co-Founder & ML Engineer',
        period: 'Jan 2025 - Nov 2025',
        current: false,
        description: [
          'As a Machine Learning Engineer at the TimeLean app, i’ve:',
          'Developed, trained, and managed Machine Learning models mainly using Python',
          'Managed SQL & NoSQL based databases on AWS, Firebase, Aiven and Docker',
          'Modeled PostgreSQL, MongoDB and Redis databases'
        ]
    }, {
        company: 'TrocaTine',
        role: 'Co-Founder & Software Engineer',
        period: 'Jan 2024 - Dec 2024',
        current: false,
        description: [
          'Led the Landing Page Project',
          'Led market research and financial planning, estimating 30% lower costs for users compared to buying new items',
          'Managed the main web page server using java, jdbc, apache tomcat',
          'Managed SQL based databases on Aiven and Docker'
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
        // link: 'https://kmads.dev/project/offmode'
    }, {
        title: 'Diabetes Indicator',
        description: 'A survey that can indicate the probability of you having diabetes or not.',
        image: '/assets/projects/diabetesIndicator.png',
        link: 'https://kmads.dev/diabetes-indicator'
    }, {
        title: 'TrocaTine',
        description: 'TrocaTine was a platform for exchanging children\'s items (like clothes & toys).',
        image: '/assets/projects/trocatinelanding.png',
        link: 'https://kmads.dev/trocatine/'
    },
];



export const PROJECT_GROUPS = [
  {
    id: 'all-projects',
    title: '🗂️ All Projects',
    columns: ['Project', 'Website', 'Source Code', 'Stack', 'Cloud/Host'],
    rows: [
      {
        project: 'Off Mode (2025)',
        website: null,
        source: null,
        stack: 'Python, Tkinter, FastAPI, SQLite, PgSQL',
        cloud: null,
      },
      {
        project: 'Diabetes Indicator (2025)',
        website: { href: 'https://kmads.dev/diabetes-indicator', label: 'kmads.dev/diabetes-indicator' },
        source: [
          { href: 'https://source.kmads.dev/diabetes-indicator', label: 'Front' },
          { href: 'https://source.kmads.dev/diabetes-indicator-api', label: 'Back' },
        ],
        stack: 'HTML/CSS, JS, Python, FastAPI, Scikit, Pandas',
        cloud: 'Github Pages + Vercel',
      },
      {
        project: 'HiveMind Client Potential (2025)',
        website: { href: 'https://kmads.dev/hivemind-client-potential', label: 'kmads.dev/hivemind-client-potential' },
        source: [
          { href: 'https://source.kmads.dev/hivemind-client-potential', label: 'Front' },
          { href: 'https://source.kmads.dev/hivemind-ml-api', label: 'Back' },
          { href: 'https://source.kmads.dev/hivemind-ml', label: 'ML' },
        ],
        stack: 'HTML/CSS, JS, Python, FastAPI, Scikit, Pandas',
        cloud: 'Github Pages + Vercel',
      },
      {
        project: 'HiveMind (2025)',
        website: null,
        source: [
          { href: 'https://github.com/HiveMind-Instituto-J-F', label: 'Source' },
        ],
        stack: 'Python, Pandas, Scikit-learn, Java, Tomcat, JavaScript, HTML/CSS, PgSQL, MongoDB',
        cloud: null,
      },
      {
        project: 'TrocaTine (2024)',
        website: { href: 'https://kmads.dev/trocatine-landing', label: 'kmads.dev/trocatine' },
        source: [
          { href: 'https://github.com/TrocaTine', label: 'Source' },
        ],
        stack: 'Java, Tomcat, Maven, HTML/CSS, JavaScript, PgSQL, MongoDB',
        cloud: null,
      },
      {
        project: 'Expense Tracking App (2024)',
        website: null,
        source: [
          { href: 'https://source.kmads.dev/expense-tracking-app', label: 'Source' },
        ],
        stack: 'Python, Streamlit, Pandas, Plotly',
        cloud: null,
      },
      {
        project: 'DK Shipping (2024)',
        website: { href: 'https://kmads.dev/dk-shipping/home', label: 'kmads.dev/dk-shipping' },
        source: [
          { href: 'https://source.kmads.dev/dk-shipping', label: 'Source' },
        ],
        stack: 'HTML/CSS, JavaScript',
        cloud: 'Github Pages',
      },
      {
        project: 'Python Compiler (2024)',
        website: { href: 'https://kmads.dev/python-compiler', label: 'kmads.dev/python-compiler' },
        source: [
          { href: 'https://source.kmads.dev/python-compiler', label: 'Source' },
        ],
        stack: 'HTML/CSS, JavaScript',
        cloud: 'Github Pages',
      },
      {
        project: 'Custom Square (2024)',
        website: { href: 'https://kmads.dev/custom-square', label: 'kmads.dev/custom-square' },
        source: [
          { href: 'https://source.kmads.dev/custom-square', label: 'Source' },
        ],
        stack: 'HTML/CSS, JavaScript',
        cloud: 'Github Pages',
      },
      {
        project: 'Calculator (2023)',
        website: { href: 'https://kmads.dev/calculator', label: 'kmads.dev/calculator' },
        source: [
          { href: 'https://source.kmads.dev/calculator', label: 'Source' },
        ],
        stack: 'HTML/CSS, JavaScript',
        cloud: 'Github Pages',
      },
      {
        project: 'Cards Design (2023)',
        website: { href: 'https://kmads.dev/cards-design', label: 'kmads.dev/cards-design' },
        source: [
          { href: 'https://source.kmads.dev/cards-design', label: 'Source' },
        ],
        stack: 'HTML/CSS',
        cloud: 'Github Pages',
      },
    ],
  },
  {
    id: 'other-projects',
    title: '📂 Other Projects',
    columns: ['Project', 'Website', 'Source Code', 'Stack', 'Cloud/Host'],
    rows: [
      {
        project: 'Portifolio website',
        website: { href: 'https://kmads.dev/', label: 'kmads.dev' },
        source: [
          { href: 'https://source.kmads.dev/kmadsdev.github.io', label: 'source.kmads.dev/kmadsdev.github.io' },
        ],
        stack: 'React, HTML/CSS, JavaScript',
        cloud: 'Github Pages / Actions',
      },
      {
        project: 'Leetcode Algorithms',
        website: null,
        source: [
          { href: 'https://source.kmads.dev/leetcode-algorithms', label: 'source.kmads.dev/leetcode-algorithms' },
        ],
        stack: 'Python, SQL, JavaScript',
        cloud: null,
      },
      {
        project: 'CS50x 2025 Class Material',
        website: null,
        source: [
          { href: 'https://source.kmads.dev/cs50x', label: 'source.kmads.dev/cs50x' },
        ],
        stack: 'C, Python, SQLite',
        cloud: null,
      },
      {
        project: 'Finance Assistant Chatbot',
        website: null,
        source: null,
        stack: 'Python, Langchain, PgSQL',
        cloud: null,
      },
    ],
  },
  {
    id: 'legacy-projects',
    title: '📀 Legacy Projects',
    columns: ['Project', 'Description', 'Stack', 'Cloud/Host'],
    rows: [
      {
        project: 'Minescord Plugin (2020–2022)',
        description: 'Minecraft/Discord chat integration (Java/JS)',
        stack: 'JavaScript',
        cloud: 'Glitch.com',
      },
      {
        project: 'Tickety (2021–2023)',
        description: 'Ticket/support Discord bot (JavaScript)',
        stack: 'JavaScript',
        cloud: 'Glitch.com',
      },
      {
        project: 'Emoteload Bot (2021–2022)',
        description: 'Custom emoji manager Discord bot',
        stack: 'JavaScript',
        cloud: 'Glitch.com',
      },
      {
        project: 'Fireboyshop Bot (2019–2022)',
        description: 'Checkout/moderation system for Discord (400+ members)',
        stack: 'JavaScript',
        cloud: 'Glitch.com',
      },
      {
        project: 'Fireboyserver (2019–2021)',
        description: 'Minecraft Server + Discord integration (200+ members)',
        stack: 'JavaScript & Java',
        cloud: 'Glitch.com',
      },
      {
        project: 'Fireboybot/Firebot (2018–2021)',
        description: 'All-in-one Discord bot (games, RPG, tickets, moderation)',
        stack: 'JavaScript',
        cloud: 'Glitch.com',
      },
      {
        project: 'Check out all of them (and more)',
        description: 'Links to legacy and restored projects',
        stack: 'JavaScript',
        cloud: null,
        extraLinks: [
          { href: 'https://source.kmads.dev/glitch-legacy-projects', label: 'Legacy' },
          { href: 'https://source.kmads.dev/glitch-legacy-projects-remastered2025', label: 'Restored (2025)' },
        ],
      },
    ],
  },
];
