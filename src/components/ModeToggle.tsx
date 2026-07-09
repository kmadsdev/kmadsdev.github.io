import { useMode } from '@/context/ModeContext';
import type { Mode } from '@/types';

const OPTIONS: { mode: Mode; label: string }[] = [
  { mode: 'recruiter', label: 'Recruiter' },
  { mode: 'builder', label: 'Builder' },
];

export default function ModeToggle() {
  const { mode, setMode } = useMode();
  return (
    <div className="mode-toggle" role="group" aria-label="View mode">
      {OPTIONS.map((opt) => (
        <button
          key={opt.mode}
          type="button"
          className={mode === opt.mode ? 'mode-toggle__pill is-active' : 'mode-toggle__pill'}
          aria-pressed={mode === opt.mode}
          onClick={() => setMode(opt.mode)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
