// One module of the board. A tile holds ONE idea:
//   figure (a diagram, a picture, a clip) on top, then a short title and at
//   most three lines of text. Long prose goes in the text column of the chapter.
//
// Size: "WxH" in grid columns and rows, per breakpoint.
//   lg  12 columns (>= 1280px), default "4x1"
//   md   8 columns (>= 768px), default: 8 wide when lg is 7 or more, else 4
//   sm   4 columns (phone), default "4x1"
// With `href` the whole tile is one link and shows an arrow.
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import Icon from '../Icon.jsx';
import { facts } from '../../content/index.js';

// Reference letters, as on a circuit board: facts.boardMarks in content.js.
const REF = facts.boardMarks;

function size(value) {
    const [w, h] = String(value).split('x').map(Number);
    return { w: w || 4, h: h || 1 };
}

export default function Tile({
    kind = 'claim',
    lg = '4x1',
    md,
    sm,
    n,
    name,
    title,
    level = 3,
    figure,
    href,
    light = false,
    as,
    className = '',
    children,
    ...rest
}) {
    const { t } = useLanguage();
    const L = size(lg);
    const M = md ? size(md) : { w: L.w >= 7 ? 8 : 4, h: L.h };
    const S = sm ? size(sm) : { w: 4, h: 1 };
    const style = { '--w-l': L.w, '--h-l': L.h, '--w-m': M.w, '--h-m': M.h, '--w-s': S.w, '--h-s': S.h };
    const outside = href ? /^https?:/.test(href) : false;
    const Tag = href ? 'a' : as ?? 'article';
    const Title = `h${level}`;
    const link = href ? { href, ...(outside ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {};

    return (
        <Tag
            className={`tile tile--${kind} ${className}`.trim()}
            style={style}
            data-light={light ? 'red' : undefined}
            data-figure={figure ? 'true' : undefined}
            {...link}
            {...rest}
        >
            {name ? (
                <p className="tile__label">
                    {n ? <span aria-hidden="true">{REF[kind] ?? 'U'}{n} · </span> : null}
                    {name}
                </p>
            ) : null}
            {figure ? <div className="tile__figure">{figure}</div> : null}
            <div className="tile__body">
                {title ? <Title className="tile__title">{title}</Title> : null}
                {typeof children === 'string' ? <p className="tile__text">{children}</p> : children}
            </div>
            {href ? (
                <span className="tile__arrow">
                    <Icon name={outside ? 'arrow-up-right' : 'arrow-down'} />
                    {outside ? <span className="visually-hidden"> ({t.controls.external})</span> : null}
                </span>
            ) : null}
        </Tag>
    );
}

/** One number, its unit, and where it comes from (in words). */
export function Stat({ value, unit, children }) {
    return (
        <div className="stat">
            <p className="stat__figure">
                <span className="stat__value">{value}</span>
                {unit ? <span className="stat__unit">{unit}</span> : null}
            </p>
            {children ? <p className="stat__source">{children}</p> : null}
        </div>
    );
}

/** One to three uppercase words. At most one per chapter. */
export function Poster({ as: Tag = 'p', children }) {
    return <Tag className="tile__poster">{children}</Tag>;
}

/** Short rows of facts. An item is a string, or [name, value]. */
export function TileList({ items, label }) {
    return (
        <ul className="tile__list" aria-label={label}>
            {items.map((item) => {
                const [name, value] = Array.isArray(item) ? item : [item];
                return (
                    <li key={name}>
                        <span>{name}</span>
                        {value ? <span className="tile__list-value">{value}</span> : null}
                    </li>
                );
            })}
        </ul>
    );
}
