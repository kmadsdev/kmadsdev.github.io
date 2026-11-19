// "Show the details": a native <details> (CONTRACT Addendum 4).
// - The content stays in the DOM. Enter and Space open it, find-in-page opens it.
// - A link to an anchor inside it opens it (on load and on hashchange).
// - The label comes from t.controls (showDetails / hideDetails, or readMore / readLess).
// - A clip inside a closed disclosure does not load: it is not on screen.
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';

export default function Disclosure({ kind = 'details', className = '', children }) {
    const { t } = useLanguage();
    const ref = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const reveal = () => {
            const id = decodeURIComponent(window.location.hash.slice(1));
            const target = id ? document.getElementById(id) : null;
            const box = ref.current;
            if (!box || !target || box.open || !box.contains(target) || box === target) return;
            box.open = true;
            requestAnimationFrame(() => target.scrollIntoView());
        };
        reveal();
        window.addEventListener('hashchange', reveal);
        return () => window.removeEventListener('hashchange', reveal);
    }, []);

    const label = kind === 'more' ? (open ? t.controls.readLess : t.controls.readMore) : open ? t.controls.hideDetails : t.controls.showDetails;
    return (
        <details ref={ref} className={`disclosure ${className}`.trim()} onToggle={(event) => setOpen(event.currentTarget.open)}>
            <summary className="disclosure__summary">
                <span>{label}</span>
                <svg className="disclosure__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
                    <path d="M3 8h10" />
                    <path className="disclosure__bar" d="M8 3v10" />
                </svg>
            </summary>
            <div className="disclosure__body">{children}</div>
        </details>
    );
}
