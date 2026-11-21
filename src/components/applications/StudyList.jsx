// "Study and other projects": eight cards with no picture, 3 per row (2 on a tablet,
// 1 on a phone), like the tiles above them. Each card: the name, the repository as a
// link, one line, the stack.
import { projects } from '../../content/index.js';
import ExternalLink from '../ExternalLink.jsx';
import { Stack } from './parts.jsx';

export default function StudyList({ items, labels }) {
    return (
        <ul className="study">
            {items.map((item) => {
                const data = projects[item.id];
                return (
                    <li key={item.id} id={item.anchor} className="study__card">
                        <h4 className="study__name">{data.name}</h4>
                        <p className="study__repo">
                            <ExternalLink href={data.repo} className="link study__repo-link">
                                <span translate="no">{data.repoName}</span>
                            </ExternalLink>
                        </p>
                        <p className="study__line">{item.line}</p>
                        <Stack items={data.stack} labels={labels} />
                    </li>
                );
            })}
        </ul>
    );
}
