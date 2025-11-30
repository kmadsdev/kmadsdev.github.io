import React, { useRef, useEffect, useState } from 'react';
import { CONTACT } from '../constants';
import '../styles/Footer.css';

const Footer = () => {
    const [translate, setTranslate] = useState(120); // Start offscreen
    const rafRef = useRef();
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer
            className="footer-banner-live"
            style={{ transform: `translateY(${translate}px)` }}
        >
            <div className="footer-banner-bg">
                <div className="footer-row">
                    <div className="footer-left">
                        <p className="footer-copyright">Copyright © 2025, Kmads</p>
                    </div>
                    <div className="footer-center">
                        <button className="back-to-top" onClick={scrollToTop}>
                            <span>Back to top</span>
                            <img src="/assets/arrow-scroll.svg" alt="Scroll up" className="scroll-arrow" />
                        </button>
                    </div>
                    <div className="footer-right">
                        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="footer-link">
                            <span>Github</span>
                            <img src="/assets/arrow-redirect.svg" alt="External link" className="redirect-arrow" />
                        </a>
                        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
                            <span>Linkedin</span>
                            <img src="/assets/arrow-redirect.svg" alt="External link" className="redirect-arrow" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
