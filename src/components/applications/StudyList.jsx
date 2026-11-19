// List 2: study projects and repositories. A compact grid of rows (two
// columns from 900px): the name, one line, the stack and the source in view;
// what it proves, the clip and the Figma original open in place.
import { facts } from '../../content/index.js';
import FigmaRow from '../FigmaRow.jsx';
import Clip from './Clip.jsx';
import Disclosure from './Disclosure.jsx';
import { figmaFor } from './Featured.jsx';
import { AppLinks, Stack } from './parts.jsx';

export default function StudyList({ items, labels }) {
    return (
        <ul className="study">
            {items.map((item) => {
                const data = facts.projects[item.id];
                const figma = figmaFor(item.anchor);
                const hasClip = Boolean(data.video || data.image);
                return (
                    <li key={item.id} id={item.anchor} className="study__item">
                        <h4 className="study__name">{data.name}</h4>
                        <p className="study__tagline">{item.tagline}</p>
                        <Stack items={data.stack} labels={labels} />
                        <div className="study__foot">
                            <AppLinks data={data} labels={labels} />
                            <Disclosure className="study__more">
                                <p className="study__text">{item.text}</p>
                                {hasClip ? (
                                    <div className="study__media">
                                        <Clip video={data.video} poster={data.image} name={data.name} labels={labels} />
                                    </div>
                                ) : null}
                                {figma.length ? <FigmaRow ids={figma} level={5} compact /> : null}
                            </Disclosure>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
