// Section 6, id "more" ("Hobbies"): an honourable mention at the end of the page,
// about one screen. Owner, 2026-11-19: "just a honorable mention". Four quiet tiles:
//   volunteering   the number, its line, the role, the text, the communities, and the peek
//                  behind the shared plus and minus disclosure
//   hobbies        five rows: the name in bold, then the text (the ECU row has a link)
//   languages      code, name, study note, level
//   future         three projects, shown in full
// No drawing here. Text: t.hobbies. Data: reddit, languages (contents.global.js).
import { languages as spoken, reddit } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Disclosure from './applications/Disclosure.jsx';
import { Bento, Chapter, Tile } from './bento/index.js';
import Rich from './Rich.jsx';

function Volunteering({ v }) {
    return (
        <Tile kind="stat" id={v.anchor} lg="5x1" md="4x1" className="more-tile more-volunteer" aria-labelledby={`${v.anchor}-title`}>
            <h3 id={`${v.anchor}-title`} className="tile__title">{v.title}</h3>
            <div className="more-volunteer__head">
                <p className="stat__value more-volunteer__value">{v.value}</p>
                <p className="more-volunteer__line">{v.line}</p>
            </div>
            <p className="more-meta">{v.role}</p>
            <p className="tile__text more-volunteer__text">{v.text}</p>
            <ul className="more-tags" aria-label={v.tagsLabel}>
                {reddit.communities.map((name) => <li key={name} translate="no">{name}</li>)}
            </ul>
            <Disclosure labels={{ open: v.peek.open, close: v.peek.close }} className="more-peek">
                <p className="tile__text">{v.peek.text}</p>
            </Disclosure>
        </Tile>
    );
}

function Hobbies({ h }) {
    return (
        <Tile kind="list" id={h.anchor} lg="7x1" md="4x1" className="more-tile more-hobbies" aria-labelledby={`${h.anchor}-title`}>
            <h3 id={`${h.anchor}-title`} className="tile__title">{h.title}</h3>
            <ul className="more-hobbies__list">
                {h.items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong> <Rich text={item.text} />
                    </li>
                ))}
            </ul>
        </Tile>
    );
}

function Languages({ l }) {
    return (
        <Tile kind="list" id={l.anchor} lg="5x1" md="4x1" className="more-tile more-languages" aria-labelledby={`${l.anchor}-title`}>
            <h3 id={`${l.anchor}-title`} className="tile__title">{l.title}</h3>
            <dl className="more-rows">
                {l.items.map((item, i) => (
                    <div key={spoken[i].code} className="more-rows__row more-languages__row">
                        <dt>
                            <span className="more-languages__code" translate="no">{spoken[i].code}</span>
                            <span className="more-languages__name">
                                {item.name}
                                {item.study ? <span className="more-languages__study">{item.study}</span> : null}
                            </span>
                        </dt>
                        <dd className="more-languages__level">{item.level}</dd>
                    </div>
                ))}
            </dl>
        </Tile>
    );
}

function Future({ f }) {
    return (
        <Tile kind="list" id={f.anchor} lg="7x1" md="4x1" className="more-tile more-future" aria-labelledby={`${f.anchor}-title`}>
            <h3 id={`${f.anchor}-title`} className="tile__title">{f.title}</h3>
            <ul className="more-hobbies__list">
                {f.items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong> {item.text}
                    </li>
                ))}
            </ul>
        </Tile>
    );
}

export default function More() {
    const { hobbies: m } = useLanguage().t;
    return (
        <Chapter id="more" label={m.label} title={m.title} lead={m.lead} className="more">
            <Bento className="more-grid">
                <Volunteering v={m.volunteering} />
                <Hobbies h={m.list} />
                <Languages l={m.languages} />
                <Future f={m.future} />
            </Bento>
        </Chapter>
    );
}
