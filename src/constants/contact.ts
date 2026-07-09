import { IDENTITY } from '@/constants/identity';

/* Verified: opus-HANDOFF §6 Contact — short, no filler. */
export const CONTACT_LINKS = [
  { label: 'contact@kmads.dev', href: `mailto:${IDENTITY.email}`, variant: 'primary' as const },
  { label: 'LinkedIn', href: IDENTITY.linkedin, variant: 'ghost' as const, external: true },
  { label: 'GitHub — kmadsdev', href: IDENTITY.github, variant: 'ghost' as const, external: true },
  { label: 'All projects', href: '#projects-gallery', variant: 'link' as const },
];
