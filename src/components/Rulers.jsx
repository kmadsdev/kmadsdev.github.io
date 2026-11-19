// The two fixed rulers: one on the left edge, one under the top bar.
//
// - The red index on the left ruler shows how far the page is scrolled.
// - Grey marks on both rulers follow the pointer and show its position.
// They are on every section. They update only when the page or the pointer
// moves. Hidden below 1024px (see editorial.css).
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks.js';

const pad = (n, width) => String(Math.max(0, Math.round(n))).padStart(width, '0');

export default function Rulers() {
    const railRef = useRef(null);
    const stripRef = useRef(null);
    const reduced = useReducedMotion();

    useEffect(() => {
        const rail = railRef.current;
        const strip = stripRef.current;
        if (!rail || !strip) return undefined;
        const part = (root, name) => root.querySelector(`[data-part="${name}"]`);
        const index = part(rail, 'index');
        const indexValue = part(rail, 'index-value');
        const markY = part(rail, 'cursor');
        const markYValue = part(rail, 'cursor-value');
        const markX = part(strip, 'cursor');
        const markXValue = part(strip, 'cursor-value');
        const pointer = { x: 0, y: 0, on: false };
        let frame = 0;

        const draw = () => {
            frame = 0;
            const top = rail.getBoundingClientRect().top;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            index.style.transform = `translateY(${Math.round(progress * (rail.clientHeight - 24))}px)`;
            indexValue.textContent = pad(progress * 100, 3);
            rail.dataset.pointer = strip.dataset.pointer = pointer.on ? 'on' : 'off';
            if (pointer.on) {
                markY.style.transform = `translateY(${Math.max(0, pointer.y - top)}px)`;
                markYValue.textContent = pad(pointer.y + window.scrollY, 4);
                markX.style.transform = `translateX(${Math.max(0, pointer.x - strip.getBoundingClientRect().left)}px)`;
                markXValue.textContent = pad(pointer.x, 4);
            }
        };
        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(draw);
        };
        const move = (event) => {
            if (reduced || event.pointerType === 'touch') return;
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.on = true;
            schedule();
        };
        const leave = () => {
            pointer.on = false;
            schedule();
        };

        draw();
        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        document.documentElement.addEventListener('pointerleave', leave);
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            document.documentElement.removeEventListener('pointerleave', leave);
        };
    }, [reduced]);

    return (
        <div aria-hidden="true">
            <div className="wh-rule wh-rule--y" ref={railRef}>
                <div className="wh-rule__cursor" data-part="cursor"><span className="wh-rule__value" data-part="cursor-value" /></div>
                <div className="wh-rule__index" data-part="index"><span className="wh-rule__value" data-part="index-value">000</span></div>
            </div>
            <div className="wh-rule wh-rule--x" ref={stripRef}>
                <div className="wh-rule__cursor" data-part="cursor"><span className="wh-rule__value" data-part="cursor-value" /></div>
            </div>
        </div>
    );
}
