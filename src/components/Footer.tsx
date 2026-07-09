import type { MouseEvent } from 'react';
import { useDeck } from '@/deck/DeckContext';
import { IDENTITY } from '@/constants/identity';
import { CONTACT_LINKS } from '@/constants/contact';
import Eyebrow from '@/components/primitives/Eyebrow';
import Button from '@/components/primitives/Button';
import Globe from '@/components/primitives/Globe';

/* easol-structure footer (brand · globe+tagline · link columns · legal row)
   + the contact CTA. Lives OUTSIDE the deck — native scroll, never hijacked. */

const SITE_LINKS = [
  { label: 'ABOUT', target: 'about' },
  { label: 'TIMELINE', target: 'timeline' },
  { label: 'PROJECTS', target: 'flagship-agentic' },
  { label: 'GALLERY', target: 'projects-gallery' },
  { label: 'SKILLS', target: 'skills' },
];

const PROJECT_LINKS = [
  { label: 'AGENTIC', href: 'https://kmads.dev/agentic' },
  { label: 'OFFMODE', href: 'https://kmads.dev/offmode' },
  { label: 'DIABETES INDICATOR', href: 'https://kmads.dev/diabetes-indicator' },
  { label: 'DOOM OFFLINE', href: 'https://kmads.dev/doom' },
  { label: 'BROWSER NOTES', href: 'https://kmads.dev/notes' },
  { label: 'CUSTOM SQUARE', href: 'https://kmads.dev/custom-square' },
];

const SOCIAL_LINKS = [
  { label: 'GITHUB', href: IDENTITY.github },
  { label: 'LINKEDIN', href: IDENTITY.linkedin },
  { label: 'EMAIL', href: `mailto:${IDENTITY.email}` },
];

export default function Footer() {
  const { renderMode, goToScene } = useDeck();

  const onSiteLink = (e: MouseEvent, target: string) => {
    if (renderMode === 'deck') {
      e.preventDefault();
      goToScene(target); // re-captures the deck and jumps
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer__cta">
        <Eyebrow>CONTACT</Eyebrow>
        <h2 className="t-h1">Building something? Talk to me.</h2>
        <div className="footer__cta-row">
          {CONTACT_LINKS.filter((l) => l.variant !== 'link').map((link) => (
            <Button
              key={link.label}
              variant={link.variant}
              href={link.href}
              external={'external' in link ? Boolean(link.external) : false}
              icon="arrow-up-right"
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>

      <hr className="divider" />

      <div className="footer__band">
        <div className="footer__brand">
          <span className="footer__wordmark">KMADS.DEV</span>
          <div className="footer__globe">
            <Globe size={120} />
            <p className="footer__tagline">
              SHIPS SOFTWARE
              <br />
              NOT SLIDES
            </p>
          </div>
        </div>
        <div className="footer__cols">
          <ul className="footer__col">
            {SITE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={`#${link.target}`} onClick={(e) => onSiteLink(e, link.target)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="footer__col">
            {PROJECT_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer noopener">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="footer__col">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer noopener">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__legal">
        <span>KMADS.DEV © 2026</span>
        <span>SOFTWARE ENGINEER · BRAZIL · REMOTE</span>
        <span>REACT + VITE · GITHUB PAGES</span>
      </div>
    </footer>
  );
}
