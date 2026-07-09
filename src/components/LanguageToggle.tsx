import { useLang } from '@/context/LanguageContext';
import type { Lang } from '@/types';

/* PT-BR sits left; EN-US is the default active language. */
const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: 'pt', label: 'PT-BR' },
  { lang: 'en', label: 'EN-US' },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="mode-toggle" role="group" aria-label="Language">
      {OPTIONS.map((opt) => (
        <button
          key={opt.lang}
          type="button"
          className={lang === opt.lang ? 'mode-toggle__pill is-active' : 'mode-toggle__pill'}
          aria-pressed={lang === opt.lang}
          onClick={() => setLang(opt.lang)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
