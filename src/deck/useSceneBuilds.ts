import type { SceneDef } from '@/types';

/** Flat-step math: each scene occupies `builds` consecutive global steps. */
export interface StepMap {
  totalSteps: number;
  /** first global step of each scene */
  offsets: number[];
}

export function buildStepMap(scenes: SceneDef[]): StepMap {
  const offsets: number[] = [];
  let total = 0;
  for (const scene of scenes) {
    offsets.push(total);
    total += Math.max(1, scene.builds);
  }
  return { totalSteps: total, offsets };
}

export function sceneIndexForStep(map: StepMap, step: number): number {
  let idx = 0;
  for (let i = 0; i < map.offsets.length; i++) {
    if (step >= map.offsets[i]) idx = i;
  }
  return idx;
}

/** Highest build reached in a scene for a global step (clamped: 0 before, builds-1 after). */
export function buildIndexForScene(
  map: StepMap,
  scenes: SceneDef[],
  sceneIdx: number,
  step: number,
): number {
  const builds = Math.max(1, scenes[sceneIdx].builds);
  const rel = step - map.offsets[sceneIdx];
  return Math.min(Math.max(rel, 0), builds - 1);
}
