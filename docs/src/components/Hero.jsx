import React, { useState, useEffect } from 'react';
// import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { CONTACT } from '../constants';
import '../styles/Hero.css';

const Hero = () => {
  const outer_spin_duration = 20;
  const inner_spin_duration = outer_spin_duration * 0;

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
            I’m a Software Engineer who loves coding since 2018<br></br>
            Backend Developer + Data Engineer (SQL, Big Data, ML)<br></br>
            Software/DevOps Engineer (CI/CD, Microservices, SDLC)<br></br>
            Cloud Architect (AWS, Google Cloud, Oracle) 
          </p>
          
          <div className="buttons-container">
            <button className="download-btn" onClick={() => (window.location.href = 'https://kmads.dev/resume')}>
              Download Resume
            </button>

            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="social-icon">
              <img className="social-icon-img" src="assets/github.svg"></img>
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
              <img className="social-icon-img" src="assets/linkedin.svg"></img>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="social-icon">
              <img className="social-icon-img" src="assets/email.svg"></img>
            </a>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-badge">
            <img src="/assets/globe-text.svg" className="badge-outer" style={{ animationDuration: `${outer_spin_duration}s` }} />
            <img src="/assets/globe.svg" className="badge-inner" style={{ animationDuration: `${inner_spin_duration}s` }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
