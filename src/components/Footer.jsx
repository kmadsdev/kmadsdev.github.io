import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';
import Icon from './Icon.jsx';

export default function Footer() {
    const { footer } = useLanguage().t;
    return (
        <footer className="site-footer">
            <p className="footer-mark" aria-hidden="true">KMADS</p>
            <div className="footer-row">
                <p>© {new Date().getFullYear()} {facts.site.domain}. {footer.line}</p>
                <p>{footer.license} <ExternalLink href={facts.site.repo}>{footer.source}</ExternalLink></p>
                <p><a className="link" href="#top"><span>{footer.top}</span><Icon name="arrow-up" size={14} /></a></p>
            </div>
        </footer>
    );
}
