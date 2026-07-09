import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SceneDef } from '@/types';
import type { RenderMode } from '@/deck/DeckContext';
import { buildStepMap, sceneIndexForStep } from '@/deck/useSceneBuilds';

const WHEEL_THRESHOLD = 60; // px of accumulated deltaY = one gesture
const COOLDOWN_MS = 900; // absorbs trackpad inertia + lets builds finish

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function resolveRenderMode(): RenderMode {
  if (typeof window === 'undefined') return 'flow';
  const wide = window.innerWidth >= 768;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  return wide && finePointer ? 'deck' : 'flow';
}

export interface DeckEngine {
  renderMode: RenderMode;
  stepIndex: number;
  sceneIndex: number;
  totalSteps: number;
  reducedMotion: boolean;
  released: boolean;
  next: () => void;
  prev: () => void;
  goToStep: (step: number) => void;
  goToScene: (id: string) => void;
  release: () => void;
  recapture: () => void;
}

/**
 * Desktop scroll-hijack deck: quantized wheel/key gestures advance a flat
 * step list (scenes × builds). One gesture past the last step RELEASES the
 * hijack into native scroll (footer, cash.app style); wheeling up at
 * scrollY 0 re-captures. Mobile/touch renders as a flowing document.
 */
export function useDeckEngine(scenes: SceneDef[]): DeckEngine {
  const map = useMemo(() => buildStepMap(scenes), [scenes]);
  const [renderMode, setRenderMode] = useState<RenderMode>(resolveRenderMode);
  const [released, setReleased] = useState(false);
  const [stepIndex, setStepIndex] = useState(() => {
    const id = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    const idx = scenes.findIndex((s) => s.id === id);
    return idx >= 0 ? buildStepMap(scenes).offsets[idx] : 0;
  });
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  const stepRef = useRef(stepIndex);
  stepRef.current = stepIndex;
  const releasedRef = useRef(released);
  releasedRef.current = released;
  const wheelAcc = useRef(0);
  const coolingUntil = useRef(0);
  const sceneIdRef = useRef(scenes[sceneIndexForStep(map, stepIndex)]?.id);

  const goToStep = useCallback(
    (step: number) => {
      const clamped = Math.min(Math.max(step, 0), map.totalSteps - 1);
      setStepIndex(clamped);
    },
    [map],
  );

  const release = useCallback(() => setReleased(true), []);
  const recapture = useCallback(() => {
    setReleased(false);
    window.scrollTo(0, 0);
  }, []);

  const next = useCallback(() => {
    if (stepRef.current >= map.totalSteps - 1) setReleased(true);
    else goToStep(stepRef.current + 1);
  }, [goToStep, map]);
  const prev = useCallback(() => goToStep(stepRef.current - 1), [goToStep]);

  const goToScene = useCallback(
    (id: string) => {
      const idx = scenes.findIndex((s) => s.id === id);
      if (idx >= 0) {
        setReleased(false);
        window.scrollTo(0, 0);
        goToStep(map.offsets[idx]);
      }
    },
    [scenes, map, goToStep],
  );

  const sceneIndex = sceneIndexForStep(map, stepIndex);
  sceneIdRef.current = scenes[sceneIndex]?.id;

  // scene list changed (mode toggle re-order): stay on the same scene id
  useEffect(() => {
    const id = sceneIdRef.current;
    const idx = scenes.findIndex((s) => s.id === id);
    setStepIndex((current) => {
      if (idx < 0) return Math.min(current, map.totalSteps - 1);
      return map.offsets[idx];
    });
  }, [scenes, map]);

  // hash sync
  useEffect(() => {
    if (renderMode !== 'deck' || released) return;
    const id = scenes[sceneIndex]?.id;
    if (id && window.location.hash.slice(1) !== id) {
      window.history.replaceState(null, '', `#${id}`);
    }
  }, [sceneIndex, scenes, renderMode, released]);

  // back/forward + manual hash edits
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (id && id !== sceneIdRef.current) goToScene(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [goToScene]);

  // reduced-motion listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // deck/flow selection on resize
  useEffect(() => {
    let timer: number | undefined;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const mode = resolveRenderMode();
        setRenderMode((current) => {
          if (current !== mode && mode === 'deck') {
            const id = sceneIdRef.current;
            const idx = scenes.findIndex((s) => s.id === id);
            if (idx >= 0) setStepIndex(map.offsets[idx]);
          }
          return mode;
        });
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [scenes, map]);

  // gesture capture — deck mode, hijack engaged
  useEffect(() => {
    if (renderMode !== 'deck' || released) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now < coolingUntil.current) return;
      wheelAcc.current += e.deltaY;
      if (Math.abs(wheelAcc.current) >= WHEEL_THRESHOLD) {
        const dir = wheelAcc.current > 0 ? 1 : -1;
        wheelAcc.current = 0;
        coolingUntil.current = now + COOLDOWN_MS;
        if (dir > 0) next();
        else prev();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
        case ' ':
          e.preventDefault();
          if (e.shiftKey) prev();
          else next();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          goToStep(0);
          break;
        case 'End':
          e.preventDefault();
          goToStep(map.totalSteps - 1);
          break;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [renderMode, released, next, prev, goToStep, map]);

  // released: watch for wheel-up at the top → re-capture the deck
  useEffect(() => {
    if (renderMode !== 'deck' || !released) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && window.scrollY <= 1) {
        e.preventDefault();
        recapture();
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [renderMode, released, recapture]);

  return {
    renderMode,
    stepIndex,
    sceneIndex,
    totalSteps: map.totalSteps,
    reducedMotion,
    released,
    next,
    prev,
    goToStep,
    goToScene,
    release,
    recapture,
  };
}
