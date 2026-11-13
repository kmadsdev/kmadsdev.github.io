// Seções "Skills" e "Formação". Os nomes das skills ficam em facts.js (facts.skills).
import { facts } from '../facts.js';
import { period } from '../format.js';

const { education: edu, courses } = facts;

export const skills = {
    label: 'Skills',
    title: 'Ferramentas que uso, e onde usei.',
    intro: 'Cada grupo diz de onde vem a experiência: do trabalho ou dos meus próprios projetos.',
    // Um grupo para cada chave de facts.skills, nesta ordem.
    groups: [
        { id: 'languages', title: 'Linguagens', note: 'Java, Go e PHP no trabalho. Python e TypeScript nos meus projetos.' },
        { id: 'backend', title: 'Backend e arquitetura', note: 'Microsserviços e mensageria no trabalho. Monólitos em camadas quando o time é pequeno.' },
        { id: 'data', title: 'Dados', note: 'Oracle, MySQL e MongoDB no trabalho. PostgreSQL e Redis em projetos em produção.' },
        { id: 'cloud', title: 'Nuvem e entrega', note: 'AWS no trabalho. GCP, Cloudflare e Terraform na minha própria plataforma.' },
        { id: 'ai', title: 'Engenharia de IA e testes', note: 'Desenho de harness para agentes e desenvolvimento com teste primeiro junto de agentes de código.' },
    ],
    learningTitle: 'Em estudo, não em produção',
    learning: 'Orquestração de containers e Azure. Usei Azure apenas em projetos pessoais.',
};

export const education = {
    label: 'Formação',
    title: 'Escola, cursos e estudo por conta própria.',
    items: [
        {
            id: 'jf',
            title: 'Ensino Médio Técnico, Ciência da Computação e Desenvolvimento de Software',
            place: 'Instituto J&F',
            period: period(edu, 'pt'),
            note: 'Previsão de conclusão: dez 2026.',
        },
    ],
    coursesTitle: 'Cursos',
    courses: [
        { id: 'cs50x', title: `${courses.cs50x.name}: Introdução à Ciência da Computação`, place: `${courses.cs50x.provider}, ${courses.cs50x.year}, concluído` },
        { id: 'aws', title: 'AWS Cloud Practitioner Essentials (curso)', place: 'AWS Skill Builder' },
        { id: 'databricks', title: 'Databricks Fundamentals, SQL Analytics and BI, Python for Data Engineering', place: 'Databricks' },
        { id: 'pmi', title: 'Agile Software Development, Advanced Scrum', place: 'PMI' },
        { id: 'self', title: `Estudo por conta própria com aulas públicas: ${courses.selfStudy.join(', ')}`, place: 'Engenharia de software mobile, algoritmos avançados, algoritmos para big data' },
    ],
};
