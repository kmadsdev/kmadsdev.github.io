// Primeira tela.
import { facts } from '../facts.js';
import { ptNumber } from '../format.js';

const { person, picpay } = facts;

export const hero = {
    status: `Engenheiro de Software no ${picpay.name}`,
    location: 'Brasil (UTC-3)',
    name: person.name,
    alias: `também conhecido como ${person.alias}`,
    headline: 'Construo sistemas de backend e conserto os que ninguém quer abrir.',
    lead: `Engenheiro de Software Backend no ${picpay.name}. Java, Go, Python, PHP, SQL e MongoDB. Projeto sistemas que escalam e dou aos agentes de IA uma estrutura para seguir.`,
    primaryCta: 'Ler os casos',
    secondaryCta: 'Enviar um email',
    scroll: 'Role',
    stats: [
        { value: `${person.yearsEngineering}`, label: 'anos de trabalho em engenharia' },
        { value: `${person.codingSince}`, label: 'primeira linha de código' },
        { value: ptNumber(picpay.bodyshop.customers), label: `clientes no escopo do ${picpay.bodyshop.name}` },
        { value: ptNumber(picpay.bodyshop.approvalRate), label: 'das imagens do piloto aprovadas sem trabalho manual' },
    ],
};
