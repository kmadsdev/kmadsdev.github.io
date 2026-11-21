// Node 25+ ships its own `localStorage` global, which is undefined without a
// storage file and hides the one from jsdom. Tests get a small in-memory one.
if (typeof window !== 'undefined') {
    // jsdom has no scrollIntoView. The /projects address and the anchor
    // landing call it. IntersectionObserver is not stubbed: the hooks and
    // Clip.jsx check that it exists and then show everything with no motion.
    if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};

    // jsdom does not move the page: the ruler that is the scroll bar calls window.scrollTo.
    window.scrollTo = () => {};

    // jsdom has no sound: play() and pause() are not implemented there. These two keep
    // the state that the player reads (`paused`) and send the events that a browser sends.
    const media = window.HTMLMediaElement.prototype;
    const setPaused = (element, value) => Object.defineProperty(element, 'paused', { configurable: true, value });
    media.play = function play() {
        setPaused(this, false);
        this.dispatchEvent(new window.Event('play'));
        return Promise.resolve();
    };
    media.pause = function pause() {
        if (this.paused) return;
        setPaused(this, true);
        this.dispatchEvent(new window.Event('pause'));
    };
    media.load = () => {};

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
