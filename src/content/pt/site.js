// Título da página, navegação, rodapé, página 404 e a fileira "Do meu Figma".
import { facts } from '../facts.js';

const { person, picpay, consignado } = facts;

export const meta = {
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    title: `${person.name} (${person.aliasUpper}) · Engenheiro de Software · Arquitetura & Cloud`,
    description: `Engenheiro de Software no ${picpay.name}. Backend, arquitetura e cloud com Java, Go, Python e SQL: AWS no trabalho, GCP e Azure nas minhas próprias plataformas. Experiência profissional, aplicações em produção com a arquitetura de cada uma e código público.`,
};

export const nav = {
    skip: 'Pular para o conteúdo',
    home: 'Voltar ao topo',
    menu: 'Seções',
    items: [
        { id: 'intro', label: 'Introdução' },
        { id: 'experience', label: 'Experiência' },
        { id: 'education', label: 'Formação' },
        { id: 'applications', label: 'Aplicações' },
        { id: 'more', label: 'Mais' },
        { id: 'contact', label: 'Contato' },
    ],
    open: 'Abrir o menu',
    close: 'Fechar o menu',
    language: 'Idioma',
    languages: { en: 'Inglês', pt: 'Português' },
};

export const footer = {
    line: `Desenhado e construído por ${person.name}.`,
    source: 'Código-fonte deste site',
    license: 'Código sob a licença MIT. Os textos e as imagens são meus.',
    top: 'Voltar ao topo',
};

export const notFound = {
    title: 'Esta página não existe',
    text: 'O endereço está errado ou a página mudou de lugar. O portfólio é uma página só, e começa aqui:',
    cta: 'Abrir o portfólio',
};

// A fileira de diagramas originais. Arquivos, tamanhos e lugares: facts.figma, na ordem de facts.figmaOrder.
export const figma = {
    title: 'Do meu Figma',
    lead: 'Os desenhos que fiz enquanto projetava estes sistemas.',
    open: 'Abrir o diagrama em tamanho grande',
    close: 'Fechar o diagrama',
    items: {
        'consignado-aks': {
            title: 'API do consignado no AKS, primeira versão',
            caption: `Meu primeiro desenho do host Kubernetes do ${consignado.name}: um load balancer, um service, dois pods e PostgreSQL com TLS. A plataforma no ar hoje tem um gateway e um load balancer interno na frente.`,
            alt: 'Diagrama de arquitetura. Um usuário envia HTTP para um load balancer que aceita só endereços IP permitidos. O load balancer envia a requisição para o service consignado-api em um cluster AKS com 2 a 3 pods. Dois pods em Spring Boot se conectam ao Azure PostgreSQL com TLS. Linhas tracejadas saem do cluster para ACR, Key Vault e Entra ID, usados só quando um pod sobe. Logs e métricas vão para o Azure Monitor.',
        },
        'consignado-pod-start': {
            title: 'Como um pod sobe sem segredo guardado',
            caption: 'Sete passos, do agendamento do pod até o primeiro tráfego. As linhas rosa são confiança sem segredo guardado.',
            alt: 'Diagrama de sete passos em linha. 1: o AKS agenda o pod no node. 2: o kubelet baixa a imagem do ACR. 3: o token da service account vira um token da Azure no Entra ID, por workload identity. 4: o CSI driver lê a senha do banco de dados no Key Vault. 5: o container do Spring Boot sobe com a senha. 6: o Flyway migra o Azure PostgreSQL com TLS e o readiness fica ativo. 7: o pod está pronto e o Service envia tráfego para ele.',
        },
        'ruph-ship': {
            title: 'Como o Ruph faz deploy',
            caption: 'Uma mudança no GitHub dispara os testes automáticos e um build. O build vai para QA e depois para PROD. Ele entra sem chave guardada (WIF), e o rollback é um clique.',
            alt: 'Fluxograma com o título "How we ship". O GitHub dispara os testes automáticos, que levam a um build do app em um container. O build vai para QA, onde é conferido primeiro, e depois é promovido para PROD. Uma linha tracejada sai do build para a caixa "No stored keys: GitHub proves who it is (WIF)". Uma linha tracejada sai de PROD para "One-click rollback". Uma nota diz que nada chega a PROD sem passar pelos testes e por QA.',
        },
        'devops-challenge': {
            title: 'Arquitetura do desafio de DevOps',
            caption: 'Um navegador, um frontend, um writer em Python e um reader em Go, com o Redis entre os dois serviços.',
            alt: 'Diagrama com quatro caixas. O navegador fala com o frontend por HTTP. O frontend envia e busca dados: faz POST em um serviço writer em Python e GET em um serviço reader em Go. O writer faz POST no Redis e o reader faz GET no Redis.',
        },
    },
};
