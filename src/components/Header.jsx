import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { LANGS } from '../i18n/language.js';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { useActiveSection } from '../hooks.js';

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
                    {code.toUpperCase()}
                </button>
            ))}
        </div>
    );
}

export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const { t } = useLanguage();
    const label = theme === 'dark' ? t.controls.switchToLight : t.controls.switchToDark;
    return (
        <button type="button" className="theme-toggle" aria-label={label} title={label} onClick={toggle}>
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" />
            </svg>
        </button>
    );
}

export default function Header() {
    const { t } = useLanguage();
    const ids = t.nav.items.map((item) => item.id);
    const active = useActiveSection(ids);
    return (
        <header className="site-header">
            <a className="wordmark" href="#top" aria-label={t.nav.home}>
                <span aria-hidden="true">KMA<br />DS</span>
            </a>
            <nav className="site-nav" aria-label={t.nav.menu}>
                <ul>
                    {t.nav.items.map((item) => (
                        <li key={item.id}>
                            <a href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="site-controls">
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </header>
    );
}
