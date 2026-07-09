import type { SceneProps } from '@/types';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import HiveMindPipeline from '@/components/visuals/HiveMindPipeline';
import HiveMindSurvey from '@/components/visuals/HiveMindSurvey';
import IPad from '@/components/mockups/IPad';

export default function HiveMind({ buildIndex, active }: SceneProps) {
  return (
    <FlagshipSection
      content={FLAGSHIPS.hivemind}
      buildIndex={buildIndex}
      variant="flagship--hivemind"
      visual={
        <div className="flagship-visual flagship-visual--hivemind">
          <IPad>
            <HiveMindSurvey />
          </IPad>
          <HiveMindPipeline />
        </div>
      }
    />
  );
}
