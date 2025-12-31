import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { SCROLL_CONFIG } from '../constants';

const LenisContext = createContext(null);

export const LenisProvider = ({ children }) => {
    const [lenis, setLenis] = useState(null);
    const rafRef = useRef();

    useEffect(() => {
        // Detect mobile device or small screen
        const isMobile = window.innerWidth <= 800;
        const lenisInstance = new Lenis({
            lerp: isMobile ? 0.2 : SCROLL_CONFIG.lerp, // much faster scroll for mobile
            smooth: !isMobile && SCROLL_CONFIG.smooth, // disable smooth scroll for mobile
            wheelMultiplier: isMobile ? 1.2 : SCROLL_CONFIG.wheelMultiplier,
            touchMultiplier: isMobile ? 1.2 : SCROLL_CONFIG.touchMultiplier,
            infinite: false,
            gestureOrientation: 'vertical',
            smoothWheel: !isMobile,
            syncTouch: true,
            syncTouchLerp: isMobile ? 0.2 : 0.075,
        });

        setLenis(lenisInstance);

        function raf(time) {
            lenisInstance.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafRef.current);
            lenisInstance.destroy();
        };
    }, []);

    const scrollTo = useCallback((target, options = {}) => {
        if (lenis) {
            lenis.scrollTo(target, {
                offset: options.offset || 0,
                duration: options.duration || 1.2,
                easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
                ...options,
            });
        }
    }, [lenis]);

    const stop = useCallback(() => {
        if (lenis) lenis.stop();
    }, [lenis]);

    const start = useCallback(() => {
        if (lenis) lenis.start();
    }, [lenis]);

    return (
        <LenisContext.Provider value={{ lenis, scrollTo, stop, start }}>
            {children}
        </LenisContext.Provider>
    );
};

export const useLenis = () => {
    const context = useContext(LenisContext);
    if (!context) {
        throw new Error('useLenis must be used within a LenisProvider');
    }
    return context;
};

export default useLenis;
