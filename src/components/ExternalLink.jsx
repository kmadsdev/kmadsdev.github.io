import { useLanguage } from '../i18n/LanguageProvider.jsx';
import Icon from './Icon.jsx';

/** A link to another site. Opens in a new tab and says so to screen readers. */
export default function ExternalLink({ href, children, className = 'link' }) {
    const { t } = useLanguage();
    return (
        <a className={className} href={href} target="_blank" rel="noopener noreferrer">
            <span>{children}</span>
            <Icon name="arrow-up-right" size={14} />
            <span className="visually-hidden"> ({t.controls.external})</span>
        </a>
    );
}
