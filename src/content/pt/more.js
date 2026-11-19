// Seção "Mais": voluntariado, idiomas, hobbies e projetos futuros.
// Uma linha honesta para cada hobby. Nada de recorde, time ou detalhe sem fonte.
import { facts } from '../facts.js';
import { years } from '../format.js';

const { earlier, contact, hobbies } = facts;
const { reddit } = earlier;

export const more = {
    label: 'Mais',
    title: 'Voluntariado, idiomas e o que eu faço por diversão.',
    lead: 'Gosto de engenharia de performance em servidores, em gabinetes de PC e debaixo do capô de um carro.',
    volunteering: {
        anchor: 'more-volunteering',
        title: 'Voluntariado',
        role: 'Consultor de hardware e TI',
        place: 'Reddit',
        period: years(reddit),
        text: `Ajudei ${reddit.people} pessoas a planejar e montar PCs para jogos, trabalho profissional e servidores: escolha de peças, orçamento e consertos em Windows, macOS e Linux. Foi antes dos assistentes de IA, então cada resposta saía de pesquisa, de benchmarks e das minhas próprias montagens.`,
        communitiesLabel: 'Comunidades',
        communities: reddit.communities,
    },
    languages: {
        anchor: 'more-languages',
        title: 'Idiomas',
        items: [
            { id: 'pt', name: 'Português', level: 'Nativo' },
            { id: 'en', name: 'Inglês', level: 'C1' },
            { id: 'es', name: 'Espanhol', level: 'Básico' },
        ],
    },
    hobbies: {
        anchor: 'more-hobbies',
        title: 'Hobbies',
        items: [
            {
                id: 'ecu',
                title: 'Acerto de injeção eletrônica',
                text: `Estudo a injeção eletrônica e o acerto de Honda Civics de 1990 a 2002. As anotações vão para um acervo aberto na minha segunda conta do GitHub, ${contact.carGithubHandle}.`,
                link: { label: 'open-civic', to: contact.carRepo },
            },
            { id: 'pc', title: 'Hardware de PC', text: 'Monto PCs e homelabs, e leio os benchmarks antes de comprar uma peça.', link: null },
            { id: 'gym', title: 'Academia', text: `Treino há ${hobbies.gym.years} anos, com foco em hipertrofia e powerlifting. Meu recorde no supino é ${hobbies.gym.bench} e no levantamento terra é ${hobbies.gym.deadlift}.`, link: null },
            { id: 'basketball', title: 'Basquete', text: `Jogo há ${hobbies.basketball.years} ano, nos fins de semana com amigos.`, link: null },
            { id: 'chess', title: 'Xadrez', text: `Jogo há ${hobbies.chess.years} anos e meu rating passa de ${hobbies.chess.rating}. Já venci o ${hobbies.chess.bot}, um bot do ${hobbies.chess.site} com rating ${hobbies.chess.botRating}.`, link: null },
        ],
    },
    future: {
        anchor: 'more-future',
        title: 'Projetos futuros',
        lead: 'Só o que os meus repositórios públicos indicam como planejado.',
        // Mesmos ids e mesma ordem de facts.future. Uma lista vazia esconde o bloco.
        items: [
            { id: 'notes', title: 'Notes: o roadmap', text: 'Suporte offline com service worker, abertura de uma pasta com árvore de arquivos, exportação do preview para PDF e HTML, e trechos compartilhados pela URL.' },
            { id: 'microdoom', title: 'MicroDOOM v1.1', text: 'A próxima versão do meu próprio jogo no estilo Doom, em JavaScript puro. O README marca essa versão como em andamento.' },
        ],
    },
};
