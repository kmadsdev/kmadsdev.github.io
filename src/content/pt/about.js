// Seção "Sobre".
import { facts } from '../facts.js';

const { person, picpay, site } = facts;

export const about = {
    label: 'Sobre',
    title: 'Oito anos em tecnologia, três deles como engenheiro.',
    paragraphs: [
        `Escrevi meu primeiro código em ${person.codingSince}, em bots de Discord que rodavam em comunidades de até ${facts.earlier.discord.members} membros. Hoje tenho ${person.yearsEngineering} anos de experiência em engenharia e ${person.yearsInTech} anos em tecnologia.`,
        `No ${picpay.name}, fintech brasileira com cerca de ${picpay.registeredUsers} de usuários cadastrados e ${picpay.activeUsers} ativos, trabalho no backend da área de cartões: ${picpay.cards.microservices} microsserviços em Java e Go e os sistemas legados em volta deles. Eles respondem milhões de requisições e escrevem bilhões de linhas de log por dia.`,
        `Também cofundei dois MVPs de startup e mantenho meus próprios apps em produção no ${site.domain}: mais de ${site.monthlyVisitors} visitantes e ${site.requests} requisições por mês, medidos na Cloudflare.`,
    ],
    principlesTitle: 'Como eu trabalho',
    principles: [
        {
            title: 'Pergunto o porquê antes do quê',
            text: 'Uma stack é uma decisão, e cada decisão tem um custo. No Project Survey, uma pergunta sobre o plano levou o time de microsserviços para um monólito em camadas.',
        },
        {
            title: 'Leio o sistema antes de mudar',
            text: 'Código legado sem documentação ainda conta a verdade nos dados e nos logs. Começo por ali, depois escrevo o teste, depois escrevo a correção.',
        },
        {
            title: 'Dou regras aos agentes de IA, não desejos',
            text: 'Arquivos compartilhados de tarefas, regras de teste primeiro e um conjunto fixo de servidores MCP e skills. Todo agente do time parte do mesmo contexto.',
        },
    ],
};
