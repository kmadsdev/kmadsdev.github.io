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
  { name: 'Uvicorn', icon: 'uvicorn.svg' },

  { name: 'PostgreSQL', icon: 'postgresql.svg' },
  { name: 'MySQL', icon: 'mysql.svg' },
  { name: 'SQLite', icon: 'sqlite.svg' },
  { name: 'JavaScript', icon: 'javascript.svg' },
  { name: 'Node.js', icon: 'nodejs.svg' },
  { name: 'Java', icon: 'java.svg' },
  
  { name: 'Github', icon: 'github.svg' },
  { name: 'AWS', icon: 'aws.svg' },
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
  },
  {
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
  },
  {
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
  }
];



export const EDUCATION = [
  {
    institution: 'J&F Institute',
    degree: 'HS Diploma - Computer Science & Software Development',
    period: '2024-2026',
    description: 'At J&F Tech, I gained both theoretical and applied skills across programming, data analysis, and cloud infrastructure'
  }
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
  },
  {
    institution: 'J&F Tech',
    courses: [
      'Software Engineering, DevOps, CI/CD and SDLC',
      'FullStack Development and Advanced OOP',
      'Advanced Data Modeling & Databases',
      'Data Science & Machine Learning',
      'Computer Architecture, OS and Hardware',
      'Git/Github Branching and Release Management',
      'Information Security (Cybersecurity)'
    ]
  },
  {
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
  }
];



export const PROJECTS = [
  {
    title: 'OffMode',
    description: 'Coming soon...',
    image: '/assets/projects/offmode.png',
    // link: 'https://github.com/kmadsdev/offmode'
  },
  {
    title: 'Diabetes Indicator',
    description: 'A survey that can indicate the probability of you having diabetes or not.',
    image: '/assets/projects/diabetesIndicator.png',
    link: 'https://kmads.dev/diabetes-indicator'
  },
  {
    title: 'TrocaTine\'s Landing Page',
    description: 'The landing page for TrocaTine, a platform for exchanging children\'s items.',
    image: '/assets/projects/trocatinelanding.png',
    link: 'https://kmads.dev/TrocaTineLanding/'
  }
];
