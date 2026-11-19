// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App.jsx';
import { content, facts } from '../src/content/index.js';

function open(url = '/') {
    window.history.replaceState(null, '', url);
    return render(<App />);
}

beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
});
afterEach(cleanup);

describe('the page in each language', () => {
    for (const lang of ['en', 'pt']) {
        const t = content[lang];

        it(`shows every section in ${lang}`, () => {
            open(`/?lang=${lang}`);
            expect(document.documentElement.lang).toBe(t.meta.htmlLang);
            expect(document.title).toBe(t.meta.title);
            expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(t.hero.name);
            for (const id of ['top', 'intro', 'experience', 'education', 'applications', 'more', 'contact']) {
                expect(document.getElementById(id), id).toBeTruthy();
            }
            for (const section of ['about', 'experience', 'cases', 'projects', 'skills', 'education', 'contact']) {
                expect(screen.getByRole('heading', { level: 2, name: t[section].title })).toBeTruthy();
            }
        });

        it(`shows every experience, case and project in ${lang}`, () => {
            const { container } = open(`/?lang=${lang}`);
            const text = container.textContent;
            for (const item of t.experience.items) for (const bullet of item.bullets) expect(text).toContain(bullet);
            for (const item of t.experience.earlier) expect(text).toContain(item.text);
            for (const item of t.cases.items) {
                expect(text).toContain(item.problem);
                expect(text).toContain(item.result);
                for (const step of item.flow.steps) expect(text).toContain(step);
                for (const label of Object.values(item.flow.nodes)) expect(text).toContain(label);
            }
            for (const item of t.projects.items) {
                expect(text).toContain(facts.projects[item.id].name);
                expect(text).toContain(item.text);
            }
            for (const list of Object.values(facts.skills)) for (const skill of list) expect(text).toContain(skill);
            for (const course of t.education.courses) expect(text).toContain(course.title);
        });
    }
});

describe('language toggle', () => {
    it('changes the page to Portuguese and saves the choice', () => {
        open('/');
        expect(document.documentElement.lang).toBe('en');
        fireEvent.click(screen.getByRole('button', { name: /PT/ }));
        expect(document.documentElement.lang).toBe('pt-BR');
        expect(document.querySelector('.hero-role').textContent).toContain(content.pt.hero.role);
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
        open('/?lang=pt#cases');
        fireEvent.click(screen.getByRole('button', { name: /EN/ }));
        expect(window.location.search).toBe('');
        expect(window.location.hash).toBe('#cases');
    });
});

describe('hero', () => {
    for (const lang of ['en', 'pt']) {
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

describe('illustrations', () => {
    it('gives each drawing a text label in the current language', () => {
        open('/?lang=pt');
        for (const key of Object.keys(content.pt.art)) {
            expect(screen.getByRole('img', { name: content.pt.art[key].label })).toBeTruthy();
        }
    });
});

describe('links', () => {
    it('uses mailto for the email address', () => {
        open('/');
        const mail = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === `mailto:${facts.contact.email}`);
        expect(mail.length).toBeGreaterThan(0);
    });

    it('opens external links in a new tab without window.opener', () => {
        open('/');
        const external = screen.getAllByRole('link').filter((a) => /^https:/.test(a.getAttribute('href')));
        expect(external.length).toBeGreaterThan(10);
        for (const a of external) {
            expect(a.getAttribute('target')).toBe('_blank');
            expect(a.getAttribute('rel')).toContain('noopener');
        }
    });

    it('gives each nav link a section that exists', () => {
        open('/');
        const nav = screen.getByRole('navigation', { name: content.en.nav.menu });
        for (const a of within(nav).getAllByRole('link')) {
            expect(document.querySelector(a.getAttribute('href'))).toBeTruthy();
        }
    });
});

describe('project clips', () => {
    const withVideo = Object.entries(facts.projects).filter(([, data]) => data.video);

    it('has at least one project with a clip, and each clip has a poster image', () => {
        expect(withVideo.length).toBeGreaterThan(0);
        for (const [id, data] of withVideo) expect(data.image, id).toBeTruthy();
    });

    it('does not load or play a clip before the visitor asks for it', () => {
        const { container } = open('/');
        const videos = [...container.querySelectorAll('video')];
        expect(videos.length).toBe(withVideo.length);
        for (const video of videos) {
            expect(video.getAttribute('preload')).toBe('none');
            expect(video.muted).toBe(true);
            expect(video.hasAttribute('playsinline')).toBe(true);
            expect(video.hasAttribute('autoplay')).toBe(false);
            expect(video.getAttribute('poster')).toBeTruthy();
        }
    });

    it('gives each clip a play button with a name in the current language', () => {
        open('/?lang=pt');
        const buttons = screen.getAllByRole('button', { name: new RegExp(`^${content.pt.projects.playClip}`) });
        expect(buttons.length).toBe(withVideo.length);
    });
});
