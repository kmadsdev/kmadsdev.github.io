# `.design-system/` — kmadsdev Portfolio · Design System (Prototype)

> Source of truth for the look, feel, and rules behind the **kmadsdev
> portfolio** redesign (`kmadsdev.github.io` → `kmads.dev`). Lives inside
> `prototype/` while the redesign is in flight; gets promoted (and
> eventually generalized) into the workspace-level
> `WORKAHOLIC/.design-system/` once stable. See backlog item:
> `WORKAHOLIC/.backlog/planning/universal-design-system-rubik.md`.

The system is a **deliberate fork** of the modular box-and-line system
shipped in `agentic/.design-system/`, recolored and revoiced for a
personal portfolio context. **Black + pink-red + Rubik**, vs agentic's
**black + green + Inter**.

---

## What's in here

| File | Purpose |
|---|---|
| [`index.html`](./index.html) | **Living design system.** Self-contained single-file HTML — open in any browser, no build, no install. Live-renders every component using the same CSS tokens that ship in `prototype/styles/prototype.css`. Includes color palette, typography scale, spacing/radius, motion easings, components (buttons, badges, cards, navbar, hero, sections, modular cells), responsive breakpoints, voice & content rules. |
| [`modular-design.html`](./modular-design.html) | **The box-and-line strategy applied to a portfolio.** Self-contained companion documenting the modular system: 12-column module grid, indexed section labels (`00 / WHO`, `01 / WHO`, …, `-1 / THE END`), three border-weight tokens, cell composition, border-work, diagonal stripe closers, the modular hero frame around the globe, and the strategies that produced the look. |
| [`brand-guidelines.md`](./brand-guidelines.md) | Hard rules — logo (the globe!), color, typography, motion, voice. Do's and don'ts. The text-only canon. |
| [`media.md`](./media.md) | Inventory of every asset under `prototype/assets/` — paths, intended use, sizing rules, deprecations, TODOs. |
| `README.md` | This file. |

---

## How to view

```bash
# from the repo root (kmadsdev.github.io)
open prototype/.design-system/index.html
# or
python3 -m http.server 5500
# then http://localhost:5500/prototype/.design-system/
```

`index.html` references real assets via relative path
`../assets/…` — running from a static server (or the file scheme in
most browsers) loads them directly.

---

## How this prototype is organized

```
prototype/
├── index.html                  ← redesigned home (single-file, no build)
├── projects.html               ← redesigned /projects (cards + table)
├── projects.json               ← data, copied from repo root
├── styles/
│   └── prototype.css           ← shared CSS, single file
├── assets/                     ← copied wholesale from public/
│   ├── globe.svg, globe-text.svg, kmads_logo_zoomedout.png
│   ├── icons/   (stack icons)
│   ├── projects/ (screenshots, demos)
│   ├── social/   (github, linkedin, email)
│   └── ui/       (arrow-external, etc.)
└── .design-system/
    ├── README.md          (this file)
    ├── brand-guidelines.md
    ├── media.md
    ├── index.html
    └── modular-design.html
```

Everything is **single-file HTML**. No Vite, no React, no build. The
prototype's entire mission is to let you open the home in a browser
and iterate on the visual design without touching `src/`.

---

## When to update

Update the design system **when, and only when**, one of these changes:

| Change | Update |
|---|---|
| New CSS variable / design token in `styles/prototype.css` (`:root`) | `index.html` (foundations sections) + `brand-guidelines.md §3 / §4` |
| New reusable component (card, button, badge variant, modular cell) | `index.html` (components section) |
| New module/section pattern, span layout, divider variant | `modular-design.html` |
| New section added to the home — pick the next index, set the eyebrow | `modular-design.html` (label ribbon) + `brand-guidelines.md §10` |
| Breakpoint added/removed | `index.html` §Breakpoints table |
| New asset under `assets/` (logo, icon, screenshot) | `media.md` + reference in `index.html` if relevant |
| New voice/copy convention | `brand-guidelines.md §5` |

---

## Precedence

When this design system disagrees with `prototype/index.html` or
`prototype/styles/prototype.css`, **the code wins**, because the
deployed prototype is what the eye actually evaluates. Update the
design system to catch up — never edit the prototype to match outdated
docs without explaining why in a commit message.

When the prototype gets promoted to `src/` (becoming the production
React portfolio), this design system gets re-homed in two places:

1. **Project-level** stays at `kmadsdev.github.io/.design-system/` —
   replaces the current 5 files there.
2. **Workspace-level** rules (Rubik base, modular tokens) get extracted
   to `WORKAHOLIC/.design-system/` to be reused across kmadsdev
   projects.

---

## Differences from `agentic/.design-system/`

| Axis | agentic | kmadsdev portfolio |
|---|---|---|
| Background | `#0b0d0c` | `#0e0e10` (cooler) |
| Accent | `#33b474` (green) | `#ff014f` (pink-red) |
| Sans font | Inter | **Rubik** (universal kmadsdev font) |
| Mono font | JetBrains Mono | JetBrains Mono (kept) |
| Hero centerpiece | wordmark + agent badges | **the globe** (massive, rotating) |
| Tone | engineering-marketing ("agent speed, production control") | personal-engineering ("50+ projects since 2018, still no idea what I'm doing") |
| Section indices | `01 / CAPABILITIES` `02 / SETUP` `03 / BEFORE VS AFTER` `-1 / THE END` | `00 / KMADSDEV` `01 / WHO` `02 / WORK` `03 / STACK` `04 / AGENTS` `05 / SHIPPED` `06 / CONTACT` `-1 / THE END` |
| Modular grid | 12-col | 12-col (same) |
| Border weights | 3 (`soft`, `base`, `strong`) | 3 (same names, recolored to neutral grays) |
| Diagonal stripe closer | yes | yes (same spec) |

---

## Owner

`@kmadsdev` · committed alongside the prototype source. Not deployed —
folder name starts with `.`, GitHub Pages serves only what's outside
`prototype/` plus the `.design-system/` if linked explicitly.
