// Primeira tela: nome, cargo, um resumo curto, a localização e quatro links.
import { facts } from '../facts.js';

const { person, picpay, contact } = facts;

export const hero = {
    status: `Engenheiro de Software no ${picpay.name}`,
    name: person.name,
    alias: person.aliasUpper,
    role: 'Engenheiro de Software',
    focus: 'Arquitetura & Cloud',
    summary: `Meu foco é backend, arquitetura e cloud, e acima de tudo confiabilidade e performance. Tenho ${person.yearsEngineering} anos de experiência em engenharia e ${person.yearsInTech} anos em tecnologia, e hoje trabalho nos motores de cartão de crédito do ${picpay.name}.`,
    location: [`${person.city}, ${person.state}, Brasil`, 'Remoto', person.utc],
    localTime: 'Hora local',
    links: [
        { id: 'applications', label: 'Aplicações', href: '/projects' },
        { id: 'github', label: 'GitHub', href: contact.github },
        { id: 'linkedin', label: 'LinkedIn', href: contact.linkedin },
        { id: 'email', label: 'Email', href: `mailto:${contact.email}` },
    ],
    scroll: 'Role',
};
