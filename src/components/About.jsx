import { useRef, useEffect, useState } from 'react';
import { ABOUT_CONTENT } from '../constants';
import '../styles/About.css';


const About = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="about" ref={sectionRef}>
            <div className="about-container">
                <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>About Me</h2>
                <div className={`about-content ${isVisible ? 'about-visible' : ''}`}>
                    <div className="about-text">
                        {ABOUT_CONTENT.paragraphs.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}

                        <p>{ABOUT_CONTENT.skillsIntro}</p>
                        <ul className="about-skills">
                            {ABOUT_CONTENT.skills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="about-logo">
                        <img src="/assets/kmads_logo_zoomedout.png" alt="About Me Logo" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
