// One place that starts the browser for the check and screenshot scripts.
//
// On a developer machine, a headless run of the installed Google Chrome shows a
// Chrome icon in the Dock for each run. The "headless shell" build of Playwright
// shows nothing, so it is used when it is in the Playwright cache. Without it
// (for example on the CI runner) the installed Chrome is used, as before.
// Force one of them with PF_BROWSER=chrome or PF_BROWSER=shell.
import { existsSync, readdirSync } from 'node:fs';
import { homedir, platform } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright-core';

function headlessShell() {
    const cache = process.env.PLAYWRIGHT_BROWSERS_PATH
        || (platform() === 'darwin' ? join(homedir(), 'Library/Caches/ms-playwright') : join(homedir(), '.cache/ms-playwright'));
    if (!existsSync(cache)) return null;
    const builds = readdirSync(cache).filter((name) => name.startsWith('chromium_headless_shell-')).sort().reverse();
    for (const build of builds) {
        for (const folder of readdirSync(join(cache, build))) {
            const file = join(cache, build, folder, 'chrome-headless-shell');
            if (existsSync(file)) return file;
        }
    }
    return null;
}

export async function launchBrowser() {
    const want = process.env.PF_BROWSER;
    const shell = want === 'chrome' ? null : headlessShell();
    if (shell) {
        try {
            return await chromium.launch({ executablePath: shell });
        } catch (error) {
            if (want === 'shell') throw error;
        }
    }
    return chromium.launch({ channel: 'chrome' });
}
