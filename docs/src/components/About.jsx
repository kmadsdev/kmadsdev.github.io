import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>My name is Kaique Souza, from Brazil, São Paulo, I just love to code, design & architect.</p>
            <p>My specialities are in Data, Backend, DevOps & Cloud, but i can also handle areas like Frontend, InfoSec/CSec or SRE.</p>
            <p>
              I’ve been on the IT field for over 7 years + learned a lot about full stack programming, 
              algorithms, data, AI, computer science, computer architecture, cybersecurity, software & hardware.
            </p>
            <p>Having over 2 years of experience in Software Engineering, i’ve gained solid experience in:</p>
            <ul className="about-skills">
              <li>Web & Desktop Software Development, Architecture and Design</li>
              <li>Software Architecture/Design (Monolithic, Microservices, BFF and MVC)</li>
              <li>DevOps (CI/CD, Workflows, Containers, SDLC)</li>
              <li>Cloud Architecture (AWS, GCP, Oracle)</li>
              <li>Data Engineering (Data Modelling, Analysis, Big Data, ML)</li>
              <li>Scrum/Agile (Project Management, Kanban, Jira & Monday)</li>
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
