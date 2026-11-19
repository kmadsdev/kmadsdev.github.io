// Section 6, id "more": an honourable mention at the end of the page, about one
// screen (Addendum 4: 1.1 screens at 1440). Four quiet tiles in one band:
// volunteering (its number, role and first sentence; the rest opens in place),
// hobbies as a short list, languages and the future projects in the right column.
// Owner, 2026-11-18: "Keep hobbies in simple details ... just a honorable mention".
// No drawing here. Text: t.more. Data: facts.earlier.reddit, facts.future.
import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Disclosure from './applications/Disclosure.jsx';
import { Bento, Chapter, Tile } from './bento/index.js';
import ExternalLink from './ExternalLink.jsx';

/** The first sentence in view, the rest in a disclosure. Splits at the first ". ". */
function split(text) {
    const at = text.indexOf('. ');
    return at < 0 ? [text, ''] : [text.slice(0, at + 1), text.slice(at + 2)];
}

function Volunteering({ v }) {
    const [first, rest] = split(v.text);
    return (
        <Tile kind="stat" id={v.anchor} lg="4x2" md="8x1" className="more-tile more-volunteer" aria-labelledby={`${v.anchor}-title`}>
            <h3 id={`${v.anchor}-title`} className="wh-label">{v.title}</h3>
            <div className="more-volunteer__head">
                <p className="stat__value more-volunteer__value">{facts.earlier.reddit.people}</p>
                <div className="more-volunteer__role">
                    <p className="tile__title">{v.role}</p>
                    <p className="more-meta">{v.place} · {v.period}</p>
                </div>
            </div>
            <p className="tile__text more-volunteer__text">{first}</p>
            <ul className="wh-tags" aria-label={v.communitiesLabel}>
                {v.communities.map((name) => <li key={name}>{name}</li>)}
            </ul>
            {rest ? (
                <Disclosure kind="more">
                    <p className="tile__text more-volunteer__text">{rest}</p>
                </Disclosure>
            ) : null}
        </Tile>
    );
}

function Languages({ l }) {
    return (
        <Tile kind="list" id={l.anchor} lg="3x1" md="4x1" className="more-tile more-languages" aria-labelledby={`${l.anchor}-title`}>
            <h3 id={`${l.anchor}-title`} className="wh-label">{l.title}</h3>
            <dl className="more-rows">
                {l.items.map((item) => (
                    <div key={item.id} className="more-rows__row more-languages__row">
                        <dt>
                            <span className="more-languages__code" aria-hidden="true">{item.id}</span>
                            {item.name}
                        </dt>
                        <dd className="more-languages__level">{item.level}</dd>
                    </div>
                ))}
            </dl>
        </Tile>
    );
}

function Hobbies({ h }) {
    return (
        <Tile kind="list" id={h.anchor} lg="5x2" md="8x1" className="more-tile more-hobbies" aria-labelledby={`${h.anchor}-title`}>
            <h3 id={`${h.anchor}-title`} className="wh-label">{h.title}</h3>
            <dl className="more-rows">
                {h.items.map((item) => (
                    <div key={item.id} className="more-rows__row more-hobbies__row">
                        <dt>{item.title}</dt>
                        <dd>
                            {item.text}
                            {item.link ? <> <ExternalLink href={item.link.to}>{item.link.label}</ExternalLink></> : null}
                        </dd>
                    </div>
                ))}
            </dl>
        </Tile>
    );
}

function Future({ f }) {
    const items = f.items.map((item) => ({ ...item, to: facts.future.find((x) => x.id === item.id)?.to }));
    return (
        <Tile kind="list" id={f.anchor} lg="3x1" md="4x1" className="more-tile more-future" aria-labelledby={`${f.anchor}-title`}>
            <h3 id={`${f.anchor}-title`} className="wh-label">{f.title}</h3>
            <ul className="more-future__list">
                {items.map((item) => (
                    <li key={item.id}>
                        {item.to ? <ExternalLink href={item.to}>{item.title}</ExternalLink> : <span className="more-future__name">{item.title}</span>}
                    </li>
                ))}
            </ul>
            <Disclosure>
                <p className="more-meta more-future__note">{f.lead}</p>
                <dl className="more-future__details">
                    {items.map((item) => (
                        <div key={item.id}>
                            <dt>{item.title}</dt>
                            <dd>{item.text}</dd>
                        </div>
                    ))}
                </dl>
            </Disclosure>
        </Tile>
    );
}

export default function More() {
    const { more: m } = useLanguage().t;
    return (
        <Chapter id="more" label={m.label} title={m.title} lead={m.lead} className="more">
            <Bento className="more-grid">
                <Volunteering v={m.volunteering} />
                <Languages l={m.languages} />
                <Hobbies h={m.hobbies} />
                {m.future.items.length ? <Future f={m.future} /> : null}
            </Bento>
        </Chapter>
    );
}
