// Rich text: one paragraph with links and bold text.
//
// A paragraph is an array of parts. A part is a string, or an object:
//   { text, to }              a link
//   { text, strong: true }    bold text
//   { text, to, strong: true } a bold link
//   to: '#case-bodyshop'            an anchor on this page (must be in the anchors list)
//   to: 'https://github.com/...'    another site (https only)
//
//   ['I led 6 engineers on ', { text: 'BodyShop', to: '#case-bodyshop' }, '.']
//   [{ text: 'My name is Kaique Souza', strong: true }, ', and ...']
//
// A plain string is also a valid paragraph (no link).

/** One link part. */
export function link(text, to) {
    return { text, to };
}

/** One bold part. */
export function strong(text) {
    return { text, strong: true };
}

/** The parts of a paragraph, always as an array. */
export function parts(paragraph) {
    return Array.isArray(paragraph) ? paragraph : [paragraph];
}

/** True when the part is a link. */
export function isLink(part) {
    return typeof part === 'object' && part !== null && typeof part.to === 'string';
}

/** True when the part is bold (a bold part can also be a link). */
export function isStrong(part) {
    return typeof part === 'object' && part !== null && part.strong === true;
}

/** True when the target is an anchor on this page. */
export function isAnchor(to) {
    return to.startsWith('#');
}

/** The paragraph as one string, for search text, alt text and tests. */
export function plain(paragraph) {
    return parts(paragraph).map((part) => (typeof part === 'string' ? part : part.text)).join('');
}

/** Every link of a paragraph. */
export function links(paragraph) {
    return parts(paragraph).filter(isLink);
}
