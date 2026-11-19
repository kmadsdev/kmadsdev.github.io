// Height of each section in screens, at three screen sizes. A page that is too long loses the reader.
//
// Run:  node scripts/section-heights.mjs [en|pt]
//   PF_DIST=<folder>   the built site to serve (default: dist)
// Budget (screens at 1440x900): intro 6.5, experience 3.5, education 1.2, applications 5, more 1.1.
import { preview } from 'vite';
import { launchBrowser } from './browser.mjs';

const lang = process.argv[2] || 'en';
const SIZES = [[1440, 900], [390, 844], [3440, 1440]];
const IDS = ['top', 'intro', 'experience', 'education', 'applications', 'more', 'contact'];
const server = await preview({ build: { outDir: process.env.PF_DIST || 'dist' }, preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
const browser = await launchBrowser();
try {
    for (const [width, height] of SIZES) {
        const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width < 1024 });
        const page = await context.newPage();
        await page.goto(`${server.resolvedUrls.local[0]}?lang=${lang}`, { waitUntil: 'networkidle' });
        const line = await page.evaluate(([ids, vh]) => {
            const total = document.documentElement.scrollHeight;
            const tops = ids.map((id) => document.getElementById(id).getBoundingClientRect().top + window.scrollY);
            const sections = ids.map((id, i) => `${id} ${(((tops[i + 1] ?? total) - tops[i]) / vh).toFixed(1)}`);
            const chapters = [...document.querySelectorAll('[id^="intro-"]')]
                .filter((el) => !el.id.endsWith('-title'))
                .map((el) => `${el.id.replace('intro-', '')} ${(el.getBoundingClientRect().height / vh).toFixed(1)}`);
            return `total ${(total / vh).toFixed(1)} | ${sections.join(' · ')}\n      chapters: ${chapters.join(' · ')}`;
        }, [IDS, height]);
        console.log(`${width}x${height}: ${line}`);
        await context.close();
    }
} finally {
    await browser.close();
    await new Promise((done) => server.httpServer.close(done));
}
