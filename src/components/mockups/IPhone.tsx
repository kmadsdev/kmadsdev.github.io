import type { ReactNode } from 'react';

export default function IPhone({ children }: { children?: ReactNode }) {
  return (
    <div className="mockup-iphone">
      <div className="mockup__screen">{children}</div>
    </div>
  );
}
