import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { indexHtmlFromContent } from './scripts/index-html.mjs';

export default defineConfig({
    // indexHtmlFromContent: index.html gets its title, meta tags and <noscript> text from src/content/content.js.
    plugins: [react(), indexHtmlFromContent()],
    server: { port: 1337, strictPort: true },
    preview: { port: 1338, strictPort: true },
    test: {
        include: ['tests/**/*.test.{js,jsx}'],
        setupFiles: ['tests/setup.js'],
        css: false,
    },
});
