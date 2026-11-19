// One chapter of "What I do", from its data. The same component renders all eight.
//
// A chapter has ONE main object: its first drawing, large. Two small tiles stand
// next to it (the board). Under the board: the prose in the text column, and a
// rail with what is left (a second drawing or a third tile) and the proof links.
// `flip` puts the rail and the small tiles on the left: the parent alternates it.
// A chapter with no drawing starts with its prose, and its tiles close it.
import { facts } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Bento, Reveal } from '../bento/index.js';
import FigmaRow from '../FigmaRow.jsx';
import Icon from '../Icon.jsx';
import { RichParagraphs } from '../Rich.jsx';
import IntroTile from './IntroTile.jsx';

/** How a chapter splits its tiles: the main drawing, two small tiles, the rest. */
export function plan(chapter) {
    const main = chapter.tiles.find((tile) => tile.kind === 'art') ?? null;
    if (!main) return { main, small: [], rail: [], row: chapter.tiles };
    const others = chapter.tiles.filter((tile) => tile !== main);
    const small = others.filter((tile) => tile.kind !== 'art').slice(0, 2);
    return { main, small, rail: others.filter((tile) => !small.includes(tile)), row: [] };
}

function Proof({ items }) {
    const { t } = useLanguage();
    return (
        <div className="intro-proof">
            <p className="wh-label">{t.intro.proofLabel}</p>
            <ul>
                {items.map((item) => {
                    const outside = /^https?:/.test(item.to);
                    return (
                        <li key={item.to + item.label}>
                            <a className="intro-proof__link" href={item.to} {...(outside ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                <span>
                                    {item.label}
                                    {outside ? <span className="visually-hidden"> ({t.controls.external})</span> : null}
                                </span>
                                <Icon name={outside ? 'arrow-up-right' : 'arrow-down'} size={14} />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function IntroChapter({ chapter, flip = false, numbers = {} }) {
    const { t } = useLanguage();
    const { main, small, rail, row } = plan(chapter);
    const id = `intro-${chapter.id}`;
    const number = (tile) => numbers[`${chapter.id}/${tile.id}`];
    // A proof link that a link tile of this chapter already gives is not shown twice.
    const tileLinks = new Set(chapter.tiles.filter((tile) => tile.kind === 'link').map((tile) => tile.to));
    const proof = chapter.proof.filter((item) => !tileLinks.has(item.to));
    const figma = facts.figmaOrder.filter((key) => facts.figma[key].chapters.includes(chapter.id));
    const wide = row.length === 2 ? '6x1' : row.length === 3 ? '4x1' : '3x1';

    return (
        <article id={id} className="intro-chapter" data-layout={main ? 'board' : 'text'} data-flip={flip ? 'true' : undefined} aria-labelledby={`${id}-title`}>
            <header className="intro-chapter__head">
                <p className="wh-label chapter-label">{chapter.label}</p>
                {/* The poster word is rare: only a chapter with no drawing shows it. */}
                {!main && chapter.poster ? <p className="intro-poster">{chapter.poster}</p> : null}
                <h3 id={`${id}-title`} className="wh-headline wh-headline--item">{chapter.headline}</h3>
                <p className="chapter-lead">{chapter.lead}</p>
            </header>

            {main ? (
                <Bento className="intro-board">
                    <IntroTile tile={main} n={number(main)} lg="8x2" md="8x2" light />
                    {small.map((tile) => (
                        <IntroTile key={tile.id} tile={tile} n={number(tile)} lg="4x1" md="4x1" />
                    ))}
                </Bento>
            ) : null}

            <div className="intro-body" data-rail={rail.length || proof.length ? 'true' : undefined}>
                <div className="intro-prose">
                    <div className="chapter-text">
                        <RichParagraphs items={chapter.paragraphs} linkClassName="link link--inline intro-ref" />
                    </div>
                    {chapter.tools.length ? (
                        <div className="intro-tools">
                            <p className="wh-label">{t.intro.toolsLabel}</p>
                            <ul className="wh-tags">
                                {chapter.tools.map((tool) => <li key={tool}>{tool}</li>)}
                            </ul>
                        </div>
                    ) : null}
                </div>
                {rail.length || proof.length ? (
                    <Reveal as="aside" className="intro-rail">
                        {rail.map((tile) => (
                            <IntroTile key={tile.id} tile={tile} n={number(tile)} />
                        ))}
                        {proof.length ? <Proof items={proof} /> : null}
                    </Reveal>
                ) : null}
            </div>

            {row.length ? (
                <Bento className="intro-row">
                    {row.map((tile, i) => (
                        <IntroTile key={tile.id} tile={tile} n={number(tile)} lg={wide} md={row.length === 3 && i === 2 ? '8x1' : '4x1'} />
                    ))}
                </Bento>
            ) : null}

            <FigmaRow ids={figma} />
        </article>
    );
}
