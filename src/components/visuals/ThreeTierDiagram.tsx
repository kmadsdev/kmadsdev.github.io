/* OffMode 3-tier architecture — hand-built SVG, DS tokens only.
   Shared grammar: surface boxes, hairline strokes, mono labels,
   accent arrows, energy numerals. */

const box = { fill: 'var(--c-surface)', stroke: 'var(--c-line)', strokeWidth: 1, rx: 8 };
const title = { fontFamily: 'var(--font-mono)', fontSize: 11, fill: 'var(--c-text)', letterSpacing: 1 } as const;
const sub = { fontFamily: 'var(--font-mono)', fontSize: 8.5, fill: 'var(--c-text-muted)', letterSpacing: 1 } as const;
const arrowLabel = { fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--c-text-faint)', letterSpacing: 1 } as const;

export default function ThreeTierDiagram() {
  return (
    <svg
      viewBox="0 0 360 330"
      style={{ width: '100%', height: 'auto' }}
      role="img"
      aria-label="OffMode three-tier architecture: React and Vite frontend, Express gateway with JWT, FastAPI with PostgreSQL on Supabase, plus a 15-minute cloud backup loop"
    >
      <defs>
        <marker id="tt-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--c-accent)" />
        </marker>
      </defs>

      <rect x="60" y="16" width="240" height="56" {...box} />
      <text x="180" y="40" textAnchor="middle" style={title}>REACT + VITE</text>
      <text x="180" y="56" textAnchor="middle" style={sub}>FRONTEND</text>

      <line x1="180" y1="72" x2="180" y2="104" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#tt-arrow)" />
      <text x="192" y="92" style={arrowLabel}>HTTPS</text>

      <rect x="60" y="108" width="240" height="56" {...box} />
      <text x="180" y="132" textAnchor="middle" style={title}>EXPRESS GATEWAY</text>
      <text x="180" y="148" textAnchor="middle" style={sub}>JWT AUTH · GOOGLE OAUTH</text>

      <line x1="180" y1="164" x2="180" y2="196" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#tt-arrow)" />
      <text x="192" y="184" style={arrowLabel}>REST</text>

      <rect x="60" y="200" width="240" height="56" {...box} />
      <text x="180" y="224" textAnchor="middle" style={title}>FASTAPI + POSTGRESQL</text>
      <text x="180" y="240" textAnchor="middle" style={sub}>SUPABASE</text>

      {/* dashed side loop: cloud backup every 15 min */}
      <path
        d="M300 228 H332 V132 H300"
        fill="none"
        stroke="var(--c-line-strong)"
        strokeWidth="1"
        strokeDasharray="4 4"
        markerEnd="url(#tt-arrow)"
      />
      <text x="356" y="176" textAnchor="middle" style={{ ...sub, fill: 'var(--c-text-faint)' }} transform="rotate(90 344 176)">
        CLOUD BACKUP · 15 MIN
      </text>

      <text x="180" y="296" textAnchor="middle" style={sub}>3-TIER · VERCEL SERVERLESS</text>
      <text x="180" y="314" textAnchor="middle" style={{ ...arrowLabel }}>EVERY LAYER DEPLOYED · LIVE AT KMADS.DEV/OFFMODE</text>
    </svg>
  );
}
