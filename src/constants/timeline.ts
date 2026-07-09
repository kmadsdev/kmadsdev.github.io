import type { TimelineStep } from '@/types';

/* User-provided timeline (2026-07-09 revision) — 8 chapters, one gesture each.
   Amber ('progress') on the PicPay SWE row ONLY. */
export const TIMELINE_STEPS: TimelineStep[] = [
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
];
