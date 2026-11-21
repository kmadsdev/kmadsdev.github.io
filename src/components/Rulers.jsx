// The two fixed rulers: one on the right edge, one under the top bar.
//
// The right ruler IS the scroll bar of the page (the native one is hidden where
// the ruler shows, see editorial.css). Its red index is the thumb: its place on
// the ruler is the scroll position, from the top of the screen to the bottom.
//   - drag the index: the page follows the hand 1:1;
//   - press on the ruler: the page goes there, and a drag goes on from there;
//   - keyboard (the ruler takes focus): arrows, Page Up, Page Down, Home, End.
// The wheel, touch, the keyboard on the page, find-in-page and anchors move the
// real scroll position as before: the ruler only reads it.
// The rail is thin (11px): the number of the index shows beside it only on hover, drag or focus.
// Grey marks on both rulers follow the pointer and show its position.
// They update only when the page or the pointer moves. Hidden below 1024px,
// where the browser shows its own thin scroll bar.
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks.js';
import { scrollToY } from '../smooth.js';
import { useRulerText } from './player/playerText.js';

const INDEX = 24;  // px: the height of the index (its line and its number). It is the thumb of the scroll bar.
const LINE = 40;   // px for one arrow key, as a browser does
const SLOP = 3;    // px that the pointer moves before a press becomes a drag

const pad = (n, width) => String(Math.max(0, Math.round(n))).padStart(width, '0');
const clamp = (value) => Math.max(0, Math.min(1, value));
const scrollMax = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

export default function Rulers({ controls = 'main' }) {
    const railRef = useRef(null);
    const stripRef = useRef(null);
    const reduced = useReducedMotion();
    const text = useRulerText();

    useEffect(() => {
        const rail = railRef.current;
        const strip = stripRef.current;
        if (!rail || !strip) return undefined;
        const part = (root, name) => root.querySelector(`[data-part="${name}"]`);
        const index = part(rail, 'index');
        const indexValue = part(rail, 'index-value');
        const markY = part(rail, 'cursor');
        const markX = part(strip, 'cursor');
        const pointer = { x: 0, y: 0, on: false };
        let drag = null; // { id, grab, startY, moved }
        let frame = 0;

        const place = (progress) => {
            index.style.transform = `translateY(${Math.round(progress * (rail.clientHeight - INDEX))}px)`;
            indexValue.textContent = pad(progress * 100, 3);
            rail.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
        };
        const draw = () => {
            frame = 0;
            const top = rail.getBoundingClientRect().top;
            const max = scrollMax();
            if (!drag?.moved) place(max > 0 ? clamp(window.scrollY / max) : 0);
            rail.dataset.pointer = strip.dataset.pointer = pointer.on ? 'on' : 'off';
            if (pointer.on) {
                markY.style.transform = `translateY(${Math.max(0, pointer.y - top)}px)`;
                markX.style.transform = `translateX(${Math.max(0, pointer.x - strip.getBoundingClientRect().left)}px)`;
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

        // ---- The ruler as the scroll bar ----
        /** The page goes where the pointer holds the index. `instant`: it follows the hand. */
        const follow = (clientY, instant) => {
            const box = rail.getBoundingClientRect();
            const progress = clamp((clientY - box.top - drag.grab) / (box.height - INDEX));
            if (instant) place(progress); // the index stays under the hand in this same frame
            scrollToY(progress * scrollMax(), { instant });
        };
        const down = (event) => {
            if (event.button > 0 || drag) return;
            const at = index.getBoundingClientRect();
            const onIndex = event.clientY >= at.top - 4 && event.clientY <= at.bottom + 4;
            // A press on the index keeps the point where the hand took it. A press on the ruler takes the index by its middle.
            drag = { id: event.pointerId, grab: onIndex ? event.clientY - at.top : INDEX / 2, startY: event.clientY, moved: false };
            rail.setPointerCapture?.(event.pointerId);
            rail.dataset.drag = 'on';
            event.preventDefault(); // no text selection while the hand drags
            if (!onIndex) follow(event.clientY, false);
        };
        const dragMove = (event) => {
            if (!drag || event.pointerId !== drag.id) return;
            if (!drag.moved && Math.abs(event.clientY - drag.startY) < SLOP) return;
            drag.moved = true;
            follow(event.clientY, true);
        };
        const dragEnd = (event) => {
            if (!drag || event.pointerId !== drag.id) return;
            drag = null;
            delete rail.dataset.drag;
            schedule();
        };
        const key = (event) => {
            const page = window.innerHeight * 0.875;
            const to = {
                ArrowDown: window.scrollY + LINE,
                ArrowUp: window.scrollY - LINE,
                PageDown: window.scrollY + page,
                PageUp: window.scrollY - page,
                Home: 0,
                End: scrollMax(),
            }[event.key];
            if (to === undefined) return;
            event.preventDefault();
            scrollToY(to);
        };

        draw();
        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        document.documentElement.addEventListener('pointerleave', leave);
        rail.addEventListener('pointerdown', down);
        rail.addEventListener('pointermove', dragMove);
        rail.addEventListener('pointerup', dragEnd);
        rail.addEventListener('pointercancel', dragEnd);
        rail.addEventListener('keydown', key);
        // The page grows after the first paint (pictures, fonts): the index must follow its length.
        const watch = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
        watch?.observe(document.body);
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            document.documentElement.removeEventListener('pointerleave', leave);
            rail.removeEventListener('pointerdown', down);
            rail.removeEventListener('pointermove', dragMove);
            rail.removeEventListener('pointerup', dragEnd);
            rail.removeEventListener('pointercancel', dragEnd);
            rail.removeEventListener('keydown', key);
            watch?.disconnect();
        };
    }, [reduced]);

    return (
        <>
            <div className="wh-rule wh-rule--x" ref={stripRef} aria-hidden="true">
                <div className="wh-rule__cursor" data-part="cursor" />
            </div>
            <div
                className="wh-rule wh-rule--y"
                ref={railRef}
                role="scrollbar"
                tabIndex={0}
                aria-label={text.scroll}
                aria-controls={controls}
                aria-orientation="vertical"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={0}
            >
                <div className="wh-rule__cursor" data-part="cursor" aria-hidden="true" />
                <div className="wh-rule__index" data-part="index" aria-hidden="true"><span className="wh-rule__value" data-part="index-value">000</span></div>
            </div>
        </>
    );
}
