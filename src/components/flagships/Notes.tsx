import type { SceneProps } from '@/types';
import { useLang } from '@/context/LanguageContext';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import PaletteStrip from '@/components/visuals/PaletteStrip';
import StudioDisplay from '@/components/mockups/StudioDisplay';

/* Monitor shows a real headless capture of kmads.dev/notes (2026-11-03):
   a Markdown file with the split live preview — large preview type stays
   legible at this scale. Earlier logo treatment: git history. */
export default function Notes({ buildIndex }: SceneProps) {
  const { lang } = useLang();
  return (
    <FlagshipSection
      content={FLAGSHIPS[lang].notes}
      buildIndex={buildIndex}
      variant="flagship--notes"
      visual={
        <div className="flagship-visual flagship-visual--notes">
          <StudioDisplay>
            <img
              src="/mockups/notes-live.jpg"
              alt="Notes editing a Markdown file with the live preview open beside it"
              loading="lazy"
            />
          </StudioDisplay>
          <PaletteStrip />
        </div>
      }
    />
  );
}
