import type { GalleryCard, Localized } from '@/types';

/* Verified content. Secondary = live/blue register; archive = muted;
   dk-shipping = closed-chapter warm, no glow. Project names never translate. */

export const GALLERY_HEAD: Localized<{ eyebrow: string; title: string }> = {
  en: { eyebrow: 'EVERYTHING ELSE — STILL REAL', title: 'More shipped work.' },
  pt: { eyebrow: 'TODO O RESTO — TAMBÉM REAL', title: 'Mais trabalho entregue.' },
};

export const GALLERY_SECONDARY: Localized<GalleryCard[]> = {
  en: [
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
  ],
  pt: [
    {
      title: 'Custom Square',
      blurb:
        'Playground de propriedades CSS, gradientes e cores em tempo real — vanilla JS com persistência de tema em localStorage. Uma ferramenta, e se comporta como uma.',
      callout: 'NO AR — KMADS.DEV/CUSTOM-SQUARE',
      tags: ['Vanilla JS', 'CSS', 'localStorage'],
      href: 'https://kmads.dev/custom-square',
    },
    {
      title: 'TrocaTine',
      blurb:
        'Marketplace de sustentabilidade para troca e venda de itens infantis — co-fundei; liderei o time de frontend e o projeto da landing. Backend Java/Tomcat sobre PostgreSQL. Avaliação 4.8/5 na ExpoTech 2024.',
      callout: '4.8/5 @ EXPOTECH 2024',
      tags: ['Java', 'Tomcat', 'JSP', 'JDBC', 'PostgreSQL'],
    },
    {
      title: 'Cloudflare Dashboard',
      blurb:
        'TUI em Python Textual + backend FastAPI para analytics de zonas, registros DNS e page rules da Cloudflare — Docker Compose para dev e prod. Repositório privado.',
      callout: 'TEXTUAL TUI · FASTAPI · DOCKER',
      tags: ['Python', 'Textual', 'FastAPI', 'Docker'],
    },
  ],
};

export const GALLERY_ARCHIVE: Localized<GalleryCard[]> = {
  en: [
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
  ],
  pt: [
    {
      title: 'DevOps Challenge',
      blurb: 'Take-home Jr DevOps/SRE do PicPay — sistema de 4 serviços em Docker Compose: web Node.js, writer Python, reader Go, Redis. Diagrama de arquitetura no repo.',
      callout: '4 SERVIÇOS · DOCKER COMPOSE',
      href: 'https://github.com/kmadsdev/devops-challenge',
      archive: true,
    },
    {
      title: 'SWE Challenge 1',
      blurb: 'API REST de alertas/incidentes/métricas — schema MySQL, /metrics estilo Prometheus, logs em JSON.',
      callout: 'API REST DE OBSERVABILIDADE',
      href: 'https://github.com/kmadsdev/swe-observability-challenge-1',
      archive: true,
    },
    {
      title: 'SWE Challenge 2',
      blurb: 'Mesmo desafio, resolvido duas vezes: uma variante TUI (python -m tui) com API-TESTING.md — outra arquitetura para o mesmo problema.',
      callout: 'MESMO DESAFIO · SEGUNDA ARQUITETURA',
      href: 'https://github.com/kmadsdev/swe-observability-challenge-2',
      archive: true,
    },
    {
      title: 'Engineer Student Tools',
      blurb: 'Curadoria de ferramentas e créditos gratuitos para devs via GitHub Student Pack — ~$5.000+ em valor. Contribuição para a comunidade, não código.',
      callout: '~$5.000+ EM VALOR CURADO',
      href: 'https://github.com/kmadsdev/engineer-student-tools',
      archive: true,
    },
    {
      title: 'CS50x',
      blurb: 'Curso de Harvard — Scratch → C → Python → SQL → Flask → projeto final. Esse final é o ancestral direto do Diabetes Indicator.',
      callout: 'ANCESTRAL DO DIABETES INDICATOR',
      href: 'https://github.com/kmadsdev/cs50x',
      archive: true,
    },
    {
      title: 'dk-shipping',
      blurb: 'Loja de eletrônicos (dropshipping) — Jan–Abr 2024, uma jornada de 4 meses. Capítulo encerrado.',
      callout: 'ENCERRADO — 4 MESES',
      archive: true,
      closed: true,
    },
  ],
};
