// Text and data of the music player and of the scroll ruler: one adapter for the shell.
// `music` comes from contents.global.js. The labels come from the text of the current
// language (`t.player`, `t.rulers` in contents.en.js and contents.pt.js).
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { music as song } from '../../content/contents.global.js';

/**
 * The one song of the site, from contents.global.js. The owner's file is at `public` + `file`.
 * vite.config.js looks for it at build time (__MUSIC_AVAILABLE__). With no file, `src` is empty:
 * the status line does not render, no audio element is made, and the badge has no sound.
 * VITE_MUSIC_SRC gives another address for a test build. It is never committed.
 */
// eslint-disable-next-line no-undef -- a build-time constant of vite.config.js
const available = typeof __MUSIC_AVAILABLE__ !== 'undefined' && __MUSIC_AVAILABLE__ === true;
export const music = {
    ...song,
    file: song.src,
    src: import.meta.env?.VITE_MUSIC_SRC || (available ? song.src : ''),
};

/** { play, pause, restart, openOnSpotify, nowPlaying, volume, mute, unmute } in the current language. */
export function usePlayerText() {
    const language = useLanguage();
    return language?.t?.player;
}

/** { scroll } in the current language: the name of the ruler that is the scroll bar. */
export function useRulerText() {
    const language = useLanguage();
    return language?.t?.rulers;
}
