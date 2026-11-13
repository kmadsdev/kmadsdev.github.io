import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { LANGS } from '../i18n/language.js';
import { useTheme } from '../theme/ThemeProvider.jsx';

export function LanguageToggle() {
    const { lang, setLang, t } = useLanguage();
    return (
        <div className="toggle" role="group" aria-label={t.nav.language}>
            {LANGS.map((code) => (
                <button
                    key={code}
                    type="button"
                    className="toggle-option"
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
                <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" />
                <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
            </svg>
        </button>
    );
}

export default function Header() {
    const { t } = useLanguage();
    return (
        <header className="site-header">
            <a className="wordmark" href="#top" aria-label={t.nav.home}>
                <span aria-hidden="true">KMA<br />DS</span>
            </a>
            <nav className="site-nav" aria-label={t.nav.menu}>
                <ul>
                    {t.nav.items.map((item) => (
                        <li key={item.id}>
                            <a href={`#${item.id}`}>{item.label}</a>
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
