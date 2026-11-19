// Frame of every section. The mono label sits in the left column and stays
// in view while the section scrolls; the heading stands alone.

export default function Section({ id, index, label, title, intro, children, className = '' }) {
    return (
        <section id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-title`}>
            <p className="section-label wh-label">
                <span className="section-index" aria-hidden="true">{index}</span>
                {label}
            </p>
            <div className="section-main">
                <header className="section-head">
                    <h2 id={`${id}-title`} className="wh-headline wh-headline--section">{title}</h2>
                    {intro ? <p className="section-intro">{intro}</p> : null}
                </header>
                {children}
            </div>
        </section>
    );
}
