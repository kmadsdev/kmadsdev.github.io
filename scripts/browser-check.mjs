// Real-browser check of the built site. Run: npm run check:browser
//   PF_DIST=<folder>   the built site to serve (default: dist)
//   --shots <dir>      also save screenshots (--full for the full page)
//
// It serves the folder on a free port, opens the page in Chrome at desktop and
// phone size, in both languages, and fails on: a console error, a failed
// request, a request to another host, sideways scroll, a missing section, a
// picture that did not load, a language toggle or a menu button that does not work.
// The site has one theme, so there is no theme step. The server stops when the script ends.
import { mkdir } from 'node:fs/promises';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const shotsIndex = process.argv.indexOf('--shots');
const shotsDir = shotsIndex > -1 ? process.argv[shotsIndex + 1] : null;
const full = process.argv.includes('--full');

const VIEWPORTS = {
    desktop: { width: 1440, height: 900 },
    phone: { width: 390, height: 844 },
};
const SECTIONS = ['top', 'intro', 'experience', 'education', 'applications', 'more', 'contact'];

const server = await preview({ build: { outDir: process.env.PF_DIST || 'dist' }, preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
const base = server.resolvedUrls.local[0];
const browser = await chromium.launch({ channel: 'chrome' });
const problems = [];

try {
    if (shotsDir) await mkdir(shotsDir, { recursive: true });

    for (const [device, viewport] of Object.entries(VIEWPORTS)) {
        for (const lang of ['en', 'pt']) {
            const context = await browser.newContext({ viewport, deviceScaleFactor: 2, reducedMotion: 'reduce', hasTouch: device === 'phone' });
            const page = await context.newPage();
            const tag = `${device}/${lang}`;
            page.on('console', (msg) => msg.type() === 'error' && problems.push(`${tag}: console error: ${msg.text()}`));
            page.on('pageerror', (err) => problems.push(`${tag}: page error: ${err.message}`));
            page.on('requestfailed', (req) => problems.push(`${tag}: request failed: ${req.url()}`));
            page.on('request', (req) => !req.url().startsWith(base) && !req.url().startsWith('data:') && problems.push(`${tag}: request to another host: ${req.url()}`));
            page.on('response', (res) => res.status() >= 400 && problems.push(`${tag}: HTTP ${res.status()}: ${res.url()}`));

            await page.goto(`${base}?lang=${lang}`, { waitUntil: 'networkidle' });

            const expectedLang = lang === 'pt' ? 'pt-BR' : 'en';
            const htmlLang = await page.evaluate(() => document.documentElement.lang);
            if (htmlLang !== expectedLang) problems.push(`${tag}: <html lang> is ${htmlLang}`);

            for (const id of SECTIONS) {
                if (!(await page.locator(`#${id}`).count())) problems.push(`${tag}: section #${id} is missing`);
            }

            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
            if (overflow > 0) problems.push(`${tag}: the page scrolls sideways by ${overflow}px`);

            const broken = await page.evaluate(async () => {
                const images = [...document.images];
                images.forEach((img) => { img.loading = 'eager'; });
                await Promise.all(images.map((img) => (img.complete ? null : new Promise((done) => { img.onload = done; img.onerror = done; }))));
                return images.filter((img) => img.naturalWidth === 0).map((img) => img.src);
            });
            for (const src of broken) problems.push(`${tag}: image did not load: ${src}`);

            if (shotsDir) {
                await page.evaluate(() => window.scrollTo(0, 0));
                await page.screenshot({ path: `${shotsDir}/${device}-${lang}.png`, fullPage: full });
            }

            // On a phone the section links are behind the menu button.
            if (device === 'phone') {
                const menu = page.locator('.menu-button');
                await menu.click();
                if (!(await page.locator('.site-nav a').first().isVisible())) problems.push(`${tag}: the menu button did not open the links`);
                await page.keyboard.press('Escape');
                if (await page.locator('.site-nav a').first().isVisible()) problems.push(`${tag}: Escape did not close the menu`);
            }

            // The language toggle changes the language of the page and the role line.
            const before = await page.locator('.hero-role').textContent();
            const other = lang === 'en' ? 'PT' : 'EN';
            const toggle = page.locator('.wh-seg__option', { hasText: other }).first();
            if (await toggle.isVisible()) {
                await toggle.click();
                const after = await page.locator('.hero-role').textContent();
                const nowLang = await page.evaluate(() => document.documentElement.lang);
                if (after === before || nowLang === expectedLang) problems.push(`${tag}: language toggle did not change the text`);
            } else {
                problems.push(`${tag}: language toggle is not visible`);
            }

            await context.close();
        }
    }
} finally {
    await browser.close();
    await new Promise((done) => server.httpServer.close(done));
}

if (problems.length) {
    console.error(`Browser check FAILED (${problems.length}):`);
    for (const line of [...new Set(problems)]) console.error(`  - ${line}`);
    process.exit(1);
}
console.log('Browser check passed: desktop and phone, EN and PT. 0 console errors, 0 failed requests, 0 requests to another host.');
