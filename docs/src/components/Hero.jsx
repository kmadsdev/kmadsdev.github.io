import React, { useState, useEffect } from 'react';
// import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { CONTACT } from '../constants';
import '../styles/Hero.css';

const Hero = () => {
  const spinDuration = 15;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const min = 8;    // fastest
          const max = 75;   // slowest
          const mapped = max - (max - min) * Math.min(y / 1200, 1);
          setSpinDuration(mapped);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-greeting">
            👋 HELLO, MY NAME IS KAIQUE, ALSO KNOWN AS <span className="highlight">KMADS</span>
          </p>
          
          <h1 className="hero-title">
            Kaique Souza
          </h1>
          
          <p className="hero-subtitle">
            Software Engineer • Data Engineer
          </p>
          
          <p className="hero-description">
            I’m a 17 year old Engineer who loves coding since 2018<br></br>
            Fullstack developer (90% backend/data, 10% frontend)<br></br>
            Software/DevOps Engineer (CI/CD, Microservices, SDLC)<br></br>
            Cloud Architect (AWS, Google Cloud, Oracle) 
          </p>
          
          <div className="buttons-container">
            <button className="download-btn" onClick={() => (window.location.href = 'https://kmads.dev/resume')}>
              Download Resume
            </button>

            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="social-icon">
              <img class="social-icon-img" src="assets/github.svg"></img>
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
              <img class="social-icon-img" src="assets/linkedin.svg"></img>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="social-icon">
              <img class="social-icon-img" src="assets/email.svg"></img>
            </a>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-badge">
            <img src="/assets/globe-text.svg" className="badge-outer" style={{ animationDuration: `${spinDuration}s` }} />
            <img src="/assets/globe.svg" className="badge-inner" style={{ animationDuration: `${spinDuration * 0}s` }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
