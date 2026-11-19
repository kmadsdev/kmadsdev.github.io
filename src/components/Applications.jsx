// Section 5, id "applications": what runs today, then what I built to study.
// List 1 "In production" in the order of facts.appOrder.live: Consignado Cloud
// is the flagship, the other featured ids are compact rows, the rest a bento
// of media tiles. List 2 "Study projects" in a compact grid. Details open in place.
// Text: t.applications. Data: facts.projects.
import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import AppTile from './applications/AppTile.jsx';
import Featured from './applications/Featured.jsx';
import StudyList from './applications/StudyList.jsx';
import { Bento, Chapter, ChapterGroup } from './bento/index.js';
import ExternalLink from './ExternalLink.jsx';

export default function Applications() {
    const { applications: a } = useLanguage().t;
    const { featured } = facts.appOrder;
    const big = a.live.items.filter((item) => featured.includes(item.id));
    const rest = a.live.items.filter((item) => !featured.includes(item.id));

    return (
        <Chapter id="applications" label={a.label} title={a.title} lead={a.lead} className="apps">
            <ChapterGroup id={a.live.anchor} title={a.live.title} lead={a.live.lead}>
                <div className="app-features">
                    {big.map((item, i) => <Featured key={item.id} item={item} labels={a.labels} flagship={i === 0} flip={i === 2} />)}
                </div>
                <Bento className="app-bento">
                    {rest.map((item) => <AppTile key={item.id} item={item} labels={a.labels} />)}
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
