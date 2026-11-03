/* DOOM compression pipeline — hand-built SVG, DS tokens only. */

const box = { fill: 'var(--c-surface)', stroke: 'var(--c-line)', strokeWidth: 1, rx: 8 };
const title = { fontFamily: 'var(--font-mono)', fontSize: 9.5, fill: 'var(--c-text)', letterSpacing: 0.5 } as const;
const sub = { fontFamily: 'var(--font-mono)', fontSize: 7.5, fill: 'var(--c-text-muted)', letterSpacing: 0.5 } as const;
const energy = { fontFamily: 'var(--font-mono)', fontSize: 9.5, fill: 'var(--c-energy)', letterSpacing: 0.5 } as const;

export default function DoomCompression() {
  return (
    <svg
      viewBox="0 0 460 240"
      style={{ width: '100%', height: 'auto' }}
      role="img"
      aria-label="DOOM compression pipeline: linuxdoom 1.10 C source compiled with Clang to wasm32, 7 megabytes of WASM gzipped to 4.4 megabytes — minus 51 percent — then base64 into a self-extracting HTML data URI. Branch: MicroDOOM raycaster at 44 kilobytes"
    >
      <defs>
        <marker id="dc-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--c-accent)" />
        </marker>
      </defs>

      <rect x="6" y="40" width="96" height="52" {...box} />
      <text x="54" y="62" textAnchor="middle" style={title}>linuxdoom-1.10</text>
      <text x="54" y="78" textAnchor="middle" style={sub}>C SOURCE</text>

      <line x1="102" y1="66" x2="126" y2="66" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#dc-arrow)" />
      <text x="114" y="56" textAnchor="middle" style={sub}>CLANG</text>

      <rect x="130" y="40" width="88" height="52" {...box} />
      <text x="174" y="62" textAnchor="middle" style={title}>WASM</text>
      <text x="174" y="78" textAnchor="middle" style={sub}>wasm32 · 7MB</text>

      <line x1="218" y1="66" x2="242" y2="66" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#dc-arrow)" />
      <text x="230" y="56" textAnchor="middle" style={sub}>GZIP</text>

      <rect x="246" y="40" width="88" height="52" {...box} />
      <text x="290" y="62" textAnchor="middle" style={energy}>4.4MB · −51%</text>
      <text x="290" y="78" textAnchor="middle" style={sub}>COMPRESSED</text>

      <line x1="334" y1="66" x2="358" y2="66" stroke="var(--c-accent)" strokeWidth="1.5" markerEnd="url(#dc-arrow)" />
      <text x="346" y="56" textAnchor="middle" style={sub}>BASE64</text>

      <rect x="362" y="40" width="92" height="52" {...box} />
      <text x="408" y="58" textAnchor="middle" style={title}>data:URI</text>
      <text x="408" y="72" textAnchor="middle" style={sub}>SELF-EXTRACTING</text>
      <text x="408" y="83" textAnchor="middle" style={sub}>HTML</text>

      {/* MicroDOOM branch */}
      <path d="M54 92 V140 H120" fill="none" stroke="var(--c-line-strong)" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#dc-arrow)" />
      <rect x="124" y="116" width="212" height="48" {...box} />
      <text x="230" y="136" textAnchor="middle" style={energy}>MICRODOOM RAYCASTER · 44KB</text>
      <text x="230" y="152" textAnchor="middle" style={sub}>HAND-WRITTEN — SMALLER THAN A FAVICON</text>

      <text x="230" y="204" textAnchor="middle" style={sub}>HAND-ROLLED RFC 1951/1952 INFLATE · JAVASCRIPT</text>
      <text x="230" y="222" textAnchor="middle" style={{ ...sub, fill: 'var(--c-text-faint)' }}>ZERO HOSTING · ZERO FILES · ZERO COOKIES</text>
    </svg>
  );
}
