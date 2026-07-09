import type { SceneProps } from '@/types';
import { useLang } from '@/context/LanguageContext';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import PaletteStrip from '@/components/visuals/PaletteStrip';
import StudioDisplay from '@/components/mockups/StudioDisplay';

/* Monitor now shows the BrowserNotes logo (screenshot was illegible at this
   scale). The bare monitor treatment is archived in
   .backlog/ref-portifolio-080726/references/StudioDisplay-monitor.tsx */
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
              className="notes-logo"
              src="/mockups/BrowserNotes.svg"
              alt="Browser Notes logo"
              loading="lazy"
            />
          </StudioDisplay>
          <PaletteStrip />
        </div>
      }
    />
  );
}
