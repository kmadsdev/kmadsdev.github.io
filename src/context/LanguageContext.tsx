import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Lang } from '@/types';

const STORAGE_KEY = 'kmads:lang';
const LANGS: Lang[] = ['en', 'pt'];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
});

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGS.includes(stored as Lang)) return stored as Lang;
  } catch {
    /* storage unavailable — default */
  }
  return 'en'; // EN-US default
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStoredLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* non-fatal */
    }
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
