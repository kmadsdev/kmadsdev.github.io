import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1200;
const NUMERIC = /-?\d+(?:[.,]\d+)?/;

/** "97.9%" → "00.0%" — constant shape, no layout shift under tabular-nums */
function zeroShape(value: string): string {
  return value.replace(NUMERIC, (num) => num.replace(/\d/g, '0'));
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates the numeric portion of `finalValue` from 0, preserving prefix/
 * suffix and decimal shape. `started` latches — mode re-orders never replay.
 * `animate: false` (composite stats like "2–5×") renders the final string.
 */
export function useCountUp(finalValue: string, started: boolean, animate = true): string {
  const match = finalValue.match(NUMERIC);
  const animatable = animate && match !== null;
  const [display, setDisplay] = useState(() => (animatable ? zeroShape(finalValue) : finalValue));
  const latched = useRef(false);

  useEffect(() => {
    if (!animatable || !started || latched.current) return;
    latched.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(finalValue);
      return;
    }

    const numStr = match![0];
    const target = parseFloat(numStr.replace(',', '.'));
    const decimals = (numStr.split(/[.,]/)[1] || '').length;
    const separator = numStr.includes(',') ? ',' : '.';
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const current = target * easeOutCubic(t);
      let formatted = current.toFixed(decimals);
      if (separator === ',') formatted = formatted.replace('.', ',');
      // keep the digit count of the final string so width never changes
      const [intPart, decPart] = formatted.split(separator);
      const finalIntLen = numStr.split(/[.,]/)[0].replace('-', '').length;
      const padded =
        (formatted.startsWith('-') ? '-' : '') +
        intPart.replace('-', '').padStart(finalIntLen, '0') +
        (decPart !== undefined ? separator + decPart : '');
      setDisplay(finalValue.replace(NUMERIC, padded));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(finalValue);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, animatable, finalValue]);

  return display;
}
