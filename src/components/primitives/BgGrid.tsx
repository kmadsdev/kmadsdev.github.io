import type { ReactNode } from 'react';

/** DS .bg-grid — hairline background grid overlay (easol/vercel continuity). */
export default function BgGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `bg-grid ${className}` : 'bg-grid'}>{children}</div>;
}
