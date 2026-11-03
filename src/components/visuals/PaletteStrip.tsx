/* Notes' literal design tokens as a palette strip.
   These hexes are CONTENT (the project's own published palette), not
   design values — the one sanctioned hard-coded-color exception.
   Source: kmadsdev/notes index.html --wh-color-* (dark theme), 2026-11-03:
   canvas, line, text, accent, green. */

const NOTES_TOKENS = ['#101010', '#242424', '#E1E1E1', '#FF014F', '#33B474'];

export default function PaletteStrip() {
  return (
    <figure className="palette-strip" role="img" aria-label="Notes design tokens from the Workaholic Design System: five color swatches">
      <div className="palette-strip__row">
        {NOTES_TOKENS.map((hex) => (
          <div key={hex} className="palette-strip__swatch">
            <i style={{ background: hex }} />
            <span>{hex}</span>
          </div>
        ))}
      </div>
      <figcaption className="eyebrow">NOTES — WORKAHOLIC DESIGN SYSTEM TOKENS</figcaption>
    </figure>
  );
}
