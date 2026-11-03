import type { SceneProps } from '@/types';
import { useLang } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { HERO, HERO_NAME_LINES } from '@/constants/identity';
import Eyebrow from '@/components/primitives/Eyebrow';
import BgGrid from '@/components/primitives/BgGrid';
import Globe from '@/components/primitives/Globe';
import Ticker from '@/components/Ticker';

/* Builds: 0 = name lines · 1 = tagline assembles word-by-word */
export default function Hero({ buildIndex, active }: SceneProps) {
  const { lang } = useLang();
  const content = HERO[lang];
  const reveal = useScrollReveal<HTMLDivElement>({ targets: '.hero__line', stagger: 90 });
  const words = content.tagline.split(' ');

  return (
    <BgGrid>
      <div className="scene hero" ref={reveal} data-reveal>
        <div className="hero__main">
          <div className="hero__inner">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="t-display hero__name" data-deck-layer="slow">
            {HERO_NAME_LINES.map((line, i) => (
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
              {content.scrollCue}
              <span className="hero__cue-line" />
            </p>
            {/* OG-site spinning globe — tighter to the name, not glued */}
            <div className="hero__globe">
              <Globe size={340} />
            </div>
          </div>
        </div>
        {/* auto-spinning marquee band, part of the hero (bottom) */}
        <div className="hero__ticker">
          <Ticker />
        </div>
      </div>
    </BgGrid>
  );
}
