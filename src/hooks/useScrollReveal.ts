import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useDeck } from '@/deck/DeckContext';

interface RevealOptions {
  /** child selector to stagger with .motion-rise */
  targets?: string;
  /** ms between staggered children */
  stagger?: number;
}

/**
 * Flow-mode entrance choreography: IntersectionObserver adds .is-revealed to
 * the container (CSS `[data-reveal]` rules are scoped to .flow) and staggers
 * .motion-rise on `targets`. No-ops in deck mode — builds own choreography there.
 */
export function useScrollReveal<T extends HTMLElement>(options?: RevealOptions): RefObject<T> {
  const ref = useRef<T>(null);
  const { renderMode } = useDeck();

  useEffect(() => {
    if (renderMode !== 'flow') return;
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.classList.add('is-revealed');
      if (options?.targets) {
        const children = el.querySelectorAll<HTMLElement>(options.targets);
        children.forEach((child, i) => {
          child.style.animationDelay = `${i * (options.stagger ?? 75)}ms`;
          child.classList.add('motion-rise');
        });
      }
    };

    if (!('IntersectionObserver' in window)) {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderMode]);

  return ref;
}
