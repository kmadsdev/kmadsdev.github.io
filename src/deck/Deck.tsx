import { useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import type { SceneDef, SceneProps } from '@/types';
import { DeckContext } from '@/deck/DeckContext';
import { useDeckEngine } from '@/deck/useDeckEngine';
import { buildStepMap, buildIndexForScene } from '@/deck/useSceneBuilds';
import { useLenis, LenisContext } from '@/hooks/useLenis';

interface DeckProps {
  scenes: SceneDef[];
  /** rendered after the deck; native (Lenis) scroll, never hijacked */
  footer?: ReactNode;
  /** fixed chrome (Nav) rendered inside the provider */
  children?: ReactNode;
}

export default function Deck({ scenes, footer, children }: DeckProps) {
  const engine = useDeckEngine(scenes);
  const map = useMemo(() => buildStepMap(scenes), [scenes]);

  const value = useMemo(() => ({ ...engine, scenes }), [engine, scenes]);

  return (
    <DeckContext.Provider value={value}>
      {children}
      {engine.renderMode === 'deck' ? (
        <DeckStage scenes={scenes} map={map} engine={engine} footer={footer} />
      ) : (
        <FlowStage scenes={scenes} footer={footer} />
      )}
    </DeckContext.Provider>
  );
}

/* ---------- deck mode: flat scenes, bg floods, layer choreography ---------- */

function DeckStage({
  scenes,
  map,
  engine,
  footer,
}: {
  scenes: SceneDef[];
  map: ReturnType<typeof buildStepMap>;
  engine: ReturnType<typeof useDeckEngine>;
  footer?: ReactNode;
}) {
  // scroll lock only while the hijack is engaged
  useEffect(() => {
    document.documentElement.classList.toggle('is-deck', !engine.released);
    return () => document.documentElement.classList.remove('is-deck');
  }, [engine.released]);

  const deckClass = [
    'deck',
    engine.reducedMotion ? 'deck--reduced' : '',
    engine.released ? 'deck--released' : '',
  ].join(' ');

  // cash.app bg flood: the CONTAINER carries the color and transitions it
  const bg = scenes[engine.sceneIndex]?.bg ?? 'var(--c-bg)';

  return (
    <>
      <div className={deckClass} style={{ background: bg }}>
        {scenes.map((scene, i) => (
          <DeckScene
            key={scene.id}
            scene={scene}
            position={i === engine.sceneIndex ? 'active' : i < engine.sceneIndex ? 'above' : 'below'}
            buildIndex={buildIndexForScene(map, scenes, i, engine.stepIndex)}
          />
        ))}
      </div>
      {/* footer exists only once the hijack releases — never over the deck */}
      {engine.released ? (
        <>
          <ReleasedScroll />
          {footer}
        </>
      ) : null}
    </>
  );
}

/** Lenis for the released (footer) region only. */
function ReleasedScroll() {
  useLenis();
  return null;
}

function DeckScene({
  scene,
  position,
  buildIndex,
}: {
  scene: SceneDef;
  position: 'active' | 'above' | 'below';
  buildIndex: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const active = position === 'active';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.toggleAttribute('inert', !active);
    if (active) el.focus({ preventScroll: true });
  }, [active]);

  const Component = scene.Component as React.ComponentType<SceneProps>;
  return (
    <section
      ref={ref}
      id={scene.id}
      className={`deck__scene is-${position}`}
      tabIndex={-1}
      aria-hidden={!active}
    >
      <Component buildIndex={buildIndex} active={active} />
    </section>
  );
}

/* ---------- flow mode: normal document, Lenis + scroll reveals ---------- */

function FlowStage({ scenes, footer }: { scenes: SceneDef[]; footer?: ReactNode }) {
  const lenis = useLenis();

  return (
    <LenisContext.Provider value={lenis}>
      <main className="flow">
        {scenes.map((scene) => {
          const Component = scene.Component;
          return (
            <section
              key={scene.id}
              id={scene.id}
              className="flow__section"
              style={scene.bg ? { background: scene.bg } : undefined}
            >
              <Component buildIndex={Math.max(0, scene.builds - 1)} active />
            </section>
          );
        })}
        {footer}
      </main>
    </LenisContext.Provider>
  );
}
