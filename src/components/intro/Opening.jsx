// The opening block of the introduction: "👋 Hello,".
// No label above the heading. Seven paragraphs, each starts with a bold part.
// Text on the left, the one photo of the owner on the right. On a wide screen the
// photo stays in view while the paragraphs scroll. Below 900px the photo stands
// between the heading and the first paragraph, at a smaller size.
import { person } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { RichParagraphs } from '../Rich.jsx';

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
        </div>
    );
}
