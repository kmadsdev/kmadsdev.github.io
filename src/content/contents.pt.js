// CONTENTS · PORTUGUESE: every sentence, label, button text, alt text and caption in
// Brazilian Portuguese ("você", technical words in English, "banco de dados").
// contents.en.js has the same keys in the same order.
//
// HOW TO EDIT
//   Find a text      Search this file for words that you see on the page.
//   A sentence       Change it here and in contents.en.js.
//   A number         Change it in contents.global.js. Text in `backticks` prints it: ${picpay.cards.legacySystems}.
//                    Keep the ${...} part when you change the words around it.
//   ptNumber(value)  Writes a number the Brazilian way: ptNumber('8.8M') gives '8,8M'.
//   A link target    Change the address in contents.global.js.
//   Rich text        A paragraph with links or bold text is a list of parts:
//                    'plain text', { text: 'link text', to: '#anchor' }, { text: 'bold text', strong: true }.
//                    `to` is an id of `anchors` in contents.global.js with '#', or an https address.
//   Page metadata    Not here. It is `meta` in contents.global.js, in English only.
//   Then run         npx vitest run tests/contents.test.js
//
// CONTENTS (in the order of the page; search for "─── pt.<name>")
//   nav, hero, intro (opening, chapters, art), experience, cases, education,
//   applications, hobbies, figma, contact, footer, controls, player, rulers, art, notFound, noscript
import { art, consignado, discord, education, hobbies, languages, legacy, links, order, person, picpay, projects, reddit, startups } from './contents.global.js';
import { duration, monthYear, period, ptNumber } from './format.js';

// Names of the music player controls, for screen readers. The same keys are in contents.en.js.
export const player = {
    play: 'Tocar a música',
    pause: 'Pausar a música',
    restart: 'Tocar a música do início',
    openOnSpotify: 'Abrir a música no Spotify',
    nowPlaying: 'Tocando agora',
    volume: 'Volume',
    mute: 'Silenciar',
    unmute: 'Ativar o som',
};

// Name of the ruler at the right side, which is in step with the scroll bar.
export const rulers = {
    scroll: 'Rolagem da página',
};

export const pt = {
    // ─── pt.nav ─────────────────────────────────────────────────────────────
    // Top bar: skip link, section menu, language switch.
    nav: {
        skip: 'Pular para o conteúdo',
        menu: 'Seções',
        items: [
            { id: 'intro', label: 'Introdução' },
            { id: 'experience', label: 'Experiência' },
            { id: 'education', label: 'Formação' },
            { id: 'applications', label: 'Aplicações' },
            { id: 'more', label: 'Hobbies' },
            { id: 'contact', label: 'Contato' },
        ],
        open: 'Abrir o menu',
        close: 'Fechar o menu',
        language: 'Idioma',
        languages: { en: 'Inglês', pt: 'Português' },
        codes: { en: 'EN', pt: 'PT' },
    },

    // ─── pt.hero ────────────────────────────────────────────────────────────
    // First screen: the name (contents.global.js), the role, a summary, the location and four links.
    hero: {
        role: 'Engenheiro de Software',
        focus: 'Arquitetura & Cloud',
        summary: [
            `Meu foco é desenvolvimento backend, arquitetura de sistemas escaláveis, confiáveis e performáticos, e cloud. Tenho ${person.yearsEngineering} anos de experiência em engenharia, mas estou em tecnologia desde ${person.codingSince}, e hoje trabalho nos motores de crédito do `,
            { text: 'PicPay', to: links.picpay },
            `, com impacto em mais de ${picpay.customersMillions} milhões de correntistas no Brasil.`,
        ],
        location: [`${person.city}, ${person.state}, Brasil`, 'Remoto', person.utc],
        localTime: 'Hora local',
        links: [
            { id: 'cv', label: 'Currículo', href: links.cvPath },
            { id: 'email', label: 'Email', href: `mailto:${links.email}` },
            { id: 'linkedin', label: 'LinkedIn', href: links.linkedin },
            { id: 'github', label: 'GitHub', href: links.github },
        ],
        scroll: 'Role',
    },

    // ─── pt.intro ───────────────────────────────────────────────────────────
    // "Introduction": who I am and what I do, in an opening block and eight chapters.
    intro: {
        label: 'Introdução',
        title: 'Eu projeto, construo e opero sistemas de backend, da arquitetura até a primeira chamada de API em prod',
        lead: `${person.yearsEngineering} anos operando sistemas que respondem milhões de requisições no PicPay, na AWS, e na minha própria infraestrutura na GCP, nos meus projetos pessoais.`,
        proofLabel: 'Provas',
        toolsLabel: 'Ferramentas',
        sourceLabel: 'Fonte',

        // ─── pt.intro.opening ───────────────────────────────────────────────
        // Each paragraph starts with a bold part.
        opening: {
            title: '👋 Olá,',
            // The owner's own joke. He asked to keep it (2026-11-20).
            photo: { alt: 'Baita foto aqui, você devia contratar esse cara.' },
            paragraphs: [
                [
                    { text: `Meu nome é ${person.name}`, strong: true },
                    ', e quase todo mundo na internet me chama de ',
                    { text: person.alias, strong: true },
                    '. Sou Engenheiro de Software e trabalho principalmente com sistemas de backend, e desenho soluções escaláveis e confiáveis para ambientes de cloud e serviços de software completos, de ponta a ponta. Isso quer dizer aquilo em que o produto roda, os dados que servem o produto e a infraestrutura por baixo de tudo isso.',
                ],
                [
                    { text: `Trabalho como Engenheiro de Software desde o início de ${person.engineerSince}`, strong: true },
                    `, mas programo projetos pequenos desde o início de ${person.codingSince}, quando eu atendia algumas centenas de pessoas em comunidades no Discord, no Minecraft e no Reddit.`,
                ],
                [
                    { text: 'Escrevi meu primeiro código em JavaScript', strong: true },
                    ', enquanto eu (tentava) criar um ',
                    { text: 'bot de Discord', to: '#exp-discord' },
                    ` que rodaria em uma das minhas comunidades, com ${discord.firstCommunity} usuários. Depois de vários meses de trabalho eu tinha uma aplicação de backend completa, que administrava meu servidor de forma automática (baseada em eventos): atribuía cargos em massa, criava eventos, rodava jogos (um RPG e um jogo no estilo GTA, sem interface), tocava música nas chamadas (integração com a API do Spotify) e até mandava avisos por webhooks para quem quebrava as regras (moderação).`,
                ],
                [
                    { text: 'Hoje trabalho no ', strong: true },
                    { text: 'PicPay', to: '#exp-picpay', strong: true },
                    `, uma fintech brasileira com cerca de ${picpay.customersMillions}M de usuários cadastrados, nos motores que decidem quem recebe um cartão de crédito.`,
                ],
                [
                    { text: 'No meu tempo livre', strong: true },
                    ', construo e opero meus próprios sistemas, porque quero aprender como a infraestrutura de uma plataforma funciona, até os mínimos detalhes. Criei o ',
                    { text: 'Ruph', to: projects.ruph.live },
                    ', que é a minha própria plataforma e roda na GCP. Ele faz o deploy dos meus apps, roda pipelines de CD e IaC, define regras de orçamento e de FinOps e provisiona recursos (compute, storage, auth, CI/CD e mais) em vários provedores (GCP, AWS, Azure, Vercel), em uma única interface visual.',
                ],
                [
                    { text: 'Há pouco tempo, para aprender mais sobre Kubernetes e Azure', strong: true },
                    ', criei o ',
                    { text: 'Consignado Cloud', to: projects.consignado.live },
                    ', que é uma calculadora de crédito consignado em Spring Boot. Ela roda no AKS ou em Azure Functions, com um diagrama visual, em tempo real, da infraestrutura da minha conta na Azure. ',
                    { text: 'Fonte', to: projects['consignado-api'].repo },
                ],
                [
                    { text: 'Também sou apaixonado por engenharia de performance', strong: true },
                    `. No trabalho, deixei consultas em Oracle SQL de centenas de fontes do HCM ${picpay.oracle.speedupMin}-${picpay.oracle.speedupMax}x mais rápidas. No Consignado Cloud, medi a subida de um cluster em quatro partes. `,
                    { text: `Orientei ${reddit.people} pessoas nas montagens de PC delas`, to: '#more-volunteering' },
                    ', e no tempo livre estudo acerto de ECU/EFI e a injeção eletrônica de Honda Civics antigos. ',
                    { text: 'Fonte', to: links.carRepo },
                ],
            ],
        },

        // ─── pt.intro.chapters ──────────────────────────────────────────────
        // One chapter: label, headline, optional lead, paragraphs, optional story (opens with
        // "Read the full story"), drawings, stats (number rows) and proof links.
        // Tool names: chapterTools in contents.global.js.
        chaptersLabel: 'O que eu faço',
        chapters: [
            {
                id: 'architecture',
                label: 'Arquitetura',
                poster: 'Trade-offs',
                headline: 'Me dê qualquer projeto, e eu desenho, de ponta a ponta',
                paragraphs: [
                    [
                        'No ',
                        { text: 'Consignado Cloud', to: '#app-consignado' },
                        ' o fluxo é bem simples de propósito: Navegador do usuário -> DNS & WAF -> Gateway -> AKS ou Azure Functions -> Azure DB for Postgres. É um projeto de estudo que mostra, de forma visual, como uma arquitetura direta mas real deve rodar. Ele também facilita achar pontos de melhoria, por exemplo o ponto exato entre os serviços para colocar um cache.',
                    ],
                    [
                        `No Project Survey, no PicPay, o primeiro plano era microsserviços, Redis e vários bancos de dados. Perguntei por quê: um produto, um time de ${picpay.survey.teamSize} pessoas e um banco de dados, cerca de ${ptNumber(picpay.survey.employees)} usuários, algumas centenas ao mesmo tempo. Depois de analisar as variáveis, fechamos em uma interface simples em Angular conectada a um monólito em camadas em PHP Hyperf, com MySQL. O Redis entrou depois.`,
                    ],
                ],
                drawings: [
                    {
                        id: 'request-path',
                        art: 'requestPath',
                        title: 'Uma API em dois hosts',
                        text: 'Navegador, Worker da Cloudflare e um gateway em Java. Depois o mesmo jar em um host serverless e em dois pods no AKS, com um banco de dados.',
                    },
                ],
                stats: [],
                proof: [
                    { label: 'Project Survey', to: '#case-survey' },
                    { label: 'Consignado Cloud', to: '#app-consignado' },
                ],
            },
            {
                id: 'backend',
                label: 'Backend',
                poster: 'Serviços',
                headline: 'Escrevo serviços que continuam corretos quando duas requisições chegam juntas',
                lead: 'Java e Go nos motores de crédito e de cartões do PicPay, PHP em uma plataforma interna, Oracle SQL em dados de RH. Meus projetos mostram a mesma lógica de trabalho em código aberto.',
                paragraphs: [
                    [
                        'No ',
                        { text: 'PicPay', to: '#exp-picpay' },
                        ` eu trabalho nos motores da calculadora de crédito e de aquisição e upgrade de cartões: ${picpay.cards.microservices} microsserviços, principalmente em Java (Spring Boot, JPA), com os sistemas legados em volta deles. Eles respondem milhões de requisições de centenas de milhares de clientes. Encontrei e corrigi defeitos em ${picpay.cards.legacySystems} sistemas legados em Java e criei jobs que limpam o banco de dados sem trabalho manual.`,
                    ],
                ],
                drawings: [
                    {
                        id: 'trace',
                        art: 'trace',
                        title: 'Uma requisição, etapa por etapa',
                        text: `Uma escrita autenticada levou ${art.trace.warm.totalMs} ms no gateway. O banco de dados usou ${art.trace.warm.ms.database} ms disso, em ${art.trace.warm.statements} comandos SQL.`,
                    },
                    {
                        id: 'states',
                        art: 'contractStates',
                        title: 'A máquina de estados do contrato',
                        text: 'Uma tabela de transições. A aprovação confere a margem de novo. A ativação grava as parcelas.',
                    },
                ],
                stats: [
                    {
                        id: 'tests',
                        value: `${consignado.tests}`,
                        title: 'Testes no consignado-api',
                        source: 'Execução do CI do consignado-api na main, 18/11/2026',
                    },
                    {
                        id: 'oracle',
                        value: `${picpay.oracle.speedupMin}-${picpay.oracle.speedupMax}x`,
                        title: 'Vezes mais rápidas, em Oracle',
                        source: 'Meu perfil no LinkedIn, experiência no PicPay',
                    },
                ],
                proof: [
                    { label: 'Motores de cartões', to: '#case-cards' },
                    { label: 'Oracle HCM', to: '#case-oracle' },
                    { label: 'Consignado Cloud', to: '#app-consignado' },
                    { label: 'Payment gateway', to: '#app-payment-gateway' },
                    { label: 'Motor de cartões de crédito', to: '#app-credit-card-engine' },
                ],
            },
            {
                id: 'cloud',
                label: 'Cloud',
                headline: 'Escolho um serviço de cloud pelo que ele entrega e por quanto custa',
                lead: 'Uma integração real em cada cloud: AWS no PicPay e em um MVP de startup, GCP na minha própria plataforma, Azure no Consignado Cloud.',
                paragraphs: [
                    [
                        'Na AWS, o ',
                        { text: 'BodyShop', to: '#case-bodyshop' },
                        ' guarda a imagem de cada carro no S3, atrás do CloudFront. O caminho de uma imagem nunca muda, então uma imagem corrigida chega ao app sem release. Para o ',
                        { text: 'HiveMind', to: '#case-hivemind' },
                        ` construí um serviço em FastAPI no EC2 que carrega o modelo mais novo do S3 e faz a troca em execução. A mudança de Random Forest para Regressão Logística levou o arquivo do modelo de ${startups.hivemind.modelBefore} para ${ptNumber(startups.hivemind.modelAfter)}.`,
                    ],
                    [
                        'O ',
                        { text: 'Ruph', to: '#app-ruph' },
                        ', minha própria plataforma, roda na GCP: Cloud Run para a API, Cloud SQL para o ledger em PostgreSQL, Secret Manager para os segredos e Terraform para as regras de acesso. O GitHub Actions só faz o deploy de uma versão nova depois que os testes e os health checks passam.',
                    ],
                    [
                        'O ',
                        { text: 'Consignado Cloud', to: '#app-consignado' },
                        ` fica na Azure, e o Terraform cria os recursos: AKS, dois function apps, Blob Storage para o site, Key Vault, PostgreSQL e as identidades. O cluster tem um node ${consignado.cluster.node} a ${ptNumber(consignado.cluster.nodePerHour)} por hora, o que dá cerca de ${consignado.cluster.nodePerMonth} em um mês inteiro. Por isso o cluster fica parado por padrão, e um visitante autenticado liga o cluster por uma janela de ${consignado.window.minutes} minutos, que custa cerca de ${ptNumber(consignado.window.cost)}.`,
                    ],
                    [
                        `Medi em quatro partes a subida desse cluster parado: o control plane, o node, o Spring Boot com o banco de dados e o load balancer. A Azure também recusou partes do primeiro plano. O Front Door é proibido em assinatura de estudante, então o edge é um Worker da Cloudflare. A região ${consignado.database.hostsRegion} não tinha capacidade para o tamanho do banco de dados, então o PostgreSQL fica em ${consignado.database.region}, e cada comando SQL atravessa um oceano. A `,
                        { text: 'tabela de decisões', to: links.consignadoDecisions },
                        ' traz o custo de cada uma dessas escolhas.',
                    ],
                    [
                        `Meu interesse começa abaixo do serviço gerenciado. De ${reddit.start} a ${reddit.end} eu `,
                        { text: 'orientei pessoas no Reddit', to: '#more-volunteering' },
                        ' sobre peças para PCs de jogos, de trabalho e servidores. Escolho o tamanho de uma instância do jeito que escolho uma CPU: pela carga e pelo preço.',
                    ],
                ],
                drawings: [
                    {
                        id: 'clouds',
                        art: 'clouds',
                        title: 'Exemplos em AWS, GCP e Azure',
                        text: 'AWS no PicPay e no HiveMind. GCP no Ruph, minha própria plataforma. Azure no Consignado Cloud.',
                    },
                    {
                        id: 'cold-start',
                        art: 'coldStart',
                        title: 'Um cold start em quatro partes',
                        text: 'O control plane, o node, o Spring Boot com o banco de dados e o load balancer.',
                    },
                ],
                stats: [],
                proof: [
                    { label: 'BodyShop na AWS', to: '#case-bodyshop' },
                    { label: 'HiveMind na AWS', to: '#case-hivemind' },
                    { label: 'Ruph na GCP', to: '#app-ruph' },
                    { label: 'Consignado Cloud na Azure', to: '#app-consignado' },
                    { label: 'Consultoria de hardware', to: '#more-volunteering' },
                ],
            },
            {
                id: 'cicd',
                label: 'CI/CD',
                poster: 'Push na main',
                headline: 'Meus pipelines rodam os testes, fazem o deploy e fazem rollback automático em caso de falha, com um único push',
                paragraphs: [
                    [
                        'O pipeline de Continuous Deployment do ',
                        { text: 'consignado-api', to: projects['consignado-api'].repo },
                        ' roda a cada push na main.',
                    ],
                    ['Ele roda todos os testes unitários, monta a imagem, entra na Azure com o OIDC do GitHub, envia a imagem com o commit como tag, liga o cluster se ele estiver parado, aplica os manifests, espera o rollout e roda um smoke test dentro do cluster.'],
                    ['A identidade de deploy tem permissão em um único namespace. Cada action é fixada em um SHA de commit, e o inspetor de requisições do site liga uma requisição ao commit que respondeu.'],
                ],
                drawings: [
                    {
                        id: 'pipeline',
                        art: 'pipeline',
                        title: 'Um push, sete etapas',
                        text: 'Build e testes, imagem, login com OIDC, push, ligar o cluster, rollout e smoke test dentro do cluster.',
                    },
                    {
                        id: 'default-workflow',
                        art: 'defaultWorkflow',
                        title: 'Meu workflow padrão de CI/CD',
                        text: 'Dois fluxos com os mesmos passos: uma branch de feature vai para QA, e QA vai para produção.',
                    },
                ],
                stats: [],
                proof: [
                    { label: 'Workflow do consignado-api', to: links.consignadoWorkflow },
                    { label: 'Workflow deste site', to: links.workflow },
                ],
            },
            {
                id: 'fullstack',
                label: 'Full-stack',
                poster: `Desde ${person.codingSince}`,
                headline: `Minhas primeiras aplicações web foram feitas em ${person.codingSince}, com JavaScript e HTML`,
                paragraphs: [
                    ['Hoje eu construo o frontend quando o sistema precisa de um, e sei o que ele pede da API e da infraestrutura por trás.'],
                    [
                        `Comecei em ${person.codingSince} com sites simples e `,
                        { text: 'aplicações para Discord', to: '#exp-discord' },
                        ` em JavaScript, hospedados no Glitch.com (uma plataforma que foi desativada). Ao lado dos bots eu fazia sites pequenos em Express, com HTML e CSS. Hoje ${legacy.folders} desses projetos estão `,
                        { text: 'no meu GitHub', to: legacy.repo },
                        ' (não consegui recuperar todos).',
                    ],
                ],
                story: [
                    [
                        `Em ${startups.trocatine.year} liderei o time de frontend de duas pessoas do TrocaTine. O MVP era em React e Tailwind CSS, e a landing page pública é em HTML, CSS e JavaScript puros. No PicPay, o BodyShop tem um app de curadoria em React e Vite, e o Project Survey tem um app em Angular na frente da API em PHP.`,
                    ],
                    [
                        'Meu maior frontend é o site do Consignado Cloud. Ele é feito em React com Cloudscape. O diagrama dele vem do trace que o gateway devolve: cada etapa com os milissegundos medidos, e um selo de cold start que só o gateway pode marcar. ',
                        { text: 'Este site', to: links.repo },
                        ' é React e Vite sem biblioteca de UI, e os fluxogramas leem o mesmo arquivo de dados que o texto.',
                    ],
                ],
                drawings: [
                    {
                        id: 'timeline',
                        art: 'timeline',
                        title: `Trabalho full-stack, de ${person.codingSince} a 2026`,
                        text: 'Bots de Discord, sites em Express, um MVP de startup, apps no PicPay e um site que desenha as próprias requisições.',
                    },
                ],
                stats: [
                    {
                        id: 'legacy',
                        value: `${legacy.folders}`,
                        title: 'Projetos antigos, públicos',
                        source: 'Repositório kmadsdev/glitch-legacy-projects',
                    },
                ],
                proof: [
                    { label: 'glitch-legacy-projects', to: legacy.repo },
                    { label: 'Anos de Discord', to: '#exp-discord' },
                    { label: 'Landing page do TrocaTine', to: '#app-trocatine' },
                    { label: 'Site do Consignado Cloud', to: '#app-consignado' },
                    { label: 'Código-fonte deste site', to: links.repo },
                ],
            },
            {
                id: 'finance',
                label: 'Sistemas financeiros',
                poster: 'Margem',
                headline: 'Sei como as decisões de cartão e de empréstimo são tomadas no nível do negócio',
                lead: [
                    'No PicPay tive contato próximo com o pipeline inteiro: da aquisição de um cliente, passando pelo processo de conseguir um cartão, até o cartão chegar na casa do cliente. Usei esse conhecimento para criar simulações de ',
                    { text: 'crédito consignado', to: projects['consignado-api'].repo },
                    ', de um ',
                    { text: 'motor de cartões', to: projects['credit-card-engine'].repo },
                    ' e de um ',
                    { text: 'payment gateway', to: projects['payment-gateway'].repo },
                    ' como projetos de estudo.',
                ],
                paragraphs: [
                    [
                        'No ',
                        { text: 'PicPay', to: '#exp-picpay' },
                        ' eu trabalho com ',
                        { text: 'aquisição e upgrade de cartões', to: '#case-cards' },
                        ': os motores que decidem, em tempo real, se um cliente recebe um cartão e qual. Os mesmos serviços respondem solicitações de clientes que chegam pelo Banco Central e auditorias internas. Descrevo esse trabalho só em palavras, porque o código e os números pertencem ao PicPay.',
                    ],
                    [
                        'Para mostrar o mesmo domínio com código público, construí três projetos meus com dados sintéticos. O ',
                        { text: 'consignado-api', to: '#app-consignado' },
                        ` é uma API de crédito consignado. A parcela sai da folha de pagamento, então o convênio limita a fatia do salário líquido que as parcelas podem ocupar. Com salário líquido de ${ptNumber(art.margin.netSalary)} e limite de ${art.margin.capPercent}, a margem é de ${ptNumber(art.margin.marginLimit)}. Um empréstimo de ${ptNumber(art.margin.principal)} em ${art.margin.termMonths} meses, a ${ptNumber(art.margin.monthlyRate)} ao mês, tem parcela fixa de ${ptNumber(art.margin.installment)} na tabela Price. A API compara a maior parcela, ${ptNumber(art.margin.largestInstallment)}, com a margem livre, na simulação e de novo na aprovação.`,
                    ],
                    [
                        'O ',
                        { text: 'motor de cartões de crédito', to: '#app-credit-card-engine' },
                        ` tem um fluxo de aquisição para clientes novos e um de upgrade para clientes existentes, ${consignado.cardVariants} variantes de cartão e um módulo de policy que salva cada decisão com os motivos. O `,
                        { text: 'payment gateway', to: '#app-payment-gateway' },
                        ' em Go faz authorize, capture e refund com idempotency keys, um ledger em partidas dobradas e webhooks assinados. Nenhum dos três tem clientes reais ou dinheiro real. O README do consignado-api lista o que não foi construído, por exemplo IOF, CET e a integração com a folha.',
                    ],
                ],
                drawings: [
                    {
                        id: 'margin',
                        art: 'margin',
                        title: 'Conferência de um crédito consignado',
                        text: `Salário líquido de ${ptNumber(art.margin.netSalary)} a ${art.margin.capPercent} dá ${ptNumber(art.margin.marginLimit)}. A maior parcela, ${ptNumber(art.margin.largestInstallment)}, cabe.`,
                    },
                ],
                stats: [],
                proof: [
                    { label: 'Motores de cartões', to: '#case-cards' },
                    { label: 'Consignado Cloud', to: '#app-consignado' },
                    { label: 'Motor de cartões de crédito', to: '#app-credit-card-engine' },
                    { label: 'Payment gateway', to: '#app-payment-gateway' },
                ],
            },
            {
                id: 'ai',
                label: 'Agentes de IA para código',
                poster: 'Um contexto',
                headline: 'Dou aos agentes de IA regras, ferramentas e um contexto compartilhado',
                lead: `Antes do kickoff do BodyShop, escrevi o template de onde partiram os agentes das ${picpay.bodyshop.teamSize} pessoas do time.`,
                paragraphs: [
                    [
                        'O ',
                        { text: 'Agentic Template', to: '#app-agentic' },
                        ' é uma estrutura de repositório: arquivos compartilhados de tarefas, progresso e conhecimento, regras de teste primeiro e um conjunto fixo de servidores MCP e skills. No ',
                        { text: 'BodyShop', to: '#case-bodyshop' },
                        ` os agentes das ${picpay.bodyshop.teamSize} pessoas partiram desse mesmo contexto.`,
                    ],
                ],
                drawings: [],
                stats: [],
                proof: [
                    { label: 'Agentic Template', to: '#app-agentic' },
                    { label: 'BodyShop', to: '#case-bodyshop' },
                ],
            },
            {
                id: 'endtoend',
                label: 'De ponta a ponta',
                headline: 'Pego uma ideia, transformo em código e depois em um endereço no ar',
                lead: 'Nos meus projetos eu parto de um insight e faço o desenho, o código, os testes, a infraestrutura e o deploy.',
                paragraphs: [
                    [
                        'O ',
                        { text: 'Consignado Cloud', to: '#app-consignado' },
                        ' e o ',
                        { text: 'Ruph', to: '#app-ruph' },
                        ' são os dois maiores. ',
                        { text: `${order.apps.production.length + order.apps.other.length} aplicações`, to: '#applications-live' },
                        ' rodam em produção hoje, e ',
                        { text: `${order.apps.study.length} repositórios de estudo`, to: '#applications-study' },
                        ' têm código público.',
                    ],
                ],
                drawings: [],
                stats: [],
                proof: [
                    { label: 'Aplicações em produção', to: '#applications-live' },
                    { label: 'Projetos de estudo e outros', to: '#applications-study' },
                ],
            },
        ],

        // ─── pt.intro.art ───────────────────────────────────────────────────
        // Labels of the drawings. Structure and numbers: `art` in contents.global.js.
        // `summary` is the text form of the drawing (screen readers, reduced motion).
        art: {
            requestPath: {
                title: 'Arquitetura do Consignado Cloud',
                summary: 'Uma requisição sai do navegador para um Worker da Cloudflare. Dentro da Azure, o Worker envia as páginas para um site estático e as chamadas de API para um gateway em Java. O gateway encaminha para o host serverless ou para um load balancer. O load balancer envia a requisição para o pod 1 ou para o pod 2 no AKS. O host serverless e os dois pods usam um único banco de dados na Azure.',
                frames: { azure: 'Azure', aks: 'AKS' },
                nodes: {
                    browser: { label: 'Navegador', note: 'Visitante ou usuário autenticado' },
                    worker: { label: 'Worker da Cloudflare', note: `TLS, cache, ${consignado.rateLimit.requests} requisições a cada ${consignado.rateLimit.seconds} s por IP` },
                    gateway: { label: 'Gateway em Java', note: 'Azure Functions. Valida o token, aplica limites, gera o trace' },
                    serverless: { label: 'Host serverless', note: 'O jar da API no Azure Functions' },
                    database: { label: 'Azure DB', note: `${consignado.database.engine}, um banco de dados para os dois hosts` },
                    site: { label: 'Site estático', note: 'Blob Storage' },
                    balancer: { label: 'Load balancer', note: 'Interno, sem endereço público' },
                    pod1: { label: 'Pod #1', note: 'O mesmo jar' },
                    pod2: { label: 'Pod #2', note: 'O mesmo jar' },
                },
                edges: [
                    'HTTPS',
                    'Chamadas de API, com a chave do edge',
                    'Páginas, em cache',
                    'Rota serverless, com a chave do host',
                    'Rota do Kubernetes, endereço privado',
                    'SQL com TLS',
                    'Service',
                    'Service',
                    'SQL com TLS',
                    'SQL com TLS',
                ],
            },
            trace: {
                title: 'Duas requisições reais, por etapa',
                summary: `Uma escrita autenticada, com o host quente, levou ${art.trace.warm.totalMs} ms no gateway, com ${art.trace.warm.ms.database} ms no banco de dados em ${art.trace.warm.statements} comandos SQL. A primeira chamada depois de um tempo parado levou ${ptNumber(art.trace.cold.totalSeconds)} s, e o cold start do host serverless usou ${ptNumber(consignado.serverless.coldMin)} s disso.`,
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
                title: 'Exemplos em AWS, GCP e Azure',
                summary: 'AWS: trabalho no PicPay e o MVP do HiveMind. GCP: Ruph, minha própria plataforma. Azure: Consignado Cloud, meu próprio projeto.',
                aws: {
                    name: 'AWS',
                    context: 'PicPay e HiveMind',
                    nodes: {
                        cloudfront: { label: 'CloudFront', use: 'Entrega as imagens do BodyShop e o app do Project Survey' },
                        s3: { label: 'S3', use: 'Imagens do BodyShop em caminhos fixos, arquivos de modelo do HiveMind' },
                        sqs: { label: 'SQS', use: 'Fila entre o pedido do app e o serviço de imagens do BodyShop' },
                        ec2: { label: 'EC2', use: 'API e serviço de ML do HiveMind' },
                        rds: { label: 'RDS', use: 'PostgreSQL no PicPay: contas de clientes, cartões emitidos, transações' },
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
                    context: 'Consignado Cloud, meu próprio projeto',
                    nodes: {
                        aks: { label: 'AKS', use: `${consignado.cluster.nodes} node, de ${consignado.cluster.pods} a ${consignado.cluster.podsMax} pods, parado por padrão` },
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
                summary: `Do pedido da janela até a primeira resposta: ${duration(art.coldStart.seconds.total)}. Control plane ${duration(art.coldStart.seconds.controlPlane)}, node ${duration(art.coldStart.seconds.node)}, Spring Boot com banco de dados ${duration(art.coldStart.seconds.app)}, load balancer ${duration(art.coldStart.seconds.balancer)}. Uma execução medida em 17/11/2026.`,
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
            defaultWorkflow: {
                title: 'Meu workflow padrão de CI/CD',
                summary: `QA: um pull request de ${art.defaultWorkflow.flows[0].from} para ${art.defaultWorkflow.flows[0].to} roda os testes unitários, o merge faz o deploy em QA, depois rodam uma checagem no ar e um smoke test, e as notificações saem. Produção: os mesmos passos para um pull request de ${art.defaultWorkflow.flows[1].from} para ${art.defaultWorkflow.flows[1].to}.`,
                // Two flows with the same six steps, in order. Branch names, addresses and
                // notification channels: art.defaultWorkflow in contents.global.js.
                flows: {
                    qa: {
                        label: 'QA',
                        steps: [
                            `PR de ${art.defaultWorkflow.flows[0].from} para ${art.defaultWorkflow.flows[0].to}`,
                            'Rodar os testes unitários em uma máquina Linux (provisionada pelo Actions)',
                            `Merge em ${art.defaultWorkflow.flows[0].to}`,
                            `Deploy em QA (${art.defaultWorkflow.flows[0].address})`,
                            `Checagem no ar (${art.defaultWorkflow.flows[0].telemetry}) e smoke test`,
                            `Notificações (${art.defaultWorkflow.notifications.join(', ')})`,
                        ],
                    },
                    production: {
                        label: 'PRODUÇÃO',
                        steps: [
                            `PR de ${art.defaultWorkflow.flows[1].from} para ${art.defaultWorkflow.flows[1].to}`,
                            'Rodar os testes unitários em uma máquina Linux (provisionada pelo Actions)',
                            `Merge em ${art.defaultWorkflow.flows[1].to}`,
                            `Deploy em PROD (${art.defaultWorkflow.flows[1].address})`,
                            `Checagem no ar (${art.defaultWorkflow.flows[1].telemetry}) e smoke test`,
                            `Notificações (${art.defaultWorkflow.notifications.join(', ')})`,
                        ],
                    },
                },
            },
            timeline: {
                title: `Trabalho full-stack, de ${person.codingSince} a 2026`,
                summary: 'Bots de Discord em JavaScript de 2018 a 2020. Sites em Express com HTML e CSS de 2021 a 2023. O MVP e a landing page do TrocaTine em 2024. Apps em React e Angular no PicPay em 2025. O site do Consignado Cloud em 2026.',
                items: {
                    bots: { label: ['Bots de Discord'], text: 'JavaScript no Glitch' },
                    sites: { label: ['Sites em Express'], text: 'Páginas em HTML e CSS ao lado dos bots' },
                    trocatine: {
                        label: [{ text: 'MVP e landing page do TrocaTine', to: '#exp-cofounder' }, ', ', { text: 'projetos pessoais', to: '#applications' }],
                        text: 'MVP em React, landing page em HTML, CSS e JavaScript puros',
                    },
                    work: {
                        label: [{ text: 'Apps no PicPay', to: '#exp-picpay' }, ', ', { text: 'projetos pessoais', to: '#applications' }],
                        text: 'App de curadoria em React, app de pesquisas em Angular',
                    },
                    consignado: {
                        label: [{ text: 'Consignado Cloud', to: '#app-consignado' }, ', ', { text: 'projetos pessoais', to: '#applications' }],
                        text: 'Desenha cada requisição a partir do trace',
                    },
                },
            },
            margin: {
                title: 'Conferência de um crédito consignado',
                summary: `Salário líquido de ${ptNumber(art.margin.netSalary)} vezes o limite de ${art.margin.capPercent} dá uma margem de ${ptNumber(art.margin.marginLimit)}. Um empréstimo de ${ptNumber(art.margin.principal)} em ${art.margin.termMonths} meses, a ${ptNumber(art.margin.monthlyRate)} ao mês, tem parcela de ${ptNumber(art.margin.installment)}. A maior parcela é de ${ptNumber(art.margin.largestInstallment)}, abaixo da margem, então o empréstimo cabe. Com renda de ${ptNumber(art.margin.refused.income)} o limite é de ${ptNumber(art.margin.refused.marginLimit)}, e a API recusa com status ${art.margin.refused.status}.`,
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
    },

    // ─── pt.experience ──────────────────────────────────────────────────────
    // "Experience": per company a context line, the impact, the responsibilities (PicPay only)
    // and the timeline. The case files of a company: order.companyCases in contents.global.js.
    experience: {
        label: 'Experiência',
        title: 'Onde trabalhei e o meu impacto',
        labels: {
            current: 'Atual',
            impact: 'Impacto',
            currentResponsibilities: 'Responsabilidades atuais',
            previousResponsibilities: 'Responsabilidades anteriores',
            timeline: 'Linha do tempo',
            projects: 'Projetos',
            links: 'Links',
        },
        items: [
            {
                id: 'picpay',
                anchor: 'exp-picpay',
                company: picpay.name,
                context: [
                    `Banco digital brasileiro com ${picpay.customersMillions}M de clientes, recentemente `,
                    { text: 'listado na Nasdaq', to: links.picpayNasdaq },
                    '.',
                ],
                impact: [
                    `Encontrei e corrigi bugs e defeitos escondidos em ${picpay.cards.legacySystems} sistemas legados em Java, resolvi centenas de incidentes de clientes e criei jobs de autocorreção que limpam o banco de dados sem trabalho manual.`,
                    `Liderei ${picpay.bodyshop.engineersLed} engenheiros no BodyShop: ${picpay.bodyshop.services} serviços internos, feitos para trocar a imagem errada ou genérica de carro que ${ptNumber(picpay.bodyshop.customers)} de clientes veem. Tomei as decisões de stack e de escopo e levei o projeto até QA com aprovação da governança.`,
                    `Escrevi o Agentic Template do BodyShop antes do kickoff: arquivos compartilhados de tarefas, progresso e conhecimento, regras de teste primeiro, servidores MCP e skills. Os agentes de IA das ${picpay.bodyshop.teamSize} pessoas do time trabalharam a partir de um só contexto.`,
                    `No Project Survey, em um time de ${picpay.survey.teamSize} pessoas, trabalhei na API de backend, na modelagem e nos índices do MySQL e na infraestrutura de uma plataforma de pesquisas para cerca de ${ptNumber(picpay.survey.employees)} funcionários.`,
                    `No squad de Oracle HCM, deixei consultas em ${picpay.oracle.tables} tabelas e views de ${picpay.oracle.speedupMin} a ${picpay.oracle.speedupMax} vezes mais rápidas, e o trabalho economizou centenas de horas de pesquisa de engenheiros e analistas.`,
                ],
                currentResponsibilities: [
                    `Escrever e manter microsserviços em Java (Spring Boot, JPA) com mensageria: ${picpay.cards.microservices} microsserviços e sistemas legados que respondem milhões de requisições de centenas de milhares de clientes.`,
                    'Analisar incidentes em vários microsserviços e manter o backend confiável.',
                ],
                previousResponsibilities: [
                    `Escrever e manter microsserviços em Go com mensageria: ${picpay.vehicleHub.goServices} microsserviços de uma aplicação AI-native de geração de imagens para o Hub de Veículos do PicPay.`,
                    'Desenhar arquiteturas confiáveis para novas aplicações ou funcionalidades.',
                    'Desenvolver pipelines de CI/CD e testes unitários no GitHub, no ArgoCD e no Tekton.',
                    'Modelar bancos de dados e otimizar consultas.',
                ],
                timeline: [
                    {
                        period: period(picpay.roles.cards, 'pt'),
                        current: true,
                        title: 'Engenheiro de Software, Cartões',
                        note: 'Área de cartões, aquisição de alta renda (HNW).',
                    },
                    {
                        period: period(picpay.roles.hr, 'pt'),
                        current: false,
                        title: 'Engenheiro de Software, Recursos Humanos',
                        note: 'IT Corp, squad de Oracle HCM. Contato próximo com RH, Jurídico e Compliance.',
                    },
                ],
                links: [],
            },
            {
                id: 'cofounder',
                anchor: 'exp-cofounder',
                company: 'HiveMind e TrocaTine',
                context: ['Dois MVPs de startup em pré-lançamento, apresentados ao público na ExpoTech. Não foram empregos em tempo integral, e não tiveram usuários reais.'],
                impact: [
                    'Planejei, escrevi e fiz o deploy de um modelo de ML que prevê o "match" de uma empresa da indústria com a nossa solução.',
                    `Depois melhorei a acurácia do modelo para cerca de ${startups.hivemind.trainingAccuracy} (acurácia de treino) e cortei o custo de armazenamento em ${ptNumber(startups.hivemind.storageSaving)}.`,
                    `Cerca de ${ptNumber(startups.hivemind.visitors)} visitantes da ExpoTech ${startups.hivemind.year}, com avaliação de ${ptNumber(startups.hivemind.rating)} estrelas.`,
                    `Cerca de ${ptNumber(startups.trocatine.visitors)} visitantes da ExpoTech ${startups.trocatine.year}, com avaliação de ${ptNumber(startups.trocatine.rating)} estrelas.`,
                ],
                timeline: [
                    {
                        period: `${period(startups.hivemind, 'pt')} (1 ano)`,
                        current: false,
                        title: 'Cofundador',
                        note: 'Líder do time de Engenharia de Dados, HiveMind Client Potential (aplicação de ML em Python).',
                    },
                    {
                        period: `${period(startups.trocatine, 'pt')} (1 ano)`,
                        current: false,
                        title: 'Cofundador',
                        note: 'Líder do time de Frontend, landing page e MVP.',
                    },
                ],
                links: [
                    { label: 'Landing page do TrocaTine', to: startups.trocatine.page },
                    { label: 'HiveMind Client Potential', to: startups.hivemind.page },
                ],
            },
            {
                id: 'discord',
                anchor: 'exp-discord',
                company: 'Comunidades de Discord',
                context: ['Autodidata. Foi onde aprendi a programar.'],
                impact: [
                    `Os bots rodaram em comunidades com até ${discord.members} membros.`,
                    'Centenas de requisições por dia vindas dos meus servidores.',
                    `Os bots gerenciavam de forma automática uma loja online no Discord com ${discord.storeCustomers} clientes ativos.`,
                ],
                timeline: [
                    {
                        period: `${discord.start} – ${discord.end} (${discord.years} anos)`,
                        current: false,
                        title: 'Desenvolvedor de aplicações',
                        note: 'JavaScript (Node.js, Discord.js), Java para servidores de Minecraft, SQLite e MySQL para armazenamento. Tudo rodava no Glitch.com, na Discloud e no GitHub.',
                    },
                ],
                links: [],
            },
        ],
    },

    // ─── pt.cases ───────────────────────────────────────────────────────────
    // Case files: one problem, the decisions, the result and a flowchart.
    // flow.nodes: one label per node id of cases[id].flow.nodes (contents.global.js).
    // flow.steps: one sentence per edge of cases[id].flow.edges, in the same order.
    // flow: null = words only, no chart.
    cases: {
        label: 'Casos',
        labels: {
            problem: 'O problema',
            decisions: 'O que eu decidi',
            result: 'O resultado',
            flow: 'Como funciona',
            stack: 'Stack',
            step: 'Passo',
            links: 'Links',
            prev: 'Passo anterior',
            next: 'Próximo passo',
            play: 'Reproduzir os passos',
            pause: 'Pausar os passos',
            wordsOnly: 'Só texto. Os sistemas e os dados pertencem à empresa.',
        },
        items: [
            {
                id: 'cards',
                anchor: 'case-cards',
                kicker: 'PicPay · área de cartões · em produção',
                title: 'Motores de cartões: quem recebe qual cartão',
                problem: `A área de cartões decide crédito em tempo real: pedidos de cartão novo, pedidos de upgrade e solicitações de clientes que chegam pelo Banco Central ou por auditoria interna. O trabalho roda em ${picpay.cards.microservices} microsserviços em Java e Go e nos sistemas legados em volta deles. Eles respondem milhões de requisições de centenas de milhares de clientes.`,
                decisions: [
                    'Escrevo e mantenho os serviços em Java (Spring Boot, JPA) e Go dos fluxos de aquisição e upgrade, com mensageria, CI/CD e observabilidade.',
                    'Sigo um incidente pelos microsserviços até achar o defeito. Depois escrevo o teste, e depois a correção.',
                    'Criei jobs de autocorreção que limpam o banco de dados sem trabalho manual.',
                ],
                result: `Encontrei e corrigi bugs e defeitos escondidos em ${picpay.cards.legacySystems} sistemas legados em Java e resolvi centenas de incidentes de clientes.`,
                stats: [
                    { value: picpay.cards.microservices, label: 'microsserviços na área' },
                    { value: `${picpay.cards.legacySystems}`, label: 'sistemas legados em Java com correções' },
                ],
                flow: null,
            },
            {
                id: 'bodyshop',
                anchor: 'case-bodyshop',
                kicker: 'PicPay · plataforma interna · em QA',
                title: 'BodyShop: a imagem do carro de cada cliente',
                problem: `${ptNumber(picpay.bodyshop.customers)} de clientes abriam o app e viam um carro que não era o deles: uma imagem genérica, ou o modelo, o ano ou a cor errados. Um estudo interno mostrou que satisfação e retenção podem subir quando o carro exato aparece.`,
                decisions: [
                    'Gerar uma vez só. Uma imagem para cada marca, modelo, ano e cor. Um registro responde antes de qualquer modelo ser chamado.',
                    'Reservar o caminho no storage primeiro. A imagem sempre fica no mesmo caminho do S3, então uma imagem melhor substitui a ruim e o app não precisa de release.',
                    `Deixar as pessoas corrigirem a máquina. A equipe escreve o que está errado, um modelo mais preciso devolve ${picpay.bodyshop.curationVariants} variações, e a escolhida sobrescreve o arquivo antigo.`,
                    'Gerar fora do caminho da requisição. O pedido de um carro novo entra em uma fila SQS. O serviço de imagens pega o pedido na fila, grava a imagem no S3 e os dados do carro no MongoDB.',
                    'Um monólito em camadas em Go com APIs REST, MongoDB como registro indexado e S3 atrás do CloudFront.',
                ],
                result: `No piloto, ${ptNumber(picpay.bodyshop.approvalRate)} das imagens foram aprovadas já na geração, sem curadoria manual, em menos de ${picpay.bodyshop.endToEnd} do pedido até a imagem. O time rodou testes de latência, disponibilidade, concorrência e segurança em QA, com aprovação da governança.`,
                stats: [
                    { value: ptNumber(picpay.bodyshop.customers), label: 'clientes no escopo' },
                    { value: ptNumber(picpay.bodyshop.approvalRate), label: 'aprovadas na geração (piloto)' },
                    { value: `< ${picpay.bodyshop.endToEnd}`, label: 'do pedido até a imagem' },
                    { value: `${picpay.bodyshop.engineersLed}`, label: 'engenheiros que liderei' },
                ],
                flow: {
                    title: 'Gerar uma vez, depois curar',
                    nodes: {
                        app: 'App do cliente',
                        api: 'API em Go (Gin)',
                        registry: 'Registro de veículos (MongoDB)',
                        model: 'Modelo de imagem',
                        storage: 'Amazon S3',
                        cdn: 'CloudFront',
                        curation: 'App de curadoria (React)',
                    },
                    steps: [
                        'O app pede a imagem de um carro: marca, modelo, ano e cor.',
                        'A API consulta o registro. Um carro que já tem imagem recebe o caminho na hora.',
                        'Para um carro novo, a API reserva um caminho no S3.',
                        'A API coloca o pedido em uma fila SQS. O serviço de imagens pega o pedido e chama o modelo uma única vez, com as regras de negócio.',
                        'A imagem é gravada no caminho reservado.',
                        'O CloudFront entrega a imagem ao app.',
                        'Uma pessoa da equipe marca uma imagem ruim e escreve o que corrigir.',
                        `A API chama um modelo mais preciso e recebe ${picpay.bodyshop.curationVariants} variações.`,
                        'A variação escolhida sobrescreve o mesmo caminho. O app mostra a imagem nova sem release.',
                    ],
                },
            },
            {
                id: 'survey',
                anchor: 'case-survey',
                kicker: 'PicPay · plataforma interna',
                title: 'Project Survey: uma plataforma no lugar de várias ferramentas pagas',
                problem: `Cerca de ${ptNumber(picpay.survey.employees)} funcionários respondiam pesquisas de NPS e de clima em várias ferramentas pagas, com pouco espaço para customizar e pouco controle de privacidade. O primeiro plano para a substituta era um conjunto de microsserviços.`,
                decisions: [
                    'Perguntei por que o plano precisava de microsserviços. Um produto, um time e um banco de dados não precisavam. O time mudou para um monólito em camadas.',
                    'Trabalhei na API de backend e nos testes de CI/CD dela, em PHP (Hyperf).',
                    'Planejei o schema e os índices do MySQL para os dados de pesquisas e respostas, com Redis como cache.',
                ],
                result: 'A estrutura antiga custava dezenas de milhares de dólares por ano em licenças. A economia projetada é de centenas de milhares de reais por ano, com mais controle da privacidade e das perguntas.',
                stats: [
                    { value: ptNumber(picpay.survey.employees), label: 'funcionários atendidos' },
                    { value: `${picpay.survey.teamSize}`, label: 'pessoas no time' },
                    { value: '1', label: 'monólito no lugar de um plano de microsserviços' },
                ],
                flow: {
                    title: 'Uma requisição, um serviço',
                    nodes: {
                        people: 'Funcionários',
                        cdn: 'CloudFront',
                        web: 'App em Angular',
                        api: 'API em PHP (Hyperf)',
                        cache: 'Redis',
                        db: 'MySQL',
                    },
                    steps: [
                        'Um funcionário abre uma pesquisa.',
                        'O CloudFront entrega o app em Angular.',
                        'O app envia as respostas para uma única API.',
                        'A API lê os dados da pesquisa no cache do Redis.',
                        'A API grava as respostas no MySQL, em tabelas indexadas.',
                    ],
                },
            },
            {
                id: 'oracle',
                anchor: 'case-oracle',
                kicker: 'PicPay · dados de RH',
                title: 'Oracle HCM: um mapa para dados que não tinham nenhum',
                problem: `Centenas de bancos de dados do Oracle Cloud HCM, e nenhuma documentação. As pessoas continuavam escrevendo consultas novas em cima de views legadas de ${picpay.oracle.viewLines} linhas, sem índice e sem cache.`,
                decisions: [
                    'Li os próprios dados para descobrir o que cada tabela e cada coluna significa, e registrei tudo em um índice.',
                    `Reescrevi consultas grandes em ${picpay.oracle.tables} tabelas e views. Elas foram de milhares de linhas para centenas e ficaram de ${picpay.oracle.speedupMin} a ${picpay.oracle.speedupMax} vezes mais rápidas.`,
                    'Escrevi automações em SQL e consultas de apoio à decisão em cima do índice.',
                    'Planejei uma modelagem de banco de dados que substitui as views legadas.',
                ],
                result: 'O índice economizou centenas de horas de pesquisa de engenheiros e analistas, e o RH recebeu dados organizados para modelos preditivos.',
                stats: [
                    { value: picpay.oracle.databases, label: 'bancos de dados mapeados' },
                    { value: `${picpay.oracle.speedupMin} a ${picpay.oracle.speedupMax}x`, label: 'consultas mais rápidas' },
                    { value: picpay.oracle.viewLines, label: 'linhas em uma view legada' },
                ],
                flow: {
                    title: 'De dados desconhecidos a respostas',
                    nodes: {
                        hcm: 'Oracle Cloud HCM',
                        map: 'Índice dos dados',
                        queries: 'Automações em SQL',
                        views: 'Views legadas',
                        design: 'Nova modelagem',
                        science: 'Modelos preditivos',
                    },
                    steps: [
                        'Mapeio cada banco de dados: tabelas, colunas e o que elas significam.',
                        'As consultas e automações usam o índice, não um palpite.',
                        'A modelagem que substitui as views legadas sai do mesmo índice.',
                        'Os dados de RH organizados vão para o time de ciência de dados.',
                    ],
                },
            },
            {
                id: 'hivemind',
                anchor: 'case-hivemind',
                kicker: `MVP de startup · ${startups.hivemind.year}`,
                title: `HiveMind: um modelo de ${startups.hivemind.modelBefore} que virou ${ptNumber(startups.hivemind.modelAfter)}`,
                problem: `O HiveMind calcula o quanto uma empresa combina com um produto, a partir de um questionário curto. O primeiro modelo era um arquivo de Random Forest com cerca de ${startups.hivemind.modelBefore}, guardado no S3 e carregado pela API.`,
                decisions: [
                    `Troquei o modelo de Random Forest por Regressão Logística: cerca de ${startups.hivemind.trainingAccuracy} de acurácia de treino em um arquivo de ${ptNumber(startups.hivemind.modelAfter)}.`,
                    'Construí um serviço em FastAPI que carrega o modelo mais novo do S3 e faz a troca em execução. Um modelo novo não precisa de novo deploy.',
                    'Modelei os dados em PostgreSQL, MongoDB e Redis e montei o CI/CD na AWS e no GitHub.',
                ],
                result: `O custo de armazenamento dos modelos caiu até ${ptNumber(startups.hivemind.storageSaving)}. Cerca de ${ptNumber(startups.hivemind.visitors)} visitantes da ExpoTech ${startups.hivemind.year} deram nota ${ptNumber(startups.hivemind.rating)}/5 ao produto. Era um MVP em pré-lançamento, sem usuários reais.`,
                stats: [
                    { value: ptNumber(startups.hivemind.modelAfter), label: `arquivo do modelo, antes ${startups.hivemind.modelBefore}` },
                    { value: ptNumber(startups.hivemind.storageSaving), label: 'a menos no custo de armazenamento' },
                    { value: startups.hivemind.trainingAccuracy, label: 'de acurácia de treino' },
                    { value: `${ptNumber(startups.hivemind.rating)}/5`, label: `de cerca de ${ptNumber(startups.hivemind.visitors)} visitantes` },
                ],
                flow: {
                    title: 'Um modelo novo sem novo deploy',
                    nodes: {
                        train: 'Treino',
                        bucket: 'Amazon S3',
                        api: 'Serviço em FastAPI',
                        client: 'Questionário de vendas',
                    },
                    steps: [
                        'Um treino grava um arquivo de modelo novo no S3.',
                        'O serviço carrega o modelo mais novo e faz a troca em memória.',
                        'O questionário envia as respostas de uma empresa.',
                        'O serviço devolve a nota de compatibilidade.',
                    ],
                },
            },
            {
                id: 'ruph',
                // No anchor of its own: the Applications section shows this case inside app-ruph.
                anchor: null,
                kicker: 'Minha própria plataforma · em produção',
                title: 'Ruph: um control plane para todos os apps que eu mantenho',
                problem: 'Mantenho vários apps em GCP, Cloudflare, Vercel, Supabase e Neon. Eu queria um lugar só que conhecesse cada app e cada ambiente.',
                decisions: [
                    'Um registro de apps e ambientes, com uma única API. O dashboard web e a CLI usam a mesma API.',
                    'Nenhuma mudança sem um plano. Eu escrevo o plano, e depois eu aprovo.',
                    'Cada apply fica gravado em um ledger append-only. Orçamentos avisam ou pausam o trabalho.',
                    'Plugins de provedor para GCP, Cloudflare, Vercel, Supabase e Neon. O Terraform gerencia as regras de acesso.',
                ],
                result: 'O Ruph faz o deploy e o provisionamento dos meus próprios apps em QA e em produção. O GitHub Actions roda a suíte de testes e os testes de migração do PostgreSQL, e só faz o deploy depois que os health checks passam. É uma plataforma privada: eu sou o único operador.',
                stats: [],
                flow: {
                    title: 'Planejar, aprovar, aplicar, registrar',
                    nodes: {
                        human: 'Eu',
                        api: 'API do Ruph (Hono)',
                        ledger: 'Ledger (PostgreSQL)',
                        providers: 'Provedores de cloud',
                        ci: 'GitHub Actions',
                    },
                    steps: [
                        'Eu escrevo um plano no dashboard ou na CLI.',
                        'Eu leio o plano e aprovo.',
                        'A API grava o apply no ledger append-only.',
                        'A API muda os recursos nos provedores de cloud.',
                        'O GitHub Actions só publica uma versão nova depois que os testes e os health checks passam.',
                    ],
                },
            },
        ],
    },

    // ─── pt.education ───────────────────────────────────────────────────────
    // "Education": one program and three certificates. Nothing else goes here.
    education: {
        label: 'Formação',
        title: 'Formação',
        program: {
            anchor: 'edu-jf',
            period: `${period(education, 'pt')} (${education.years} anos)`,
            title: 'Curso Técnico em Desenvolvimento de Software',
            place: education.institution,
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
            // One date per certificate id. Id, title and issuer: education.certificates in contents.global.js.
            dates: {
                'software-engineer': monthYear(education.certificates[0].date, 'pt'),
                'rest-api': monthYear(education.certificates[1].date, 'pt'),
                sql: monthYear(education.certificates[2].date, 'pt'),
            },
            note: 'As três provas cobrem algoritmos, REST APIs, engenharia de software, modelagem de dados, otimização de consultas, CTEs recursivas e window functions. Resolvi as provas em Python, C/C++ e MySQL.',
        },
    },

    // ─── pt.applications ────────────────────────────────────────────────────
    // "Applications". Names, addresses, stacks and clips: `projects` in contents.global.js.
    // Three lists, in the order of order.apps: production, other, study. No status is shown.
    applications: {
        label: 'Aplicações',
        title: 'O que roda hoje, e o que construí para estudar',
        labels: {
            live: 'Abrir no ar',
            source: 'Código-fonte',
            privateSource: 'Código privado',
            stack: 'Stack',
            architecture: 'Arquitetura',
            goals: 'Objetivos',
            playClip: 'Reproduzir o clipe',
            pauseClip: 'Pausar o clipe',
        },
        production: {
            anchor: 'applications-live',
            title: 'Em produção',
            items: [
                {
                    id: 'consignado',
                    anchor: 'app-consignado',
                    tagline: 'Uma API em dois hosts da Azure, com cada requisição desenhada',
                    paragraphs: [
                        `Uma API de crédito consignado em Java 21 e Spring Boot 3.5 que roda em ${consignado.cluster.pods} pods no AKS e dentro de uma Azure Function, atrás de um gateway em Java e de um edge na Cloudflare.`,
                        'O site desenha cada requisição como um diagrama ao vivo, com o tempo medido de cada etapa. É uma demonstração técnica com dados sintéticos, sem oferta de crédito.',
                        'Esta plataforma foi criada para que aspirantes a arquiteto de software e a SRE possam acompanhar um motor real funcionando em vários serviços de cloud em tempo real, em uma interface visual que mostra a latência e o progresso de cada etapa, com um replay embutido.',
                    ],
                    architecture: [
                        `Edge: um Worker da Cloudflare com TLS, cache para arquivos estáticos e limite de ${consignado.rateLimit.requests} requisições a cada ${consignado.rateLimit.seconds} s por IP na API.`,
                        'Gateway: Java 21 no Azure Functions. Ele valida o token do Entra ID, aplica as regras de acesso, liga e desliga o cluster e devolve um trace de cada chamada.',
                        `Hosts: o mesmo jar no Azure Functions (chamada fria de ${ptNumber(consignado.serverless.coldMin)} a ${ptNumber(consignado.serverless.coldMax)} s, chamada quente de ${ptNumber(consignado.serverless.warmMin)} a ${ptNumber(consignado.serverless.warmMax)} s) e no AKS (${consignado.cluster.nodes} node, ${consignado.cluster.pods} pods atrás de um load balancer interno, chamada quente em cerca de ${ptNumber(consignado.cluster.warm)} s).`,
                        `Cluster: parado por padrão. Um visitante autenticado liga o cluster por uma janela de ${consignado.window.minutes} minutos. Uma subida a partir do cluster parado levou ${duration(art.coldStart.seconds.total)}.`,
                        `Dados e entrega: ${consignado.database.engine} com Flyway. O Terraform cria os recursos da Azure, e o GitHub Actions faz o deploy de cada repositório com OIDC.`,
                    ],
                    goals: [
                        'Comparar uma API em Kubernetes e em serverless, com custo e latência medidos.',
                        `Ficar dentro de um orçamento mensal de ${consignado.budget}: o gateway pausa o motor em 100%.`,
                        'Mostrar em código as regras de um crédito consignado: margem, tabela Price, estados do contrato, concorrência otimista e transactional outbox.',
                    ],
                    media: {
                        preview: { caption: 'Um visitante envia uma simulação real para o host serverless. O trace repete a requisição etapa por etapa, e o Request Inspector abre nela.', alt: 'Clipe do site do Consignado Cloud: o formulário de simulação e depois o diagrama da requisição com o tempo de cada etapa.' },
                        lifecycle: { caption: 'O replay de uma subida gravada do cluster AKS, a 8 vezes a velocidade real. O slider pula para 6 min 15 s, e o replay vai até o fim.', alt: 'Clipe do site do Consignado Cloud: o replay da subida de um cluster AKS, etapa por etapa, até o cluster ficar pronto.' },
                        api: { caption: 'A API sozinha, em uma execução local: um convênio, um cliente e um empréstimo de 84 meses.', alt: 'Gravação de terminal: o curl cria um convênio e um cliente, depois simula um empréstimo e mostra a parcela.' },
                        'still-1': { caption: 'A simulação: o formulário com o resultado, e se a parcela cabe na margem.', alt: 'Tela do site do Consignado Cloud: o formulário da simulação com o resultado e a checagem da margem.' },
                        'still-2': { caption: 'Uma simulação com o host quente, em forma de trace, com o Request Inspector aberto na mesma requisição.', alt: 'Tela do site do Consignado Cloud: o trace de uma requisição do navegador até a API Spring Boot, e o painel Request Inspector.' },
                        'still-3': { caption: 'O replay de uma subida do cluster AKS, cada etapa com o tempo medido.', alt: 'Tela do site do Consignado Cloud: o diagrama da subida de um cluster AKS no fim do replay.' },
                    },
                },
                {
                    id: 'ruph',
                    anchor: 'app-ruph',
                    tagline: 'Um control plane para todos os apps que eu mantenho',
                    paragraphs: [
                        'Minha própria plataforma. Ela mantém um registro de todos os meus apps e ambientes, e faz o deploy e o provisionamento de tudo o que eu preciso em QA e em produção no GitHub, GCP, Cloudflare, Vercel, Supabase, Neon, Claude Platform, AWS, Azure, Doppler e outros.',
                        'Esta plataforma já me poupou horas de engenharia em trabalho repetido, porque provisiona uma infraestrutura inteira e padronizada para todas as minhas aplicações públicas e internas.',
                    ],
                    architecture: [
                        'Uma API em TypeScript (Hono). O dashboard web e a CLI usam a mesma API.',
                        'Cloud Run para a API, Cloud SQL para o ledger em PostgreSQL, Secret Manager para os segredos e Terraform para as regras de acesso.',
                        'O GitHub Actions roda a suíte de testes e os testes de migração do PostgreSQL, e só faz o deploy depois que os health checks passam.',
                    ],
                    goals: [
                        'Um lugar que conhece cada app e cada ambiente.',
                        'Um registro de cada apply em um ledger append-only, com orçamentos que avisam ou pausam o trabalho.',
                    ],
                    // The case file `ruph` of pt.cases, with its flowchart, shows here.
                    caseId: 'ruph',
                },
                {
                    id: 'diabetes',
                    anchor: 'app-diabetes',
                    tagline: `Prevê e estima o seu risco de ter diabetes a partir de ${projects.diabetes.inputs} respostas`,
                    paragraphs: [
                        `Um serviço em FastAPI valida ${projects.diabetes.inputs} entradas, carrega o modelo scikit-learn mais novo e devolve uma estimativa de risco com a confiança. O modelo é um Random Forest treinado com dados públicos do Kaggle. Começou como meu projeto final do CS50x. Não é um diagnóstico médico.`,
                    ],
                    architecture: [
                        `Uma página estática envia as ${projects.diabetes.inputs} respostas para a API.`,
                        'O serviço em FastAPI valida cada entrada, roda o modelo e responde com a estimativa e a confiança.',
                        `${projects.diabetes.endpoints} endpoints: status, health, models e predict.`,
                    ],
                    goals: [
                        'Levar um modelo de um notebook até uma API no ar.',
                        'Servir o modelo treinado mais novo sem mudar o código.',
                    ],
                },
            ],
        },
        other: {
            anchor: 'applications-other',
            title: 'Outros apps em produção',
            items: [
                {
                    id: 'offmode',
                    anchor: 'app-offmode',
                    tagline: 'Um timer Pomodoro para foco profundo',
                    text: 'Um timer de foco para web e desktop. Ele acompanha seu tempo de foco entre as sessões, com login e sincronização com o servidor.',
                },
                {
                    id: 'notes',
                    anchor: 'app-notes',
                    tagline: 'Um editor de código em um único arquivo HTML',
                    text: `Um bloco de notas com a cara e o jeito do VS Code, sem backend e sem conta. O Monaco destaca ${projects.notes.languages} linguagens. Os arquivos ficam no navegador, ou vão direto para o seu disco no Chrome e no Edge. Tem ${projects.notes.previews} previews ao vivo, de Markdown a Mermaid.`,
                },
                {
                    id: 'doom',
                    anchor: 'app-doom',
                    tagline: 'Doom em um arquivo, sem servidor',
                    text: `O jogo de 1993 compilado de C para WebAssembly e compactado com gzip em um único arquivo HTML que se descompacta no navegador. O jogo compactado foi de ${projects.doom.sizeBefore} para ${ptNumber(projects.doom.sizeAfter)}. Fiz o projeto para estudar compressão.`,
                },
                {
                    id: 'agentic',
                    anchor: 'app-agentic',
                    tagline: 'Um contexto para todos os agentes de IA',
                    text: 'Um template de repositório em que agentes de IA conseguem trabalhar: arquivos de tarefas, progresso e conhecimento, regras de teste primeiro e um conjunto fixo de servidores MCP e skills.',
                },
                {
                    id: 'custom-square',
                    anchor: 'app-custom-square',
                    tagline: 'Um playground de CSS',
                    text: 'Mude propriedades de CSS, gradientes e cores e veja o resultado na hora. JavaScript puro, com o tema salvo no navegador.',
                },
                {
                    id: 'trocatine',
                    anchor: 'app-trocatine',
                    tagline: 'A landing page do meu primeiro MVP de startup',
                    text: 'A página pública do TrocaTine, uma plataforma de troca de roupas e brinquedos infantis. Este endereço é só a landing page: HTML, CSS e JavaScript puros no GitHub Pages. O MVP do produto era uma aplicação separada, em React e Tailwind CSS.',
                },
            ],
        },
        // Cards with no picture: the name, the repository and the stack come from `projects`.
        study: {
            anchor: 'applications-study',
            title: 'Projetos de estudo e outros',
            items: [
                {
                    id: 'consignado-api',
                    anchor: 'app-consignado-api',
                    line: 'A API de crédito consignado por trás do Consignado Cloud: conferência de margem, tabela Price, estados do contrato, concorrência otimista e transactional outbox.',
                },
                {
                    id: 'payment-gateway',
                    anchor: 'app-payment-gateway',
                    line: 'Um payment gateway simulado para uma loja online, só backend: authorize, capture e refund com idempotency keys, um ledger em partidas dobradas e webhooks assinados.',
                },
                {
                    id: 'credit-card-engine',
                    anchor: 'app-credit-card-engine',
                    line: 'Um motor de cartões com um fluxo de aquisição para clientes novos e um de upgrade para clientes existentes. Um módulo de policy salva cada decisão com os motivos.',
                },
                {
                    id: 'devops-challenge',
                    anchor: 'app-devops-challenge',
                    line: `Um sistema distribuído em Docker Compose com ${projects['devops-challenge'].containers} containers: um writer em Python, um reader em Go, um front end web em Node.js e o Redis entre eles.`,
                },
                {
                    id: 'incident-api',
                    anchor: 'app-incident-api',
                    line: 'Uma API REST que gerencia alertas e incidentes e expõe as métricas e a saúde da aplicação, com MySQL.',
                },
                {
                    id: 'student-tools',
                    anchor: 'app-student-tools',
                    line: 'Uma lista curada das ferramentas e dos créditos gratuitos do GitHub Student Developer Pack. Uma contribuição para a comunidade, sem código.',
                },
                {
                    id: 'client-potential',
                    anchor: 'app-client-potential',
                    line: `A página do modelo do HiveMind: você responde ${projects['client-potential'].questions} perguntas, e o modelo prevê se a empresa é um cliente em potencial.`,
                },
                {
                    id: 'legacy',
                    anchor: 'app-legacy',
                    line: `${legacy.folders} projetos dos meus anos de Glitch: bots de Discord em Node.js com Discord.js e SQLite, sites pequenos em Express com HTML e CSS, e a configuração de um servidor de Minecraft.`,
                },
            ],
        },
        more: ['Há mais repositórios no meu ', { text: 'perfil do GitHub', to: links.github }, '.'],
    },

    // ─── pt.hobbies ─────────────────────────────────────────────────────────
    // "Hobbies" (the section id is still `more`): volunteering, hobbies, languages, future projects.
    // Numbers: `reddit`, `hobbies` and `languages` in contents.global.js.
    hobbies: {
        label: 'Hobbies',
        title: 'O que eu faço por diversão',
        lead: 'Fora da engenharia de software, gosto de engenharia de performance em PCs, em servidores e debaixo do capô de um carro.',
        volunteering: {
            anchor: 'more-volunteering',
            title: 'Voluntariado',
            value: reddit.people,
            line: 'Pessoas ajudadas em suas montagens',
            role: `Consultor de hardware e TI @ Reddit (${reddit.start} – ${reddit.end})`,
            text: `Ajudei ${reddit.people} pessoas a planejar e montar seus PCs para jogos e trabalho, além de algumas montagens de entusiasta e servidores. Isso inclui escolha de peças, montagem, orçamento, diagnóstico e consertos em Windows, macOS e Linux.`,
            // The tags are reddit.communities in contents.global.js.
            tagsLabel: 'Comunidades',
            peek: {
                open: 'Espiar',
                close: 'Fechar',
                text: 'Foi antes dos assistentes de IA, então cada resposta saía de pesquisa, de benchmarks e das minhas próprias montagens.',
            },
        },
        list: {
            anchor: 'more-hobbies',
            title: 'Alguns dos meus hobbies',
            items: [
                {
                    id: 'ecu',
                    name: 'Acerto de injeção eletrônica',
                    text: [
                        'Estudo a injeção eletrônica e o acerto de Honda Civics de 1990 a 2002. Tenho um acervo aberto na minha segunda conta do GitHub: ',
                        { text: 'open-civic', to: links.carRepo },
                        '.',
                    ],
                },
                {
                    id: 'pc',
                    name: 'Hardware de PC',
                    text: ['Monto PCs, servidores e homelabs.'],
                },
                {
                    id: 'gym',
                    name: 'Academia',
                    text: [`Treino com consistência há ${hobbies.gym.years} anos (${hobbies.gym.workouts} treinos, e minha maior sequência é de ${hobbies.gym.streakWeeks} semanas), com foco em força. Meu PR no supino é ${hobbies.gym.bench}, no levantamento terra é ${hobbies.gym.deadlift}, e faço remada com ${hobbies.gym.row} em cada mão.`],
                },
                {
                    id: 'basketball',
                    name: 'Basquete',
                    text: [`Jogo há ${hobbies.basketball.years} ano, normalmente nos fins de semana com amigos.`],
                },
                {
                    id: 'chess',
                    name: 'Xadrez',
                    text: [`Jogo há ${hobbies.chess.years} anos e meu rating já passou de ${hobbies.chess.rating} Elo. Já venci o ${hobbies.chess.bot}, um bot do ${hobbies.chess.site} com rating ${hobbies.chess.botRating} Elo.`],
                },
            ],
        },
        languages: {
            anchor: 'more-languages',
            title: 'Idiomas',
            // Same order as `languages` in contents.global.js (the code is there).
            items: [
                { name: 'Português', level: 'Nativo' },
                { name: 'Inglês', study: `${languages[1].studyYears} anos de estudo`, level: 'C1' },
                { name: 'Espanhol', study: `${languages[2].studyYears} anos de estudo`, level: 'Básico' },
            ],
        },
        // Shown in full, with no disclosure.
        future: {
            anchor: 'more-future',
            title: 'Projetos futuros',
            items: [
                {
                    id: 'burnrate',
                    name: 'BurnRate',
                    text: 'Uma aplicação de controle financeiro para pequenos desenvolvedores. Ela junta todos os custos de desenvolvimento (cloud, ferramentas, assinaturas, IA, PAYG e mais) em um único dashboard, com previsão de custo por ML.',
                },
                {
                    id: 'pocket-k3',
                    name: 'Pocket K3',
                    text: 'Um modelo de 2.7T de parâmetros com quantização MXFP4 que roda em 50 GB de memória unificada de GPU (M1 Max) e com streaming mínimo do SSD (300-600 GB a 7 Gbps), com algoritmos avançados de cache, um tokenizer VQ-VAE e o framework de geração NCM (Next-Concept Modeling).',
                },
                {
                    id: 'llm-lens',
                    name: 'LLM lens',
                    text: 'Uma plataforma de telemetria para orquestrar modelos de IA locais que rodam em uma única máquina. Ela roda em Docker, junto com o LiteLLM.',
                },
            ],
        },
    },

    // ─── pt.figma ───────────────────────────────────────────────────────────
    // The row "From my Figma" of original diagrams. Files, sizes and places: `figma`
    // in contents.global.js (same ids).
    figma: {
        title: 'Do meu Figma',
        lead: 'Os desenhos que fiz enquanto projetava estes sistemas.',
        open: 'Abrir o diagrama em tamanho original',
        close: 'Fechar o diagrama',
        items: {
            'consignado-aks': {
                title: 'API do consignado no AKS, primeira versão',
                caption: 'Meu primeiro desenho do host Kubernetes do Consignado Cloud: um load balancer, um service, dois pods e PostgreSQL com TLS. A plataforma no ar hoje tem um gateway e um load balancer interno na frente.',
                alt: 'Diagrama de arquitetura. Um usuário envia HTTP para um load balancer que aceita só endereços IP permitidos. O load balancer envia a requisição para o service consignado-api em um cluster AKS com 2 a 3 pods. Dois pods em Spring Boot se conectam ao Azure PostgreSQL com TLS. Linhas tracejadas saem do cluster para ACR, Key Vault e Entra ID, usados só quando um pod sobe. Logs e métricas vão para o Azure Monitor.',
            },
            'consignado-pod-start': {
                title: 'Como um pod sobe sem segredo guardado',
                caption: 'Sete passos, do agendamento do pod até o primeiro tráfego. As linhas rosa são confiança sem segredo guardado.',
                alt: 'Diagrama de sete passos em linha. 1: o AKS agenda o pod no node. 2: o kubelet baixa a imagem do ACR. 3: o token da service account vira um token da Azure no Entra ID, por workload identity. 4: o CSI driver lê a senha do banco de dados no Key Vault. 5: o container do Spring Boot sobe com a senha. 6: o Flyway migra o Azure PostgreSQL com TLS e o readiness fica ativo. 7: o pod está pronto e o Service envia tráfego para ele.',
            },
            'ruph-ship': {
                title: 'Como o Ruph faz deploy',
                caption: 'Uma mudança no GitHub dispara os testes automáticos e um build. O build vai para QA e depois para PROD. O GitHub entra sem chave guardada (WIF), e o rollback é um clique.',
                alt: 'Fluxograma com o título "How we ship". O GitHub dispara os testes automáticos, que levam a um build do app em um container. O build vai para QA, onde é conferido primeiro, e depois é promovido para PROD. Uma linha tracejada sai do build para a caixa "No stored keys: GitHub proves who it is (WIF)". Uma linha tracejada sai de PROD para "One-click rollback". Uma nota diz que nada chega a PROD sem passar pelos testes e por QA.',
            },
        },
    },

    // ─── pt.contact ─────────────────────────────────────────────────────────
    // "Contact" at the end of the page. The address: links.email. Then one row:
    // LinkedIn, "Go back to the top", GitHub (handles: links.linkedinHandle, links.githubHandle).
    contact: {
        label: 'Contato',
        title: 'Me pergunte sobre um sistema, um bug ou uma vaga',
        lead: [
            'Posso responder em inglês ou em português.',
            'Conte sobre o sistema, o time e o problema, e eu digo como posso ajudar.',
        ],
        emailCta: 'Me mande um e-mail',
        copy: 'Copiar o endereço',
        copied: 'Endereço copiado',
        linkedin: 'LinkedIn',
        top: 'Voltar ao topo',
        github: 'GitHub',
    },

    // ─── pt.footer ──────────────────────────────────────────────────────────
    // Three parts. Left: "© <year> " + credit (the year is the build year, not typed here).
    // Centre: top (goes to links.main). Right: source (goes to links.repo) with the GitHub mark.
    footer: {
        credit: `${links.domain}. Feito por ${person.name}.`,
        top: 'Voltar ao topo',
        source: 'Código-fonte deste site',
        githubMark: 'GitHub',
    },

    // ─── pt.controls ────────────────────────────────────────────────────────
    // Names of the controls that are not part of one section (screen readers, buttons).
    controls: {
        external: 'abre em uma nova aba',
        // The badge of the hero. With no music file it only turns.
        playBadge: 'Girar o selo',
        stopBadge: 'Parar o selo',
        spinBadge: 'Segurar e girar o selo',
        // Disclosure: long text opens in place.
        readMore: 'Ler a história completa',
        readLess: 'Mostrar menos',
        pauseDrawing: 'Pausar o desenho',
        playDrawing: 'Continuar o desenho',
    },

    // ─── pt.player ──────────────────────────────────────────────────────────
    // The music player of the badge and the scroll ruler (defined at the top of this file).
    player,
    rulers,

    // ─── pt.art ─────────────────────────────────────────────────────────────
    // Drawings that are not in the introduction (labels for screen readers, names on the drawing).
    art: {
        fuelMap: {
            label: 'Desenho do mapa de combustível de uma central de injeção: uma superfície sobre uma grade de rotação e carga do motor. Um ponto vermelho mostra a célula em uso durante uma aceleração.',
            rpm: 'RPM',
            load: 'Carga',
        },
    },

    // ─── pt.notFound ────────────────────────────────────────────────────────
    // The 404 page (scripts/build-404.mjs writes it at build).
    notFound: {
        title: 'Esta página não existe',
        text: 'O endereço está errado ou a página mudou de lugar. O portfólio é uma página só, e começa aqui:',
        cta: 'Abrir o portfólio',
    },

    // ─── pt.noscript ────────────────────────────────────────────────────────
    // The text for a browser with no JavaScript (index.html).
    noscript: 'Esta página precisa de JavaScript para mostrar a experiência e as aplicações.',
};
