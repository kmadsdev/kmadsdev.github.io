import type { ReactNode } from 'react';

export default function BrowserChrome({ url, children }: { url: string; children?: ReactNode }) {
  return (
    <div className="mockup-browser">
      <div className="mockup-browser__bar">
        <span className="mockup-browser__dot" />
        <span className="mockup-browser__dot" />
        <span className="mockup-browser__dot" />
        <span className="mockup-browser__url">{url}</span>
      </div>
      <div className="mockup-browser__body mockup__screen" style={{ height: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
