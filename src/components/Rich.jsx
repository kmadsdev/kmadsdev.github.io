// Renders rich text from src/content/rich.js.
//
//   <p><Rich text={paragraph} /></p>
//   <RichParagraphs items={chapter.paragraphs} className="chapter-text" />
//
// An anchor is a normal link on this page. A link to another site follows the
// rules of ExternalLink.jsx (new tab, arrow, text for screen readers).
// A part with `strong: true` is bold (<strong>), also when it is a link.
import { isAnchor, isLink, isStrong, parts } from '../content/rich.js';
import ExternalLink from './ExternalLink.jsx';

function Part({ part, linkClassName }) {
    if (!isLink(part)) return typeof part === 'string' ? part : part.text;
    if (isAnchor(part.to)) return <a className={linkClassName} href={part.to}>{part.text}</a>;
    return <ExternalLink href={part.to} className={linkClassName}>{part.text}</ExternalLink>;
}

export default function Rich({ text, linkClassName = 'link link--inline' }) {
    return parts(text).map((part, i) => {
        const inner = <Part part={part} linkClassName={linkClassName} />;
        return isStrong(part) ? <strong key={i}>{inner}</strong> : <span key={i}>{inner}</span>;
    });
}

/** One <p> for each paragraph of a list. */
export function RichParagraphs({ items, className, linkClassName }) {
    return items.map((paragraph, i) => (
        <p key={i} className={className}><Rich text={paragraph} linkClassName={linkClassName} /></p>
    ));
}
