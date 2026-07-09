# kmads.dev Design System — README

Dark, editorial, engineering-grade canvas — precise grid, uppercase grotesk display, monospace
metadata — flooded selectively with accent color and kinetic stat energy where a section earns it.

**Files (all four agree by name):**

| File | Role |
|---|---|
| `ds-preview.html` | Specimen sheet — every token, style, icon, and component shown once. Self-contained, inline CSS, **no JS**. |
| `ds-spec.yaml` | Machine-readable source of truth: tokens + component registry. |
| `ds-components.css` | Implementation. The literal `<style id="ds-components">` block from the preview. |
| `ds-README.md` | This file. |

## Naming conventions

- **Tokens:** `--<domain>-<name>` — `--c-*` color, `--t-*` type, `--s-*` space, `--r-*` radius,
  `--dur-*`/`--ease-*` motion, `--z-*` stacking, `--bp-*` breakpoints (informational only).
- **Components:** BEM-ish — block `.timeline`, element `.timeline__step`, modifier
  `.projects-flagship--layout-right`, state `.is-active` / `.is-complete`.
- **Section/component names reuse the real site anchors verbatim:** `nav`, `ticker`, `timeline`,
  `projects-flagship`, `gallery-secondary`, `gallery-archive`, `skills`.
- Component rules contain **no hard-coded colors/space/radius** — every value is a `var(--…)`.
  (Structural 1–2px hairline widths are the only literal numbers, matching the token definitions.)

## Theming

`:root` is **dark** (primary, showcased theme). Light is an override that remaps neutrals only —
the three brand accents (`#2DAAE4` / `#FF014F` / `#C16D51`) never change:

- Explicit: `<html data-theme="light">` (or `data-theme="dark"` to pin dark).
- Automatic: `@media (prefers-color-scheme: light)` applies when no `data-theme` is set.

Body text clears WCAG AA (≥4.5:1) on `--c-bg`/`--c-surface` in both themes. Accent-on-dark is for
**large display text only** — never body copy.

## Typography rules

- `--font-display` is **Rubik — fixed, non-negotiable** for all display/UI text. Production loads
  Rubik (500/600/700/800); the specimen falls back to the system stack to stay self-contained.
- `--font-mono` (JetBrains Mono / SF Mono stack) is the "engineer signature": nav labels, eyebrows,
  status tags, ticker pills, stat numerals, captions.
- **UPPERCASE is reserved for `--t-eyebrow`-class structural labels.** Never uppercase body copy.
- Stat numerals always use `font-variant-numeric: tabular-nums` so counters don't jitter.

## Motion

Primitives (compose with duration/easing tokens; never invent new curves):

- `motion-rise` — translateY + fade entrance (`--dur-slow` / `--ease-out`)
- `motion-count` — stat reveal, blur + rise (`--dur-slow` / `--ease-spring`)
- `motion-collapse` — letter-spacing settle (`--dur-scene` / `--ease-in-out`)
- `motion-ticker` — linear infinite marquee (`--dur-ticker`, row 2 reversed at `--dur-ticker-rev`)
- `motion-dim-siblings` — implemented as `.grid-hoverable`: hovering one child dims siblings to
  0.45 opacity + desaturation. Pure CSS via `:has()`. Apply to ticker, gallery grid, skills grid.

**Marquee seamless-loop technique:** `.ticker__track` holds **two identical `.ticker__set` copies**;
`ds-ticker` translates the track −50%. Keep both sets byte-identical or the loop will jump.

**Reduced-motion contract:** under `prefers-reduced-motion: reduce`, marquees/parallax stop and all
entrances degrade to simple opacity. Any new motion must include its reduced fallback.

**JS policy:** the system itself needs none. The site may wire scroll choreography (adding
`motion-rise`/`motion-collapse` classes on scroll) and the Recruiter/Builder toggle with minimal
client-side state — those are the only sanctioned JS touchpoints; document any addition here.

## Copy-register → design mapping (LARP guardrail — binding)

Tone must be reflected in **color and motion**, not just words:

- **Shipped / live** (all flagships + Cloudflare Dashboard, styled as already shipped):
  blue `--c-accent` status, `motion-count` reveals, `--glow-accent`/`--glow-energy` allowed,
  kinetic entrances. **Never** "coming soon"/"in progress" language or muted styling.
- **Closed chapter** (dk-shipping, Jan–Apr 2024): **muted** — warm `--c-warm` instead of blue,
  `--c-text-muted` body, calm `motion-rise` only. **No glow, no counters.** Honest, dignified, past.
- **Archive strip** (challenges / coursework / community): neutral, dense, `--c-text-muted`,
  minimal motion — proof of range, not headline.
- **`[IN PROGRESS]` amber (`--c-status-progress`) is reserved for exactly one thing: the current
  PicPay employment row in the timeline.** It must never appear on a project. If you're about to
  put amber on anything that isn't the real, current job — stop.
- Stats are only verified numbers (`97.9%` HiveMind, `−51%` DOOM, `2–5×` PicPay …) and every stat
  block fills its `__source` slot. Never invent numbers.

## Device mockup rules

- **Apple devices only**, hand-built **pure CSS/SVG** — never stock photos, never GIF/MP4 where
  CSS/SVG animation suffices.
- Roster → default assignment: `mockup-iphone` (iPhone 16 Pro — OffMode timer, Diabetes survey),
  `mockup-ipad` (HiveMind survey, TrocaTine), `mockup-macbook` (architecture/code/Notes editor),
  `mockup-studio-display` (Notes on desktop), `mockup-browser` (DOOM — the URL bar IS the device).
- The screen is always the swappable `.mockup__screen` slot; frames keep their own real corner
  radii (`--r-iphone`, `--r-ipad`, `--r-macbook` …). Keyboards/trackpads, if ever shown: all-black
  or all-white Magic set, or all-gray/white MX set.

## Adding a component

1. Compose **only** existing tokens. Need a new value? Add the token to `ds-spec.yaml` first, then
   `:root` in `ds-components.css`, then render it once in `ds-preview.html`. All four files agree.
2. Name it after its site anchor if one exists; BEM for internals; `.is-*` for states.
3. Show every state in the preview (static `.is-hover`-style twins where hover can't be captured).
4. Include the reduced-motion behavior if it moves.
5. Icons: inline stroke SVG only — 24×24, 1.5px stroke, rounded joins/caps, `currentColor`. Each
   icon needs a functional reason. No emoji-as-icon, no icon fonts.

## Do / Don't

**Do**

- Use `.projects-flagship` layout modifiers (`--layout-left` / `--layout-right` / `--layout-flood`)
  so each flagship looks distinct.
- Put `.bg-grid` behind sections at `--z-grid` for grid continuity; content at `--z-content`.
- Use big readable type; section rhythm at `--s-10`/`--s-11`, flagships `--s-12`/`--s-13`.
- Let one hover dim the rest (`.grid-hoverable`) in any grid of peers.

**Don't**

- ❌ Center a single "product object" hero — the subject is a person.
- ❌ Make all flagships equal-looking.
- ❌ Use amber on a project, glow on a closed chapter, or blue on dk-shipping.
- ❌ Uppercase body copy; use accent-on-dark for small text.
- ❌ Hard-code a color/space/radius in a component rule.
- ❌ GIF/MP4 where CSS/SVG works; stock device photos; emoji or icon-font icons.
- ❌ Invented stats or a stat without its `__source` tag.

## Specimen-content note

Names/numbers in `ds-preview.html` demo content (stack pills, skills, stats) are register-correct
placeholders drawn from the prompt's verified examples. The implementation step must source all
real content from `selected-projects.md` / `cv-enhancer/base.md` / `linkedin-profile.md`.
