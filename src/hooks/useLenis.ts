import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

export const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}

/**
 * Flow-mode (mobile) smooth scroll — agentic pattern: reduced-motion bail
 * returning null, own rAF loop, gentle lerp.
 */
export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const instance = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    setLenis(instance);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return lenis;
}
