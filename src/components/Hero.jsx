import { useRef, useEffect, useState } from 'react';
import { CONTACT, SITE_CONFIG, HERO_CONTENT } from '../constants';
import '../styles/Hero.css';


const Hero = () => {
    const heroRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const outer_spin_duration = 20;
    const inner_spin_duration = outer_spin_duration * 0;

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className={`hero-container ${isLoaded ? 'hero-loaded' : ''}`}>
                <div className="hero-content">
                    <p className="hero-greeting fade-in fade-in-delay-1">
                        {HERO_CONTENT.greeting} <span className="highlight">{HERO_CONTENT.highlightName}</span>
                    </p>
                    
                    <h1 className="hero-title fade-in fade-in-delay-2">{SITE_CONFIG.title}</h1>
                    <p className="hero-subtitle fade-in fade-in-delay-3">{SITE_CONFIG.description}</p>
                    <p className="hero-description fade-in fade-in-delay-4">
                        {HERO_CONTENT.description.map((line, i) => (
                            <span key={i}>{line}{i < HERO_CONTENT.description.length - 1 && <br />}</span>
                        ))}
                    </p>
                    
                    <div className="buttons-container fade-in fade-in-delay-5">
                        <button className="download-btn" onClick={() => (window.location.href = SITE_CONFIG.resumeUrl)}>
                            Download Resume
                        </button>

                        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img className="social-icon-img" src="assets/social/github.svg" alt="GitHub"></img>
                        </a>
                        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img className="social-icon-img" src="assets/linkedin.svg" alt="LinkedIn"></img>
                        </a>
                        <a href={`mailto:${CONTACT.email}`} className="social-icon">
                            <img className="social-icon-img" src="assets/email.svg" alt="Email"></img>
                        </a>
                    </div>
                </div>
                
                <div className="hero-image-container fade-in">
                    <div className="hero-badge">
                        <img src="/assets/globe-text.svg" className="badge-outer" style={{ animationDuration: `${outer_spin_duration}s` }} alt="Globe text" />
                        <img src="/assets/globe.svg" className="badge-inner" style={{ animationDuration: `${inner_spin_duration}s` }} alt="Globe" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
