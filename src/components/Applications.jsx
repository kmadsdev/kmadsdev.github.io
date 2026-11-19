// Section 5, id "applications": what runs today, then what I built to study.
// List 1 "In production" in the order of facts.appOrder.live: the featured ids
// are large blocks, the others a bento of media tiles. List 2 "Study projects"
// in compact rows. Text: t.applications. Data: facts.projects.
import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import AppTile from './applications/AppTile.jsx';
import Featured from './applications/Featured.jsx';
import StudyList from './applications/StudyList.jsx';
import { Bento, Chapter, ChapterGroup } from './bento/index.js';
import ExternalLink from './ExternalLink.jsx';

// Two equal tiles per row: the clips are 16:9 with captions burnt in, so a
// narrower tile next to a wider one would crop its clip.
const SIZE = '6x1';

export default function Applications() {
    const { applications: a } = useLanguage().t;
    const { featured } = facts.appOrder;
    const big = a.live.items.filter((item) => featured.includes(item.id));
    const rest = a.live.items.filter((item) => !featured.includes(item.id));

    return (
        <Chapter id="applications" label={a.label} title={a.title} lead={a.lead} className="apps">
            <ChapterGroup id={a.live.anchor} title={a.live.title} lead={a.live.lead}>
                <div className="app-features">
                    {big.map((item) => <Featured key={item.id} item={item} labels={a.labels} />)}
                </div>
                <Bento className="app-bento">
                    {rest.map((item) => <AppTile key={item.id} item={item} labels={a.labels} lg={SIZE} />)}
                </Bento>
            </ChapterGroup>

            <ChapterGroup id={a.study.anchor} title={a.study.title} lead={a.study.lead}>
                <StudyList items={a.study.items} labels={a.labels} />
            </ChapterGroup>

            <footer className="apps-foot">
                <p>
                    {a.more.text} <ExternalLink href={a.more.to}>{a.more.label}</ExternalLink>
                </p>
                <p className="apps-foot__note">{a.siteNote}</p>
            </footer>
        </Chapter>
    );
}
