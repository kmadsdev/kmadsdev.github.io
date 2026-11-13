// Node 25+ ships its own `localStorage` global, which is undefined without a
// storage file and hides the one from jsdom. Tests get a small in-memory one.
if (typeof window !== 'undefined') {
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
