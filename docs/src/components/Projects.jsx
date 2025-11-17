import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { PROJECTS } from '../constants';
import '../styles/Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title}className="project-image" />
                <div className="project-overlay">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link" >
                    <img id="img-45deg-white-arrow" src="/assets/45deg-white-arrow.svg" alt="External Link" className="external-link-icon" />
                  </a>
                </div>
              </div>
              
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-more-wrapper">
          <a href="https://github.com/kmadsdev?tab=repositories" target="_blank" rel="noopener noreferrer"className="view-more-btn" >
            View More Projects →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
