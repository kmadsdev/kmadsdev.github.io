import type { Localized } from '@/types';

/* Verified: opus-HANDOFF §6 Identity — WHOAMI arc, honors, interests, languages */

/** Progressive group reveal: one group per build (3 builds). */
export const WHOAMI_GROUPS: Localized<string[][]> = {
  en: [
    [
      'It started with a curious kid assembling — and disassembling — every toy in reach.',
      'By 2018 that curiosity was writing Discord bots for communities of 10k+ members.',
    ],
    [
      'Eight years later the same loop ships production software: SaaS platforms,',
      'machine-learning services and agentic workflows, with ~3 years focused on',
      'software engineering, architecture and distributed systems.',
    ],
    [
      'Today: building SaaS and open-source software, engineering AI-native systems,',
      'and teaching aspiring engineers along the way. Always building, always learning.',
    ],
  ],
  pt: [
    [
      'Tudo começou com uma criança curiosa montando — e desmontando — todo brinquedo ao alcance.',
      'Em 2018 essa curiosidade já escrevia bots de Discord para comunidades com 10k+ membros.',
    ],
    [
      'Oito anos depois, o mesmo ciclo entrega software em produção: plataformas SaaS,',
      'serviços de machine learning e workflows agênticos, com ~3 anos focados em',
      'engenharia de software, arquitetura e sistemas distribuídos.',
    ],
    [
      'Hoje: construindo SaaS e software open source, criando sistemas AI-native',
      'e ensinando engenheiros em formação pelo caminho. Sempre construindo, sempre aprendendo.',
    ],
  ],
};

export const ABOUT_LABELS: Localized<{ whoami: string; honors: string; interests: string; languages: string }> = {
  en: { whoami: 'WHOAMI', honors: 'HONORS', interests: 'INTERESTS', languages: 'LANGUAGES' },
  pt: { whoami: 'QUEM SOU', honors: 'HONRARIAS', interests: 'INTERESSES', languages: 'IDIOMAS' },
};

export const HONORS: Localized<string[]> = {
  en: ['Math Kangaroo bronze 2024', 'Beat a 2400-elo chess bot'],
  pt: ['Bronze no Canguru de Matemática 2024', 'Venci um bot de xadrez de 2400 de elo'],
};

export const INTERESTS: Localized<string[]> = {
  en: ['Muay Thai / boxing', 'Chess', 'Homelab', 'Cars', 'Quantum computing'],
  pt: ['Muay Thai / boxe', 'Xadrez', 'Homelab', 'Carros', 'Computação quântica'],
};

export const LANGUAGES: Localized<string[]> = {
  en: ['EN — full professional', 'PT — native', 'ES — limited working'],
  pt: ['EN — profissional completo', 'PT — nativo', 'ES — intermediário'],
};
