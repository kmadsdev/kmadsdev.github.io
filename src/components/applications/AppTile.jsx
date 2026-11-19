// One live application in the bento: its clip (in its own 16:9, so the burnt-in
// caption is never cropped), then the name, one line, the stack as one mono
// line and the links. The longer text opens in place.
// The tile is not a link itself: it holds links and the clip button.
import { facts } from '../../content/index.js';
import { Tile } from '../bento/index.js';
import Clip from './Clip.jsx';
import Disclosure from './Disclosure.jsx';
import { AppLinks, Stack } from './parts.jsx';

export default function AppTile({ item, labels }) {
    const data = facts.projects[item.id];
    const figure = data.video || data.image ? <Clip video={data.video} poster={data.image} name={data.name} labels={labels} /> : null;
    return (
        <Tile kind="media" id={item.anchor} lg="4x1" md="4x1" figure={figure} title={data.name} level={4} className="app-tile">
            <p className="tile__text app-tile__tagline">{item.tagline}</p>
            <Stack items={data.stack} labels={labels} />
            <div className="app-tile__foot">
                <AppLinks data={data} labels={labels} />
                <Disclosure kind="more" className="app-tile__more">
                    <p className="tile__text">{item.text}</p>
                </Disclosure>
            </div>
        </Tile>
    );
}
