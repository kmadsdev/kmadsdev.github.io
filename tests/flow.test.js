import { describe, expect, it } from 'vitest';
import { facts } from '../src/content/facts.js';
import { GRID, LAYOUTS, MAX_CHARS, NARROW, NARROW_GRID, buildLines, center, segment, size, splitLabel, wrapLabel } from '../src/components/flowGeometry.js';
import { content } from '../src/content/index.js';

describe('flowchart layouts', () => {
    it('places every node of every case in its own cell', () => {
        for (const id of facts.caseOrder) {
            const { nodes } = facts.cases[id].flow;
            const cells = LAYOUTS[id].cells;
            expect(Object.keys(cells).sort(), id).toEqual([...nodes].sort());
            const taken = Object.values(cells).map((cell) => cell.join(','));
            expect(new Set(taken).size, `${id} has two nodes in one cell`).toBe(taken.length);
        }
    });

    it('draws no step line through a third node', () => {
        for (const id of facts.caseOrder) {
            const { edges } = facts.cases[id].flow;
            const cells = LAYOUTS[id].cells;
            for (const line of buildLines(edges, cells)) {
                for (const [other, cell] of Object.entries(cells)) {
                    if (other === line.from || other === line.to) continue;
                    const c = center(cell);
                    for (let t = 0; t <= 1; t += 0.02) {
                        const x = line.x1 + (line.x2 - line.x1) * t;
                        const y = line.y1 + (line.y2 - line.y1) * t;
                        const inside = Math.abs(x - c.x) < GRID.nodeW / 2 && Math.abs(y - c.y) < GRID.nodeH / 2;
                        expect(inside, `${id}: ${line.key} crosses ${other}`).toBe(false);
                    }
                }
            }
        }
    });
});


// The same rules for the tall layout of each chart (a phone), plus its own limits.
const crossings = (segments, cells, grid, skip) => {
    const found = [];
    for (const line of segments) {
        for (const [other, cell] of Object.entries(cells)) {
            if (skip(line, other)) continue;
            const c = center(cell, grid);
            for (let t = 0; t <= 1; t += 0.01) {
                const x = line.x1 + (line.x2 - line.x1) * t;
                const y = line.y1 + (line.y2 - line.y1) * t;
                if (Math.abs(x - c.x) < grid.nodeW / 2 && Math.abs(y - c.y) < grid.nodeH / 2) {
                    found.push(`${line.key} crosses ${other}`);
                    break;
                }
            }
        }
    }
    return found;
};

describe('narrow (tall) flowchart layouts', () => {
    it('places every node of every case in its own cell, at most two side by side', () => {
        for (const id of facts.caseOrder) {
            const { nodes } = facts.cases[id].flow;
            const cells = NARROW[id].cells;
            expect(Object.keys(cells).sort(), id).toEqual([...nodes].sort());
            const taken = Object.values(cells).map((cell) => cell.join(','));
            expect(new Set(taken).size, `${id} has two nodes in one cell`).toBe(taken.length);
            for (const [col] of Object.values(cells)) expect([0, 1], `${id} column`).toContain(col);
        }
    });

    it('fits a 320px phone at full size (the frame there is about 270px wide)', () => {
        for (const id of facts.caseOrder) expect(size(NARROW[id].cells, NARROW_GRID).width, id).toBeLessThanOrEqual(270);
    });

    it('draws no step line and no dashed link through a third node', () => {
        for (const id of facts.caseOrder) {
            const { edges } = facts.cases[id].flow;
            const cells = NARROW[id].cells;
            const steps = buildLines(edges, cells, NARROW_GRID);
            expect(crossings(steps, cells, NARROW_GRID, (line, other) => other === line.from || other === line.to), id).toEqual([]);
            const links = (NARROW[id].links ?? []).map(([a, b]) => ({ key: `${a}-${b}`, ...segment(center(cells[a], NARROW_GRID), center(cells[b], NARROW_GRID), 0, NARROW_GRID) }));
            const ends = Object.fromEntries((NARROW[id].links ?? []).map(([a, b]) => [`${a}-${b}`, [a, b]]));
            expect(crossings(links, cells, NARROW_GRID, (line, other) => ends[line.key].includes(other)), id).toEqual([]);
        }
    });

    it('ends each line on the two node borders', () => {
        for (const id of facts.caseOrder) {
            const cells = NARROW[id].cells;
            for (const line of buildLines(facts.cases[id].flow.edges, cells, NARROW_GRID)) {
                const a = center(cells[line.from], NARROW_GRID);
                const b = center(cells[line.to], NARROW_GRID);
                const out = (x, y, c) => Math.abs(x - c.x) >= NARROW_GRID.nodeW / 2 || Math.abs(y - c.y) >= NARROW_GRID.nodeH / 2;
                expect(out(line.x1, line.y1, a), `${id} ${line.key} start`).toBe(true);
                expect(out(line.x2, line.y2, b), `${id} ${line.key} end`).toBe(true);
                const gap = (x, y, c) => Math.max(Math.abs(x - c.x) - NARROW_GRID.nodeW / 2, Math.abs(y - c.y) - NARROW_GRID.nodeH / 2);
                expect(gap(line.x1, line.y1, a), `${id} ${line.key} start gap`).toBeLessThanOrEqual(NARROW_GRID.gap + 7.5);
                expect(gap(line.x2, line.y2, b), `${id} ${line.key} end gap`).toBeLessThanOrEqual(NARROW_GRID.gap + 7.5);
            }
        }
    });

    it('fits every node name in its box in both languages (at most two lines of MAX_CHARS)', () => {
        for (const lang of ['en', 'pt']) {
            for (const item of content[lang].cases.items) {
                if (!item.flow) continue;
                for (const label of Object.values(item.flow.nodes)) {
                    const { name, sub } = splitLabel(label);
                    for (const [key, max] of Object.entries(MAX_CHARS)) {
                        const lines = wrapLabel(name, max);
                        expect(lines.length + (sub ? 1 : 0), `${lang} ${item.id} "${label}" ${key}`).toBeLessThanOrEqual(key === 'narrow' ? 3 : 2);
                        for (const line of lines) expect(line.length, `${lang} "${line}" ${key}`).toBeLessThanOrEqual(max);
                    }
                }
            }
        }
    });
});

describe('flowchart geometry', () => {
    it('sizes the drawing from the cells', () => {
        expect(size({ a: [0, 0], b: [2, 1] })).toEqual({ width: 24 * 2 + 160 + 2 * 196, height: 24 * 2 + 52 + 104 });
    });

    it('cuts a horizontal line at the two node borders', () => {
        const line = segment(center([0, 0]), center([1, 0]));
        expect(line.x1).toBe(24 + 160 + GRID.gap);
        expect(line.x2).toBe(24 + 196 - GRID.gap);
        expect(line.y1).toBe(line.y2);
        expect(line.angle).toBe(0);
    });

    it('shares one line between steps with the same direction and splits two-way pairs', () => {
        const cells = { a: [0, 0], b: [1, 0] };
        const lines = buildLines([['a', 'b'], ['b', 'a'], ['a', 'b']], cells);
        expect(lines.map((l) => l.steps)).toEqual([[0, 2], [1]]);
        expect(lines[0].y1).not.toBe(lines[1].y1);
    });

    it('splits a label into a name and a detail', () => {
        expect(splitLabel('Go API (Gin)')).toEqual({ name: 'Go API', sub: 'Gin' });
        expect(splitLabel('CloudFront')).toEqual({ name: 'CloudFront', sub: '' });
    });

    it('wraps a long node name at spaces', () => {
        expect(wrapLabel('Questionário de vendas', 13)).toEqual(['Questionário', 'de vendas']);
        expect(wrapLabel('Amazon S3', 13)).toEqual(['Amazon S3']);
    });
});
