/* Ruph control plane — hand-built SVG, DS tokens only. Shape comes from
   RUPH-PLATFORM-DOCS §4 (ways in) and §5 (plan → human approve → apply →
   ledger). No product screenshot: the dashboard is login-gated. */

const box = { fill: 'var(--c-surface)', stroke: 'var(--c-line)', strokeWidth: 1, rx: 8 };
const title = { fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--c-text)', letterSpacing: 1 } as const;
const sub = { fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--c-text-muted)', letterSpacing: 1 } as const;
const energy = { fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--c-energy)', letterSpacing: 1 } as const;
const arrow = { stroke: 'var(--c-accent)', strokeWidth: 1.5, markerEnd: 'url(#ru-arrow)' };

const CLIENTS = [
  { x: 8, label: 'WEB' },
  { x: 118, label: 'REST' },
  { x: 228, label: 'CLI' },
  { x: 338, label: 'MCP' },
];

export default function RuphControlPlane() {
  return (
    <svg
      viewBox="0 0 440 300"
      style={{ width: '100%', height: 'auto' }}
      role="img"
      aria-label="Ruph control plane: web, REST, CLI and MCP clients call one /v1 API. A plan is drafted, only a human approves it, then apply changes the cloud providers and writes an append-only ledger entry"
    >
      <defs>
        <marker id="ru-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--c-accent)" />
        </marker>
      </defs>

      {CLIENTS.map((c) => (
        <g key={c.label}>
          <rect x={c.x} y="8" width="94" height="30" {...box} />
          <text x={c.x + 47} y="27" textAnchor="middle" style={title}>{c.label}</text>
          <line x1={c.x + 47} y1="38" x2={c.x + 47} y2="60" {...arrow} />
        </g>
      ))}

      <rect x="8" y="64" width="424" height="40" {...box} stroke="var(--c-line-strong)" />
      <text x="220" y="82" textAnchor="middle" style={title}>/V1 API · KERNEL</text>
      <text x="220" y="96" textAnchor="middle" style={sub}>APPS · ENVIRONMENTS · BUDGETS · LIFECYCLE</text>

      <line x1="62" y1="104" x2="62" y2="128" {...arrow} />
      <rect x="8" y="132" width="108" height="46" {...box} />
      <text x="62" y="152" textAnchor="middle" style={title}>PLAN</text>
      <text x="62" y="167" textAnchor="middle" style={sub}>AGENT OR HUMAN</text>

      <line x1="116" y1="155" x2="160" y2="155" {...arrow} />
      <rect x="164" y="132" width="112" height="46" rx="8" fill="none" stroke="var(--c-energy)" strokeWidth="1.5" />
      <text x="220" y="152" textAnchor="middle" style={energy}>APPROVE</text>
      <text x="220" y="167" textAnchor="middle" style={sub}>HUMAN ONLY</text>

      <line x1="276" y1="155" x2="320" y2="155" {...arrow} />
      <rect x="324" y="132" width="108" height="46" {...box} />
      <text x="378" y="152" textAnchor="middle" style={title}>APPLY</text>
      <text x="378" y="167" textAnchor="middle" style={sub}>REAL RESOURCES</text>

      {/* apply fans out to the providers and the ledger */}
      <path d="M378 178 V196 H150 V214" fill="none" {...arrow} />
      <line x1="378" y1="178" x2="378" y2="214" {...arrow} />

      <rect x="8" y="218" width="284" height="52" {...box} />
      <text x="150" y="238" textAnchor="middle" style={title}>PROVIDERS</text>
      <text x="150" y="254" textAnchor="middle" style={sub}>GCP · AZURE · CLOUDFLARE · VERCEL</text>
      <text x="150" y="265" textAnchor="middle" style={sub}>SUPABASE · NEON · …</text>

      <rect x="324" y="218" width="108" height="52" {...box} />
      <text x="378" y="240" textAnchor="middle" style={title}>LEDGER</text>
      <text x="378" y="256" textAnchor="middle" style={sub}>APPEND-ONLY</text>

      <text x="220" y="292" textAnchor="middle" style={sub}>NOTHING CHANGES WITHOUT AN APPROVED PLAN</text>
    </svg>
  );
}
