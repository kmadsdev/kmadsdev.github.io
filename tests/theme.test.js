import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, THEMES, resolveTheme } from '../src/theme/theme.js';

describe('resolveTheme', () => {
    it('has a dark and a light theme, dark first', () => {
        expect(THEMES).toEqual(['dark', 'light']);
        expect(DEFAULT_THEME).toBe('dark');
    });

    it('starts dark when nothing is saved', () => {
        expect(resolveTheme({})).toBe('dark');
        expect(resolveTheme({ stored: null })).toBe('dark');
    });

    it('uses the saved theme', () => {
        expect(resolveTheme({ stored: 'light' })).toBe('light');
        expect(resolveTheme({ stored: 'dark' })).toBe('dark');
    });

    it('ignores a saved value it does not know', () => {
        expect(resolveTheme({ stored: 'blue' })).toBe('dark');
    });
});
