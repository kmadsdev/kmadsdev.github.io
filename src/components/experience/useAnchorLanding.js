import { useEffect, useRef } from 'react';

const hashId = () => decodeURIComponent(window.location.hash.slice(1));

/**
 * A visitor lands on one of `ids`: from a link on the page, a changed hash or a
 * shared address. `onLand(id)` runs first (for example, to open a case), then
 * the element scrolls into view on the next frame, after React drew the change.
 *
 * - First load: the page is drawn by script, so the browser cannot scroll to the
 *   hash by itself. The scroll is instant, and it runs again when the fonts are
 *   ready (text above can change height), unless the visitor moved first.
 * - A click on a link to the hash that is already in the address fires no
 *   `hashchange`: the click is handled too.
 */
export function useAnchorLanding(ids, onLand) {
    const land = useRef(onLand);
    land.current = onLand;
    const key = ids.join(',');

    useEffect(() => {
        const known = new Set(key.split(','));
        const scroll = (id, behavior) => {
            window.requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({ block: 'start', behavior });
            });
        };
        const go = (id, behavior) => {
            if (!known.has(id)) return;
            land.current(id);
            scroll(id, behavior);
        };

        let moved = false;
        const stop = () => { moved = true; };
        const first = hashId();
        if (known.has(first)) {
            go(first, 'instant');
            window.addEventListener('wheel', stop, { once: true, passive: true });
            window.addEventListener('touchstart', stop, { once: true, passive: true });
            window.addEventListener('keydown', stop, { once: true });
            document.fonts?.ready.then(() => { if (!moved && hashId() === first) scroll(first, 'instant'); });
        }

        const onHash = () => go(hashId(), 'smooth');
        const onClick = (event) => {
            const link = event.target.closest?.('a[href^="#"]');
            if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
            const id = decodeURIComponent(link.getAttribute('href').slice(1));
            if (id === hashId()) go(id, 'smooth');
        };
        window.addEventListener('hashchange', onHash);
        document.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('hashchange', onHash);
            document.removeEventListener('click', onClick);
            window.removeEventListener('wheel', stop);
            window.removeEventListener('touchstart', stop);
            window.removeEventListener('keydown', stop);
        };
    }, [key]);
}
