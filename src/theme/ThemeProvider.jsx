import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { readStored, writeStored } from '../storage.js';
import { THEME_STORAGE_KEY, resolveTheme } from './theme.js';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => resolveTheme({ stored: readStored(THEME_STORAGE_KEY) }));

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--wh-color-canvas').trim();
        if (color) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
    }, [theme]);

    const toggle = useCallback(() => {
        const apply = () =>
            setTheme((current) => {
                const next = current === 'dark' ? 'light' : 'dark';
                writeStored(THEME_STORAGE_KEY, next);
                document.documentElement.dataset.theme = next;
                return next;
            });
        const calm = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Cross-fade where the browser can do it. A plain change everywhere else.
        if (typeof document.startViewTransition === 'function' && !calm) {
            document.startViewTransition(() => flushSync(apply));
        } else {
            apply();
        }
    }, []);

    const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
