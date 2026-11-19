// Small parts that every application block shares: status, stack, links.
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import ExternalLink from '../ExternalLink.jsx';
import Icon from '../Icon.jsx';

/** "Live" with the mint dot (live now), or the quiet study label. */
export function Status({ data, labels }) {
    if (data.status === 'live') {
        return (
            <span className="status app-status">
                <span className="status-dot" aria-hidden="true" />
                {labels.statusLive}
            </span>
        );
    }
    return <span className="wh-label app-status">{labels.statusStudy}</span>;
}

export function Stack({ items, labels, limit }) {
    const shown = limit ? items.slice(0, limit) : items;
    return (
        <ul className="wh-tags app-stack" aria-label={labels.stack}>
            {shown.map((name) => <li key={name}>{name}</li>)}
        </ul>
    );
}

/**
 * The links of one application: the live address, then the source code
 * (one link, or one per repository), or the note that the source is private.
 * `primary` makes the live link the one red button of the view.
 */
export function AppLinks({ data, labels, primary = false }) {
    const { t } = useLanguage();
    const sources = data.sources ?? (data.source ? [{ label: labels.source, url: data.source }] : []);
    return (
        <div className="app-links">
            {data.live ? (
                primary ? (
                    <a className="button button-primary app-links__live" href={data.live} target="_blank" rel="noopener noreferrer">
                        <span>{labels.live}</span>
                        <Icon name="arrow-up-right" size={14} />
                        <span className="visually-hidden"> ({t.controls.external})</span>
                    </a>
                ) : (
                    <ExternalLink href={data.live}>{labels.live}</ExternalLink>
                )
            ) : null}
            {data.sources ? <span className="wh-label app-links__label">{labels.source}</span> : null}
            {sources.map((source) => (
                <ExternalLink key={source.url} href={source.url}>{source.label}</ExternalLink>
            ))}
            {data.access === 'private' && !sources.length ? <span className="wh-label app-links__private">{labels.privateSource}</span> : null}
        </div>
    );
}
