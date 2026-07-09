import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useDeck } from '@/deck/DeckContext';

const LERP = 0.08; // easol-style ~1s momentum toward the target
const DECK_STEP_PX = 160; // ticker travel per deck step
const FLOW_FACTOR = 0.35; // ticker travel per scrolled px (flow mode)

/**
 * Scroll-driven dual-row ticker (easol ground truth): idle = static, rows move
 * equal-and-opposite with lerp momentum, reversing with direction.
 * Markup ships WITH .motion-ticker (CSS marquee); this hook removes it before
 * writing inline transforms so reduced-motion / pre-JS fall back to DS CSS.
 */
export function useTickerDrive(
  row1: RefObject<HTMLElement | null>,
  row2: RefObject<HTMLElement | null>,
) {
  const { renderMode, stepIndex, reducedMotion } = useDeck();
  const stepRef = useRef(stepIndex);
  stepRef.current = stepIndex;
  const modeRef = useRef(renderMode);
  modeRef.current = renderMode;

  useEffect(() => {
    const t1 = row1.current;
    const t2 = row2.current;
    if (!t1 || !t2 || reducedMotion) return; // reduced-motion: DS CSS keeps it static

    // running CSS animation beats inline style — remove, restore on cleanup
    t1.classList.remove('motion-ticker');
    t2.classList.remove('motion-ticker');

    let w1 = 0;
    let w2 = 0;
    const measure = () => {
      // subpixel-accurate — offsetWidth rounds and breaks the wrap seam
      const set1 = t1.querySelector('.ticker__set');
      const set2 = t2.querySelector('.ticker__set');
      w1 = set1 ? set1.getBoundingClientRect().width : 0;
      w2 = set2 ? set2.getBoundingClientRect().width : 0;
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    const ro = new ResizeObserver(measure);
    ro.observe(t1);
    ro.observe(t2);

    let rendered = 0;
    let raf = 0;
    const wrap = (offset: number, width: number) =>
      width > 0 ? ((offset % width) + width) % width : 0;

    const loop = () => {
      const target =
        modeRef.current === 'deck' ? stepRef.current * DECK_STEP_PX : window.scrollY * FLOW_FACTOR;
      const delta = target - rendered;
      // snap when settled — truly idle tickers write no styles (easol truth)
      rendered = Math.abs(delta) < 0.05 ? target : rendered + delta * LERP;
      if (delta !== 0) {
        const x1 = wrap(rendered, w1);
        const x2 = wrap(rendered, w2);
        t1.style.transform = `translate3d(${-x1}px, 0, 0)`;
        t2.style.transform = `translate3d(${x2 - w2}px, 0, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      t1.style.transform = '';
      t2.style.transform = '';
      t1.classList.add('motion-ticker');
      t2.classList.add('motion-ticker');
    };
  }, [row1, row2, reducedMotion]);
}
