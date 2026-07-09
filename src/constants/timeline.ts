import type { Localized, TimelineStep } from '@/types';

/* User-provided timeline (2026-07-09 revision) — 8 chapters, one gesture each.
   Job titles stay English in both languages (user ruling); windows and
   description pills localize. Amber ('progress') on the PicPay SWE row ONLY. */

export const TIMELINE_HEAD: Localized<{ eyebrow: string; title: string }> = {
  en: { eyebrow: 'TIMELINE — 2018 → NOW', title: 'Eight years, eight chapters.' },
  pt: { eyebrow: 'TRAJETÓRIA — 2018 → HOJE', title: 'Oito anos, oito capítulos.' },
};

export const TIMELINE_STEPS: Localized<TimelineStep[]> = {
  en: [
    {
      title: 'Application Developer',
      window: '2018 – 2023',
      tags: ['Discord', 'Minecraft'],
      tagVariant: 'shipped',
      descriptionTags: [
        '10k+ member communities',
        'Cross-platform plugins',
        'Webhooks',
        'Node/Discord.JS',
        'Java',
        'Glitch.com',
        'Discloud',
      ],
      complete: true,
    },
    {
      title: 'Hardware & IT Advisor',
      window: '2022 – 2024',
      tags: ['r/craftmybox', 'r/buildapc', 'r/pcmasterrace', 'r/computers', '+ more'],
      tagVariant: 'shipped',
      descriptionTags: [
        '250+ assisted builds',
        'Thousands saved via researched deals',
        'Support across America — mainly Brazil & US',
        'Multi-OS: Linux, macOS, Windows',
      ],
      complete: true,
    },
    {
      title: 'Founder & Software Engineer',
      window: 'Jan – Apr 2024',
      tags: ['DK Shipping'],
      tagVariant: 'closed',
      descriptionTags: [
        'Dropshipping electronics store',
        'React/JS/TwCSS',
        'FastAPI/Python',
        'Stripe gateway',
      ],
      complete: true,
    },
    {
      title: 'Co-Founder & Software Engineer',
      window: 'Jan – Dec 2024',
      tags: ['TrocaTine'],
      tagVariant: 'shipped',
      descriptionTags: [
        '4.8/5 startup evaluation @ ExpoTech 2024 (Instituto J&F)',
        'Frontend team leader',
        'React/JS',
        'PostgreSQL modeling',
      ],
      complete: true,
    },
    {
      title: 'Co-Founder & Software Engineer',
      window: 'Jan – Dec 2025',
      tags: ['HiveMind'],
      tagVariant: 'win',
      descriptionTags: [
        '~99.99% AWS S3 storage cost reduction',
        'Data engineering team leader',
        'ML data modeling, training and deployment',
        'AWS EC2 + S3',
      ],
      complete: true,
    },
    {
      title: 'Data Engineer',
      window: 'Mar – Nov 2025',
      tags: ['PicPay'],
      tagVariant: 'shipped',
      descriptionTags: [
        '2–5× query performance gains',
        'Oracle SQL',
        'Improved performance across 200+ tables per query',
      ],
      complete: true,
    },
    {
      title: 'Software Engineer',
      window: 'Nov 2025 – Present',
      tags: ['PicPay'],
      tagVariant: 'progress',
      descriptionTags: [
        'Estimated $40k in annual savings on Project Survey',
        'Credit card acquisition',
        'Corporate IT / HR',
        'Vehicle Hub / BodyShop',
      ],
      complete: false,
    },
    {
      title: 'Open-Source Developer',
      window: '2023 – Present',
      tags: ['Side Projects'],
      tagVariant: 'shipped',
      descriptionTags: [
        '2k+ visitors and 60k+ requests per month',
        'Almost all applications fully open source',
      ],
      complete: false,
    },
  ],
  pt: [
    {
      title: 'Application Developer',
      window: '2018 – 2023',
      tags: ['Discord', 'Minecraft'],
      tagVariant: 'shipped',
      descriptionTags: [
        'Comunidades com 10k+ membros',
        'Plugins multiplataforma',
        'Webhooks',
        'Node/Discord.JS',
        'Java',
        'Glitch.com',
        'Discloud',
      ],
      complete: true,
    },
    {
      title: 'Hardware & IT Advisor',
      window: '2022 – 2024',
      tags: ['r/craftmybox', 'r/buildapc', 'r/pcmasterrace', 'r/computers', '+ outros'],
      tagVariant: 'shipped',
      descriptionTags: [
        '250+ builds assistidos',
        'Milhares economizados em ofertas que pesquisei',
        'Suporte pelas Américas — principalmente Brasil e EUA',
        'Multi-OS: Linux, macOS, Windows',
      ],
      complete: true,
    },
    {
      title: 'Founder & Software Engineer',
      window: 'Jan – Abr 2024',
      tags: ['DK Shipping'],
      tagVariant: 'closed',
      descriptionTags: [
        'Loja de eletrônicos (dropshipping)',
        'React/JS/TwCSS',
        'FastAPI/Python',
        'Gateway Stripe',
      ],
      complete: true,
    },
    {
      title: 'Co-Founder & Software Engineer',
      window: 'Jan – Dez 2024',
      tags: ['TrocaTine'],
      tagVariant: 'shipped',
      descriptionTags: [
        'Avaliação 4.8/5 da startup @ ExpoTech 2024 (Instituto J&F)',
        'Líder do time de frontend',
        'React/JS',
        'Modelagem PostgreSQL',
      ],
      complete: true,
    },
    {
      title: 'Co-Founder & Software Engineer',
      window: 'Jan – Dez 2025',
      tags: ['HiveMind'],
      tagVariant: 'win',
      descriptionTags: [
        '~99.99% de redução no custo de storage AWS S3',
        'Líder do time de engenharia de dados',
        'Modelagem, treino e deploy de ML',
        'AWS EC2 + S3',
      ],
      complete: true,
    },
    {
      title: 'Data Engineer',
      window: 'Mar – Nov 2025',
      tags: ['PicPay'],
      tagVariant: 'shipped',
      descriptionTags: [
        'Ganhos de 2–5× em performance de queries',
        'Oracle SQL',
        'Performance melhorada em 200+ tabelas por query',
      ],
      complete: true,
    },
    {
      title: 'Software Engineer',
      window: 'Nov 2025 – Atual',
      tags: ['PicPay'],
      tagVariant: 'progress',
      descriptionTags: [
        'Economia anual estimada de $40k no Project Survey',
        'Aquisição de cartão de crédito',
        'TI corporativa / RH',
        'Vehicle Hub / BodyShop',
      ],
      complete: false,
    },
    {
      title: 'Open-Source Developer',
      window: '2023 – Atual',
      tags: ['Projetos Pessoais'],
      tagVariant: 'shipped',
      descriptionTags: [
        '2k+ visitantes e 60k+ requisições por mês',
        'Quase todas as aplicações são open source',
      ],
      complete: false,
    },
  ],
};
