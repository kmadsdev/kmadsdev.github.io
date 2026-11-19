// A clip of a working app (CONTRACT 3.4).
//
// - The poster is a lazy <img>: it loads when the frame is near the screen.
// - The <video> (muted, loop, playsinline, preload="none") gets its source only
//   when the frame is near the screen. It plays while at least a part of it is
//   on screen and stops when it leaves.
// - With reduced motion or Save-Data, nothing plays by itself: the poster shows
//   with the play button. The button always exists and has a name from content.
// - An absent file does not break the layout: the frame has a fixed aspect ratio,
//   a broken poster hides itself and a broken clip removes its button.
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks.js';
import Icon from '../Icon.jsx';

const saveData = () => typeof navigator !== 'undefined' && navigator.connection?.saveData === true;

/** Two observers: `near` turns true once (load), `visible` follows the screen (play). */
function useNearAndVisible(ref) {
    const [near, setNear] = useState(false);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') return undefined;
        const nearObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setNear(true);
                nearObserver.disconnect();
            }
        }, { rootMargin: '200px 0px' });
        const playObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
        nearObserver.observe(el);
        playObserver.observe(el);
        return () => {
            nearObserver.disconnect();
            playObserver.disconnect();
        };
    }, [ref]);
    return { near, visible };
}

export default function Clip({ video, poster, name, alt, labels, width = 1280, height = 720, onMissing, className = '' }) {
    const box = useRef(null);
    const clip = useRef(null);
    const reduced = useReducedMotion();
    const { near, visible } = useNearAndVisible(box);
    const [auto] = useState(() => !saveData());
    const [wanted, setWanted] = useState(null); // null: follow the default; true or false: the visitor chose
    const [playing, setPlaying] = useState(false);
    const [failed, setFailed] = useState(!video);
    const [noPoster, setNoPoster] = useState(false);

    const [armed, setArmed] = useState(false); // once the source is in, it stays in
    const allowed = wanted ?? (auto && !reduced);
    const mounted = Boolean(video) && !failed && near && (armed || allowed);
    const shouldPlay = mounted && visible && allowed;

    useEffect(() => {
        if (mounted && !armed) setArmed(true);
    }, [mounted, armed]);

    useEffect(() => {
        const el = clip.current;
        if (!el) return;
        if (shouldPlay) {
            const started = el.play();
            if (started?.catch) started.catch(() => {});
        } else if (!el.paused) {
            el.pause();
        }
    }, [shouldPlay, mounted]);

    const toggle = () => setWanted(!(playing || shouldPlay));
    const label = playing || shouldPlay ? labels.pauseClip : labels.playClip;
    const a11y = alt ? { role: 'img', 'aria-label': alt } : {};

    return (
        <div
            ref={box}
            className={`clip ${className}`.trim()}
            data-playing={playing ? 'true' : 'false'}
            data-empty={noPoster && !playing ? 'true' : undefined}
            style={{ '--clip-ratio': `${width} / ${height}` }}
        >
            <div className="clip__frame" {...a11y}>
                {poster && !noPoster ? (
                    <img
                        className="clip__poster"
                        src={poster}
                        alt=""
                        width={width}
                        height={height}
                        loading="lazy"
                        decoding="async"
                        onError={() => {
                            setNoPoster(true);
                            onMissing?.();
                        }}
                    />
                ) : null}
                {mounted ? (
                    <video
                        ref={clip}
                        className="clip__video"
                        muted
                        loop
                        playsInline
                        preload="none"
                        width={width}
                        height={height}
                        tabIndex={-1}
                        aria-hidden="true"
                        onPlaying={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onError={() => setFailed(true)}
                    >
                        <source src={video} type="video/mp4" onError={() => setFailed(true)} />
                    </video>
                ) : null}
            </div>
            {video && !failed ? (
                <button type="button" className="clip__button" onClick={toggle} aria-label={name ? `${label}: ${name}` : label}>
                    <Icon name={playing || shouldPlay ? 'pause' : 'play'} />
                </button>
            ) : null}
        </div>
    );
}
