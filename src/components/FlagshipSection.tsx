import type { ReactNode } from 'react';
import type { FlagshipContent } from '@/constants/flagships';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Eyebrow from '@/components/primitives/Eyebrow';
import Pill from '@/components/primitives/Pill';
import StatBlock from '@/components/primitives/StatBlock';
import Button from '@/components/primitives/Button';

interface FlagshipSectionProps {
  content: FlagshipContent;
  visual: ReactNode;
  buildIndex: number;
  /** extra class for per-project flood/parallax variance (easol "not equal") */
  variant?: string;
}

/* Shell for the 6 flagship scenes. Builds: 0 = enter · 1 = stats count up. */
export default function FlagshipSection({ content, visual, buildIndex, variant }: FlagshipSectionProps) {
  const reveal = useScrollReveal<HTMLDivElement>({ targets: '.projects-flagship__copy > *', stagger: 70 });
  const layoutClass =
    content.layout === 'right'
      ? 'projects-flagship--layout-right'
      : content.layout === 'flood'
        ? 'projects-flagship--layout-flood'
        : '';

  return (
    <div className="scene scene--flagship" ref={reveal} data-reveal>
      <article className={`projects-flagship ${layoutClass} ${variant ?? ''}`}>
        <div className="projects-flagship__copy" data-deck-layer="slow">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="t-h1">{content.title}</h2>
          {content.paragraphs.map((paragraph, i) => (
            <p key={i} className="t-body-lg">
              {paragraph}
            </p>
          ))}
          {content.bullets && (
            <ul className="projects-flagship__bullets">
              {content.bullets.map((bullet) => (
                <li key={bullet} className="t-body">
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          <div className="projects-flagship__stats">
            {content.stats.map((stat) => (
              <StatBlock key={stat.label} stat={stat} started={buildIndex >= 1} />
            ))}
          </div>
          <div className="projects-flagship__tags">
            {content.tags.map((tag) => (
              <Pill key={tag} variant="stack">{tag}</Pill>
            ))}
          </div>
          {content.links.length > 0 && (
            <div className="projects-flagship__links">
              {content.links.map((link) => (
                <Button key={link.label} variant="link" href={link.href} external={link.external} icon="arrow-up-right">
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="projects-flagship__visual" data-deck-layer="fast">
          {visual}
        </div>
      </article>
    </div>
  );
}
