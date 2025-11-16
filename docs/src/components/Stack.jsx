import React from 'react';
import { TECH_STACK } from '../constants';
import '../styles/Stack.css';

const Stack = () => {
  return (
    <section id="skills" className="stack">
      <div className="stack-container">
        <h2 className="section-title">Stack</h2>
        
        <div className="tech-grid">
          {TECH_STACK.map((tech, index) => (
            <div key={index} className="tech-item">
              <img 
                src={`/assets/icons/${tech.icon}`} 
                alt={tech.name}
                className="tech-icon"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
