// Language rules, with no browser access. LanguageProvider.jsx feeds it.

export const LANGS = ['en', 'pt'];
export const DEFAULT_LANG = 'en';
export const STORAGE_KEY = 'kmads.lang';

/** 'pt-BR' -> 'pt'. Returns null for a language the site does not have. */
function normalize(value) {
    if (typeof value !== 'string') return null;
    const short = value.trim().toLowerCase().slice(0, 2);
    return LANGS.includes(short) ? short : null;
}

/**
 * Order: ?lang= in the URL, then the saved choice, then the browser language.
 * A browser language that starts with "pt" gives Portuguese. All others give English.
 */
export function resolveLanguage({ search = '', stored = null, browser = '' } = {}) {
    const fromUrl = normalize(new URLSearchParams(search).get('lang'));
    if (fromUrl) return fromUrl;

    const fromStorage = normalize(stored);
    if (fromStorage) return fromStorage;

    return normalize(browser) === 'pt' ? 'pt' : DEFAULT_LANG;
}
