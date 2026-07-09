import type { SceneProps } from '@/types';
import { useLang } from '@/context/LanguageContext';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import IPhone from '@/components/mockups/IPhone';
import DiabetesScreens from '@/components/visuals/DiabetesScreens';

/* cash.app truth: the iPhone stays fixed dead-center of the visual column;
   each gesture (build) slides the recreated app content inside the frame. */
export default function Diabetes({ buildIndex }: SceneProps) {
  const { lang } = useLang();
  return (
    <FlagshipSection
      content={FLAGSHIPS[lang].diabetes}
      buildIndex={buildIndex}
      variant="flagship--diabetes"
      visual={
        <div className="flagship-visual flagship-visual--diabetes">
          <IPhone>
            <DiabetesScreens step={buildIndex} />
          </IPhone>
        </div>
      }
    />
  );
}
