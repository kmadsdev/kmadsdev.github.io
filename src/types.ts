import type { ComponentType } from 'react';

export type Lang = 'en' | 'pt';

/** per-language variants of a translatable structure */
export type Localized<T> = Record<Lang, T>;

export type IconName =
  | 'arrow-up-right'
  | 'terminal'
  | 'layers'
  | 'cpu'
  | 'git-branch'
  | 'database'
  | 'shield-check'
  | 'gauge'
  | 'box'
  | 'sparkles';

export type FlagshipId =
  | 'agentic'
  | 'offmode'
  | 'hivemind'
  | 'diabetes'
  | 'doom'
  | 'notes';

export type StatusVariant = 'shipped' | 'win' | 'progress' | 'closed';

export interface Stat {
  /** Final display string, e.g. "97.9%" — count-up derives shape from it */
  value: string;
  label: string;
  /** REQUIRED — every stat traces to a verified source (LARP guardrail) */
  source: string;
  win?: boolean;
  /** false = composite stat ("2–5×"), rendered static, never animated */
  animate?: boolean;
}

export interface TimelineStep {
  title: string;
  window: string;
  /** org/scope pills next to the title (Discord, PicPay, …) */
  tags: string[];
  tagVariant: StatusVariant;
  /** verified highlight pills shown under the title */
  descriptionTags: string[];
  complete: boolean;
}

export interface SceneProps {
  /** Highest build reached in this scene (0-based). Flow mode: builds - 1. */
  buildIndex: number;
  /** Deck mode: scene currently on screen. Flow mode: always true. */
  active: boolean;
}

export interface SceneDef {
  id: string;
  builds: number;
  Component: ComponentType<SceneProps>;
  /** deck background flood for this scene (cash.app color swap); CSS color */
  bg?: string;
}

export interface TickerItem {
  kind: 'phrase' | 'media';
  /** phrase: text with numerals wrapped later; media: img src */
  text?: string;
  src?: string;
  alt?: string;
}

export interface GalleryCard {
  title: string;
  blurb: string;
  callout: string;
  tags?: string[];
  href?: string;
  archive?: boolean;
  /** dk-shipping: warm muted register, no glow */
  closed?: boolean;
}

export interface SkillCell {
  name: string;
  /** Ordinal proficiency scale — see skills.ts for the declared mapping */
  fill: number;
  /** Years of use shown next to the bar (recruiters need numbers) */
  years: string;
}

export interface SkillGroup {
  group: string;
  cells: SkillCell[];
}
