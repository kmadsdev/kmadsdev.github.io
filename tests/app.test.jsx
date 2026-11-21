// @vitest-environment jsdom
// Page tests. They check stable facts (ids, addresses, text in the DOM, names
// of controls, the heading outline), not the layout, so that a section can change its form.
// The top bar, the hero badge, the rulers and the music player are tested in tests/shell.test.jsx.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App.jsx';
import { LanguageProvider } from '../src/i18n/LanguageProvider.jsx';
import { DRAWINGS } from '../src/components/intro/IntroChapter.jsx';
import { anchors, art, content, links, meta, person, projects } from '../src/content/index.js';
import { isLink, parts, plain } from '../src/content/rich.js';

const SECTIONS = anchors.sections;
const LANGS = ['en', 'pt'];
const HTML_LANG = { en: 'en', pt: 'pt-BR' };

function open(url = '/') {
    window.history.replaceState(null, '', url);
    return render(<App />);
}

/** The visible pieces of a rich text: each text part and each link text. */
function pieces(text) {
    return parts(text)
        .map((part) => (typeof part === 'string' ? part : part.text).trim())
        .filter(Boolean);
}

/** Text that must be in the DOM (also inside closed disclosures), with a name for the failure message. */
function expectedText(t) {
    const out = [];
    const add = (where, value) => out.push([where, value]);
    const rich = (where, value) => pieces(value).forEach((piece) => add(where, piece));

    add('intro.title', t.intro.title);
    add('intro.lead', t.intro.lead);
    add('intro.opening.title', t.intro.opening.title);
    t.intro.opening.paragraphs.forEach((p, i) => rich(`intro.opening.paragraphs[${i}]`, p));
    for (const chapter of t.intro.chapters) {
        const at = `intro.${chapter.id}`;
        add(`${at}.label`, chapter.label);
        add(`${at}.headline`, chapter.headline);
        if (chapter.lead) rich(`${at}.lead`, chapter.lead);
        chapter.paragraphs.forEach((p, i) => rich(`${at}.paragraphs[${i}]`, p));
        (chapter.story ?? []).forEach((p, i) => rich(`${at}.story[${i}]`, p));
        for (const drawing of chapter.drawings) {
            add(`${at}.drawings.${drawing.id}.title`, drawing.title);
            add(`${at}.drawings.${drawing.id}.text`, drawing.text);
        }
        for (const stat of chapter.stats) {
            add(`${at}.stats.${stat.id}.value`, stat.value);
            add(`${at}.stats.${stat.id}.title`, stat.title);
            add(`${at}.stats.${stat.id}.source`, stat.source);
        }
        for (const proof of chapter.proof) add(`${at}.proof`, proof.label);
    }
    for (const item of Object.values(t.intro.art.timeline.items)) {
        rich('intro.art.timeline.label', item.label);
        add('intro.art.timeline.text', item.text);
    }

    add('experience.title', t.experience.title);
    for (const item of t.experience.items) {
        const at = `experience.${item.id}`;
        add(`${at}.company`, item.company);
        rich(`${at}.context`, item.context);
        for (const list of ['impact', 'currentResponsibilities', 'previousResponsibilities']) {
            (item[list] ?? []).forEach((line, i) => add(`${at}.${list}[${i}]`, line));
        }
        for (const row of item.timeline) {
            add(`${at}.timeline.period`, row.period);
            add(`${at}.timeline.title`, row.title);
            add(`${at}.timeline.note`, row.note);
        }
        for (const link of item.links) add(`${at}.links`, link.label);
    }
    for (const item of t.cases.items) {
        const at = `cases.${item.id}`;
        add(`${at}.title`, item.title);
        add(`${at}.problem`, item.problem);
        item.decisions.forEach((line, i) => add(`${at}.decisions[${i}]`, line));
        add(`${at}.result`, item.result);
        if (item.flow) item.flow.steps.forEach((step, i) => add(`${at}.flow.steps[${i}]`, step));
    }

    const { program, certificates } = t.education;
    for (const value of [t.education.title, program.period, program.title, program.place, ...program.subjects, certificates.title, certificates.note, ...Object.values(certificates.dates)]) {
        add('education', value);
    }

    const a = t.applications;
    for (const group of ['production', 'other', 'study']) {
        add(`applications.${group}.title`, a[group].title);
        for (const item of a[group].items) {
            const at = `applications.${item.id}`;
            add(`${at}.name`, projects[item.id].name);
            if (item.tagline) add(`${at}.tagline`, item.tagline);
            (item.paragraphs ?? []).forEach((p, i) => add(`${at}.paragraphs[${i}]`, p));
            (item.architecture ?? []).forEach((line) => add(`${at}.architecture`, line));
            (item.goals ?? []).forEach((line) => add(`${at}.goals`, line));
            if (item.text) add(`${at}.text`, item.text);
            if (item.line) add(`${at}.line`, item.line);
            if (projects[item.id].repoName) add(`${at}.repoName`, projects[item.id].repoName);
        }
    }
    rich('applications.more', a.more);

    const h = t.hobbies;
    for (const value of [h.title, h.lead, h.volunteering.title, h.volunteering.value, h.volunteering.line, h.volunteering.role, h.volunteering.text, h.volunteering.peek.text, h.list.title, h.languages.title, h.future.title]) {
        add('hobbies', value);
    }
    for (const item of h.list.items) {
        add('hobbies.list.name', item.name);
        rich('hobbies.list.text', item.text);
    }
    for (const item of h.languages.items) {
        add('hobbies.languages.name', item.name);
        add('hobbies.languages.level', item.level);
        if (item.study) add('hobbies.languages.study', item.study);
    }
    for (const item of h.future.items) {
        add('hobbies.future.name', item.name);
        add('hobbies.future.text', item.text);
    }

    const c = t.contact;
    for (const value of [c.title, ...c.lead, c.emailCta, c.copy, c.top, links.email, links.linkedinHandle, links.githubHandle]) add('contact', value);
    for (const value of [t.footer.credit, t.footer.top, t.footer.source]) add('footer', value);
    return out;
}

beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
});
afterEach(cleanup);

describe('the page in each language', () => {
    for (const lang of LANGS) {
        const t = content[lang];

        it(`sets the language, keeps the English title, and shows the seven sections in ${lang}`, () => {
            open(`/?lang=${lang}`);
            expect(document.documentElement.lang).toBe(HTML_LANG[lang]);
            for (const id of SECTIONS) expect(document.getElementById(id), id).toBeTruthy();
        });

        it(`renders each anchor id exactly once in ${lang}`, () => {
            open(`/?lang=${lang}`);
            for (const [group, ids] of Object.entries(anchors)) {
                for (const id of ids) {
                    expect(document.querySelectorAll(`[id="${id}"]`).length, `${group}: #${id}`).toBe(1);
                }
            }
        });

        it(`has every text in the DOM, also inside closed disclosures, in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            const text = container.textContent.replace(/\s+/g, ' ');
            const missing = expectedText(t).filter(([, value]) => !text.includes(String(value).replace(/\s+/g, ' ')));
            expect(missing.map(([where, value]) => `${where}: ${value}`)).toEqual([]);
        });

        it(`has one h1 (the name), an h2 per section and no level jump in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            const headings = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')];
            const h1 = headings.filter((el) => el.tagName === 'H1');
            expect(h1.length).toBe(1);
            expect(h1[0].textContent.replace(/\s+/g, ' ').trim()).toBe(person.name);
            for (const id of SECTIONS.filter((section) => section !== 'top')) {
                expect(document.getElementById(id).querySelector('h2'), id).toBeTruthy();
            }
            const jumps = [];
            headings.reduce((before, el) => {
                const level = Number(el.tagName[1]);
                if (level > before + 1) jumps.push(`${el.tagName} after h${before}: ${el.textContent.slice(0, 60)}`);
                return level;
            }, 0);
            expect(jumps).toEqual([]);
        });

        it(`ends no heading with a full stop in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            const stops = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')]
                .map((el) => el.textContent.trim())
                .filter((text) => /\.$/.test(text));
            expect(stops).toEqual([]);
        });

        it(`shows the opening with no label, six paragraphs and their bold first words in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            const heading = within(container.querySelector('#intro')).getByRole('heading', { level: 3, name: t.intro.opening.title });
            expect(heading.previousElementSibling).toBeNull();
            const paragraphs = container.querySelectorAll('.intro-opening__text p');
            expect(paragraphs.length).toBe(6);
            // The card "My latest work" stands in the opening, with its diagram and the link to the source.
            const card = container.querySelector('.intro-opening .latest-work');
            expect(within(card).getByRole('heading', { level: 4, name: t.intro.opening.latest.title })).toBeTruthy();
            expect(within(card).getByRole('img', { name: t.intro.opening.latest.diagramAlt })).toBeTruthy();
            expect(card.querySelector('a[href="https://github.com/kmadsdev/consignado-api"]')).toBeTruthy();
            // "Hire me" in the top bar goes to LinkedIn.
            const hire = container.querySelector('.site-header .site-hire');
            expect(hire.textContent).toContain(t.nav.hire);
            expect(hire.getAttribute('href')).toMatch(/linkedin\.com\/in\//);
            paragraphs.forEach((p, i) => expect(p.querySelector('strong')?.textContent, `paragraph ${i}`).toBe(t.intro.opening.paragraphs[i][0].text));
        });

        it(`shows number rows and "Read the full story" only where the data has them in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            for (const chapter of t.intro.chapters) {
                const box = container.querySelector(`#intro-${chapter.id}`);
                expect(box.querySelectorAll('.intro-fact').length, chapter.id).toBe(chapter.stats.length);
                const story = box.querySelector('details.intro-story');
                expect(Boolean(story), chapter.id).toBe(Boolean(chapter.story?.length));
                if (story) expect(story.querySelector('summary').textContent).toContain(t.controls.readMore);
            }
        });
    }
});

describe('index.html', () => {
    it('has the English metadata of contents.global.js before the script runs', async () => {
        const { fillIndexHtml } = await import('../scripts/index-html.mjs');
        const template = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8'); // vitest runs from the repository root
        const global = await import('../src/content/contents.global.js');
        const html = fillIndexHtml(template, { global, en: content.en, pt: content.pt });
        expect(html).not.toMatch(/\{\{/);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const value = (selector) => doc.querySelector(selector)?.getAttribute('content');
        expect(doc.title).toBe(meta.title);
        expect(value('meta[name="description"]')).toBe(meta.description);
        expect(value('meta[property="og:title"]')).toBe(meta.title);
        expect(value('meta[property="og:locale"]')).toBe(meta.openGraph.locale);
        expect(value('meta[name="viewport"]')).toContain('viewport-fit=cover');
    });
});

describe('language toggle', () => {
    it('changes the page to Portuguese and saves the choice', () => {
        open('/');
        expect(document.documentElement.lang).toBe('en');
        fireEvent.click(screen.getByRole('button', { name: /PT/ }));
        expect(document.documentElement.lang).toBe('pt-BR');
        expect(document.querySelector('#intro').textContent).toContain(content.pt.intro.title);
        expect(window.localStorage.getItem('kmads.lang')).toBe('pt');
    });

    it('removes ?lang= from the address after a manual change', () => {
        open('/?lang=pt#exp-picpay');
        fireEvent.click(screen.getByRole('button', { name: /EN/ }));
        expect(window.location.search).toBe('');
        expect(window.location.hash).toBe('#exp-picpay');
    });
});

describe('the /projects address', () => {
    it('renders the full page on a direct visit to /projects', () => {
        open(links.projectsPath);
        expect(screen.getByRole('heading', { level: 1 }).textContent.replace(/\s+/g, ' ').trim()).toBe(person.name);
        for (const id of SECTIONS) expect(document.getElementById(id), id).toBeTruthy();
        expect(document.getElementById(links.projectsSection)).toBeTruthy();
    });

    it('sends the nav item "Applications" to /projects with no reload', () => {
        open('/');
        const nav = screen.getByRole('navigation', { name: content.en.nav.menu });
        const a = within(nav).getByRole('link', { name: content.en.nav.items.find((item) => item.id === 'applications').label });
        expect(a.getAttribute('href')).toBe(links.projectsPath);
        expect(fireEvent.click(a)).toBe(false); // false: the default (a page load) was prevented
        expect(window.location.pathname).toBe(links.projectsPath);
    });
});

describe('drawings', () => {
    it('has a component for each drawing that a chapter uses, and no other', () => {
        const used = [...new Set(content.en.intro.chapters.flatMap((chapter) => chapter.drawings.map((drawing) => drawing.art)))];
        expect(Object.keys(DRAWINGS).sort()).toEqual(used.sort());
        for (const key of used) expect(art[key], key).toBeTruthy();
    });

    for (const lang of LANGS) {
        const text = content[lang].intro.art;

        for (const [key, Drawing] of Object.entries(DRAWINGS)) {
            it(`renders ${key} with an accessible name in ${lang}`, () => {
                window.history.replaceState(null, '', `/?lang=${lang}`);
                const { container } = render(<LanguageProvider><Drawing /></LanguageProvider>);
                expect(container.querySelector('svg'), key).toBeTruthy();
                if (key === 'timeline') {
                    // An HTML list on top of a decorative drawing. The labels hold links to the proof.
                    const list = screen.getByRole('list', { name: text.timeline.title });
                    const hrefs = within(list).getAllByRole('link').map((a) => a.getAttribute('href'));
                    const targets = Object.values(text.timeline.items).flatMap((item) => parts(item.label).filter(isLink).map((part) => part.to));
                    for (const to of targets) expect(hrefs).toContain(to);
                } else {
                    expect(screen.getByRole('img', { name: text[key].summary })).toBeTruthy();
                }
            });
        }

        it(`draws the nine nodes and the two frames of the request path in ${lang}`, () => {
            window.history.replaceState(null, '', `/?lang=${lang}`);
            const { container } = render(<LanguageProvider><DRAWINGS.requestPath /></LanguageProvider>);
            const names = [...container.querySelectorAll('.art-name')].map((el) => el.textContent.replace(/\s+/g, ' ').trim());
            for (const id of art.requestPath.nodes) expect(names.join(' | '), id).toContain(text.requestPath.nodes[id].label.split(' ')[0]);
            expect(container.querySelectorAll('.rp-frame').length).toBe(art.requestPath.frames.length);
            expect(container.querySelectorAll('.art-wire').length).toBe(art.requestPath.edges.length);
        });

        it(`gives each picture on the page a name in ${lang}`, () => {
            open(`/?lang=${lang}`);
            const pictures = screen.getAllByRole('img');
            expect(pictures.length).toBeGreaterThan(0);
            for (const el of pictures) {
                const name = el.getAttribute('aria-label') ?? el.getAttribute('alt') ?? '';
                expect(name.trim(), el.outerHTML.slice(0, 120)).not.toBe('');
            }
        });
    }
});

describe('status marks', () => {
    it('has no status dot, status chip or corner pin, and no "Live" or "Private source" mark', () => {
        const { container } = open('/');
        expect(container.querySelectorAll('.status-dot, .app-status, .art-pin, .wh-flow__pin, [data-pin], .app-links__private').length).toBe(0);
        for (const lang of LANGS) {
            const { labels } = content[lang].applications;
            const marks = [...container.querySelectorAll('#applications .wh-label, #applications .status')].map((el) => el.textContent.trim());
            expect(marks).not.toContain(labels.privateSource);
        }
        // "Current" stays a word on the present role, with no dot beside it.
        for (const now of container.querySelectorAll('.xp-role__now')) expect(now.children.length).toBe(0);
    });

    it('shows no board mark, no numbered prefix and no gallery counter (owner, 2026-11-21)', () => {
        for (const lang of LANGS) {
            const { container } = open(`/?lang=${lang}`);
            expect(container.textContent).not.toMatch(/\b(D|U|TP|DS|RN|J)\d{2}\b/);
            for (const label of container.querySelectorAll('.tile__label, .wh-flow__title, .intro-figure__title')) {
                expect(label.textContent.trim(), label.textContent).not.toMatch(/^\d|·/);
            }
            expect(container.querySelectorAll('.gallery__count').length).toBe(0);
            expect(container.querySelectorAll('ol.xp-case__decisions').length).toBe(0);
            cleanup();
        }
    });

    it('gives a private project no "Open live" button', () => {
        const { container } = open('/');
        const ruph = container.querySelector('#app-ruph');
        expect(within(ruph).queryByRole('link', { name: new RegExp(content.en.applications.labels.live) })).toBeNull();
    });
});

describe('links', () => {
    it('uses mailto for the e-mail address, with the address as the main object of the contact', () => {
        const { container } = open('/');
        const mail = [...container.querySelectorAll(`#contact a[href="mailto:${links.email}"]`)];
        expect(mail.length).toBe(2);
        expect(mail.map((a) => a.textContent)).toContain(links.email);
    });

    it('opens external links in a new tab without window.opener', () => {
        const { container } = open('/');
        const external = [...container.querySelectorAll('a[href^="https:"]')];
        expect(external.length).toBeGreaterThan(20);
        for (const a of external) {
            expect(a.getAttribute('target'), a.href).toBe('_blank');
            expect(a.getAttribute('rel'), a.href).toContain('noopener');
        }
    });

    it('sends every link on this page to an anchor that exists', () => {
        const { container } = open('/');
        const missing = [...container.querySelectorAll('a[href^="#"]')]
            .map((a) => a.getAttribute('href').slice(1))
            .filter((id) => !document.getElementById(id));
        expect([...new Set(missing)]).toEqual([]);
    });

    it('has a footer in three parts: the build year and the credit, back to the top, the source code', () => {
        const { container } = open('/');
        const row = container.querySelector('.site-footer .footer-row');
        expect(row.children.length).toBe(3);
        expect(row.children[0].textContent).toMatch(new RegExp(`^© \\d{4} ${content.en.footer.credit.replace(/\./g, '\\.')}$`));
        expect(row.children[1].querySelector('a').getAttribute('href')).toBe(links.main);
        expect(row.children[2].querySelector('a').getAttribute('href')).toBe(links.repo);
        expect(within(row.children[2]).getByRole('img', { name: content.en.footer.githubMark })).toBeTruthy();
    });
});

describe('project clips', () => {
    const withVideo = Object.entries(projects).filter(([, data]) => data.video);

    it('never plays a clip with the autoplay attribute', () => {
        const { container } = open('/');
        expect(container.querySelectorAll('video[autoplay]').length).toBe(0);
        for (const video of container.querySelectorAll('video')) {
            expect(video.getAttribute('preload')).toBe('none');
            expect(video.muted).toBe(true);
            expect(video.hasAttribute('playsinline')).toBe(true);
        }
    });

    for (const lang of LANGS) {
        const { labels } = content[lang].applications;

        it(`gives each clip a play button with a name in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            const buttons = [...container.querySelectorAll('.clip button')];
            expect(buttons.length).toBeGreaterThanOrEqual(withVideo.length);
            const names = buttons.map((button) => button.getAttribute('aria-label') ?? '');
            for (const name of names) expect(name.startsWith(labels.playClip) || name.startsWith(labels.pauseClip), name).toBe(true);
            for (const [id, data] of withVideo) expect(names.some((name) => name.includes(data.name)), id).toBe(true);
        });
    }

    it('shows no picture in a study card', () => {
        const { container } = open('/');
        const cards = container.querySelectorAll(`#${content.en.applications.study.anchor} .study__card`);
        expect(cards.length).toBe(content.en.applications.study.items.length);
        for (const card of cards) expect(card.querySelectorAll('img, video, .clip').length).toBe(0);
        expect(plain(content.en.applications.more)).toBeTruthy();
    });
});
