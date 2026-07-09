import type { SceneProps } from '@/types';
import { useMode } from '@/context/ModeContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { HERO } from '@/constants/identity';
import Eyebrow from '@/components/primitives/Eyebrow';
import BgGrid from '@/components/primitives/BgGrid';
import Globe from '@/components/primitives/Globe';

/* Builds: 0 = name lines · 1 = tagline assembles word-by-word */
export default function Hero({ buildIndex, active }: SceneProps) {
  const { mode } = useMode();
  const content = HERO[mode];
  const reveal = useScrollReveal<HTMLDivElement>({ targets: '.hero__line', stagger: 90 });
  const words = content.tagline.split(' ');

  return (
    <BgGrid>
      <div className="scene hero" ref={reveal} data-reveal>
        <div className="hero__inner">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="t-display hero__name" data-deck-layer="slow">
            {HERO.nameLines.map((line, i) => (
              <span
                key={line}
                className={`hero__line build ${active ? 'is-on' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="t-body-lg hero__tagline" data-deck-layer="fast" aria-label={content.tagline}>
            {words.map((word, i) => (
              // the space lives OUTSIDE the inline-block span or it collapses
              <span key={`${word}-${i}`} aria-hidden="true">
                <span
                  className={`build hero__word ${buildIndex >= 1 ? 'is-on' : ''}`}
                  style={{ transitionDelay: `${i * 45}ms` }}
                >
                  {word}
                </span>{' '}
              </span>
            ))}
          </p>
          <p className="hero__cue eyebrow" aria-hidden="true">
            {HERO.scrollCue}
            <span className="hero__cue-line" />
          </p>
        </div>
        {/* OG-site spinning globe, same placement (right side) */}
        <div className="hero__globe" data-deck-layer="slow">
          <Globe size={420} />
        </div>
      </div>
    </BgGrid>
  );
}
