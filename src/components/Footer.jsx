import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import ExternalLink from './ExternalLink.jsx';

export default function Footer() {
    const { footer } = useLanguage().t;
    return (
        <footer className="site-footer">
            <p className="footer-line">
                © {new Date().getFullYear()} {facts.site.domain}. {footer.line}
            </p>
            <p className="footer-license">
                {footer.license} <ExternalLink href={facts.site.repo}>{footer.source}</ExternalLink>
            </p>
            <p className="footer-top"><a href="#top">{footer.top}</a></p>
        </footer>
    );
}
