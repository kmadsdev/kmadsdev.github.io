import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Section from './Section.jsx';

export default function Skills() {
    const { skills, education } = useLanguage().t;
    return (
        <>
            <Section id="skills" index="05" label={skills.label} title={skills.title} intro={skills.intro}>
                <dl className="skill-groups">
                    {skills.groups.map((group) => (
                        <div className="skill-group" key={group.id}>
                            <dt>
                                <span className="skill-group-title">{group.title}</span>
                                <span className="skill-group-note">{group.note}</span>
                            </dt>
                            <dd>
                                <ul className="tags">
                                    {facts.skills[group.id].map((name) => <li key={name}>{name}</li>)}
                                </ul>
                            </dd>
                        </div>
                    ))}
                    <div className="skill-group skill-group-learning">
                        <dt><span className="skill-group-title">{skills.learningTitle}</span></dt>
                        <dd><p>{skills.learning}</p></dd>
                    </div>
                </dl>
            </Section>

            <Section id="education" index="06" label={education.label} title={education.title}>
                <ul className="education-list">
                    {education.items.map((item) => (
                        <li className="education-item" key={item.id}>
                            <p className="job-period">{item.period}</p>
                            <h3>{item.title}</h3>
                            <p>{item.place}. {item.note}</p>
                        </li>
                    ))}
                </ul>
                <h3 className="minor-title">{education.coursesTitle}</h3>
                <ul className="course-list">
                    {education.courses.map((course) => (
                        <li key={course.id}>
                            <span className="course-title">{course.title}</span>
                            <span className="course-place">{course.place}</span>
                        </li>
                    ))}
                </ul>
            </Section>
        </>
    );
}
