import { useRef, useEffect, useState } from 'react';
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
                        <p>
                            My name is Kaique Souza, from Brazil, São Paulo, 
                            my main habilities are in Software Engineering,
                            Data Engineering, DevOps and Cloud Architecture.
                        </p>
                        <p>
                            Being on the IT field for almost 8 years, I've learned a lot 
                            about full stack Programming, Algorithms & Data Structures, Data, 
                            AI, Computer Science, Cybersecurity, Software and even Hardware.
                        </p>

                        <p>My main technical skills include:</p>
                        <ul className="about-skills">
                            <li>Web Application Development (and some Desktop too)</li>
                            <li>Software Architecture & Design (Monolithic, Microservices, MVC, BFF)</li>
                            <li>DevOps (CI/CD Pipelines / Workflows, Containerization, Life Cycle Management)</li>
                            <li>Cloud Architecture (AWS, Google Cloud Platform, Vercel, Oracle Cloud)</li>
                            <li>Data Engineering (Modelling, Analysis, Big Data, Machine Learning)</li>
                            <li>Scrum & Agile (Project Management, Kanban, Jira, Monday, Workspace)</li>
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
