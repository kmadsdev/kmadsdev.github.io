// The top of the introduction, in two columns from 900px (the owner's layout of 2026-11-21).
//   Left:  the head of the section (label, headline, lead), then "👋 Hello," and six paragraphs,
//          each with a bold start. No label above "Hello,".
//   Right: the one photo of the owner at the top, then the card "My latest work" at the bottom,
//          so the card ends where the text ends.
// Below 900px it is one column in this order: head, "Hello,", photo (smaller), paragraphs, card.
import { person } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { ChapterHead } from '../bento/Chapter.jsx';
import { RichParagraphs } from '../Rich.jsx';
import LatestWork from './LatestWork.jsx';

export default function Opening() {
    const { intro } = useLanguage().t;
    const { opening } = intro;
    const { photo } = person;
    return (
        <div className="intro-top">
            <div className="intro-top__main">
                <ChapterHead id="intro" label={intro.label} title={intro.title} lead={intro.lead} />
                <div className="intro-opening">
                    <h3 className="wh-headline wh-headline--item intro-opening__title">{opening.title}</h3>
                    <div className="chapter-text intro-opening__text">
                        <RichParagraphs items={opening.paragraphs} linkClassName="link link--inline intro-ref" />
                    </div>
                </div>
            </div>
            <div className="intro-top__side">
                <figure className="intro-opening__photo">
                    <img
                        src={photo.src}
                        srcSet={`${photo.small} 640w, ${photo.src} ${photo.width}w`}
                        sizes="(min-width: 900px) min(32vw, 26rem), 15rem"
                        width={photo.width}
                        height={photo.height}
                        loading="lazy"
                        decoding="async"
                        alt={opening.photo.alt}
                    />
                </figure>
                <div className="intro-opening__latest"><LatestWork /></div>
            </div>
        </div>
    );
}
