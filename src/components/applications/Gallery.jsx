// The media of the flagship: one large view and a row of thumbnails.
// Data: projects.<id>.media (files, contents.global.js), text: item.media.<mediaId> (caption, alt).
// A file that does not load is taken out of the row, so an absent clip or still
// never leaves a hole. Keyboard: Tab to a thumbnail, Enter or Space shows it,
// the arrow keys move along the row.
import { useRef, useState } from 'react';
import Icon from '../Icon.jsx';
import Clip from './Clip.jsx';

const two = (n) => String(n).padStart(2, '0');

function Still({ media, text, onMissing }) {
    return (
        <div className="clip" style={{ '--clip-ratio': '1280 / 720' }}>
            <div className="clip__frame">
                <img className="clip__poster" src={media.image} alt={text.alt} width="1280" height="720" loading="lazy" decoding="async" onError={onMissing} />
            </div>
        </div>
    );
}

export default function Gallery({ name, media, text, labels }) {
    const [missing, setMissing] = useState(() => new Set());
    const [selected, setSelected] = useState(media[0]?.id);
    const row = useRef(null);
    const shown = media.filter((m) => !missing.has(m.id));
    const current = shown.find((m) => m.id === selected) ?? shown[0];
    const position = current ? shown.indexOf(current) : -1;

    const drop = (id) => setMissing((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));

    const move = (event) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
        if (!step || !shown.length) return;
        event.preventDefault();
        const next = shown[(position + step + shown.length) % shown.length];
        setSelected(next.id);
        row.current?.querySelector(`[data-id="${next.id}"]`)?.focus();
    };

    return (
        <div className="gallery">
            <figure className="gallery__main">
                {current ? (
                    current.kind === 'clip' ? (
                        <Clip key={current.id} video={current.video} poster={current.image} name={name} alt={text[current.id]?.alt} labels={labels} onMissing={() => drop(current.id)} />
                    ) : (
                        <Still key={current.id} media={current} text={text[current.id] ?? {}} onMissing={() => drop(current.id)} />
                    )
                ) : (
                    <div className="clip" data-empty="true" style={{ '--clip-ratio': '1280 / 720' }}><div className="clip__frame" /></div>
                )}
                {current && text[current.id] ? (
                    <figcaption className="gallery__caption" aria-live="polite">
                        <span className="gallery__count" aria-hidden="true">{two(position + 1)} / {two(shown.length)}</span>
                        <span>{text[current.id].caption}</span>
                    </figcaption>
                ) : null}
            </figure>

            {shown.length > 1 ? (
                <ul className="gallery__row" ref={row} onKeyDown={move}>
                    {shown.map((m) => (
                        <li key={m.id}>
                            <button
                                type="button"
                                className="gallery__thumb"
                                data-id={m.id}
                                aria-pressed={m.id === current?.id}
                                aria-label={text[m.id]?.caption ?? m.id}
                                onClick={() => setSelected(m.id)}
                            >
                                <img src={m.image} alt="" width="1280" height="720" loading="lazy" decoding="async" onError={() => drop(m.id)} />
                                {m.kind === 'clip' ? <span className="gallery__kind" aria-hidden="true"><Icon name="play" size={12} /></span> : null}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
