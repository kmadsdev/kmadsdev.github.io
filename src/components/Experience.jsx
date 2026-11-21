// Section 3, id "experience": the proof of practice.
// One entry per company or period, newest first. Under each, its case files
// (order.companyCases in contents.global.js). Every case starts closed. A link to a
// case anchor (#case-bodyshop) opens that case and scrolls to it.
import { useCallback, useState } from 'react';
import { anchors, order } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Chapter } from './bento/index.js';
import CompanyEntry from './experience/CompanyEntry.jsx';
import { useAnchorLanding } from './experience/useAnchorLanding.js';

export default function Experience() {
    const { experience, cases } = useLanguage().t;
    const [open, setOpen] = useState(() => new Set());

    const toggle = useCallback((id, value) => {
        setOpen((now) => {
            if (now.has(id) === value) return now;
            const next = new Set(now);
            if (value) next.add(id);
            else next.delete(id);
            return next;
        });
    }, []);

    useAnchorLanding(anchors.experience, (anchor) => {
        const item = cases.items.find((c) => c.anchor === anchor);
        if (item) toggle(item.id, true);
    });

    return (
        <Chapter id="experience" label={experience.label} title={experience.title} className="xp">
            {experience.items.map((item) => (
                <CompanyEntry
                    key={item.id}
                    item={item}
                    labels={experience.labels}
                    cases={cases}
                    caseIds={order.companyCases[item.id] ?? []}
                    isOpen={(id) => open.has(id)}
                    onToggle={toggle}
                />
            ))}
        </Chapter>
    );
}
