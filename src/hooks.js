import { useEffect, useState } from 'react';

const canObserve = typeof IntersectionObserver !== 'undefined';

const canMatch = typeof window !== 'undefined' && typeof window.matchMedia === 'function';

/** True when the visitor asked the system for less motion. */
export function useReducedMotion() {
    const [reduced, setReduced] = useState(() => canMatch && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    useEffect(() => {
        if (!canMatch) return undefined;
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReduced(query.matches);
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);
    return reduced;
}

/** True while the media query matches, for example '(max-width: 599px)'. */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => canMatch && window.matchMedia(query).matches);
    useEffect(() => {
        if (!canMatch) return undefined;
        const list = window.matchMedia(query);
        const update = () => setMatches(list.matches);
        update();
        list.addEventListener('change', update);
        return () => list.removeEventListener('change', update);
    }, [query]);
    return matches;
}

/** True while the element is on screen. Stays false where the browser has no IntersectionObserver. */
export function useInView(ref, options) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined' || !ref.current) return undefined;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps
    return inView;
}

/** The id of the section that crosses the middle of the screen. */
export function useActiveSection(ids) {
    const [active, setActive] = useState(null);
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );
        for (const id of ids) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }
        return () => observer.disconnect();
    }, [ids.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps
    return active;
}

/**
 * One entrance for the children of a box: each child fades in and rises 12px
 * the first time it comes on screen, 40ms after the child before it.
 * The CSS is in bento.css ([data-reveal] and [data-in]). Where the browser has
 * no IntersectionObserver, nothing is hidden.
 */
export function useReveal(ref) {
    useEffect(() => {
        const root = ref.current;
        if (!canObserve || !root) return undefined;
        root.dataset.reveal = 'on';
        const observer = new IntersectionObserver(
            (entries) => {
                let order = 0;
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.style.setProperty('--i', String(order++));
                    entry.target.dataset.in = 'true';
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
        );
        for (const child of root.children) if (!child.dataset.in) observer.observe(child);
        return () => {
            observer.disconnect();
            delete root.dataset.reveal;
        };
    }, [ref]);
}
