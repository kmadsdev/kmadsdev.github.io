/* Overclock Index — hand-built SVG, DS tokens only. Structure, not data:
   the repo's rule "never fabricate a measurement, not even for a screenshot"
   means no score values here. Counts: 02-ONTOLOGY.md (2 meta + 9 physical +
   3 mental + 4 finances + 4 career = 22). */

const box = { fill: 'var(--c-surface)', stroke: 'var(--c-line)', strokeWidth: 1, rx: 8 };
const title = { fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--c-text)', letterSpacing: 1 } as const;
const sub = { fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--c-text-muted)', letterSpacing: 1 } as const;
const energy = { fontFamily: 'var(--font-mono)', fontSize: 11, fill: 'var(--c-energy)', letterSpacing: 1 } as const;

const PILLARS = [
  { x: 8, name: 'MENTAL', count: 3 },
  { x: 118, name: 'PHYSICAL', count: 9 },
  { x: 228, name: 'FINANCES', count: 4 },
  { x: 338, name: 'CAREER', count: 4 },
];

export default function OverclockIndex() {
  return (
    <svg
      viewBox="0 0 440 280"
      style={{ width: '100%', height: 'auto' }}
      role="img"
      aria-label="Overclock Index: Mental, Physical, Finances and Career pillars, each scored 0 to 100 from its attributes, combine through a geometric mean into one index. Unmeasured attributes are excluded, never counted as zero"
    >
      <defs>
        <marker id="oc-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--c-accent)" />
        </marker>
      </defs>

      {PILLARS.map((p) => (
        <g key={p.name}>
          <rect x={p.x} y="8" width="94" height="84" {...box} />
          <text x={p.x + 47} y="30" textAnchor="middle" style={title}>{p.name}</text>
          <text x={p.x + 47} y="46" textAnchor="middle" style={sub}>{`${p.count} ATTRIBUTES`}</text>
          {/* 0–100 scale, deliberately empty: structure, not a score */}
          <line x1={p.x + 12} y1="66" x2={p.x + 82} y2="66" stroke="var(--c-line-strong)" strokeWidth="2" strokeLinecap="round" />
          <text x={p.x + 12} y="82" style={sub}>0</text>
          <text x={p.x + 82} y="82" textAnchor="end" style={sub}>100</text>
          <path d={`M${p.x + 47} 92 L220 134`} fill="none" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#oc-arrow)" />
        </g>
      ))}

      <rect x="130" y="138" width="180" height="40" {...box} stroke="var(--c-line-strong)" />
      <text x="220" y="156" textAnchor="middle" style={title}>GEOMETRIC MEAN</text>
      <text x="220" y="170" textAnchor="middle" style={sub}>OF MEASURED PILLARS</text>

      <line x1="220" y1="178" x2="220" y2="200" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#oc-arrow)" />

      <rect x="130" y="204" width="180" height="40" rx="20" fill="none" stroke="var(--c-energy)" strokeWidth="1.5" />
      <text x="220" y="228" textAnchor="middle" style={energy}>OVERCLOCK INDEX</text>

      <text x="220" y="272" textAnchor="middle" style={sub}>+2 CROSS-PILLAR · UNMEASURED = UNKNOWN, NEVER 0</text>
    </svg>
  );
}
