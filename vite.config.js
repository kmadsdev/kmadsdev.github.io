import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { indexHtmlFromContent } from './scripts/index-html.mjs';

// The music player is on only when the song file is in the repository. The owner puts the file
// there: no code changes. The path is the same as `music.file` in the music data.
// A dev server reads this at its start: start it again after the file is added or removed.
// PF_MUSIC_FILE names another file for a check (a name that does not exist builds the site with no player).
const MUSIC_FILE = process.env.PF_MUSIC_FILE || 'public/assets/audio/may-birocratic.mp3';

export default defineConfig({
    // indexHtmlFromContent: index.html gets its title, meta tags and <noscript> text from src/content/content.js.
    plugins: [react(), indexHtmlFromContent()],
    define: {
        __MUSIC_AVAILABLE__: JSON.stringify(existsSync(new URL(MUSIC_FILE, import.meta.url))),
        // The footer shows the year of the build.
        __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
    },
    server: { port: 1337, strictPort: true },
    preview: { port: 1338, strictPort: true },
    test: {
        include: ['tests/**/*.test.{js,jsx}'],
        setupFiles: ['tests/setup.js'],
        css: false,
    },
});
