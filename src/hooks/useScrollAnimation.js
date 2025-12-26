import { useRef, useEffect, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
    } = options;

    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;
            
            const start = windowHeight;
            const end = -elementHeight;
            const current = rect.top;
            
            const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { ref, isInView, scrollProgress };
};

export const useHorizontalScroll = (containerRef, contentRef) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const containerHeight = container.offsetHeight;
            
            const scrollStart = windowHeight * 0.2;
            const scrollEnd = -(containerHeight - windowHeight * 0.8);
            
            if (rect.top <= scrollStart && rect.top >= scrollEnd) {
                setIsActive(true);
                const progress = (scrollStart - rect.top) / (scrollStart - scrollEnd);
                setScrollProgress(Math.max(0, Math.min(1, progress)));
            } else {
                setIsActive(rect.top <= scrollEnd);
                if (rect.top > scrollStart) {
                    setScrollProgress(0);
                } else if (rect.top < scrollEnd) {
                    setScrollProgress(1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [containerRef, contentRef]);

    return { scrollProgress, isActive };
};

export const useParallax = (speed = 0.5) => {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const windowCenterY = window.innerHeight / 2;
            const diff = windowCenterY - centerY;
            setOffset(diff * speed);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return { ref, offset };
};

export default useScrollAnimation;
