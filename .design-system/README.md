# `.design-system/` — kmads.dev Design System

> Source of truth for the look, feel, and rules behind `kmads.dev` (the portfolio + domain gateway frontend) and every project routed under it.

---

## What's in here

| File | Purpose |
|---|---|
| [`index.html`](./index.html) | **Living design system.** Self-contained single-file HTML — open in any browser, no build, no install. Live-renders every component using the actual CSS tokens from `src/styles/global.css`. Includes color palette, typography scale, spacing/radius, motion easings, components (buttons, cards, headers, hero, footer), responsive breakpoints, mobile/desktop viewport demos, iconography, voice & content rules. |
| [`modular-design.html`](./modular-design.html) | **Modular design strategy.** Companion page that ports the Agentic box-and-line system into kmads.dev's core logic: Rubik, pink accent, rounded cards, 12-col module grid, section labels, border-work, separators, text/media overlap, variable-span boxes, and horizontal-scroll rail rules. |
| [`brand-guidelines.md`](./brand-guidelines.md) | Hard rules — logo usage, color usage, typography, motion, voice. Do's and don'ts. The text-only canon. |
| [`media.md`](./media.md) | Inventory of every brand asset shipped under `public/assets/` — paths, intended use, sizing rules, and how to add new project media. |
| `README.md` | This file. |

---

## How to view

```bash
# from the repo root
open .design-system/index.html
# or
python3 -m http.server 5500
# then http://localhost:5500/.design-system/
```

`index.html` references real assets via relative path `../public/assets/…` — running from a static server (or the file scheme on most browsers) loads them directly.

---

## When to update

Update the design system **when, and only when**, one of these changes:

| Change | Update |
|---|---|
| New CSS variable / design token in `src/styles/global.css` | `index.html` (foundations sections) |
| New reusable component (card, button, badge variant) | `index.html` (components section) + add do/don't if it has rules |
| New modular section pattern, section label, separator, border rule, overlap rule, or variable-span grid | `modular-design.html` |
| Horizontal-scroll rail behavior changes (Experience, Stack, Projects) | `modular-design.html` §11 + `index.html` layout section |
| Breakpoint added/removed in `src/styles/mobile.css` | `index.html` §15 breakpoints table |
| New brand asset under `public/assets/` | `media.md` + `index.html` §17–18 |
| New voice/copy convention (e.g. CTA phrasing) | `brand-guidelines.md` + `index.html` §19 |
| Marketing-level rule (logo usage, naming) | `brand-guidelines.md` first; mirror summary into `index.html` §20 |

---

## Precedence

When this design system disagrees with a component's actual code in `src/`, the **code wins**, because the deployed site is the truth users see. Update the design system to catch up — never edit `src/` to match outdated docs without an ADR explaining why.

---

## Owner

`@kmadsdev` · this folder is committed to the `kmadsdev/kmadsdev.github.io` repo and lives alongside the source. Not deployed to gh-pages (folder name starts with `.`, so `vite build` ignores it).
