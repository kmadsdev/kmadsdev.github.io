import type { ReactNode } from 'react';

export default function StudioDisplay({ children }: { children?: ReactNode }) {
  return (
    <div className="mockup-studio-display">
      <div className="mockup-studio-display__screen">
        <div className="mockup__screen">{children}</div>
      </div>
      <div className="mockup-studio-display__stand" />
      <div className="mockup-studio-display__foot" />
    </div>
  );
}
