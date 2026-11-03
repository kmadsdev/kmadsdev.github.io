import type { ReactNode } from 'react';

type PillVariant = 'default' | 'stack' | 'chip' | 'status-shipped' | 'status-win' | 'status-progress' | 'status-closed';

export default function Pill({
  variant = 'default',
  children,
}: {
  variant?: PillVariant;
  children: ReactNode;
}) {
  const cls = variant === 'default' ? 'pill' : `pill pill--${variant}`;
  return <span className={cls}>{children}</span>;
}
