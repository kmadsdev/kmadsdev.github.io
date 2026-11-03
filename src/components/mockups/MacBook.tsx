import type { ReactNode } from 'react';

export default function MacBook({ children }: { children?: ReactNode }) {
  return (
    <div className="mockup-macbook">
      <div className="mockup-macbook__lid">
        <div className="mockup__screen">{children}</div>
      </div>
      <div className="mockup-macbook__base" />
    </div>
  );
}
