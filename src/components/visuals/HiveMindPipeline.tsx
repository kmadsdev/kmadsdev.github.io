/* HiveMind survey→model pipeline on AWS — hand-built SVG, DS tokens only. */

const box = { fill: 'var(--c-surface)', stroke: 'var(--c-line)', strokeWidth: 1, rx: 8 };
const title = { fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--c-text)', letterSpacing: 1 } as const;
const sub = { fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--c-text-muted)', letterSpacing: 1 } as const;
const energy = { fontFamily: 'var(--font-mono)', fontSize: 11, fill: 'var(--c-energy)', letterSpacing: 1 } as const;

export default function HiveMindPipeline() {
  return (
    <svg
      viewBox="0 0 440 250"
      style={{ width: '100%', height: 'auto' }}
      role="img"
      aria-label="HiveMind pipeline: 10-question survey posts to a FastAPI service on AWS EC2 that pulls the model from S3 and returns a sales-qualified lead at 97.9% accuracy"
    >
      <defs>
        <marker id="hm-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--c-accent)" />
        </marker>
      </defs>

      <rect x="8" y="52" width="88" height="52" {...box} />
      <text x="52" y="74" textAnchor="middle" style={title}>SURVEY</text>
      <text x="52" y="90" textAnchor="middle" style={sub}>10 QUESTIONS</text>

      <line x1="96" y1="78" x2="136" y2="78" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#hm-arrow)" />
      <text x="116" y="66" textAnchor="middle" style={sub}>/predict</text>

      <rect x="140" y="52" width="112" height="52" {...box} />
      <text x="196" y="74" textAnchor="middle" style={title}>FASTAPI</text>
      <text x="196" y="90" textAnchor="middle" style={sub}>AWS EC2</text>

      <line x1="252" y1="78" x2="292" y2="78" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#hm-arrow)" />

      <rect x="296" y="52" width="136" height="52" {...box} />
      <text x="364" y="74" textAnchor="middle" style={title}>SQL LEAD</text>
      <text x="364" y="92" textAnchor="middle" style={energy}>97.9% ACCURACY</text>

      {/* S3 model store below, dashed pull-on-boot */}
      <rect x="140" y="150" width="112" height="52" {...box} />
      <text x="196" y="172" textAnchor="middle" style={title}>AWS S3</text>
      <text x="196" y="188" textAnchor="middle" style={sub}>model.pkl</text>
      <line
        x1="196" y1="150" x2="196" y2="108"
        stroke="var(--c-line-strong)" strokeWidth="1" strokeDasharray="4 4"
        markerEnd="url(#hm-arrow)"
      />
      <text x="208" y="132" style={sub}>PULL ON BOOT</text>

      <rect x="284" y="160" width="148" height="30" rx="15" fill="none" stroke="var(--c-energy-lo)" strokeWidth="1" />
      <text x="358" y="179" textAnchor="middle" style={energy}>~99.999% COST ↓</text>

      <text x="220" y="236" textAnchor="middle" style={sub}>SCIKIT-LEARN · LOGISTIC REGRESSION / RANDOM FOREST</text>
    </svg>
  );
}
