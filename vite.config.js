import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: { port: 1337, strictPort: true },
    preview: { port: 1338, strictPort: true },
    test: {
        include: ['tests/**/*.test.{js,jsx}'],
        setupFiles: ['tests/setup.js'],
        css: false,
    },
});
