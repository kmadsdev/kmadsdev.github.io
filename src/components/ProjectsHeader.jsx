import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { CONTACT } from '../constants';

const ProjectsHeader = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
            <div className="logo">
            <span className="logo-text">kmadsdev - projects</span>
            </div>
            <nav className="nav-menu" />
            <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/" className="hire-btn">
                Go back to Home
            </a>
            <a href={CONTACT.github} className="hire-btn" target="_blank" rel="noopener noreferrer">
                Github
            </a>
            </div>
        </div>
        </header>
    );
};

export default ProjectsHeader;
