import { useEffect, useState } from 'react';

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
