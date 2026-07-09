/* Verified: opus-HANDOFF §6 ticker rows. Numerals get .ticker__num (energy).
   Media entries: real project screen crops (Phase C, public/mockups/) or
   mini hand-built SVG diagrams — every image has a reason. */

export interface TickerEntry {
  kind: 'phrase' | 'media';
  text?: string;
  /** img crop under /mockups/ */
  src?: string;
  /** mini inline SVG rendered by Ticker.tsx */
  mini?: 'hivemind' | 'doom' | 'threetier';
  alt?: string;
  muted?: boolean;
}

/** Row 1 — fact phrases. Ticker stays ENGLISH in both languages (user
    ruling, 2026-07-09: display-type marquee is brand texture). */
export const ROW1: TickerEntry[] = [
  { kind: 'phrase', text: '97.9% ML ACCURACY' },
  { kind: 'media', mini: 'hivemind', alt: 'HiveMind survey-to-model pipeline' },
  { kind: 'phrase', text: '3-TIER PRODUCTION ARCHITECTURE' },
  { kind: 'media', src: '/mockups/ticker-offmode.jpg', alt: 'OffMode live timer screen' },
  { kind: 'phrase', text: 'CO-FOUNDED 2 STARTUPS' },
  { kind: 'phrase', text: '8 YEARS SHIPPING SOFTWARE' },
  { kind: 'media', src: '/mockups/ticker-notes.jpg', alt: 'Notes Monaco editor, live' },
  { kind: 'phrase', text: '~99.99% AWS S3 COST REDUCTION' },
  /* craft phrases folded in — one row, no recruiter/builder split */
  { kind: 'phrase', text: 'DOOM IN A URL' },
  { kind: 'media', src: '/mockups/ticker-doom.jpg', alt: 'DOOM decompressing in the browser' },
  { kind: 'phrase', text: 'AUTO-REVERT CI/CD GUARD' },
];

/** Row 2 — ranked stack strip (CV order), muted register, screen crops between groups */
export const ROW2_STACK: TickerEntry[] = [
  { kind: 'phrase', text: 'PYTHON · TYPESCRIPT · GO', muted: true },
  { kind: 'media', src: '/mockups/ticker-diabetes.jpg', alt: 'Diabetes Indicator confidence result' },
  { kind: 'phrase', text: 'PHP · FASTAPI · REACT', muted: true },
  { kind: 'media', mini: 'threetier', alt: 'OffMode 3-tier architecture' },
  { kind: 'phrase', text: 'NODE.JS · AWS · POSTGRESQL · DOCKER', muted: true },
  { kind: 'media', src: '/mockups/ticker-offmode.jpg', alt: 'OffMode live timer screen' },
];
