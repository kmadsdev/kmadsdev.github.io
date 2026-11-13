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
    document.documentElement.removeAttribute('data-theme');
});
afterEach(cleanup);

describe('the page in each language', () => {
    for (const lang of ['en', 'pt']) {
        const t = content[lang];

        it(`shows every section in ${lang}`, () => {
            open(`/?lang=${lang}`);
            expect(document.documentElement.lang).toBe(t.meta.htmlLang);
            expect(document.title).toBe(t.meta.title);
            expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(t.hero.headline);
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
        expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(content.pt.hero.headline);
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

describe('theme toggle', () => {
    it('starts dark, changes to light and saves the choice', () => {
        open('/');
        expect(document.documentElement.dataset.theme).toBe('dark');
        fireEvent.click(screen.getByRole('button', { name: content.en.controls.switchToLight }));
        expect(document.documentElement.dataset.theme).toBe('light');
        expect(window.localStorage.getItem('kmads.theme')).toBe('light');
        expect(screen.getByRole('button', { name: content.en.controls.switchToDark })).toBeTruthy();
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
