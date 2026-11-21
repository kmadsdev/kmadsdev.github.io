// The dot field of the hero: one canvas that fills its parent box and nothing else.
//
// Three things bend the field:
//   - the body in `bodyRef` (the badge): the dots leave its disc, crowd at its
//     edge and turn a little around it;
//   - the pointer, only while it is over the parent box: dots near it grow and
//     move away;
//   - a press: while the pointer is down the dots near it draw in (the charge,
//     more with the time of the hold, up to WAVE.holdCap). The release sends one
//     ring wave out from that point. A click is a short hold: a small wave. A
//     long hold gives a stronger, faster and wider wave. Several waves can be
//     alive: their pushes add up. A wave loses height on its way and leaves the
//     box at its edge: nothing comes back.
// One canvas and one frame loop. The loop runs only while a wave or a charge is
// alive. Else the field draws once when something changed.
// A press on a link, a button or the badge is theirs: no wave.
// Touch: a tap gives a wave, a long press charges. The page scroll is never
// blocked: when the browser takes the touch for a scroll, the charge is dropped.
// With reduced motion the pointer does nothing and there is no wave.
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks.js';

const REACH = 150;
const FADE_FROM = 0.72; // the field is full to 72% of its height, then it fades to nothing at its lower edge
// Lengths are pixels at a 16px root size. They grow with the root size, as the dot grid does.
const WAVE = {
    speed: 720,     // px/s: the front of a click wave
    speedHeld: 0.4, // a full charge adds 40% to the speed
    width: 56,      // px: half the width of the front
    widthHeld: 0.6, // a full charge adds 60% to the width
    push: 12,       // px that a click wave moves a dot at its origin
    pushHeld: 30,   // px after a full charge
    fade: 1600,     // px of travel after which 37% of the height is left
    spread: 160,    // px: the ring grows, so the same energy stands on a longer line
    holdCap: 1200,  // ms of hold for a full charge
    most: 12,       // waves alive at one time
};
const OWN_PRESS = 'a, button, input, select, textarea, summary, label, [role="button"], [role="slider"], [role="scrollbar"], .badge';

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
        const waves = []; // { x, y, born, push, speed, width }
        let press = null; // { id, at, touch }
        let charge = 0;   // 0 to 1: how far the dots near the pointer are drawn in
        let colors = {};
        let spacing = 28;
        let unit = 1;     // root size / 16
        let frame = 0;
        let last = 0;
        let width = 0;
        let height = 0;

        const measure = () => {
            const style = getComputedStyle(document.documentElement);
            colors = {
                dot: style.getPropertyValue('--c-line-strong').trim() || 'rgba(255,255,255,0.18)',
                near: style.getPropertyValue('--c-text-muted').trim() || '#a39fae',
                accent: style.getPropertyValue('--c-red').trim() || '#ff014f',
            };
            const root = parseFloat(style.fontSize) || 16;
            unit = root / 16;
            spacing = Math.round(root * 1.75) || 28;
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

        const draw = (now) => {
            context.clearRect(0, 0, width, height);
            const offsetX = (width % spacing) / 2;
            const offsetY = (height % spacing) / 2;
            const halo = body.r * 0.95;
            const reach = REACH * (1 + 0.5 * charge);
            // Where each wave is now. A wave that left the box is dropped.
            const far = Math.hypot(width, height);
            for (let i = waves.length - 1; i >= 0; i -= 1) {
                const wave = waves[i];
                wave.r = ((now - wave.born) / 1000) * wave.speed;
                wave.left = Math.exp(-wave.r / (WAVE.fade * unit));
                wave.height = wave.push * wave.left * Math.sqrt(WAVE.spread / (WAVE.spread + wave.r / unit));
                if (wave.r - wave.width * 3 > far || wave.height < 0.08) waves.splice(i, 1);
            }
            // Few fills for all the dots: one path for each colour. The lower edge of the field fades out
            // (FADE_FROM of the height to the end): each row there has its own paths and its own alpha.
            // The canvas does this itself: a CSS mask on a large canvas costs a full repaint each frame.
            const full = { alpha: 1, dot: new Path2D(), near: new Path2D(), accent: new Path2D() };
            const groups = [full];

            for (let gy = offsetY; gy < height; gy += spacing) {
                const alpha = Math.min(1, (height - gy) / (height * (1 - FADE_FROM)));
                let paths = full;
                if (alpha < 1) {
                    paths = { alpha, dot: new Path2D(), near: new Path2D(), accent: new Path2D() };
                    groups.push(paths);
                }
                for (let gx = offsetX; gx < width; gx += spacing) {
                    let x = gx;
                    let y = gy;
                    let radius = 0;
                    let tone = 'dot';

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
                            tone = t > 0.3 ? 'near' : 'dot';
                        }
                    }

                    if (pointer.on) {
                        const dx = x - pointer.x;
                        const dy = y - pointer.y;
                        const d = Math.hypot(dx, dy);
                        if (d < reach) {
                            const pull = 1 - d / reach;
                            // With no charge the dots move away. A charge draws them in, never past the pointer.
                            const push = Math.max(-d * 0.6, pull * pull * 9 * (1 - 2.4 * charge));
                            x += (dx / (d || 1)) * push;
                            y += (dy / (d || 1)) * push;
                            radius = Math.max(radius, 0.6 + pull * 1.9 * (1 + 0.35 * charge));
                            tone = pull > 0.78 - 0.3 * charge ? 'accent' : 'near';
                        }
                    }

                    if (waves.length) {
                        let moveX = 0;
                        let moveY = 0;
                        let lift = 0;
                        for (const wave of waves) {
                            const dx = gx - wave.x;
                            const dy = gy - wave.y;
                            const d = Math.hypot(dx, dy);
                            const u = (d - wave.r) / wave.width;
                            if (u > 3 || u < -3) continue; // the front is not here
                            // The shape across the front: a crest, with a small dip before and after it.
                            const crest = (1 - u * u) * Math.exp(-u * u / 2);
                            const move = wave.height * crest;
                            moveX += (dx / (d || 1)) * move;
                            moveY += (dy / (d || 1)) * move;
                            lift += Math.abs(crest) * wave.left * wave.strength;
                        }
                        if (lift > 0.02) {
                            x += moveX;
                            y += moveY;
                            // The front looks as the pointer does on the field: large red dots at its crest, grey ones around.
                            radius = Math.max(radius, 0.6 + Math.min(1, lift) * 2.3);
                            if (lift > 0.5) tone = 'accent';
                            else if (lift > 0.08 && tone === 'dot') tone = 'near';
                        }
                    }

                    if (radius === 0) {
                        paths[tone].rect(x - 0.5, y - 0.5, 1, 1);
                    } else {
                        paths[tone].moveTo(x + radius, y);
                        paths[tone].arc(x, y, radius, 0, Math.PI * 2);
                    }
                }
            }
            for (const group of groups) {
                context.globalAlpha = group.alpha;
                for (const tone of ['dot', 'near', 'accent']) {
                    context.fillStyle = colors[tone];
                    context.fill(group[tone]);
                }
            }
            context.globalAlpha = 1;
        };

        // One loop. It asks for the next frame only while a wave or a charge is alive.
        const tick = (now) => {
            const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
            last = now;
            if (press) {
                // Ease out: the charge grows fast first and is full at the cap.
                const held = Math.min(1, (now - press.at) / WAVE.holdCap);
                charge = 1 - (1 - held) ** 2;
            } else if (charge > 0) {
                charge *= Math.exp(-dt / 0.07); // the dots are free again
                if (charge < 0.004) charge = 0;
            }
            draw(now);
            frame = press || charge > 0 || waves.length ? window.requestAnimationFrame(tick) : 0;
        };
        const schedule = () => {
            if (frame) return;
            last = performance.now();
            frame = window.requestAnimationFrame(tick);
        };
        const refit = () => {
            measure();
            schedule();
        };
        const place = (event) => {
            const rect = box.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
        };
        const move = (event) => {
            if (reduced) return;
            // A finger moves the field only while it holds a press.
            if (event.pointerType === 'touch' && press?.id !== event.pointerId) return;
            place(event);
            pointer.on = true;
            schedule();
        };
        // A press that leaves the box still knows where the pointer is: the wave starts there, at the edge.
        const track = (event) => {
            if (press?.id !== event.pointerId) return;
            place(event);
            pointer.x = Math.max(0, Math.min(width, pointer.x));
            pointer.y = Math.max(0, Math.min(height, pointer.y));
            schedule();
        };
        const leave = (event) => {
            if (!pointer.on || press?.id === event.pointerId) return;
            pointer.on = false;
            schedule();
        };
        const down = (event) => {
            if (reduced || press || event.button > 0 || !event.isPrimary) return;
            if (event.target.closest?.(OWN_PRESS)) return;
            place(event);
            pointer.on = true;
            press = { id: event.pointerId, at: performance.now(), touch: event.pointerType === 'touch' };
            schedule();
        };
        const up = (event) => {
            if (!press || event.pointerId !== press.id) return;
            const now = performance.now();
            const held = Math.min(1, (now - press.at) / WAVE.holdCap);
            if (press.touch || !box.contains(event.target)) pointer.on = false;
            press = null;
            if (waves.length >= WAVE.most) waves.shift();
            waves.push({
                x: pointer.x,
                y: pointer.y,
                born: now,
                strength: 0.8 + 0.2 * held,
                push: (WAVE.push + (WAVE.pushHeld - WAVE.push) * held) * unit,
                speed: WAVE.speed * (1 + WAVE.speedHeld * held) * unit,
                width: WAVE.width * (1 + WAVE.widthHeld * held) * unit,
            });
            schedule();
        };
        const cancel = (event) => {
            if (!press || event.pointerId !== press.id) return;
            // The browser took the touch (a scroll): no wave.
            press = null;
            pointer.on = false;
            schedule();
        };
        // A long press with a finger charges the field. It must not open the menu of the browser.
        const menu = (event) => {
            if (press?.touch) event.preventDefault();
        };

        measure();
        draw(performance.now());
        // The pointer is measured against the box: outside it, nothing moves.
        box.addEventListener('pointermove', move, { passive: true });
        box.addEventListener('pointerleave', leave);
        box.addEventListener('pointerdown', down, { passive: true });
        box.addEventListener('contextmenu', menu);
        window.addEventListener('pointermove', track, { passive: true });
        window.addEventListener('pointerup', up, { passive: true });
        window.addEventListener('pointercancel', cancel, { passive: true });
        window.addEventListener('resize', refit);
        const watch = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(refit);
        watch?.observe(box);
        if (bodyRef?.current) watch?.observe(bodyRef.current);
        document.fonts?.ready?.then(refit).catch(() => {});

        return () => {
            window.cancelAnimationFrame(frame);
            box.removeEventListener('pointermove', move);
            box.removeEventListener('pointerleave', leave);
            box.removeEventListener('pointerdown', down);
            box.removeEventListener('contextmenu', menu);
            window.removeEventListener('pointermove', track);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', cancel);
            window.removeEventListener('resize', refit);
            watch?.disconnect();
        };
    }, [reduced, bodyRef]);

    return <canvas className="wh-field" ref={canvasRef} aria-hidden="true" />;
}
