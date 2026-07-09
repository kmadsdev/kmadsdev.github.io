import type { SceneProps } from '@/types';
import { FLAGSHIPS } from '@/constants/flagships';
import FlagshipSection from '@/components/FlagshipSection';
import AgenticPipeline from '@/components/visuals/AgenticPipeline';
import BrowserChrome from '@/components/mockups/BrowserChrome';

/* THE flagship — rendered in the project's own dark-green identity
   (scene bg #070908 set in App.tsx; greens live in AgenticPipeline + CSS). */
export default function Agentic({ buildIndex }: SceneProps) {
  return (
    <FlagshipSection
      content={FLAGSHIPS.agentic}
      buildIndex={buildIndex}
      variant="flagship--agentic"
      visual={
        <div className="flagship-visual flagship-visual--agentic">
          <BrowserChrome url="kmads.dev/agentic">
            <img src="/mockups/agentic-hero.jpg" alt="Agentic Template landing — agent speed, production control" loading="lazy" />
          </BrowserChrome>
          <AgenticPipeline />
        </div>
      }
    />
  );
}
