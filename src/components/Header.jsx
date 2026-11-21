import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { LANGS } from '../i18n/language.js';
import { useActiveSection } from '../hooks.js';
import { PROJECTS_PATH, PROJECTS_SECTION, openProjects } from '../routes.js';
import { links } from '../content/index.js';
import StatusLine from './player/StatusLine.jsx';
import { usePlayer } from './player/PlayerProvider.jsx';

/**
 * True after the status line of the hero went up out of view, under the top bar.
 * Then the top bar shows the same line, so the music controls are always on the screen.
 */
function useHeroLineAway() {
    const [away, setAway] = useState(false);
    useEffect(() => {
        const line = document.querySelector('#top .player-line');
        if (!line || typeof IntersectionObserver === 'undefined') return undefined;
        const bar = document.querySelector('.site-header')?.offsetHeight ?? 0;
        const observer = new IntersectionObserver(
            ([entry]) => setAway(!entry.isIntersecting && entry.boundingClientRect.top < bar + 1),
            { rootMargin: `-${bar}px 0px 0px 0px` },
        );
        observer.observe(line);
        return () => observer.disconnect();
    }, []);
    return away;
}

export function LanguageToggle() {
    const { lang, setLang, t } = useLanguage();
    return (
        <div className="wh-seg" role="group" aria-label={t.nav.language}>
            {LANGS.map((code) => (
                <button
                    key={code}
                    type="button"
                    className="wh-seg__option"
                    aria-pressed={lang === code}
                    lang={code}
                    title={t.nav.languages[code]}
                    onClick={() => setLang(code)}
                >
                    {t.nav.codes[code]}
                </button>
            ))}
        </div>
    );
}

/**
 * Top bar: section links, the music line (after the hero is out of view), "Hire me", language.
 * Below 1024px the links are in a panel that the menu button opens.
 * Escape closes the panel and gives the focus back to the button.
 */
export default function Header() {
    const { t } = useLanguage();
    const ids = t.nav.items.map((item) => item.id);
    const active = useActiveSection(ids);
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const player = usePlayer();
    const lineAway = useHeroLineAway();

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (event) => {
            if (event.key !== 'Escape') return;
            setOpen(false);
            buttonRef.current?.focus();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <header className="site-header" data-open={open ? 'true' : undefined}>
            <nav id="site-nav" className="site-nav" aria-label={t.nav.menu} data-lenis-prevent>
                <ul>
                    {t.nav.items.map((item) => (
                        <li key={item.id}>
                            <a
                                href={item.id === PROJECTS_SECTION ? PROJECTS_PATH : `#${item.id}`}
                                aria-current={active === item.id ? 'true' : undefined}
                                onClick={(event) => {
                                    setOpen(false);
                                    if (item.id === PROJECTS_SECTION) openProjects(event);
                                }}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="site-player">{player.enabled && lineAway ? <StatusLine bar /> : null}</div>
            <div className="site-controls">
                <a className="button button-primary site-hire" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                    {t.nav.hire}
                    <span className="visually-hidden"> ({t.controls.external})</span>
                </a>
                <LanguageToggle />
                <button
                    ref={buttonRef}
                    type="button"
                    className="menu-button"
                    aria-expanded={open}
                    aria-controls="site-nav"
                    aria-label={open ? t.nav.close : t.nav.open}
                    onClick={() => setOpen((value) => !value)}
                >
                    <svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
                        <path className="menu-button__a" d="M2.5 5.5h11" />
                        <path className="menu-button__b" d="M2.5 10.5h11" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
