// Smooth wheel scroll with Lenis, wired once at the root of the app.
//
// It is subtle on purpose: a short lerp, so the page follows the wheel at once and
// only the last part of the move is eased. It runs only where it helps:
//   - not with "reduce motion" (the page then scrolls as the browser does),
//   - not on touch screens (the native momentum is better there),
//   - not in a test run or an old browser with no matchMedia.
// Lenis moves the real scroll position of the window. So `position: sticky`, the
// rulers, the active link of the top bar, find-in-page and the keyboard keys
// (Space, Page Down, arrows, Home, End) work as with native scroll.
//
// Every script that moves the page calls goTo() here: one place decides how.
import { useEffect } from 'react';

const WANT = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const OPTIONS = {
    lerp: 0.2, // Lenis default is 0.1. Higher = closer to the wheel, less glide.
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true, // a click on a link to an id of this page moves there smoothly
    autoRaf: true,
};

let lenis = null;

/** The running Lenis, or null when the page scrolls natively. */
export const getLenis = () => lenis;

/** Where the top of `element` must stop: the same sum that the browser uses for an anchor. */
function targetTop(element) {
    const margin = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
    const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    return Math.max(0, element.getBoundingClientRect().top + window.scrollY - margin - padding);
}

/**
 * Move the page to an element. `instant`: no motion (first load, a shared address).
 * With no Lenis, the browser does it and follows the CSS (smooth, or instant with reduced motion).
 */
export function goTo(element, { instant = false } = {}) {
    if (!element) return;
    if (lenis) lenis.scrollTo(targetTop(element), { immediate: instant, force: true });
    else element.scrollIntoView({ block: 'start', behavior: instant ? 'instant' : 'auto' });
}

/**
 * Move the page to a scroll position in pixels (the ruler that is the scroll bar).
 * `instant`: the page follows a hand (a drag of the index). Else the move is eased as a wheel move is.
 */
export function scrollToY(y, { instant = false } = {}) {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const top = Math.max(0, Math.min(max, y));
    if (lenis) lenis.scrollTo(top, { immediate: instant, force: true });
    else window.scrollTo({ top, behavior: instant ? 'instant' : 'auto' });
}

/** Stop the page scroll while a modal part is open (the large view of a diagram). Returns the undo. */
export function holdScroll() {
    const held = lenis;
    held?.stop();
    return () => held?.start();
}

/** Start Lenis for the life of the app, and follow the system settings while it runs. */
export function useSmoothScroll() {
    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
        const query = window.matchMedia(WANT);
        let alive = true;
        const stop = () => {
            lenis?.destroy();
            lenis = null;
        };
        const sync = async () => {
            if (!query.matches) return stop();
            if (lenis) return undefined;
            // Loaded only where it runs: a phone never downloads it.
            const { default: Lenis } = await import('lenis');
            if (alive && query.matches && !lenis) lenis = new Lenis(OPTIONS);
            return undefined;
        };
        sync();
        query.addEventListener('change', sync);
        return () => {
            alive = false;
            query.removeEventListener('change', sync);
            stop();
        };
    }, []);
}
