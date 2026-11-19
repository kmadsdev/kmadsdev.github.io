// The sign of every disclosure control on the page: a plus that becomes a minus
// when its <details> is open. Use it inside <summary className="toggle">, after
// the label. The look is in bento.css (.toggle). One look for "Read the full
// story" and "Show the details", in every section.
export default function ToggleSign() {
    return (
        <span className="toggle__sign" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" focusable="false">
                <path d="M3 8h10" />
                <path className="toggle__bar" d="M8 3v10" />
            </svg>
        </span>
    );
}
