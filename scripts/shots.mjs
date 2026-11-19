// Screenshots of chosen places of the built site, for a visual review.
//
// Run:  node scripts/shots.mjs <out-dir> [desktop|phone|WIDTHxHEIGHT] [en|pt] <selector>[@offset] ...
//   PF_DIST=<folder>   the built site to serve (default: dist)
//   PF_MOTION=reduce   take the pictures with reduced motion
// The site has one theme. An old call with `dark` or `light` after the device still works: the word is ignored.
// File names: <device>-<lang>-<nn>.jpg
import { mkdir } from 'node:fs/promises';
import { preview } from 'vite';
import { launchBrowser } from './browser.mjs';

const args = process.argv.slice(2).filter((arg) => arg !== 'dark' && arg !== 'light');
const [out, device = 'desktop', lang = 'en', ...targets] = args;
// device: 'desktop', 'phone', or a size such as '768x1024'.
const custom = /^(\d+)x(\d+)$/.exec(device);
const viewport = custom ? { width: Number(custom[1]), height: Number(custom[2]) } : device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const touch = viewport.width < 1024;
await mkdir(out, { recursive: true });
const server = await preview({ build: { outDir: process.env.PF_DIST || 'dist' }, preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
const browser = await launchBrowser();
try {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1, hasTouch: touch, reducedMotion: process.env.PF_MOTION === 'reduce' ? 'reduce' : 'no-preference' });
    const page = await context.newPage();
    await page.goto(`${server.resolvedUrls.local[0]}?lang=${lang}`, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    let n = 0;
    for (const target of targets) {
        const [selector, offset = '0'] = target.split('@');
        await page.evaluate(([sel, dy]) => {
            const el = document.querySelector(sel);
            window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70 + Number(dy));
        }, [selector, offset]);
        if (!touch) await page.mouse.move(viewport.width * 0.57, viewport.height * 0.48);
        await page.waitForTimeout(900);
        await page.screenshot({ path: `${out}/${device}-${lang}-${String(++n).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 78 });
    }
} finally {
    await browser.close();
    await new Promise((done) => server.httpServer.close(done));
}
