# Claude Design Prompt — kmads.dev Design System (for Fable 5)

**Role of this document:** This is the *input prompt* for **Claude Design** (executed by **Fable 5**,
medium effort, tight budget). Its job is to produce a **DESIGN SYSTEM expressed as DESIGN TOKENS** — not
a page-by-page build of the portfolio. Downstream, Fable 5 will consume the tokens this system defines to
implement the actual site (Step 6/7). So spend the design budget on a *complete, inspectable token +
component sheet*, not on assembling finished pages.

Every value below is concrete on purpose: Fable 5 has a limited budget, so this prompt front-loads exact
hex codes, scales, easings, and component anatomy to minimize the number of design passes needed. Treat
specified numbers as defaults you may refine ±1 step for rhythm, **not** as loose suggestions to reinvent.

---

## 0. Output contract (produce in THIS order — matches `CLAUDE.md` §Step 5)

1. **`ds-preview.html`** — *generate FIRST.* A single self-contained page that visually renders every
   token, typographic style, color, spacing unit, radius, icon, and every component **shown exactly once**.
   Inline CSS only. **No JavaScript unless absolutely necessary** (a token-driven system should need none;
   if a component's *identity* depends on motion, show it as a CSS-only animation loop, not JS). Must be
   responsive enough to inspect on a laptop and a phone width. This is a specimen sheet / "design system
   preview", the way a Storybook overview or a brand style tile works — not a portfolio mock.
2. **`ds-spec.yaml`** — *generate SECOND.* The machine-readable source of truth: all tokens (color,
   type, space, radius, shadow, motion, breakpoints, z-index), plus a component registry (name → the
   tokens and states it composes). One canonical entry per token/component. This is what a later agent
   parses.
3. **`ds-components.css`** — *generate THIRD.* The implementation: CSS custom properties for every token
   in `:root`, then component classes built *only* from those variables (no hard-coded values in
   component rules — every color/space/radius references a `var(--…)`). Include a dark-first `:root` and
   the light override block (see §2.6). This file must be the literal CSS behind `ds-preview.html`.
4. **`ds-README.md`** — *generate FOURTH.* Usage notes: naming conventions, how to add a component, the
   copy-register → motion/color rules from §7, do/don't examples, and the mockup rules from §6.

All four must agree. If a value appears in `ds-preview.html`, it exists in `ds-spec.yaml` and
`ds-components.css` with the same name.

---

## 1. Design DNA — the synthesis (read before touching tokens)

The portfolio (`kmads.dev`) presents a **person, Kaique "kmads" Souza — a Software Engineer**, never a
centered product object. The design system must serve four inspirations *blended into one coherent voice*,
not four visually separate zones. The blend:

- **cash.app → motion & confidence.** Bold, high-contrast, slide-like transitions; numbers and stats
  animate as first-class citizens. Give the system a **counter/stat display treatment** and **motion
  tokens** tuned for "fluid PowerPoint" section-to-section movement. *Avoid:* a single centered hero
  object standing in for a product.
- **niklasbubori → editorial darkness & type.** Big, confident, **all-uppercase structural labels**;
  choreographed text that collapses/settles; a dark, gallery-grade canvas; one bespoke presentation per
  project. *Avoid:* tiny hard-to-read cards; overuse of video — prefer CSS/SVG animation, SVG/PNG assets.
- **easol → personality, grids & tickers.** Background grid continuity; the **animated dual-ticker band**
  (two counter-scrolling rows); **progress-step sequences** (`[SHIPPED]` / `[97.9% ACCURACY]` / `[IN
  PROGRESS]` states); **one hover dims the whole grid**; a **section-swap control** (Recruiter/Builder).
  Personality is a requirement, not decoration.
- **vercel/nextjs → precision & density.** Mathematical geometry, tight information density, exact grid,
  restrained monochrome base punctuated by accent. Well-produced micro-animations, responsive to input.

**Net aesthetic:** a **dark, editorial, engineering-grade canvas** (niklasbubori + vercel) — precise grid,
big uppercase grotesk display, monospace metadata — **flooded selectively with bold accent color and
kinetic stat/ticker energy** (cash.app + easol) where a section earns celebration. Sharp, exaggerated,
technical, information-dense. Muted where the content is a closed chapter (see §7).

---

## 2. Token specifications

### 2.1 Color — seeded from Kaique's own real palette

Anchor the whole system on the **documented design tokens from his `notes` project** (real, his, verified
in `selected-projects.md` §Notes) — extended into a full ramp. This makes the design system *his*, not
borrowed.

Core seed (use verbatim as the named brand colors):

| Token | Hex | Role |
|---|---|---|
| `--c-bg` | `#101010` | Page canvas (near-black) |
| `--c-surface` | `#242424` | Elevated surface / card |
| `--c-accent` | `#2DAAE4` | **Primary** accent (electric blue) — links, primary CTAs, "live/shipped" |
| `--c-energy` | `#FF014F` | **Secondary** accent (hot magenta-red) — stat highlights, ticker sparks, hover emphasis |
| `--c-warm` | `#C16D51` | **Tertiary** accent (terracotta) — archive/closed-chapter tone, warm callouts |

Extend into a complete, inspectable ramp (define and SHOW each in `ds-preview.html`):

- **Neutrals (dark-first):** `--c-bg #101010`, `--c-bg-2 #171717`, `--c-surface #242424`,
  `--c-surface-2 #2E2E2E`, `--c-line #383838` (hairline borders/grid), `--c-line-strong #4A4A4A`.
- **Text:** `--c-text #F4F4F4` (primary), `--c-text-muted #A6A6A6` (secondary/metadata),
  `--c-text-faint #6A6A6A` (labels, disabled).
- **Accent ramps** — for each of blue / energy / warm, provide 3 tints for state work:
  - Blue: `--c-accent-hi #57C4F2`, `--c-accent #2DAAE4`, `--c-accent-lo #1B7CAE`.
  - Energy: `--c-energy-hi #FF3D75`, `--c-energy #FF014F`, `--c-energy-lo #C2003C`.
  - Warm: `--c-warm-hi #D68A70`, `--c-warm #C16D51`, `--c-warm-lo #8F4E39`.
- **Status/semantic (drive the timeline & progress steps — §4 components):**
  `--c-status-shipped` = `--c-accent` (blue), `--c-status-win` = `--c-energy` (magenta, for stat wins
  like `97.9% ACCURACY`), `--c-status-progress` = `#E8B93B` (amber, ONLY for genuine "in progress" —
  employment, per §7), `--c-status-closed` = `--c-warm` (terracotta, for closed chapters).
- **On-accent text:** `--c-on-accent #06121A` (dark ink for text set on a flooded accent block).
- **Grid overlay:** `--c-grid` = `rgba(244,244,244,0.04)` (the background grid lines — see §5 grid).

Contrast rule: body text on `--c-bg`/`--c-surface` must clear WCAG AA (≥4.5:1). Accent-on-dark for large
display only.

### 2.2 Typography

Pairing: a **grotesk display/UI face** + a **monospace metadata face**. Name the intended production
fonts as tokens; for the self-contained `ds-preview.html`, fall back to robust system stacks so the
specimen renders anywhere without external font loads.

- `--font-display`: **`"Rubik"`** (fixed, non-negotiable — Kaique's standing font preference; use Rubik
  for ALL display/UI text). Stack fallback `"Rubik", -apple-system, "Segoe UI", system-ui, sans-serif`.
  Weights: 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold for hero display). Do not substitute
  another grotesk.
- `--font-mono`: intended `"JetBrains Mono"` / `"SF Mono"`; stack fallback
  `ui-monospace, "SF Mono", "Cascadia Code", monospace`. Used for: nav labels, section eyebrows, status
  tags, ticker pills, stat numerals, code/architecture captions. This mono-as-label move is the "engineer"
  signature of the system.

**Type scale** (rem, 1rem = 16px, modular ~1.25 with a display jump). SHOW each style once with real text:

| Token | Size / line-height | Weight / face | Use |
|---|---|---|---|
| `--t-display` | `clamp(3.5rem, 8vw, 7rem)` / 0.95 | 800 display | Hero name, flagship titles |
| `--t-h1` | `clamp(2.5rem, 5vw, 4rem)` / 1.02 | 700 display | Section headers |
| `--t-h2` | `2rem` / 1.1 | 700 display | Sub-sections, project names in grid |
| `--t-h3` | `1.375rem` / 1.2 | 600 display | Card titles |
| `--t-body-lg` | `1.25rem` / 1.5 | 400 display | Lead paragraphs (about, project intros) |
| `--t-body` | `1rem` / 1.6 | 400 display | Body copy |
| `--t-small` | `0.875rem` / 1.5 | 400 display | Captions, secondary meta |
| `--t-eyebrow` | `0.75rem` / 1.4, letter-spacing `0.18em`, **UPPERCASE** | 500 mono | Section eyebrows, nav, tags |
| `--t-mono-stat` | `clamp(2rem, 4vw, 3.25rem)` / 1 | 500 mono, tabular-nums | Animated stat numerals (97.9%, -51%) |

Rules: **UPPERCASE only** for `--t-eyebrow`-class structural labels (nav, eyebrows, status tags, ticker
phrases) — **never** for body copy (niklasbubori). Stat numerals use `font-variant-numeric: tabular-nums`
so counters don't jitter while animating.

### 2.3 Spacing scale

4px base, geometric-ish. Tokens `--s-1 … --s-13`. SHOW as labeled bars:
`--s-1 4px`, `--s-2 8px`, `--s-3 12px`, `--s-4 16px`, `--s-5 24px`, `--s-6 32px`, `--s-7 48px`,
`--s-8 64px`, `--s-9 96px`, `--s-10 128px`, `--s-11 160px`, `--s-12 224px`, `--s-13 320px`.
Section vertical rhythm uses `--s-10`/`--s-11`; full-bleed flagship sections use `--s-12`/`--s-13`.

### 2.4 Radius

`--r-0 0`, `--r-sm 6px`, `--r-md 12px`, `--r-lg 20px`, `--r-xl 32px`, `--r-pill 999px`, `--r-round 50%`.
Default card radius `--r-lg`; pills (ticker, nav toggle, tags) `--r-pill`; device-mockup screens use their
own real corner radii (§6). SHOW each as a swatch.

### 2.5 Elevation / shadow / border

Dark UI leans on **borders and subtle glow**, not heavy drop shadows.
- `--border-hair`: `1px solid var(--c-line)`; `--border-strong`: `1px solid var(--c-line-strong)`.
- `--shadow-1`: `0 1px 2px rgba(0,0,0,0.4)`; `--shadow-2`: `0 8px 30px rgba(0,0,0,0.5)`.
- `--glow-accent`: `0 0 0 1px var(--c-accent-lo), 0 0 24px rgba(45,170,228,0.25)` (hover/active on
  interactive accent elements).
- `--glow-energy`: `0 0 24px rgba(255,1,79,0.30)` (stat-win emphasis).

### 2.6 Theme (dark-first, light override)

`:root` is **dark** (values above). Provide `:root[data-theme="light"]` and a
`@media (prefers-color-scheme: light)` block that remaps neutrals (`--c-bg #F7F7F5`, `--c-surface #FFFFFF`,
`--c-text #101010`, `--c-text-muted #565656`, `--c-line #E3E3E0`, `--c-grid rgba(16,16,16,0.05)`,
`--c-on-accent #06121A`) while keeping the three brand accents identical. Dark is the primary, showcased
theme; light must not break contrast.

### 2.7 Motion tokens (cash.app fluidity)

- Durations: `--dur-fast 160ms`, `--dur-base 320ms`, `--dur-slow 640ms`, `--dur-scene 900ms`.
- Easings: `--ease-out` `cubic-bezier(0.22, 1, 0.36, 1)` (entrances), `--ease-in-out`
  `cubic-bezier(0.65, 0, 0.35, 1)` (scene transitions), `--ease-spring` `cubic-bezier(0.34, 1.56, 0.64, 1)`
  (stat pops, playful accents).
- Named motion primitives (define once, reference by name): `motion-rise` (translateY + fade in on
  enter), `motion-count` (stat counter reveal), `motion-collapse` (niklasbubori text settle-together),
  `motion-ticker` (linear infinite marquee), `motion-dim-siblings` (grid hover — see §5).
- **`prefers-reduced-motion: reduce`** must disable marquees/parallax and fall back to simple opacity —
  state this token contract explicitly.

### 2.8 Breakpoints & z-index

Breakpoints: `--bp-sm 480px`, `--bp-md 768px`, `--bp-lg 1024px`, `--bp-xl 1280px`, `--bp-2xl 1600px`.
Z-index: `--z-base 0`, `--z-grid 1`, `--z-content 10`, `--z-nav 100`, `--z-toggle 110`, `--z-overlay 1000`.

---

## 3. Component registry — build every one, show each ONCE in the preview

Each component below must appear once in `ds-preview.html`, be listed in `ds-spec.yaml` (with its states),
and be a class in `ds-components.css` composed only from §2 tokens. Show all interactive **states**
(default / hover / active / focus-visible) as static side-by-side variants in the specimen where motion
can't be shown statically. Section IDs in parentheses are the real site anchors from `structure.md` §0.3 —
**reuse these names verbatim** so naming carries through to implementation.

### 3.1 Navigation + Recruiter/Builder toggle (`nav`)
- Slim top nav, mono uppercase links. Contains the **mode toggle**: two pills `RECRUITER` / `BUILDER`
  (`--r-pill`, mono eyebrow type). Active pill filled with `--c-accent` + `--c-on-accent` text; inactive
  is `--border-hair` ghost. This is easol's **section-swap control** — client-side state only, no routes.
  Default active = `RECRUITER`. Show both states.

### 3.2 Ticker band (`ticker`) — easol `.section--animated-tickers`, structural copy
- **Two rows, opposite scroll directions, CSS marquee** (`motion-ticker`, no JS). Row 1 = **stack pills**
  (mono, `--r-pill`, `--c-surface` bg, `--border-hair`). Row 2 = **fact phrases** with a leading icon,
  where the key numeral is wrapped in `--c-energy`. Provide the pill component and the phrase-chip
  component. Show ~5 pills + ~3 phrase chips as the specimen. Duplicate-content technique for seamless
  loop must be noted in the CSS.

### 3.3 Progress / timeline step (`timeline`) — easol progress pattern
- A horizontal (desktop) / vertical (mobile) **step** with: label (display), a **status tag** chip, and an
  expandable detail region. Status tag is a mono uppercase pill colored by semantic token:
  `[SHIPPED]`→`--c-status-shipped`, `[97.9% ACCURACY]`→`--c-status-win`, `[IN PROGRESS]`→
  `--c-status-progress` (amber, employment only), `[CLOSED — 4 MOS]`→`--c-status-closed`. Show one step in
  each of the four status colors so the semantic mapping is legible at a glance. Include the connector
  line (`--c-line`) with a "completed" fill in `--c-accent`.

### 3.4 Stat / counter block (cash.app) 
- A number set in `--t-mono-stat`, tabular-nums, with `motion-count` reveal and an optional
  `--glow-energy`. Show three: `97.9%`, `-51%`, `2–5×`. Include the label + source-caption slot
  (mono, `--t-small`, `--c-text-muted`) — every stat carries its verified source tag (e.g.
  `HiveMind` / `DOOM` / `PicPay`).

### 3.5 Flagship section shell (`projects-flagship`)
- A **full-bleed section frame** with: eyebrow (mono uppercase), big display title (`--t-display`/`--t-h1`),
  lead paragraph (`--t-body-lg`), a **hero-visual slot** (diagram OR device mockup), a callout-stat row,
  and a tag row. Provide it as a *shell/skeleton* with labeled slots — NOT six finished project pages.
  Crucially: the shell must support **intentionally unequal** layouts (left/right/centered asymmetry,
  variable accent flood) — expose layout modifier classes (`--layout-left`, `--layout-right`,
  `--layout-flood`) so each real project can look distinct (easol's explicit "don't make them all equal").
  Show ONE representative shell with placeholder slots + list the modifiers.

### 3.6 Gallery card — secondary (`gallery-secondary`)
- Larger card: title (`--t-h3`), one-line register-appropriate blurb, key-callout mono line, tag chips.
  `--c-surface` bg, `--r-lg`, `--border-hair`; hover → `--glow-accent` + sibling-dim participation.

### 3.7 Gallery card — archive (`gallery-archive`)
- Denser, smaller card, muted register: `--c-text-muted` body, warm (`--c-warm`) accent instead of blue
  for closed-chapter items. Show one archive card and note the register difference from 3.6.

### 3.8 Tag / pill / chip
- Base pill component (mono, uppercase, `--r-pill`, `--border-hair`) with variants: stack-pill,
  status-tag (colored per 3.3), and filter/skill chip.

### 3.9 Skills grid cell (`skills`) — vercel density
- Compact, mathematically-aligned grid cell: label + optional proficiency bar. Grouped headers
  (Languages / Frontend / Backend / Data & ML / Cloud & DevOps / Agentic-AI). Show one group of ~6 cells
  to demonstrate density + the sibling-dim hover.

### 3.10 Button / CTA
- Primary (filled `--c-accent`, `--c-on-accent` text, `--glow-accent` on hover), secondary (ghost,
  `--border-strong`), and link-with-arrow (mono). Show all three + focus-visible ring (`--c-accent-hi`,
  2px offset).

### 3.11 Device mockup frames (§6) — SVG/CSS, Apple only
- Provide reusable frame components: `mockup-iphone` (iPhone 16 Pro), `mockup-ipad` (iPad Pro/Air),
  `mockup-macbook` (MacBook Pro 14"), `mockup-studio-display` (Studio Display XDR), `mockup-browser`
  (generic browser chrome, for DOOM's "URL bar as device"). Each is a hand-built **SVG or pure CSS**
  frame with a content `<slot>` region and correct proportions/corner radii. Show each frame once,
  empty or with a neutral placeholder screen. **No stock device photos.**

### 3.12 Background grid overlay (§5)
- A tiling grid (`--c-grid` lines, cell ~`--s-8`) usable as a section background layer at `--z-grid`.
  Show it behind one specimen block. Must not reduce text contrast.

### 3.13 Section eyebrow + divider
- The mono uppercase eyebrow label and the hairline section divider used between scroll scenes.

---

## 4. Icon system

- Style: **stroke icons, 1.5px stroke, 24×24 grid, rounded joins/caps**, currentColor (inherits text
  color, so they retint per theme/accent automatically). Geometric and precise (vercel), not decorative.
- Provide a **small inline-SVG icon set** — each with a deep functional reason (per CLAUDE.md "each
  icon must have a deep reason"): `arrow-up-right` (external/link), `terminal` (TUI/CLI projects),
  `layers` (architecture/3-tier), `cpu` (ML/model), `git-branch` (CI/CD), `database` (data/SQL),
  `shield-check` (guard/rollback), `gauge` (performance/stat), `box` (Docker/container), `sparkles`
  (agentic/AI). Show all ten once in the specimen, at 24px, in `--c-text` and `--c-accent`.
- No emoji as UI icons. No icon fonts (CSP/quality) — inline SVG only.

---

## 5. Signature behaviors (define as token-driven CSS, minimal/no JS)

These are *system-level* behaviors the components must support. Express them in tokens + CSS so
implementation is consistent; JS only if truly unavoidable (and then note it explicitly in `ds-README.md`).

1. **One hover dims the whole grid** (easol) — `motion-dim-siblings`: within any `.grid-hoverable`
   container, `:hover` on a child raises it to full opacity/`--glow-accent` while siblings drop to
   `opacity: 0.45` + slight desaturation. Pure CSS (`:has()` / sibling selectors). Applies to ticker,
   gallery grid, skills grid.
2. **Background grid continuity** (§3.12) — present across sections at `--z-grid`.
3. **Scroll choreography hooks** (cash.app/niklasbubori) — components expose `motion-rise` /
   `motion-collapse` entrance classes; the DS defines the timing/easing tokens, the site wires them to
   scroll. Don't build a scroll engine here — just guarantee the motion vocabulary exists.
4. **Stat counters** — `motion-count` + tabular-nums, so numbers can animate up without layout shift.
5. **Ticker marquee** — `motion-ticker`, CSS keyframes, seamless via duplicated track.
6. **Reduced-motion contract** — all of the above degrade gracefully under `prefers-reduced-motion`.

---

## 6. Device mockup rules (carry into `ds-README.md`)

- **Apple devices only**, rendered as **hand-built SVG or pure CSS/HTML** — never stock photos, never
  GIF/MP4 where a CSS/SVG animation suffices (niklasbubori "avoid" note; CLAUDE.md §Mockups).
- Frame roster & default assignments (from `structure.md` §5): iPhone 16 Pro (mobile UIs: OffMode timer,
  Diabetes survey), iPad Pro/Air (HiveMind survey, TrocaTine marketplace), MacBook Pro 14"
  (architecture/code/Notes editor), Studio Display XDR (Notes on desktop), generic browser chrome (DOOM —
  the URL bar itself is the "device"). Keyboards/trackpads if shown: all-black or all-white Magic set, or
  all-gray/white MX set.
- Each frame is a token-consistent component with correct proportions and real corner radii; the screen
  content is a swappable slot.

---

## 7. Copy-register → design mapping (LARP guardrail, preserved VERBATIM from `structure.md` §0.2)

The **tone of a section must be reflected in its color and motion**, not just its words:

- **Shipped / live voice** (present-perfect, celebratory): applies to all flagships **and to Cloudflare
  Dashboard** (user-confirmed ~3 days from prod → written and *styled* as already shipped). Design
  treatment: blue `--c-accent` status, `motion-count` stat reveals, `--glow-accent`/`--glow-energy`
  permitted, kinetic entrances. **Never** use "coming soon" / "in progress" / "under development"
  language OR muted styling for these.
- **Closed-chapter voice** (past tense): applies to **dk-shipping** (ran 4 months, Jan–Apr 2024, not
  revived). Design treatment: **muted** — warm `--c-warm` accent instead of blue, `--c-text-muted` body,
  **no celebratory glow, no counter animation**, calmer `motion-rise` only. A closed venture must not
  borrow the live-product celebration. Honest, dignified, past.
- **Solved-challenge / coursework / community voice** (archive strip): neutral, dense, `--c-text-muted`,
  minimal motion — proof-of-range, not headline.
- **The ONE legitimate `[IN PROGRESS]`** in the whole system is the current PicPay **employment** row in
  the timeline (`--c-status-progress` amber). That amber must not appear on any *project* — only on the
  real, current job. Make this explicit in `ds-README.md` so it's never misapplied.

---

## 8. Constraints checklist (Fable 5 self-verify before finishing)

- [ ] `ds-preview.html` self-contained, **inline CSS**, **no JS** (or documented minimal exception).
- [ ] Every token in §2 shown once; every component in §3 shown once; all 10 icons (§4) shown.
- [ ] Palette anchored on the real `notes` seed colors (`#101010 #242424 #2DAAE4 #FF014F #C16D51`).
- [ ] Dark-first with working light override; both clear AA contrast for body text.
- [ ] Status semantic colors map exactly as in §3.3 / §7; amber reserved for employment only.
- [ ] Mockup frames are SVG/CSS, Apple-only, no stock photos.
- [ ] `prefers-reduced-motion` contract stated.
- [ ] Section/component names match `structure.md` §0.3 IDs verbatim.
- [ ] The four files agree; `ds-components.css` is the literal CSS behind `ds-preview.html`, tokens as
      `var(--…)` only in component rules.
- [ ] Generation order respected: preview → spec → css → readme.

---

## 9. What NOT to do (hard "avoid" list, aggregated from `CLAUDE.md` §Design)

- No centered single "product" hero object (cash.app/vercel avoid) — the subject is a *person*.
- No making all projects look equal — the flagship shell MUST support unequal, distinct layouts.
- No GIF/MP4 where CSS/SVG animation works; prefer SVG/PNG/JPEG assets and CSS motion.
- No tiny illegible cards — big readable type and cards.
- No ads/nagging redirect tags (the awwwards-honors-badge pattern).
- No invented stats, revenue, or facts — only verified numbers from `selected-projects.md` /
  `cv-enhancer/base.md` / `linkedin-profile.md`.
- No emoji/icon-font UI icons — inline stroke SVG only.
- No external font/asset loads inside `ds-preview.html` (keep it self-contained).
