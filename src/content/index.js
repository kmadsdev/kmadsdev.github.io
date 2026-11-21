// Entry point of the text layer. Three files hold all the text and all the addresses:
//   contents.global.js   all that is equal in both languages: addresses, numbers, dates,
//                        names, stacks, list orders, drawing data, `meta`, `music`
//   contents.en.js       the English text
//   contents.pt.js       the Portuguese text (same keys in the same order)
//
// The language provider gives `t` = content.en or content.pt. A component that needs a fact
// imports its named export from here: `import { projects, art } from '../content/index.js'`.
// Check: npx vitest run tests/contents.test.js
import { en } from './contents.en.js';
import { pt } from './contents.pt.js';

export * from './contents.global.js';
export const content = { en, pt };

