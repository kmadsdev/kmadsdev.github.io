import { describe, expect, it } from 'vitest';
import { DEFAULT_LANG, LANGS, resolveLanguage } from '../src/i18n/language.js';

describe('resolveLanguage', () => {
    it('supports exactly English and Portuguese', () => {
        expect(LANGS).toEqual(['en', 'pt']);
        expect(DEFAULT_LANG).toBe('en');
    });

    it('uses English when nothing is known', () => {
        expect(resolveLanguage({})).toBe('en');
    });

    it('uses Portuguese when the browser language starts with pt', () => {
        expect(resolveLanguage({ browser: 'pt-BR' })).toBe('pt');
        expect(resolveLanguage({ browser: 'PT' })).toBe('pt');
    });

    it('uses English for every other browser language', () => {
        expect(resolveLanguage({ browser: 'es-ES' })).toBe('en');
        expect(resolveLanguage({ browser: 'en-US' })).toBe('en');
    });

    it('prefers the saved choice over the browser language', () => {
        expect(resolveLanguage({ stored: 'en', browser: 'pt-BR' })).toBe('en');
        expect(resolveLanguage({ stored: 'pt', browser: 'en-US' })).toBe('pt');
    });

    it('prefers ?lang= over the saved choice', () => {
        expect(resolveLanguage({ search: '?lang=pt', stored: 'en' })).toBe('pt');
        expect(resolveLanguage({ search: '?x=1&lang=en', stored: 'pt', browser: 'pt-BR' })).toBe('en');
    });

    it('accepts pt-BR style values in ?lang=', () => {
        expect(resolveLanguage({ search: '?lang=pt-BR' })).toBe('pt');
    });

    it('ignores values it does not support', () => {
        expect(resolveLanguage({ search: '?lang=fr', stored: 'de', browser: 'pt-BR' })).toBe('pt');
        expect(resolveLanguage({ search: '?lang=', stored: null })).toBe('en');
    });
});
