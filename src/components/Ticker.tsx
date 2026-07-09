import { useRef } from 'react';
import type { SceneProps } from '@/types';
import { useMode } from '@/context/ModeContext';
import { useTickerDrive } from '@/hooks/useTickerDrive';
import { ROW1_RECRUITER, ROW1_BUILDER, ROW2_STACK } from '@/constants/ticker';
import type { TickerEntry } from '@/constants/ticker';

/* Wrap digit-bearing tokens in .ticker__num (energy numerals — easol rule) */
function Phrase({ text, muted }: { text: string; muted?: boolean }) {
  const tokens = text.split(/(\s+)/);
  return (
    <span className={muted ? 'ticker__phrase ticker__phrase--muted' : 'ticker__phrase'}>
      {tokens.map((token, i) =>
        /\d/.test(token) ? (
          <span key={i} className="ticker__num">
            {token}
          </span>
        ) : (
          <span key={i}>{token}</span>
        ),
      )}
    </span>
  );
}

/* mini hand-built diagrams — every image has a reason (DS token styling only) */
function Mini({ kind, alt }: { kind: NonNullable<TickerEntry['mini']>; alt?: string }) {
  const stroke = 'var(--c-line-strong)';
  const accent = 'var(--c-accent)';
  const energy = 'var(--c-energy)';
  const mono = 'var(--font-mono)';
  const label = { fontFamily: mono, fontSize: 7, fill: 'var(--c-text-muted)' } as const;
  return (
    <svg viewBox="0 0 160 90" role="img" aria-label={alt}>
      {kind === 'hivemind' && (
        <>
          <rect x="8" y="32" width="40" height="26" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="28" y="47" textAnchor="middle" style={label}>SURVEY</text>
          <line x1="48" y1="45" x2="68" y2="45" stroke={accent} strokeWidth="1.5" />
          <rect x="68" y="32" width="40" height="26" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="88" y="47" textAnchor="middle" style={label}>MODEL</text>
          <line x1="108" y1="45" x2="126" y2="45" stroke={accent} strokeWidth="1.5" />
          <rect x="126" y="32" width="28" height="26" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="140" y="44" textAnchor="middle" style={{ ...label, fill: energy }}>97.9</text>
          <text x="140" y="53" textAnchor="middle" style={{ ...label, fill: energy }}>%</text>
        </>
      )}
      {kind === 'doom' && (
        <>
          <rect x="8" y="32" width="42" height="26" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="29" y="47" textAnchor="middle" style={label}>WASM 7MB</text>
          <line x1="50" y1="45" x2="72" y2="45" stroke={accent} strokeWidth="1.5" />
          <rect x="72" y="32" width="42" height="26" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="93" y="44" textAnchor="middle" style={label}>GZIP</text>
          <text x="93" y="53" textAnchor="middle" style={{ ...label, fill: energy }}>4.4MB</text>
          <line x1="114" y1="45" x2="130" y2="45" stroke={accent} strokeWidth="1.5" />
          <rect x="130" y="32" width="24" height="26" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="142" y="47" textAnchor="middle" style={label}>URL</text>
        </>
      )}
      {kind === 'threetier' && (
        <>
          <rect x="50" y="8" width="60" height="20" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="80" y="21" textAnchor="middle" style={label}>REACT</text>
          <line x1="80" y1="28" x2="80" y2="35" stroke={accent} strokeWidth="1.5" />
          <rect x="50" y="35" width="60" height="20" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="80" y="48" textAnchor="middle" style={label}>EXPRESS</text>
          <line x1="80" y1="55" x2="80" y2="62" stroke={accent} strokeWidth="1.5" />
          <rect x="50" y="62" width="60" height="20" rx="4" fill="var(--c-surface)" stroke={stroke} />
          <text x="80" y="75" textAnchor="middle" style={label}>FASTAPI · PG</text>
        </>
      )}
    </svg>
  );
}

function Entry({ entry }: { entry: TickerEntry }) {
  if (entry.kind === 'phrase') return <Phrase text={entry.text ?? ''} muted={entry.muted} />;
  return (
    <figure className="ticker__media">
      {entry.mini ? <Mini kind={entry.mini} alt={entry.alt} /> : <img src={entry.src} alt={entry.alt ?? ''} loading="lazy" />}
    </figure>
  );
}

const SET_COPIES = 4; // ultrawide coverage (plan §2.5.4); wrap math uses one-set width

export default function Ticker(_props: SceneProps) {
  const { mode } = useMode();
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);
  useTickerDrive(row1, row2);

  const row1Entries = mode === 'builder' ? ROW1_BUILDER : ROW1_RECRUITER;

  const renderTrack = (entries: TickerEntry[], ref: React.RefObject<HTMLDivElement>) => (
    <div className="ticker__track motion-ticker" ref={ref}>
      {Array.from({ length: SET_COPIES }, (_, copy) => (
        <span key={copy} className="ticker__set" {...(copy > 0 ? { 'aria-hidden': true } : {})}>
          {entries.map((entry, i) => (
            <Entry key={i} entry={entry} />
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <div className="scene scene--ticker">
      <div className="ticker ticker--display" id="ticker-band">
        <div className="ticker__row">{renderTrack(row1Entries, row1)}</div>
        <div className="ticker__row ticker__row--reverse">{renderTrack(ROW2_STACK, row2)}</div>
      </div>
    </div>
  );
}
