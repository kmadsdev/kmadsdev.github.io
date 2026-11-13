// Link check. Run: npm run check:links
//
// 1. Every https link in src/content/facts.js must answer below 400.
// 2. With --site <url>, the main addresses of the deployed site must answer 200.
import { facts } from '../src/content/facts.js';

const siteIndex = process.argv.indexOf('--site');
const site = siteIndex > -1 ? process.argv[siteIndex + 1].replace(/\/$/, '') : null;

function collect(value, out = new Set()) {
    if (typeof value === 'string' && value.startsWith('https://')) out.add(value);
    else if (value && typeof value === 'object') for (const child of Object.values(value)) collect(child, out);
    return out;
}

async function status(url) {
    for (const method of ['HEAD', 'GET']) {
        try {
            const response = await fetch(url, { method, redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (link check)' }, signal: AbortSignal.timeout(20000) });
            // LinkedIn answers 999 to every script. It is not a broken link.
            if (response.status < 400 || response.status === 999) return response.status;
            if (method === 'GET') return response.status;
        } catch (error) {
            if (method === 'GET') return error.name;
        }
    }
    return 0;
}

const urls = [...collect(facts)].filter((url) => !url.endsWith('/og.png') || site);
const targets = urls.map((url) => ({ url, want: 'below 400' }));
if (site) {
    for (const path of ['/', '/projects', '/404.html', '/robots.txt', '/sitemap.xml', '/og.png', '/assets/favicon.png']) {
        targets.push({ url: `${site}${path}`, want: '200' });
    }
}

let failed = 0;
const results = await Promise.all(targets.map(async (target) => ({ ...target, got: await status(target.url) })));
for (const { url, want, got } of results) {
    const ok = typeof got === 'number' && (want === '200' ? got === 200 : got < 400 || got === 999);
    if (!ok) failed += 1;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${got} ${url}`);
}
console.log(failed ? `\n${failed} link(s) failed.` : `\nAll ${results.length} links answer.`);
process.exit(failed ? 1 : 0);
