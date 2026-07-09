import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Mode } from '@/types';

const STORAGE_KEY = 'kmads:mode';
const MODES: Mode[] = ['recruiter', 'builder'];

interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextValue>({
  mode: 'recruiter',
  setMode: () => {},
});

function readStoredMode(): Mode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && MODES.includes(stored as Mode)) return stored as Mode;
  } catch {
    /* storage unavailable (private mode) — fall through to default */
  }
  return 'recruiter';
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(readStoredMode);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* non-fatal */
    }
  }, [mode]);

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  return useContext(ModeContext);
}
