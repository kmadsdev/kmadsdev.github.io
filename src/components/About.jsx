import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Section from './Section.jsx';

export default function About() {
    const { about } = useLanguage().t;
    return (
        <Section id="about" index="01" label={about.label} title={about.title}>
            <div className="about-grid">
                <div className="about-text">
                    {about.paragraphs.map((text) => <p key={text}>{text}</p>)}
                </div>
                <div className="principles">
                    <h3 className="minor-title">{about.principlesTitle}</h3>
                    <ol className="principle-list">
                        {about.principles.map((item) => (
                            <li className="principle" key={item.title}>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Section>
    );
}
