// Makes public/og.png (1200 x 630), the image that link previews show.
// Run after a change of the hero: npm run build && node scripts/og.mjs
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const server = await preview({ preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
const browser = await chromium.launch({ channel: 'chrome' });
try {
    const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })).newPage();
    await page.goto(`${server.resolvedUrls.local[0]}?lang=en`, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '.hero-top, .hero-actions, .site-nav, .site-controls { visibility: hidden; } .hero { gap: 24px; padding-top: 0; } .hero-word { animation: none !important; }' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'public/og.png' });
    console.log('public/og.png written');
} finally {
    await browser.close();
    await new Promise((done) => server.httpServer.close(done));
}
