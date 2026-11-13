import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Section from './Section.jsx';

export default function Skills() {
    const { skills, education } = useLanguage().t;
    return (
        <>
            <Section id="skills" index="05" label={skills.label} title={skills.title} intro={skills.intro}>
                <dl className="wh-spec">
                    {skills.groups.map((group) => (
                        <div className="wh-spec__row" key={group.id}>
                            <dt className="wh-spec__name">
                                <span className="row-title">{group.title}</span>
                                <span className="row-note">{group.note}</span>
                            </dt>
                            <dd className="wh-spec__body">
                                <ul className="wh-tags">
                                    {facts.skills[group.id].map((name) => <li key={name}>{name}</li>)}
                                </ul>
                            </dd>
                        </div>
                    ))}
                    <div className="wh-spec__row">
                        <dt className="wh-spec__name"><span className="row-title">{skills.learningTitle}</span></dt>
                        <dd className="wh-spec__body"><p className="row-text">{skills.learning}</p></dd>
                    </div>
                </dl>
            </Section>

            <Section id="education" index="06" label={education.label} title={education.title}>
                <ul className="wh-spec">
                    {education.items.map((item) => (
                        <li className="wh-spec__row" key={item.id}>
                            <div className="wh-spec__name"><p className="job-period">{item.period}</p></div>
                            <div className="wh-spec__body">
                                <h3 className="row-title">{item.title}</h3>
                                <p className="row-text">{item.place}. {item.note}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <h3 className="wh-label block-label">{education.coursesTitle}</h3>
                <ul className="wh-spec">
                    {education.courses.map((course) => (
                        <li className="wh-spec__row" key={course.id}>
                            <div className="wh-spec__name"><p className="row-note">{course.place}</p></div>
                            <div className="wh-spec__body"><p className="row-title">{course.title}</p></div>
                        </li>
                    ))}
                </ul>
            </Section>
        </>
    );
}
