// Layout check at many screens. Run: npm run check:responsive
//   PF_DIST=<folder>   the built site to serve (default: dist)
//   --shots <dir>      also save one full-page capture per screen (English)
//
// For each screen (width AND height), in both languages, it fails on:
//   - sideways scroll of the page
//   - an element that leaves the screen (outside a frame that scrolls on purpose)
//   - text that is cut off
//   - a control smaller than 44px on a touch screen (40px for the older sections)
//   - text smaller than 11px (text inside a drawing is not counted: it scales with the drawing)
//   - the hero badge on top of the hero text
import { mkdir } from 'node:fs/promises';
import { preview } from 'vite';
import { launchBrowser } from './browser.mjs';

// Phones, a phone on its side, tablets, laptops, desktops, ultrawide screens.
const SCREENS = [
    [320, 568], [360, 740], [390, 844], [430, 932], [844, 390], [768, 1024], [1024, 1366], [1024, 768],
    [1280, 800], [1366, 768], [1440, 900], [1536, 864], [1920, 1080], [1920, 1200],
    [2560, 1080], [2560, 1440], [3440, 1440], [3840, 1600], [5120, 1440],
];
const shotsIndex = process.argv.indexOf('--shots');
const shotsDir = shotsIndex > -1 ? process.argv[shotsIndex + 1] : null;
if (shotsDir) await mkdir(shotsDir, { recursive: true });

const server = await preview({ build: { outDir: process.env.PF_DIST || 'dist' }, preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
const browser = await launchBrowser();
const problems = [];

try {
    for (const [width, height] of SCREENS) {
        const touch = width < 1024 || height < 500;
        for (const lang of ['en', 'pt']) {
            const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, hasTouch: touch, isMobile: Math.min(width, height) < 600, reducedMotion: 'reduce' });
            const page = await context.newPage();
            await page.goto(`${server.resolvedUrls.local[0]}?lang=${lang}`, { waitUntil: 'networkidle' });
            const found = await page.evaluate((isTouch) => {
                const out = [];
                const vw = document.documentElement.clientWidth;
                const sideways = document.documentElement.scrollWidth - vw;
                if (sideways > 0) out.push(`page scrolls sideways by ${sideways}px`);
                const name = (el) => `${el.tagName.toLowerCase()}.${String(el.getAttribute('class') || '').split(' ')[0]}`;
                const inScroller = (el) => el.closest('.wh-flow__stage, .outro-sun, [aria-hidden="true"]');
                const legacy = (el) => el.closest('.section');
                for (const el of document.querySelectorAll('body *')) {
                    const style = getComputedStyle(el);
                    if (style.display === 'none' || style.visibility === 'hidden') continue;
                    const box = el.getBoundingClientRect();
                    if (box.width === 0 || box.height === 0) continue;
                    if (!inScroller(el) && (box.right > vw + 1 || box.left < -1)) out.push(`${name(el)} leaves the screen (${Math.round(box.left)} to ${Math.round(box.right)} of ${vw})`);
                    const ownText = [...el.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim());
                    if (ownText && !inScroller(el) && !el.closest('.visually-hidden')) {
                        if (el.scrollWidth > el.clientWidth + 1 && style.overflow !== 'visible' && !el.matches('.wh-flow__title')) out.push(`${name(el)} text is cut off`);
                        if (parseFloat(style.fontSize) < 11 && !el.closest('.art')) out.push(`${name(el)} text is ${style.fontSize}`);
                    }
                    const min = legacy(el) ? 40 : 44;
                    if (isTouch && el.matches('button, a.button, .site-nav a, a.tile') && (box.height < min || box.width < min)) out.push(`${name(el)} target is ${Math.round(box.width)}x${Math.round(box.height)}${legacy(el) ? ' (older section)' : ''}`);
                }
                const badge = document.querySelector('.hero-badge')?.getBoundingClientRect();
                const text = document.querySelector('.hero-text')?.getBoundingClientRect();
                if (badge && text && badge.left < text.right && badge.right > text.left && badge.top < text.bottom && badge.bottom > text.top) out.push('the hero badge is on top of the hero text');
                return [...new Set(out)];
            }, touch);
            for (const line of found) problems.push(`${width}x${height} ${lang}: ${line}`);
            if (shotsDir && lang === 'en') await page.screenshot({ path: `${shotsDir}/s${width}x${height}.jpg`, type: 'jpeg', quality: 60, fullPage: true });
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
console.log(`Responsive check passed at ${SCREENS.length} screens (${SCREENS[0].join('x')} to ${SCREENS.at(-1).join('x')}), EN and PT.`);
