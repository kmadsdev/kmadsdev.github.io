// Seção "Experiência": empresa, período, cargo, responsabilidades, impacto.
// Abaixo de cada empresa: os projetos que construí ou liderei ali (ids de `cases`, veja cases.js).
// Datas e números vêm de facts.js.
import { facts } from '../facts.js';
import { period, ptNumber as br, years } from '../format.js';

const { picpay, startups, earlier, legacy } = facts;
const { bodyshop, survey, cards, oracle } = picpay;
const { hivemind, trocatine } = startups;

export const experience = {
    label: 'Experiência',
    title: 'Onde trabalhei e o que mudei em cada lugar.',
    lead: 'Uma fintech, dois MVPs de startup e cinco anos de bots de Discord.',
    labels: {
        current: 'Atual',
        responsibilities: 'Responsabilidades',
        impact: 'Impacto',
        projects: 'Projetos',
        tools: 'Ferramentas de entrega',
        stack: 'Stack',
    },
    items: [
        {
            id: 'picpay',
            anchor: 'exp-picpay',
            company: picpay.name,
            context: `Fintech brasileira com cerca de ${picpay.registeredUsers} de usuários cadastrados e ${picpay.activeUsers} ativos.`,
            current: true,
            roles: [
                {
                    title: 'Engenheiro de Software (tempo integral)',
                    period: period(picpay.fullTime, 'pt'),
                    note: 'Área de cartões, aquisição de crédito. Também o Hub de Veículos na área de contas e o time de engenharia da área de RH.',
                },
                {
                    title: 'Engenheiro de Software (meio período)',
                    period: period(picpay.partTime, 'pt'),
                    note: 'TI corporativa, squad de Oracle HCM. Contato próximo com RH, Jurídico e Compliance.',
                },
            ],
            responsibilities: [
                `Escrevo e mantenho microsserviços em Java (Spring Boot, JPA) e Go na área de cartões, com mensageria, CI/CD e observabilidade. A área roda ${cards.microservices} microsserviços e sistemas legados que respondem milhões de requisições de centenas de milhares de clientes.`,
                'Analiso incidentes em vários microsserviços e cuido da confiabilidade do backend.',
                'Desenho arquitetura dentro das diretrizes de compliance da empresa.',
                `Faço o trabalho de CI/CD e de testes unitários em ${picpay.delivery.join(', ').replace(/, ([^,]*)$/, ' e $1')}.`,
                'Modelo bancos de dados e otimizo consultas.',
            ],
            impact: [
                `Encontrei e corrigi bugs e defeitos escondidos em ${cards.legacySystems} sistemas legados em Java, resolvi centenas de incidentes de clientes e criei jobs de autocorreção que limpam o banco de dados sem trabalho manual.`,
                `Liderei ${bodyshop.engineersLed} engenheiros no ${bodyshop.name}: ${bodyshop.services} serviços internos, feitos para trocar a imagem errada ou genérica de carro que ${br(bodyshop.customers)} de clientes veem. Tomei as decisões de stack e de escopo e levei o projeto até QA com aprovação da governança.`,
                `Escrevi o Agentic Template do ${bodyshop.name} antes do kickoff: arquivos compartilhados de tarefas, progresso e conhecimento, regras de teste primeiro, servidores MCP e skills. Os agentes de IA das ${bodyshop.teamSize} pessoas do time trabalharam a partir de um só contexto.`,
                `No ${survey.name}, em um time de ${survey.teamSize} pessoas, trabalhei na API de backend, na modelagem e nos índices do MySQL e na infraestrutura de uma plataforma de pesquisas para cerca de ${br(survey.employees)} funcionários.`,
                `No squad de Oracle HCM, deixei consultas em ${oracle.tables} tabelas e views de ${oracle.speedupMin} a ${oracle.speedupMax} vezes mais rápidas, e o trabalho economizou centenas de horas de pesquisa de engenheiros e analistas.`,
            ],
            tools: picpay.delivery,
            stacks: [],
            projects: ['cards', 'bodyshop', 'survey', 'oracle'],
            links: [],
        },
        {
            id: 'cofounder',
            anchor: 'exp-cofounder',
            company: `${hivemind.name} e ${trocatine.name}`,
            context: 'Dois MVPs de startup em pré-lançamento, apresentados ao público na ExpoTech. Não foram empregos em tempo integral, e não tiveram usuários reais.',
            current: false,
            roles: [
                {
                    title: 'Cofundador',
                    period: period(startups, 'pt'),
                    note: `${trocatine.name} em ${trocatine.year}, ${hivemind.name} em ${hivemind.year}.`,
                },
            ],
            responsibilities: [
                `${hivemind.name} (lead scoring B2B): liderei ${hivemind.developersLed} desenvolvedores no time de backend e dados, treinei os modelos e construí um serviço em FastAPI na AWS que carrega o modelo mais novo do S3 e faz a troca sem novo deploy.`,
                `${trocatine.name} (troca de roupas e brinquedos infantis): liderei o time de frontend de ${trocatine.frontendTeam} pessoas no MVP, feito em React e Tailwind CSS. Cuidei do backend dele em Java (Jakarta EE, JSP, JDBC, Apache Tomcat) e dos bancos de dados PostgreSQL na Aiven e no Docker.`,
                `A landing page pública do ${trocatine.name} é um site separado, em HTML, CSS e JavaScript puros.`,
            ],
            impact: [
                `O modelo do ${hivemind.name} foi de ${hivemind.modelBefore} para ${br(hivemind.modelAfter)}, e o custo de armazenamento dele caiu até ${br(hivemind.storageSaving)}.`,
                `Cerca de ${br(hivemind.visitors)} visitantes da ExpoTech deram nota ${br(hivemind.rating)} ao ${hivemind.name}.`,
                `Cerca de ${br(trocatine.visitors)} visitantes da ExpoTech deram nota ${br(trocatine.rating)} ao ${trocatine.name}.`,
            ],
            tools: [],
            stacks: [
                { label: `MVP do ${trocatine.name}`, items: trocatine.mvpStack },
                { label: hivemind.name, items: facts.cases.hivemind.stack },
            ],
            projects: ['hivemind'],
            links: [{ label: `Landing page do ${trocatine.name}`, to: '#app-trocatine' }],
        },
        {
            id: 'discord',
            anchor: 'exp-discord',
            company: 'Comunidades de Discord',
            context: 'Autodidata e autônomo. Foi onde aprendi a programar.',
            current: false,
            roles: [
                {
                    title: 'Desenvolvedor de bots e aplicações',
                    period: years(earlier.discord),
                    note: 'JavaScript (Node.js, Discord.js), Java para servidores de Minecraft, SQLite e MySQL. Hospedagem no Glitch e na Discloud.',
                },
            ],
            responsibilities: [
                'Construí bots de moderação, tickets, pesquisas, música e jogos (um RPG e um simulador de vida), além de webhooks.',
                `Construí o ${earlier.discord.bridge}, uma ponte de chat entre um servidor de Minecraft e o Discord: quem está no jogo conversa com quem está no Discord.`,
            ],
            impact: [
                `Os bots rodaram em comunidades de até ${earlier.discord.members} membros.`,
                `${legacy.folders} projetos daqueles anos estão públicos em um repositório.`,
            ],
            tools: [],
            stacks: [{ label: 'Bots', items: earlier.discord.stack }],
            projects: [],
            links: [{ label: 'glitch-legacy-projects', to: legacy.repo }],
        },
    ],
};
