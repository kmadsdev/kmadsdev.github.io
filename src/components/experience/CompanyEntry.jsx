// One company or period. The first view is short on purpose: company, context,
// roles with their periods, the impact and the case rows can be read in a few
// seconds. The daily work, tools and stacks open in place ("Show the details"),
// and each case file opens in place too. All text stays in the DOM.
import { ChapterGroup, Tile, ToggleSign } from '../bento/index.js';
import { isAnchor } from '../../content/rich.js';
import ExternalLink from '../ExternalLink.jsx';
import CaseFile from './CaseFile.jsx';

function Tags({ label, items }) {
    return (
        <div className="xp-facts__group">
            <p className="wh-label">{label}</p>
            <ul className="wh-tags" aria-label={label}>
                {items.map((name) => <li key={name}>{name}</li>)}
            </ul>
        </div>
    );
}

function Roles({ item, labels }) {
    return (
        <Tile kind="list" as="div" className="xp-facts">
            <ol className="xp-roles">
                {item.roles.map((role, i) => (
                    <li className="xp-role" key={role.title}>
                        <p className="xp-role__period">
                            <span>{role.period}</span>
                            {item.current && i === 0 ? (
                                <span className="status xp-role__now"><span className="status-dot" aria-hidden="true" />{labels.current}</span>
                            ) : null}
                        </p>
                        <p className="xp-role__title">{role.title}</p>
                        <p className="xp-role__note">{role.note}</p>
                    </li>
                ))}
            </ol>
        </Tile>
    );
}

export default function CompanyEntry({ item, labels, controls, cases, isOpen, onToggle, numbers }) {
    return (
        <ChapterGroup id={item.anchor} title={item.company} lead={item.context}>
            <div className="split split--flip split--sticky xp-entry">
                <div className="split__media">
                    <Roles item={item} labels={labels} />
                </div>
                <div className="chapter-text xp-text">
                    <div className="xp-block">
                        <h4 className="wh-label">{labels.impact}</h4>
                        <ul className="xp-list xp-list--impact">
                            {item.impact.map((text) => <li key={text}>{text}</li>)}
                        </ul>
                    </div>
                    {item.links.length ? (
                        <p className="xp-links">
                            {item.links.map((link) => (isAnchor(link.to) ? (
                                <a key={link.to} className="link" href={link.to}>{link.label}</a>
                            ) : (
                                <ExternalLink key={link.to} href={link.to}>{link.label}</ExternalLink>
                            )))}
                        </p>
                    ) : null}
                    <details className="xp-more">
                        <summary className="toggle xp-more__summary">
                            <span className="xp-more__show">{controls.showDetails}</span>
                            <span className="xp-more__hide">{controls.hideDetails}</span>
                            <span className="visually-hidden"> {item.company}</span>
                            <ToggleSign />
                        </summary>
                        <div className="xp-more__body">
                            <div className="xp-block">
                                <h4 className="wh-label">{labels.responsibilities}</h4>
                                <ul className="xp-list">
                                    {item.responsibilities.map((text) => <li key={text}>{text}</li>)}
                                </ul>
                            </div>
                            {item.tools.length ? <Tags label={labels.tools} items={item.tools} /> : null}
                            {item.stacks.map((stack) => <Tags key={stack.label} label={stack.label} items={stack.items} />)}
                        </div>
                    </details>
                </div>
            </div>

            {item.projects.length ? (
                <div className="xp-cases">
                    <h4 className="wh-label xp-cases__label">{labels.projects}</h4>
                    <div className="xp-case-list">
                        {item.projects.map((id) => {
                            const entry = cases.items.find((c) => c.id === id);
                            return entry ? (
                                <CaseFile
                                    key={id}
                                    item={entry}
                                    labels={cases.labels}
                                    open={isOpen(id)}
                                    onToggle={onToggle}
                                    n={numbers[id]}
                                />
                            ) : null;
                        })}
                    </div>
                </div>
            ) : null}
        </ChapterGroup>
    );
}
