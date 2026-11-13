// Flowchart geometry. Pure functions: positions in, SVG numbers out.
//
// A layout gives each node a [column, row] cell. Edges are straight lines from
// node border to node border. `links` are dashed lines that are not a step.

export const GRID = { pitchX: 196, pitchY: 104, nodeW: 160, nodeH: 52, pad: 24, gap: 5 };

export const LAYOUTS = {
    bodyshop: {
        cells: { registry: [1, 0], model: [2, 0], app: [0, 1], api: [1, 1], storage: [2, 1], cdn: [1, 2], curation: [2, 2] },
        links: [['storage', 'cdn']],
    },
    survey: {
        cells: { people: [0, 0], cdn: [1, 0], web: [2, 0], cache: [1, 1], api: [2, 1], db: [2, 2] },
    },
    oracle: {
        cells: { hcm: [0, 0], map: [1, 0], queries: [2, 0], views: [0, 1], design: [1, 1], science: [2, 1] },
        links: [['map', 'design']],
    },
    hivemind: {
        cells: { train: [0, 0], bucket: [1, 0], api: [2, 0], client: [2, 1] },
    },
    ruph: {
        cells: { agent: [0, 0], ledger: [2, 0], api: [1, 1], human: [0, 2], ci: [1, 2], providers: [2, 2] },
    },
};

export function center([col, row], grid = GRID) {
    return {
        x: grid.pad + grid.nodeW / 2 + col * grid.pitchX,
        y: grid.pad + grid.nodeH / 2 + row * grid.pitchY,
    };
}

export function size(cells, grid = GRID) {
    const cols = Math.max(...Object.values(cells).map(([c]) => c)) + 1;
    const rows = Math.max(...Object.values(cells).map(([, r]) => r)) + 1;
    return {
        width: grid.pad * 2 + grid.nodeW + (cols - 1) * grid.pitchX,
        height: grid.pad * 2 + grid.nodeH + (rows - 1) * grid.pitchY,
    };
}

/** The line between two node centres, cut at both node borders. `shift` moves it sideways. */
export function segment(a, b, shift = 0, grid = GRID) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    const halfW = grid.nodeW / 2 + grid.gap;
    const halfH = grid.nodeH / 2 + grid.gap;
    const cut = Math.min(ux === 0 ? Infinity : halfW / Math.abs(ux), uy === 0 ? Infinity : halfH / Math.abs(uy));
    const ox = -uy * shift;
    const oy = ux * shift;
    return {
        x1: a.x + ux * cut + ox,
        y1: a.y + uy * cut + oy,
        x2: b.x - ux * cut + ox,
        y2: b.y - uy * cut + oy,
        angle: (Math.atan2(dy, dx) * 180) / Math.PI,
    };
}

/**
 * One drawable line for each pair of nodes that has a step.
 * Steps with the same from and to share a line. A pair with steps in both
 * directions gets two lines, moved apart.
 */
export function buildLines(edges, cells, grid = GRID) {
    const lines = new Map();
    edges.forEach(([from, to], step) => {
        const key = `${from}>${to}`;
        if (!lines.has(key)) lines.set(key, { key, from, to, steps: [] });
        lines.get(key).steps.push(step);
    });
    return [...lines.values()].map((line) => {
        const twoWay = lines.has(`${line.to}>${line.from}`);
        return { ...line, ...segment(center(cells[line.from], grid), center(cells[line.to], grid), twoWay ? 7 : 0, grid) };
    });
}

/** "Go API (Gin)" -> { name: "Go API", sub: "Gin" } */
export function splitLabel(label) {
    const match = /^(.*?)\s*\((.+)\)$/.exec(label);
    return match ? { name: match[1], sub: match[2] } : { name: label, sub: '' };
}
