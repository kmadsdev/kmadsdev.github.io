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
    window.sessionStorage.clear();
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
        travel() { return this.at; },
        setVolume(value) { this.volume = value; this.calls.push(`volume ${value}`); },
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
        // Under the badge, inside the hero: the next element after the badge in the same block.
        expect(container.querySelectorAll('#top .hero-figure > .badge + .player-line').length).toBe(present ? 1 : 0);
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

    it('plays the song again from 0:00 when it ends', () => {
        const text = en();
        player();
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        const [engine] = engines;
        engine.at = 100;
        act(() => engine.options.onEnd());
        expect(engine.at).toBe(0);
        expect(engine.calls.slice(-2)).toEqual(['seek 0', 'play']);
        expect(screen.getByRole('button', { name: text.pause })).toBeTruthy(); // it still plays
        // An end that comes after a pause does not start the sound again.
        fireEvent.click(screen.getByRole('button', { name: text.pause }));
        const calls = engine.calls.length;
        act(() => engine.options.onEnd());
        expect(engine.calls.length).toBe(calls);
    });

    it('sets the loudness with the slider, shows it as a percent, and keeps it for the visit', () => {
        const text = en();
        player();
        const slider = screen.getByRole('slider', { name: text.volume });
        expect(slider.tagName).toBe('INPUT');
        expect(Number(slider.value)).toBeCloseTo(music.volume);
        expect(slider.getAttribute('aria-valuetext')).toBe('35%');
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        const [engine] = engines;
        expect(engine.options.volume).toBe(music.volume);
        fireEvent.change(slider, { target: { value: '0.8' } });
        expect(engine.volume).toBe(0.8);
        expect(slider.getAttribute('aria-valuetext')).toBe('80%');
        expect(slider.style.getPropertyValue('--fill')).toBe('80%');
        expect(window.sessionStorage.getItem('kmads.volume')).toBe('0.8');
        cleanup();
        player();
        expect(Number(screen.getByRole('slider', { name: text.volume }).value)).toBe(0.8); // the same visit: the level is back
    });

    it('turns the sound off and on with the speaker, and comes back to the last level', () => {
        const text = en();
        player();
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        const [engine] = engines;
        const slider = screen.getByRole('slider', { name: text.volume });
        fireEvent.change(slider, { target: { value: '0.6' } });
        fireEvent.click(screen.getByRole('button', { name: text.mute }));
        expect(engine.volume).toBe(0);
        expect(Number(slider.value)).toBe(0);
        fireEvent.click(screen.getByRole('button', { name: text.unmute }));
        expect(engine.volume).toBe(0.6);
        // The slider at zero is the muted state too: the speaker then gives the last level back.
        fireEvent.change(slider, { target: { value: '0' } });
        fireEvent.click(screen.getByRole('button', { name: text.unmute }));
        expect(engine.volume).toBe(0.6);
        expect(engine.calls.filter((call) => call === 'pause').length).toBe(0); // mute does not pause
    });

    it('goes back to the paused state when the browser refuses the sound', async () => {
        const text = en();
        player();
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        engines[0].refuse = true;
        fireEvent.click(screen.getByRole('button', { name: text.pause }));
        fireEvent.click(screen.getByRole('button', { name: text.play }));
        await act(async () => {});
        expect(screen.getByRole('button', { name: text.play })).toBeTruthy();
    });

    it('shows the status line only with a song: the cover, the song, the volume and the restart button', () => {
        const text = en();
        const { container } = player();
        const line = container.querySelector('.player-line');
        expect(line).toBeTruthy();
        expect(line.getAttribute('aria-label')).toBe(text.nowPlaying);
        // It is the label of the disc, in the flow of the page: not a bar fixed to the screen.
        const sheet = css('player.css');
        expect(sheet).not.toMatch(/position:\s*fixed/);
        expect(sheet).not.toMatch(/--player-h/);
        expect(css('site.css')).not.toMatch(/--player-h/);
        expect(line.querySelector('.player-line__song').textContent).toBe(`${music.title} - ${music.artist}`);
        // One link holds the album cover and the song name: to the song on Spotify, in a new tab, with a name.
        const links = within(line).getAllByRole('link');
        expect(links.length).toBe(1);
        expect(links[0].contains(line.querySelector('img'))).toBe(true);
        expect(links[0].contains(line.querySelector('.player-line__song'))).toBe(true);
        expect(links[0].getAttribute('href')).toBe(music.spotifyUrl);
        expect(links[0].getAttribute('target')).toBe('_blank');
        expect(links[0].getAttribute('rel')).toContain('noopener');
        expect(links[0].getAttribute('aria-label')).toContain(text.openOnSpotify);
        const pictures = line.querySelectorAll('img');
        expect(pictures.length).toBe(1);
        expect(pictures[0].getAttribute('src')).toBe(music.cover);
        expect(pictures[0].getAttribute('alt')).toBe('');
        expect(pictures[0].getAttribute('width')).toBe(pictures[0].getAttribute('height'));
        expect(existsSync(resolve(process.cwd(), 'public', `.${music.cover}`))).toBe(true);
        // In order: cover, song, speaker, slider, restart. No Spotify mark, no divider, no time, no progress.
        const order = [...line.querySelectorAll('a, button, input')].map((el) => (el.tagName === 'A' ? 'source' : el.getAttribute('aria-label')));
        expect(order).toEqual(['source', text.mute, text.volume, text.restart]);
        // The volume is a bar that fills: it has no thumb. The whole line has one weight.
        expect(sheet).toMatch(/::-webkit-slider-thumb \{[^}]*width: 0/);
        expect(sheet).toMatch(/::-moz-range-thumb \{[^}]*width: 0/);
        expect(rule(sheet, '.player-line')).toMatch(/font:\s*var\(--fw-semibold\)/);
        for (const icon of line.querySelectorAll('svg')) expect(icon.getAttribute('stroke-width')).toBe('2');
        expect(line.querySelector('.player-line__rule, hr, [role="separator"], progress, [role="progressbar"], time')).toBeNull();
        expect(line.querySelectorAll('svg').length).toBe(2); // the speaker and the restart arrow
        expect(sheet).not.toMatch(/player-line__rule/);
        expect(line.textContent.trim()).toBe(`${music.title} - ${music.artist}`);
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
        const ring = screen.getByRole('slider', { name: `${music.title} - ${music.artist}` });
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
            const ring = screen.getByRole('slider', { name: `${music.title} - ${music.artist}` });
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
        const keys = ['play', 'pause', 'restart', 'openOnSpotify', 'nowPlaying', 'volume', 'mute', 'unmute'];
        for (const key of keys) {
            expect(en()[key], key).toBeTruthy();
            expect(TEXT.pt[key], key).toBeTruthy();
            if (key !== 'volume') expect(TEXT.pt[key]).not.toBe(TEXT.en[key]); // "Volume" is the same word in both
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
        engine.setVolume(0.5);
        expect(audio.volume).toBeCloseTo(0.5);
        expect(audio.loop).toBe(true);
        for (const method of ['warm', 'play', 'pause', 'seek', 'hold', 'hand', 'release', 'position', 'travel', 'setVolume', 'duration', 'destroy']) expect(typeof engine[method], method).toBe('function');
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

    it('has a globe that is smaller when paused than when playing, and the size of the badge file with no song', () => {
        expect(DISC.globePlaying).toBe(0.92);
        expect(DISC.globePaused).toBe(0.78);
        expect(DISC.globeIdle).toBe(1);
        // The globe is 65% of the badge and the text band starts at 74%: the playing globe stays inside it.
        expect(0.65 * DISC.globePlaying).toBeLessThan(0.74);
        // The button is the whole inner circle (72% of the badge) at every size of the picture.
        expect(rule(css('site.css'), '.badge__globe')).toMatch(/inset:\s*14%/);
        expect(rule(css('site.css'), '.badge__globe img')).toMatch(/inset:\s*-19\.444%;\s*width:\s*138\.889%/);
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
