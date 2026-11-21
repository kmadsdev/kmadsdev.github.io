// A native <details> with the one disclosure look of the page (CONTRACT Addendum 4).
// - The content stays in the DOM. Enter and Space open it, find-in-page opens it.
// - A link to an anchor inside it opens it (on load and on hashchange).
// - The label: `labels` ({ open, close }), else t.controls.readMore / readLess.
// - A clip inside a closed disclosure does not load: it is not on screen.
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import ToggleSign from '../bento/ToggleSign.jsx';
import { goTo } from '../../smooth.js';

export default function Disclosure({ labels, name, className = '', children }) {
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
            requestAnimationFrame(() => goTo(target));
        };
        reveal();
        window.addEventListener('hashchange', reveal);
        return () => window.removeEventListener('hashchange', reveal);
    }, []);

    const text = labels ?? { open: t.controls.readMore, close: t.controls.readLess };
    return (
        <details ref={ref} className={`disclosure ${className}`.trim()} onToggle={(event) => setOpen(event.currentTarget.open)}>
            <summary className="toggle">
                <span>{open ? text.close : text.open}</span>
                {name ? <span className="visually-hidden">: {name}</span> : null}
                <ToggleSign />
            </summary>
            <div className="disclosure__body">{children}</div>
        </details>
    );
}
