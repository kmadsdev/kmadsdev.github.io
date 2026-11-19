// One live application in the bento: its clip (or poster) on top, then the
// name, one line, the stack and the links. The tile is not a link itself:
// it holds two links and the clip button.
import { facts } from '../../content/index.js';
import { Tile } from '../bento/index.js';
import Clip from './Clip.jsx';
import { AppLinks, Stack } from './parts.jsx';

export default function AppTile({ item, labels, lg, md = '4x1' }) {
    const data = facts.projects[item.id];
    const figure = data.video || data.image ? <Clip video={data.video} poster={data.image} name={data.name} labels={labels} /> : null;
    return (
        <Tile kind="media" id={item.anchor} lg={lg} md={md} figure={figure} title={data.name} level={4} className="app-tile">
            <p className="tile__text">{item.tagline}</p>
            <Stack items={data.stack} labels={labels} />
            <AppLinks data={data} labels={labels} />
        </Tile>
    );
}
