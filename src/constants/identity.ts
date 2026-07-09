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

export const HERO = {
  /* staggered-indent display lines (niklas pattern) */
  nameLines: ['KAIQUE', '"KMADS"', 'SOUZA'],
  recruiter: {
    eyebrow: 'SOFTWARE ENGINEER · BRAZIL · REMOTE',
    /* build 2 assembles word-by-word */
    tagline:
      'Software Engineer — distributed systems, SaaS and backend/cloud/AI. 8 years shipping software, from Discord bots to production ML.',
  },
  builder: {
    eyebrow: 'AI ENGINEERING · AGENTIC WORKFLOWS',
    tagline:
      'Ships SaaS, ML and agentic systems — and once fit DOOM into a URL.',
  },
  scrollCue: 'SCROLL',
} as const;

export const NAV_LINKS = [
  { label: 'About', target: 'about' },
  { label: 'Timeline', target: 'timeline' },
  /* 'projects' resolves to the first flagship of the active mode (Nav.tsx) */
  { label: 'Projects', target: 'projects' },
  { label: 'Gallery', target: 'projects-gallery' },
  { label: 'Skills', target: 'skills' },
  { label: 'Contact', target: 'contact' },
] as const;
