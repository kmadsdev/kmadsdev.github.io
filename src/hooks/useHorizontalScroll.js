import { useRef, useEffect, useState } from 'react';
import { useLenis } from './useLenis';

/**
 * Custom hook to handle horizontal scroll sections
 * Section stays at 100vh, wheel events are intercepted when section is in view
 * Disabled on mobile (< 768px) where vertical layout is used
 */
export const useHorizontalScroll = (options = {}) => {
    const { 
        speed = 2.5,
    } = options;

    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [trackWidth, setTrackWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const { lenis, stop, start } = useLenis();
    const isLockedRef = useRef(false);
    const scrollProgressRef = useRef(0);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Update track width on resize
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const updateTrackWidth = () => {
            setTrackWidth(track.scrollWidth);
        };

        updateTrackWidth();
        window.addEventListener('resize', updateTrackWidth);
        const timeout = setTimeout(updateTrackWidth, 100);

        return () => {
            window.removeEventListener('resize', updateTrackWidth);
            clearTimeout(timeout);
        };
    }, []);

    // Handle wheel event interception (desktop only)
    useEffect(() => {
        if (isMobile) return;

        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track || !lenis) return;

        const handleWheel = (e) => {
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const scrollableWidth = track.scrollWidth - viewportWidth;

            if (scrollableWidth <= 0) return;

            // Check if section is visible (top is near or above viewport top, bottom is below viewport top)
            const isVisible = rect.top <= 50 && rect.bottom > 50;
            
            const currentProgress = scrollProgressRef.current;

            if (!isVisible) {
                if (isLockedRef.current) {
                    isLockedRef.current = false;
                    start();
                }
                setIsActive(false);
                return;
            }

            // Calculate new progress
            const scrollDelta = e.deltaY * speed;
            const progressDelta = scrollDelta / scrollableWidth;
            const newProgress = Math.max(0, Math.min(1, currentProgress + progressDelta));

            // At start and scrolling up - allow page scroll
            if (currentProgress <= 0.005 && e.deltaY < 0) {
                if (isLockedRef.current) {
                    isLockedRef.current = false;
                    start();
                }
                setIsActive(false);
                return;
            }

            // At end and scrolling down - allow page scroll
            if (currentProgress >= 0.995 && e.deltaY > 0) {
                if (isLockedRef.current) {
                    isLockedRef.current = false;
                    start();
                }
                setIsActive(false);
                return;
            }

            // In the middle - capture wheel and do horizontal scroll
            e.preventDefault();
            e.stopPropagation();
            
            if (!isLockedRef.current) {
                isLockedRef.current = true;
                stop();
            }

            scrollProgressRef.current = newProgress;
            setScrollProgress(newProgress);
            setIsActive(true);
        };

        // Reset progress when section scrolls out of view
        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Section scrolled completely above - set to end
            if (rect.bottom < 0) {
                scrollProgressRef.current = 1;
                setScrollProgress(1);
                if (isLockedRef.current) {
                    isLockedRef.current = false;
                    start();
                }
                setIsActive(false);
            }
            // Section scrolled completely below - set to start
            else if (rect.top > viewportHeight) {
                scrollProgressRef.current = 0;
                setScrollProgress(0);
                if (isLockedRef.current) {
                    isLockedRef.current = false;
                    start();
                }
                setIsActive(false);
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            container.removeEventListener('wheel', handleWheel, { capture: true });
            window.removeEventListener('scroll', handleScroll);
            if (isLockedRef.current) {
                start();
            }
        };
    }, [lenis, speed, start, stop, isMobile]);

    // Calculate translateX based on progress
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const translateX = isMobile ? 0 : -scrollProgress * Math.max(0, trackWidth - viewportWidth + 100);

    return {
        containerRef,
        trackRef,
        scrollProgress,
        translateX,
        isActive,
        trackWidth,
        isMobile,
    };
};

export default useHorizontalScroll;
