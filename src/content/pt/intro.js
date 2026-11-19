// Seção "Introdução": quem eu sou e o que eu faço. As afirmações ficam aqui, e cada
// uma tem um link para a prova mais abaixo na página ou em um repositório público.
//
// Formato: .claude/backlog/redesign/CONTENT-SHAPE.md. Os números vêm de facts.js.
// Um módulo (tile) tem uma ideia: título de até 6 palavras e texto de até 160 caracteres.
import { facts } from '../facts.js';
import { duration, ptNumber as br } from '../format.js';
import { link } from '../rich.js';

const { person, picpay, startups, earlier, consignado: c, site, legacy, art } = facts;
const { bodyshop, survey, cards, oracle } = picpay;
const { hivemind, trocatine } = startups;
const ruph = facts.cases.ruph;
const m = Object.fromEntries(Object.entries(art.margin).map(([key, value]) => [key, typeof value === 'string' ? br(value) : value]));
const refused = { income: br(art.margin.refused.income), marginLimit: br(art.margin.refused.marginLimit), status: art.margin.refused.status };
const card = facts.projects['credit-card-engine'];
const part = Object.fromEntries(art.coldStart.parts.map((p) => [p.id, duration(p.seconds)]));
const coldStart = duration(art.coldStart.totalSeconds);
const warmDb = art.trace.warm.stages.find((s) => s.id === 'database').ms;

/** Um módulo. As chaves que um tipo não usa ficam null. */
const tile = (id, kind, title, text, extra = {}) => ({ id, kind, title, text, value: null, source: null, art: null, to: null, ...extra });

export const intro = {
    label: 'Introdução',
    title: 'Eu projeto, construo e opero sistemas de backend, do primeiro diagrama até a fatura.',
    lead: `${person.yearsEngineering} anos de experiência em engenharia e ${person.yearsInTech} anos em tecnologia, em sistemas que respondem milhões de requisições no trabalho e em plataformas que eu mesmo pago.`,
    proofLabel: 'Provas',
    toolsLabel: 'Ferramentas',
    sourceLabel: 'Fonte',

    opening: {
        label: 'Quem eu sou',
        title: 'Quem sou eu?',
        photo: { alt: `${person.name}: retrato de perto, com cabelo escuro e cacheado.` },
        paragraphs: [
            [`Eu sou ${person.name}, e quase todo mundo na internet me chama de ${person.alias}. Sou engenheiro de software. Meu trabalho é backend, arquitetura e cloud: os serviços, os dados e a infraestrutura em que um produto roda.`],
            [
                `Tenho ${person.yearsEngineering} anos de experiência em engenharia e ${person.yearsInTech} anos em tecnologia. Escrevi meu primeiro código em ${person.codingSince}, em `,
                link('bots de Discord', '#exp-discord'),
                ` que rodavam em comunidades de até ${earlier.discord.members} membros. Hoje trabalho no `,
                link(picpay.name, '#exp-picpay'),
                `, uma fintech brasileira com cerca de ${picpay.registeredUsers} de usuários cadastrados, nos motores que decidem quem recebe um cartão de crédito.`,
            ],
            [
                'Também construo e opero meus próprios sistemas, porque quero conhecer uma plataforma até a fatura dela. O ',
                link(c.name, '#app-consignado'),
                ' roda uma API em Spring Boot em dois hosts da Azure atrás de um gateway, e o site dele desenha cada requisição com o tempo que cada etapa levou. O ',
                link('Ruph', '#app-ruph'),
                ' é a minha própria plataforma na GCP: ele faz o deploy dos meus apps, e um agente de IA pode planejar uma mudança ali, mas só eu posso aprovar.',
            ],
            [
                `Engenharia de performance é a parte de que eu mais gosto. No trabalho, deixei consultas em Oracle de ${oracle.speedupMin} a ${oracle.speedupMax} vezes mais rápidas. No meu próprio projeto, medi a subida de um cluster em quatro partes. Orientei ${earlier.reddit.people} pessoas em `,
                link('montagens de PC', '#more-volunteering'),
                ', e no tempo livre estudo ',
                link('a injeção eletrônica de Honda Civics antigos', '#more-hobbies'),
                '.',
            ],
        ],
    },

    chaptersLabel: 'O que eu faço',
    chapters: [
        {
            id: 'architecture',
            label: 'Arquitetura',
            poster: 'Trade-offs',
            headline: 'Pergunto quanto um desenho custa antes de desenhar.',
            lead: 'Cada desenho aqui começou com uma pergunta de custo: quantos serviços, quantos hosts, quantas chamadas a um modelo.',
            paragraphs: [
                [
                    'No ',
                    link(survey.name, '#case-survey'),
                    `, no ${picpay.name}, o primeiro plano era um conjunto de microsserviços. Perguntei por quê. A resposta era um produto, um time de ${survey.teamSize} pessoas e um banco de dados, então o time construiu um monólito em camadas em PHP para uma plataforma que atende cerca de ${br(survey.employees)} funcionários.`,
                ],
                [
                    `Liderei ${bodyshop.engineersLed} engenheiros no `,
                    link(bodyshop.name, '#case-bodyshop'),
                    `, que mostra a cada cliente uma imagem do próprio carro. Geramos uma imagem para cada marca, modelo, ano e cor, guardamos em um caminho fixo no S3 e consultamos um registro antes de chamar qualquer modelo. No piloto, ${br(bodyshop.approvalRate)} das imagens foram aprovadas já na geração, em menos de ${bodyshop.endToEnd} do pedido até a imagem. Quando a equipe troca uma imagem ruim, o arquivo novo ocupa o mesmo caminho e o app não precisa de release.`,
                ],
                [
                    'O ',
                    link(c.name, '#app-consignado'),
                    ' é a minha resposta para uma dúvida que eu tinha sobre hosts: quanto custa a mesma API em Kubernetes e em serverless? Um único artefato de build roda como pods no AKS e dentro de uma Azure Function. Um gateway em Java fica na frente dos dois, valida cada token e devolve um trace de cada chamada. A ',
                    link('tabela de decisões', c.docs.decisions),
                    ' traz o trade-off de cada escolha e o que um banco faria no lugar, e ',
                    link(`${c.adrs} registros de decisão`, c.docs.adrs),
                    ' guardam os detalhes.',
                ],
            ],
            tiles: [
                tile('request-path', 'art', 'Uma API, dois hosts', 'Navegador, edge na Cloudflare e um gateway em Java. Depois o mesmo jar em Azure Functions e em pods no AKS, com um PostgreSQL.', { art: 'requestPath' }),
                tile('approval', 'stat', 'Aprovadas na geração', `Imagens do piloto do ${bodyshop.name} que não precisaram de curadoria manual, em menos de ${bodyshop.endToEnd} cada.`, { value: br(bodyshop.approvalRate), source: `Piloto do ${bodyshop.name} no ${picpay.name}` }),
                tile('monolith', 'stat', 'Funcionários, um monólito', `O ${survey.name} saiu de um plano de microsserviços para um monólito em camadas depois de uma pergunta.`, { value: br(survey.employees), source: `${survey.name} no ${picpay.name}` }),
                tile('adrs', 'stat', 'Registros de decisão', 'Camadas, dinheiro e arredondamento, concorrência, outbox, dois hosts, o gateway, o edge e o orçamento.', { value: `${c.adrs}`, source: 'consignado-api, pasta docs/adr' }),
            ],
            tools: facts.chapterTools.architecture,
            proof: [
                { label: survey.name, to: '#case-survey' },
                { label: bodyshop.name, to: '#case-bodyshop' },
                { label: c.name, to: '#app-consignado' },
                { label: 'Diagramas de arquitetura', to: c.docs.architecture },
            ],
        },
        {
            id: 'backend',
            label: 'Backend',
            poster: 'Serviços',
            headline: 'Escrevo serviços que continuam corretos quando duas requisições chegam juntas.',
            lead: `Java e Go nos motores de cartões do ${picpay.name}, PHP em uma plataforma interna, Oracle SQL em dados de RH. Meus projetos mostram o mesmo trabalho com código público.`,
            paragraphs: [
                [
                    'No ',
                    link(picpay.name, '#exp-picpay'),
                    ' eu trabalho nos ',
                    link('motores de aquisição e upgrade de cartões', '#case-cards'),
                    `: ${cards.microservices} microsserviços em Java (Spring Boot, JPA) e Go, com os sistemas legados em volta deles. Eles respondem milhões de requisições de centenas de milhares de clientes. Encontrei e corrigi defeitos em ${cards.legacySystems} sistemas legados em Java e criei jobs que limpam o banco de dados sem trabalho manual.`,
                ],
                [
                    'Antes da área de cartões, passei nove meses em ',
                    link('Oracle SQL', '#case-oracle'),
                    `: ${oracle.tables} tabelas e views sem documentação. Reduzi consultas de milhares de linhas para centenas e deixei cada uma de ${oracle.speedupMin} a ${oracle.speedupMax} vezes mais rápida. No `,
                    link(bodyshop.name, '#case-bodyshop'),
                    ' escolhi Go com Gin e MongoDB. No ',
                    link(survey.name, '#case-survey'),
                    ' trabalhei na API em PHP (Hyperf) e nos índices do MySQL.',
                ],
                [
                    'O código público está no ',
                    link('consignado-api', c.repos.api),
                    `: Java 21 e Spring Boot 3.5, com ${c.tests.api} testes e um build que falha abaixo de ${c.tests.coverageGate} de cobertura de linhas. Um contrato passa por ${c.contractStates} estados seguindo uma única tabela de transições. Cada contrato tem uma versão, então uma requisição com o header If-Match desatualizado recebe 412. Um lock na linha do cliente impede que duas aprovações usem a mesma margem.`,
                ],
                [
                    'Os eventos saem dessa API por um transactional outbox que mantém a ordem por contrato entre os pods. O ',
                    link('payment gateway em Go', '#app-payment-gateway'),
                    ' aplica as mesmas ideias com idempotency keys e um ledger em partidas dobradas, e o ',
                    link('motor de cartões de crédito', '#app-credit-card-engine'),
                    ' concentra todas as regras de crédito em um módulo de policy.',
                ],
            ],
            tiles: [
                tile('trace', 'art', 'Uma requisição, etapa por etapa', `Uma escrita autenticada levou ${art.trace.warm.totalMs} ms no gateway. O banco de dados usou ${warmDb} ms disso, em ${art.trace.warm.statements.total} comandos SQL.`, { art: 'trace' }),
                tile('states', 'art', 'A máquina de estados do contrato', 'Uma tabela de transições. A aprovação confere a margem de novo. A ativação grava as parcelas.', { art: 'contractStates' }),
                tile('tests', 'stat', 'Testes no consignado-api', `Testes de unidade, web, repositório, integração e arquitetura. O build falha abaixo de ${c.tests.coverageGate} de cobertura de linhas.`, { value: `${c.tests.api}`, source: 'Execução do CI do consignado-api na main, 18/11/2026' }),
                tile('oracle', 'stat', 'Vezes mais rápidas, em Oracle', `${oracle.tables} tabelas e views no ${picpay.name}. As consultas foram de milhares de linhas para centenas.`, { value: `${oracle.speedupMin} a ${oracle.speedupMax}`, source: `Meu perfil no LinkedIn, experiência no ${picpay.name}` }),
            ],
            tools: facts.chapterTools.backend,
            proof: [
                { label: 'Motores de cartões', to: '#case-cards' },
                { label: 'Oracle HCM', to: '#case-oracle' },
                { label: c.name, to: '#app-consignado' },
                { label: 'Payment gateway', to: '#app-payment-gateway' },
                { label: 'Motor de cartões de crédito', to: '#app-credit-card-engine' },
            ],
        },
        {
            id: 'cloud',
            label: 'Cloud',
            poster: coldStart,
            headline: 'Sei o que cada serviço de cloud faz e quanto ele custa por hora.',
            lead: `Uma integração real em cada cloud: AWS no ${picpay.name} e em um MVP de startup, GCP na minha própria plataforma, Azure no ${c.name}.`,
            paragraphs: [
                [
                    'Na AWS, o ',
                    link(bodyshop.name, '#case-bodyshop'),
                    ' guarda a imagem de cada carro no S3, atrás do CloudFront. O caminho de uma imagem nunca muda, então uma imagem corrigida chega ao app sem release. Para o ',
                    link(hivemind.name, '#case-hivemind'),
                    ` construí um serviço em FastAPI no EC2 que carrega o modelo mais novo do S3 e faz a troca em execução. A mudança de Random Forest para Regressão Logística levou o arquivo do modelo de ${hivemind.modelBefore} para ${br(hivemind.modelAfter)}.`,
                ],
                [
                    'O ',
                    link('Ruph', '#app-ruph'),
                    `, minha própria plataforma, roda na GCP: Cloud Run para a API, Cloud SQL para o ledger em PostgreSQL, Secret Manager para os segredos e Terraform para as regras de acesso. O GitHub Actions só faz o deploy de uma versão nova depois que ${br(ruph.tests)} testes e os health checks passam.`,
                ],
                [
                    'O ',
                    link(c.name, '#app-consignado'),
                    ` fica na Azure, e o Terraform cria os recursos: AKS, dois function apps, Blob Storage para o site, Key Vault, PostgreSQL e as identidades. O cluster tem um node ${c.cluster.node} a ${br(c.cluster.nodePerHour)} por hora. Isso dá cerca de ${c.cluster.nodePerMonth} em um mês inteiro, mais do que todo o orçamento mensal de ${c.budget} (cerca de ${c.budgetUsd}). Por isso o cluster fica parado por padrão, e um visitante autenticado liga o cluster por uma janela de ${c.window.minutes} minutos, que custa cerca de ${br(c.window.cost)}.`,
                ],
                [
                    `Medi em partes a subida desse cluster parado. Foram ${coldStart} até a primeira resposta: ${part.controlPlane} do control plane, ${part.node} do node, ${part.app} do Spring Boot com o banco de dados e ${part.balancer} do load balancer. A Azure também recusou partes do primeiro plano. O Front Door é proibido em assinatura de estudante, então o edge é um Worker da Cloudflare. A região ${c.database.hostsRegion} não tinha capacidade para o tamanho do banco de dados, então o PostgreSQL fica em ${c.database.region}, e cada comando SQL atravessa um oceano. A `,
                    link('tabela de decisões', c.docs.decisions),
                    ' traz o custo de cada uma dessas escolhas.',
                ],
                [
                    `Meu interesse começa abaixo do serviço gerenciado. De ${earlier.reddit.start} a ${earlier.reddit.end} eu `,
                    link(`orientei ${earlier.reddit.people} pessoas`, '#more-volunteering'),
                    ' no Reddit sobre peças para PCs de jogos, de trabalho e servidores. Escolho o tamanho de uma instância do jeito que escolho uma CPU: pela carga e pelo preço.',
                ],
            ],
            tiles: [
                tile('clouds', 'art', 'Três clouds, por serviço', `AWS no ${picpay.name} e no ${hivemind.name}. GCP na minha própria plataforma. Azure no ${c.name}.`, { art: 'clouds' }),
                tile('cold-start', 'art', 'Um cold start em quatro partes', `Control plane ${part.controlPlane}, node ${part.node}, Spring Boot com banco de dados ${part.app}, load balancer ${part.balancer}.`, { art: 'coldStart', value: coldStart, source: 'README do consignado-api, medido em 17/11/2026' }),
                tile('budget', 'stat', 'Orçamento mensal, com trava', `Em 100%, o gateway pausa o motor e para o cluster. Uma janela de acesso custa cerca de ${br(c.window.cost)}.`, { value: c.budget, source: 'consignado.kmads.dev, seção de custo' }),
                tile('builds', 'stat', 'Pessoas orientadas em PCs', `Peças, orçamento e consertos para PCs de jogos, de trabalho e servidores no Reddit, de ${earlier.reddit.start} a ${earlier.reddit.end}.`, { value: earlier.reddit.people, source: 'Meu perfil no LinkedIn, voluntariado' }),
            ],
            tools: facts.chapterTools.cloud,
            proof: [
                { label: `${bodyshop.name} na AWS`, to: '#case-bodyshop' },
                { label: `${hivemind.name} na AWS`, to: '#case-hivemind' },
                { label: 'Ruph na GCP', to: '#app-ruph' },
                { label: `${c.name} na Azure`, to: '#app-consignado' },
                { label: 'Consultoria de hardware', to: '#more-volunteering' },
            ],
        },
        {
            id: 'cicd',
            label: 'CI/CD',
            poster: 'Push na main',
            headline: 'Meus pipelines fazem o deploy a cada push e depois conferem o resultado no ar.',
            lead: 'O GitHub Actions entra com OIDC, então nenhuma senha de deploy fica guardada. Cada imagem leva o commit como tag.',
            paragraphs: [
                [
                    'O pipeline do ',
                    link('consignado-api', c.docs.workflow),
                    ' roda a cada push na main. Ele compila e testa, monta a imagem, entra na Azure com o OIDC do GitHub, envia a imagem com o commit como tag, liga o cluster quando ele está parado, aplica os manifests, espera o rollout e roda um smoke test dentro do cluster. A identidade de deploy tem permissão em um único namespace. Cada action é fixada em um SHA de commit, e o inspetor de requisições do site liga uma requisição ao commit que respondeu.',
                ],
                [
                    'O Terraform cria os recursos da Azure com remote state. Eu rodo o Terraform à mão, porque ele precisa do meu login. No ',
                    link('Ruph', '#app-ruph'),
                    `, o GitHub Actions roda ${br(ruph.tests)} testes e os testes de migração do PostgreSQL, e só faz o deploy depois que os health checks passam.`,
                ],
                [
                    link('O workflow deste site', site.workflow),
                    ` segue o mesmo padrão em escala menor. Cada pull request passa pelos testes, pelo build, por uma checagem em navegador real e por uma checagem de responsividade. Depois de um push na main, o workflow publica o build, espera até o ${site.domain} servir exatamente aquele commit e então confere cada link no endereço real.`,
                ],
                [
                    'No ',
                    link(picpay.name, '#exp-picpay'),
                    ` meu trabalho de CI/CD e de testes unitários roda em ${picpay.delivery.join(', ').replace(/, ([^,]*)$/, ' e $1')}, e o `,
                    link(bodyshop.name, '#case-bodyshop'),
                    ' foi para QA com aprovação da governança.',
                ],
            ],
            tiles: [
                tile('pipeline', 'art', 'Um push, sete etapas', 'Build e testes, imagem, login com OIDC, push, ligar o cluster, rollout e smoke test dentro do cluster.', { art: 'pipeline' }),
                tile('passwords', 'stat', 'Senhas de deploy guardadas', 'GitHub Actions, pods e functions provam quem são com OIDC, workload identity e managed identities.', { value: '0', source: 'consignado-api, docs/platform/architecture.md' }),
                tile('repositories', 'stat', 'Repositórios com deploy no push', `A API, a parte serverless e o site do ${c.name}. A tag de cada imagem é o commit.`, { value: '3', source: 'consignado.kmads.dev, seção Delivery' }),
                tile('site-workflow', 'link', 'O workflow deste site', `Testes, build, checagem em navegador e publicação. Depois, uma checagem de que o ${site.domain} serve este commit.`, { art: 'sitePipeline', to: site.workflow }),
            ],
            tools: facts.chapterTools.cicd,
            proof: [
                { label: 'Workflow do consignado-api', to: c.docs.workflow },
                { label: 'Workflow deste site', to: site.workflow },
                { label: 'Ruph', to: '#app-ruph' },
                { label: picpay.name, to: '#exp-picpay' },
            ],
        },
        {
            id: 'fullstack',
            label: 'Full-stack',
            poster: `Desde ${person.codingSince}`,
            headline: `Minhas primeiras aplicações web rodaram em ${person.codingSince}, em JavaScript e HTML.`,
            lead: 'Hoje eu construo o frontend quando o sistema precisa de um, e sei o que ele pede da API e da infraestrutura por trás.',
            paragraphs: [
                [
                    `Comecei em ${person.codingSince} com `,
                    link('bots de Discord', '#exp-discord'),
                    ' em JavaScript, hospedados no Glitch. Ao lado dos bots eu fazia sites pequenos em Express, com páginas em HTML e CSS. ',
                    link(`${legacy.folders} desses projetos`, legacy.repo),
                    ' estão públicos em um repositório.',
                ],
                [
                    `Em ${trocatine.year} liderei o time de frontend de duas pessoas do ${trocatine.name}. O MVP era em React e Tailwind CSS, e `,
                    link('a landing page pública', '#app-trocatine'),
                    ` é em HTML, CSS e JavaScript puros. No ${picpay.name}, o `,
                    link(bodyshop.name, '#case-bodyshop'),
                    ' tem um app de curadoria em React e Vite, e o ',
                    link(survey.name, '#case-survey'),
                    ' tem um app em Angular na frente da API em PHP.',
                ],
                [
                    'Meu maior frontend é o site do ',
                    link(c.name, '#app-consignado'),
                    '. Ele é feito em React com Cloudscape. O diagrama dele vem do trace que o gateway devolve: cada etapa com os milissegundos medidos, e um selo de cold start que só o gateway pode marcar. ',
                    link('Este site', site.repo),
                    ' é React e Vite sem biblioteca de UI, e os fluxogramas leem o mesmo arquivo de dados que o texto.',
                ],
            ],
            tiles: [
                tile('timeline', 'art', `De ${person.codingSince} a 2026`, 'Bots de Discord, páginas em Express, a landing page de uma startup, um app de curadoria no trabalho e um site que desenha as próprias requisições.', { art: 'timeline' }),
                tile('legacy', 'stat', 'Projetos antigos, públicos', 'Bots de Discord em Node.js, sites em Express e Fastify com HTML e CSS, e a configuração de um servidor de Minecraft.', { value: `${legacy.folders}`, source: 'Repositório kmadsdev/glitch-legacy-projects' }),
                tile('visitors', 'stat', 'Visitantes por mês', `O ${site.domain} e os apps dentro dele respondem ${site.requests} requisições por mês.`, { value: site.monthlyVisitors, source: `Analytics da Cloudflare para o ${site.domain}` }),
            ],
            tools: facts.chapterTools.fullstack,
            proof: [
                { label: 'glitch-legacy-projects', to: legacy.repo },
                { label: 'Anos de Discord', to: '#exp-discord' },
                { label: `Landing page do ${trocatine.name}`, to: '#app-trocatine' },
                { label: `Site do ${c.name}`, to: '#app-consignado' },
                { label: 'Código-fonte deste site', to: site.repo },
            ],
        },
        {
            id: 'finance',
            label: 'Sistemas financeiros',
            poster: 'Margem',
            headline: 'Sei como funcionam uma decisão de cartão e um crédito consignado, regra por regra.',
            lead: `Cartões no ${picpay.name}, só em palavras. Crédito consignado, um motor de cartões e um payment gateway nos meus projetos de estudo, com dados sintéticos.`,
            paragraphs: [
                [
                    'No ',
                    link(picpay.name, '#exp-picpay'),
                    ' eu trabalho com ',
                    link('aquisição e upgrade de cartões', '#case-cards'),
                    `: os motores que decidem, em tempo real, se um cliente recebe um cartão e qual. Os mesmos serviços respondem solicitações de clientes que chegam pelo Banco Central e auditorias internas. Descrevo esse trabalho só em palavras, porque o código e os números pertencem ao ${picpay.name}.`,
                ],
                [
                    'Para mostrar o mesmo domínio com código público, construí três projetos de estudo com dados sintéticos. O ',
                    link('consignado-api', '#app-consignado'),
                    ` é um crédito consignado. A parcela sai da folha de pagamento, então o convênio limita a fatia do salário líquido que as parcelas podem ocupar. Com salário líquido de ${m.netSalary} e limite de ${m.capPercent}, a margem é de ${m.marginLimit}. Um empréstimo de ${m.principal} em ${m.termMonths} meses, a ${m.monthlyRate} ao mês, tem parcela fixa de ${m.installment} na tabela Price. A API compara a maior parcela, ${m.largestInstallment}, com a margem livre, na simulação e de novo na aprovação.`,
                ],
                [
                    'O ',
                    link('motor de cartões de crédito', '#app-credit-card-engine'),
                    ` tem um fluxo de aquisição para clientes novos e um de upgrade para clientes existentes, ${card.variantCount} variantes de cartão e um módulo de policy que salva cada decisão com os motivos. O `,
                    link('payment gateway', '#app-payment-gateway'),
                    ' em Go faz authorize, capture e refund com idempotency keys, um ledger em partidas dobradas e webhooks assinados. Nenhum dos três tem clientes reais ou dinheiro real. O README do consignado-api lista o que não foi construído, de IOF e CET até a integração com a folha.',
                ],
            ],
            tiles: [
                tile('margin', 'art', 'A regra da margem, na prática', `Salário líquido de ${m.netSalary} a ${m.capPercent} dá ${m.marginLimit}. A maior parcela, ${m.largestInstallment}, cabe.`, { art: 'margin' }),
                tile('pairs', 'stat', 'Pares de estados testados', `Uma tabela de transições decide cada passagem entre os ${c.contractStates} estados do contrato. Um teste de unidade cobre todos os pares.`, { value: `${c.statusPairs}`, source: 'README do consignado-api, seção Tests' }),
                tile('variants', 'stat', 'Variantes de cartão, uma policy', `Débito, Crédito Base até ${br(card.variants.base)}, Platinum até ${br(card.variants.platinum)} e Black acima disso.`, { value: `${card.variantCount}`, source: 'Repositório kmadsdev/credit-card-engine' }),
                tile('synthetic', 'note', 'Só dados sintéticos', `${c.data.agreements} convênios, ${c.data.customers} clientes, ${c.data.simulations} simulações e ${c.data.contracts} contratos. Nenhum cliente real e nenhuma oferta de crédito.`),
            ],
            tools: facts.chapterTools.finance,
            proof: [
                { label: 'Motores de cartões', to: '#case-cards' },
                { label: c.name, to: '#app-consignado' },
                { label: 'Motor de cartões de crédito', to: '#app-credit-card-engine' },
                { label: 'Payment gateway', to: '#app-payment-gateway' },
            ],
        },
        {
            id: 'ai',
            label: 'Agentes de IA para código',
            poster: 'Um contexto',
            headline: 'Dou aos agentes de IA regras, ferramentas e um contexto compartilhado.',
            lead: `Antes do kickoff do ${bodyshop.name}, escrevi o template de onde partiram os agentes das ${bodyshop.teamSize} pessoas do time.`,
            paragraphs: [
                [
                    'O ',
                    link('Agentic Template', '#app-agentic'),
                    ' é uma estrutura de repositório: arquivos compartilhados de tarefas, progresso e conhecimento, regras de teste primeiro e um conjunto fixo de servidores MCP e skills. No ',
                    link(bodyshop.name, '#case-bodyshop'),
                    ` os agentes das ${bodyshop.teamSize} pessoas partiram desse mesmo contexto.`,
                ],
                [
                    'O ',
                    link('Ruph', '#app-ruph'),
                    ' tem um servidor MCP ao lado do dashboard web, da API REST e da CLI. Um agente pode escrever um plano por ele. Só uma pessoa aprova um plano, e cada apply vai para um ledger append-only.',
                ],
                ['Trabalho com Claude Code e Codex com regras de teste primeiro: o teste existe antes do código. Desde 2025 também estudo a camada abaixo do agente, de modelos locais a quantização e fine-tuning.'],
            ],
            tiles: [
                tile('context', 'stat', 'Pessoas, um contexto de agente', `Arquivos de tarefas, progresso e conhecimento que cada agente do time do ${bodyshop.name} lia primeiro.`, { value: `${bodyshop.teamSize}`, source: `Time do ${bodyshop.name} no ${picpay.name}` }),
                tile('entries', 'stat', 'Entradas do Ruph', 'Web, REST, CLI e um servidor MCP usam a mesma API. Um agente planeja e uma pessoa aprova.', { value: `${ruph.entries}`, source: 'Ruph, minha própria plataforma' }),
                tile('template', 'link', 'Agentic Template', 'A página pública do template: arquivos, regras, servidores MCP e skills.', { to: facts.projects.agentic.live }),
            ],
            tools: facts.chapterTools.ai,
            proof: [
                { label: 'Agentic Template', to: '#app-agentic' },
                { label: bodyshop.name, to: '#case-bodyshop' },
                { label: 'Ruph', to: '#app-ruph' },
            ],
        },
        {
            id: 'endtoend',
            label: 'De ponta a ponta',
            poster: null,
            headline: 'Levo um projeto do primeiro commit até um endereço no ar.',
            lead: 'Nos meus projetos eu faço o desenho, o código, os testes, a infraestrutura e o deploy, e pago a fatura.',
            paragraphs: [
                [
                    'O ',
                    link(c.name, '#app-consignado'),
                    ' e o ',
                    link('Ruph', '#app-ruph'),
                    ' são os dois maiores. ',
                    link('As aplicações em produção', '#applications-live'),
                    ' vêm primeiro, e depois ',
                    link('os repositórios de estudo', '#applications-study'),
                    ', que não estão hospedados.',
                ],
            ],
            tiles: [
                tile('live', 'link', 'Em produção', `${c.name}, minha própria plataforma e os apps públicos, cada um com o endereço no ar.`, { to: '#applications-live' }),
                tile('study', 'link', 'Repositórios de estudo', 'Um motor de cartões, um payment gateway e dois desafios, com código-fonte público.', { to: '#applications-study' }),
            ],
            tools: facts.chapterTools.endtoend,
            proof: [
                { label: 'Aplicações em produção', to: '#applications-live' },
                { label: 'Projetos de estudo e repositórios', to: '#applications-study' },
            ],
        },
    ],

    // Rótulos dos desenhos. Estrutura e números: facts.art.
    // `summary` é o desenho em texto (leitores de tela, movimento reduzido).
    art: {
        requestPath: {
            title: `Caminho de uma requisição no ${c.name}`,
            summary: 'Uma requisição sai do navegador para um Worker da Cloudflare. As páginas vêm de um site estático no Blob Storage. As chamadas de API vão para um gateway em Java no Azure Functions. O gateway encaminha para o host serverless ou, por um load balancer interno, para os pods no AKS. Os dois hosts rodam o mesmo jar e usam um único banco de dados PostgreSQL.',
            groups: { cloudflare: 'Cloudflare', azure: 'Azure' },
            nodes: {
                browser: { label: 'Navegador', note: 'Visitante ou usuário autenticado' },
                edge: { label: 'Worker da Cloudflare', note: `TLS, cache, ${c.rateLimit.requests} requisições a cada ${c.rateLimit.seconds} s por IP` },
                site: { label: 'Site estático', note: 'Blob Storage' },
                gateway: { label: 'Gateway em Java', note: 'Azure Functions. Valida o token, aplica limites, gera o trace' },
                function: { label: 'Host serverless', note: 'O jar da API no Azure Functions' },
                balancer: { label: 'Load balancer interno', note: 'Sem endereço público' },
                pods: { label: 'Pods no AKS', note: `O mesmo jar, ${c.cluster.pods} pods` },
                database: { label: c.database.engine, note: 'Um banco de dados para os dois hosts' },
            },
            edges: [
                'HTTPS',
                'Páginas, em cache',
                'Chamadas de API, com a chave do edge',
                'Rota serverless, com a chave do host',
                'Rota do Kubernetes, endereço privado',
                'Service',
                'SQL com TLS',
                'SQL com TLS',
            ],
        },
        trace: {
            title: 'Duas requisições reais, por etapa',
            summary: `Uma escrita autenticada, com o host quente, levou ${art.trace.warm.totalMs} ms no gateway, com ${warmDb} ms no banco de dados em ${art.trace.warm.statements.total} comandos SQL. A primeira chamada depois de um tempo parado levou ${br((art.trace.cold.totalMs / 1000).toFixed(1))} s, e o cold start do host serverless usou 18,6 s disso.`,
            total: 'Total no gateway',
            noTime: 'Sem tempo no trace',
            statements: 'comandos SQL',
            warm: { label: 'Chamada quente', note: 'Cadastro de um cliente, autenticado, host serverless' },
            cold: { label: 'Chamada fria', note: 'Simulação de um visitante, primeira chamada depois de um tempo parado' },
            stages: {
                request: 'Requisição',
                edge: 'Edge',
                gateway: 'Gateway',
                identity: 'Validação do token',
                keyvault: 'Key Vault',
                host: 'Host do Functions',
                coldStart: 'Cold start do host',
                app: 'Aplicação',
                database: 'Banco de dados',
                response: 'Resposta',
            },
        },
        contractStates: {
            title: 'Estados do contrato no consignado-api',
            summary: 'Uma simulação vira um contrato proposto. Um contrato proposto é aprovado, rejeitado ou cancelado. Um contrato aprovado fica ativo ou é cancelado. Um contrato ativo é liquidado ou cancelado. Rejeitado, liquidado e cancelado são estados finais.',
            states: {
                SIMULATED: 'Simulado',
                PROPOSED: 'Proposto',
                APPROVED: 'Aprovado',
                REJECTED: 'Rejeitado',
                ACTIVE: 'Ativo',
                SETTLED: 'Liquidado',
                CANCELLED: 'Cancelado',
            },
            transitions: {
                propose: 'Criar o contrato',
                approve: 'Aprovar, com a margem conferida de novo',
                reject: 'Rejeitar',
                cancel: 'Cancelar',
                activate: 'Ativar, com as parcelas gravadas',
                settle: 'Liquidar',
            },
        },
        clouds: {
            title: 'Três clouds, por serviço',
            summary: `AWS: trabalho no ${picpay.name} e o MVP do ${hivemind.name}. GCP: Ruph, minha própria plataforma. Azure: ${c.name}, meu próprio projeto.`,
            aws: {
                name: 'AWS',
                context: `${picpay.name} e ${hivemind.name}`,
                nodes: {
                    cloudfront: { label: 'CloudFront', use: `Entrega as imagens do ${bodyshop.name} e o app do ${survey.name}` },
                    s3: { label: 'S3', use: `Imagens do ${bodyshop.name} em caminhos fixos, arquivos de modelo do ${hivemind.name}` },
                    sqs: { label: 'SQS', use: `Fila entre o pedido do app e o serviço de imagens do ${bodyshop.name}` },
                    ec2: { label: 'EC2', use: `API e serviço de ML do ${hivemind.name}` },
                    rds: { label: 'RDS', use: `PostgreSQL no ${picpay.name}: contas de clientes, cartões emitidos, transações` },
                },
            },
            gcp: {
                name: 'GCP',
                context: 'Ruph, minha própria plataforma',
                nodes: {
                    cloudRun: { label: 'Cloud Run', use: 'Roda a API do Ruph' },
                    cloudSql: { label: 'Cloud SQL', use: 'PostgreSQL do ledger' },
                    secretManager: { label: 'Secret Manager', use: 'Origem dos segredos' },
                    iam: { label: 'IAM', use: 'Regras de acesso, gerenciadas pelo Terraform' },
                    terraform: { label: 'Terraform', use: 'Cria e altera os recursos' },
                    actions: { label: 'GitHub Actions', use: 'Testes, e deploy depois dos health checks' },
                },
            },
            azure: {
                name: 'Azure',
                context: `${c.name}, meu próprio projeto`,
                nodes: {
                    aks: { label: 'AKS', use: `${c.cluster.nodes} node, de ${c.cluster.pods} a ${c.cluster.podsMax} pods, parado por padrão` },
                    functions: { label: 'Azure Functions', use: 'O gateway e o host serverless' },
                    blob: { label: 'Blob Storage', use: 'O site estático' },
                    keyVault: { label: 'Key Vault', use: 'Segredos, montados pelo CSI driver' },
                    postgres: { label: 'Azure Database for PostgreSQL', use: 'Um banco de dados para os dois hosts' },
                    entra: { label: 'Entra ID', use: 'Login, workload identity e OIDC para os deploys' },
                    registry: { label: 'Container Registry', use: 'Imagens com o commit como tag' },
                    tables: { label: 'Table Storage', use: 'Usuários, sessões e estado do motor do gateway' },
                },
            },
        },
        coldStart: {
            title: 'Subida de um cluster AKS parado',
            summary: `Do pedido da janela até a primeira resposta: ${coldStart}. Control plane ${part.controlPlane}, node ${part.node}, Spring Boot com banco de dados ${part.app}, load balancer ${part.balancer}. Uma execução medida em 17/11/2026.`,
            total: 'Do pedido à primeira resposta',
            parts: {
                controlPlane: 'Control plane',
                node: 'Node',
                app: 'Spring Boot e banco de dados',
                balancer: 'Load balancer',
            },
        },
        pipeline: {
            title: 'Job de deploy do consignado-api',
            summary: 'A cada push na main: compilar e testar, montar a imagem, entrar com OIDC, enviar a imagem com o commit como tag, ligar o cluster quando ele está parado, aplicar os manifests e esperar o rollout, rodar um smoke test dentro do cluster.',
            stages: {
                test: { label: 'Build e testes', does: 'Maven verify com PostgreSQL em Testcontainers e a trava de cobertura' },
                image: { label: 'Imagem', does: 'Monta a imagem do container e roda um smoke test nela' },
                login: { label: 'Login com OIDC', does: 'O GitHub prova a execução para o Entra ID. Nenhuma senha guardada' },
                push: { label: 'Push', does: 'Envia a imagem para o registry. A tag é o commit' },
                cluster: { label: 'Ligar o cluster', does: 'Liga o cluster AKS quando ele está parado' },
                rollout: { label: 'Rollout', does: 'Aplica os manifests em um namespace e espera os pods' },
                smoke: { label: 'Smoke test', does: 'Chama a API dentro do cluster e confere o endereço do load balancer' },
            },
        },
        sitePipeline: {
            title: 'Workflow deste site',
            summary: `Testes, build, uma checagem em navegador real e uma checagem de responsividade. Na main: publicar no GitHub Pages, esperar o ${site.domain} servir o commit e conferir cada link.`,
            stages: {
                test: { label: 'Testes', does: 'Regras de conteúdo e testes de componentes' },
                build: { label: 'Build', does: 'Build com Vite' },
                browser: { label: 'Checagem em navegador', does: 'Abre o build em um navegador real' },
                responsive: { label: 'Checagem de responsividade', does: 'Confere o layout nos tamanhos de tela da lista' },
                publish: { label: 'Publicação', does: 'Envia o build para o GitHub Pages' },
                verify: { label: 'Checagem no ar', does: `Espera o ${site.domain} servir este commit e confere cada link` },
            },
        },
        timeline: {
            title: `Trabalho full-stack, de ${person.codingSince} a 2026`,
            summary: 'Bots de Discord em JavaScript em 2018. Sites em Express com HTML e CSS até 2021. A landing page do TrocaTine em 2024. Apps em React e Angular no trabalho em 2025. O site do Consignado Cloud e este site em 2026.',
            items: {
                bots: { label: 'Bots de Discord', text: 'JavaScript no Glitch' },
                sites: { label: 'Sites em Express', text: 'Páginas em HTML e CSS ao lado dos bots' },
                trocatine: { label: `${trocatine.name}: MVP em React, landing page`, text: 'HTML, CSS e JavaScript puros' },
                work: { label: `Apps no ${picpay.name}`, text: 'App de curadoria em React, app de pesquisas em Angular' },
                consignado: { label: `Site do ${c.name}`, text: 'Desenha cada requisição a partir do trace' },
            },
        },
        margin: {
            title: 'Conferência de margem de um crédito consignado',
            summary: `Salário líquido de ${m.netSalary} vezes o limite de ${m.capPercent} dá uma margem de ${m.marginLimit}. Um empréstimo de ${m.principal} em ${m.termMonths} meses, a ${m.monthlyRate} ao mês, tem parcela de ${m.installment}. A maior parcela é de ${m.largestInstallment}, abaixo da margem, então o empréstimo cabe. Com renda de ${refused.income} o limite é de ${refused.marginLimit}, e a API recusa com status ${refused.status}.`,
            rule: 'A maior parcela precisa caber na margem livre.',
            labels: {
                netSalary: 'Salário líquido',
                cap: 'Limite do convênio',
                marginLimit: 'Margem',
                principal: 'Empréstimo',
                term: 'Meses',
                rate: 'Taxa ao mês',
                installment: 'Parcela',
                largest: 'Maior parcela',
                total: 'Total a pagar',
                fits: 'Cabe na margem',
                refused: 'Recusado: renda baixa demais',
                synthetic: 'Exemplo do README. Números sintéticos.',
            },
        },
    },
};
