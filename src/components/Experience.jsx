import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Section from './Section.jsx';

export default function Experience() {
    const { experience } = useLanguage().t;
    return (
        <Section id="experience" index="02" label={experience.label} title={experience.title} intro={experience.intro}>
            <ol className="timeline">
                {experience.items.map((job, i) => (
                    <li className="job" key={job.id}>
                        <div className="job-rail">
                            <p className="job-period">{job.period}</p>
                            {i === 0 ? <p className="job-current">{experience.current}</p> : null}
                        </div>
                        <div className="job-body">
                            <h3 className="job-title">
                                {job.role} <span className="job-company">{job.company}</span>
                            </h3>
                            <p className="job-context">{job.context}</p>
                            <ul className="job-bullets">
                                {job.bullets.map((text) => <li key={text}>{text}</li>)}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>
            <h3 className="minor-title">{experience.earlierTitle}</h3>
            <ul className="earlier">
                {experience.earlier.map((item) => (
                    <li className="earlier-item" key={item.id}>
                        <p className="job-period">{item.period}</p>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
