import { useLanguage } from '../i18n/LanguageProvider.jsx';

/** A link to another site. Opens in a new tab and says so to screen readers. */
export default function ExternalLink({ href, children, className, arrow = true }) {
    const { t } = useLanguage();
    return (
        <a className={className} href={href} target="_blank" rel="noopener noreferrer">
            {children}
            {arrow ? <span className="ext-arrow" aria-hidden="true">↗</span> : null}
            <span className="visually-hidden"> ({t.controls.external})</span>
        </a>
    );
}
