import type { ReactNode } from 'react';

export default function IPad({ children }: { children?: ReactNode }) {
  return (
    <div className="mockup-ipad">
      <div className="mockup__screen">{children}</div>
    </div>
  );
}
