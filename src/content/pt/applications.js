// Seção "Aplicações". Nomes, links, stacks e mídia ficam em facts.js (facts.projects).
// Lista 1: facts.appOrder.live, em produção. Lista 2: facts.appOrder.study, sem hospedagem.
// Os ids de facts.appOrder.featured têm os blocos `architecture` e `goals`.
import { facts } from '../facts.js';
import { duration, ptNumber as br } from '../format.js';

const p = facts.projects;
const { consignado: c, legacy, startups, site } = facts;
const ruph = facts.cases.ruph;
const card = p['credit-card-engine'];
const coldStart = duration(c.cluster.coldStartSeconds);

/** Uma aplicação. `architecture` e `goals` ficam null quando o app não é destaque. */
const app = (id, tagline, text, extra = {}) => ({ id, anchor: `app-${id}`, tagline, text, architecture: null, goals: null, caseId: null, media: null, ...extra });

export const applications = {
    label: 'Aplicações',
    title: 'O que roda hoje, e o que construí para estudar.',
    lead: 'Abra os que estão no ar. Leia o código dos que são públicos.',
    labels: {
        live: 'Abrir no ar',
        source: 'Código-fonte',
        privateSource: 'Código privado',
        stack: 'Stack',
        architecture: 'Arquitetura',
        goals: 'Objetivos',
        statusLive: 'No ar',
        statusStudy: 'Projeto de estudo',
        playClip: 'Reproduzir o clipe',
        pauseClip: 'Pausar o clipe',
    },
    live: {
        anchor: 'applications-live',
        title: 'Em produção',
        lead: 'Cada um roda em um endereço no ar. O Ruph é privado: só eu consigo entrar.',
        items: [
            app(
                'consignado',
                'Uma API em dois hosts da Azure, com cada requisição desenhada',
                'Uma API de crédito consignado em Java 21 e Spring Boot 3.5 que roda sem alteração como pods no AKS e dentro de uma Azure Function, atrás de um gateway em Java e de um edge na Cloudflare. O site desenha cada requisição como um diagrama ao vivo, com o tempo medido de cada etapa. É uma demonstração técnica com dados sintéticos, sem oferta de crédito.',
                {
                    media: {
                        preview: { caption: 'Um visitante envia uma simulação real para o host serverless. O trace repete a requisição etapa por etapa, e o Request Inspector abre nela.', alt: `Clipe do site do ${c.name}: o formulário de simulação e depois o diagrama da requisição com o tempo de cada etapa.` },
                        lifecycle: { caption: 'O replay de uma subida gravada do cluster AKS, a 8 vezes a velocidade real. O slider pula para 6 min 15 s, e o replay vai até o fim.', alt: `Clipe do site do ${c.name}: o replay da subida de um cluster AKS, etapa por etapa, até o cluster ficar pronto.` },
                        api: { caption: 'A API sozinha, em uma execução local: um convênio, um cliente e um empréstimo de 84 meses.', alt: 'Gravação de terminal: o curl cria um convênio e um cliente, depois simula um empréstimo e mostra a parcela.' },
                        'still-1': { caption: 'A simulação: o formulário com o resultado, e se a parcela cabe na margem.', alt: `Tela do site do ${c.name}: o formulário da simulação com o resultado e a checagem da margem.` },
                        'still-2': { caption: 'Uma simulação com o host quente, em forma de trace, com o Request Inspector aberto na mesma requisição.', alt: `Tela do site do ${c.name}: o trace de uma requisição do navegador até a API Spring Boot, e o painel Request Inspector.` },
                        'still-3': { caption: 'O replay de uma subida do cluster AKS, cada etapa com o tempo medido.', alt: `Tela do site do ${c.name}: o diagrama da subida de um cluster AKS no fim do replay.` },
                    },
                    architecture: [
                        `Edge: um Worker da Cloudflare com TLS, cache para arquivos estáticos e limite de ${c.rateLimit.requests} requisições a cada ${c.rateLimit.seconds} s por IP na API.`,
                        'Gateway: Java 21 no Azure Functions. Ele valida o token do Entra ID, aplica as regras de acesso, liga e desliga o cluster e devolve um trace de cada chamada.',
                        `Hosts: o mesmo jar no Azure Functions (chamada fria de ${br(c.serverless.coldMin)} a ${br(c.serverless.coldMax)} s, chamada quente de ${br(c.serverless.warmMin)} a ${br(c.serverless.warmMax)} s) e no AKS (${c.cluster.nodes} node, ${c.cluster.pods} pods atrás de um load balancer interno, chamada quente em cerca de ${br(c.cluster.warm)} s).`,
                        `Cluster: parado por padrão. Um visitante autenticado liga o cluster por uma janela de ${c.window.minutes} minutos. Uma subida a partir do cluster parado levou ${coldStart}.`,
                        `Dados e entrega: ${c.database.engine} com Flyway. O Terraform cria os recursos da Azure, e o GitHub Actions faz o deploy de cada repositório com OIDC.`,
                    ],
                    goals: [
                        'Comparar uma API em Kubernetes e em serverless, com custo e latência medidos.',
                        `Ficar dentro de um orçamento mensal de ${c.budget}: o gateway pausa o motor em 100%.`,
                        'Mostrar em código as regras de um crédito consignado: margem, tabela Price, estados do contrato, concorrência otimista e transactional outbox.',
                    ],
                },
            ),
            app(
                'ruph',
                'Um control plane para todos os apps que eu mantenho',
                'Minha própria plataforma. Ela mantém um registro dos meus apps e ambientes atrás de uma única API, e faz o deploy e o provisionamento deles em QA e em produção na GCP, Cloudflare, Vercel, Supabase e Neon. Um agente de IA pode escrever um plano ali, e só uma pessoa aprova. É privada: eu sou o único operador.',
                {
                    caseId: 'ruph',
                    architecture: [
                        'Uma API em TypeScript (Hono). O dashboard web, a CLI e o servidor MCP usam a mesma API.',
                        'Cloud Run para a API, Cloud SQL para o ledger em PostgreSQL, Secret Manager para os segredos e Terraform para as regras de acesso.',
                        `O GitHub Actions roda ${br(ruph.tests)} testes e os testes de migração do PostgreSQL, e só faz o deploy depois que os health checks passam.`,
                    ],
                    goals: [
                        'Um lugar que conhece cada app e cada ambiente.',
                        'Agentes de IA que ajudam na operação e não mudam a produção sozinhos.',
                        'Um registro de cada apply em um ledger append-only, com orçamentos que avisam ou pausam o trabalho.',
                    ],
                },
            ),
            app(
                'diabetes',
                `Uma estimativa de risco a partir de ${p.diabetes.inputs} respostas`,
                `Um serviço em FastAPI valida ${p.diabetes.inputs} entradas, carrega o modelo scikit-learn mais novo e devolve uma estimativa de risco com a confiança. O modelo é um Random Forest treinado com dados públicos do Kaggle. Começou como meu projeto final do CS50x. Não é um diagnóstico médico.`,
                {
                    architecture: [
                        `Uma página estática envia as ${p.diabetes.inputs} respostas para a API.`,
                        'O serviço em FastAPI valida cada entrada, roda o modelo e responde com a estimativa e a confiança.',
                        `${p.diabetes.endpoints} endpoints: status, health, models e predict.`,
                    ],
                    goals: [
                        'Levar um modelo de um notebook até uma API no ar.',
                        'Servir o modelo treinado mais novo sem mudar o código.',
                    ],
                },
            ),
            app('offmode', 'Um timer Pomodoro para foco profundo', 'Um timer de foco para web e desktop. Ele acompanha seu tempo de foco entre as sessões, com login e sincronização com o servidor.'),
            app('notes', 'Um editor de código em um único arquivo HTML', `Um bloco de notas com a cara e o jeito do VS Code, sem backend e sem conta. O Monaco destaca ${p.notes.languages} linguagens. Os arquivos ficam no navegador, ou vão direto para o seu disco no Chrome e no Edge. Tem ${p.notes.previews} previews ao vivo, de Markdown a Mermaid.`),
            app('doom', 'Doom em um arquivo, sem servidor', `O jogo de 1993 compilado de C para WebAssembly e compactado com gzip em um único arquivo HTML que se descompacta no navegador. O jogo compactado foi de ${p.doom.sizeBefore} para ${br(p.doom.sizeAfter)}. Fiz o projeto para estudar compressão.`),
            app('agentic', 'Um contexto para todos os agentes de IA', 'Um template de repositório em que agentes de IA conseguem trabalhar: arquivos de tarefas, progresso e conhecimento, regras de teste primeiro e um conjunto fixo de servidores MCP e skills.'),
            app('custom-square', 'Um playground de CSS', 'Mude propriedades de CSS, gradientes e cores e veja o resultado na hora. JavaScript puro, com o tema salvo no navegador.'),
            app('trocatine', 'A landing page do meu primeiro MVP de startup', `A página pública do ${startups.trocatine.name}, uma plataforma de troca de roupas e brinquedos infantis. Este endereço é só a landing page: HTML, CSS e JavaScript puros no GitHub Pages. O MVP do produto era uma aplicação separada, em React e Tailwind CSS.`),
        ],
    },
    study: {
        anchor: 'applications-study',
        title: 'Projetos de estudo e repositórios',
        lead: 'Sem hospedagem. Dados simulados, sem usuários e sem dinheiro real. O código é público.',
        items: [
            app('credit-card-engine', 'Quem recebe qual cartão, e por quê', `Um motor de cartões em Java 21 e Spring Boot com dois fluxos: aquisição para clientes novos e upgrade para clientes existentes. Quatro variantes: Débito (limite 0), Crédito Base (até ${br(card.variants.base)}), Crédito Platinum (até ${br(card.variants.platinum)}) e Crédito Black (acima de ${br(card.variants.platinum)}). Todas as regras de crédito ficam em um módulo de policy guiado por tabelas, e cada decisão é salva com os motivos.`),
            app('payment-gateway', 'Authorize, capture e refund, sem cobrança em dobro', 'Um payment gateway simulado para uma loja online, em Go e PostgreSQL, só backend. Tokenização de cartão e Pix, uma state machine para authorize, capture e refund, idempotency keys, um ledger em partidas dobradas e webhooks assinados via transactional outbox. O CI roda os testes com race detector contra um PostgreSQL real.'),
            app('devops-challenge', 'Quatro containers, um comando', `Um sistema distribuído em Docker Compose com ${p['devops-challenge'].containers} containers: um writer em Python, um reader em Go, um front end web em Node.js e o Redis entre eles.`),
            app('incident-api', 'Alertas e incidentes, com interface de terminal', 'Um serviço de alertas e incidentes em PHP (Hyperf, Swoole) que recebe métricas e grava em MySQL e Redis. Vem com uma interface de terminal em Python.'),
            app('legacy', `Onde eu comecei, de ${legacy.from} a ${legacy.to}`, `${legacy.folders} projetos dos meus anos de Glitch: bots de Discord em Node.js com Discord.js e SQLite, sites pequenos em Express e Fastify com páginas em HTML e CSS, e a configuração de um servidor de Minecraft. Foi nesse código que eu aprendi.`),
            app('student-tools', 'Ferramentas gratuitas para estudantes de engenharia', 'Uma lista curada das ferramentas e dos créditos gratuitos do GitHub Student Developer Pack. Uma contribuição para a comunidade, sem código.'),
        ],
    },
    // Usado pela lista de links no fim da seção.
    more: { text: 'Há mais repositórios no meu perfil do GitHub.', label: 'Perfil no GitHub', to: facts.contact.github },
    siteNote: `O ${site.domain} e os apps dentro dele recebem mais de ${site.monthlyVisitors} visitantes e ${site.requests} requisições por mês, medidos na Cloudflare.`,
};
