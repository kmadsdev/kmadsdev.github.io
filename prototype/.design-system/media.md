# Media & Asset Inventory — Portfolio Prototype

> Every asset shipped under `prototype/assets/`. Single source of truth
> for paths, sizes, and intended use. Mirrors the structure of the
> production `public/assets/` from the old portfolio (assets were copied
> wholesale; nothing was deleted in the redesign).

---

## File tree

```
prototype/assets/
├── 45deg-white-arrow.svg       # legacy — kept for now, unused
├── arrow-redirect.svg          # legacy — kept for now, unused
├── arrow-scroll.svg            # hero scroll-down hint (TBD if reused)
├── badge.svg                   # legacy — unused in redesign
├── favicon.png                 # browser favicon
├── footer-banner.svg           # OLD footer banner — NOT used in redesign
├── globe-text.svg              # globe outer ring (rotating wordmark)
├── globe.svg                   # globe inner mark (the planet)
├── kmads_logo_zoomedout.png    # OG image / favicon fallback
├── icons/                      # tech stack icons (SVG, vendor)
├── projects/                   # project screenshots + demo videos
├── social/                     # social network icons
└── ui/                         # UI utility icons
```

All assets are vendor-owned (tech logos), kmadsdev-owned (logos,
screenshots), or under their respective brand-asset licenses.

---

## Brand assets

### `globe.svg` + `globe-text.svg` — primary mark

- **Format:** SVG, vector. **Always paired** in the hero.
- **Usage:** Hero only. **Big.** Occupies as much vertical space as the
  headline. Centerpiece.
- **Animation:** outer ring rotates `20s linear infinite` clockwise;
  inner globe is still.
- **Background:** must contrast against `#0e0e10`. The mark ships with
  embedded `#ff014f` accents — do not recolor.
- **`alt`:** `"kmadsdev"` — it IS the brand.
- **Reduced motion:** rotation disabled; rings stay static.

### `kmads_logo_zoomedout.png` — raster logo / OG image

- **Format:** PNG, RGBA.
- **Usage:** Favicon, OG image, email signature, anywhere SVG is
  unsupported.
- **Wired in:** `index.html` `<link rel="icon" type="image/png" …>`.
- **OG image note:** ideal export is 1200×630 — current source is
  square. Re-export needed before the redesign goes to production.

---

## Stack icons — `assets/icons/*.svg`

Used in section `03 / STACK`. Each icon is rendered as a `.skill-card`
with monospace label. Rendered at 24-32px inside a 64px-tall pill or
inside a modular cell.

| File | Subject | Notes |
|---|---|---|
| `aws.svg` | Amazon Web Services | Vendor original |
| `c.svg` | C language | |
| `clang.svg` | LLVM/Clang | |
| `docker.svg` | Docker | |
| `fastapi.svg` | FastAPI | |
| `gcp.svg` | Google Cloud Platform | |
| `github.svg` | GitHub (mark) | |
| `githubactions.svg` | GitHub Actions | |
| `go.svg` | Go | |
| `hyperf.svg` | Hyperf | |
| `java.svg` | Java | |
| `javascript.svg` | JavaScript | |
| `laravel.svg` | Laravel | |
| `mysql.svg` | MySQL | |
| `nodejs.svg` | Node.js | |
| `pandas.svg` | Pandas | |
| `php.svg` | PHP | |
| `postgresql.svg` | PostgreSQL | |
| `python.svg` | Python | |
| `react.svg` | React | |
| `redis.svg` | Redis | |
| `scikit.svg` | scikit-learn | |
| `sqlite.svg` | SQLite | |
| `tkinter.svg` | Tkinter | |
| `typescript.svg` | TypeScript | |
| `vercel.svg` | Vercel | |
| `vite.svg` | Vite | |

### Display rules

- Render on a square modular cell (~120×120px on desktop), centered.
- Label below in **JetBrains Mono 11px**, uppercase, letter-spacing
  `0.1em`, `--color-text-muted`.
- Hover: cell border becomes `--color-accent`, label color flips to
  `--color-accent`.

---

## Agent icons — `04 / AGENTS` (TODO)

The new section calls out the agentic tooling Kaique uses:

| Agent | Status | Source |
|---|---|---|
| Claude Code | ⚠️ icon missing | use Anthropic mark from `agentic/public/agents/claude.svg` (already optimized, MIT-compatible) |
| OpenCode | ⚠️ icon missing | borrow `agentic/public/agents/opencode.svg` |
| Codex | ⚠️ icon missing | borrow `agentic/public/agents/codex.svg` |
| Copilot | ⚠️ icon missing | borrow `agentic/public/agents/copilot.svg` (large — run through SVGO before shipping) |

**Action:** copy these four SVGs from `agentic/public/agents/` to
`prototype/assets/agents/` before the prototype goes live. Until then,
use emoji placeholders inside the cells with a comment marker
`<!-- TODO: replace with /assets/agents/{name}.svg -->`.

---

## Project media — `assets/projects/`

| File | Used by | Notes |
|---|---|---|
| `offmode.png` | Off Mode card | hero image — keeps |
| `diabetes-indicator.png` | Diabetes Indicator card | hero image — keeps |
| `diabetes-indicator-demo.mp4` | Diabetes Indicator card | video on hover — keeps the swap behavior |
| `trocatine.png` | TrocaTine card | hero image — keeps |

**TODO:** add screenshots for HiveMind Client Potential, DK Shipping,
Python Compiler when those get promoted to "featured" status. For now
they stay table-only on `/projects`.

---

## Social — `assets/social/`

Two color variants per network — one in `--color-accent` red
(`*-icon-red.svg`), one in white (`*-icon-white.svg`).

| Network | Red | White |
|---|---|---|
| GitHub | `github-icon-red.svg`, `gituhb-icon-red.svg` (typo, kept for now) | `gituhb-icon-white.svg` (typo) |
| LinkedIn | `linkedin-icon-red.svg` | `linkedin-icon-white.svg` |
| Email | `email-icon-red.svg` | `email-icon-white.svg` |

**Cleanup TODO:** rename `gituhb-*` → `github-*` before the prototype
ports to production. Update any references in `index.html`.

### Display rules

- Render at 22-24px inside the hero CTA row.
- Use `*-red.svg` against dark backgrounds (matches `--color-accent`).
- Use `*-white.svg` only inside accent-filled buttons (red bg → white
  icon).

---

## UI icons — `assets/ui/`

| File | Use | Notes |
|---|---|---|
| `arrow-external.svg` | "↗" external-link arrow on project cards & tables | keep |
| `footer-banner.svg` | OLD footer hero illustration | **deprecated** in redesign — footer is now `-1 / THE END` styled, no banner |
| `heart.svg` | "Become a Sponsor" CTA | replaced by inline SVG in footer |

**Deprecation:** `footer-banner.svg` stays in the assets folder for now
(don't delete what we don't have to), but the redesign does not
reference it.

---

## Favicon & social card

| Surface | File | Size | Status |
|---|---|---|---|
| Browser favicon | `kmads_logo_zoomedout.png` | 600×600 | wired in `index.html` |
| Apple touch icon | _missing_ | should be 180×180 PNG | TODO before production |
| OG image | `kmads_logo_zoomedout.png` | currently square | re-export at 1200×630 |
| Theme color | n/a (CSS) | `#0e0e10` | set via `<meta name="theme-color">` |

---

## Forbidden

- **No third-party icon library** (Heroicons, Lucide, Feather).
  Hand-tuned SVG only.
- **No animated GIFs.** If motion is needed, use CSS or
  `<video muted autoplay loop playsinline preload="metadata">` (the
  pattern already used by `diabetes-indicator-demo.mp4`).
- **No stock photos.** No portrait of Kaique. The globe IS the visual
  identity.

---

## Adding a new asset

1. Drop the file into the right subfolder (`assets/icons/`,
   `assets/projects/`, etc.).
2. Optimize SVGs: `npx svgo <file>`. Target < 10 KB; document
   exceptions in this file.
3. Register in `index.html` (or `projects.json` if it's a project
   image).
4. Update this file's table.
5. Commit with a message that explains *what* was added and *why*.

---

## Owner

`@kmadsdev` · update this file every time `assets/` changes. PR with
the diff visible.
