// Seção "Experiência". Datas e números vêm de facts.js.
import { facts } from '../facts.js';
import { period, ptNumber as br, years } from '../format.js';

const { picpay, startups, earlier } = facts;
const { bodyshop, survey, cards, oracle } = picpay;
const { hivemind, trocatine } = startups;

export const experience = {
    label: 'Experiência',
    title: 'Onde trabalhei e o que mudei em cada lugar.',
    intro: 'Do mais recente para o mais antigo. Cada linha é algo que eu fiz, não algo que eu assisti.',
    current: 'Atual',
    items: [
        {
            id: 'picpay-full-time',
            role: 'Engenheiro de Software (tempo integral)',
            company: picpay.name,
            period: period(picpay.fullTime, 'pt'),
            context: `Fintech brasileira com cerca de ${picpay.registeredUsers} de usuários cadastrados e ${picpay.activeUsers} ativos.`,
            bullets: [
                `Escrevo e mantenho microsserviços em Java (Spring Boot, JPA) e Go na área de cartões, com mensageria, CI/CD e observabilidade. A área roda ${cards.microservices} microsserviços e sistemas legados que respondem milhões de requisições de centenas de milhares de clientes.`,
                `Encontrei e corrigi bugs e defeitos escondidos em ${cards.legacySystems} sistemas legados em Java, resolvi centenas de incidentes de clientes e criei jobs de autocorreção que limpam o banco de dados sem trabalho manual.`,
                `Liderei ${bodyshop.engineersLed} engenheiros no ${bodyshop.name}: ${bodyshop.services} serviços internos que trocam a imagem errada ou genérica de carro mostrada a ${br(bodyshop.customers)} de clientes. Tomei as decisões de stack e de escopo e levei o projeto até QA com aprovação da governança.`,
                `Escrevi o Agentic Template do ${bodyshop.name} antes do kickoff: arquivos compartilhados de tarefas, progresso e conhecimento, regras de teste primeiro, servidores MCP e skills. Os agentes de IA das ${bodyshop.teamSize} pessoas do time trabalharam a partir de um só contexto.`,
                `No ${survey.name}, em um time de ${survey.teamSize} pessoas, trabalhei na API de backend, na modelagem e nos índices do MySQL e na infraestrutura de uma plataforma de pesquisas para cerca de ${br(survey.employees)} funcionários.`,
            ],
        },
        {
            id: 'picpay-part-time',
            role: 'Engenheiro de Software (meio período)',
            company: picpay.name,
            period: period(picpay.partTime, 'pt'),
            context: 'TI corporativa, dados de RH. Contato próximo com RH, Jurídico e Compliance.',
            bullets: [
                'Indexei e mapeei centenas de bancos de dados do Oracle Cloud HCM e organizei os dados de RH que alimentam modelos preditivos.',
                `Fiz a engenharia reversa de sistemas Oracle legados que rodam desde os anos ${oracle.legacySince.replace('s', '')} e não têm documentação. Os dados eram a única fonte.`,
                `Escrevi automações em SQL e consultas de apoio à decisão, e planejei a modelagem de banco que substitui views legadas de ${oracle.viewLines} linhas sem índice.`,
                'O trabalho economizou centenas de horas de pesquisa de engenheiros e analistas.',
            ],
        },
        {
            id: 'startups',
            role: 'Cofundador',
            company: `${hivemind.name} e ${trocatine.name}`,
            period: period(startups, 'pt'),
            context: 'Dois MVPs de startup em pré-lançamento, apresentados ao público na ExpoTech. Não foram empregos em tempo integral.',
            bullets: [
                `${hivemind.name} (${hivemind.year}, lead scoring B2B): liderei ${hivemind.developersLed} desenvolvedores no time de backend e dados, treinei os modelos e construí um serviço em FastAPI que carrega o modelo mais novo do S3 e faz a troca sem novo deploy.`,
                `Cerca de ${br(hivemind.visitors)} visitantes da ExpoTech deram nota ${br(hivemind.rating)} ao ${hivemind.name}.`,
                `${trocatine.name} (${trocatine.year}, troca de roupas e brinquedos infantis): liderei o time de frontend de ${trocatine.frontendTeam} pessoas, construí a landing page e cuidei do backend em Java (JDBC, Apache Tomcat) e dos bancos SQL na Aiven e no Docker.`,
                `Cerca de ${br(trocatine.visitors)} visitantes da ExpoTech deram nota ${br(trocatine.rating)} ao ${trocatine.name}.`,
            ],
        },
    ],
    earlierTitle: 'Antes disso',
    earlier: [
        {
            id: 'discord',
            title: 'Desenvolvedor de bots de Discord, autodidata',
            period: years(earlier.discord),
            text: `Bots de moderação, tickets, pesquisas, jogos e música, além de webhooks, para comunidades de até ${earlier.discord.members} membros. JavaScript (Node.js, Discord.js), SQLite e Java.`,
        },
        {
            id: 'reddit',
            title: 'Consultor de montagem de PCs, voluntário',
            period: years(earlier.reddit),
            text: `Ajudei ${earlier.reddit.people} pessoas no Reddit a escolher peças, caber no orçamento e consertar seus computadores em Windows, macOS e Linux.`,
        },
    ],
};
