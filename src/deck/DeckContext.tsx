import { createContext, useContext } from 'react';
import type { SceneDef } from '@/types';

export type RenderMode = 'deck' | 'flow';

export interface DeckContextValue {
  renderMode: RenderMode;
  scenes: SceneDef[];
  stepIndex: number;
  sceneIndex: number;
  totalSteps: number;
  reducedMotion: boolean;
  /** past the last step: hijack off, footer scrolls natively (cash.app) */
  released: boolean;
  next: () => void;
  prev: () => void;
  goToStep: (step: number) => void;
  goToScene: (id: string) => void;
  release: () => void;
  recapture: () => void;
}

export const DeckContext = createContext<DeckContextValue>({
  renderMode: 'flow',
  scenes: [],
  stepIndex: 0,
  sceneIndex: 0,
  totalSteps: 0,
  reducedMotion: false,
  released: false,
  next: () => {},
  prev: () => {},
  goToStep: () => {},
  goToScene: () => {},
  release: () => {},
  recapture: () => {},
});

export function useDeck() {
  return useContext(DeckContext);
}
