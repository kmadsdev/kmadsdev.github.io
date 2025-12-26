import React from 'react';
import { PROJECTS } from '../constants';
import '../styles/Projects.css';

const ProjectCard = ({ project, index }) => {
    const hasMedia = project.image || project.video;
    const hasLink = project.link;
    
    return (
        <div className="project-card" style={{ '--card-index': index }}>
            {hasMedia && (
                <div className="project-media-wrapper">
                    {project.video ? (
                        <video 
                            src={project.video}
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => {
                                e.target.pause();
                                e.target.currentTime = 0;
                            }}
                        />
                    ) : (
                        <img 
                            src={project.image} 
                            alt={project.title}
                            loading="lazy"
                        />
                    )}
                    {hasLink && (
                        <div className="project-media-overlay">
                            <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="project-link-btn"
                            >
                                <img 
                                    src="/assets/ui/arrow-external.svg" 
                                    alt="External Link" 
                                />
                            </a>
                        </div>
                    )}
                </div>
            )}
            
            <div className="project-card-content">
                {project.tags && project.tags.length > 0 && (
                    <div className="project-card-tags">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="project-tag">{tag}</span>
                        ))}
                    </div>
                )}
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-description">{project.description}</p>
            </div>
        </div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <div className="projects-title-wrapper">
                        <h2 className="section-title projects-main-title">Projects</h2>
                        <p className="projects-subtitle">
                            A selection of my recent work and side projects
                        </p>
                    </div>
                </div>

                <div className="projects-scroll-wrapper">
                    <div className="projects-track">
                        {/* Projects Section Divider */}
                        <div className="section-divider projects-divider">
                            <span className="section-divider-label">Portfolio</span>
                            <h3 className="section-divider-title">Projects</h3>
                            <span className="section-divider-count">{PROJECTS.length.toString().padStart(2, '0')}</span>
                        </div>

                        {PROJECTS.map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index} />
                        ))}

                        {/* View More Card */}
                        <div className="view-more-card">
                            <div className="view-more-content">
                                <span className="view-more-label">Explore more</span>
                                <h3 className="view-more-title">All Projects</h3>
                                <a href="/projects" className="view-more-btn">
                                    View All →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
