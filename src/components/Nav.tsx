import type { MouseEvent } from 'react';
import { useDeck } from '@/deck/DeckContext';
import { useMode } from '@/context/ModeContext';
import { useLenisInstance } from '@/hooks/useLenis';
import { IDENTITY, NAV_LINKS } from '@/constants/identity';
import { FLAGSHIPS, FLAGSHIP_ORDER } from '@/constants/flagships';
import ModeToggle from '@/components/ModeToggle';

export default function Nav() {
  const { renderMode, goToScene, release } = useDeck();
  const { mode } = useMode();
  const lenis = useLenisInstance();

  const resolve = (target: string) => {
    if (target !== 'projects') return target;
    const first = FLAGSHIP_ORDER[mode][0];
    return first ? FLAGSHIPS[first].anchor : 'projects-gallery';
  };

  const onLink = (e: MouseEvent, rawTarget: string) => {
    const target = resolve(rawTarget);
    if (renderMode === 'deck') {
      e.preventDefault();
      if (target === 'contact') {
        // footer lives outside the deck — release the hijack and scroll to it
        release();
        requestAnimationFrame(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });
      } else {
        goToScene(target);
      }
    } else if (lenis) {
      e.preventDefault();
      lenis.scrollTo(`#${target}`);
    }
  };

  return (
    <nav className="nav nav--fixed">
      <span className="nav__brand">{IDENTITY.alias}.dev</span>
      <div className="nav__links">
        {NAV_LINKS.map((link) => (
          <a
            key={link.target}
            className="nav__link"
            href={`#${resolve(link.target)}`}
            onClick={(e) => onLink(e, link.target)}
          >
            {link.label}
          </a>
        ))}
      </div>
      <ModeToggle />
    </nav>
  );
}
