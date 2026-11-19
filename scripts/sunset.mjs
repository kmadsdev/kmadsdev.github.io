// Renders the sunset of the last section to pictures.
// Run: node scripts/sunset.mjs
//
// The source is scripts/sources/sunset.svg (1440x844, 19 blur filters). A browser
// needs a long paint for it, so the page loads a picture made from it:
//   public/assets/outro-sunset-1440.webp and outro-sunset-2880.webp (with alpha).
// Needs Chrome (through playwright-core) and the `cwebp` command (libwebp).
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launchBrowser } from './browser.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const svg = await readFile(join(root, 'scripts/sources/sunset.svg'), 'utf8');
const WIDTH = 1440;
const HEIGHT = 844;
const work = await mkdtemp(join(tmpdir(), 'sunset-'));
const browser = await launchBrowser();
try {
    for (const scale of [1, 2]) {
        const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: scale });
        await page.setContent(`<body style="margin:0;background:transparent">${svg}</body>`);
        const png = join(work, `sunset-${scale}.png`);
        await writeFile(png, await page.screenshot({ omitBackground: true }));
        const out = join(root, `public/assets/outro-sunset-${WIDTH * scale}.webp`);
        execFileSync('cwebp', ['-quiet', '-q', scale === 1 ? '78' : '68', '-alpha_q', '80', '-m', '6', '-sharp_yuv', png, '-o', out]);
        console.log(`${out.replace(root, '')}: ${Math.round((await stat(out)).size / 1024)} kB`);
        await page.close();
    }
} finally {
    await browser.close();
    await rm(work, { recursive: true, force: true });
}
