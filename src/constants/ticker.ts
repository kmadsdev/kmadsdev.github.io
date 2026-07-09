/* Ticker content — ENGLISH in both languages (user ruling: display-type
   marquee is brand texture). Rows spin automatically (CSS marquee, opposite
   directions, same speed). Every project appears; crops and phrases are
   interleaved so nothing repeats too often within a loop. */

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

/** Row 1 — facts + every project, alternating (spins left) */
export const ROW1: TickerEntry[] = [
  { kind: 'phrase', text: '97.9% ML ACCURACY' },
  { kind: 'media', mini: 'hivemind', alt: 'HiveMind survey-to-model pipeline' },
  { kind: 'phrase', text: '3-TIER PRODUCTION ARCHITECTURE' },
  { kind: 'media', src: '/mockups/ticker-offmode.jpg', alt: 'OffMode live timer screen' },
  { kind: 'phrase', text: 'CO-FOUNDED 2 STARTUPS' },
  { kind: 'media', src: '/mockups/agentic-hero.jpg', alt: 'Agentic Template landing' },
  { kind: 'phrase', text: 'DOOM IN A URL' },
  { kind: 'media', src: '/mockups/ticker-doom.jpg', alt: 'DOOM decompressing in the browser' },
  { kind: 'phrase', text: '8 YEARS SHIPPING SOFTWARE' },
  { kind: 'media', src: '/mockups/ticker-notes.jpg', alt: 'Notes Monaco editor, live' },
  { kind: 'phrase', text: '~99.99% AWS S3 COST REDUCTION' },
  { kind: 'media', src: '/mockups/ticker-diabetes.jpg', alt: 'Diabetes Indicator confidence result' },
  { kind: 'phrase', text: 'AUTO-REVERT CI/CD GUARD' },
  { kind: 'media', mini: 'threetier', alt: 'OffMode 3-tier architecture' },
];

/** Row 2 — ranked stack strip + remaining crops, muted register (spins right) */
export const ROW2_STACK: TickerEntry[] = [
  { kind: 'phrase', text: 'PYTHON · TYPESCRIPT · GO', muted: true },
  { kind: 'media', src: '/mockups/ticker-diabetes.jpg', alt: 'Diabetes Indicator survey' },
  { kind: 'phrase', text: 'PHP · FASTAPI · REACT', muted: true },
  { kind: 'media', mini: 'doom', alt: 'DOOM compression pipeline' },
  { kind: 'phrase', text: 'NODE.JS · AWS · POSTGRESQL', muted: true },
  { kind: 'media', src: '/mockups/agentic-mid.jpg', alt: 'Agentic Template CI stats' },
  { kind: 'phrase', text: 'DOCKER · SCIKIT-LEARN · WASM', muted: true },
  { kind: 'media', src: '/mockups/ticker-offmode.jpg', alt: 'OffMode live timer screen' },
];
