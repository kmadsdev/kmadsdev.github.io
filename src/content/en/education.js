// "Education" section: one program and three certificates. Nothing else goes here.
import { facts } from '../facts.js';
import { monthYear, period } from '../format.js';

const { education: edu } = facts;

const titles = {
    'software-engineer': 'Software Engineer',
    'rest-api': 'REST API (Intermediate)',
    sql: 'SQL (Advanced)',
};

export const education = {
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
            title: titles[item.id],
            issuer: item.issuer,
            date: monthYear(item.date, 'en'),
        })),
    },
};
