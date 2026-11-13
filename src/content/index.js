// Entry point of the text layer.
//
//   facts.js   numbers, dates, names, links (both languages read it)
//   en/*.js    English sentences
//   pt/*.js    Portuguese sentences, same keys as en/
//
// `npm test` fails when en/ and pt/ do not have the same keys.
import * as en from './en/index.js';
import * as pt from './pt/index.js';

export { facts } from './facts.js';
export const content = { en: { ...en }, pt: { ...pt } };
