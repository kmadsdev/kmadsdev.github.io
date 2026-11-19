// Contrast of every text colour pair of the site (WCAG 2.x). Run: node scripts/contrast.mjs
// It reads the --c-* values from src/styles/ds/tokens.css and fails below 4.5:1
// (3:1 for the pairs marked "large": 24px+, or 18.66px+ bold).
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../src/styles/ds/tokens.css', import.meta.url), 'utf8');
const token = (name) => {
    const match = new RegExp(`--c-${name}:\\s*(#[0-9A-Fa-f]{6})`).exec(css);
    if (!match) throw new Error(`token --c-${name} is not a hex colour`);
    return match[1];
};
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const lum = (hex) => {
    const [r, g, b] = rgb(hex).map((v) => (v / 255 <= 0.04045 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
};

const PAIRS = [
    ['text-strong', 'ground'], ['text-strong', 'tile'], ['text-strong', 'tile-2'], ['text-strong', 'tile-3'],
    ['text', 'ground'], ['text', 'tile'], ['text', 'tile-2'],
    ['text-muted', 'ground'], ['text-muted', 'tile'], ['text-muted', 'tile-2'],
    ['text-faint', 'ground'], ['text-faint', 'tile'], ['text-faint', 'tile-2'],
    ['red-text', 'ground'], ['red-text', 'tile'],
    ['on-red', 'red'], ['on-red', 'red-hover'], ['on-red', 'red-pressed'],
    ['ground', 'text-strong'],
    ['red', 'ground', 'large'], ['mint', 'ground', 'large'], ['line-control', 'ground', 'large'],
];
let failed = 0;
for (const [fg, bg, size] of PAIRS) {
    const value = ratio(token(fg), token(bg));
    const min = size === 'large' ? 3 : 4.5;
    const ok = value >= min;
    if (!ok) failed += 1;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${value.toFixed(2).padStart(5)}:1  ${fg} on ${bg}${size ? ' (large text or a control edge, 3:1)' : ''}`);
}
if (failed) {
    console.error(`${failed} pair(s) below the limit.`);
    process.exit(1);
}
