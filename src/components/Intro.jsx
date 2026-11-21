// Section 2, id "intro": the introduction. It makes the claims. The proof is
// lower on the page, and each claim links to it.
//
//   section head            label, headline (h2), lead
//   Opening                 "👋 Hello,": text left, the portrait right
//   IntroChapter x 8        ids intro-<chapter id> (anchors.intro), in the order of t.intro.chapters
//
// The chapters alternate the side of their drawings, one after the other.
// A link to an anchor inside a closed disclosure opens the disclosure.
import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { goTo } from '../smooth.js';
import { Chapter } from './bento/index.js';
import IntroChapter from './intro/IntroChapter.jsx';
import Opening from './intro/Opening.jsx';

// Board numbers of the drawings: the intro range starts at 10 (DESIGN-KIT.md section 3).
const FIRST_NUMBER = 10;

export default function Intro() {
    const { intro } = useLanguage().t;

    const numbers = {};
    let next = FIRST_NUMBER;
    for (const chapter of intro.chapters) {
        for (const drawing of chapter.drawings) numbers[`${chapter.id}/${drawing.id}`] = String(next++);
    }

    useEffect(() => {
        const reveal = () => {
            const id = decodeURIComponent(window.location.hash.slice(1));
            const target = id ? document.getElementById(id) : null;
            const closed = target?.closest('#intro details:not([open])');
            if (!closed) return;
            closed.open = true;
            goTo(target);
        };
        reveal();
        window.addEventListener('hashchange', reveal);
        return () => window.removeEventListener('hashchange', reveal);
    }, []);

    return (
        <Chapter id="intro" className="intro" label={intro.label} title={intro.title} lead={intro.lead}>
            <Opening />
            {intro.chapters.map((chapter, i) => (
                <IntroChapter key={chapter.id} chapter={chapter} flip={i % 2 === 1} numbers={numbers} />
            ))}
        </Chapter>
    );
}
