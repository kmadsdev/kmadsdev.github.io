// Pause and play for a drawing that loops (WCAG 2.2.2: motion that starts by
// itself and lasts more than 5 seconds needs a control).
//
//   const playback = usePlayback();
//   <Playback value={playback}> <ArtToggle /> ... <MyDrawing /> </Playback>
//
// An <Art> inside <Playback> stops while `paused` is true. <ArtToggle> is the
// button. It is not drawn with reduced motion, because nothing moves then.
// An <Art> with no <Playback> around it plays as before.
import { createContext, useContext, useMemo, useState } from 'react';
import { useReducedMotion } from '../../../hooks.js';
import { useLanguage } from '../../../i18n/LanguageProvider.jsx';
import Icon from '../../Icon.jsx';

const PlaybackContext = createContext({ paused: false, toggle: null });

export const usePlaybackState = () => useContext(PlaybackContext);

export function usePlayback() {
    const [paused, setPaused] = useState(false);
    return useMemo(() => ({ paused, toggle: () => setPaused((value) => !value) }), [paused]);
}

export function Playback({ value, children }) {
    return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
}

export function ArtToggle({ className = '' }) {
    const { paused, toggle } = usePlaybackState();
    const reduced = useReducedMotion();
    // The names of the flowchart control: the same action on the same kind of picture.
    const { controls } = useLanguage().t;
    if (reduced || !toggle) return null;
    const name = paused ? controls.playDrawing : controls.pauseDrawing;
    return (
        <button type="button" className={`art-toggle ${className}`.trim()} onClick={toggle} aria-label={name} title={name}>
            <Icon name={paused ? 'play' : 'pause'} size={12} />
        </button>
    );
}
