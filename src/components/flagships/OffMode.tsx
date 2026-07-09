import type { SceneProps } from '@/types';
import { useLang } from '@/context/LanguageContext';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import ThreeTierDiagram from '@/components/visuals/ThreeTierDiagram';
import IPhone from '@/components/mockups/IPhone';
import MacBook from '@/components/mockups/MacBook';

export default function OffMode({ buildIndex, active }: SceneProps) {
  const { lang } = useLang();
  return (
    <FlagshipSection
      content={FLAGSHIPS[lang].offmode}
      buildIndex={buildIndex}
      variant="flagship--offmode"
      visual={
        <div className="flagship-visual flagship-visual--offmode">
          <ThreeTierDiagram />
          <div className="flagship-visual__devices">
            <IPhone>
              <img src="/mockups/offmode-iphone.jpg" alt="OffMode focus timer on iPhone" loading="lazy" />
            </IPhone>
            <MacBook>
              <img src="/mockups/offmode-macbook.jpg" alt="OffMode desktop view on MacBook" loading="lazy" />
            </MacBook>
          </div>
        </div>
      }
    />
  );
}
