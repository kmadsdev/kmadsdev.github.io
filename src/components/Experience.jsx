// Section 3, id "experience": the proof of practice.
// One entry per company or period, newest first. Under each, its case files.
// A link to a case anchor (#case-bodyshop) opens that case and scrolls to it.
import { useCallback, useState } from 'react';
import { facts } from '../content/index.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Chapter } from './bento/index.js';
import CompanyEntry from './experience/CompanyEntry.jsx';
import { useAnchorLanding } from './experience/useAnchorLanding.js';

// Board numbers of the flowcharts (range 40 to 59), in reading order.
const NUMBERS = Object.fromEntries(
    facts.caseFileOrder.filter((id) => facts.cases[id].flow && id !== 'ruph').map((id, i) => [id, 40 + i]),
);

// Open at first: the first case with a flowchart of the newest company.
const FIRST_OPEN = facts.caseFileOrder.find((id) => facts.cases[id].flow);

export default function Experience() {
    const { experience, cases } = useLanguage().t;
    const [open, setOpen] = useState(() => new Set([FIRST_OPEN]));

    const toggle = useCallback((id, value) => {
        setOpen((now) => {
            if (now.has(id) === value) return now;
            const next = new Set(now);
            if (value) next.add(id);
            else next.delete(id);
            return next;
        });
    }, []);

    const caseOf = (anchor) => cases.items.find((c) => c.anchor === anchor);
    useAnchorLanding(facts.anchors.experience, (anchor) => {
        const item = caseOf(anchor);
        if (item) toggle(item.id, true);
    });

    return (
        <Chapter id="experience" label={experience.label} title={experience.title} lead={experience.lead} className="xp">
            {experience.items.map((item) => (
                <CompanyEntry
                    key={item.id}
                    item={item}
                    labels={experience.labels}
                    cases={cases}
                    isOpen={(id) => open.has(id)}
                    onToggle={toggle}
                    numbers={NUMBERS}
                />
            ))}
        </Chapter>
    );
}
