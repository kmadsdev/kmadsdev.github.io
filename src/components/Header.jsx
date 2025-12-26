import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { CONTACT, NAV_LINKS } from '../constants';
import { useLenis } from '../hooks/useLenis.jsx';


const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollTo } = useLenis();

    useEffect(() => {
        const handleScroll = () => { setScrolled(window.scrollY > 50); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) { 
            scrollTo(element, { offset: -80, duration: 1.2 });
        }
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo"><span className="logo-text">kmadsdev</span></div>
                
                <nav className="nav-menu">
                    {NAV_LINKS.map((link) => (
                        <a 
                            key={link.id}
                            onClick={() => scrollToSection(link.id)} 
                            className="nav-link"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <a href="https://kmads.dev/linkedin" className="hire-btn">Hire me</a>
            </div>
        </header>
    );
};

export default Header;
