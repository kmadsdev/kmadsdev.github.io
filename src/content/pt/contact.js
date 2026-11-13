// Seção "Contato" e os controles que não pertencem a uma seção.
import { facts } from '../facts.js';

export const contact = {
    label: 'Contato',
    title: 'Escreva para mim sobre um sistema, uma vaga ou um bug.',
    text: 'Respondo em português e em inglês. Conte sobre o sistema, o time e o problema, e eu digo como posso ajudar.',
    emailCta: 'Escrever para mim',
    copy: 'Copiar o endereço',
    copied: 'Endereço copiado',
    channels: [
        { id: 'email', label: 'Email', value: facts.contact.email },
        { id: 'linkedin', label: 'LinkedIn', value: facts.contact.linkedinHandle },
        { id: 'github', label: 'GitHub', value: facts.contact.githubHandle },
    ],
};

export const controls = {
    theme: 'Tema',
    themes: { dark: 'Escuro', light: 'Claro' },
    switchToDark: 'Usar o tema escuro',
    switchToLight: 'Usar o tema claro',
    external: 'abre em uma nova aba',
};
