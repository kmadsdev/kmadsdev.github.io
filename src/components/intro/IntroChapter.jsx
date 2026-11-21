// One chapter of "What I do", from its data (CONTENT-SHAPE.md section 5).
// The same component renders all eight.
//
//   head      label, headline (h3), lead (optional, plain or rich)
//   block     text side: the paragraphs (always shown), "Read the full story" (only when
//             `story` exists), the number rows (only when `stats` has items).
//             other side: the drawings that fit a column, one under the other, then the row
//             "From my Figma". The proof links and the tool names stand in the shorter of the
//             two columns (TEXT_PER_DRAWING), so that no half of the column is empty.
//             `flip` changes the sides.
//   wide      a drawing that needs the full column (WIDE): under the block.
import { useState } from 'react';
import { chapterTools, figma as figmaPictures } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Reveal, ToggleSign } from '../bento/index.js';
import FigmaRow from '../FigmaRow.jsx';
import Icon from '../Icon.jsx';
import { ArtToggle, Playback, usePlayback } from '../art/kit/index.js';
import Rich, { RichParagraphs } from '../Rich.jsx';
import { plain } from '../../content/rich.js';
import { artA } from './artA.js';
import { artB } from './artB.js';

export const DRAWINGS = { ...artA, ...artB };
// Drawings that need the width of the column: a layout of many columns (the request path,
// the two flows of the default workflow) or a time axis.
export const WIDE = new Set(['requestPath', 'clouds', 'defaultWorkflow', 'timeline']);

// About the characters of prose that stand as high as one drawing at the side of the text.
// A chapter with more text than that puts its proof links and tools under the drawings.
const TEXT_PER_DRAWING = 900;

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

/** The number rows of a chapter: value, title, source. */
function Stats({ items }) {
    const { sourceLabel } = useLanguage().t.intro;
    return (
        <ul className="intro-facts">
            {items.map((stat) => (
                <li key={stat.id} className="intro-fact">
                    <span className="intro-fact__value">{stat.value}</span>
                    <span className="intro-fact__title">{stat.title}</span>
                    <span className="intro-fact__source">{sourceLabel} / {stat.source}</span>
                </li>
            ))}
        </ul>
    );
}

function Tools({ items }) {
    const { toolsLabel } = useLanguage().t.intro;
    if (!items?.length) return null;
    return (
        <div className="intro-tools">
            <p className="wh-label">{toolsLabel}</p>
            <ul className="intro-tools__list" aria-label={toolsLabel}>
                {items.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
        </div>
    );
}

function Story({ items }) {
    const { controls } = useLanguage().t;
    const [open, setOpen] = useState(false);
    return (
        <details className="intro-story" onToggle={(event) => setOpen(event.currentTarget.open)}>
            <summary className="toggle">
                <span>{open ? controls.readLess : controls.readMore}</span>
                <ToggleSign />
            </summary>
            <div className="chapter-text intro-story__body">
                <RichParagraphs items={items} />
            </div>
        </details>
    );
}

/** One drawing: its title (h4) and pause button in one row, a plain frame, one line of text. */
function Figure({ drawing, wide = false }) {
    const playback = usePlayback();
    const Drawing = DRAWINGS[drawing.art];
    return (
        <figure className="intro-figure" data-wide={wide ? 'true' : undefined}>
            <Playback value={playback}>
                <div className="intro-figure__bar">
                    <h4 className="tile__label intro-figure__title">{drawing.title}</h4>
                    <ArtToggle />
                </div>
                <div className="intro-figure__frame">{Drawing ? <Drawing /> : null}</div>
                <figcaption className="intro-figure__text">{drawing.text}</figcaption>
            </Playback>
        </figure>
    );
}

export default function IntroChapter({ chapter, flip = false }) {
    const id = `intro-${chapter.id}`;
    const side = chapter.drawings.filter((drawing) => !WIDE.has(drawing.art));
    const wide = chapter.drawings.filter((drawing) => WIDE.has(drawing.art));
    const figma = figmaPictures.filter((picture) => picture.chapters.includes(chapter.id)).map((picture) => picture.id);
    const textLength = chapter.paragraphs.reduce((sum, paragraph) => sum + plain(paragraph).length, 0);
    const metaAside = !side.length || textLength > TEXT_PER_DRAWING * side.length;
    const meta = (
        <>
            {chapter.proof.length ? <Proof items={chapter.proof} /> : null}
            <Tools items={chapterTools[chapter.id]} />
        </>
    );

    return (
        <article id={id} className="intro-chapter" data-flip={flip ? 'true' : undefined} aria-labelledby={`${id}-title`}>
            <header className="intro-chapter__head">
                <p className="wh-label chapter-label">{chapter.label}</p>
                <h3 id={`${id}-title`} className="wh-headline wh-headline--item">{chapter.headline}</h3>
                {chapter.lead ? <p className="chapter-lead"><Rich text={chapter.lead} /></p> : null}
            </header>

            <Reveal className="intro-block" data-object={side.length ? 'drawing' : 'meta'}>
                <div className="intro-text">
                    <div className="chapter-text">
                        <RichParagraphs items={chapter.paragraphs} />
                    </div>
                    {chapter.story?.length ? <Story items={chapter.story} /> : null}
                    {chapter.stats.length ? <Stats items={chapter.stats} /> : null}
                    {metaAside ? null : meta}
                </div>
                <div className="intro-side">
                    {side.map((drawing) => <Figure key={drawing.id} drawing={drawing} />)}
                    {metaAside ? meta : null}
                    <FigmaRow ids={figma} compact />
                </div>
            </Reveal>

            {wide.map((drawing) => <Figure key={drawing.id} drawing={drawing} wide />)}
        </article>
    );
}
