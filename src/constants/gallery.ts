import type { GalleryCard } from '@/types';

/* Verified: opus-HANDOFF §6 Gallery. Secondary = live/blue register;
   archive = muted; dk-shipping = closed-chapter warm, no glow. */

export const GALLERY_SECONDARY: GalleryCard[] = [
  {
    title: 'Custom Square',
    blurb:
      'Real-time CSS property, gradient and color playground — vanilla JS with localStorage theme persistence. A utility, and it behaves like one.',
    callout: 'LIVE — KMADS.DEV/CUSTOM-SQUARE',
    tags: ['Vanilla JS', 'CSS', 'localStorage'],
    href: 'https://kmads.dev/custom-square',
  },
  {
    title: 'TrocaTine',
    blurb:
      'Sustainability marketplace for exchanging and selling children’s items — co-founded; led the frontend team and the landing project. Java/Tomcat backend over PostgreSQL. 4.8/5 evaluation at ExpoTech 2024.',
    callout: '4.8/5 @ EXPOTECH 2024',
    tags: ['Java', 'Tomcat', 'JSP', 'JDBC', 'PostgreSQL'],
  },
  {
    title: 'Cloudflare Dashboard',
    blurb:
      'Python Textual TUI + FastAPI backend for Cloudflare zone analytics, DNS records and page rules — Docker-composed for dev and prod. Private repo.',
    callout: 'TEXTUAL TUI · FASTAPI · DOCKER',
    tags: ['Python', 'Textual', 'FastAPI', 'Docker'],
  },
];

export const GALLERY_ARCHIVE: GalleryCard[] = [
  {
    title: 'DevOps Challenge',
    blurb: 'PicPay Jr DevOps/SRE take-home — Docker-composed 4-service system: Node.js web, Python writer, Go reader, Redis. Arch diagram in repo.',
    callout: '4 SERVICES · DOCKER-COMPOSED',
    href: 'https://github.com/kmadsdev/devops-challenge',
    archive: true,
  },
  {
    title: 'SWE Challenge 1',
    blurb: 'Alerts/incidents/metrics REST API — MySQL schema, Prometheus-style /metrics, JSON logging.',
    callout: 'OBSERVABILITY REST API',
    href: 'https://github.com/kmadsdev/swe-observability-challenge-1',
    archive: true,
  },
  {
    title: 'SWE Challenge 2',
    blurb: 'Same brief, solved twice: a TUI variant (python -m tui) with API-TESTING.md — a different architecture for the same problem.',
    callout: 'SAME BRIEF · SECOND ARCHITECTURE',
    href: 'https://github.com/kmadsdev/swe-observability-challenge-2',
    archive: true,
  },
  {
    title: 'Engineer Student Tools',
    blurb: 'Curated free dev tools and credits via the GitHub Student Pack — ~$5,000+ in value. Community contribution, not code.',
    callout: '~$5,000+ CURATED VALUE',
    href: 'https://github.com/kmadsdev/engineer-student-tools',
    archive: true,
  },
  {
    title: 'CS50x',
    blurb: 'Harvard coursework — Scratch → C → Python → SQL → Flask → final project. That final is the direct ancestor of Diabetes Indicator.',
    callout: 'ANCESTOR OF DIABETES INDICATOR',
    href: 'https://github.com/kmadsdev/cs50x',
    archive: true,
  },
  {
    title: 'dk-shipping',
    blurb: 'Dropshipping electronics store — Jan–Apr 2024, a 4-month run. Closed chapter.',
    callout: 'CLOSED — 4 MONTHS',
    archive: true,
    closed: true,
  },
];
