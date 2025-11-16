import React from 'react';
import { EXPERIENCES, EDUCATION, COURSEWORK } from '../constants';
import '../styles/Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-grid">
          <div className="education-section">
            <h3 className="subsection-title">Education</h3>
            
            {EDUCATION.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h4 className="institution">{edu.institution}</h4>
                  <span className="period">{edu.period}</span>
                </div>
                <p className="degree">{edu.degree}</p>
                {edu.description && <p className="description">{edu.description}</p>}
              </div>
            ))}
            
            <h3 className="subsection-title" style={{marginTop: '2rem'}}>Coursework</h3>
            
            {COURSEWORK.map((course, index) => (
              <div key={index} className="coursework-item">
                <h4 className="institution">{course.institution}</h4>
                <ul className="course-list">
                  {course.courses.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="work-section">
            <h3 className="subsection-title">Experience</h3>
            
            {EXPERIENCES.map((exp, index) => (
              <div key={index} className="work-item">
                <div className="work-header">
                  <div>
                    <h4 className="company">{exp.company}</h4>
                    <p className="role">{exp.role}</p>
                  </div>
                  <div className="period-badge">
                    <span className="period">{exp.period}</span>
                    {exp.current && (
                      <span className="current-badge">Present</span>
                    )}
                  </div>
                </div>
                
                <ul className="description-list">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
