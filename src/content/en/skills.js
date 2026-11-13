// "Skills" and "Education" sections. Skill names are in facts.js (facts.skills).
import { facts } from '../facts.js';
import { period } from '../format.js';

const { education: edu, courses } = facts;

export const skills = {
    label: 'Skills',
    title: 'Tools I use, and where I used them.',
    intro: 'Each group says where the experience comes from: work, or my own projects.',
    // One group per key of facts.skills, in this order.
    groups: [
        { id: 'languages', title: 'Languages', note: 'Java, Go and PHP at work. Python and TypeScript in my own projects.' },
        { id: 'backend', title: 'Backend and architecture', note: 'Microservices and messaging at work. Layered monoliths where a team is small.' },
        { id: 'data', title: 'Data', note: 'Oracle, MySQL and MongoDB at work. PostgreSQL and Redis in production projects.' },
        { id: 'cloud', title: 'Cloud and delivery', note: 'AWS at work. GCP, Cloudflare and Terraform on my own platform.' },
        { id: 'ai', title: 'AI engineering and testing', note: 'Agent harness design, and test-first development with coding agents.' },
    ],
    learningTitle: 'In study, not in production',
    learning: 'Container orchestration and Azure. I used Azure only in side projects.',
};

export const education = {
    label: 'Education',
    title: 'School, courses and self-study.',
    items: [
        {
            id: 'jf',
            title: 'Technical High School Diploma, Computer Science and Software Development',
            place: edu.institution,
            period: period(edu, 'en'),
            note: 'Expected in Dec 2026.',
        },
    ],
    coursesTitle: 'Courses',
    courses: [
        { id: 'cs50x', title: `${courses.cs50x.name}: Introduction to Computer Science`, place: `${courses.cs50x.provider}, ${courses.cs50x.year}, completed` },
        { id: 'aws', title: 'AWS Cloud Practitioner Essentials (course)', place: 'AWS Skill Builder' },
        { id: 'databricks', title: 'Databricks Fundamentals, SQL Analytics and BI, Python for Data Engineering', place: 'Databricks' },
        { id: 'pmi', title: 'Agile Software Development, Advanced Scrum', place: 'PMI' },
        { id: 'self', title: `Self-study from public lectures: ${courses.selfStudy.join(', ')}`, place: 'Mobile software engineering, advanced algorithms, algorithms for big data' },
    ],
};
