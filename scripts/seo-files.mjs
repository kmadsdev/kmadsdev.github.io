// Writes the three files that search engines and agents read, from src/content/contents.global.js
// and the English text: public/robots.txt, public/sitemap.xml, public/llms.txt.
// `npm run build` runs it first. Run it by hand after a change: node scripts/seo-files.mjs
// tests/contents.test.js fails when a file in public/ is not equal to the output of seoFiles().
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/** A rich text (string, or list of parts) as one plain string. */
const plain = (text) => (Array.isArray(text) ? text.map((part) => (typeof part === 'string' ? part : part.text)).join('') : text);

/** The three files as text: { 'robots.txt', 'sitemap.xml', 'llms.txt' }. */
export function seoFiles({ links, meta, person, picpay, order, projects, en }) {
    const page = meta.canonical;

    const robots = `User-agent: *\nAllow: /\n\nSitemap: ${links.site}/sitemap.xml\n`;

    const alternates = Object.entries(meta.alternates)
        .map(([lang, href]) => `        <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`)
        .join('\n');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>${page}</loc>
        <lastmod>${meta.lastModified}</lastmod>
${alternates}
    </url>
    <url>
        <loc>${links.cvLatest}/</loc>
    </url>
</urlset>
`;

    const sections = en.nav.items.map((item) => `- [${item.label}](${page}#${item.id})`).join('\n');
    const app = (id) => {
        const project = projects[id];
        const text = en.applications.production.items.find((item) => item.id === id);
        return `- [${project.name}](${project.live}): ${text.tagline}.`;
    };
    const other = order.apps.other
        .map((id) => `- [${projects[id].name}](${projects[id].live}): ${en.applications.other.items.find((item) => item.id === id).tagline}.`)
        .join('\n');
    const study = order.apps.study
        .map((id) => `- [${projects[id].name}](${projects[id].repo}): ${en.applications.study.items.find((item) => item.id === id).line}`)
        .join('\n');
    const llms = `# ${person.name} (${person.alias})

> ${meta.description}

This file is a summary of ${links.domain} for language models and agents. The page is in English and in Portuguese (${meta.alternates['pt-BR']}).

## Who he is

- Role: ${en.hero.role}, ${en.hero.focus}. He works at ${picpay.name}.
- Location: ${en.hero.location[0]} (${person.utc}).
- ${plain(en.hero.summary)}
- Languages: ${en.hobbies.languages.items.map((item) => `${item.name} (${item.level})`).join(', ')}.

## Sections of the page

${sections}

## Curriculum and profiles

- [Curriculum (CV), latest version](${links.cvLatest})
- [GitHub](${links.github})
- [LinkedIn](${links.linkedin})
- [E-mail](mailto:${links.email})

## Applications in production

${order.apps.production.map(app).join('\n')}
${other}

## Study and other projects (source code)

${study}

## Optional

- [Source code of this website](${links.repo})
- [Sitemap](${links.site}/sitemap.xml)
`;

    return { 'robots.txt': robots, 'sitemap.xml': sitemap, 'llms.txt': llms };
}

// Run as a script: write the files to public/.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const root = resolve(fileURLToPath(import.meta.url), '../..');
    const global = await import('../src/content/contents.global.js');
    const { en } = await import('../src/content/contents.en.js');
    for (const [name, text] of Object.entries(seoFiles({ ...global, en }))) {
        await writeFile(resolve(root, 'public', name), text);
    }
}
