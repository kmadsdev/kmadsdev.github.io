// Makes public/og.png (1200 x 630), the image that link previews show.
// It is a picture of the hero of the built site: the name, the alias, the role
// line and the badge on the dark ground. The small parts (status line, summary,
// links, top bar, rulers) are hidden, because a preview is shown small.
//
// Run after a change of the hero:  npm run build && node scripts/og.mjs
//   PF_DIST=<folder>   the built site to serve (default: dist)
// The badge is the owner's two pictures at their own size (ring and globe
// stacked): this script changes the size of the whole badge only.
import { preview } from 'vite';
import { launchBrowser } from './browser.mjs';

const CSS = `
    .site-header, .wh-rule, .skip-link, .hero-top, .hero-summary, .hero-links, .hero-scroll { display: none !important; }
    .page { padding-top: 0 !important; }
    .hero { min-height: 630px !important; height: 630px; padding: 0 72px !important; gap: 0 !important; grid-template-rows: 1fr !important; }
    .hero-main { grid-template-columns: minmax(0, 1fr) auto !important; gap: 56px !important; }
    .hero-text { gap: 28px !important; }
    .hero-id { gap: 18px !important; }
    .hero-name { font-size: 112px !important; }
    .hero-alias { font-size: 30px !important; }
    .hero-role { margin-top: 0 !important; font-size: 34px !important; flex-wrap: nowrap !important; white-space: nowrap; }
    .hero-badge { width: 400px !important; }
    .hero-word { animation: none !important; }
`;

const server = await preview({ build: { outDir: process.env.PF_DIST || 'dist' }, preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
const browser = await launchBrowser();
try {
    const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })).newPage();
    await page.goto(`${server.resolvedUrls.local[0]}?lang=en`, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: CSS });
    await page.evaluate(() => document.fonts.ready);
    // The dot field draws itself again after a size change.
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));
    await page.waitForTimeout(600);
    const fit = await page.evaluate(() => {
        const text = document.querySelector('.hero-text').getBoundingClientRect();
        const badge = document.querySelector('.hero-badge').getBoundingClientRect();
        return { overlap: text.right > badge.left, inside: badge.right <= 1200 && text.left >= 0 };
    });
    if (fit.overlap || !fit.inside) throw new Error(`the hero does not fit the picture: ${JSON.stringify(fit)}`);
    await page.screenshot({ path: 'public/og.png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log('public/og.png written');
} finally {
    await browser.close();
    await new Promise((done) => server.httpServer.close(done));
}
