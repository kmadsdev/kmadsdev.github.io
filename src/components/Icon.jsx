// One icon set: 16px grid, 1.5px stroke, square caps. Decorative by default.
const PATHS = {
    'arrow-up-right': <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />,
    'arrow-down': <path d="M8 2.5v11M3.5 9l4.5 4.5L12.5 9" />,
    'arrow-up': <path d="M8 13.5v-11M3.5 7L8 2.5 12.5 7" />,
    prev: <path d="M10 3.5L5.5 8l4.5 4.5" />,
    next: <path d="M6 3.5L10.5 8 6 12.5" />,
    play: <path d="M5 3.5v9l7.5-4.5z" />,
    pause: <path d="M5.5 3.5v9M10.5 3.5v9" />,
    copy: <path d="M6 6V3.5h6.5V10H10M3.5 6H10v6.5H3.5z" />,
    check: <path d="M3 8.5l3.2 3.2L13 4.8" />,
    mail: <path d="M2.5 4h11v8h-11zM2.5 4.5L8 9l5.5-4.5" />,
};

export default function Icon({ name, size = 16 }) {
    return (
        <svg className="icon" viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" focusable="false">
            {PATHS[name]}
        </svg>
    );
}
