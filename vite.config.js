import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';


export default defineConfig({
    // base: '/',
    plugins: [react()],
    build: {
        rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
            projects: resolve(__dirname, 'projects.html'),
        }
        }
    }
});
