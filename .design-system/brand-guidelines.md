# Brand Guidelines · kmads.dev

> Hard rules. If you're tempted to break one, write an ADR first.
> Live previews and visual examples live in [`index.html`](./index.html). This file is the text canon.

---

## 1 · Brand identity

| Field | Value |
|---|---|
| Brand name (display) | `kmads.dev` (always lowercase, with the dot) |
| Person | Kaique Souza · alias `Kmads` |
| GitHub org / handle | `kmadsdev` (no dot) |
| Domain | `kmads.dev` (apex) · `api.kmads.dev` (gateway) |
| Tagline | "Software Engineer · Open-Source Developer" |
| Founded | 2018 (active building since) |
| Studio model | One-person — building outstanding, reliable, free software tools |

### Pillars

- **Reliable.** Tools that stay free and keep working.
- **Direct.** Engineer voice — no marketing fluff.
- **Open.** Open-source by default, public learning.
- **Self-hosted look.** Dark UI, monospace accents, hot-pink highlight — never SaaS-template.

### Naming conventions

- **Brand name:** `kmads.dev` (always lowercase, with the dot). Never `KMADS.DEV`, `Kmads.dev`, `KmadsDev`.
- **Person:** `Kaique Souza` (full) · `Kmads` (alias, capitalized when used as a name).
- **GitHub:** `kmadsdev` (one word, no dot, lowercase).
- **Project URLs:** `kmads.dev/<project-slug>` — kebab-case, lowercase, no trailing slash in copy.
- **Project repo names:** `kmadsdev/<project-slug>` — kebab-case.

---

## 2 · Logo & marks

| Asset | Path | Use |
|---|---|---|
| Primary logomark | `public/assets/kmads_logo_zoomedout.png` | Round mark on dark bg. About section logo, favicon. |
| Favicon | `public/assets/favicon.png` | Browser tab. |
| Static badge | `public/assets/badge.svg` | Decorative use only. |
| Spinning badge — globe | `public/assets/globe.svg` | Inner element of hero badge. Static. |
| Spinning badge — text | `public/assets/globe-text.svg` | Outer element of hero badge. Rotates CCW 20s. |
| Footer banner | `public/assets/footer-banner.svg` | Full-bleed banner on top of footer. |

### Do

- Use the round logo on dark backgrounds at **≥ 80px** diameter.
- Keep clear-space ≥ **25%** of logo diameter on all sides.
- Use the spinning badge **only** in the hero, **only** with the globe + globe-text pair.
- Pair the favicon with the apex domain in browser tabs (already set in `index.html`).

### Don't

- Don't recolor the logomark. No white-on-white. No gradient swaps. No green/blue variants.
- Don't crop, rotate, skew, or stretch the badge.
- Don't pair the spinning badge with another animation in the same viewport zone.
- Don't use the logo at < 40px (illegible).
- Don't place the logo on a pink background.

---

## 3 · Color

```
--white:           #ffffff   primary text, headings, button labels
--bg-color:        #131313   page background
--secondary-color: #1e1e1e   cards, social icons, ghost buttons (+1 elevation)
--special-color:   #ff014f   accent — CTAs, focus, hover, dividers
--text-gray:       #c4cfde   body copy, captions, supporting text
```

### Do

- Pink is the **only** accent. **One pink thing per viewport zone.**
- Use the secondary surface (`#1e1e1e`) for elevation; never lighten with white opacity.
- Use white (`#ffffff`) for headings; `#c4cfde` for body copy.
- Use derivative tints for backgrounds:
  - `rgba(255, 1, 79, 0.1)` — tag chip bg
  - `rgba(255, 1, 79, 0.7)` — gradient stop on dividers
  - `rgba(255, 255, 255, 0.06)` — card border resting state

### Don't

- Don't introduce a 6th color. No blue, green, orange, purple variants.
- Don't use pure black (`#000`) anywhere — page bg is `#131313`.
- Don't apply pink to large surface areas (only borders, accents, ≤ 250px gradient cards).
- Don't use white text on light backgrounds (every panel is `#131313` or `#1e1e1e` — body always dark).

---

## 4 · Typography

- **Family:** Rubik (Google Fonts), weights 300–900. Loaded via `<link>` in each `*.html` entry.
- **Body line-height:** `1.6`. Headings: `1.1–1.4`.
- **Default body size:** `1rem` (16px on standard 2K displays).

### Scale

| Class | Size | Weight | Use |
|---|---|---|---|
| Hero title | 4rem | 700 | The one name on the page |
| Section title | 3rem | 700 | Section headings (with 100px pink underline) |
| Card title | 1.5rem | 700 | Company / project / education names |
| Hero subtitle | 1.5rem | 100 (ultralight) | Single-line tagline under hero title |
| Body | 1rem | 400 | Default copy |
| Body small | 0.9rem | 400 | Card descriptions |
| Caption / meta | 0.85rem | 500 | Periods, dates, metadata |
| Eyebrow | 0.75rem | 600 / upper / ls 2px | Section divider labels |
| Pill / badge | 0.7rem | 700 / upper / ls 0.5px | Status badges |

### Do

- Use Rubik for everything — including code samples in copy (use `<code>` for monospace fragments, not for switching font).
- Use the gradient-text treatment **only** on the hero title.
- Keep section titles centered with the 100px pink underline (or left-aligned for horizontal-scroll sections).

### Don't

- Don't load a second typeface. No Inter, no IBM Plex, no fancy serif.
- Don't use weight 900 outside `section-divider-count` (the giant transparent number).
- Don't justify body copy.
- Don't set body copy in `<strong>` for emphasis — use weight 600.

---

## 5 · Spacing, radius, layout

- **Spacing:** 0.5 / 1 / 1.5 / 2 / 3 / 4 / 6 rem.
- **Radius:** `5px` (CTAs, social icons) · `8px` (ghost/sponsor btn, footer icons) · `20px` (every card) · `25px` pill (Hire btn) · `50%` circle (project hover overlay, brand mark).
- **Page container:** `max-width: 1200px; margin: 0 auto`. Footer container: `1400px`.
- **Section padding:** `4rem` desktop → `1.5rem` ≤768px → `1rem` ≤480px → `0.75rem` ≤360px.

---

## 6 · Motion

Four easing tokens. Pick one per interaction class.

```
--ease-out-expo:     cubic-bezier(0.19, 1, 0.22, 1)    /* page reveals */
--ease-out-quart:    cubic-bezier(0.25, 1, 0.5, 1)     /* small UI moves */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1)    /* symmetric transitions */
ease-card-hover:     cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* card lifts */
```

### Standard durations

- Hover / state changes: `0.3s`
- Card lift: `0.4s`
- Page reveal: `0.6–0.8s`
- Hero badge spin (CCW): `20s` linear infinite

### Do

- Lift on hover (`translateY`); never use `scale > 1.15`.
- Apply pink color **on border/background**, never as a text fade.
- Plan to respect `prefers-reduced-motion` for the spinning badge (open work item).

### Don't

- Don't add JS-driven scroll snapping; **Lenis** owns scroll.
- Don't add page-load splash animations.
- Don't animate font-size or font-weight.

---

## 7 · Voice & content

### Tone

- **Engineer-first.** Lead with what the thing does, not adjectives.
- **First person, casual.** "I love…", "I'm familiar with…", "Hi! My name is Kaique."
- **Lowercase wherever it's not a name.** `kmads.dev`, never `KMADS.DEV`.
- **Bilingual OK.** English-default; Portuguese fragments allowed where audience requires (e.g. study materials, BR-only projects).

### Patterns

- Greetings open with an emoji (👋) — the **only** emoji in body copy.
- Always highlight the alias: `"…ALSO KNOWN AS KMADS"` — KMADS in pink, weight 700.
- Bullet lists in cards: ≤ 6 lines, present tense for current role, past tense for completed.
- Tag format: **Title-case stack name** (`Python`, `FastAPI`) — never lowercase.
- Resume CTA always says `"Download Resume"` (links to `kmads.dev/cv`).

### Do

- Write in first person, casual.
- Always lowercase `kmads.dev`.
- Title-case tech tags.
- Short sentences. One idea per line in card bullets.

### Don't

- No marketing buzzwords ("synergy", "ecosystem", "leverage", "disrupt", "ninja", "rockstar").
- No emojis in body copy except the hero 👋.
- No third-person ("Kmads is a developer who…").
- No exclamation marks in CTAs (`"Hire Me"` not `"Hire Me!"`).

---

## 8 · Canonical microcopy

These strings are versioned in `src/constants.js`. Don't paraphrase — use them as-is.

```js
SITE_CONFIG.title          = "Kaique Souza"
SITE_CONFIG.description    = "Software Engineer · Open-Source Developer"
SITE_CONFIG.copyright      = "© 2026 kmads.dev All rights reserved."
SITE_CONFIG.resumeUrl      = "https://kmads.dev/cv"

HERO_CONTENT.greeting      = "👋 HELLO, MY NAME IS KAIQUE, ALSO KNOWN AS"
HERO_CONTENT.highlightName = "KMADS"

CONTACT.linkedin = "https://kmads.dev/linkedin"
CONTACT.github   = "https://kmads.dev/github"
CONTACT.email    = "contact@kmads.dev"
```

---

## 9 · Domain & URL conventions

- **Apex (kmads.dev):** Portfolio + landing. Owned by this repo.
- **`kmads.dev/<project>`:** Routed via KMADSDEV-API (Vercel Edge) → `github.com/kmadsdev/<project>`. Use this URL form everywhere in copy. Never link directly to the GitHub URL when a `kmads.dev/<project>` form exists.
- **`api.kmads.dev`:** Edge gateway only. Don't surface in user-facing copy.
- **`source.kmads.dev/<project>`:** Source-code shortcuts (used in `projects.json`). Resolves through the same gateway.

---

## 10 · License & attribution

- **Code:** MIT (this repo is open-source).
- **Brand assets** (logo, badge, banner): not licensed for reuse — © Kaique Souza.
- **Tech stack icons** under `public/assets/icons/`: official brand SVGs from each project. Each one's own brand guidelines apply (e.g. React's, Python's, AWS's). Don't recolor.
