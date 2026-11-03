import type { SceneProps } from '@/types';
import { useLang } from '@/context/LanguageContext';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import RuphControlPlane from '@/components/visuals/RuphControlPlane';

/* Private-repo case study: diagram only (the dashboard is login-gated). */
export default function Ruph({ buildIndex }: SceneProps) {
  const { lang } = useLang();
  return (
    <FlagshipSection
      content={FLAGSHIPS[lang].ruph}
      buildIndex={buildIndex}
      variant="flagship--ruph"
      visual={
        <div className="flagship-visual flagship-visual--diagram">
          <RuphControlPlane />
        </div>
      }
    />
  );
}
