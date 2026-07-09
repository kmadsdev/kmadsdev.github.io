import type { SceneProps } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LanguageContext';
import { SKILL_GROUPS, SKILLS_HEAD } from '@/constants/skills';
import Eyebrow from '@/components/primitives/Eyebrow';

/* Builds: 0 = grid enters · 1 = bars fill (ordinal scale — no numerals shown) */
export default function Skills({ buildIndex }: SceneProps) {
  const { lang } = useLang();
  const head = SKILLS_HEAD[lang];
  const reveal = useScrollReveal<HTMLDivElement>({ targets: '.skills-group', stagger: 80 });
  const filled = buildIndex >= 1;

  return (
    <div className="scene skills-scene" ref={reveal} data-reveal>
      <header className="scene__head" data-deck-layer="slow">
        <Eyebrow>{head.eyebrow}</Eyebrow>
        <h2 className="t-h1">{head.title}</h2>
      </header>
      <div className="skills-groups" data-deck-layer="fast">
        {SKILL_GROUPS[lang].map((group) => (
          <section key={group.group} className="skills-group">
            <Eyebrow>{group.group}</Eyebrow>
            <div className="skills grid-hoverable">
              {group.cells.map((cell) => (
                <div key={cell.name} className="skills__cell">
                  <p className="skills__name">
                    {cell.name}
                    <span className="skills__years">{cell.years}</span>
                  </p>
                  <div className="skills__bar">
                    <i style={{ width: filled ? `${cell.fill * 100}%` : '0%' } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
