import type { MouseEvent } from 'react';
import { useDeck } from '@/deck/DeckContext';
import { useLang } from '@/context/LanguageContext';
import { useLenisInstance } from '@/hooks/useLenis';
import { IDENTITY, NAV_LINKS } from '@/constants/identity';
import LanguageToggle from '@/components/LanguageToggle';

export default function Nav() {
  const { renderMode, goToScene, release } = useDeck();
  const { lang } = useLang();
  const lenis = useLenisInstance();

  const onLink = (e: MouseEvent, target: string) => {
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
        {NAV_LINKS[lang].map((link) => (
          <a
            key={link.target}
            className="nav__link"
            href={`#${link.target}`}
            onClick={(e) => onLink(e, link.target)}
          >
            {link.label}
          </a>
        ))}
      </div>
      <LanguageToggle />
    </nav>
  );
}
