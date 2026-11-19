// One tile of an introduction chapter, from its data (CONTENT-SHAPE.md section 5).
//   art   a drawing from the registry, with a silk-screen label. A drawing that
//         is not registered yet gives a plain tile: title and text, no figure.
//   stat  one number, its name, one line of text, its source.
//   link  the whole tile is one link.
//   note  title and text.
import { useReducedMotion } from '../../hooks.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Tile } from '../bento/index.js';
import { artA } from './artA.js';
import { artB } from './artB.js';

export const DRAWINGS = { ...artA, ...artB };
const KIND = { art: 'art', stat: 'stat', link: 'link', note: 'claim' };

function Source({ tile }) {
    const { sourceLabel } = useLanguage().t.intro;
    if (!tile.source) return null;
    return (
        <p className="intro-source">
            <span>{sourceLabel}</span> {tile.source}
        </p>
    );
}

export default function IntroTile({ tile, n, level = 4, ...size }) {
    const { t } = useLanguage();
    const reduced = useReducedMotion();
    const Drawing = tile.art ? DRAWINGS[tile.art] : null;
    const text = tile.art ? t.intro.art[tile.art] : null;
    const Title = `h${level}`;

    if (tile.kind === 'stat') {
        return (
            <Tile kind="stat" className="intro-stat" {...size}>
                <p className="intro-stat__value">{tile.value}</p>
                <Title className="tile__title">{tile.title}</Title>
                <p className="tile__text">{tile.text}</p>
                <Source tile={tile} />
            </Tile>
        );
    }

    const label = tile.kind === 'art' && Drawing ? { n, name: text.title } : {};
    return (
        <Tile
            kind={KIND[tile.kind] ?? 'claim'}
            title={tile.title}
            level={level}
            href={tile.kind === 'link' ? tile.to : undefined}
            figure={Drawing ? <Drawing /> : undefined}
            {...label}
            {...size}
        >
            <p className="tile__text">{tile.text}</p>
            {/* With reduced motion the drawing is still: the same mechanism in words. */}
            {Drawing && reduced && tile.kind === 'art' ? <p className="tile__text intro-summary">{text.summary}</p> : null}
            {tile.value ? <p className="intro-value">{tile.value}</p> : null}
            <Source tile={tile} />
        </Tile>
    );
}
