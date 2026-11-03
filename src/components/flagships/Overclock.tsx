import type { SceneProps } from '@/types';
import { useLang } from '@/context/LanguageContext';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import OverclockIndex from '@/components/visuals/OverclockIndex';

/* Private-repo case study holding real personal data: structure diagram,
   never a screenshot with scores. */
export default function Overclock({ buildIndex }: SceneProps) {
  const { lang } = useLang();
  return (
    <FlagshipSection
      content={FLAGSHIPS[lang].overclock}
      buildIndex={buildIndex}
      variant="flagship--overclock"
      visual={
        <div className="flagship-visual flagship-visual--diagram">
          <OverclockIndex />
        </div>
      }
    />
  );
}
