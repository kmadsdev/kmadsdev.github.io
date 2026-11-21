// Date text for both languages. Input is 'YYYY-MM' from contents.global.js.

const MONTHS = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
};
const NOW = { en: 'present', pt: 'hoje' };

/** monthYear('2025-12', 'pt') -> 'dez 2025' */
export function monthYear(value, lang) {
    const [year, month] = value.split('-');
    return `${MONTHS[lang][Number(month) - 1]} ${year}`;
}

/** period({ start: '2025-12', end: null }, 'en') -> 'Dec 2025 – present' */
export function period({ start, end }, lang) {
    return `${monthYear(start, lang)} – ${end ? monthYear(end, lang) : NOW[lang]}`;
}

/** years({ start: 2018, end: 2023 }) -> '2018 – 2023' */
export function years({ start, end }) {
    return `${start} – ${end}`;
}

/** Portuguese number text: ptNumber('8.8M') -> '8,8M', ptNumber('2,200') -> '2.200' */
export function ptNumber(value) {
    return String(value).replace(/[.,]/g, (mark) => (mark === '.' ? ',' : '.'));
}

/** duration(433) -> '7 min 13 s', duration(26) -> '26 s'. The same text in both languages. */
export function duration(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes ? `${minutes} min ${seconds} s` : `${seconds} s`;
}

/** Number text for one language: local('18.6', 'pt') -> '18,6', local('18.6', 'en') -> '18.6' */
export function local(value, lang) {
    return lang === 'pt' ? ptNumber(value) : String(value);
}
