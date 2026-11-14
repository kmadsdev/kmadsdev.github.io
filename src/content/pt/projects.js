// Seção "Projetos". Nomes, links e stacks ficam em facts.js (facts.projects).
// Um item para cada id de facts.projectOrder, na mesma ordem.
import { facts } from '../facts.js';
import { ptNumber } from '../format.js';

const p = facts.projects;

export const projects = {
    label: 'Projetos',
    title: 'Coisas que construí e deixei rodando.',
    intro: 'Abra os que estão no ar. Leia o código dos que são públicos.',
    live: 'Abrir no ar',
    source: 'Código-fonte',
    privateRepo: 'Repositório privado',
    stack: 'Stack',
    playClip: 'Reproduzir o clipe',
    pauseClip: 'Pausar o clipe',
    items: [
        {
            id: 'consignado-api',
            tagline: 'Uma API de crédito consignado com as regras do banco no código',
            text: `Uma API REST de crédito consignado em Java 21 e Spring Boot. Simula o empréstimo com tabela Price, valida a margem consignável na simulação e de novo na aprovação, e conduz o contrato pelos estados com transactional outbox. Tem ${p['consignado-api'].tests} testes, com PostgreSQL via Testcontainers. Projeto de estudo: sem usuários, não roda em produção.`,
        },
        {
            id: 'credit-card-engine',
            tagline: 'Quem recebe qual cartão, e por quê',
            text: `Um motor de cartões em Java 21 e Spring Boot com dois fluxos: aquisição para clientes novos e upgrade para clientes existentes. Quatro variantes: Débito (limite 0), Crédito Base (até ${ptNumber(p['credit-card-engine'].variants.base)}), Crédito Platinum (até ${ptNumber(p['credit-card-engine'].variants.platinum)}) e Crédito Black (acima de ${ptNumber(p['credit-card-engine'].variants.platinum)}). Todas as regras de crédito ficam em um módulo de policy guiado por tabelas, e cada decisão é salva com os motivos. Projeto de estudo com dados simulados.`,
        },
        {
            id: 'payment-gateway',
            tagline: 'Authorize, capture e refund, sem cobrança em dobro',
            text: 'Um payment gateway simulado para uma loja online, em Go e PostgreSQL, só backend. Tokenização de cartão e Pix, uma state machine para authorize, capture e refund, idempotency keys, um ledger em partidas dobradas e webhooks assinados via transactional outbox. O CI roda os testes com race detector contra um PostgreSQL real. Projeto de estudo: sem dinheiro real.',
        },
        {
            id: 'notes',
            tagline: 'Um editor de código em um único arquivo HTML',
            text: `Um bloco de notas com a cara e o jeito do VS Code, sem backend e sem conta. O Monaco destaca ${p.notes.languages} linguagens. Os arquivos ficam no navegador, ou salvam direto no seu disco no Chrome e no Edge. Tem ${p.notes.previews} previews ao vivo, de Markdown a Mermaid.`,
        },
        {
            id: 'diabetes',
            tagline: 'Uma estimativa de risco a partir de 17 respostas',
            text: `Um serviço em FastAPI valida ${p.diabetes.inputs} entradas, carrega o modelo scikit-learn mais novo e devolve uma estimativa de risco com a confiança. O modelo é um Random Forest treinado com dados públicos do Kaggle. Foi meu projeto final do CS50x. Não é um diagnóstico médico.`,
        },
        {
            id: 'offmode',
            tagline: 'Um timer Pomodoro que lembra de você',
            text: 'Um timer de foco para web e desktop. Ele acompanha seu tempo de foco entre as sessões, com login e sincronização com o servidor.',
        },
        {
            id: 'doom',
            tagline: 'Doom em um arquivo, sem servidor',
            text: `O jogo de 1993 compilado de C para WebAssembly e compactado com gzip em um único arquivo HTML que se descompacta no navegador. O jogo compactado foi de ${p.doom.sizeBefore} para ${ptNumber(p.doom.sizeAfter)}. Construí para estudar compressão.`,
        },
        {
            id: 'overclock',
            tagline: 'Um placar para a minha própria vida',
            text: `Um sistema de performance pessoal: ${p.overclock.attributes} atributos em ${p.overclock.pillars} pilares, cada um com nota de 0 a 100 por uma fórmula escrita. Um valor ausente é desconhecido, não zero. O app web e o app Android usam o mesmo banco PostgreSQL.`,
        },
        {
            id: 'burnrate',
            tagline: 'Para onde vai o dinheiro de IA e de nuvem',
            text: 'Um controle financeiro para engenheiro: custos de IA, nuvem e ferramentas em um lugar só. Importa dados bancários pelo Open Finance Brasil e lê os custos de nuvem do Ruph. Desenhei os gráficos em SVG, à mão.',
        },
        {
            id: 'agentic',
            tagline: 'Um contexto para todos os agentes de IA',
            text: 'Um template de repositório em que agentes de IA conseguem trabalhar: arquivos de tarefas, progresso e conhecimento, regras de teste primeiro e um conjunto fixo de servidores MCP e skills.',
        },
        {
            id: 'devops-challenge',
            tagline: 'Quatro containers, um comando',
            text: `Um sistema distribuído em Docker Compose com ${p['devops-challenge'].containers} containers: um writer em Python, um reader em Go, um front end web em Node.js e o Redis entre eles.`,
        },
        {
            id: 'incident-api',
            tagline: 'Alertas e incidentes, com interface de terminal',
            text: 'Um serviço de alertas e incidentes em PHP (Hyperf, Swoole) que recebe métricas e grava em MySQL e Redis. Vem com uma interface de terminal em Python.',
        },
        {
            id: 'custom-square',
            tagline: 'Um playground de CSS',
            text: 'Mude propriedades de CSS, gradientes e cores e veja o resultado na hora. JavaScript puro, com o tema salvo no navegador.',
        },
        {
            id: 'trocatine',
            tagline: 'A landing page da minha primeira startup',
            text: 'A página pública do TrocaTine, uma plataforma de troca de roupas e brinquedos infantis. Liderei o time de frontend de duas pessoas que a construiu.',
        },
        {
            id: 'student-tools',
            tagline: 'Ferramentas gratuitas para estudantes de engenharia',
            text: 'Uma lista curada das ferramentas e dos créditos gratuitos do GitHub Student Developer Pack. Uma contribuição para a comunidade, não código.',
        },
    ],
};
