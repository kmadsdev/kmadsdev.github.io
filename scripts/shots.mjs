// Screenshots of chosen places of the built site, for a visual review.
// Run: node scripts/shots.mjs <out-dir> [desktop|phone|WIDTHxHEIGHT] [dark|light] [en|pt] <selector>[@offset] ...
import { mkdir } from 'node:fs/promises';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const [out, device = 'desktop', theme = 'dark', lang = 'en', ...targets] = process.argv.slice(2);
// device: 'desktop', 'phone', or a size such as '768x1024'.
const custom = /^(\d+)x(\d+)$/.exec(device);
const viewport = custom ? { width: Number(custom[1]), height: Number(custom[2]) } : device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
await mkdir(out, { recursive: true });
const server = await preview({ preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
const browser = await chromium.launch({ channel: 'chrome' });
try {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1, hasTouch: viewport.width < 1024 });
    await context.addInitScript((value) => { try { localStorage.setItem('kmads.theme', value); } catch {} }, theme);
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
        if (viewport.width >= 1024) await page.mouse.move(viewport.width * 0.57, viewport.height * 0.48);
        await page.waitForTimeout(700);
        await page.screenshot({ path: `${out}/${device}-${theme}-${lang}-${String(++n).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 72 });
    }
} finally {
    await browser.close();
    await new Promise((done) => server.httpServer.close(done));
}
