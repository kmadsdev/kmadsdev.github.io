import type { SceneProps } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LanguageContext';
import { WHOAMI_GROUPS, ABOUT_LABELS, HONORS, INTERESTS, LANGUAGES } from '@/constants/about';
import Eyebrow from '@/components/primitives/Eyebrow';
import Pill from '@/components/primitives/Pill';
import PretextReveal from '@/components/primitives/PretextReveal';

/* .t-body-lg rendered in Rubik 400 — pretext must measure the same font */
const WHOAMI_FONT = '400 20px Rubik';
const WHOAMI_LINE_HEIGHT = 30; // 1.25rem * 1.5

/* niklas services truth: sticky left panel + right copy. Each build reveals
   one WHOAMI group; pretext lays the lines out and they rise one by one. */
export default function About({ buildIndex }: SceneProps) {
  const { lang } = useLang();
  const labels = ABOUT_LABELS[lang];
  const reveal = useScrollReveal<HTMLDivElement>({ targets: '.about__group', stagger: 120 });

  return (
    <div className="scene about" ref={reveal} data-reveal>
      <div className="about__grid">
        <aside className="about__panel" data-deck-layer="slow">
          <Eyebrow>{labels.honors}</Eyebrow>
          <div className="about__pills">
            {HONORS[lang].map((h) => (
              <Pill key={h} variant="chip">{h}</Pill>
            ))}
          </div>
          <Eyebrow>{labels.interests}</Eyebrow>
          <div className="about__pills">
            {INTERESTS[lang].map((i) => (
              <Pill key={i} variant="chip">{i}</Pill>
            ))}
          </div>
          <Eyebrow>{labels.languages}</Eyebrow>
          <div className="about__pills">
            {LANGUAGES[lang].map((l) => (
              <Pill key={l}>{l}</Pill>
            ))}
          </div>
        </aside>
        <div className="about__copy" data-deck-layer="fast">
          <Eyebrow>{labels.whoami}</Eyebrow>
          {WHOAMI_GROUPS[lang].map((group, g) => (
            <div key={g} className="about__group t-body-lg">
              <PretextReveal
                text={group.join(' ')}
                font={WHOAMI_FONT}
                lineHeight={WHOAMI_LINE_HEIGHT}
                on={buildIndex >= g}
                stagger={110}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
