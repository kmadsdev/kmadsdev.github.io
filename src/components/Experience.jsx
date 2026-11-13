import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Section from './Section.jsx';

export default function Experience() {
    const { experience } = useLanguage().t;
    return (
        <Section id="experience" index="02" label={experience.label} title={experience.title} intro={experience.intro}>
            <ol className="timeline">
                {experience.items.map((job, i) => (
                    <li className="job" key={job.id} data-current={i === 0 ? 'true' : undefined}>
                        <div className="job-rail">
                            <p className="job-period">{job.period}</p>
                            {i === 0 ? (
                                <p className="status wh-label"><span className="status-dot" aria-hidden="true" />{experience.current}</p>
                            ) : null}
                        </div>
                        <div className="job-body">
                            <h3 className="job-title">
                                <span className="wh-headline wh-headline--item">{job.company}</span>
                                <span className="job-role">{job.role}</span>
                            </h3>
                            <p className="job-context">{job.context}</p>
                            <ul className="job-bullets">
                                {job.bullets.map((text) => <li key={text}>{text}</li>)}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>
            <h3 className="wh-label block-label">{experience.earlierTitle}</h3>
            <ul className="wh-spec">
                {experience.earlier.map((item) => (
                    <li className="wh-spec__row" key={item.id}>
                        <div className="wh-spec__name">
                            <p className="job-period">{item.period}</p>
                        </div>
                        <div className="wh-spec__body">
                            <h4 className="row-title">{item.title}</h4>
                            <p className="row-text">{item.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
