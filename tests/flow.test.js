import { describe, expect, it } from 'vitest';
import { facts } from '../src/content/facts.js';
import { GRID, LAYOUTS, buildLines, center, segment, size, splitLabel } from '../src/components/flowGeometry.js';

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
});
