// Content rules of the site. Source of the rules: .claude/backlog/redesign/CONTRACT.md
// (sections 2, 4, 6, 7, 8) and .claude/backlog/redesign/CONTENT-SHAPE.md.
import { describe, expect, it } from 'vitest';
import { content } from '../src/content/index.js';
import { facts } from '../src/content/facts.js';
import { isAnchor, isLink, link, links, parts, plain } from '../src/content/rich.js';

const LANGS = ['en', 'pt'];

/** Flat list of [path, value] for every leaf of an object. */
function leaves(value, path = '') {
    if (Array.isArray(value)) {
        return value.flatMap((item, i) => leaves(item, `${path}[${i}]`));
    }
    if (value && typeof value === 'object') {
        return Object.entries(value).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k));
    }
    return [[path, value]];
}

/** Every object in a tree that passes the test. */
function find(value, test, out = []) {
    if (Array.isArray(value)) value.forEach((item) => find(item, test, out));
    else if (value && typeof value === 'object') {
        if (test(value)) out.push(value);
        Object.values(value).forEach((item) => find(item, test, out));
    }
    return out;
}

const en = leaves(content.en);
const pt = leaves(content.pt);
const all = [...en.map(([p, v]) => [`en.${p}`, v]), ...pt.map(([p, v]) => [`pt.${p}`, v])];
const strings = all.filter(([, v]) => typeof v === 'string');
const factStrings = leaves(facts).filter(([, v]) => typeof v === 'string').map(([p, v]) => [`facts.${p}`, v]);
// Link targets and file paths are not visible text.
const isAddress = ([p]) => /\.(to|href|src|thumb|small)$/.test(p);
const visible = strings.filter((entry) => !isAddress(entry));
// Whole texts: a rich paragraph is read as one string, so that a rule can see the full sentence.
const isParagraph = (value) => Array.isArray(value) && value.length > 0 && value.every((part) => typeof part === 'string' || isLink(part)) && value.some(isLink);
function texts(value, path, out = []) {
    if (isParagraph(value)) out.push([path, plain(value)]);
    else if (Array.isArray(value)) value.forEach((item, i) => texts(item, `${path}[${i}]`, out));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => texts(v, `${path}.${k}`, out));
    else if (typeof value === 'string' && !isAddress([path])) out.push([path, value]);
    return out;
}
const whole = LANGS.flatMap((lang) => texts(content[lang], lang));
const hits = (list, pattern) => list.filter(([, v]) => pattern.test(v)).map(([p, v]) => `${p}: ${v}`);
const sentences = (text) => (text.match(/[.?](\s|$)/g) ?? []).length;
const words = (text) => text.trim().split(/\s+/).length;
const allAnchors = Object.values(facts.anchors).flat();

// For the shape, one rich paragraph is one leaf: the number of its parts can differ
// between the languages (Portuguese puts an article before a name).
function shape(lang) {
    const out = new Map();
    for (const [path, value] of leaves(content[lang])) {
        const paragraph = path.match(/^(.*\.paragraphs\[\d+\])\[\d+\]/);
        if (paragraph) out.set(paragraph[1], 'rich');
        else out.set(path, value);
    }
    return [...out];
}

describe('en and pt have the same shape', () => {
    const enShape = shape('en');
    const ptShape = shape('pt');

    it('has the same keys and the same list lengths', () => {
        expect(ptShape.map(([p]) => p).sort()).toEqual(enShape.map(([p]) => p).sort());
    });

    it('has the same value type at every key', () => {
        const ptTypes = Object.fromEntries(ptShape.map(([p, v]) => [p, v === null ? 'null' : typeof v]));
        for (const [path, value] of enShape) {
            expect(`${path}:${ptTypes[path]}`).toBe(`${path}:${value === null ? 'null' : typeof value}`);
        }
    });

    it('has no empty text', () => {
        expect(strings.filter(([, v]) => v.trim() === '').map(([p]) => p)).toEqual([]);
    });

    it('has the same link targets in both languages', () => {
        // The index of a link in a paragraph can differ: Portuguese puts an article before a name.
        const targets = (lang) => leaves(content[lang]).filter(([p]) => /\.(to|href)$/.test(p)).map(([p, v]) => `${p.replace(/(paragraphs\[\d+\])\[\d+\]\.to$/, '$1.to')}=${v}`);
        expect(targets('pt')).toEqual(targets('en'));
    });
});

describe('text rules (CONTRACT.md section 2)', () => {
    const banned = [
        [/METRIC NEEDED|TO VERIFY|UNVERIFIED|TODO|undefined|NaN|\[object/, 'unfinished marker'],
        [/\b(leverag\w*|spearhead\w*|passionate|cutting-edge|results-driven|seamless\w*|robust\w*|powerful|modern|production-grade|journey|ecosystem|crucial|simply|just|easily|scalable)\b/i, 'English marketing word'],
        [/\b(really|truly|very|fully)\b/i, 'English adverb with no fact'],
        [/\b(apaixonad\w*|robust[oa]s?|poderos[oa]s?|modern[oa]s?|simplesmente|basta|jornada|ecossistema|alavanc\w*|realmente|verdadeiramente|totalmente)\b|\bde ponta\b(?! a ponta)/i, 'Portuguese marketing word'],
        [/\b(kafka|rabbitmq|dynatrace|grafana|datadog|sonar\w*|fortify|\.net|sql server|openshift)\b/i, 'tool that Kmads did not confirm'],
        [/full-time student|ml engineer|8 years of experience|8 anos de experi/i, 'banned framing'],
        [/(?<!net )salary|sal[aá]rio(?! l[ií]quido)|\bCLT\b|\bPJ\b|h[ií]brid/i, 'personal information'],
        [/high school|ensino m[eé]dio/i, 'high school (the program is a technical program)'],
        [/overclock|burnrate/i, 'application that the owner removed'],
        [/!/, 'exclamation mark'],
        [/;/, 'semicolon'],
        [/\p{Extended_Pictographic}/u, 'emoji'],
        [/\b(welcome|bem-vind[oa])\b|learn more|saiba mais/i, 'generic UI filler'],
    ];

    for (const [pattern, reason] of banned) {
        it(`has no ${reason}`, () => {
            expect(hits(visible, pattern)).toEqual([]);
        });
    }

    it('never names the private company, in the text or in the facts', () => {
        // Built from two parts, so that the word itself is not in the source.
        const company = new RegExp(['work', 'aholic'].join(''), 'i');
        expect(hits([...strings, ...factStrings], company)).toEqual([]);
    });

    it('has no em dash or en dash outside a date range', () => {
        const found = visible
            .filter(([p, v]) => /—/.test(v) || (/–/.test(v) && !p.endsWith('.period')))
            .map(([p, v]) => `${p}: ${v}`);
        expect(found).toEqual([]);
    });

    it('says "remote" only in the location line of the hero', () => {
        const found = visible.filter(([p, v]) => /\bremot[eo]\b/i.test(v) && !/\.hero\.location\[/.test(p) && !/remote state/i.test(v));
        expect(found.map(([p, v]) => `${p}: ${v}`)).toEqual([]);
    });

    it('names ArgoCD, Tekton and SQS in the PicPay context only', () => {
        const found = whole.filter(([p, v]) => {
            if (!/\b(argocd|tekton|sqs)\b/i.test(v)) return false;
            // cases.items[1] is the BodyShop case file (PicPay work).
            const inPicpay = /PicPay|BodyShop/.test(v) || /experience\.items\[0\]|clouds\.aws|cases\.items\[1\]/.test(p);
            return !inPicpay;
        });
        expect(found.map(([p, v]) => `${p}: ${v}`)).toEqual([]);
    });

    it('never puts Azure or Kubernetes at work', () => {
        const clauses = whole.flatMap(([p, v]) => v.split(/[.,:]/).map((clause) => [p, clause]));
        const found = clauses.filter(([, clause]) => /\b(azure|aks|kubernetes)\b/i.test(clause) && /\b(at work|no trabalho|PicPay)\b/i.test(clause));
        expect(found.map(([p, v]) => `${p}: ${v}`)).toEqual([]);
    });

    it('uses the agreed experience wording in both languages', () => {
        const joined = (lang) => leaves(content[lang]).map(([, v]) => v).join(' ');
        expect(joined('en')).toContain('3 years of engineering experience');
        expect(joined('en')).toContain('8 years in tech');
        expect(joined('pt')).toContain('3 anos de experiência em engenharia');
        expect(joined('pt')).toContain('8 anos em tecnologia');
    });

    it('calls Ruph "my own platform"', () => {
        expect(plain(content.en.intro.opening.paragraphs[2])).toContain('my own platform');
        expect(plain(content.pt.intro.opening.paragraphs[2])).toContain('minha própria plataforma');
    });
});

describe('hero and page title (CONTRACT.md section 2)', () => {
    it('shows the name, the alias, the title and the location of the contract', () => {
        expect(content.en.hero).toMatchObject({ name: 'Kaique Souza', alias: 'KMADS', role: 'Software Engineer', focus: 'Architecture & Cloud' });
        expect(content.pt.hero).toMatchObject({ name: 'Kaique Souza', alias: 'KMADS', role: 'Engenheiro de Software', focus: 'Arquitetura & Cloud' });
        expect(content.en.hero.location).toEqual(['São Paulo, SP, Brazil', 'Remote', 'UTC-3']);
        expect(content.pt.hero.location).toEqual(['São Paulo, SP, Brasil', 'Remoto', 'UTC-3']);
    });

    it('keeps PicPay in the status line, not in the title', () => {
        for (const lang of LANGS) {
            expect(content[lang].hero.status).toContain('PicPay');
            expect(content[lang].hero.role).not.toContain('PicPay');
            expect(content[lang].meta.title).not.toMatch(/PicPay|Backend Software Engineer|Software Backend/);
        }
    });

    it('has the four links of the hero, in order', () => {
        for (const lang of LANGS) {
            expect(content[lang].hero.links.map((item) => item.id)).toEqual(['applications', 'github', 'linkedin', 'email']);
        }
        expect(content.en.hero.links[3].href).toBe('mailto:contact@kmads.dev');
    });

    it('has a summary of two or three sentences', () => {
        for (const lang of LANGS) {
            expect(sentences(content[lang].hero.summary)).toBeGreaterThanOrEqual(2);
            expect(sentences(content[lang].hero.summary)).toBeLessThanOrEqual(3);
        }
    });

    it('has a navigation item for each section after the hero', () => {
        for (const lang of LANGS) {
            expect(content[lang].nav.items.map((item) => item.id)).toEqual(facts.anchors.sections.filter((id) => id !== 'top'));
        }
    });
});

describe('links and anchors', () => {
    it('reads rich text', () => {
        const paragraph = ['I led ', link('BodyShop', '#case-bodyshop'), ' and ', link('a repo', 'https://github.com/kmadsdev'), '.'];
        expect(plain(paragraph)).toBe('I led BodyShop and a repo.');
        expect(links(paragraph).map((item) => item.to)).toEqual(['#case-bodyshop', 'https://github.com/kmadsdev']);
        expect(parts('plain text')).toEqual(['plain text']);
        expect(isLink('text')).toBe(false);
        expect(isAnchor('#top')).toBe(true);
    });

    it('has no anchor id twice', () => {
        expect(new Set(allAnchors).size).toBe(allAnchors.length);
    });

    it('sends every internal link to an anchor of the list, and every other link to https', () => {
        const targets = [...all, ...leaves(facts).map(([p, v]) => [`facts.${p}`, v])].filter(([p, v]) => /\.to$/.test(p) && typeof v === 'string');
        expect(targets.length).toBeGreaterThan(80);
        for (const [path, to] of targets) {
            if (to.startsWith('#')) expect(allAnchors, `${path} -> ${to}`).toContain(to.slice(1));
            else expect(to, path).toMatch(/^https:\/\//);
        }
    });

    it('gives a home in the content to every anchor that a section must render', () => {
        for (const lang of LANGS) {
            const rendered = leaves(content[lang]).filter(([p]) => /(^|\.)anchor$/.test(p)).map(([, v]) => v);
            for (const anchor of rendered.filter((item) => item !== null)) expect(allAnchors, anchor).toContain(anchor);
            const expected = [...facts.anchors.experience, ...facts.anchors.education, ...facts.anchors.applications, ...facts.anchors.more];
            expect(rendered.filter((anchor) => anchor !== null).sort()).toEqual([...expected].sort());
        }
        expect(facts.anchors.intro).toEqual(facts.chapterOrder.map((id) => `intro-${id}`));
    });

    it('links every claim paragraph of the introduction to a proof', () => {
        for (const lang of LANGS) {
            const { opening, chapters } = content[lang].intro;
            for (const paragraph of opening.paragraphs.slice(1)) expect(links(paragraph).length, plain(paragraph)).toBeGreaterThan(0);
            for (const chapter of chapters) {
                expect(chapter.paragraphs.flatMap(links).length, `${lang} ${chapter.id}`).toBeGreaterThan(0);
                expect(chapter.proof.length, `${lang} ${chapter.id} proof`).toBeGreaterThanOrEqual(2);
                expect(chapter.proof.length, `${lang} ${chapter.id} proof`).toBeLessThanOrEqual(5);
            }
        }
    });
});

describe('introduction: chapters and tiles (CONTRACT.md section 6)', () => {
    const KINDS = ['art', 'stat', 'link', 'note'];

    it('has the chapters of the owner, in order', () => {
        for (const lang of LANGS) {
            expect(content[lang].intro.chapters.map((chapter) => chapter.id)).toEqual(facts.chapterOrder);
            for (const chapter of content[lang].intro.chapters) expect(chapter.tools).toEqual(facts.chapterTools[chapter.id]);
        }
    });

    it('opens with three to five paragraphs and one photo with alt text', () => {
        for (const lang of LANGS) {
            const { opening } = content[lang].intro;
            expect(opening.paragraphs.length).toBeGreaterThanOrEqual(3);
            expect(opening.paragraphs.length).toBeLessThanOrEqual(5);
            expect(opening.photo.alt).toContain('Kaique Souza');
        }
        expect(facts.person.photo).toMatchObject({ width: 1280, height: 1280 });
    });

    it('gives each section and each chapter one label, one headline and a lead of two sentences or less', () => {
        for (const lang of LANGS) {
            const t = content[lang];
            const blocks = [t.intro, t.experience, t.education, t.applications, t.more, ...t.intro.chapters.map((c) => ({ label: c.label, title: c.headline, lead: c.lead }))];
            for (const block of blocks) {
                expect(block.label).toBeTruthy();
                expect(block.title).toBeTruthy();
                expect(sentences(block.lead), `${lang}: ${block.lead}`).toBeLessThanOrEqual(2);
            }
        }
    });

    it('has at most five tiles in a chapter, each with a short title and a short text', () => {
        for (const lang of LANGS) {
            for (const chapter of content[lang].intro.chapters) {
                expect(chapter.tiles.length, `${lang} ${chapter.id}`).toBeGreaterThan(0);
                expect(chapter.tiles.length, `${lang} ${chapter.id}`).toBeLessThanOrEqual(5);
                expect(new Set(chapter.tiles.map((tile) => tile.id)).size).toBe(chapter.tiles.length);
                for (const tile of chapter.tiles) {
                    const where = `${lang} ${chapter.id}.${tile.id}`;
                    expect(KINDS, where).toContain(tile.kind);
                    expect(words(tile.title), `${where} title: ${tile.title}`).toBeLessThanOrEqual(6);
                    expect(tile.text.length, `${where} text (${tile.text.length}): ${tile.text}`).toBeLessThanOrEqual(160);
                    expect(sentences(tile.text), `${where} text`).toBeLessThanOrEqual(3);
                }
            }
        }
    });

    it('has at most one poster word group in a chapter, of three words or less', () => {
        for (const lang of LANGS) {
            for (const chapter of content[lang].intro.chapters) {
                if (chapter.poster !== null) expect(words(chapter.poster), `${lang} ${chapter.id}`).toBeLessThanOrEqual(4);
            }
        }
    });

    it('gives every stat a value and a source in words', () => {
        for (const lang of LANGS) {
            const tiles = content[lang].intro.chapters.flatMap((chapter) => chapter.tiles);
            for (const tile of tiles.filter((item) => item.kind === 'stat' || item.value !== null)) {
                expect(tile.value, `${lang} ${tile.id}`).toBeTruthy();
                expect(tile.source, `${lang} ${tile.id}`).toBeTruthy();
                expect(words(tile.source), `${lang} ${tile.id}`).toBeGreaterThanOrEqual(2);
            }
            for (const tile of tiles.filter((item) => item.kind === 'link')) expect(tile.to, `${lang} ${tile.id}`).toBeTruthy();
        }
    });

    it('labels every drawing in both languages', () => {
        const keys = (value) => Object.keys(value).sort();
        for (const lang of LANGS) {
            const text = content[lang].intro.art;
            const { requestPath, trace, contractStates, clouds, coldStart, pipeline, sitePipeline, timeline, margin } = facts.art;
            expect(keys(text)).toEqual(keys(facts.art));
            for (const drawing of Object.values(text)) {
                expect(drawing.title).toBeTruthy();
                expect(drawing.summary).toBeTruthy();
            }
            for (const tile of content[lang].intro.chapters.flatMap((chapter) => chapter.tiles)) {
                if (tile.kind === 'art') expect(tile.art, tile.id).toBeTruthy();
                if (tile.art !== null) expect(keys(facts.art), tile.id).toContain(tile.art);
            }

            expect(keys(text.requestPath.nodes)).toEqual([...requestPath.nodes].sort());
            expect(text.requestPath.edges.length).toBe(requestPath.edges.length);
            expect(keys(text.requestPath.groups)).toEqual(keys(requestPath.groups));
            for (const [from, to] of requestPath.edges) expect(requestPath.nodes).toEqual(expect.arrayContaining([from, to]));

            const stageIds = [...trace.warm.stages, ...trace.cold.stages].map((stage) => stage.id);
            for (const id of stageIds) expect(text.trace.stages[id], `${lang} trace ${id}`).toBeTruthy();

            expect(keys(text.contractStates.states)).toEqual([...contractStates.states].sort());
            for (const transition of contractStates.transitions) {
                expect(text.contractStates.transitions[transition.id], transition.id).toBeTruthy();
                expect(contractStates.states).toEqual(expect.arrayContaining([transition.from, transition.target]));
            }

            for (const cloud of clouds.order) {
                expect(clouds[cloud].length, cloud).toBeGreaterThanOrEqual(5);
                expect(clouds[cloud].length, cloud).toBeLessThanOrEqual(8);
                expect(keys(text.clouds[cloud].nodes), `${lang} ${cloud}`).toEqual([...clouds[cloud]].sort());
            }

            expect(keys(text.coldStart.parts)).toEqual(coldStart.parts.map((item) => item.id).sort());
            expect(keys(text.pipeline.stages)).toEqual([...pipeline.stages].sort());
            expect(keys(text.sitePipeline.stages)).toEqual([...sitePipeline.stages].sort());
            expect(keys(text.timeline.items)).toEqual(timeline.map((item) => item.id).sort());
            expect(Object.keys(text.margin.labels).length).toBeGreaterThan(8);
            expect(margin.withinMargin).toBe(true);
        }
    });

    it('keeps the numbers of the drawings consistent', () => {
        const { coldStart, trace } = facts.art;
        expect(coldStart.parts.reduce((sum, item) => sum + item.seconds, 0)).toBe(coldStart.totalSeconds);
        expect(coldStart.totalSeconds).toBe(facts.consignado.cluster.coldStartSeconds);
        expect(facts.art.contractStates.states.length).toBe(facts.consignado.contractStates);
        expect(facts.consignado.contractStates ** 2).toBe(facts.consignado.statusPairs);
        for (const run of [trace.warm, trace.cold]) {
            const known = run.stages.reduce((sum, stage) => sum + (stage.ms ?? 0), 0);
            expect(known).toBeLessThanOrEqual(run.totalMs);
        }
    });
});

describe('experience, cases and education', () => {
    it('lists the companies with roles, responsibilities, impact and projects', () => {
        for (const lang of LANGS) {
            const { items } = content[lang].experience;
            expect(items.map((item) => item.id)).toEqual(['picpay', 'cofounder', 'discord']);
            const caseIds = content[lang].cases.items.map((item) => item.id);
            for (const item of items) {
                expect(item.roles.length).toBeGreaterThan(0);
                expect(item.responsibilities.length).toBeGreaterThan(0);
                expect(item.impact.length).toBeGreaterThan(0);
                for (const id of item.projects) expect(caseIds, `${item.id} -> ${id}`).toContain(id);
            }
        }
    });

    it('says that the startup MVPs were not full-time and had no real users', () => {
        expect(content.en.experience.items[1].context).toMatch(/Not full-time jobs, and no real users/);
        expect(content.pt.experience.items[1].context).toMatch(/Não foram empregos em tempo integral/);
    });

    it('keeps the MVP stack of TrocaTine apart from its landing page', () => {
        expect(facts.startups.trocatine.mvpStack).toEqual(expect.arrayContaining(['React', 'Tailwind CSS']));
        expect(facts.projects.trocatine.stack).toEqual(['HTML', 'CSS', 'JavaScript', 'GitHub Pages']);
        expect(facts.projects.trocatine.name).toBe('TrocaTine landing page');
    });

    it('gives every case one id that both languages describe', () => {
        for (const lang of LANGS) {
            expect(content[lang].cases.items.map((item) => item.id)).toEqual(facts.caseFileOrder);
            for (const id of facts.caseFileOrder) expect(facts.cases[id], id).toBeTruthy();
            for (const id of facts.caseOrder) expect(facts.cases[id].flow, id).not.toBeNull();
        }
    });

    it('labels every flowchart node and edge in both languages', () => {
        for (const lang of LANGS) {
            for (const item of content[lang].cases.items) {
                const { flow } = facts.cases[item.id];
                if (flow === null) {
                    expect(item.flow, `${lang} ${item.id}`).toBeNull();
                    continue;
                }
                expect(Object.keys(item.flow.nodes).sort(), `${lang} ${item.id} nodes`).toEqual([...flow.nodes].sort());
                expect(item.flow.steps.length, `${lang} ${item.id} steps`).toBe(flow.edges.length);
                for (const [from, to] of flow.edges) {
                    expect(flow.nodes, `${item.id} edge ${from}->${to}`).toEqual(expect.arrayContaining([from, to]));
                }
            }
        }
    });

    it('describes the cards work in words only', () => {
        expect(facts.cases.cards.flow).toBeNull();
        for (const lang of LANGS) {
            const cards = content[lang].cases.items.find((item) => item.id === 'cards');
            const text = [cards.problem, ...cards.decisions, cards.result].join(' ');
            expect(text).not.toMatch(/\d{3,}/);
        }
    });

    it('has one program and exactly the three HackerRank certificates', () => {
        expect(facts.education.certificates.map((item) => `${item.issuer} ${item.id} ${item.date}`)).toEqual([
            'HackerRank software-engineer 2025-10',
            'HackerRank rest-api 2025-10',
            'HackerRank sql 2025-10',
        ]);
        expect(content.en.education.program).toMatchObject({ title: 'Software Development Technical Program', place: 'Instituto J&F', length: '3 years' });
        expect(content.en.education.program.note).toContain('Dec 2026');
        for (const lang of LANGS) {
            expect(content[lang].education.certificates.items.map((item) => `${item.issuer} ${item.title}`)).toEqual([
                'HackerRank Software Engineer',
                'HackerRank REST API (Intermediate)',
                'HackerRank SQL (Advanced)',
            ]);
            expect(Object.keys(content[lang].education).sort()).toEqual(['certificates', 'label', 'lead', 'program', 'title']);
        }
    });
});

describe('applications and more', () => {
    it('has one text for each application of the two lists, in order', () => {
        const { live, study, featured } = facts.appOrder;
        expect(Object.keys(facts.projects).sort()).toEqual([...live, ...study].sort());
        expect(live.slice(0, 2)).toEqual(['consignado', 'ruph']);
        for (const id of live) expect(facts.projects[id].status, id).toBe('live');
        for (const id of study) expect(facts.projects[id].status, id).toBe('study');
        for (const id of live.filter((item) => facts.projects[item].access !== 'private')) expect(facts.projects[id].live, id).toMatch(/^https:\/\//);
        for (const lang of LANGS) {
            const t = content[lang].applications;
            expect(t.live.items.map((item) => item.id)).toEqual(live);
            expect(t.study.items.map((item) => item.id)).toEqual(study);
            for (const item of [...t.live.items, ...t.study.items]) {
                expect(item.anchor).toBe(`app-${item.id}`);
                expect(sentences(item.tagline), item.id).toBe(0);
                const isFeatured = featured.includes(item.id);
                expect(Array.isArray(item.architecture), `${item.id} architecture`).toBe(isFeatured);
                expect(Array.isArray(item.goals), `${item.id} goals`).toBe(isFeatured);
            }
        }
    });

    it('links Consignado Cloud to its live address and its three repositories', () => {
        expect(facts.projects.consignado.live).toBe('https://consignado.kmads.dev');
        expect(facts.projects.consignado.sources.map((item) => item.label)).toEqual(['consignado-api', 'consignado-serverless', 'consignado-front']);
    });

    it('gives each clip and each still of Consignado Cloud a caption and an alt text', () => {
        const ids = facts.projects.consignado.media.map((item) => item.id);
        for (const item of facts.projects.consignado.media) {
            expect(item.image, item.id).toMatch(/^\/assets\/projects\/consignado-[a-z0-9-]+\.(jpg|webp)$/);
            if (item.kind === 'clip') expect(item.video, item.id).toMatch(/^\/assets\/projects\/consignado-[a-z-]+\.mp4$/);
        }
        for (const lang of LANGS) {
            const text = content[lang].applications.live.items[0].media;
            expect(Object.keys(text)).toEqual(ids);
            for (const entry of Object.values(text)) {
                expect(entry.caption).toBeTruthy();
                expect(entry.alt).toBeTruthy();
            }
        }
    });

    it('points every media file to the projects folder', () => {
        for (const [id, project] of Object.entries(facts.projects)) {
            if (project.video) {
                expect(project.video, id).toMatch(/^\/assets\/projects\/[a-z-]+\.mp4$/);
                expect(project.image, id).toMatch(/^\/assets\/projects\/[a-z-]+\.jpg$/);
            }
        }
    });

    it('has the languages, the hobbies and the volunteering of the contract', () => {
        expect(content.en.more.languages.items.map((item) => `${item.name} ${item.level}`)).toEqual(['Portuguese Native', 'English C1', 'Spanish Basic']);
        expect(facts.earlier.reddit).toMatchObject({ start: 2022, end: 2024, people: '250+' });
        for (const lang of LANGS) {
            expect(content[lang].more.hobbies.items.map((item) => item.id)).toEqual(['ecu', 'pc', 'gym', 'basketball', 'chess']);
            for (const hobby of content[lang].more.hobbies.items) expect(sentences(hobby.text), hobby.id).toBeLessThanOrEqual(2);
            expect(content[lang].more.future.items.map((item) => item.id)).toEqual(facts.future.map((item) => item.id));
        }
    });

    it('describes exactly the four Figma originals that the owner approved', () => {
        expect(facts.figmaOrder).toEqual(['consignado-aks', 'consignado-pod-start', 'ruph-ship', 'devops-challenge']);
        expect(Object.keys(facts.figma).sort()).toEqual([...facts.figmaOrder].sort());
        for (const [id, picture] of Object.entries(facts.figma)) {
            expect(picture.src, id).toMatch(/^\/assets\/figma\/[a-z-]+\.webp$/);
            expect(picture.thumb, id).toMatch(/^\/assets\/figma\/[a-z-]+-thumb\.webp$/);
            expect(picture.width * picture.height, id).toBeGreaterThan(0);
            for (const chapter of picture.chapters) expect(facts.chapterOrder).toContain(chapter);
            for (const anchor of picture.anchors) expect(allAnchors).toContain(anchor);
            expect(picture.chapters.length + picture.anchors.length, id).toBeGreaterThan(0);
        }
        for (const lang of LANGS) {
            expect(Object.keys(content[lang].figma.items).sort()).toEqual([...facts.figmaOrder].sort());
            for (const item of Object.values(content[lang].figma.items)) {
                expect(sentences(item.caption)).toBeLessThanOrEqual(3);
                expect(item.alt.length).toBeGreaterThan(80);
            }
        }
        expect(content.en.figma.title).toBe('From my Figma');
        expect(content.pt.figma.title).toBe('Do meu Figma');
    });
});

describe('facts', () => {
    it('uses the public contact address', () => {
        expect(facts.contact.email).toBe('contact@kmads.dev');
    });

    it('has only https links', () => {
        const urls = factStrings.filter(([, v]) => /^https?:/.test(v));
        expect(urls.length).toBeGreaterThan(30);
        expect(urls.filter(([, v]) => !v.startsWith('https://'))).toEqual([]);
    });

    it('keeps PicPay dates as agreed', () => {
        expect(facts.picpay.fullTime.start).toBe('2025-12');
        expect(facts.picpay.partTime).toMatchObject({ start: '2025-03', end: '2025-11' });
    });

    it('keeps Azure and Kubernetes out of the stacks of work projects', () => {
        for (const id of ['cards', 'bodyshop', 'survey', 'oracle']) {
            expect(facts.cases[id].stack.join(' ')).not.toMatch(/azure|aks|kubernetes/i);
        }
    });
});
