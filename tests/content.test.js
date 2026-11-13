import { describe, expect, it } from 'vitest';
import { content } from '../src/content/index.js';
import { facts } from '../src/content/facts.js';

/** Flat list of [path, value] for every leaf of an object. */
function leaves(value, path = '') {
    if (Array.isArray(value)) {
        return value.flatMap((item, i) => leaves(item, `${path}[${i}]`));
    }
    if (value && typeof value === 'object') {
        return Object.entries(value).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k));
    }
    return [[path, value]];
}

const en = leaves(content.en);
const pt = leaves(content.pt);
const all = [...en.map(([p, v]) => [`en.${p}`, v]), ...pt.map(([p, v]) => [`pt.${p}`, v])];
const strings = all.filter(([, v]) => typeof v === 'string');

describe('en and pt have the same shape', () => {
    it('has the same keys and the same list lengths', () => {
        expect(pt.map(([p]) => p).sort()).toEqual(en.map(([p]) => p).sort());
    });

    it('has the same value type at every key', () => {
        const ptTypes = Object.fromEntries(pt.map(([p, v]) => [p, typeof v]));
        for (const [path, value] of en) {
            expect(`${path}:${ptTypes[path]}`).toBe(`${path}:${typeof value}`);
        }
    });

    it('has no empty text', () => {
        const empty = strings.filter(([, v]) => v.trim() === '').map(([p]) => p);
        expect(empty).toEqual([]);
    });
});

describe('text rules (.claude/backlog/01-rules.md)', () => {
    const banned = [
        [/METRIC NEEDED|TO VERIFY|UNVERIFIED|TODO|undefined|\[object/, 'unfinished marker'],
        [/workaholic/i, 'Workaholic is never named'],
        [/\b(leverag\w*|spearhead\w*|passionate|cutting-edge|results-driven|apaixonad\w*)\b/i, 'banned word'],
        [/\b(kafka|rabbitmq|sqs|dynatrace|grafana|datadog|sonar\w*|fortify|\.net|sql server|kubernetes|aks|openshift)\b/i, 'tool not confirmed'],
        [/full-time student|ml engineer|8 years of experience|8 anos de experi/i, 'banned framing'],
        [/sal[aá]r|\bCLT\b|\bPJ\b|h[ií]brid|\bremot[eo]\b/i, 'personal information'],
        [/certifi/i, 'no certification is held'],
    ];

    it('has no em dash or en dash outside a date range', () => {
        const hits = strings
            .filter(([p, v]) => /\u2014/.test(v) || (/\u2013/.test(v) && !p.endsWith('.period')))
            .map(([p, v]) => `${p}: ${v}`);
        expect(hits).toEqual([]);
    });

    for (const [pattern, reason] of banned) {
        it(`has no ${reason}`, () => {
            const hits = strings.filter(([, v]) => pattern.test(v)).map(([p, v]) => `${p}: ${v}`);
            expect(hits).toEqual([]);
        });
    }

    it('uses the agreed experience wording in both languages', () => {
        const joined = (lang) => leaves(content[lang]).map(([, v]) => v).join(' ');
        expect(joined('en')).toContain('3 years of engineering experience');
        expect(joined('pt')).toContain('3 anos de experiência em engenharia');
    });

    it('shows only the public location line', () => {
        expect(content.en.hero.location).toBe('Brazil (UTC-3)');
        expect(content.pt.hero.location).toBe('Brasil (UTC-3)');
    });
});

describe('facts', () => {
    it('uses the public contact address', () => {
        expect(facts.contact.email).toBe('contact@kmads.dev');
    });

    it('has only https links', () => {
        const urls = leaves(facts).filter(([p, v]) => typeof v === 'string' && /^https?:/.test(v));
        expect(urls.length).toBeGreaterThan(10);
        expect(urls.filter(([, v]) => !v.startsWith('https://'))).toEqual([]);
    });

    it('keeps PicPay dates as agreed', () => {
        expect(facts.picpay.fullTime.start).toBe('2025-12');
        expect(facts.picpay.partTime).toMatchObject({ start: '2025-03', end: '2025-11' });
    });

    it('gives every project and case one id that both languages describe', () => {
        const ids = (list) => list.map((item) => item.id);
        for (const lang of ['en', 'pt']) {
            expect(ids(content[lang].projects.items)).toEqual(facts.projectOrder);
            expect(ids(content[lang].cases.items)).toEqual(facts.caseOrder);
            for (const id of facts.projectOrder) expect(facts.projects[id], id).toBeTruthy();
            for (const id of facts.caseOrder) expect(facts.cases[id], id).toBeTruthy();
        }
    });

    it('labels every flowchart node and edge in both languages', () => {
        for (const lang of ['en', 'pt']) {
            for (const item of content[lang].cases.items) {
                const { nodes, edges } = facts.cases[item.id].flow;
                expect(Object.keys(item.flow.nodes).sort(), `${lang} ${item.id} nodes`).toEqual([...nodes].sort());
                expect(item.flow.steps.length, `${lang} ${item.id} steps`).toBe(edges.length);
                for (const [from, to] of edges) {
                    expect(nodes, `${item.id} edge ${from}->${to}`).toEqual(expect.arrayContaining([from, to]));
                }
            }
        }
    });

    it('gives every skill group a title in both languages', () => {
        for (const lang of ['en', 'pt']) {
            expect(content[lang].skills.groups.map((g) => g.id)).toEqual(Object.keys(facts.skills));
        }
    });
});
