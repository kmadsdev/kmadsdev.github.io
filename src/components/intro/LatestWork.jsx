// The card "My latest work", under the photo of the opening.
// A label, the project name, one line about it, a small diagram and one paragraph.
// The diagram is a cut of the request path that consignado.kmads.dev shows, in the look of that
// site: a dark blue ground with dots, green lines, the measured time of each stage in a pill.
// Data: `latestWork` (contents.global.js). Text: intro.opening.latest of the language file.
import { latestWork } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import Rich from '../Rich.jsx';

// Places of the six stages, in units of the drawing (300 x 236). One unit is about one pixel, so the text is 11px and more. The path goes right, down, then left.
const AT = {
    user: [48, 44],
    edge: [150, 44],
    gateway: [252, 44],
    balancer: [252, 176],
    pod: [150, 176],
    database: [48, 176],
};
const HALF = 18; // from the centre of an icon to the start of a line

const ICONS = {
    user: (
        <g>
            <rect x="-12" y="-9" width="24" height="18" rx="2.5" fill="#35B8F5" />
            <rect x="-12" y="-9" width="24" height="5" rx="2.5" fill="#8FDBFF" />
        </g>
    ),
    edge: (
        <g fill="none" stroke="#B8C4D4" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M0 -12l10 3.5v6.5c0 6-4.2 10.5-10 13c-5.8-2.5-10-7-10-13v-6.5z" />
            <circle r="4.6" />
            <path d="M-4.6 0h9.2M0 -4.6v9.2" strokeWidth="1.1" />
        </g>
    ),
    gateway: (
        <g>
            <path d="M-7 -6l-6 6l6 6M7 -6l6 6l-6 6" fill="none" stroke="#3B9BFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.5 -12l-7 13h4.5l-2.5 11l7.5-14h-4.5z" fill="#FFC83D" />
        </g>
    ),
    balancer: (
        <g>
            <rect x="-9.5" y="-9.5" width="19" height="19" rx="3" fill="#6FBF2E" transform="rotate(45)" />
            <circle r="3.4" fill="#fff" />
            <path d="M-9 0h4M5 0h4M0 -9v4M0 5v4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </g>
    ),
    pod: (
        <g>
            <path d="M0 -13l11.3 6.5v13L0 13l-11.3-6.5v-13z" fill="#326CE5" />
            <path d="M0 -6l5.5 3v6L0 6l-5.5-3v-6zM-5.5 -3L0 0l5.5-3M0 0v6" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
        </g>
    ),
    database: (
        <g>
            <path d="M-9 -8v16c0 2.2 4 4 9 4s9-1.8 9-4v-16" fill="#2F7FD6" />
            <ellipse cy="-8" rx="9" ry="4" fill="#6CB6FF" />
            <path d="M-9 0c0 2.2 4 4 9 4s9-1.8 9-4" fill="none" stroke="#6CB6FF" strokeWidth="1.2" />
        </g>
    ),
};

/** The line into `to` from the stage before it: straight, with an arrow head and an optional name. */
function Edge({ from, to, label }) {
    const [x1, y1] = AT[from];
    const [x2, y2] = AT[to];
    const down = x1 === x2;
    const dir = Math.sign(x2 - x1);
    // A line down starts under the text of the stage above it and ends over the icon below.
    const a = down ? [x1, y1 + 50] : [x1 + dir * HALF, y1];
    const b = down ? [x2, y2 - 38] : [x2 - dir * HALF, y2];
    const angle = down ? 90 : dir > 0 ? 0 : 180;
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const width = label ? label.length * 6.2 + 8 : 0;
    return (
        <g>
            <path className="latest-map__edge" d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`} />
            <path className="latest-map__head" d="M0 0l-5.5 -3v6z" transform={`translate(${b[0]} ${b[1]}) rotate(${angle})`} />
            {label ? (
                <>
                    <rect className="latest-map__gap" x={mid[0] - width / 2} y={mid[1] - 8} width={width} height="16" />
                    <text className="latest-map__edge-name" x={mid[0]} y={mid[1] + 4}>{label}</text>
                </>
            ) : null}
        </g>
    );
}

function Stage({ node }) {
    const [x, y] = AT[node.id];
    const width = node.time.length * 6.7 + 22;
    return (
        <g transform={`translate(${x} ${y})`}>
            {ICONS[node.id]}
            <text className="latest-map__name" y="32">{node.name}</text>
            <text className="latest-map__sub" y="45">{node.sub}</text>
            <g transform={`translate(${-width / 2} -37)`}>
                <rect className="latest-map__pill" width={width} height="16" rx="8" />
                <path className="latest-map__tick" d="M6.5 8.2l2 2l3.4-4" />
                <text className="latest-map__time" x="16" y="12">{node.time}</text>
            </g>
        </g>
    );
}

function Map({ alt }) {
    const { nodes, edges, frame } = latestWork;
    return (
        <svg className="latest-map" viewBox="0 0 300 236" role="img" aria-label={alt}>
            <defs>
                <pattern id="latest-map-dots" width="18" height="18" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.7" className="latest-map__dot" />
                </pattern>
            </defs>
            <rect width="300" height="236" fill="url(#latest-map-dots)" />
            <rect className="latest-map__frame" x="98" y="118" width="104" height="112" rx="5" />
            <text className="latest-map__frame-name" x="105" y="132">{frame}</text>
            {nodes.slice(1).map((node, i) => <Edge key={node.id} from={nodes[i].id} to={node.id} label={edges[node.id]} />)}
            {nodes.map((node) => <Stage key={node.id} node={node} />)}
        </svg>
    );
}

export default function LatestWork() {
    const { latest } = useLanguage().t.intro.opening;
    return (
        <article className="latest-work" aria-labelledby="latest-work-title">
            <p className="wh-label latest-work__label">{latest.label}</p>
            <h4 id="latest-work-title" className="latest-work__title">{latest.title}</h4>
            <p className="latest-work__subtitle">{latest.subtitle}</p>
            <figure className="latest-work__map"><Map alt={latest.diagramAlt} /></figure>
            <p className="latest-work__text"><Rich text={latest.paragraph} linkClassName="link link--inline intro-ref" /></p>
        </article>
    );
}
