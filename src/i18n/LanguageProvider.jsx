import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { content } from '../content/index.js';
import { readStored, writeStored } from '../storage.js';
import { STORAGE_KEY, resolveLanguage } from './language.js';

const LanguageContext = createContext(null);

function setMeta(selector, value) {
    document.querySelector(selector)?.setAttribute('content', value);
}

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() =>
        resolveLanguage({
            search: window.location.search,
            stored: readStored(STORAGE_KEY),
            browser: window.navigator.language,
        }),
    );
    const t = content[lang];

    // The document head follows the language.
    useEffect(() => {
        document.documentElement.lang = t.meta.htmlLang;
        document.title = t.meta.title;
        setMeta('meta[name="description"]', t.meta.description);
        setMeta('meta[property="og:title"]', t.meta.title);
        setMeta('meta[property="og:description"]', t.meta.description);
        setMeta('meta[property="og:locale"]', t.meta.ogLocale);
        setMeta('meta[name="twitter:title"]', t.meta.title);
        setMeta('meta[name="twitter:description"]', t.meta.description);
    }, [t]);

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
