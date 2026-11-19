// One chapter of "What I do", from its data. The same component renders all eight.
// A chapter is ONE compact block (CONTRACT.md section 9, the height budget):
//
//   head      label, headline, lead
//   block     text side: the first paragraph, the proof links, the numbers
//             object side: the main drawing, large (or the numbers and links
//             when the chapter has no drawing). `flip` changes the sides.
//   more      a native <details>: the other paragraphs, the text form of the
//             drawing and of each number, the tools, the other tiles (a second
//             drawing, a note) and the row "From my Figma". Closed, it stays
//             in the page: nothing is lost with JavaScript off.
import { useState } from 'react';
import { facts } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Reveal } from '../bento/index.js';
import FigmaRow from '../FigmaRow.jsx';
import Icon from '../Icon.jsx';
import { RichParagraphs } from '../Rich.jsx';
import IntroTile, { DRAWINGS } from './IntroTile.jsx';

// A drawing that is taller than one screen in the block. The next drawing of the
// chapter takes its place, and the tall one moves into the disclosure.
const TALL = new Set(['clouds']);

/** How a chapter splits its tiles: the main drawing, the numbers and plain links, the rest. */
export function plan(chapter) {
    const drawn = chapter.tiles.filter((tile) => tile.kind === 'art');
    let main = drawn[0] ?? null;
    if (main && TALL.has(main.art) && drawn[1]) main = drawn[1];
    const figures = chapter.tiles.filter((tile) => tile.kind === 'stat' || (tile.kind === 'link' && !tile.art));
    const extras = chapter.tiles.filter((tile) => tile !== main && !figures.includes(tile));
    return { main, figures, extras };
}

const outside = (to) => /^https?:/.test(to);
const linkProps = (to) => (outside(to) ? { href: to, target: '_blank', rel: 'noopener noreferrer' } : { href: to });

function Proof({ items }) {
    const { t } = useLanguage();
    return (
        <div className="intro-proof">
            <p className="wh-label">{t.intro.proofLabel}</p>
            <ul>
                {items.map((item) => (
                    <li key={item.to + item.label}>
                        <a className="intro-proof__link" {...linkProps(item.to)}>
                            <span>
                                {item.label}
                                {outside(item.to) ? <span className="visually-hidden"> ({t.controls.external})</span> : null}
                            </span>
                            <Icon name={outside(item.to) ? 'arrow-up-right' : 'arrow-down'} size={13} />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** The numbers of a chapter as slim rows: value, short name, source. A plain link tile is a row too. */
function Figures({ items }) {
    const { t } = useLanguage();
    return (
        <ul className="intro-facts">
            {items.map((tile) =>
                tile.kind === 'link' ? (
                    <li key={tile.id}>
                        <a className="intro-fact intro-fact--link" {...linkProps(tile.to)}>
                            <span className="intro-fact__title">
                                {tile.title}
                                {outside(tile.to) ? <span className="visually-hidden"> ({t.controls.external})</span> : null}
                            </span>
                            <span className="intro-fact__text">{tile.text}</span>
                            <Icon name={outside(tile.to) ? 'arrow-up-right' : 'arrow-down'} size={14} />
                        </a>
                    </li>
                ) : (
                    <li key={tile.id} className="intro-fact">
                        <span className="intro-fact__value">{tile.value}</span>
                        <span className="intro-fact__title">{tile.title}</span>
                        {tile.source ? <span className="intro-fact__source">{t.intro.sourceLabel} / {tile.source}</span> : null}
                    </li>
                ),
            )}
        </ul>
    );
}

export default function IntroChapter({ chapter, flip = false, numbers = {} }) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const { main, figures, extras } = plan(chapter);
    const id = `intro-${chapter.id}`;
    const number = (tile) => numbers[`${chapter.id}/${tile.id}`];
    const Drawing = main ? DRAWINGS[main.art] : null;
    const drawing = main ? t.intro.art[main.art] : null;
    const [first, ...rest] = chapter.paragraphs;
    // A proof link that a link row of this chapter already gives is not shown twice.
    const given = new Set(figures.filter((tile) => tile.kind === 'link').map((tile) => tile.to));
    const proof = chapter.proof.filter((item) => !given.has(item.to));
    const figma = facts.figmaOrder.filter((key) => facts.figma[key].chapters.includes(chapter.id));
    // The text form of the drawing and of each number.
    const notes = [main, ...figures.filter((tile) => tile.kind === 'stat')].filter(Boolean);
    const more = rest.length || notes.length || chapter.tools.length || extras.length || figma.length;

    return (
        <article id={id} className="intro-chapter" data-flip={flip ? 'true' : undefined} aria-labelledby={`${id}-title`}>
            <header className="intro-chapter__head">
                <p className="wh-label chapter-label">{chapter.label}</p>
                <h3 id={`${id}-title`} className="wh-headline wh-headline--item">{chapter.headline}</h3>
                <p className="chapter-lead">{chapter.lead}</p>
            </header>

            <Reveal className="intro-block" data-object={Drawing ? 'drawing' : figures.length ? 'figures' : undefined}>
                <div className="intro-text">
                    <div className="chapter-text">
                        <RichParagraphs items={[first]} />
                    </div>
                    {proof.length ? <Proof items={proof} /> : null}
                    {Drawing && figures.length ? <Figures items={figures} /> : null}
                </div>
                {Drawing ? (
                    <figure className="intro-figure">
                        <p className="tile__label">
                            <span aria-hidden="true">D{number(main)} · </span>
                            {drawing.title}
                        </p>
                        <div className="intro-figure__frame"><Drawing /></div>
                    </figure>
                ) : figures.length ? (
                    <Figures items={figures} />
                ) : null}
            </Reveal>

            {more ? (
                <details className="intro-more" onToggle={(event) => setOpen(event.currentTarget.open)}>
                    <summary>
                        <span>{open ? t.controls.readLess : t.controls.readMore}</span>
                        <Icon name="arrow-down" size={14} />
                    </summary>
                    <div className="intro-more__body" data-side={extras.length ? 'true' : undefined}>
                        <div className="intro-more__main">
                            {rest.length ? (
                                <div className="chapter-text">
                                    <RichParagraphs items={rest} />
                                </div>
                            ) : null}
                            {notes.length ? (
                                <dl className="intro-notes">
                                    {notes.map((tile) => (
                                        <div key={tile.id}>
                                            <dt>{tile.kind === 'stat' ? `${tile.value} · ${tile.title}` : tile.title}</dt>
                                            <dd>{tile.text}</dd>
                                            {tile === main && Drawing ? <dd>{drawing.summary}</dd> : null}
                                        </div>
                                    ))}
                                </dl>
                            ) : null}
                            {chapter.tools.length ? (
                                <div className="intro-tools">
                                    <p className="wh-label">{t.intro.toolsLabel}</p>
                                    <ul className="wh-tags">
                                        {chapter.tools.map((tool) => <li key={tool}>{tool}</li>)}
                                    </ul>
                                </div>
                            ) : null}
                        </div>
                        {extras.length ? (
                            <div className="intro-more__side">
                                {extras.map((tile) => (
                                    <IntroTile key={tile.id} tile={tile} n={number(tile)} />
                                ))}
                            </div>
                        ) : null}
                        <FigmaRow ids={figma} />
                    </div>
                </details>
            ) : null}
        </article>
    );
}
