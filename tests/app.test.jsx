// @vitest-environment jsdom
// Page tests. They check stable facts (ids, addresses, text in the DOM, names
// of controls), not the layout, so that a section can change its form.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App.jsx';
import { LanguageProvider } from '../src/i18n/LanguageProvider.jsx';
import { artA } from '../src/components/intro/artA.js';
import { artB } from '../src/components/intro/artB.js';
import { content, facts } from '../src/content/index.js';
import { isLink, parts } from '../src/content/rich.js';

const SECTIONS = ['top', 'intro', 'experience', 'education', 'applications', 'more', 'contact'];
const LANGS = ['en', 'pt'];

function open(url = '/') {
    window.history.replaceState(null, '', url);
    return render(<App />);
}

/** The visible pieces of a rich paragraph: each text part and each link text. */
function pieces(paragraph) {
    return parts(paragraph)
        .map((part) => (isLink(part) ? part.text : part).trim())
        .filter(Boolean);
}

/** Text that must be in the DOM, with a name for the failure message. */
function expectedText(t) {
    const out = [];
    const add = (where, value) => out.push([where, value]);

    t.intro.opening.paragraphs.forEach((p, i) => pieces(p).forEach((piece) => add(`intro.opening.paragraphs[${i}]`, piece)));
    for (const chapter of t.intro.chapters) {
        add(`intro.${chapter.id}.headline`, chapter.headline);
        add(`intro.${chapter.id}.lead`, chapter.lead);
    }

    for (const item of t.experience.items) add(`experience.${item.id}.company`, item.company);
    for (const item of t.cases.items) {
        add(`cases.${item.id}.title`, item.title);
        add(`cases.${item.id}.problem`, item.problem);
        add(`cases.${item.id}.result`, item.result);
        if (item.flow) item.flow.steps.forEach((step, i) => add(`cases.${item.id}.flow.steps[${i}]`, step));
    }

    add('education.program.title', t.education.program.title);
    for (const cert of t.education.certificates.items) add(`education.certificates.${cert.id}`, cert.title);

    for (const list of [t.applications.live, t.applications.study]) {
        for (const item of list.items) {
            add(`applications.${item.id}.name`, facts.projects[item.id].name);
            add(`applications.${item.id}.tagline`, item.tagline);
        }
    }

    for (const hobby of t.more.hobbies.items) {
        add(`more.hobbies.${hobby.id}.title`, hobby.title);
        add(`more.hobbies.${hobby.id}.text`, hobby.text);
    }
    for (const language of t.more.languages.items) {
        add(`more.languages.${language.id}.name`, language.name);
        add(`more.languages.${language.id}.level`, language.level);
    }
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

        it(`sets the title and the language, and shows the seven sections in ${lang}`, () => {
            open(`/?lang=${lang}`);
            expect(document.documentElement.lang).toBe(t.meta.htmlLang);
            expect(document.title).toBe(t.meta.title);
            expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(t.hero.name);
            for (const id of SECTIONS) expect(document.getElementById(id), id).toBeTruthy();
        });

        it(`renders each anchor id exactly once in ${lang}`, () => {
            open(`/?lang=${lang}`);
            for (const [group, ids] of Object.entries(facts.anchors)) {
                for (const id of ids) {
                    expect(document.querySelectorAll(`[id="${id}"]`).length, `${group}: #${id}`).toBe(1);
                }
            }
        });

        it(`has every text in the DOM, also inside closed disclosures, in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            const text = container.textContent;
            const missing = expectedText(t).filter(([, value]) => !text.includes(value));
            expect(missing.map(([where, value]) => `${where}: ${value}`)).toEqual([]);
        });
    }
});

describe('index.html', () => {
    it('has the English title and description of content.en.meta before the script runs', async () => {
        // index.html holds placeholders. The Vite plugin of scripts/index-html.mjs fills them
        // from the content file in `npm run dev` and `npm run build`: check its output.
        const { fillIndexHtml } = await import('../scripts/index-html.mjs');
        const template = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8'); // vitest runs from the repository root
        const html = fillIndexHtml(template, await import('../src/content/index.js'));
        expect(html).not.toMatch(/\{\{/);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const meta = (selector) => doc.querySelector(selector)?.getAttribute('content');
        const { title, description, ogLocale } = content.en.meta;
        expect(doc.title).toBe(title);
        expect(meta('meta[property="og:title"]')).toBe(title);
        expect(meta('meta[name="twitter:title"]')).toBe(title);
        expect(meta('meta[name="description"]')).toBe(description);
        expect(meta('meta[property="og:description"]')).toBe(description);
        expect(meta('meta[name="twitter:description"]')).toBe(description);
        expect(meta('meta[property="og:locale"]')).toBe(ogLocale);
    });
});

describe('language toggle', () => {
    it('changes the page to Portuguese and saves the choice', () => {
        open('/');
        expect(document.documentElement.lang).toBe('en');
        fireEvent.click(screen.getByRole('button', { name: /PT/ }));
        expect(document.documentElement.lang).toBe('pt-BR');
        expect(document.querySelector('#top').textContent).toContain(content.pt.hero.role);
        expect(window.localStorage.getItem('kmads.lang')).toBe('pt');
        expect(screen.getByRole('button', { name: /PT/ }).getAttribute('aria-pressed')).toBe('true');
        expect(screen.getByRole('button', { name: /EN/ }).getAttribute('aria-pressed')).toBe('false');
    });

    it('starts in the saved language', () => {
        window.localStorage.setItem('kmads.lang', 'pt');
        open('/');
        expect(document.documentElement.lang).toBe('pt-BR');
    });

    it('removes ?lang= from the address after a manual change', () => {
        open('/?lang=pt#exp-picpay');
        fireEvent.click(screen.getByRole('button', { name: /EN/ }));
        expect(window.location.search).toBe('');
        expect(window.location.hash).toBe('#exp-picpay');
    });
});

describe('hero', () => {
    for (const lang of LANGS) {
        const { hero } = content[lang];

        it(`shows the name, the role, the place and the four links in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            const top = container.querySelector('#top');
            for (const text of [hero.status, hero.alias, hero.role, hero.focus, hero.summary, ...hero.location]) {
                expect(top.textContent).toContain(text);
            }
            expect(hero.links.map((link) => link.id)).toEqual(['applications', 'github', 'linkedin', 'email']);
            for (const link of hero.links) {
                const a = within(top).getByRole('link', { name: new RegExp(`^${link.label}`) });
                expect(a.getAttribute('href')).toBe(link.href);
            }
        });
    }

    it('has one theme and no theme switch', () => {
        const { container } = open('/');
        expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
        expect(container.querySelector('.theme-toggle')).toBeNull();
    });

    it('lets the visitor stop the turning badge', () => {
        open('/');
        const badge = screen.getByRole('button', { name: content.en.controls.stopBadge });
        fireEvent.click(badge);
        expect(screen.getByRole('button', { name: content.en.controls.playBadge }).dataset.spin).toBe('off');
    });
});

describe('top bar', () => {
    it('opens and closes the section links with the menu button', () => {
        open('/');
        const button = screen.getByRole('button', { name: content.en.nav.open });
        expect(button.getAttribute('aria-expanded')).toBe('false');
        fireEvent.click(button);
        expect(screen.getByRole('button', { name: content.en.nav.close }).getAttribute('aria-expanded')).toBe('true');
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(screen.getByRole('button', { name: content.en.nav.open }).getAttribute('aria-expanded')).toBe('false');
    });
});

describe('the /projects address', () => {
    const nav = () => screen.getByRole('navigation', { name: content.en.nav.menu });

    it('gives each nav item a section that exists', () => {
        open('/');
        const links = within(nav()).getAllByRole('link');
        expect(links.map((a) => a.textContent)).toEqual(content.en.nav.items.map((item) => item.label));
        for (const a of links) {
            const href = a.getAttribute('href');
            const id = href === '/projects' ? 'applications' : href.replace(/^#/, '');
            expect(document.getElementById(id), href).toBeTruthy();
        }
    });

    it('sends the nav item "Applications" to /projects with no reload', () => {
        open('/');
        const a = within(nav()).getByRole('link', { name: content.en.nav.items.find((item) => item.id === 'applications').label });
        expect(a.getAttribute('href')).toBe('/projects');
        expect(fireEvent.click(a)).toBe(false); // false: the default (a page load) was prevented
        expect(window.location.pathname).toBe('/projects');
    });

    it('sends the hero link "Applications" to /projects with no reload', () => {
        const { container } = open('/');
        const label = content.en.hero.links.find((link) => link.id === 'applications').label;
        const a = within(container.querySelector('#top')).getByRole('link', { name: new RegExp(`^${label}`) });
        expect(a.getAttribute('href')).toBe('/projects');
        expect(fireEvent.click(a)).toBe(false);
        expect(window.location.pathname).toBe('/projects');
    });

    it('renders the full page on a direct visit to /projects', () => {
        open('/projects');
        expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(content.en.hero.name);
        for (const id of SECTIONS) expect(document.getElementById(id), id).toBeTruthy();
    });
});

describe('drawings', () => {
    const registry = { ...artA, ...artB };

    it('has the nine drawings of facts.art in the two registries', () => {
        expect(Object.keys(registry).sort()).toEqual(Object.keys(facts.art).sort());
    });

    for (const lang of LANGS) {
        const art = content[lang].intro.art;

        for (const [key, Drawing] of Object.entries(registry)) {
            it(`renders ${key} with a text for screen readers in ${lang}`, () => {
                window.history.replaceState(null, '', `/?lang=${lang}`);
                const { container } = render(<LanguageProvider><Drawing /></LanguageProvider>);
                expect(container.querySelector('svg'), key).toBeTruthy();
                if (key === 'timeline') {
                    // An HTML list of links on top of a decorative drawing.
                    const list = screen.getByRole('list', { name: art.timeline.title });
                    const hrefs = within(list).getAllByRole('link').map((a) => a.getAttribute('href'));
                    for (const entry of facts.art.timeline.filter((e) => e.to)) expect(hrefs).toContain(entry.to);
                } else {
                    expect(screen.getByRole('img', { name: art[key].summary })).toBeTruthy();
                }
            });
        }

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

describe('links', () => {
    it('uses mailto for the email address', () => {
        open('/');
        const mail = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === `mailto:${facts.contact.email}`);
        expect(mail.length).toBeGreaterThan(0);
    });

    it('opens external links in a new tab without window.opener', () => {
        const { container } = open('/');
        const external = [...container.querySelectorAll('a[href^="https:"]')];
        expect(external.length).toBeGreaterThan(10);
        for (const a of external) {
            expect(a.getAttribute('target'), a.href).toBe('_blank');
            expect(a.getAttribute('rel'), a.href).toContain('noopener');
        }
    });
});

describe('project clips', () => {
    const withVideo = Object.entries(facts.projects).filter(([, data]) => data.video);

    it('has at least one project with a clip, and each clip has a poster image', () => {
        expect(withVideo.length).toBeGreaterThan(0);
        for (const [id, data] of withVideo) expect(data.image, id).toBeTruthy();
    });

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
            for (const button of buttons) {
                const name = button.getAttribute('aria-label') ?? '';
                expect(name.startsWith(labels.playClip) || name.startsWith(labels.pauseClip), name).toBe(true);
            }
            const names = buttons.map((button) => button.getAttribute('aria-label'));
            for (const [id, data] of withVideo) {
                expect(names.some((name) => name.includes(data.name)), id).toBe(true);
            }
        });
    }
});
