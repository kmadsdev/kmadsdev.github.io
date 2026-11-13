// Título da página, navegação, rodapé e página 404.
import { facts } from '../facts.js';

export const meta = {
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    title: `${facts.person.name} (${facts.person.alias}) · Engenheiro de Software Backend`,
    description: `Engenheiro de Software Backend no ${facts.picpay.name}. Java, Go, Python, PHP, SQL e MongoDB. Casos com fluxogramas de arquitetura, projetos em produção e o histórico completo de experiência.`,
};

export const nav = {
    skip: 'Pular para o conteúdo',
    home: 'Voltar ao topo',
    menu: 'Seções',
    items: [
        { id: 'about', label: 'Sobre' },
        { id: 'experience', label: 'Experiência' },
        { id: 'cases', label: 'Casos' },
        { id: 'projects', label: 'Projetos' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contato' },
    ],
    language: 'Idioma',
    languages: { en: 'Inglês', pt: 'Português' },
};

export const footer = {
    line: `Desenhado e construído por ${facts.person.name}.`,
    source: 'Código-fonte deste site',
    license: 'Código sob a licença MIT. Os textos e as imagens são meus.',
    top: 'Voltar ao topo',
};

export const notFound = {
    title: 'Esta página não existe',
    text: 'O endereço está errado ou a página mudou de lugar. O portfólio é uma página só, e começa aqui:',
    cta: 'Abrir o portfólio',
};
