// @vitest-environment node
// Rules of the three content files: contents.global.js, contents.en.js, contents.pt.js.
import { describe, expect, it } from 'vitest';
import * as global from '../src/content/contents.global.js';
import { isAnchor, isLink, isStrong, link, links as linksOf, parts, plain, strong } from '../src/content/rich.js';
import { en, player as playerEn, rulers as rulersEn } from '../src/content/contents.en.js';
import { pt, player as playerPt, rulers as rulersPt } from '../src/content/contents.pt.js';

const { anchors, art, cases, figma, links, meta, music, order, projects } = global;
const languages = { en, pt };

/** Every value of an object tree as [path, value]. */
function walk(value, path = '') {
    if (Array.isArray(value)) return value.flatMap((item, i) => walk(item, `${path}[${i}]`));
    if (value && typeof value === 'object') return Object.entries(value).flatMap(([key, item]) => walk(item, path ? `${path}.${key}` : key));
    return [[path, value]];
}
const strings = (tree) => walk(tree).filter(([, value]) => typeof value === 'string');
/** The key structure of a tree. A rich text array becomes 'rich', so EN and PT can split a sentence in another way. */
function shape(value) {
    if (Array.isArray(value)) {
        const rich = value.length > 0 && value.every((part) => typeof part === 'string' || (part && typeof part.text === 'string'));
        if (rich && value.some((part) => typeof part === 'object')) return 'rich';
        return value.map(shape);
    }
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]));
    return typeof value;
}
/** Every link target of a tree: `to` and `href` values, in order. */
const targets = (tree) => walk(tree).filter(([path]) => /(^|\.)(to|href)$/.test(path)).map(([, value]) => value);
const allAnchors = Object.values(anchors).flat();

/** Every text that is a title, a headline or a heading: [path, text]. */
function titles(t) {
    const list = [
        ['intro.title', t.intro.title],
        ['intro.opening.title', t.intro.opening.title],
        ['experience.title', t.experience.title],
        ['education.title', t.education.title],
        ['education.program.title', t.education.program.title],
        ['education.certificates.title', t.education.certificates.title],
        ['applications.title', t.applications.title],
        ['hobbies.title', t.hobbies.title],
        ['figma.title', t.figma.title],
        ['contact.title', t.contact.title],
        ['notFound.title', t.notFound.title],
    ];
    t.intro.chapters.forEach((chapter) => {
        list.push([`intro.chapters.${chapter.id}.headline`, chapter.headline]);
        chapter.drawings.forEach((item) => list.push([`intro.chapters.${chapter.id}.drawings.${item.id}.title`, item.title]));
        chapter.stats.forEach((item) => list.push([`intro.chapters.${chapter.id}.stats.${item.id}.title`, item.title]));
    });
    Object.entries(t.intro.art).forEach(([id, item]) => list.push([`intro.art.${id}.title`, item.title]));
    t.experience.items.forEach((item) => {
        list.push([`experience.${item.id}.company`, item.company]);
        item.timeline.forEach((row, i) => list.push([`experience.${item.id}.timeline[${i}].title`, row.title]));
    });
    t.cases.items.forEach((item) => {
        list.push([`cases.${item.id}.title`, item.title]);
        if (item.flow) list.push([`cases.${item.id}.flow.title`, item.flow.title]);
    });
    for (const group of ['production', 'other', 'study']) {
        list.push([`applications.${group}.title`, t.applications[group].title]);
        t.applications[group].items.forEach((item) => item.tagline && list.push([`applications.${item.id}.tagline`, item.tagline]));
    }
    for (const block of ['volunteering', 'list', 'languages', 'future']) list.push([`hobbies.${block}.title`, t.hobbies[block].title]);
    t.hobbies.list.items.forEach((item) => list.push([`hobbies.list.${item.id}.name`, item.name]));
    t.hobbies.future.items.forEach((item) => list.push([`hobbies.future.${item.id}.name`, item.name]));
    Object.entries(t.figma.items).forEach(([id, item]) => list.push([`figma.${id}.title`, item.title]));
    return list;
}

describe('en and pt have the same shape', () => {
    it('has the same keys, in the same order, and the same list lengths', () => {
        expect(JSON.stringify(shape(pt))).toBe(JSON.stringify(shape(en)));
    });
    it('has no empty text', () => {
        for (const tree of [en, pt, global]) {
            const empty = strings(tree).filter(([, value]) => value.trim() === '').map(([path]) => path);
            expect(empty).toEqual([]);
        }
    });
    it('has the same link targets in both languages, in the same order', () => {
        expect(targets(pt)).toEqual(targets(en));
    });
});

describe('text rules', () => {
    const everything = { en, pt, global };
    it('has no comment mark, no placeholder and no unfilled variable in a text', () => {
        const bad = strings(everything).filter(([, value]) => /(>>>|\[fill|\$\{|undefined|\bNaN\b|\[object)/.test(value));
        expect(bad).toEqual([]);
    });
    it('never names the private company', () => {
        expect(strings(everything).filter(([, value]) => /workaholic/i.test(value))).toEqual([]);
    });
    it('has no em dash, and an en dash only in a date range', () => {
        const bad = strings(languages).filter(([path, value]) => /—/.test(value) || (/–/.test(value) && !/(period|role)$/.test(path)));
        expect(bad).toEqual([]);
    });
    it('has no semicolon in a text', () => {
        expect(strings(languages).filter(([, value]) => value.includes(';'))).toEqual([]);
    });
    it('ends no title, headline or heading with a full stop', () => {
        for (const t of [en, pt]) {
            const list = titles(t);
            expect(list.length).toBeGreaterThan(80);
            expect(list.filter(([, text]) => typeof text !== 'string' || /\.\s*$/.test(text))).toEqual([]);
        }
        const names = Object.entries(projects).filter(([, project]) => /\.\s*$/.test(project.name));
        expect(names).toEqual([]);
    });
    it('does not mention AI in a text about Ruph', () => {
        for (const t of [en, pt]) {
            const ruphCase = t.cases.items.find((item) => item.id === 'ruph');
            const ruphApp = t.applications.production.items.find((item) => item.id === 'ruph');
            const text = JSON.stringify([ruphCase, { ...ruphApp, paragraphs: ruphApp.paragraphs.slice(1) }]);
            expect(text).not.toMatch(/\bAI\b|\bIA\b|agent|MCP/i);
            expect(Object.keys(ruphCase.flow.nodes)).not.toContain('agent');
        }
    });
    it('shows no status word for an application', () => {
        for (const t of [en, pt]) expect(Object.keys(t.applications.labels).filter((key) => /status/i.test(key))).toEqual([]);
        expect(Object.values(projects).filter((project) => 'status' in project)).toEqual([]);
    });
});

describe('links and anchors', () => {
    it('has no anchor id twice', () => {
        expect(new Set(allAnchors).size).toBe(allAnchors.length);
    });
    it('sends every internal link to an anchor of the list, and every other link to https, mailto or a site path', () => {
        for (const t of [en, pt]) {
            const bad = targets(t).filter((to) => {
                if (to.startsWith('#')) return !allAnchors.includes(to.slice(1));
                return !/^(https:\/\/|mailto:|\/[a-z])/.test(to);
            });
            expect(bad).toEqual([]);
        }
    });
    it('gives every anchor of an item a place in the list', () => {
        const owned = walk(en).filter(([path, value]) => /(^|\.)anchor$/.test(path) && value !== null).map(([, value]) => value);
        expect(owned.filter((id) => !allAnchors.includes(id))).toEqual([]);
        expect(en.nav.items.map((item) => item.id).filter((id) => !anchors.sections.includes(id))).toEqual([]);
    });
    it('has only https addresses, site paths and anchors in the global file', () => {
        const bad = strings(global).filter(([, value]) => /^http:\/\//.test(value));
        expect(bad).toEqual([]);
        expect(links.top).toBe('#top');
        expect(links.main).toBe('#main');
    });
});

describe('structure', () => {
    it('has the chapters, the case files and the applications of the order lists', () => {
        for (const t of [en, pt]) {
            expect(t.intro.chapters.map((chapter) => chapter.id)).toEqual(order.chapters);
            expect(t.cases.items.map((item) => item.id)).toEqual(order.cases);
            expect(t.experience.items.map((item) => item.id)).toEqual(Object.keys(order.companyCases));
            for (const group of ['production', 'other', 'study']) {
                expect(t.applications[group].items.map((item) => item.id)).toEqual(order.apps[group]);
            }
        }
        expect(Object.keys(projects).sort()).toEqual(Object.values(order.apps).flat().sort());
    });
    it('opens with seven paragraphs, and each starts with a bold part', () => {
        for (const t of [en, pt]) {
            expect(t.intro.opening.paragraphs).toHaveLength(7);
            for (const paragraph of t.intro.opening.paragraphs) expect(paragraph[0].strong).toBe(true);
        }
    });
    it('labels every node, frame, edge and stage of a drawing', () => {
        for (const t of [en, pt]) {
            const labels = t.intro.art;
            expect(Object.keys(labels.requestPath.nodes)).toEqual(art.requestPath.nodes);
            expect(labels.requestPath.edges).toHaveLength(art.requestPath.edges.length);
            expect(Object.keys(labels.requestPath.frames)).toEqual(art.requestPath.frames.map((frame) => frame.id));
            expect(Object.keys(art.requestPath.grid).sort()).toEqual([...art.requestPath.nodes].sort());
            for (const call of ['warm', 'cold']) for (const stage of art.trace[call].stages) expect(labels.trace.stages[stage]).toBeTruthy();
            expect(Object.keys(labels.contractStates.states)).toEqual(art.contractStates.states);
            for (const transition of art.contractStates.transitions) expect(labels.contractStates.transitions[transition.id]).toBeTruthy();
            for (const cloud of art.clouds.order) expect(Object.keys(labels.clouds[cloud].nodes)).toEqual(art.clouds[cloud]);
            expect(Object.keys(labels.coldStart.parts)).toEqual(art.coldStart.parts);
            expect(Object.keys(labels.pipeline.stages)).toEqual(art.pipeline.stages);
            expect(Object.keys(labels.defaultWorkflow.flows)).toEqual(art.defaultWorkflow.flows.map((flow) => flow.id));
            for (const flow of Object.values(labels.defaultWorkflow.flows)) expect(flow.steps).toHaveLength(6);
            expect(Object.keys(labels.timeline.items)).toEqual(art.timeline.map((row) => row.id));
            const used = t.intro.chapters.flatMap((chapter) => chapter.drawings.map((drawing) => drawing.art));
            expect(used.filter((key) => !(key in art) || !(key in labels))).toEqual([]);
        }
        const parts = art.coldStart.parts.reduce((sum, id) => sum + art.coldStart.seconds[id], 0);
        expect(parts).toBe(art.coldStart.seconds.total);
    });
    it('keeps the number rows that the owner listed, and no other', () => {
        const rows = Object.fromEntries(en.intro.chapters.map((chapter) => [chapter.id, chapter.stats.map((stat) => stat.value)]));
        expect(rows.backend).toEqual(['283', '2-5x']);
        for (const id of ['architecture', 'cloud', 'cicd', 'finance', 'ai']) expect(rows[id]).toEqual([]);
    });
    it('labels every flowchart node and edge of a case file', () => {
        for (const t of [en, pt]) {
            for (const item of t.cases.items) {
                const flow = cases[item.id].flow;
                if (!flow) {
                    expect(item.flow).toBeNull();
                    continue;
                }
                expect(Object.keys(item.flow.nodes)).toEqual(flow.nodes);
                expect(item.flow.steps).toHaveLength(flow.edges.length);
            }
        }
    });
    it('describes each media file and each Figma picture', () => {
        for (const t of [en, pt]) {
            expect(Object.keys(t.applications.production.items[0].media)).toEqual(projects.consignado.media.map((item) => item.id));
            expect(Object.keys(t.figma.items)).toEqual(figma.map((item) => item.id));
            expect(Object.keys(t.education.certificates.dates)).toEqual(global.education.certificates.map((item) => item.id));
            expect(t.hobbies.languages.items).toHaveLength(global.languages.length);
        }
        const files = strings({ projects, figma }).filter(([path]) => /(image|video|src|thumb)$/.test(path));
        expect(files.filter(([, value]) => !/^\/assets\/(projects|figma)\//.test(value))).toEqual([]);
    });
});

describe('metadata (English only, in contents.global.js)', () => {
    it('keeps the title and the description inside the length limits', () => {
        expect(meta.title.startsWith('Kaique Souza - Software Engineer')).toBe(true);
        expect(meta.title.length).toBeLessThanOrEqual(60);
        expect(meta.description.length).toBeGreaterThanOrEqual(150);
        expect(meta.description.length).toBeLessThanOrEqual(160);
        expect(meta.lang).toBe('en');
        expect(meta.openGraph.locale).toBe('en_US');
    });
    it('is in English', () => {
        const text = [meta.title, meta.description, meta.openGraph.imageAlt, JSON.stringify(meta.jsonLd)].join(' ');
        expect(text).not.toMatch(/\b(Engenheiro|Arquitetura|Experiência|aplicações|sistemas|não|você)\b/i);
        expect('meta' in en || 'meta' in pt).toBe(false);
    });
    it('has a canonical address, the language alternates and a date', () => {
        expect(meta.canonical).toBe(`${links.site}/`);
        expect(Object.keys(meta.alternates)).toEqual(['en', 'pt-BR', 'x-default']);
        expect(meta.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(meta.openGraph.image.startsWith(links.site)).toBe(true);
    });
    it('describes one Person and one WebSite in JSON-LD', () => {
        const [person, site] = meta.jsonLd['@graph'];
        expect(person['@type']).toBe('Person');
        expect(person.name).toBe(global.person.name);
        expect(person.sameAs).toEqual([links.github, links.linkedin]);
        expect(person.worksFor.name).toBe(global.picpay.name);
        expect(person.alumniOf.name).toBe(global.education.institution);
        expect(person.address.addressCountry).toBe('BR');
        expect(person.knowsAbout.length).toBeGreaterThan(5);
        expect(site['@type']).toBe('WebSite');
        expect(site.author['@id']).toBe(person['@id']);
    });
});

describe('music and controls', () => {
    it('has one song, with a file path under /assets/ and a credit', () => {
        expect(music.title).toBe('May');
        expect(music.artist).toBe('Birocratic');
        expect(music.src).toBe('/assets/audio/may-birocratic.mp3');
        expect(music.spotifyUrl).toMatch(/^https:\/\/open\.spotify\.com\/track\//);
        expect(music.credit.text.length).toBeGreaterThan(0);
        expect(music.credit.url).toMatch(/^https:\/\//);
        expect(music.volume).toBeGreaterThan(0);
        expect(music.volume).toBeLessThanOrEqual(1);
    });
    it('names every control of the player and of the ruler in both languages', () => {
        const keys = ['play', 'pause', 'restart', 'openOnSpotify', 'nowPlaying'];
        for (const table of [playerEn, playerPt, en.player, pt.player]) {
            expect(Object.keys(table)).toEqual(keys);
            for (const key of keys) expect(table[key].trim().length).toBeGreaterThan(0);
        }
        expect(Object.keys(rulersPt)).toEqual(Object.keys(rulersEn));
        expect(en.rulers.scroll && pt.rulers.scroll).toBeTruthy();
    });
});

describe('files for search engines and agents', () => {
    it('writes robots.txt, sitemap.xml and llms.txt from the global file', async () => {
        const { seoFiles } = await import('../scripts/seo-files.mjs');
        const { readFileSync } = await import('node:fs');
        const files = seoFiles({ ...global, en });
        expect(Object.keys(files)).toEqual(['robots.txt', 'sitemap.xml', 'llms.txt']);
        for (const [name, text] of Object.entries(files)) {
            expect(readFileSync(`public/${name}`, 'utf8')).toBe(text);
            expect(text).not.toMatch(/workaholic|undefined|\[object/i);
        }
        expect(files['robots.txt']).toContain(`Sitemap: ${links.site}/sitemap.xml`);
        expect(files['sitemap.xml']).toContain(`<lastmod>${meta.lastModified}</lastmod>`);
        expect(files['llms.txt']).toContain(links.cvLatest);
    });
});

// Rules kept from the old tests/content.test.js (copy reviews of 2026-11-18 and 2026-11-19).
// A rich paragraph is read as one string, so that a rule sees the whole sentence.
const isRich = (value) => Array.isArray(value) && value.length > 0 && value.every((part) => typeof part === 'string' || (part && typeof part.text === 'string')) && value.some((part) => typeof part === 'object');
function texts(value, path, out = []) {
    if (isRich(value)) out.push([path, plain(value)]);
    else if (Array.isArray(value)) value.forEach((item, i) => texts(item, `${path}[${i}]`, out));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => texts(item, `${path}.${key}`, out));
    else if (typeof value === 'string' && !/\.(to|href|src)$/.test(path)) out.push([path, value]);
    return out;
}
const whole = [...texts(en, 'en'), ...texts(pt, 'pt')];
const hits = (list, pattern) => list.filter(([, value]) => pattern.test(value)).map(([path, value]) => `${path}: ${value}`);

describe('rich text', () => {
    it('reads links and bold parts', () => {
        const paragraph = [strong('I led'), ' ', link('BodyShop', '#case-bodyshop'), ' and ', link('a repo', 'https://github.com/kmadsdev'), '.'];
        expect(plain(paragraph)).toBe('I led BodyShop and a repo.');
        expect(linksOf(paragraph).map((item) => item.to)).toEqual(['#case-bodyshop', 'https://github.com/kmadsdev']);
        expect(parts('plain text')).toEqual(['plain text']);
        expect(isLink('text')).toBe(false);
        expect(isStrong(paragraph[0])).toBe(true);
        expect(isAnchor('#top')).toBe(true);
    });
});

describe('copy rules', () => {
    it('has no exclamation mark', () => {
        expect(hits(whole, /!/)).toEqual([]);
    });
    it('has one emoji only: the wave of the opening, which the owner wrote', () => {
        const found = whole.filter(([path, value]) => /\p{Extended_Pictographic}/u.test(value) && !/\.intro\.opening\.title$/.test(path));
        expect(found).toEqual([]);
        expect(en.intro.opening.title).toBe('👋 Hello,');
    });
    it('says "remote" only in the location line of the hero', () => {
        expect(hits(whole.filter(([path]) => !/\.hero\.location\[/.test(path)), /\bremot[eo]\b/i)).toEqual([]);
    });
    it('names ArgoCD, Tekton and SQS in the PicPay context only', () => {
        const found = whole.filter(([path, value]) => /\b(argocd|tekton|sqs)\b/i.test(value) && !/PicPay|BodyShop/.test(value) && !/experience\.items\[0\]|clouds\.aws|cases\.items\[1\]/.test(path));
        expect(found).toEqual([]);
    });
    it('never puts Azure or Kubernetes at work', () => {
        const clauses = whole.flatMap(([path, value]) => value.split(/[.,:]/).map((clause) => [path, clause]));
        expect(hits(clauses, /^(?=.*\b(azure|aks|kubernetes)\b)(?=.*\b(at work|no trabalho|PicPay)\b)/i)).toEqual([]);
        for (const id of ['cards', 'bodyshop', 'survey', 'oracle']) expect(cases[id].stack.join(' ')).not.toMatch(/azure|aks|kubernetes/i);
    });
    it('has no personal information', () => {
        expect(hits(whole, /(?<!net )salary|sal[aá]rio(?! l[ií]quido)|\bCLT\b|\bPJ\b|h[ií]brid/i)).toEqual([]);
    });
    it('says "banco de dados" for a database in Portuguese, and "cloud", never "nuvem"', () => {
        const ptTexts = whole.filter(([path]) => path.startsWith('pt.'));
        expect(hits(ptTexts, /\bbancos?\b(?! de dados)(?! Central)(?! digital)/i)).toEqual([]);
        expect(hits(ptTexts, /\bnuvens?\b/i)).toEqual([]);
    });
    it('describes the cards work in words only', () => {
        expect(cases.cards.flow).toBeNull();
        for (const t of [en, pt]) {
            const item = t.cases.items.find((entry) => entry.id === 'cards');
            expect([item.problem, ...item.decisions, item.result].join(' ')).not.toMatch(/\d{3,}/);
        }
    });
});

describe('facts that the owner agreed', () => {
    it('keeps the PicPay dates and the public contact address', () => {
        expect(global.picpay.roles.cards).toEqual({ start: '2025-12', end: null });
        expect(global.picpay.roles.hr).toEqual({ start: '2025-03', end: '2025-11' });
        expect(links.email).toBe('contact@kmads.dev');
    });
    it('has one program and exactly the three HackerRank certificates', () => {
        expect(global.education.certificates.map((item) => `${item.issuer} ${item.title} ${item.date}`)).toEqual([
            'HackerRank Software Engineer 2025-10',
            'HackerRank REST API (Intermediate) 2025-10',
            'HackerRank SQL (Advanced) 2025-10',
        ]);
        expect(en.education.program).toMatchObject({ title: 'Software Development Technical Program', place: 'Instituto J&F' });
        expect(en.education.program.period).toContain('(3 years)');
        expect('lead' in en.education).toBe(false);
    });
    it('links Consignado Cloud to its live address and its three repositories', () => {
        expect(projects.consignado.live).toBe('https://consignado.kmads.dev');
        expect(projects.consignado.repos.map((item) => item.label)).toEqual(['consignado-api', 'consignado-serverless', 'consignado-front']);
    });
    it('keeps the landing page of TrocaTine apart from its MVP', () => {
        expect(projects.trocatine.stack).toEqual(['HTML', 'CSS', 'JavaScript', 'GitHub Pages']);
    });
    it('points every clip and poster to the projects folder', () => {
        for (const [id, project] of Object.entries(projects)) {
            if (project.video) {
                expect(project.video, id).toMatch(/^\/assets\/projects\/[a-z-]+\.mp4$/);
                expect(project.image, id).toMatch(/^\/assets\/projects\/[a-z-]+\.jpg$/);
            }
        }
        for (const id of order.apps.other) expect(projects[id].video, id).toBeTruthy();
        for (const id of order.apps.study) expect(projects[id].video ?? projects[id].image, id).toBeUndefined();
    });
    it('has the languages, the hobbies and the volunteering of the order', () => {
        expect(en.hobbies.languages.items.map((item) => `${item.name} ${item.level}`)).toEqual(['Portuguese Native', 'English C1', 'Spanish Basic']);
        expect(global.reddit).toMatchObject({ start: 2022, end: 2024, people: '250+' });
        for (const t of [en, pt]) expect(t.hobbies.list.items.map((item) => item.id)).toEqual(['ecu', 'pc', 'gym', 'basketball', 'chess']);
    });
});
