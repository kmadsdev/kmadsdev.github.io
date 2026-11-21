// Section 5, id "applications": what runs today, then what I built to study.
// Three lists, in the order of order.apps (contents.global.js). No status is shown anywhere.
//   In production            three featured blocks: Consignado Cloud (the flagship, with its
//                            gallery), Ruph (its flowchart), Diabetes Indicator (its clip)
//   Other production apps    six tiles with a clip and a poster: 3, 2, 1 per row
//   Study and other projects eight cards with no picture: 3, 2, 1 per row
// Then the closing line with the GitHub link. Text: t.applications. Data: projects.
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import AppTile from './applications/AppTile.jsx';
import Featured from './applications/Featured.jsx';
import StudyList from './applications/StudyList.jsx';
import { Bento, Chapter, ChapterGroup } from './bento/index.js';
import Rich from './Rich.jsx';

export default function Applications() {
    const { applications: a } = useLanguage().t;
    const { production, other, study } = a;

    return (
        <Chapter id="applications" label={a.label} title={a.title} className="apps">
            <ChapterGroup id={production.anchor} title={production.title}>
                <div className="app-features">
                    {production.items.map((item, i) => (
                        <Featured key={item.id} item={item} labels={a.labels} flagship={i === 0} flip={i === 2} />
                    ))}
                </div>
            </ChapterGroup>

            <ChapterGroup id={other.anchor} title={other.title}>
                <Bento className="app-bento">
                    {other.items.map((item) => <AppTile key={item.id} item={item} labels={a.labels} />)}
                </Bento>
            </ChapterGroup>

            <ChapterGroup id={study.anchor} title={study.title}>
                <StudyList items={study.items} labels={a.labels} />
            </ChapterGroup>

            <p className="apps-foot"><Rich text={a.more} /></p>
        </Chapter>
    );
}
