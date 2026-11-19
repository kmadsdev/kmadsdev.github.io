// Section 4, id "education": the proof of study. One program, three certificates.
// Calm and short: two tiles, one screen or less.
import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Bento, Chapter, Tile, TileList } from './bento/index.js';
import { useAnchorLanding } from './experience/useAnchorLanding.js';

const noop = () => {};

export default function Education() {
    const { education } = useLanguage().t;
    const { program, certificates } = education;
    useAnchorLanding(facts.anchors.education, noop);

    return (
        <Chapter id="education" label={education.label} title={education.title} lead={education.lead} className="edu">
            <Bento>
                <Tile kind="list" lg="7x2" md="8x1" id={program.anchor} className="edu-program">
                    <p className="edu-meta">
                        <span>{program.period}</span>
                        <span>{program.length}</span>
                    </p>
                    <h3 className="tile__title">{program.title}</h3>
                    <p className="edu-place">{program.place}</p>
                    <p className="tile__text">{program.note}</p>
                    <div className="edu-subjects">
                        <p className="wh-label">{program.subjectsLabel}</p>
                        <TileList label={program.subjectsLabel} items={program.subjects} />
                    </div>
                </Tile>
                <Tile kind="list" lg="5x2" md="8x1" id={certificates.anchor} className="edu-certs">
                    <h3 className="tile__title">{certificates.title}</h3>
                    <ul className="edu-cert-list">
                        {certificates.items.map((cert) => (
                            <li className="edu-cert" key={cert.id}>
                                <span className="edu-cert__name">{cert.title}</span>
                                <span className="edu-cert__meta">
                                    <span>{cert.issuer}</span>
                                    <span>{cert.date}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="tile__text">{certificates.note}</p>
                </Tile>
            </Bento>
        </Chapter>
    );
}
