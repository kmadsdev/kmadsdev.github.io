// Seção "Formação": um curso técnico e três certificados. Nada além disso entra aqui.
import { facts } from '../facts.js';
import { monthYear, period } from '../format.js';

const { education: edu } = facts;

const titles = {
    'software-engineer': 'Software Engineer',
    'rest-api': 'REST API (Intermediate)',
    sql: 'SQL (Advanced)',
};

export const education = {
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
        note: 'As três provas cobrem algoritmos, REST APIs, engenharia de software, modelagem de dados, otimização de consultas e window functions. Resolvi em Python, C/C++ e MySQL.',
        items: edu.certificates.map((item) => ({
            id: item.id,
            title: titles[item.id],
            issuer: item.issuer,
            date: monthYear(item.date, 'pt'),
        })),
    },
};
