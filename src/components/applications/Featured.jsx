// One featured application (facts.appOrder.featured).
// First view: the main object on one side (the gallery, the flowchart or the
// clip) and on the other side the status, name, tagline, short text, stack
// and links. The rest opens in place ("Show the details"): architecture and
// goals, for Ruph its case file (problem, decisions, result, numbers and the
// steps in words), and the Figma originals.
// `flagship` (Consignado Cloud): the head runs full width and the gallery is larger.
import { facts } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import FigmaRow from '../FigmaRow.jsx';
import { FlowChart, FlowSteps } from '../Flow.jsx';
import { useFlowPlayer } from '../useFlowPlayer.js';
import Clip from './Clip.jsx';
import Disclosure from './Disclosure.jsx';
import Gallery from './Gallery.jsx';
import { AppLinks, Stack, Status } from './parts.jsx';

/** The Figma originals that name this anchor, in the order of facts.figmaOrder. */
export const figmaFor = (anchor) => facts.figmaOrder.filter((id) => facts.figma[id]?.anchors.includes(anchor));

function List({ title, items, level = 5 }) {
    if (!items?.length) return null;
    const Title = `h${level}`;
    return (
        <div className="app-block">
            <Title className="wh-label app-block__title">{title}</Title>
            <ul className="app-block__list">
                {items.map((line) => <li key={line}>{line}</li>)}
            </ul>
        </div>
    );
}

function Head({ item, data, labels }) {
    return (
        <header className="app-feature__head">
            <Status data={data} labels={labels} />
            <h4 id={`${item.anchor}-title`} className="wh-headline wh-headline--item app-feature__name">{data.name}</h4>
            <p className="app-feature__tagline">{item.tagline}</p>
        </header>
    );
}

function Details({ item, labels, figma, extra = null }) {
    return (
        <Disclosure className="app-feature__details">
            <div className="app-feature__lists">
                <List title={labels.architecture} items={item.architecture} />
                <List title={labels.goals} items={item.goals} />
            </div>
            {extra}
            {figma.length ? <FigmaRow ids={figma} level={5} /> : null}
        </Disclosure>
    );
}

/** Ruph: the chart is the main object, its numbers and the steps in words open in place. */
function useCase(caseId) {
    const { cases } = useLanguage().t;
    const item = caseId ? cases.items.find((c) => c.id === caseId) : null;
    const data = caseId ? facts.cases[caseId] : null;
    const player = useFlowPlayer(data?.flow ? data.flow.edges.length : 1);
    if (!item || !data?.flow) return null;
    return {
        chart: <FlowChart caseId={caseId} structure={data.flow} text={item.flow} player={player} labels={cases.labels} />,
        extra: (
            <div className="app-case">
                <div className="app-case__story">
                    <h5 className="app-case__title">{item.title}</h5>
                    <div className="app-block">
                        <h6 className="wh-label app-block__title">{cases.labels.problem}</h6>
                        <p className="app-case__text">{item.problem}</p>
                    </div>
                    <List title={cases.labels.decisions} items={item.decisions} level={6} />
                    <div className="app-block">
                        <h6 className="wh-label app-block__title">{cases.labels.result}</h6>
                        <p className="app-case__text">{item.result}</p>
                    </div>
                </div>
                <div className="app-case__side">
                <dl className="app-case__stats">
                    {item.stats.map((stat) => (
                        <div key={stat.label}>
                            <dt>{stat.label}</dt>
                            <dd>{stat.value}</dd>
                        </div>
                    ))}
                </dl>
                <div className="app-block">
                    <h5 className="wh-label app-block__title">{cases.labels.flow}</h5>
                    <FlowSteps structure={data.flow} text={item.flow} player={player} stepLabel={cases.labels.step} />
                </div>
                </div>
            </div>
        ),
    };
}

export default function Featured({ item, labels, flagship = false, flip = false }) {
    const data = facts.projects[item.id];
    const figma = figmaFor(item.anchor);
    const caseView = useCase(item.caseId);

    let main = null;
    if (caseView) main = caseView.chart;
    else if (data.media && item.media) main = <Gallery name={data.name} media={data.media} text={item.media} labels={labels} />;
    else if (data.video || data.image) main = <figure className="gallery__main"><Clip video={data.video} poster={data.image} name={data.name} labels={labels} /></figure>;

    return (
        <article
            id={item.anchor}
            className="app-feature"
            data-layout={flagship ? 'flagship' : 'row'}
            data-flip={flip ? 'true' : undefined}
            aria-labelledby={`${item.anchor}-title`}
        >
            {flagship ? <Head item={item} data={data} labels={labels} /> : null}
            <div className="app-feature__grid">
                <div className="app-feature__main">{main}</div>
                <div className="app-feature__text">
                    {flagship ? null : <Head item={item} data={data} labels={labels} />}
                    <p className="app-feature__summary">{item.text}</p>
                    <Stack items={data.stack} labels={labels} />
                    <AppLinks data={data} labels={labels} primary={flagship} />
                </div>
            </div>
            <Details item={item} labels={labels} figma={figma} extra={caseView?.extra} />
        </article>
    );
}
