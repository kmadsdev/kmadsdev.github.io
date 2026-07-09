/* Agentic Template guard pipeline — hand-built SVG in the PROJECT'S OWN
   palette (#070908/#26764e/#33b474/#ff6b6b = agentic landing colors; content,
   not design tokens — same sanctioned exception as the Notes palette). */

const box = { fill: '#0b0f0d', stroke: '#26764e', strokeWidth: 1, rx: 8 };
const title = { fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#e8f5ee', letterSpacing: 1 } as const;
const sub = { fontFamily: 'var(--font-mono)', fontSize: 8, fill: '#a1aaa5', letterSpacing: 1 } as const;
const ok = { fontFamily: 'var(--font-mono)', fontSize: 8.5, fill: '#33b474', letterSpacing: 1 } as const;
const bad = { fontFamily: 'var(--font-mono)', fontSize: 8.5, fill: '#ff6b6b', letterSpacing: 1 } as const;

export default function AgenticPipeline() {
  return (
    <svg
      viewBox="0 0 460 210"
      style={{ width: '100%', height: 'auto' }}
      role="img"
      aria-label="Agentic guard pipeline: commit runs typecheck and test gates, deploys, smoke-tests, and auto-reverts with an auto-filed incident issue on failure"
    >
      <defs>
        <marker id="ag-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="#33b474" />
        </marker>
        <marker id="ag-arrow-bad" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="#ff6b6b" />
        </marker>
      </defs>

      <rect x="8" y="44" width="80" height="48" {...box} />
      <text x="48" y="64" textAnchor="middle" style={title}>COMMIT</text>
      <text x="48" y="80" textAnchor="middle" style={sub}>SECRET SCAN</text>

      <line x1="88" y1="68" x2="112" y2="68" stroke="#33b474" strokeWidth="1.5" markerEnd="url(#ag-arrow)" />

      <rect x="116" y="44" width="96" height="48" {...box} />
      <text x="164" y="64" textAnchor="middle" style={title}>GATES</text>
      <text x="164" y="80" textAnchor="middle" style={sub}>TYPECHECK · TESTS</text>

      <line x1="212" y1="68" x2="236" y2="68" stroke="#33b474" strokeWidth="1.5" markerEnd="url(#ag-arrow)" />

      <rect x="240" y="44" width="84" height="48" {...box} />
      <text x="282" y="64" textAnchor="middle" style={title}>DEPLOY</text>
      <text x="282" y="80" textAnchor="middle" style={sub}>GH-PAGES</text>

      <line x1="324" y1="68" x2="348" y2="68" stroke="#33b474" strokeWidth="1.5" markerEnd="url(#ag-arrow)" />

      <rect x="352" y="44" width="100" height="48" {...box} />
      <text x="402" y="64" textAnchor="middle" style={title}>SMOKE TEST</text>
      <text x="402" y="80" textAnchor="middle" style={ok}>✓ LIVE</text>

      {/* failure branch: auto-revert + incident */}
      <path d="M402 92 V138 H226" fill="none" stroke="#ff6b6b" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#ag-arrow-bad)" />
      <rect x="62" y="116" width="160" height="44" rx="8" fill="#0b0f0d" stroke="#ff6b6b" strokeWidth="1" />
      <text x="142" y="134" textAnchor="middle" style={bad}>AUTO-REVERT</text>
      <text x="142" y="150" textAnchor="middle" style={sub}>+ INCIDENT ISSUE FILED</text>

      <text x="230" y="196" textAnchor="middle" style={sub}>THE PIPELINE IS THE PRODUCT · WORKS WITH ANY MARKDOWN AGENT</text>
    </svg>
  );
}
