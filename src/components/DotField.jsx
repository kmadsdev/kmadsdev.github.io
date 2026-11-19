// The dot field of the hero: a canvas that fills its parent box and nothing else.
//
// Two bodies bend the field:
//   - the body in `bodyRef` (the badge): the dots leave its disc, crowd at its
//     edge and turn a little around it;
//   - the pointer, only while it is over the parent box: dots near it grow and
//     move away.
// It draws when something changed, not each frame. With reduced motion, or on a
// touch screen, the pointer does nothing and the field is still.
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks.js';

const REACH = 150;

export default function DotField({ bodyRef }) {
    const canvasRef = useRef(null);
    const reduced = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const box = canvas?.parentElement;
        const context = canvas?.getContext?.('2d');
        if (!canvas || !box || !context) return undefined;

        const pointer = { x: 0, y: 0, on: false };
        const body = { x: 0, y: 0, r: 0 };
        let colors = {};
        let spacing = 28;
        let frame = 0;
        let width = 0;
        let height = 0;

        const measure = () => {
            const style = getComputedStyle(document.documentElement);
            colors = {
                dot: style.getPropertyValue('--c-line-strong').trim() || 'rgba(255,255,255,0.18)',
                near: style.getPropertyValue('--c-text-muted').trim() || '#a39fae',
                accent: style.getPropertyValue('--c-red').trim() || '#ff014f',
            };
            spacing = Math.round(parseFloat(style.fontSize) * 1.75) || 28;
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            const rect = box.getBoundingClientRect();
            width = Math.round(rect.width);
            height = Math.round(rect.height);
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            const target = bodyRef?.current;
            if (target) {
                const b = target.getBoundingClientRect();
                body.r = b.width / 2;
                body.x = b.left - rect.left + body.r;
                body.y = b.top - rect.top + body.r;
            } else {
                body.r = 0;
            }
        };

        const draw = () => {
            frame = 0;
            context.clearRect(0, 0, width, height);
            const offsetX = (width % spacing) / 2;
            const offsetY = (height % spacing) / 2;
            const halo = body.r * 0.95;
            for (let gy = offsetY; gy < height; gy += spacing) {
                for (let gx = offsetX; gx < width; gx += spacing) {
                    let x = gx;
                    let y = gy;
                    let radius = 0;
                    let color = colors.dot;

                    if (body.r > 0) {
                        const dx = gx - body.x;
                        const dy = gy - body.y;
                        const d = Math.hypot(dx, dy);
                        if (d < body.r * 0.62) continue;
                        if (d < body.r + halo) {
                            // 1 at the centre of the body, 0 at the end of its reach.
                            const t = 1 - d / (body.r + halo);
                            const out = body.r * 1.04 + (d / (body.r + halo)) ** 1.6 * (halo - body.r * 0.04);
                            const angle = Math.atan2(dy, dx) + t * t * 0.9;
                            x = body.x + Math.cos(angle) * out;
                            y = body.y + Math.sin(angle) * out;
                            radius = 0.5 + t * 1.5;
                            color = t > 0.3 ? colors.near : colors.dot;
                        }
                    }

                    if (pointer.on) {
                        const dx = x - pointer.x;
                        const dy = y - pointer.y;
                        const d = Math.hypot(dx, dy);
                        if (d < REACH) {
                            const pull = 1 - d / REACH;
                            const push = pull * pull * 9;
                            x += (dx / (d || 1)) * push;
                            y += (dy / (d || 1)) * push;
                            radius = Math.max(radius, 0.6 + pull * 1.9);
                            color = pull > 0.78 ? colors.accent : colors.near;
                        }
                    }

                    context.fillStyle = color;
                    if (radius === 0) {
                        context.fillRect(x - 0.5, y - 0.5, 1, 1);
                    } else {
                        context.beginPath();
                        context.arc(x, y, radius, 0, Math.PI * 2);
                        context.fill();
                    }
                }
            }
        };

        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(draw);
        };
        const refit = () => {
            measure();
            schedule();
        };
        const move = (event) => {
            if (reduced || event.pointerType === 'touch') return;
            const rect = box.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
            pointer.on = true;
            schedule();
        };
        const leave = () => {
            if (!pointer.on) return;
            pointer.on = false;
            schedule();
        };

        measure();
        draw();
        // The pointer is measured against the box: outside it, nothing moves.
        box.addEventListener('pointermove', move, { passive: true });
        box.addEventListener('pointerleave', leave);
        window.addEventListener('resize', refit);
        const watch = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(refit);
        watch?.observe(box);
        if (bodyRef?.current) watch?.observe(bodyRef.current);
        document.fonts?.ready?.then(refit).catch(() => {});

        return () => {
            window.cancelAnimationFrame(frame);
            box.removeEventListener('pointermove', move);
            box.removeEventListener('pointerleave', leave);
            window.removeEventListener('resize', refit);
            watch?.disconnect();
        };
    }, [reduced, bodyRef]);

    return <canvas className="wh-field" ref={canvasRef} aria-hidden="true" />;
}
