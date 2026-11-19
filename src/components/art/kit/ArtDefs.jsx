// What every illustration shares: the signal gradient, the halftone, the arrows.
// <Art> renders it once per SVG. Use the values of useArt().paint, not the ids.
import { INK } from './palette.js';

export default function ArtDefs({ uid, width, height }) {
    const id = (name) => `${uid}-${name}`;
    const box = { x: 0, y: 0, width, height };
    return (
        <defs>
            {/* Data in motion: violet at the left edge of the art, blue at the right edge. */}
            <linearGradient id={id('signal')} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2="0">
                <stop offset="0" stopColor={INK.violet} />
                <stop offset="1" stopColor={INK.blue} />
            </linearGradient>

            {/* Halftone: dots at a 6 unit pitch. As a fill (paint.dots) or as a mask (paint.halftone*). */}
            <pattern id={id('dots')} width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.15" fill="#fff" />
            </pattern>
            <linearGradient id={id('fade-up')} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
            </linearGradient>
            <radialGradient id={id('fade-radial')}>
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id={id('halftone')} maskUnits="userSpaceOnUse" {...box}>
                <rect {...box} fill={`url(#${id('dots')})`} />
            </mask>
            <mask id={id('halftone-up')} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
                <rect width="1" height="1" fill={`url(#${id('fade-up')})`} />
            </mask>
            <mask id={id('halftone-radial')} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
                <rect width="1" height="1" fill={`url(#${id('fade-radial')})`} />
            </mask>

            <marker id={id('arrow')} viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M1.5 1.5L6.5 4l-5 2.5" fill="none" stroke="rgb(255 255 255 / 0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <marker id={id('arrow-red')} viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M1.5 1.5L6.5 4l-5 2.5" fill="none" stroke={INK.red} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
        </defs>
    );
}
