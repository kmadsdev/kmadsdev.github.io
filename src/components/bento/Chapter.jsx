// Frame of one chapter: a label, one headline, one short lead, then the content.
// The eye has one path: label, headline, lead, main object, tiles, link to the proof.
//
// Inside a chapter, use:
//   <Bento> + <Tile>              the tiles
//   <div className="chapter-text"> long prose (never inside a tile)
//   <div className="split">        text column on one side, the main object on the other
//   <ChapterGroup title>           a named part of a chapter (h3)
/** The head of a chapter: the label, the headline (h2, id "<id>-title") and the lead. */
export function ChapterHead({ id, label, title, lead }) {
    return (
        <header className="chapter-head">
            {label ? <p className="wh-label chapter-label">{label}</p> : null}
            <h2 id={`${id}-title`} className="wh-headline wh-headline--section">{title}</h2>
            {lead ? <p className="chapter-lead">{lead}</p> : null}
        </header>
    );
}

// With no `title`, the chapter does not render its head: the content places a <ChapterHead> itself
// (the introduction, where the head stands in the left column beside the photo).
export default function Chapter({ id, label, title, lead, className = '', children }) {
    return (
        <section id={id} className={`chapter ${className}`.trim()} aria-labelledby={`${id}-title`}>
            {title ? <ChapterHead id={id} label={label} title={title} lead={lead} /> : null}
            {children}
        </section>
    );
}

export function ChapterGroup({ id, title, lead, children }) {
    return (
        <div id={id} className="chapter-group">
            <header className="chapter-group__head">
                <h3 className="wh-headline wh-headline--item">{title}</h3>
                {lead ? <p className="chapter-lead">{lead}</p> : null}
            </header>
            {children}
        </div>
    );
}
