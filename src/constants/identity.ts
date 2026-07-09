import type { Localized } from '@/types';

/* Verified: opus-HANDOFF §6 Identity + linkedin-profile.md */
export const IDENTITY = {
  name: 'Kaique Souza',
  alias: 'kmads',
  role: 'Software Engineer',
  email: 'contact@kmads.dev',
  github: 'https://github.com/kmadsdev',
  githubUser: 'kmadsdev',
  linkedin: 'https://www.linkedin.com/in/kaique-souza-kmads/',
  site: 'https://kmads.dev',
} as const;

interface HeroContent {
  eyebrow: string;
  tagline: string;
  scrollCue: string;
}

export const HERO_NAME_LINES = ['KAIQUE', '"KMADS"', 'SOUZA'];

/* Job title stays English in both languages (user ruling, 2026-07-09). */
export const HERO: Localized<HeroContent> = {
  en: {
    eyebrow: 'SOFTWARE ENGINEER · BRAZIL · REMOTE',
    tagline:
      'Software Engineer — distributed systems, SaaS and backend/cloud/AI. 8 years shipping software, from Discord bots to production ML.',
    scrollCue: 'SCROLL',
  },
  pt: {
    eyebrow: 'SOFTWARE ENGINEER · BRASIL · REMOTO',
    tagline:
      'Software Engineer — sistemas distribuídos, SaaS e backend/cloud/IA. 8 anos entregando software, de bots de Discord a ML em produção.',
    scrollCue: 'SCROLL',
  },
};

interface NavLink {
  label: string;
  target: string;
}

export const NAV_LINKS: Localized<NavLink[]> = {
  en: [
    { label: 'About', target: 'about' },
    { label: 'Timeline', target: 'timeline' },
    { label: 'Projects', target: 'flagship-agentic' },
    { label: 'Gallery', target: 'projects-gallery' },
    { label: 'Skills', target: 'skills' },
    { label: 'Contact', target: 'contact' },
  ],
  pt: [
    { label: 'Sobre', target: 'about' },
    { label: 'Trajetória', target: 'timeline' },
    { label: 'Projetos', target: 'flagship-agentic' },
    { label: 'Galeria', target: 'projects-gallery' },
    { label: 'Habilidades', target: 'skills' },
    { label: 'Contato', target: 'contact' },
  ],
};
