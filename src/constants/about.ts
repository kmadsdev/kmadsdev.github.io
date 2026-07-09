/* Verified: opus-HANDOFF §6 Identity — WHOAMI arc, honors, interests, languages */

/** Progressive word-group reveal: one group per build (3 builds). */
export const WHOAMI_GROUPS: string[][] = [
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
];

/** keywords accented with .motion-collapse inside the paragraph */
export const WHOAMI_KEYWORDS = ['Discord bots', 'SaaS platforms', 'machine-learning', 'agentic workflows', 'open-source'];

export const HONORS = [
  'Math Kangaroo bronze 2024',
  'Beat a 2400-elo chess bot',
] as const;

export const INTERESTS = [
  'Muay Thai / boxing',
  'Chess',
  'Homelab',
  'Cars',
  'Quantum computing',
] as const;

export const LANGUAGES = [
  'EN — full professional',
  'PT — native',
  'ES — limited working',
] as const;
