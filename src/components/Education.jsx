// Section 4, id "education" ("Formation"): one program and three certificates.
// Calm and short: two tiles, one screen or less. No lead.
import { anchors, education as data } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Bento, Chapter, Tile, TileList } from './bento/index.js';
import { useAnchorLanding } from './experience/useAnchorLanding.js';

const noop = () => {};

export default function Education() {
    const { education } = useLanguage().t;
    const { program, certificates } = education;
    useAnchorLanding(anchors.education, noop);

    return (
        <Chapter id="education" label={education.label} title={education.title} className="edu">
            <Bento>
                <Tile kind="list" lg="7x1" md="8x1" id={program.anchor} className="edu-program" aria-labelledby={`${program.anchor}-title`}>
                    <p className="edu-meta">{program.period}</p>
                    <h3 id={`${program.anchor}-title`} className="tile__title">{program.title}</h3>
                    <p className="edu-place">{program.place}</p>
                    <div className="edu-subjects">
                        <p className="wh-label">{program.subjectsLabel}</p>
                        <TileList label={program.subjectsLabel} items={program.subjects} />
                    </div>
                </Tile>
                <Tile kind="list" lg="5x1" md="8x1" id={certificates.anchor} className="edu-certs" aria-labelledby={`${certificates.anchor}-title`}>
                    <h3 id={`${certificates.anchor}-title`} className="tile__title">{certificates.title}</h3>
                    <ul className="edu-cert-list">
                        {data.certificates.map((cert) => (
                            <li className="edu-cert" key={cert.id}>
                                <span className="edu-cert__name">{cert.title}</span>
                                <span className="edu-cert__meta">
                                    <span>{cert.issuer}</span>
                                    <span>{certificates.dates[cert.id]}</span>
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
