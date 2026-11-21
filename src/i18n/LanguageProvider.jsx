import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { content } from '../content/index.js';
import { readStored, writeStored } from '../storage.js';
import { STORAGE_KEY, resolveLanguage } from './language.js';

const LanguageContext = createContext(null);

// The language of the page text. The title, the description and the link preview tags stay in
// English (`meta` in contents.global.js, written into index.html at build): they do not change here.
const HTML_LANG = { en: 'en', pt: 'pt-BR' };

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() =>
        resolveLanguage({
            search: window.location.search,
            stored: readStored(STORAGE_KEY),
            browser: window.navigator.language,
        }),
    );
    const t = content[lang];

    useEffect(() => {
        document.documentElement.lang = HTML_LANG[lang];
    }, [lang]);

    const setLang = useCallback((next) => {
        setLangState(next);
        writeStored(STORAGE_KEY, next);
        // A manual choice wins over ?lang= in the address.
        const url = new URL(window.location.href);
        if (url.searchParams.has('lang')) {
            url.searchParams.delete('lang');
            window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
        }
    }, []);

    const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** { lang, setLang, t } where t is all the text of the current language. */
export const useLanguage = () => useContext(LanguageContext);
