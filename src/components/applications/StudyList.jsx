// List 2: study projects and repositories. Compact rows: the name,
// one line, what it proves, the stack and the source; a small clip on the
// right where one exists, and the Figma original where one exists.
import { facts } from '../../content/index.js';
import FigmaRow from '../FigmaRow.jsx';
import Clip from './Clip.jsx';
import { figmaFor } from './Featured.jsx';
import { AppLinks, Stack } from './parts.jsx';

export default function StudyList({ items, labels }) {
    return (
        <ol className="study">
            {items.map((item) => {
                const data = facts.projects[item.id];
                const figma = figmaFor(item.anchor);
                const hasClip = Boolean(data.video || data.image);
                return (
                    <li key={item.id} id={item.anchor} className="study__item" data-media={hasClip ? 'true' : undefined}>
                        <div className="study__body">
                            <h4 className="study__name">{data.name}</h4>
                            <p className="study__tagline">{item.tagline}</p>
                            <p className="study__text">{item.text}</p>
                            <Stack items={data.stack} labels={labels} />
                            <AppLinks data={data} labels={labels} />
                            {figma.length ? <FigmaRow ids={figma} level={5} compact /> : null}
                        </div>
                        {hasClip ? (
                            <div className="study__media">
                                <Clip video={data.video} poster={data.image} name={data.name} labels={labels} />
                            </div>
                        ) : null}
                    </li>
                );
            })}
        </ol>
    );
}
