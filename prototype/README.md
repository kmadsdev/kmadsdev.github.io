# `prototype/` — kmadsdev portfolio redesign

> Self-contained HTML prototype of the modular box-and-line redesign.
> Single-file pages, single CSS file, no build, no dependencies.
> Iterate visually here; promote to `src/` (React) when approved.

---

## Status

🟢 **First-pass complete.** Modular box-and-line redesign (May 2026)
based on the philosophy from `agentic/.design-system/` plus the
cleanness of `abacatepay.com`. Brand-color stays **kmadsdev pink-red**
(`#ff014f`). Universal font stays **Rubik**.

Validated:

- Renders cleanly at 375 / 768 / 1440 viewports — no horizontal scroll.
- Heading order valid (no jumps), every interactive element has a focus
  ring, every image has `alt`, body text passes WCAG AA.
- Single source of truth for projects: `projects.json`. Both home
  (§04 SHIPPED) and `/projects` derive featured cards from
  `featured: true` flags.
- Zero console warnings, zero 404s in network panel.

The original portfolio at `src/` is untouched. Compare side-by-side.

---

## How to run

```bash
# from this folder
cd prototype/
python3 -m http.server 5500

# then open
http://localhost:5500/index.html        # home
http://localhost:5500/projects.html     # full inventory page
http://localhost:5500/.design-system/   # design system docs
```

> **Why a static server?** `projects.html` uses `fetch('./projects.json')`
> — the `file://` scheme blocks that. Any static server works
> (`python3 -m http.server`, `npx serve`, VS Code Live Server, etc.).
> Home (`index.html`) works from `file://` directly, but the table page
> needs the server.

---

## What's in this folder

```
prototype/
├── index.html              ← home (single-file, all 7 sections)
├── projects.html           ← /projects (cards + 4 tables, fetches projects.json)
├── projects.json           ← copied from repo root, source of truth for tables
├── styles/
│   └── prototype.css       ← all CSS, single file, ~41KB
├── assets/                 ← copied from public/ (globe, icons, projects, social, ui)
└── .design-system/         ← living design system, brand canon, modular reference
    ├── README.md
    ├── brand-guidelines.md
    ├── media.md
    ├── index.html
    └── modular-design.html
```

---

## What changed vs the old portfolio

### Voice

| Before | After |
|---|---|
| `👋 HELLO, MY NAME IS KAIQUE, ALSO KNOWN AS KMADS` | `00 / KMADSDEV` + `Kaique Souza.` |
| `Software Engineer • Open-Source Developer` | `Software engineer. Open-source by default.` |
| `About Me` | `01 / WHO` |
| `Experience & Education` | `02 / WORK` |
| `Tech Stack` | `03 / STACK` |
| `Projects` | `04 / SHIPPED` |
| (no contact section) | `05 / CONTACT` |
| (no footer label) | `-1 / THE END` |

### Tagline

> 50+ projects since 2018. Still no idea what I'm doing.

### Visual

- **Modular box-and-line** sections with three border weights, indexed
  labels (`00 / KMADSDEV`, `01 / WHO` … `-1 / THE END`), 12-col grid
  background, diagonal-stripe closers between modules.
- **Hero**: globe is **massive** inside a modular stage cell with
  corner markers and a `FIG · 00.A` figure label. Copy-stage on the
  left, globe-stage on the right.
- **Stack**: 6-column icon grid with mono labels, grouped into
  `03.A LANGUAGES`, `03.B BACKEND & FRONTEND`, `03.C DATA & CLOUD`,
  `03.D DEVOPS`. Plus `03.E AGENTS I WORK WITH` (Claude Code,
  OpenCode, Codex, Copilot) as a sub-grid inside the same module.
- **Projects**: cards-with-media on the home (3 featured), full
  table-based inventory on `/projects` with cards-on-top, then four
  tables (All, Challenges, Other, Legacy).
- Vertical scroll only — no horizontal scroll-jacking. (Old portfolio
  used `useDecoupledScroll` for Experience/Stack/Projects; cut.)
- No `Contact form` — replaced with three direct-channel cells
  (email, GitHub, LinkedIn).

### Tokens

| Token | Old | New |
|---|---|---|
| `--color-background` | `#131313` | `#0e0e10` (cooler) |
| `--color-accent` | `#ff014f` | `#ff014f` ✓ kept |
| `--color-text-secondary` | `#c4cfde` | `#c4cfde` ✓ kept |
| Sans font | Rubik | Rubik ✓ kept (universal) |
| Mono font | — | JetBrains Mono ← added |
| Module borders | — | `#262629` / `#1c1c1f` / `#3a3a40` ← added |

---

## Known TODOs

Tracked inline with `<!-- TODO: ... -->` and in `.design-system/media.md`.
**Resolved during the first-pass build:**

- [x] ~~Agent icons~~ — copied from `agentic/public/agents/` into
      `prototype/assets/agents/`. Emoji placeholders replaced with real
      `<img>` tags in `index.html §03.E`.
- [x] ~~Social icon typo~~ — `gituhb-*.svg` renamed to `github-*.svg`.
      Old red variant was a duplicate of the white one — discarded.
- [x] ~~`projects.json` `featured: true` flag~~ — both home and
      `/projects` now derive the 3 featured cards by filtering
      `featured: true` on the JSON. Single source of truth.

**Open — out of scope for the prototype, decide before porting to `src/`:**

- [ ] **OG image** — re-export `kmads_logo_zoomedout.png` at 1200×630
      for richer social previews.
- [ ] **Apple touch icon** — add 180×180 PNG.
- [ ] **Reveal animations** — `.reveal` is wired in CSS + JS but only
      hooked on the hero. Extend to section headers and cells if it
      adds polish.
- [ ] **Copy review** — phrases, titles, CTAs were rewritten in the
      auto-deprecating-confident voice the user asked for; final pass
      on tone is a product decision, not a build one.

---

## When approved → port to `src/`

The prototype is a **design contract**, not a deployable site. Once
approved:

1. **Tokens →** lift `:root` from `prototype.css` into
   `src/styles/global.css`.
2. **Components →** convert each `.module`, `.cell`, `.project-card`,
   `.work__entry`, `.stack__cell`, `.agent__cell` into `.jsx` components
   in `src/components/`. Match class names 1-1 so styles port cleanly.
3. **Data →** `projects.json` is already the source of truth (the
   prototype filters `featured: true` for the home cards). Just
   import it in `src/` and apply the same filter.
4. **Voice →** copy the new strings (eyebrows, headlines, taglines)
   into `src/constants.js`. Most of the old file's content is preserved
   structurally; only the wrapping copy changed.
5. **Old assets →** keep all assets in `public/`. Cleanup deprecated
   ones (`footer-banner.svg`, etc.) in a follow-up commit, not this one.
6. **Lenis →** the prototype uses native smooth-scroll; the React port
   should re-introduce Lenis (already wired in old `App.jsx` via
   `useLenis` hook) for the kmadsdev-signature feel.
7. **Promote `.design-system/` →** delete the old one at the repo root,
   move the prototype's into its place (`kmadsdev.github.io/.design-system/`).

---

## Workspace context

This redesign also seeded a workspace-level item:

`WORKAHOLIC/.backlog/planning/universal-design-system-rubik.md` — an
extracted, generalized DS using **Rubik as the universal font** that
all kmadsdev projects can consume. Picked up after the portfolio
redesign lands.
