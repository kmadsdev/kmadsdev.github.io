import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { CONTACT } from '../constants';
import '../styles/Hero.css';

const Hero = () => {
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
          
          <button className="download-btn" onClick={() => (window.location.href = 'https://kmads.dev/resume')}>
            Download Resume
          </button>
          
          <div className="social-icons">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
            <a href={`mailto:${CONTACT.email}`} className="social-icon">
              <FaEnvelope />
            </a>
          </div>
        </div>
        
        <div className="hero-image-container">
          <img src="/assets/badge.svg" alt="Kaique Souza Badge" className="circular-badge" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
