// Frame of every section: number, label, title, intro.

export default function Section({ id, index, label, title, intro, children, className = '' }) {
    return (
        <section id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-title`}>
            <header className="section-head">
                <p className="section-label">
                    <span className="section-index" aria-hidden="true">{index}</span>
                    {label}
                </p>
                <h2 id={`${id}-title`} className="section-title">{title}</h2>
                {intro ? <p className="section-intro">{intro}</p> : null}
            </header>
            {children}
        </section>
    );
}
