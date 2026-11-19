// The globe badge: the globe stays still and the red ring of text turns around it.
// It turns only while it is on screen. With reduced motion it does not turn.
// It is a button: a press stops the turn, the next press starts it again.
// The pictures are decoration: the name is in the heading next to it.
import { forwardRef, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';

const Badge = forwardRef(function Badge({ className = '' }, ref) {
    const { controls } = useLanguage().t;
    const own = useRef(null);
    const target = ref ?? own;
    const inView = useInView(target, { threshold: 0.05 });
    const reduced = useReducedMotion();
    const [stopped, setStopped] = useState(false);
    const pictures = (
        <>
            <img className="badge__ring" src="/assets/kmads-badge-ring.svg" alt="" width="500" height="500" decoding="async" fetchpriority="high" />
            <img className="badge__globe" src="/assets/kmads-badge-globe.svg" alt="" width="500" height="500" decoding="async" />
        </>
    );
    if (reduced) {
        return <div className={`badge ${className}`.trim()} ref={target} data-spin="off" aria-hidden="true">{pictures}</div>;
    }
    return (
        <button
            type="button"
            className={`badge ${className}`.trim()}
            ref={target}
            data-spin={inView && !stopped ? 'on' : 'off'}
            aria-label={stopped ? controls.playBadge : controls.stopBadge}
            title={stopped ? controls.playBadge : controls.stopBadge}
            onClick={() => setStopped((value) => !value)}
        >
            {pictures}
        </button>
    );
});

export default Badge;
