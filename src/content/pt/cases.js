// Seção "Casos": um problema, as decisões, o resultado e um fluxograma.
//
// flow.nodes: um rótulo para cada id de facts.cases[id].flow.nodes.
// flow.steps: uma frase para cada aresta de facts.cases[id].flow.edges, na mesma ordem.
import { facts } from '../facts.js';
import { ptNumber as br } from '../format.js';

const { picpay, startups } = facts;
const { bodyshop, survey, oracle } = picpay;
const { hivemind } = startups;
const decade = oracle.legacySince.replace('s', '');

export const cases = {
    label: 'Casos',
    title: 'Cinco sistemas, abertos por dentro.',
    intro: 'Cada caso traz o problema, as decisões que tomei e o que saiu disso. Os fluxogramas mostram como as partes conversam.',
    labels: {
        problem: 'O problema',
        decisions: 'O que eu decidi',
        result: 'O resultado',
        flow: 'Como funciona',
        stack: 'Stack',
        step: 'Passo',
        links: 'Links',
    },
    items: [
        {
            id: 'bodyshop',
            kicker: `${picpay.name} · plataforma interna · em QA`,
            title: `${bodyshop.name}: cada cliente vê o próprio carro`,
            problem: `${br(bodyshop.customers)} de clientes abriam o app e viam um carro que não era o deles: uma imagem genérica, ou o modelo, o ano ou a cor errados. Um estudo interno mostrou que satisfação e retenção podem subir quando o carro exato aparece.`,
            decisions: [
                'Gerar uma vez só. Uma imagem para cada marca, modelo, ano e cor. Um registro responde antes de qualquer modelo ser chamado.',
                'Reservar o caminho no storage primeiro. A imagem sempre fica no mesmo caminho do S3, então uma imagem melhor substitui a ruim e o app não precisa de release.',
                `Deixar as pessoas corrigirem a máquina. A equipe escreve o que está errado, um modelo mais preciso devolve ${bodyshop.curationVariants} variações, e a escolhida sobrescreve o arquivo antigo.`,
                'Um monólito em camadas em Go com APIs REST, MongoDB como registro indexado e S3 atrás do CloudFront.',
            ],
            result: `No piloto, ${br(bodyshop.approvalRate)} das imagens foram aprovadas já na geração, sem curadoria manual, em menos de ${bodyshop.endToEnd} do pedido até a imagem. O time rodou testes de latência, disponibilidade, concorrência e segurança em QA, com aprovação da governança.`,
            stats: [
                { value: br(bodyshop.customers), label: 'clientes no escopo' },
                { value: br(bodyshop.approvalRate), label: 'aprovadas na geração (piloto)' },
                { value: `< ${bodyshop.endToEnd}`, label: 'do pedido até a imagem' },
                { value: `${bodyshop.engineersLed}`, label: 'engenheiros que liderei' },
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
                    'A API chama o modelo de imagem uma única vez, com as regras de negócio.',
                    'A imagem é gravada no caminho reservado.',
                    'O CloudFront entrega a imagem ao app.',
                    'Uma pessoa da equipe marca uma imagem ruim e escreve o que corrigir.',
                    `A API chama um modelo mais preciso e recebe ${bodyshop.curationVariants} variações.`,
                    'A variação escolhida sobrescreve o mesmo caminho. O app mostra a imagem nova sem release.',
                ],
            },
        },
        {
            id: 'survey',
            kicker: `${picpay.name} · plataforma interna`,
            title: `${survey.name}: uma plataforma no lugar de várias ferramentas pagas`,
            problem: `Cerca de ${br(survey.employees)} funcionários respondiam pesquisas de NPS e de clima em várias ferramentas pagas, com pouco espaço para customizar e pouco controle de privacidade. O primeiro plano para a substituta era um conjunto de microsserviços.`,
            decisions: [
                'Perguntei por que o plano precisava de microsserviços. Um produto, um time e um banco de dados não precisavam. O time mudou para um monólito em camadas.',
                'Trabalhei na API de backend e nos testes de CI/CD dela, em PHP (Hyperf).',
                'Planejei o schema e os índices do MySQL para os dados de pesquisas e respostas, com Redis como cache.',
            ],
            result: 'A estrutura antiga custava dezenas de milhares de dólares por ano em licenças. A economia projetada é de centenas de milhares de reais por ano, com mais controle da privacidade e das perguntas.',
            stats: [
                { value: br(survey.employees), label: 'funcionários atendidos' },
                { value: `${survey.teamSize}`, label: 'pessoas no time' },
                { value: '1', label: 'monólito, e não vários serviços' },
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
            kicker: `${picpay.name} · dados de RH`,
            title: 'Oracle HCM: um mapa para dados que não tinham nenhum',
            problem: `Centenas de bancos de dados do Oracle Cloud HCM, alguns de sistemas que rodam desde os anos ${decade}, e nenhuma documentação. As pessoas continuavam escrevendo consultas novas em cima de views legadas de ${oracle.viewLines} linhas, sem índice e sem cache.`,
            decisions: [
                'Li os próprios dados para descobrir o que cada tabela e cada coluna significa, e registrei tudo em um índice.',
                'Escrevi automações em SQL e consultas de apoio à decisão em cima do índice.',
                'Planejei uma modelagem de banco que substitui as views legadas.',
            ],
            result: 'O índice economizou centenas de horas de pesquisa de engenheiros e analistas, e o RH recebeu dados organizados para modelos preditivos.',
            stats: [
                { value: '100+', label: 'bancos de dados mapeados' },
                { value: oracle.viewLines, label: 'linhas em uma view legada' },
                { value: decade, label: 'sistema mais antigo, sem documentação' },
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
                    'Mapeio cada banco: tabelas, colunas e o que elas significam.',
                    'As consultas e automações usam o índice, não um palpite.',
                    'A modelagem que substitui as views legadas sai do mesmo índice.',
                    'Os dados de RH organizados vão para o time de ciência de dados.',
                ],
            },
        },
        {
            id: 'hivemind',
            kicker: `MVP de startup · ${hivemind.year}`,
            title: `${hivemind.name}: um modelo de ${hivemind.modelBefore} que virou ${br(hivemind.modelAfter)}`,
            problem: `O ${hivemind.name} calcula o quanto uma empresa combina com um produto, a partir de um questionário curto. O primeiro modelo era um arquivo de Random Forest com cerca de ${hivemind.modelBefore}, guardado no S3 e carregado pela API.`,
            decisions: [
                `Troquei o modelo de Random Forest por Regressão Logística: cerca de ${hivemind.trainingAccuracy} de acurácia de treino em um arquivo de ${br(hivemind.modelAfter)}.`,
                'Construí um serviço em FastAPI que carrega o modelo mais novo do S3 e faz a troca em execução. Um modelo novo não precisa de novo deploy.',
                'Modelei os dados em PostgreSQL, MongoDB e Redis e montei o CI/CD na AWS e no GitHub.',
            ],
            result: `O custo de armazenamento dos modelos caiu até ${br(hivemind.storageSaving)}. Cerca de ${br(hivemind.visitors)} visitantes da ExpoTech ${hivemind.year} deram nota ${br(hivemind.rating)} ao produto. Era um MVP em pré-lançamento, sem usuários reais.`,
            stats: [
                { value: br(hivemind.modelAfter), label: `arquivo do modelo, antes ${hivemind.modelBefore}` },
                { value: br(hivemind.storageSaving), label: 'a menos no custo de armazenamento' },
                { value: hivemind.trainingAccuracy, label: 'de acurácia de treino' },
                { value: br(hivemind.rating), label: `de cerca de ${br(hivemind.visitors)} visitantes` },
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
            kicker: 'Minha própria plataforma · em produção',
            title: 'Ruph: um control plane para todos os apps que eu mantenho',
            problem: 'Mantenho vários apps em GCP, Cloudflare, Vercel, Supabase e Neon. Eu queria um lugar só que conhecesse cada app e cada ambiente, e queria agentes de IA ajudando no trabalho sem o poder de mudar a produção sozinhos.',
            decisions: [
                'Um registro de apps e ambientes, com uma única API. O dashboard web, a CLI e o servidor MCP usam a mesma API.',
                'Nenhuma mudança sem um plano. Um agente ou uma pessoa escreve o plano. Só uma pessoa aprova.',
                'Cada apply fica gravado em um ledger append-only. Orçamentos avisam ou pausam o trabalho.',
                'Plugins de provedor para GCP, Cloudflare, Vercel, Supabase e Neon. O Terraform gerencia as regras de acesso.',
            ],
            result: `O Ruph faz o deploy e o provisionamento dos meus próprios apps em QA e em produção. O GitHub Actions roda ${br(facts.cases.ruph.tests)} testes e os testes de migração do PostgreSQL, e só faz o deploy depois que os health checks passam. É uma plataforma privada: eu sou o único operador.`,
            stats: [
                { value: br(facts.cases.ruph.tests), label: 'testes automatizados' },
                { value: '4', label: 'entradas: web, REST, CLI, MCP' },
                { value: '5', label: 'provedores de nuvem atrás de uma API' },
            ],
            flow: {
                title: 'Planejar, aprovar, aplicar, registrar',
                nodes: {
                    agent: 'Agente de IA',
                    human: 'Eu',
                    api: 'API do Ruph (Hono)',
                    ledger: 'Ledger (PostgreSQL)',
                    providers: 'Provedores de nuvem',
                    ci: 'GitHub Actions',
                },
                steps: [
                    'Um agente escreve um plano pelo servidor MCP ou pela CLI.',
                    'Eu leio o plano e aprovo. Um agente não pode aprovar.',
                    'A API grava o apply no ledger append-only.',
                    'A API muda os recursos nos provedores de nuvem.',
                    'O GitHub Actions só publica uma versão nova depois que os testes e os health checks passam.',
                ],
            },
        },
    ],
};
