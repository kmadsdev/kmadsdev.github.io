// The opening block of the introduction: "👋 Hello,".
// No label above the heading. Six paragraphs, each starts with a bold part.
// Text on the left; on the right the one photo of the owner and, under it, the card
// "My latest work". Below 900px the order is: heading, photo (smaller), paragraphs, card.
import { person } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { RichParagraphs } from '../Rich.jsx';
import LatestWork from './LatestWork.jsx';

export default function Opening() {
    const { opening } = useLanguage().t.intro;
    const { photo } = person;
    return (
        <div className="intro-opening">
            <h3 className="wh-headline wh-headline--item intro-opening__title">{opening.title}</h3>
            <figure className="intro-opening__photo">
                <img
                    src={photo.src}
                    srcSet={`${photo.small} 640w, ${photo.src} ${photo.width}w`}
                    sizes="(min-width: 900px) min(30vw, 24rem), 15rem"
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    alt={opening.photo.alt}
                />
            </figure>
            <div className="chapter-text intro-opening__text">
                <RichParagraphs items={opening.paragraphs} linkClassName="link link--inline intro-ref" />
            </div>
            <div className="intro-opening__latest"><LatestWork /></div>
        </div>
    );
}
