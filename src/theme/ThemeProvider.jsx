import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readStored, writeStored } from '../storage.js';
import { THEME_STORAGE_KEY, resolveTheme } from './theme.js';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => resolveTheme({ stored: readStored(THEME_STORAGE_KEY) }));

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
        if (color) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
    }, [theme]);

    const toggle = useCallback(() => {
        setTheme((current) => {
            const next = current === 'dark' ? 'light' : 'dark';
            writeStored(THEME_STORAGE_KEY, next);
            return next;
        });
    }, []);

    const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
