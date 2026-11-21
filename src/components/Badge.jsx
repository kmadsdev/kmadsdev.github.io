// The globe badge. It is the music player of the site.
//
// - The inner circle (the globe and the empty space around its lines) is one
//   button: play and pause. The globe never turns. While the song is paused it
//   is smaller (a spring, so a new press can catch it at any moment). Only the
//   picture changes size: the button keeps its size, so a click always lands.
// - The band of red text is the disc. Its angle is the playhead of the song:
//   angle = position / DISC.secondsPerTurn * 360, computed each frame. So it
//   turns when the song plays, it stops when the song stops, and a jump in the
//   song moves it. A hand can hold it and turn it: the ring follows the pointer
//   1:1 and the sound follows the hand, as on a record (slow, fast, backwards,
//   silent when the hand is still). On release the disc goes back to the play
//   speed by itself. A press that does not move is not a click: it does nothing.
// - With no song (`music.src` is empty) the globe starts and stops the turn of
//   the ring, as before the player, and the hand can still turn the ring.
// - With reduced motion nothing turns and the globe changes size at once.
// Nothing on the page says how to use it: the owner wants the controls hidden.
// Each control still has a name for screen readers and works with the keyboard.
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { links } from '../content/index.js';
import { usePlayer } from './player/PlayerProvider.jsx';
import { music, usePlayerText } from './player/playerText.js';
import { DEG_PER_SECOND, DISC, angleAt, angleOf, clock, handSpeed, springStep, turnBetween } from './player/disc.js';

const JUMP = 30; // deg in one frame: more is a jump of the playhead (a seek), not play. The ring then eases to the new place.

const Badge = forwardRef(function Badge({ className = '' }, ref) {
    const { controls } = useLanguage().t;
    const text = usePlayerText();
    const player = usePlayer();
    const own = useRef(null);
    const target = ref ?? own;
    const ringRef = useRef(null);
    const globeRef = useRef(null);
    const inView = useInView(target, { threshold: 0.05 });
    const reduced = useReducedMotion();
    const [stopped, setStopped] = useState(false); // only with no song: the visitor stopped the turn
    const [held, setHeld] = useState(false);

    const on = player.enabled ? player.playing : !stopped;
    const globeSize = player.enabled && !player.playing ? DISC.globePaused : 1;

    // The motion of the two parts. One loop, and it sleeps when nothing moves.
    const live = useRef(null);
    live.current = { on, inView, globeSize, reduced, player };
    const motion = useRef({ angle: 0, base: 0, offset: 0, speed: 0, held: false, scale: globeSize, scaleSpeed: 0, pressed: false, frame: 0, last: 0 }).current;
    const hand = useRef(null);

    const paint = useCallback(() => {
        if (ringRef.current) ringRef.current.style.transform = `rotate(${motion.angle.toFixed(2)}deg)`;
        if (globeRef.current) globeRef.current.style.transform = `scale(${motion.scale.toFixed(4)})`;
    }, [motion]);

    /** Where the hand is in the song, and how fast it turns (1 = the play speed). */
    const handNow = useCallback((now) => {
        const h = hand.current;
        const end = live.current.player.duration();
        const wanted = h.fromTime + h.turn / DEG_PER_SECOND;
        const time = Math.max(0, end ? Math.min(end, wanted) : wanted);
        // At an end of the song there is no more song: the disc does not sound there.
        const rate = time === wanted ? handSpeed(h.samples, now) / DEG_PER_SECOND : 0;
        return { time, rate };
    }, []);

    const wake = useCallback(() => {
        if (motion.frame || typeof window.requestAnimationFrame !== 'function') return;
        motion.last = performance.now();
        const tick = (now) => {
            const { on: turning, inView: seen, globeSize: size, reduced: still, player: p } = live.current;
            const dt = Math.min(0.05, Math.max(0, (now - motion.last) / 1000));
            motion.last = now;
            let moving = false;
            if (p.enabled) {
                // ONE source of truth: the playhead (or the hand that holds it). The ring has no speed of its own.
                let base;
                if (motion.held && hand.current?.holds) {
                    const at = handNow(now);
                    hand.current.time = at.time;
                    p.moveDisc(at.time, at.rate);
                    base = angleOf(at.time);
                } else {
                    base = angleOf(p.position());
                }
                const step = base - motion.base;
                if (Math.abs(step) > JUMP) motion.offset += Math.max(-360, Math.min(360, -step)); // a seek: no jump on the screen
                motion.offset *= Math.exp(-dt / DISC.catchUp);
                if (Math.abs(motion.offset) < 0.02) motion.offset = 0;
                moving = motion.held || turning || Math.abs(step) > 0.001 || motion.offset !== 0;
                motion.base = base;
                motion.angle = still ? 0 : base + motion.offset;
            } else if (!motion.held) {
                // No song: the ring turns by itself, slowly, as before the player.
                const goal = turning && seen && !still ? DISC.idleSpeed : 0;
                motion.speed += (goal - motion.speed) * (1 - Math.exp(-dt / DISC.idleSettle));
                motion.angle += motion.speed * dt;
                moving = goal !== 0 || Math.abs(motion.speed) > 0.05;
            } else {
                moving = true;
            }
            const scaleGoal = size * (motion.pressed ? DISC.globePressed : 1);
            if (still) [motion.scale, motion.scaleSpeed] = [scaleGoal, 0];
            else [motion.scale, motion.scaleSpeed] = springStep(motion.scale, motion.scaleSpeed, scaleGoal, dt);
            const springing = Math.abs(motion.scale - scaleGoal) > 0.0005 || Math.abs(motion.scaleSpeed) > 0.001;
            if (!springing) [motion.scale, motion.scaleSpeed] = [scaleGoal, 0];
            paint();
            // Off screen the loop sleeps. The angle comes from the playhead, so nothing is lost.
            motion.frame = (moving && (seen || motion.held)) || springing ? window.requestAnimationFrame(tick) : 0;
        };
        motion.frame = window.requestAnimationFrame(tick);
    }, [motion, paint, handNow]);

    useEffect(() => {
        wake();
    }, [wake, on, inView, globeSize, reduced]);
    // A jump of the playhead while the loop sleeps (a key, the media keys, the restart button).
    useEffect(() => (player.enabled ? player.onTime(wake) : undefined), [player, wake]);
    useEffect(() => () => {
        window.cancelAnimationFrame?.(motion.frame);
        motion.frame = 0; // the loop can start again (React runs an effect twice in development)
    }, [motion]);

    // ---- The hand on the disc ----
    const grab = useCallback(() => {
        const h = hand.current;
        if (!h || h.holds) return;
        const { player: p } = live.current;
        h.holds = true;
        h.fromAngle = motion.angle - h.turn; // no song: the ring goes on from where it is on the screen
        if (p.enabled) {
            h.fromTime = p.holdDisc();
            h.time = h.fromTime;
            // The ring stays where it is on the screen and comes under the hand in some frames (the few degrees before the grab).
            motion.offset = motion.angle - angleOf(handNow(performance.now()).time);
            motion.base = motion.angle - motion.offset;
        }
        motion.held = true;
        motion.speed = 0;
        setHeld(true);
        wake();
    }, [motion, wake, handNow]);

    const onRingDown = (event) => {
        if (event.button > 0 || hand.current) return;
        const ring = event.currentTarget;
        const box = ring.getBoundingClientRect();
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        const now = performance.now();
        ring.setPointerCapture?.(event.pointerId);
        hand.current = {
            id: event.pointerId, cx, cy, turn: 0, holds: false, fromTime: 0, time: 0, fromAngle: 0,
            radius: Math.hypot(event.clientX - cx, event.clientY - cy),
            angle: angleAt(event.clientX, event.clientY, cx, cy),
            samples: [{ t: now, a: 0 }],
            timer: window.setTimeout(grab, DISC.grabTime),
        };
    };
    const onRingMove = (event) => {
        const h = hand.current;
        if (!h || event.pointerId !== h.id) return;
        const angle = angleAt(event.clientX, event.clientY, h.cx, h.cy);
        const now = performance.now();
        h.turn += turnBetween(h.angle, angle);
        h.angle = angle;
        h.samples.push({ t: now, a: h.turn });
        if (h.samples.length > 12) h.samples.shift();
        if (!h.holds && Math.abs(h.turn) * (Math.PI / 180) * h.radius >= DISC.grabDistance) grab();
        if (h.holds && !live.current.player.enabled) {
            motion.angle = h.fromAngle + h.turn;
            paint();
        }
    };
    const release = (event, cancelled) => {
        const h = hand.current;
        if (!h || event.pointerId !== h.id) return;
        window.clearTimeout(h.timer);
        hand.current = null;
        if (!h.holds) return; // a press that did not move and did not last: nothing
        const { player: p, reduced: still } = live.current;
        motion.held = false;
        setHeld(false);
        if (p.enabled) {
            // The engine takes the disc from the speed of the hand back to the play speed. The ring reads the playhead.
            p.dropDisc(h.time);
            motion.offset = motion.angle - angleOf(p.position());
            motion.base = motion.angle - motion.offset;
        } else {
            motion.speed = cancelled || still ? 0 : handSpeed(h.samples, performance.now());
        }
        wake();
    };
    const onRingKey = (event) => {
        const steps = { ArrowRight: DISC.keyStep, ArrowUp: DISC.keyStep, ArrowLeft: -DISC.keyStep, ArrowDown: -DISC.keyStep, PageUp: DISC.pageStep, PageDown: -DISC.pageStep, Home: -Infinity };
        if (!(event.key in steps)) return;
        event.preventDefault();
        player.seekBy(steps[event.key] === -Infinity ? -player.position() : steps[event.key]);
        wake();
    };

    // The position of the song for screen readers, written without a render of the page.
    useEffect(() => {
        const ring = ringRef.current;
        if (!player.enabled || !ring) return undefined;
        const write = () => {
            const now = player.position();
            ring.setAttribute('aria-valuemax', String(Math.round(Math.max(player.duration(), now))));
            ring.setAttribute('aria-valuenow', String(Math.round(now)));
            ring.setAttribute('aria-valuetext', clock(now));
        };
        write();
        const timer = window.setInterval(write, 1000);
        const off = player.onTime(write);
        return () => {
            window.clearInterval(timer);
            off();
        };
    }, [player]);

    const pictures = {
        ring: <img src={links.badgeRing} alt="" width="500" height="500" decoding="async" fetchpriority="high" draggable="false" />,
        globe: <img ref={globeRef} src={links.badgeGlobe} alt="" width="500" height="500" decoding="async" draggable="false" />,
    };
    const ringHand = {
        onPointerDown: onRingDown,
        onPointerMove: onRingMove,
        onPointerUp: (event) => release(event, false),
        onPointerCancel: (event) => release(event, true),
    };
    const press = (value) => () => {
        motion.pressed = value;
        wake();
    };

    let globeName;
    if (player.enabled) globeName = player.playing ? text.pause : text.play;
    else globeName = stopped ? (controls?.playBadge ?? text.play) : (controls?.stopBadge ?? text.pause);
    // With no song and reduced motion the globe has nothing to start or stop: it is a picture.
    const globeIsButton = player.enabled || !reduced;
    const spin = on && inView && !reduced;

    return (
        <div className={`badge ${className}`.trim()} ref={target} data-spin={spin ? 'on' : 'off'} data-state={on ? 'on' : 'off'}>
            {/* The ring is first in the document and under the globe: the inner circle belongs to the button. */}
            {player.enabled ? (
                <div
                    className="badge__ring"
                    ref={ringRef}
                    role="slider"
                    tabIndex={0}
                    aria-label={`${music.title} - ${music.artist}`}
                    aria-valuemin={0}
                    aria-valuemax={0}
                    aria-valuenow={0}
                    data-held={held ? 'true' : undefined}
                    onKeyDown={onRingKey}
                    {...ringHand}
                >
                    {pictures.ring}
                </div>
            ) : (
                <div className="badge__ring" ref={ringRef} aria-hidden="true" data-held={held ? 'true' : undefined} {...ringHand}>
                    {pictures.ring}
                </div>
            )}
            {globeIsButton ? (
                <button
                    type="button"
                    className="badge__globe"
                    data-spin={spin ? 'on' : 'off'}
                    aria-label={globeName}
                    onClick={() => (player.enabled ? player.toggle() : setStopped((value) => !value))}
                    onPointerDown={press(true)}
                    onPointerUp={press(false)}
                    onPointerLeave={press(false)}
                    onPointerCancel={press(false)}
                >
                    {pictures.globe}
                </button>
            ) : (
                <div className="badge__globe" aria-hidden="true">{pictures.globe}</div>
            )}
        </div>
    );
});

export default Badge;
