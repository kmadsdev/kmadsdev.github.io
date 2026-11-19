// Rich text: one paragraph with links.
//
// A paragraph is an array of parts. A part is a string, or a link { text, to }.
//   to: '#case-bodyshop'            an anchor on this page (must be in facts.anchors)
//   to: 'https://github.com/...'    another site (https only)
//
//   ['I led 6 engineers on ', link('BodyShop', '#case-bodyshop'), '.']
//
// A plain string is also a valid paragraph (no link).

/** One link part. */
export function link(text, to) {
    return { text, to };
}

/** The parts of a paragraph, always as an array. */
export function parts(paragraph) {
    return Array.isArray(paragraph) ? paragraph : [paragraph];
}

/** True when the part is a link. */
export function isLink(part) {
    return typeof part === 'object' && part !== null && typeof part.to === 'string';
}

/** True when the target is an anchor on this page. */
export function isAnchor(to) {
    return to.startsWith('#');
}

/** The paragraph as one string, for search text, alt text and tests. */
export function plain(paragraph) {
    return parts(paragraph).map((part) => (isLink(part) ? part.text : part)).join('');
}

/** Every link of a paragraph. */
export function links(paragraph) {
    return parts(paragraph).filter(isLink);
}
