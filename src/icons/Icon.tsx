import type { IconName } from '@/types';

/* Paths lifted verbatim from ds-preview.html §07 — 24×24, 1.5px stroke, currentColor. */
const PATHS: Record<IconName, JSX.Element> = {
  'arrow-up-right': (
    <>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </>
  ),
  terminal: (
    <>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="10" y="10" width="4" height="4" />
      <line x1="9" y1="2" x2="9" y2="5" />
      <line x1="15" y1="2" x2="15" y2="5" />
      <line x1="9" y1="19" x2="9" y2="22" />
      <line x1="15" y1="19" x2="15" y2="22" />
      <line x1="2" y1="9" x2="5" y2="9" />
      <line x1="2" y1="15" x2="5" y2="15" />
      <line x1="19" y1="9" x2="22" y2="9" />
      <line x1="19" y1="15" x2="22" y2="15" />
    </>
  ),
  'git-branch': (
    <>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  'shield-check': (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 19a10 10 0 1 1 15 0" />
      <line x1="12" y1="14" x2="16.5" y2="8.5" />
      <circle cx="12" cy="14" r="1" />
    </>
  ),
  box: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  /** Accessible label; omitted = decorative (aria-hidden) */
  title?: string;
  className?: string;
}

export default function Icon({ name, title, className }: IconProps) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...(title ? { role: 'img' } : { 'aria-hidden': true })}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
