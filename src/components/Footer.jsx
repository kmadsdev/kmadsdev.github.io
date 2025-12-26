import React, { useRef, useEffect, useState } from 'react';
import { FOOTER_CONFIG, SITE_CONFIG, CONTACT } from '../constants';
import '../styles/Footer.css';

const Footer = () => {
    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLinkClick = (link, e) => {
        if (link.isSection) {
            e.preventDefault();
            const sectionId = link.href.replace('#', '');
            scrollToSection(sectionId);
        }
    };

    return (
        <footer ref={footerRef} className={`footer ${isVisible ? 'footer-visible' : ''}`}>
            {/* Banner Image Section */}
            <div className="footer-banner">
                <div className="footer-banner-overlay" />
                <img 
                    src="/assets/ui/footer-banner.svg" 
                    alt="Footer Banner" 
                    className="footer-banner-image"
                />
            </div>

            {/* Main Footer Content */}
            <div className="footer-content">
                <div className="footer-main">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <span className="footer-logo">{SITE_CONFIG.name}</span>
                        <p className="footer-brand-description">
                            {SITE_CONFIG.description}
                        </p>
                        {FOOTER_CONFIG.socialLinks && (
                            <div className="footer-social">
                                {FOOTER_CONFIG.socialLinks.map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-link"
                                        aria-label={social.name}
                                    >
                                        <img 
                                            src={`/assets/social/${social.icon}`}
                                            alt={social.name}
                                        />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dynamic Columns */}
                    {FOOTER_CONFIG.columns.map((column, colIndex) => (
                        <div key={colIndex} className="footer-column">
                            <h4 className="footer-column-title">{column.title}</h4>
                            <ul className="footer-links">
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a 
                                            href={link.href}
                                            target={link.external ? '_blank' : undefined}
                                            rel={link.external ? 'noopener noreferrer' : undefined}
                                            className="footer-link"
                                            onClick={(e) => handleLinkClick(link, e)}
                                        >
                                            {link.label}
                                            {link.external && (
                                                <span className="external-icon">↗</span>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="footer-copyright">{SITE_CONFIG.copyright}</p>
                    
                    <div className="footer-bottom-actions">
                        {FOOTER_CONFIG.showSponsor && (
                            <a 
                                href={FOOTER_CONFIG.sponsorLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-sponsor-btn"
                            >
                                <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                <span>Become a Sponsor</span>
                            </a>
                        )}

                        {FOOTER_CONFIG.showBackToTop && (
                            <button 
                                className="footer-back-to-top"
                                onClick={scrollToTop}
                                aria-label="Back to top"
                            >
                                <span>Back to top</span>
                                <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2"
                                >
                                    <path d="M18 15l-6-6-6 6"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
