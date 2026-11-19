// Writes dist/404.html from the text files, so the 404 page has no text of its own,
// and dist/projects.html as a copy of the page.
// The folder is `dist`, or the folder in the PF_DIST environment variable.
// GitHub Pages serves this file for every address that does not exist.
import { copyFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { content } from '../src/content/index.js';

const text = { en: content.en.notFound, pt: content.pt.notFound };
const dist = process.env.PF_DIST || 'dist';
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>404 · kmads.dev</title>
<link rel="icon" type="image/png" href="/assets/favicon.png" />
<style>
:root { color-scheme: dark; --canvas: #0b0b10; --tile: #12121a; --line: #2c2c36; --text: #d5d1da; --strong: #f6f3ec; --muted: #a39fae; --accent: #ff014f; --on-accent: #0b0b10; }
* { box-sizing: border-box; }
body { margin: 0; min-height: 100svh; display: grid; place-items: center; padding: 24px; background: var(--canvas); color: var(--text); font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; background-image: radial-gradient(circle, var(--line) 1px, transparent 1.2px); background-size: 28px 28px; }
main { width: min(100%, 36rem); padding: 32px; border: 1px solid var(--line); border-radius: 22px; background: var(--tile); }
.code { margin: 0 0 16px; font: 500 12px/1 ui-monospace, "SF Mono", Menlo, Consolas, monospace; letter-spacing: 0.06em; color: var(--muted); }
.code b { color: var(--accent); font-weight: 500; }
h1 { margin: 0 0 12px; font-size: clamp(1.75rem, 1rem + 4vw, 2.75rem); line-height: 1.05; letter-spacing: -0.03em; color: var(--strong); }
p { margin: 0 0 24px; }
a { display: inline-flex; align-items: center; min-height: 44px; padding: 0 20px; border-radius: 10px; background: var(--accent); color: var(--on-accent); font-weight: 500; font-size: 14px; text-decoration: none; }
a:focus-visible { outline: 2px solid var(--strong); outline-offset: 2px; }
</style>
</head>
<body>
<main>
<p class="code"><b>404</b> · <span id="path"></span></p>
<h1 id="title">${text.en.title}</h1>
<p id="text">${text.en.text}</p>
<a id="cta" href="/">${text.en.cta}</a>
</main>
<script>
(function () {
    var text = ${JSON.stringify(text)};
    var lang = 'en';
    try {
        var saved = localStorage.getItem('kmads.lang') || navigator.language || '';
        if (saved.toLowerCase().slice(0, 2) === 'pt') lang = 'pt';
    } catch (e) {}
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.getElementById('title').textContent = text[lang].title;
    document.getElementById('text').textContent = text[lang].text;
    document.getElementById('cta').textContent = text[lang].cta;
    document.getElementById('path').textContent = location.pathname;
})();
</script>
</body>
</html>
`;
await writeFile(resolve(dist, '404.html'), html);
console.log(`${dist}/404.html written`);

// kmads.dev/projects is this page at the "Applications" section (src/routes.js).
await copyFile(resolve(dist, 'index.html'), resolve(dist, 'projects.html'));
console.log(`${dist}/projects.html written`);
