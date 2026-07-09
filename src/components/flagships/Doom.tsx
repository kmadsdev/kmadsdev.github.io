import type { SceneProps } from '@/types';
import { useLang } from '@/context/LanguageContext';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import DoomCompression from '@/components/visuals/DoomCompression';

/* Terminal window = doom.svg (user-provided target look, self-contained
   frame + embedded screen). Copy column is vertically centered with extra
   left padding (flagship--doom CSS). */
export default function Doom({ buildIndex }: SceneProps) {
  const { lang } = useLang();
  return (
    <FlagshipSection
      content={FLAGSHIPS[lang].doom}
      buildIndex={buildIndex}
      variant="flagship--doom"
      visual={
        <div className="flagship-visual flagship-visual--doom">
          <img
            className="doom-window"
            src="/mockups/doom.svg"
            alt="DOOM Offline running in a browser window"
            loading="lazy"
          />
          <DoomCompression />
        </div>
      }
    />
  );
}
