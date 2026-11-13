// localStorage can throw (private window, blocked site data). The site must work without it.

export function readStored(key) {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

export function writeStored(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        // The choice lasts until the page closes.
    }
}
