import { useEffect } from 'react';

/**
 * Decouples horizontal and vertical scroll axes on an overflow-x container.
 * - When the user is primarily scrolling vertically (deltaY > deltaX),
 *   prevents the horizontal scroll position from shifting.
 * - When the user is primarily scrolling horizontally (deltaX > deltaY),
 *   prevents vertical page scroll and handles horizontal scroll manually.
 *
 * @param {React.RefObject} ref - Ref to the scroll wrapper element
 */
export const useDecoupledScroll = (ref) => {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleWheel = (e) => {
            const absX = Math.abs(e.deltaX);
            const absY = Math.abs(e.deltaY);

            if (absX > absY) {
                // Primarily horizontal — handle it ourselves, block vertical
                const maxScrollLeft = el.scrollWidth - el.clientWidth;
                const atStart = el.scrollLeft <= 0 && e.deltaX < 0;
                const atEnd = el.scrollLeft >= maxScrollLeft && e.deltaX > 0;

                // Allow page to take over when the track is fully scrolled
                if (atStart || atEnd) return;

                e.preventDefault();
                e.stopPropagation();
                el.scrollLeft += e.deltaX;
            } else {
                // Primarily vertical — prevent the x-scroll from drifting
                const savedScrollLeft = el.scrollLeft;
                requestAnimationFrame(() => {
                    if (el.scrollLeft !== savedScrollLeft) {
                        el.scrollLeft = savedScrollLeft;
                    }
                });
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [ref]);
};

export default useDecoupledScroll;
