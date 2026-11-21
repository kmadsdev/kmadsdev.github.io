// One company or period, in the order of the owner's text:
//   company (h3) and its context line (rich)
//   text column: Impact, then (PicPay) Current and Previous responsibilities, then the links
//   side column: the experience timeline (period, title, note). It stays in view while the
//                text scrolls. "Current" is a word on the present role, with no dot.
//   then the case files of the company, each closed, each opens in place.
import { isAnchor } from '../../content/rich.js';
import { ChapterGroup } from '../bento/index.js';
import ExternalLink from '../ExternalLink.jsx';
import Rich from '../Rich.jsx';
import CaseFile from './CaseFile.jsx';

function List({ title, items, impact = false }) {
    if (!items?.length) return null;
    return (
        <div className="xp-block">
            <h4 className="wh-label xp-block__title">{title}</h4>
            <ul className={`xp-list${impact ? ' xp-list--impact' : ''}`}>
                {items.map((text) => <li key={text}>{text}</li>)}
            </ul>
        </div>
    );
}

function Timeline({ item, labels }) {
    return (
        <div className="xp-facts">
            <h4 className="wh-label xp-block__title">{labels.timeline}</h4>
            <ol className="xp-roles">
                {item.timeline.map((role) => (
                    <li className="xp-role" key={`${role.period}${role.title}`}>
                        <p className="xp-role__period">
                            <span>{role.period}</span>
                            {role.current ? <span className="xp-role__now">{labels.current}</span> : null}
                        </p>
                        <p className="xp-role__title">{role.title}</p>
                        <p className="xp-role__note">{role.note}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default function CompanyEntry({ item, labels, cases, caseIds, isOpen, onToggle }) {
    const entries = caseIds.map((id) => cases.items.find((c) => c.id === id)).filter(Boolean);
    return (
        <ChapterGroup id={item.anchor} title={item.company} lead={<Rich text={item.context} />}>
            <div className="split split--sticky xp-entry">
                <div className="chapter-text xp-text">
                    <List title={labels.impact} items={item.impact} impact />
                    <List title={labels.currentResponsibilities} items={item.currentResponsibilities} />
                    <List title={labels.previousResponsibilities} items={item.previousResponsibilities} />
                    {item.links.length ? (
                        <p className="xp-links">
                            {item.links.map((link) => (isAnchor(link.to) ? (
                                <a key={link.to} className="link" href={link.to}>{link.label}</a>
                            ) : (
                                <ExternalLink key={link.to} href={link.to}>{link.label}</ExternalLink>
                            )))}
                        </p>
                    ) : null}
                </div>
                <div className="split__media">
                    <Timeline item={item} labels={labels} />
                </div>
            </div>

            {entries.length ? (
                <div className="xp-cases">
                    <p className="wh-label xp-cases__label">{labels.projects}</p>
                    <div className="xp-case-list">
                        {entries.map((entry) => (
                            <CaseFile
                                key={entry.id}
                                item={entry}
                                labels={cases.labels}
                                open={isOpen(entry.id)}
                                onToggle={onToggle}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </ChapterGroup>
    );
}
