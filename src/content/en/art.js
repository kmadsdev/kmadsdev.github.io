// Text of the illustrations (labels for screen readers, names on the drawings)
// and of the temporary kit chapter. `showcase` leaves when the introduction lands.

export const art = {
    archRuns: {
        label: 'Diagram of a request path: browser, edge, gateway, then one of two hosts, then the database. The gateway sends each request to the next host in turn.',
        nodes: { browser: 'Browser', edge: 'Edge', gateway: 'Gateway', hostA: 'Host A', hostB: 'Host B', db: 'Database' },
    },
    fuelMap: {
        label: 'Drawing of the fuel map of an engine control unit: a surface over a grid of engine speed and load. A red point shows the cell in use during one pull through the gears.',
        rpm: 'RPM',
        load: 'Load',
    },
};

export const showcase = {
    label: 'Kit',
    title: 'The parts of the board',
    lead: 'A temporary chapter. It shows the grid, the tile kinds and two drawings, so that each new section starts from the same parts.',
    arch: {
        name: 'Request path',
        title: 'A request crosses the edge and the gateway',
        text: 'The gateway sends each request to the next host in turn. The line in use is red and the packet is the request.',
    },
    fuel: {
        name: 'Fuel map',
        title: 'An engine control unit reads one cell at a time',
        text: 'Engine speed and load choose the cell. I study these maps on old Honda Civics.',
    },
    stat: { unit: 'years', source: 'of engineering experience.' },
    list: { name: 'Languages I write', title: 'Backend first' },
    link: { title: 'Applications in production', text: 'The proof is lower on the page.' },
};
