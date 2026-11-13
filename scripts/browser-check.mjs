// Real-browser check of the built site. Run: npm run check:browser
//
// It serves dist/ on a free port, opens the page in Chrome at desktop and phone
// width, in both languages and both themes, and fails on: a console error, a
// failed request, sideways scroll, a missing section, or a toggle that does not work.
// With --shots <dir> it also saves screenshots. The server stops when the script ends.
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
const SECTIONS = ['top', 'about', 'experience', 'cases', 'projects', 'skills', 'education', 'contact'];

const server = await preview({ preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
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

            for (const theme of ['dark', 'light']) {
                const current = await page.evaluate(() => document.documentElement.dataset.theme);
                if (current !== theme) await page.locator('.theme-toggle').first().click();
                const now = await page.evaluate(() => document.documentElement.dataset.theme);
                if (now !== theme) problems.push(`${tag}: theme toggle did not set ${theme}`);
                if (shotsDir) {
                    await page.evaluate(() => window.scrollTo(0, 0));
                    await page.screenshot({ path: `${shotsDir}/${device}-${lang}-${theme}.png`, fullPage: full });
                }
            }

            // The language toggle changes the first heading.
            const before = await page.locator('h1').textContent();
            const other = lang === 'en' ? 'PT' : 'EN';
            const toggle = page.locator('.wh-seg__option', { hasText: other }).first();
            if (await toggle.isVisible()) {
                await toggle.click();
                const after = await page.locator('h1').textContent();
                if (after === before) problems.push(`${tag}: language toggle did not change the text`);
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
console.log('Browser check passed: desktop and phone, EN and PT, dark and light.');
