import React from 'react';
import { TECH_SKILLS } from '../constants';
import '../styles/Stack.css';

const SkillCard = ({ skill, index }) => (
    <div className="skill-card" style={{ '--card-index': index }}>
        <img 
            src={`/assets/icons/${skill.icon}`} 
            alt={skill.name}
            className="skill-card-icon"
            loading="lazy"
        />
        <span className="skill-card-name">{skill.name}</span>
    </div>
);

const Stack = () => {
    return (
        <section id="skills" className="stack-section">
            <div className="stack-container">
                <div className="stack-header">
                    <div className="stack-title-wrapper">
                        <h2 className="section-title stack-main-title">Tech Stack</h2>
                        <p className="stack-subtitle">
                            Technologies and tools I work with
                        </p>
                    </div>
                </div>

                <div className="stack-scroll-wrapper">
                    <div className="stack-track">
                        {/* Skills Section Divider */}
                        <div className="section-divider skills-divider">
                            <span className="section-divider-label">Technologies</span>
                            <h3 className="section-divider-title">Skills</h3>
                            <span className="section-divider-count">{TECH_SKILLS.length.toString().padStart(2, '0')}</span>
                        </div>

                        {TECH_SKILLS.map((skill, index) => (
                            <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stack;
