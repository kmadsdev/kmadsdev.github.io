// index.html has no text of its own. Its title, description, link preview tags,
// JSON-LD and <noscript> text come from src/content/content.js.
//
// index.html holds placeholders: {{name}}. fillIndexHtml() writes the values of
// indexHtmlValues() in their place. An unknown name stops the build.
// vite.config.js runs it in `npm run dev` and `npm run build` (plugin below).
// tests/app.test.jsx checks its output.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const escapeHtml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The first-screen line of one language, for <noscript>. */
function noscriptLine(t) {
    const { hero, meta } = t;
    return `${hero.role} · ${hero.focus}. ${hero.status}. ${hero.location[0]} · ${hero.location[2]}. ${meta.noscript}`;
}

/** Every placeholder of index.html with its value (plain text, not escaped yet). */
export function indexHtmlValues({ content, facts, links }) {
    const { en, pt } = content;
    const { person } = facts;
    const page = `${links.site}/`;
    const label = (id) => en.hero.links.find((item) => item.id === id).label;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: person.name,
        alternateName: person.aliasUpper,
        url: page,
        email: `mailto:${links.email}`,
        jobTitle: en.hero.role,
        worksFor: { '@type': 'Organization', name: facts.picpay.name },
        sameAs: [links.github, links.linkedin],
    };
    return {
        lang: en.meta.htmlLang,
        title: en.meta.title,
        description: en.meta.description,
        author: person.name,
        page,
        pageEn: `${page}?lang=en`,
        pagePt: `${page}?lang=pt`,
        favicon: links.favicon,
        siteName: links.domain,
        ogLocale: en.meta.ogLocale,
        ogLocaleAlternate: pt.meta.ogLocale,
        ogImage: facts.site.ogImage,
        jsonLd,
        noscriptTitle: `${person.name} (${person.aliasUpper})`,
        noscriptEn: noscriptLine(en),
        noscriptPt: noscriptLine(pt),
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
                const data = ctx.server
                    ? await ctx.server.ssrLoadModule('/src/content/index.js')
                    : await import(pathToFileURL(resolve(root, 'src/content/index.js')).href);
                return fillIndexHtml(html, data);
            },
        },
    };
}
