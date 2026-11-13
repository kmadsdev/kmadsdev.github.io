// Theme rules, with no browser access. ThemeProvider.jsx feeds it.

export const THEMES = ['dark', 'light'];
export const DEFAULT_THEME = 'dark';
export const THEME_STORAGE_KEY = 'kmads.theme';

/** The saved theme when it is valid. Dark for all other cases. */
export function resolveTheme({ stored = null } = {}) {
    return THEMES.includes(stored) ? stored : DEFAULT_THEME;
}
