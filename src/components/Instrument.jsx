// The instrument layer: two rulers and a dot field behind the page.
//
// - The red index on the left ruler shows how far the page is scrolled.
// - Grey marks on both rulers follow the pointer and show its position.
// - Dots near the pointer grow and move away from it.
// It draws only when something changed. With reduced motion, or on a touch
// screen, the dots stay still.
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks.js';

const SPACING = 28;
const REACH = 150;
const pad = (n, width) => String(Math.max(0, Math.round(n))).padStart(width, '0');

export default function Instrument() {
    const canvasRef = useRef(null);
    const railRef = useRef(null);
    const stripRef = useRef(null);
    const reduced = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext?.('2d');
        if (!canvas || !context) return undefined;

        const rail = railRef.current;
        const strip = stripRef.current;
        const part = (root, name) => root.querySelector(`[data-part="${name}"]`);
        const index = part(rail, 'index');
        const indexValue = part(rail, 'index-value');
        const markY = part(rail, 'cursor');
        const markYValue = part(rail, 'cursor-value');
        const markX = part(strip, 'cursor');
        const markXValue = part(strip, 'cursor-value');

        const pointer = { x: -9999, y: -9999, on: false };
        let colors = {};
        let frame = 0;
        let width = 0;
        let height = 0;

        const readColors = () => {
            const style = getComputedStyle(document.documentElement);
            colors = {
                dot: style.getPropertyValue('--wh-color-line-strong').trim(),
                near: style.getPropertyValue('--wh-color-text-muted').trim(),
                accent: style.getPropertyValue('--wh-color-accent').trim(),
            };
        };

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        const draw = () => {
            frame = 0;
            context.clearRect(0, 0, width, height);
            const offsetX = (width % SPACING) / 2;
            const offsetY = (height % SPACING) / 2;
            for (let y = offsetY; y < height; y += SPACING) {
                for (let x = offsetX; x < width; x += SPACING) {
                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const distance = Math.hypot(dx, dy);
                    if (!pointer.on || distance > REACH) {
                        context.fillStyle = colors.dot;
                        context.fillRect(x - 0.5, y - 0.5, 1, 1);
                        continue;
                    }
                    const pull = 1 - distance / REACH;
                    const push = pull * pull * 9;
                    const px = x + (dx / (distance || 1)) * push;
                    const py = y + (dy / (distance || 1)) * push;
                    const radius = 0.6 + pull * 1.9;
                    context.fillStyle = pull > 0.78 ? colors.accent : colors.near;
                    context.beginPath();
                    context.arc(px, py, radius, 0, Math.PI * 2);
                    context.fill();
                }
            }

            // Rulers
            const top = rail.getBoundingClientRect().top;
            const railHeight = rail.clientHeight;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            index.style.transform = `translateY(${Math.round(progress * (railHeight - 24))}px)`;
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
        const restyle = () => {
            readColors();
            schedule();
        };
        const refit = () => {
            resize();
            schedule();
        };

        readColors();
        resize();
        draw();

        const themeWatch = new MutationObserver(restyle);
        themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', refit);
        document.documentElement.addEventListener('pointerleave', leave);

        return () => {
            window.cancelAnimationFrame(frame);
            themeWatch.disconnect();
            window.removeEventListener('pointermove', move);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', refit);
            document.documentElement.removeEventListener('pointerleave', leave);
        };
    }, [reduced]);

    return (
        <div aria-hidden="true">
            <canvas className="wh-field" ref={canvasRef} />
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
