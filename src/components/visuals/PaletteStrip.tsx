/* Notes' literal documented design tokens as a palette strip.
   These hexes are CONTENT (the project's own published palette), not
   design values — the one sanctioned hard-coded-color exception. */

const NOTES_TOKENS = ['#101010', '#242424', '#2DAAE4', '#FF014F', '#C16D51'];

export default function PaletteStrip() {
  return (
    <figure className="palette-strip" role="img" aria-label="Notes documented design tokens: five color swatches">
      <div className="palette-strip__row">
        {NOTES_TOKENS.map((hex) => (
          <div key={hex} className="palette-strip__swatch">
            <i style={{ background: hex }} />
            <span>{hex}</span>
          </div>
        ))}
      </div>
      <figcaption className="eyebrow">NOTES — DOCUMENTED DESIGN TOKENS</figcaption>
    </figure>
  );
}
