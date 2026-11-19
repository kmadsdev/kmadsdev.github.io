// Entry point of the text layer. All the text and all the addresses of the site
// are in content.js: links (PART 1), facts (PART 2), English (PART 3), Portuguese (PART 4).
//
// `npm test` fails when content.en and content.pt do not have the same keys.
export { content, facts, links } from './content.js';
