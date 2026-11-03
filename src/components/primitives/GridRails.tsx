/**
 * Vercel-style hairline column rails with crosshair "+" marks at
 * intersections. Purely decorative — sits behind content at --z-grid.
 */
export default function GridRails({ columns = 4 }: { columns?: number }) {
  return (
    <div className="grid-rails" aria-hidden="true">
      {Array.from({ length: columns + 1 }, (_, i) => (
        <span key={i} className="grid-rails__rail" style={{ left: `${(i / columns) * 100}%` }}>
          <span className="grid-rails__cross">+</span>
          <span className="grid-rails__cross grid-rails__cross--bottom">+</span>
        </span>
      ))}
    </div>
  );
}
