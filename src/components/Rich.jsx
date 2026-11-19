// Renders rich text from src/content/rich.js.
//
//   <p><Rich text={paragraph} /></p>
//   <RichParagraphs items={chapter.paragraphs} className="chapter-text" />
//
// An anchor is a normal link on this page. A link to another site follows the
// rules of ExternalLink.jsx (new tab, arrow, text for screen readers).
import { isAnchor, isLink, parts } from '../content/rich.js';
import ExternalLink from './ExternalLink.jsx';

export default function Rich({ text, linkClassName = 'link link--inline' }) {
    return parts(text).map((part, i) => {
        if (!isLink(part)) return <span key={i}>{part}</span>;
        if (isAnchor(part.to)) {
            return <a key={i} className={linkClassName} href={part.to}>{part.text}</a>;
        }
        return <ExternalLink key={i} href={part.to} className={linkClassName}>{part.text}</ExternalLink>;
    });
}

/** One <p> for each paragraph of a list. */
export function RichParagraphs({ items, className, linkClassName }) {
    return items.map((paragraph, i) => (
        <p key={i} className={className}><Rich text={paragraph} linkClassName={linkClassName} /></p>
    ));
}
