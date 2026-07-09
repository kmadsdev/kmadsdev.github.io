import type { SceneProps } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LanguageContext';
import { TIMELINE_STEPS, TIMELINE_HEAD } from '@/constants/timeline';
import Eyebrow from '@/components/primitives/Eyebrow';
import Pill from '@/components/primitives/Pill';

/* easol progress rail — 8 chapters, ONE per gesture (builds = 8); the rail
   fills as each chapter lands. Amber tag = PicPay SWE row only. */
export default function Timeline({ buildIndex }: SceneProps) {
  const { lang } = useLang();
  const head = TIMELINE_HEAD[lang];
  const reveal = useScrollReveal<HTMLDivElement>({ targets: '.timeline__step', stagger: 90 });

  return (
    <div className="scene timeline-scene" ref={reveal} data-reveal>
      <header className="scene__head" data-deck-layer="slow">
        <Eyebrow>{head.eyebrow}</Eyebrow>
        <h2 className="t-h1">{head.title}</h2>
      </header>
      <div className="timeline" data-deck-layer="fast">
        {TIMELINE_STEPS[lang].map((step, i) => {
          const revealed = buildIndex >= i;
          return (
            <div
              key={`${step.title}-${step.window}`}
              className={[
                'timeline__step',
                step.complete && revealed ? 'is-complete' : '',
                'build',
                revealed ? 'is-on' : '',
              ].join(' ')}
            >
              <span className="timeline__rail" />
              <span className="timeline__node" />
              <p className="eyebrow">{step.window}</p>
              <h3 className="timeline__label">{step.title}</h3>
              <span className="timeline__tag timeline__tag-row">
                {step.tags.map((tag) => (
                  <Pill key={tag} variant={`status-${step.tagVariant}`}>
                    {tag}
                  </Pill>
                ))}
              </span>
              <div className="timeline__facts">
                {step.descriptionTags.map((fact) => (
                  <span key={fact} className="timeline__fact">
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
