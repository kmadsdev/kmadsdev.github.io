// The bento grid: 4 columns on a phone, 8 from 768px, 12 from 1280px.
// Its children are <Tile>s. Each tile comes in once, when it is first on screen.
import { useRef } from 'react';
import { useReveal } from '../../hooks.js';

export default function Bento({ as: Tag = 'div', className = '', children, ...rest }) {
    const ref = useRef(null);
    useReveal(ref);
    return (
        <Tag ref={ref} className={`bento ${className}`.trim()} {...rest}>
            {children}
        </Tag>
    );
}

/** The same entrance for a box that is not a bento grid. Each direct child comes in. */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
    const ref = useRef(null);
    useReveal(ref);
    return (
        <Tag ref={ref} className={className || undefined} {...rest}>
            {children}
        </Tag>
    );
}
