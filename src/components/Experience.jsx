import React from 'react';
import { EXPERIENCES, EDUCATION, COURSEWORK } from '../constants';
import '../styles/Experience.css';

const SectionDivider = ({ label, title, count }) => (
    <div className="section-divider">
        <span className="section-divider-label">{label}</span>
        <h3 className="section-divider-title">{title}</h3>
        <span className="section-divider-count">{count}</span>
    </div>
);

const ExperienceCard = ({ exp, index }) => (
    <div className="experience-card" style={{ '--card-index': index }}>
        <div className="experience-card-inner">
            <div className="experience-card-header">
                <div className="experience-card-title-group">
                    <h4 className="experience-company">{exp.company}</h4>
                    <p className="experience-role">{exp.role}</p>
                </div>
                <div className="experience-card-meta">
                    <span className="experience-period">{exp.period}</span>
                    {exp.current && <span className="experience-badge">Current</span>}
                </div>
            </div>
            <div className="experience-card-body">
                <ul className="experience-description">
                    {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const EducationCard = ({ edu, index }) => (
    <div className="education-card" style={{ '--card-index': index }}>
        <div className="education-card-inner">
            <div className="education-card-header">
                <h4 className="education-institution">{edu.institution}</h4>
                <span className="education-period">{edu.period}</span>
            </div>
            <p className="education-degree">{edu.degree}</p>
            {edu.description && <p className="education-description">{edu.description}</p>}
        </div>
    </div>
);

const CourseworkCard = ({ course, index }) => (
    <div className="coursework-card" style={{ '--card-index': index }}>
        <div className="coursework-card-inner">
            <h4 className="coursework-institution">{course.institution}</h4>
            <ul className="coursework-list">
                {course.courses.map((c, i) => (
                    <li key={i}>{c}</li>
                ))}
            </ul>
        </div>
    </div>
);

const Experience = () => {
    return (
        <section id="experience" className="experience-section">
            <div className="experience-container">
                <div className="experience-header">
                    <div className="experience-title-wrapper">
                        <h2 className="section-title experience-main-title">Experience & Education</h2>
                        <p className="experience-subtitle">
                            My professional journey and academic background
                        </p>
                    </div>
                </div>

                {/* Row 1: Experience */}
                <div className="experience-row">
                    <div className="experience-scroll-wrapper">
                        <div className="experience-track">
                            <SectionDivider 
                                label="Work"
                                title="Experience"
                                count={EXPERIENCES.length.toString().padStart(2, '0')}
                            />
                            {EXPERIENCES.map((exp, index) => (
                                <ExperienceCard key={`exp-${index}`} exp={exp} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Row 2: Education + Coursework */}
                <div className="experience-row">
                    <div className="experience-scroll-wrapper">
                        <div className="experience-track">
                            <SectionDivider 
                                label="Academic"
                                title="Education"
                                count={EDUCATION.length.toString().padStart(2, '0')}
                            />
                            {EDUCATION.map((edu, index) => (
                                <EducationCard key={`edu-${index}`} edu={edu} index={index} />
                            ))}
                            
                            <SectionDivider 
                                label="Learning"
                                title="Coursework"
                                count={COURSEWORK.length.toString().padStart(2, '0')}
                            />
                            {COURSEWORK.map((course, index) => (
                                <CourseworkCard key={`course-${index}`} course={course} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
