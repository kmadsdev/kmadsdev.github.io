// @vitest-environment jsdom
// Tests of the shell: the top bar, the scroll ruler, the hero and the music player.
// jsdom has no layout and no sound: tests/setup.js gives play() and pause() to the audio
// element. The layout and the motion are checked in a real browser (see the report of the shell work).
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App.jsx';
import Badge from '../src/components/Badge.jsx';
import Rulers from '../src/components/Rulers.jsx';
import { LanguageProvider } from '../src/i18n/LanguageProvider.jsx';
import { PlayerProvider } from '../src/components/player/PlayerProvider.jsx';
import StatusLine from '../src/components/player/StatusLine.jsx';
import { music, usePlayerText } from '../src/components/player/playerText.js';
import { DEG_PER_SECOND, DISC, angleOf, clock, handSpeed, turnBetween } from '../src/components/player/disc.js';
import { canScratch, createEngine, toInt16 } from '../src/components/player/engine.js';
import { Node } from '../src/components/art/kit/index.js';
import { content } from '../src/content/index.js';

const css = (file) => readFileSync(resolve(process.cwd(), 'src/styles', file), 'utf8');
/** The rules of one selector in a stylesheet, as text. */
const rule = (sheet, selector) => new RegExp(`^${selector.replace(/[.\\-]/g, '\\$&')} \\{([^}]*)\\}`, 'm').exec(sheet)?.[1] ?? '';

const TEXT = { en: null, pt: null };
function Probe({ lang }) {
    TEXT[lang] = usePlayerText();
    return null;
}

/** The audio elements that the page made. They are not in the document, so the test catches them at their birth. */
let made = [];
const realCreate = document.createElement.bind(document);
beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, '', '/');
    made = [];
    vi.spyOn(document, 'createElement').mockImplementation((tag, ...rest) => {
        const element = realCreate(tag, ...rest);
        if (String(tag).toLowerCase() === 'audio') made.push(element);
        return element;
    });
});
afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

/** A sound engine with the interface of engine.js and no sound: it keeps a playhead and a list of calls. */
let engines = [];
function stubEngine(options) {
    const engine = {
        options, calls: [], at: 0, refuse: false,
        warm: () => Promise.resolve(),
        play() { this.calls.push('play'); return this.refuse ? Promise.reject(new Error('refused')) : Promise.resolve(); },
        pause() { this.calls.push('pause'); },
        seek(time) { this.at = time; this.calls.push(`seek ${time}`); options.onChange(); },
        hold() { this.calls.push('hold'); },
        hand(time, rate) { this.at = time; this.calls.push(`hand ${time} ${rate}`); },
        release(playing, time) { this.calls.push(`release ${playing ? 'playing' : 'paused'} at ${time}`); },
        position() { return this.at; },
        duration: () => 100,
        destroy() {},
    };
    engines.push(engine);
    return engine;
}

/** The player with a song (`src`) or with no song. */
function player(src = '/song.mp3') {
    engines = [];
    return render(
        <LanguageProvider>
            <PlayerProvider src={src} engine={stubEngine}>
                <Badge />
                <StatusLine />
            </PlayerProvider>
        </LanguageProvider>,
    );
}
const en = () => {
    render(<LanguageProvider><Probe lang="en" /></LanguageProvider>);
    cleanup();
    return TEXT.en;
};
const tap = (element) => {
    fireEvent.pointerDown(element, { pointerId: 1, button: 0 });
    fireEvent.pointerUp(element, { pointerId: 1, button: 0 });
};

describe('top bar', () => {
    it('has no wordmark: only the section links and the controls', () => {
        const { container } = render(<App />);
        const header = container.querySelector('.site-header');
        expect(header.querySelector('.wordmark')).toBeNull();
        expect(header.textContent).not.toMatch(/KMA\s*DS/);
        const hrefs = [...header.querySelectorAll('a')].map((a) => a.getAttribute('href'));
        expect(hrefs).not.toContain('#top');
        expect(container.querySelector('.skip-link')).toBeTruthy();
        expect(within(header).getByRole('navigation')).toBeTruthy();
        expect(css('site.css')).not.toMatch(/\.wordmark/);
    });
});

describe('scroll ruler', () => {
    const ruler = () => {
        render(<LanguageProvider><main id="main" /><Rulers /></LanguageProvider>);
        return screen.getByRole('scrollbar');
    };

    it('is a scroll bar for the page, with a name and a value', () => {
        const bar = ruler();
        expect(bar.getAttribute('aria-controls')).toBe('main');
        expect(document.getElementById('main')).toBeTruthy();
        expect(bar.getAttribute('aria-orientation')).toBe('vertical');
        expect(bar.getAttribute('aria-valuemin')).toBe('0');
        expect(bar.getAttribute('aria-valuemax')).toBe('100');
        expect(bar.getAttribute('aria-valuenow')).toBe('0');
        expect(bar.getAttribute('aria-label')).toBeTruthy();
        expect(bar.tabIndex).toBe(0);
    });

    it('stands on the right edge, and the native bar is hidden only where the ruler shows', () => {
        const editorial = css('ds/editorial.css');
        const rail = rule(editorial, '.wh-rule--y');
        expect(rail).toMatch(/right:\s*0/);
        expect(rail).not.toMatch(/(^|\s)left:/);
        expect(editorial).toMatch(/@media \(max-width: 1023\.98px\) \{\s*\.wh-rule \{ display: none; \}/);
        expect(css('site.css')).toMatch(/@media \(min-width: 1024px\) \{\s*html \{ scrollbar-width: none; \}/);
    });

    it('is one quarter of the old 44px, and the page ends where it starts', () => {
        expect(css('ds/tokens.css')).toMatch(/--rail:\s*11px/);
        const site = css('site.css');
        expect(rule(site, '.page')).toMatch(/margin-right:\s*var\(--rail\)/);
        expect(rule(site, '.site-header')).toMatch(/inset:\s*0 var\(--rail\) auto 0/);
        expect(rule(css('player.css'), '.player-line')).toMatch(/inset:\s*auto var\(--rail\) 0 0/);
    });

    it('moves the page with the keyboard', () => {
        const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
        Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 5000 });
        const bar = ruler();
        fireEvent.keyDown(bar, { key: 'End' });
        expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ top: 5000 - window.innerHeight }));
        fireEvent.keyDown(bar, { key: 'ArrowDown' });
        expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ top: 40 }));
        fireEvent.keyDown(bar, { key: 'PageDown' });
        expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ top: window.innerHeight * 0.875 }));
        fireEvent.keyDown(bar, { key: 'Home' });
        expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ top: 0 }));
        const calls = scrollTo.mock.calls.length;
        fireEvent.keyDown(bar, { key: 'a' });
        expect(scrollTo.mock.calls.length).toBe(calls);
        delete document.documentElement.scrollHeight;
    });
});

describe('status dots', () => {
    it('has no status dot in the hero and no rule for one', () => {
        const { container } = render(<App />);
        expect(container.querySelector('#top .status-dot')).toBeNull();
        expect(css('site.css')).not.toMatch(/\.status-dot/);
    });

    it('draws no corner dot on a box of a drawing, also when a drawing still passes `pin`', () => {
        const { container } = render(<svg><Node x={0} y={0} name="Gateway" pin="live" /><Node x={0} y={60} name="Host" /></svg>);
        expect(container.querySelectorAll('circle').length).toBe(0);
        expect(container.querySelectorAll('.art-node').length).toBe(2);
        expect(container.textContent).toContain('Gateway');
    });
});

describe('badge with no song (the repository has no audio file)', () => {
    it('has no status line, no audio element, and the globe stops and starts the turn of the ring', () => {
        const { container } = player('');
        expect(container.querySelector('.player-line')).toBeNull();
        expect(screen.queryByRole('slider')).toBeNull();
        const globe = screen.getByRole('button', { name: content.en.controls.stopBadge });
        fireEvent.click(globe);
        expect(screen.getByRole('button', { name: content.en.controls.playBadge }).dataset.spin).toBe('off');
        expect(container.querySelector('.badge').dataset.state).toBe('off');
        fireEvent.click(screen.getByRole('button', { name: content.en.controls.playBadge }));
        expect(container.querySelector('.badge').dataset.state).toBe('on');
        expect(made.length).toBe(0);
    });

    it('is on in the page only when the song file is in the repository, and makes no audio element at the start', () => {
        const present = existsSync(resolve(process.cwd(), 'public', `.${music.file}`));
        expect(music.src).toBe(present ? music.file : '');
        const { container } = render(<App />);
        expect(container.querySelectorAll('.player-line').length).toBe(present ? 1 : 0);
        expect(made.length).toBe(0);
    });
});

describe('music player (the controller against a stub of the sound engine)', () => {
    it('makes no engine, no request and no sound before the visitor plays', () => {
        player();
        expect(engines.length).toBe(0);
        expect(made.length).toBe(0);
    });

    it('plays and pauses with the globe, with one engine at the volume of the data', () => {
        const text = en();
        const { container } = player();
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        expect(engines.length).toBe(1);
        const [engine] = engines;
        expect(engine.options.src).toBe('/song.mp3');
        expect(engine.options.volume).toBe(music.volume);
        expect(engine.calls).toEqual(['play']);
        expect(container.querySelector('.badge').dataset.state).toBe('on');
        fireEvent.click(screen.getByRole('button', { name: text.pause }));
        expect(engine.calls).toEqual(['play', 'pause']);
        expect(container.querySelector('.badge').dataset.state).toBe('off');
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        expect(engines.length).toBe(1);
        expect(engine.calls).toEqual(['play', 'pause', 'play']);
    });

    it('goes back to the paused state when the song ends, and when the browser refuses the sound', async () => {
        const text = en();
        player();
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        act(() => engines[0].options.onEnd());
        expect(screen.getByRole('button', { name: text.play })).toBeTruthy();
        engines[0].refuse = true;
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        await act(async () => {});
        expect(screen.getByRole('button', { name: text.play })).toBeTruthy();
    });

    it('shows the status line only with a song: the song, the Spotify link and the restart button', () => {
        const text = en();
        const { container } = player();
        const line = container.querySelector('.player-line');
        expect(line).toBeTruthy();
        expect(line.getAttribute('aria-label')).toBe(text.nowPlaying);
        expect(line.querySelector('.player-line__song').textContent).toBe(`${music.title} - ${music.artist}`);
        const links = [...line.querySelectorAll('a')];
        expect(links.length).toBe(2);
        for (const a of links) {
            expect(a.getAttribute('href')).toBe(music.spotifyUrl);
            expect(a.getAttribute('target')).toBe('_blank');
            expect(a.getAttribute('rel')).toContain('noopener');
        }
        expect(within(line).getAllByRole('link').length).toBe(1); // the album icon is the same link, hidden from screen readers
        expect(within(line).getByRole('link').textContent).toContain(text.openOnSpotify);
        expect(within(line).getAllByRole('button').length).toBe(1);
        // Only what the owner listed: no time, no progress, no volume, no hint.
        expect(line.textContent.replace(text.openOnSpotify, '').replace(/\([^)]*\)/, '').trim()).toBe(`${music.title} - ${music.artist}`);
        expect(line.querySelector('progress, input, [role="progressbar"], img, time')).toBeNull();
    });

    it('starts the song again at 0:00 with the restart button', () => {
        const text = en();
        player();
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        const [engine] = engines;
        engine.at = 42;
        fireEvent.click(screen.getByRole('button', { name: text.restart }));
        expect(engine.at).toBe(0);
        expect(engine.calls.slice(-2)).toEqual(['seek 0', 'play']);
    });

    it('moves the playhead with the arrow keys on the ring, inside the song', () => {
        const text = en();
        player();
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        const [engine] = engines;
        const ring = screen.getByRole('slider', { name: `${music.title} - ${music.artist}` });
        engine.at = 30;
        fireEvent.keyDown(ring, { key: 'ArrowRight' });
        expect(engine.at).toBe(30 + DISC.keyStep);
        expect(ring.getAttribute('aria-valuenow')).toBe(String(30 + DISC.keyStep));
        expect(ring.getAttribute('aria-valuetext')).toBe('0:35');
        fireEvent.keyDown(ring, { key: 'ArrowLeft' });
        fireEvent.keyDown(ring, { key: 'ArrowLeft' });
        expect(engine.at).toBe(30 - DISC.keyStep);
        fireEvent.keyDown(ring, { key: 'PageUp' });
        expect(engine.at).toBe(30 - DISC.keyStep + DISC.pageStep);
        fireEvent.keyDown(ring, { key: 'Home' });
        expect(engine.at).toBe(0);
        fireEvent.keyDown(ring, { key: 'ArrowLeft' });
        expect(engine.at).toBe(0); // not before the start
        engine.at = 99;
        fireEvent.keyDown(ring, { key: 'PageUp' });
        expect(engine.at).toBe(100); // not after the end (the stub song is 100 s)
    });

    it('has no speed control: a double tap and Enter on the ring do nothing', () => {
        const text = en();
        player();
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        const [engine] = engines;
        const ring = screen.getByRole('slider');
        const before = [...engine.calls];
        tap(ring);
        tap(ring);
        fireEvent.keyDown(ring, { key: 'Enter' });
        expect(engine.calls).toEqual(before); // a press on the ring that does not move does not play, pause or seek
        expect(ring.getAttribute('aria-valuetext')).not.toMatch(/speed/i);
    });

    it('gives the disc to the hand after a long press, and gives it back on release', () => {
        vi.useFakeTimers();
        try {
            const text = en();
            player();
            fireEvent.click(screen.getByRole('button', { name: text.play }));
            const [engine] = engines;
            engine.at = 10;
            const ring = screen.getByRole('slider');
            fireEvent.pointerDown(ring, { pointerId: 1, button: 0 });
            expect(engine.calls).not.toContain('hold');
            act(() => vi.advanceTimersByTime(DISC.grabTime + 5));
            expect(engine.calls.at(-1)).toBe('hold');
            fireEvent.pointerUp(ring, { pointerId: 1, button: 0 });
            expect(engine.calls.at(-1)).toBe('release playing at 10');
        } finally {
            vi.useRealTimers();
        }
    });

    it('has the same text keys in English and in Portuguese, and no empty text', () => {
        window.localStorage.setItem('kmads.lang', 'pt');
        render(<LanguageProvider><Probe lang="pt" /></LanguageProvider>);
        cleanup();
        window.localStorage.clear();
        const keys = ['play', 'pause', 'restart', 'openOnSpotify', 'nowPlaying'];
        for (const key of keys) {
            expect(en()[key], key).toBeTruthy();
            expect(TEXT.pt[key], key).toBeTruthy();
            expect(TEXT.pt[key]).not.toBe(TEXT.en[key]);
        }
        for (const key of ['title', 'artist', 'album', 'spotifyUrl', 'file', 'src', 'credit', 'volume']) expect(music, key).toHaveProperty(key);
        expect(music.file).toBe('/assets/audio/may-birocratic.mp3');
        expect(music.spotifyUrl).toMatch(/^https:\/\/open\.spotify\.com\/track\//);
        expect(music.volume).toBe(0.35);
    });
});

describe('sound engines', () => {
    it('keeps the song as 16-bit samples', () => {
        const out = toInt16(new Float32Array([0, 1, -1, 0.5, 2, -2]));
        expect(out).toBeInstanceOf(Int16Array);
        expect([...out]).toEqual([0, 32767, -32767, 16384, 32767, -32768]);
    });

    it('uses the plain audio element where the browser has no AudioWorklet (jsdom), with the same interface', async () => {
        expect(canScratch()).toBe(false);
        const engine = createEngine({ src: '/song.mp3', volume: 0.35 });
        expect(engine.kind).toBe('element');
        expect(made.length).toBe(0); // no element before the first need
        await engine.play();
        const [audio] = made;
        expect(audio.preload).toBe('none');
        expect(audio.volume).toBeCloseTo(0.35);
        expect(audio.paused).toBe(false);
        engine.seek(12);
        expect(engine.position()).toBe(12);
        engine.hold();
        expect(audio.paused).toBe(true); // this engine cannot scratch: the sound stops under the hand
        engine.release(true, 20);
        expect(engine.position()).toBe(20);
        expect(audio.paused).toBe(false);
        engine.pause();
        expect(audio.paused).toBe(true);
        for (const method of ['warm', 'play', 'pause', 'seek', 'hold', 'hand', 'release', 'position', 'duration', 'destroy']) expect(typeof engine[method], method).toBe('function');
        engine.destroy();
    });
});

describe('disc maths', () => {
    it('turns 18 degrees for one second of the song: one turn is 20 seconds', () => {
        expect(DISC.secondsPerTurn).toBe(20);
        expect(DEG_PER_SECOND).toBe(18);
        expect(angleOf(0)).toBe(0);
        expect(angleOf(20)).toBe(360);
        expect(angleOf(162.5)).toBeCloseTo(2925);
    });

    it('takes the short way across 180 degrees', () => {
        expect(turnBetween(170, -170)).toBe(20);
        expect(turnBetween(-170, 170)).toBe(-20);
        expect(turnBetween(10, 40)).toBe(30);
    });

    it('reads the speed of the hand, and no speed from a hand that stopped', () => {
        const samples = [{ t: 0, a: 0 }, { t: 50, a: 10 }, { t: 100, a: 20 }];
        expect(handSpeed(samples, 105)).toBeCloseTo(200);
        expect(handSpeed(samples, 400)).toBe(0);
        expect(handSpeed([{ t: 0, a: 0 }], 1)).toBe(0);
    });

    it('writes seconds as m:ss', () => {
        expect(clock(0)).toBe('0:00');
        expect(clock(65.9)).toBe('1:05');
    });
});
