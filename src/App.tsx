import { useMemo } from 'react';
import type { ComponentType } from 'react';
import type { FlagshipId, SceneDef, SceneProps } from '@/types';
import { ModeProvider, useMode } from '@/context/ModeContext';
import { FLAGSHIPS, FLAGSHIP_ORDER } from '@/constants/flagships';
import Deck from '@/deck/Deck';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import ProjectsGallery from '@/components/ProjectsGallery';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import Agentic from '@/components/flagships/Agentic';
import OffMode from '@/components/flagships/OffMode';
import HiveMind from '@/components/flagships/HiveMind';
import Diabetes from '@/components/flagships/Diabetes';
import Notes from '@/components/flagships/Notes';
import Doom from '@/components/flagships/Doom';

const FLAGSHIP_COMPONENTS: Record<FlagshipId, ComponentType<SceneProps>> = {
  agentic: Agentic,
  offmode: OffMode,
  hivemind: HiveMind,
  diabetes: Diabetes,
  doom: Doom,
  notes: Notes,
};

/* deck bg floods (cash.app color swaps). Agentic's #070908 is the project's
   own published palette — content, not a design token (sanctioned exception,
   same rule as the Notes palette strip). */
const FLAGSHIP_META: Record<FlagshipId, { builds: number; bg: string }> = {
  agentic: { builds: 2, bg: '#070908' },
  offmode: { builds: 2, bg: 'var(--c-bg-2)' },
  hivemind: { builds: 2, bg: 'var(--c-bg)' },
  diabetes: { builds: 4, bg: 'var(--c-bg-2)' }, // fixed phone, screens swap per gesture
  doom: { builds: 2, bg: 'var(--c-frame)' },
  notes: { builds: 2, bg: 'var(--c-accent)' },
};

function Site() {
  const { mode } = useMode();

  const scenes = useMemo<SceneDef[]>(() => {
    const flagshipScenes: SceneDef[] = FLAGSHIP_ORDER[mode].map((id) => ({
      id: FLAGSHIPS[id].anchor,
      builds: FLAGSHIP_META[id].builds,
      bg: FLAGSHIP_META[id].bg,
      Component: FLAGSHIP_COMPONENTS[id],
    }));
    return [
      { id: 'hero', builds: 2, Component: Hero, bg: 'var(--c-bg)' },
      { id: 'ticker', builds: 4, Component: Ticker, bg: 'var(--c-bg)' }, // dwell: 4 gestures of travel
      { id: 'about', builds: 3, Component: About, bg: 'var(--c-bg-2)' },
      { id: 'timeline', builds: 8, Component: Timeline, bg: 'var(--c-bg)' }, // one chapter per gesture
      ...flagshipScenes,
      { id: 'projects-gallery', builds: 2, Component: ProjectsGallery, bg: 'var(--c-bg)' },
      { id: 'skills', builds: 2, Component: Skills, bg: 'var(--c-bg-2)' },
    ];
  }, [mode]);

  return (
    <Deck scenes={scenes} footer={<Footer />}>
      <Nav />
    </Deck>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <Site />
    </ModeProvider>
  );
}
