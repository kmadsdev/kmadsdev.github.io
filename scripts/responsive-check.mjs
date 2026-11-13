// Layout check at many screen widths. Run: npm run check:responsive
//
// For each width, in both languages, it fails on:
//   - sideways scroll of the page
//   - an element that leaves the screen (outside a frame that scrolls on purpose)
//   - text that is cut off
//   - a control smaller than 40px on a touch screen
//   - text smaller than 11px
// With --shots <dir> it saves one full-page capture per width (English, dark).
import { mkdir } from 'node:fs/promises';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const WIDTHS = [320, 360, 390, 430, 540, 600, 768, 820, 1024, 1180, 1280, 1440, 1728, 1920, 2560];
const shotsIndex = process.argv.indexOf('--shots');
const shotsDir = shotsIndex > -1 ? process.argv[shotsIndex + 1] : null;
if (shotsDir) await mkdir(shotsDir, { recursive: true });

const server = await preview({ preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
const browser = await chromium.launch({ channel: 'chrome' });
const problems = [];

try {
    for (const width of WIDTHS) {
        const touch = width < 1024;
        const height = touch ? 844 : Math.round(width * 0.6);
        for (const lang of ['en', 'pt']) {
            const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, hasTouch: touch, isMobile: width < 600, reducedMotion: 'reduce' });
            const page = await context.newPage();
            await page.goto(`${server.resolvedUrls.local[0]}?lang=${lang}`, { waitUntil: 'networkidle' });
            const found = await page.evaluate((isTouch) => {
                const out = [];
                const vw = document.documentElement.clientWidth;
                const sideways = document.documentElement.scrollWidth - vw;
                if (sideways > 0) out.push(`page scrolls sideways by ${sideways}px`);
                const name = (el) => `${el.tagName.toLowerCase()}.${String(el.getAttribute('class') || '').split(' ')[0]}`;
                const inScroller = (el) => el.closest('.wh-flow__stage, .site-nav, .wh-field, .footer-mark, [aria-hidden="true"]');
                for (const el of document.querySelectorAll('body *')) {
                    const style = getComputedStyle(el);
                    if (style.display === 'none' || style.visibility === 'hidden') continue;
                    const box = el.getBoundingClientRect();
                    if (box.width === 0 || box.height === 0) continue;
                    if (!inScroller(el) && (box.right > vw + 1 || box.left < -1)) out.push(`${name(el)} leaves the screen (${Math.round(box.left)} to ${Math.round(box.right)} of ${vw})`);
                    const ownText = [...el.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim());
                    if (ownText && !inScroller(el) && !el.closest('.visually-hidden')) {
                        if (el.scrollWidth > el.clientWidth + 1 && style.overflow !== 'visible' && !el.matches('.wh-flow__title')) out.push(`${name(el)} text is cut off`);
                        if (parseFloat(style.fontSize) < 11) out.push(`${name(el)} text is ${style.fontSize}`);
                    }
                    if (isTouch && el.matches('button, a.button, .site-nav a') && (box.height < 40 || box.width < 40)) out.push(`${name(el)} target is ${Math.round(box.width)}x${Math.round(box.height)}`);
                }
                return [...new Set(out)];
            }, touch);
            for (const line of found) problems.push(`${width}px ${lang}: ${line}`);
            if (shotsDir && lang === 'en') await page.screenshot({ path: `${shotsDir}/w${width}.jpg`, type: 'jpeg', quality: 60, fullPage: true });
            await context.close();
        }
    }
} finally {
    await browser.close();
    await new Promise((done) => server.httpServer.close(done));
}

if (problems.length) {
    console.error(`Responsive check FAILED (${problems.length}):`);
    for (const line of problems) console.error(`  - ${line}`);
    process.exit(1);
}
console.log(`Responsive check passed at ${WIDTHS.length} widths (${WIDTHS[0]} to ${WIDTHS.at(-1)}px), EN and PT.`);
