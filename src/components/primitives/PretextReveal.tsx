import { useEffect, useMemo, useRef, useState } from 'react';
import { prepareWithSegments, layoutWithLines, clearCache } from '@chenglou/pretext';

interface PretextRevealProps {
  text: string;
  /** canvas font string — MUST match the rendered CSS font */
  font: string;
  /** px */
  lineHeight: number;
  /** reveal trigger (build reached / section visible) */
  on: boolean;
  stagger?: number;
  className?: string;
}

/**
 * Line-by-line choreographed text via @chenglou/pretext: lines are laid out
 * with pure arithmetic (no DOM reflow), absolutely positioned, and rise in
 * with a stagger. Re-layouts only on resize / font load.
 */
export default function PretextReveal({
  text,
  font,
  lineHeight,
  on,
  stagger = 90,
  className,
}: PretextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [fontEpoch, setFontEpoch] = useState(0);

  // prepare() caches glyph widths at call time — measuring before the web
  // font loads bakes in fallback metrics. fonts.ready alone races (it can
  // resolve before the face is even requested on cold cache), so explicitly
  // load THIS font and also listen for loadingdone.
  const prepared = useMemo(
    () => prepareWithSegments(text, font),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, font, fontEpoch],
  );

  useEffect(() => {
    let cancelled = false;
    const bump = () => {
      if (cancelled) return;
      // pretext caches glyph metrics per font string — fallback-font
      // measurements survive re-prepare unless the cache is flushed
      clearCache();
      setFontEpoch((n) => n + 1);
    };
    document.fonts?.load(font).then(bump).catch(() => {});
    document.fonts?.addEventListener?.('loadingdone', bump);
    return () => {
      cancelled = true;
      document.fonts?.removeEventListener?.('loadingdone', bump);
    };
  }, [font]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const run = () => {
      const width = el.clientWidth;
      if (!width) return;
      const result = layoutWithLines(prepared, width, lineHeight);
      setLines(result.lines.map((line) => line.text));
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    return () => ro.disconnect();
  }, [prepared, lineHeight]);

  return (
    <div
      ref={containerRef}
      className={className ? `pretext ${className}` : 'pretext'}
      style={{ height: lines.length * lineHeight }}
      aria-label={text}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={on ? 'pretext__line is-on' : 'pretext__line'}
          style={{ top: i * lineHeight, transitionDelay: `${i * stagger}ms` }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}
