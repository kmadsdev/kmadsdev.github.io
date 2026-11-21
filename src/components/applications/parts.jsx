// Small parts that every application block shares: stack and links. No status mark.
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import ExternalLink from '../ExternalLink.jsx';
import Icon from '../Icon.jsx';

/** The stack as one short mono line (the dots between the names come from CSS). */
export function Stack({ items, labels }) {
    return (
        <ul className="app-stack" aria-label={labels.stack}>
            {items.map((name) => <li key={name}>{name}</li>)}
        </ul>
    );
}

/** The source code of an application: one link per repository (`repos`), or one link (`repo`). */
export function sourcesOf(data, labels) {
    if (data.repos?.length) return data.repos;
    return data.repo ? [{ label: labels.source, url: data.repo }] : [];
}

/**
 * The links of one application: the live address, then the source code.
 * A project with a private source (Ruph: sign-in only) simply has no "Open live" button.
 * `primary` makes the live link the one red button of the view.
 */
export function AppLinks({ data, labels, primary = false }) {
    const { t } = useLanguage();
    const sources = sourcesOf(data, labels);
    const live = data.privateSource ? null : data.live;
    if (!live && !sources.length) return null;
    return (
        <div className="app-links">
            {live ? (
                primary ? (
                    <a className="button button-primary app-links__live" href={live} target="_blank" rel="noopener noreferrer">
                        <span>{labels.live}</span>
                        <Icon name="arrow-up-right" size={14} />
                        <span className="visually-hidden"> ({t.controls.external})</span>
                    </a>
                ) : (
                    <ExternalLink href={live}>{labels.live}</ExternalLink>
                )
            ) : null}
            {data.repos?.length ? <span className="wh-label app-links__label">{labels.source}</span> : null}
            {sources.map((source) => (
                <ExternalLink key={source.url} href={source.url}>{source.label}</ExternalLink>
            ))}
        </div>
    );
}
