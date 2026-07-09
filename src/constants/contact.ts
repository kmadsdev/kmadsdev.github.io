import type { Localized } from '@/types';
import { IDENTITY } from '@/constants/identity';

/* Contact CTA + footer strings — short, no filler. */
export const CONTACT_LINKS = [
  { label: 'contact@kmads.dev', href: `mailto:${IDENTITY.email}`, variant: 'primary' as const },
  { label: 'LinkedIn', href: IDENTITY.linkedin, variant: 'ghost' as const, external: true },
  { label: 'GitHub — kmadsdev', href: IDENTITY.github, variant: 'ghost' as const, external: true },
];

export const FOOTER_STRINGS: Localized<{
  ctaEyebrow: string;
  ctaTitle: string;
  legalRole: string;
}> = {
  en: {
    ctaEyebrow: 'CONTACT',
    ctaTitle: 'Building something? Talk to me.',
    legalRole: 'SOFTWARE ENGINEER · BRAZIL · REMOTE',
  },
  pt: {
    ctaEyebrow: 'CONTATO',
    ctaTitle: 'Construindo algo? Fala comigo.',
    legalRole: 'SOFTWARE ENGINEER · BRASIL · REMOTO',
  },
};
