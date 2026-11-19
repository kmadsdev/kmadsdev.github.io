// One featured application (facts.appOrder.featured): a large block.
// Path of the eye: status and name -> tagline -> the main object, large
// (the gallery, the flowchart, or the clip) -> text and architecture on the
// left, goals, stack and links on the right -> the "From my Figma" row.
import { facts } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import FigmaRow from '../FigmaRow.jsx';
import { FlowChart, FlowSteps } from '../Flow.jsx';
import { useFlowPlayer } from '../useFlowPlayer.js';
import Clip from './Clip.jsx';
import Gallery from './Gallery.jsx';
import { AppLinks, Stack, Status } from './parts.jsx';

/** The Figma originals that name this anchor, in the order of facts.figmaOrder. */
export const figmaFor = (anchor) => facts.figmaOrder.filter((id) => facts.figma[id]?.anchors.includes(anchor));

function List({ title, items }) {
    if (!items?.length) return null;
    return (
        <div className="app-block">
            <h5 className="wh-label app-block__title">{title}</h5>
            <ul className="app-block__list">
                {items.map((line) => <li key={line}>{line}</li>)}
            </ul>
        </div>
    );
}

/** The case file of an application, shown as its flowchart and the same steps in words. */
function CaseFlow({ caseId }) {
    const { cases } = useLanguage().t;
    const item = cases.items.find((c) => c.id === caseId);
    const data = facts.cases[caseId];
    const player = useFlowPlayer(data.flow.edges.length);
    return (
        <div className="app-case">
            <div className="app-case__chart">
                <FlowChart caseId={caseId} structure={data.flow} text={item.flow} player={player} labels={cases.labels} />
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
                <h5 className="visually-hidden">{cases.labels.flow}</h5>
                <FlowSteps structure={data.flow} text={item.flow} player={player} stepLabel={cases.labels.step} />
            </div>
        </div>
    );
}

function Main({ item, data, labels }) {
    if (item.caseId) return <CaseFlow caseId={item.caseId} />;
    if (data.media && item.media) return <Gallery name={data.name} media={data.media} text={item.media} labels={labels} />;
    if (data.video || data.image) {
        return (
            <figure className="gallery__main">
                <Clip video={data.video} poster={data.image} name={data.name} labels={labels} />
            </figure>
        );
    }
    return null;
}

export default function Featured({ item, labels }) {
    const data = facts.projects[item.id];
    const figma = figmaFor(item.anchor);
    return (
        <article id={item.anchor} className="app-feature" aria-labelledby={`${item.anchor}-title`}>
            <header className="app-feature__head">
                <Status data={data} labels={labels} />
                <h4 id={`${item.anchor}-title`} className="wh-headline wh-headline--item app-feature__name">{data.name}</h4>
                <p className="app-feature__tagline">{item.tagline}</p>
            </header>

            <div className="app-feature__main">
                <Main item={item} data={data} labels={labels} />
            </div>

            <div className="split split--top app-feature__body">
                <div className="chapter-text">
                    <p>{item.text}</p>
                    <List title={labels.architecture} items={item.architecture} />
                </div>
                <aside className="app-feature__side">
                    <List title={labels.goals} items={item.goals} />
                    <div className="app-block">
                        <h5 className="wh-label app-block__title">{labels.stack}</h5>
                        <Stack items={data.stack} labels={labels} />
                    </div>
                    <AppLinks data={data} labels={labels} primary />
                </aside>
            </div>

            {figma.length ? <FigmaRow ids={figma} level={5} /> : null}
        </article>
    );
}
