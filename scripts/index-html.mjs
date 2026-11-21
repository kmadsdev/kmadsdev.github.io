// index.html has no text of its own. Its title, description, link preview tags and
// JSON-LD come from `meta` in src/content/contents.global.js (English only). Its <noscript>
// text comes from contents.en.js and contents.pt.js.
//
// index.html holds placeholders: {{name}}. fillIndexHtml() writes the values of
// indexHtmlValues() in their place. An unknown name stops the build.
// vite.config.js runs it in `npm run dev` and `npm run build` (plugin below).
// tests/app.test.jsx checks its output.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const escapeHtml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Every placeholder of index.html with its value (plain text, not escaped yet).
 * `data` is the three new content files: { global, en, pt } (contents.global.js, contents.en.js,
 * contents.pt.js). The metadata is `global.meta`, in English only.
 */
export function indexHtmlValues(data) {
    const { meta, person, links } = data.global;
    const line = (t) => `${t.hero.role} · ${t.hero.focus}. ${t.hero.location[0]} · ${t.hero.location[2]}. ${t.noscript}`;
    const label = (id) => data.en.hero.links.find((item) => item.id === id).label;
    return {
        lang: meta.lang,
        title: meta.title,
        description: meta.description,
        author: meta.author,
        page: meta.canonical,
        pageEn: meta.alternates.en,
        pagePt: meta.alternates['pt-BR'],
        favicon: links.favicon,
        siteName: meta.openGraph.siteName,
        ogLocale: meta.openGraph.locale,
        ogLocaleAlternate: meta.openGraph.localeAlternate,
        ogImage: meta.openGraph.image,
        jsonLd: meta.jsonLd,
        noscriptTitle: `${person.name} (${person.aliasUpper})`,
        noscriptEn: line(data.en),
        noscriptPt: line(data.pt),
        email: links.email,
        emailHref: `mailto:${links.email}`,
        github: links.github,
        githubLabel: label('github'),
        linkedin: links.linkedin,
        linkedinLabel: label('linkedin'),
    };
}

/** index.html with every {{name}} filled. Text is HTML-escaped. jsonLd is JSON for a <script>. */
export function fillIndexHtml(html, data) {
    const values = indexHtmlValues(data);
    return html.replace(/\{\{\s*([A-Za-z]+)\s*\}\}/g, (match, name) => {
        if (!(name in values)) throw new Error(`index.html: no value for the placeholder ${match}`);
        if (name === 'jsonLd') return JSON.stringify(values.jsonLd, null, 4).replace(/</g, '\\u003c').replace(/\n/g, '\n    ');
        return escapeHtml(values[name]);
    });
}

/** Vite plugin: fills index.html before Vite reads its links (dev server and build). */
export function indexHtmlFromContent() {
    let root = process.cwd();
    return {
        name: 'index-html-from-content',
        configResolved(config) {
            root = config.root;
        },
        transformIndexHtml: {
            order: 'pre',
            async handler(html, ctx) {
                // The dev server loads the content fresh on each request, so an edit shows on reload.
                const load = async (name) =>
                    ctx.server ? ctx.server.ssrLoadModule(`/src/content/${name}`) : import(pathToFileURL(resolve(root, 'src/content', name)).href);
                const data = {
                    global: await load('contents.global.js'),
                    en: (await load('contents.en.js')).en,
                    pt: (await load('contents.pt.js')).pt,
                };
                return fillIndexHtml(html, data);
            },
        },
    };
}
