import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem',
      background: '#1e1e1e',
      color: '#666',
      fontSize: '0.875rem',
      marginTop: '4rem'
    }}>
      <p>Copyright © 2025, Impsum Lorem. All Rights Reserved</p>
      
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <a href="#about" style={{color: '#fff', textDecoration: 'none', transition: 'color 0.3s'}}>About</a>
        <a href="#resume" style={{color: '#fff', textDecoration: 'none', transition: 'color 0.3s'}}>Resume</a>
        <a href="#skills" style={{color: '#fff', textDecoration: 'none', transition: 'color 0.3s'}}>Skills</a>
        <a href="#projects" style={{color: '#fff', textDecoration: 'none', transition: 'color 0.3s'}}>Projects</a>
      </div>
    </footer>
  );
};

export default Footer;
