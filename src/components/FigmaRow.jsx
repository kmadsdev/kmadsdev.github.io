// The row "From my Figma": the approved original diagrams (`figma` in contents.global.js) as
// thumbnails on their own light ground. Each opens large in a native <dialog>:
// the close button has a name from content, Escape closes, a press on the
// backdrop closes, and the focus goes back to the thumbnail.
//
// Props: `ids` (ids of `figma`, in display order). An empty list renders nothing.
//        `level` (heading level of the title, default 4), `compact` (smaller thumbnails).
import { useEffect, useRef, useState } from 'react';
import { figma } from '../content/index.js';

const BY_ID = Object.fromEntries(figma.map((picture) => [picture.id, picture]));
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { holdScroll } from '../smooth.js';

export default function FigmaRow({ ids = [], level = 4, compact = false }) {
    const { t } = useLanguage();
    const dialog = useRef(null);
    const opener = useRef(null);
    const [open, setOpen] = useState(null);
    // Open the dialog after its content is in the page, so the close button gets the focus.
    // The page behind does not scroll while the dialog is open.
    useEffect(() => {
        if (!open) return undefined;
        if (dialog.current && !dialog.current.open) dialog.current.showModal();
        return holdScroll();
    }, [open]);
    const list = ids.filter((id) => BY_ID[id] && t.figma.items[id]);
    if (!list.length) return null;

    const Title = `h${level}`;
    const show = (id, button) => {
        opener.current = button;
        setOpen(id);
    };
    const close = () => dialog.current?.close();
    const closed = () => {
        setOpen(null);
        opener.current?.focus();
    };
    const current = open ? { ...BY_ID[open], ...t.figma.items[open] } : null;
    const titleId = `figma-${list.join('-')}-title`;

    return (
        <div className="figma-row" data-compact={compact ? 'true' : undefined}>
            <div className="figma-row__head">
                <Title className="wh-label figma-row__title">{t.figma.title}</Title>
                {compact ? null : <p className="figma-row__lead">{t.figma.lead}</p>}
            </div>
            <ul className="figma-row__list">
                {list.map((id) => {
                    const data = BY_ID[id];
                    const text = t.figma.items[id];
                    return (
                        <li key={id} className="figma-row__item" style={{ '--figma-ratio': `${data.width} / ${data.height}` }}>
                            <button type="button" className="figma-thumb" onClick={(event) => show(id, event.currentTarget)} aria-haspopup="dialog">
                                <span className="figma-thumb__plate">
                                    <img src={data.thumb} alt="" width={data.width} height={data.height} loading="lazy" decoding="async" />
                                </span>
                                <span className="figma-thumb__title">
                                    {text.title}
                                    <span className="visually-hidden">. {t.figma.open}</span>
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            <dialog
                ref={dialog}
                className="figma-dialog"
                data-lenis-prevent
                aria-labelledby={titleId}
                onClose={closed}
                onClick={(event) => {
                    if (event.target === event.currentTarget) close();
                }}
            >
                {current ? (
                    <figure className="figma-dialog__figure" style={{ '--figma-w': `${current.width}px` }}>
                        <div className="figma-dialog__bar">
                            <p id={titleId} className="figma-dialog__title">{current.title}</p>
                            <button type="button" className="button figma-dialog__close" onClick={close} autoFocus>
                                {t.figma.close}
                            </button>
                        </div>
                        <div className="figma-dialog__scroll" tabIndex={0} aria-label={current.title}>
                            <img src={current.src} alt={current.alt} width={current.width} height={current.height} decoding="async" />
                        </div>
                        <figcaption className="figma-dialog__caption">{current.caption}</figcaption>
                    </figure>
                ) : null}
            </dialog>
        </div>
    );
}
