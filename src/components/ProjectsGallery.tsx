import type { SceneProps, GalleryCard } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { GALLERY_SECONDARY, GALLERY_ARCHIVE } from '@/constants/gallery';
import Eyebrow from '@/components/primitives/Eyebrow';
import Pill from '@/components/primitives/Pill';
import GridRails from '@/components/primitives/GridRails';

function SecondaryCard({ card }: { card: GalleryCard }) {
  const body = (
    <>
      <h3 className="gallery-secondary__title">{card.title}</h3>
      <p className="gallery-secondary__blurb">{card.blurb}</p>
      <p className="gallery-secondary__callout">{card.callout}</p>
      {card.tags && (
        <div className="gallery-secondary__tags">
          {card.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      )}
    </>
  );
  return card.href ? (
    <a className="gallery-secondary" href={card.href} target="_blank" rel="noreferrer noopener">
      {body}
    </a>
  ) : (
    <div className="gallery-secondary">{body}</div>
  );
}

function ArchiveCard({ card }: { card: GalleryCard }) {
  const body = (
    <>
      <h3 className="gallery-archive__title">{card.title}</h3>
      <p className="gallery-archive__blurb">{card.blurb}</p>
      <p className="gallery-archive__callout">{card.callout}</p>
    </>
  );
  const cls = card.closed ? 'gallery-archive gallery-archive--closed' : 'gallery-archive';
  return card.href ? (
    <a className={cls} href={card.href} target="_blank" rel="noreferrer noopener">
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/* Builds: 0 = secondary (live/blue) · 1 = archive strip */
export default function ProjectsGallery({ buildIndex }: SceneProps) {
  const reveal = useScrollReveal<HTMLDivElement>({ targets: '.gallery-secondary, .gallery-archive', stagger: 60 });

  return (
    <div className="scene gallery-scene" ref={reveal} data-reveal>
      <GridRails columns={3} />
      <header className="scene__head" data-deck-layer="slow">
        <Eyebrow>EVERYTHING ELSE — STILL REAL</Eyebrow>
        <h2 className="t-h1">More shipped work.</h2>
      </header>
      <div className={`gallery-grid grid-hoverable build ${buildIndex >= 0 ? 'is-on' : ''}`} data-deck-layer="fast">
        {GALLERY_SECONDARY.map((card) => (
          <SecondaryCard key={card.title} card={card} />
        ))}
      </div>
      <div
        className={`gallery-grid gallery-grid--archive grid-hoverable build ${buildIndex >= 1 ? 'is-on' : ''}`}
        data-deck-layer="fast"
      >
        {GALLERY_ARCHIVE.map((card) => (
          <ArchiveCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}
