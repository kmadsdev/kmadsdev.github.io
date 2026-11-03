import type { ReactNode } from 'react';

export default function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={className ? `eyebrow ${className}` : 'eyebrow'}>{children}</p>;
}
