// Section 2, id "intro": the introduction. It makes the claims. The proof is
// lower on the page, and each claim links to it.
//
//   section head            label, headline, lead
//   Opening                 "Who am I?": text left, the photo right
//   index                   "What I do": the eight claims as links to the chapters
//   IntroChapter x 8        ids intro-<chapter id> (facts.anchors.intro)
//
// The chapters with a drawing alternate the side of their rail, one after the other.
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Chapter } from './bento/index.js';
import Icon from './Icon.jsx';
import IntroChapter, { plan } from './intro/IntroChapter.jsx';
import Opening from './intro/Opening.jsx';

// Label numbers of the drawings: the intro range starts at 10 (DESIGN-KIT.md section 3).
const FIRST_NUMBER = 10;

export default function Intro() {
    const { intro } = useLanguage().t;

    const numbers = {};
    let next = FIRST_NUMBER;
    for (const chapter of intro.chapters) {
        for (const tile of chapter.tiles) if (tile.kind === 'art') numbers[`${chapter.id}/${tile.id}`] = String(next++);
    }
    let boards = 0;
    const chapters = intro.chapters.map((chapter) => ({ chapter, flip: plan(chapter).main ? boards++ % 2 === 1 : false }));

    return (
        <Chapter id="intro" className="intro" label={intro.label} title={intro.title} lead={intro.lead}>
            <Opening />

            <nav className="intro-index" aria-labelledby="intro-index-title">
                <h3 id="intro-index-title" className="wh-headline wh-headline--item">{intro.chaptersLabel}</h3>
                <ol>
                    {intro.chapters.map((chapter) => (
                        <li key={chapter.id}>
                            <a href={`#intro-${chapter.id}`}>
                                <span className="intro-index__label">{chapter.label}</span>
                                <span className="intro-index__claim">{chapter.headline}</span>
                                <Icon name="arrow-down" size={14} />
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>

            {chapters.map(({ chapter, flip }) => (
                <IntroChapter key={chapter.id} chapter={chapter} flip={flip} numbers={numbers} />
            ))}
        </Chapter>
    );
}
