// Node 25+ ships its own `localStorage` global, which is undefined without a
// storage file and hides the one from jsdom. Tests get a small in-memory one.
if (typeof window !== 'undefined') {
    // jsdom has no scrollIntoView. The /projects address and the anchor
    // landing call it. IntersectionObserver is not stubbed: the hooks and
    // Clip.jsx check that it exists and then show everything with no motion.
    if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};

    const data = new Map();
    Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: {
            getItem: (key) => (data.has(key) ? data.get(key) : null),
            setItem: (key, value) => data.set(key, String(value)),
            removeItem: (key) => data.delete(key),
            clear: () => data.clear(),
        },
    });
}
