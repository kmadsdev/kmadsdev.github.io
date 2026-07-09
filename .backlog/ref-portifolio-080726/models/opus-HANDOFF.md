# HANDOFF — Step 6 (Opus 4.8) → Step 7 (Fable 5): kmads.dev full rebuild

> **How to use this file.** You are **Fable 5**, running **`ultraplan` → `ultracode`**. This document is
> your *entire* brief and single source of truth. **First** run `ultraplan` against it to produce the
> build plan (§10 gives you a ready decomposition to refine). **Then** run `ultracode` to implement.
> Everything you need is inline; the `ds-*` / `structure.md` / `selected-projects.md` files in
> `~/workaholic/.backlog/ref-portifolio-080726/` are the authoritative long-form references.
>
> **Lineage:** Step 1 (Haiku) selected projects → Step 2/3 (Sonnet) `base-structure.md` + `structure.md`
> → Step 4 (Opus) `claude-design-prompt.md` → Step 5 (Claude Design/Fable 5) the four `ds-*` files →
> **Step 6 (Opus, this file)** turns the delivered design system into your implementation brief.
> Design decisions are settled upstream — **execute them, do not re-litigate.**

---

## 0. TL;DR
Rebuild **kmads.dev** as a dark, editorial, engineering-grade portfolio presenting **Kaique "kmads"
Souza — a Software Engineer (a person, never a centered product object)**, driven entirely by the Claude
Design system already in this folder. React 18 + Vite 5 + **TypeScript** + Lenis, on branch `fable-ref`
of `~/workaholic/project/kmadsdev.github.io`. 8 sections, 6 bespoke flagship projects, Recruiter/Builder
mode toggle, dual-ticker, easol progress timeline, Apple-only CSS/SVG device mockups. Verified facts
only. Build, verify locally, **do not deploy.**

---

## 1. Hard constraints (user-locked 2026-07-08 — binding)
1. **Source of truth = `.backlog/ref-portifolio-080726/`**: `ds-spec.yaml`, `ds-components.css`,
   `ds-preview.html`, `ds-README.md`, `structure.md`, `selected-projects.md`, `base-structure.md`.
   **IGNORE all pre-existing repo content**: `prototype/`, root `.design-system/`, current `src/**`,
   `constants.js`, `projects.json`, old tokens (`#131313`/`#1e1e1e`/`#ff014f`). `src/` is replaced whole.
2. **TypeScript** — `.tsx`/`.ts` throughout (migrate off the current `.jsx`).
3. **Comprehensive build** — no budget phasing; build the entire site to a high bar (ultracode).
4. **Prescriptive** — this brief front-loads decisions; refine the *plan*, not the *design*.
5. **Mockup screens = blend** — screenshot live projects where it reads well; hand-build CSS/SVG for the
   rest (§8).
6. **LARP guardrails binding** (§7): verified facts only; register→color/motion enforced; amber
   `[IN PROGRESS]` on the PicPay employment row ONLY.
7. **No auto-deploy.** Build + verify locally, then stop. The user runs `npm run deploy`.

---

## 2. Target repo, stack, TS migration
- **Repo:** `~/workaholic/project/kmadsdev.github.io` — **`project` singular** (CLAUDE.md's `projects`
  plural does NOT exist; do not create it).
- **Branch:** `fable-ref` (checked out). Commit in logical chunks. Do not push or deploy.
- **Stack (keep — already wired):** React 18 + Vite 5 + Lenis + gh-pages → **kmads.dev**
  (`gh-pages -d dist --cname kmads.dev --nojekyll`; CNAME committed). Same family as `~/workaholic/github/agentic`.
- **TS migration:**
  - dev deps: `typescript @types/react @types/react-dom @types/node`.
  - `tsconfig.json` + `tsconfig.app.json` + `tsconfig.node.json` (mirror `agentic/`).
  - `vite.config.js` → `vite.config.ts`; `build` = `tsc -b && vite build`; add `typecheck` = `tsc -b --noEmit`.
  - **Drop `react-icons`** (DS mandates a local inline-SVG stroke set, §3.3). Keep `react-router-dom`
    only if you keep a separate `/projects` route (default = single-scroll, gallery inline → router optional).
  - Wipe `src/**`, rebuild per §4.

---

## 3. Design-system integration (`ds-*` → app)

### 3.1 Tokens
Copy `ds-components.css` **verbatim** to `src/design-system/tokens.css`; import once in `main.tsx`. It is
the literal CSS behind `ds-preview.html`: `:root` dark defaults, `[data-theme="light"]` +
`prefers-color-scheme` light override, all `@keyframes`, every component class, reduced-motion block.
**Never fork or re-derive token values.** Component rules already reference `var(--…)` only.

### 3.2 Class contract (use verbatim — 1:1 with `ds-spec.yaml`; confirmed against `ds-components.css`)
- **Type:** `.t-display .t-h1 .t-h2 .t-h3 .t-body-lg .t-body .t-small .t-eyebrow .t-mono-stat`
- **Motion:** `.motion-rise .motion-count .motion-collapse .motion-ticker`; container `.grid-hoverable`
  (hover one child → siblings dim 0.45 + desaturate, pure CSS `:has()`).
- **nav:** `.nav .nav__brand .nav__links .nav__link` · **mode-toggle:** `.mode-toggle .mode-toggle__pill`
  (active = `.is-active`, default active = RECRUITER).
- **ticker:** `.ticker .ticker__row .ticker__row--reverse .ticker__track .ticker__set` · row-1 pill
  `.pill--stack` · row-2 `.fact-chip` (`.fact-chip__num` = numeral in energy). Track holds **two
  byte-identical `.ticker__set` copies** → seamless −50% loop. Pause on `.ticker:hover`.
- **timeline:** `.timeline .timeline__step .timeline__rail .timeline__node .timeline__label
  .timeline__tag .timeline__detail`; completed steps get `.is-complete` (fills rail+node blue).
  Horizontal ≥768px, vertical below (already in CSS).
- **stat:** `.stat .stat__value .stat__label .stat__source`; win modifier `.stat--win` (energy + glow).
  **Every stat MUST fill `.stat__source`.**
- **projects-flagship:** `.projects-flagship .projects-flagship__copy .projects-flagship__visual
  .projects-flagship__stats .projects-flagship__tags`; modifiers **`.projects-flagship--layout-right`**
  and **`.projects-flagship--layout-flood`**; **`--layout-left` is the default (no class).**
- **gallery:** `.gallery-secondary` (`__title __blurb __callout __tags`) · `.gallery-archive`
  (`__title __blurb __callout`).
- **pill:** `.pill` + `--stack --status-shipped --status-win --status-progress --status-closed --chip`.
- **skills:** `.skills .skills__cell .skills__name .skills__bar` (bar fill via inline `--fill` prop;
  3-col ≥768px, 2-col below).
- **btn:** `.btn` + `--primary --ghost --link` (focus-visible ring already global).
- **mockups:** `.mockup-iphone` · `.mockup-ipad` · `.mockup-macbook`(`__lid __base`) ·
  `.mockup-studio-display`(`__screen __stand __foot`) · `.mockup-browser`(`__bar __dot __url __body`);
  inner screen slot always `.mockup__screen`.
- **misc:** `.bg-grid` (grid overlay at `--z-grid`, content at `--z-content`) · `.eyebrow` · `.divider`
  · `.icon`.

### 3.3 Icons
Lift the 10 inline `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">…</svg>` defs from `ds-preview.html`
into one `src/icons/Icon.tsx` (`name` union). Set + meaning: `arrow-up-right`(external), `terminal`(TUI/
CLI), `layers`(architecture/3-tier), `cpu`(ML/model), `git-branch`(CI/CD), `database`(data/SQL),
`shield-check`(guard/rollback), `gauge`(performance/stat), `box`(Docker/container), `sparkles`(agentic/AI).
**No emoji, no icon fonts.**

### 3.4 Device frames
Frames are pure CSS (in `tokens.css`) + markup shells in `ds-preview.html`. Port each into a React
component under `src/components/mockups/` exposing a `children` slot rendered inside `.mockup__screen`.

### 3.5 Typography (Rubik — closes the open item from prior handoff)
Production MUST load **Rubik** 500/600/700/800 (`--font-display`) + a JetBrains Mono / SF Mono stack
(`--font-mono`). Self-host Rubik or `<link>` it in `index.html`; the preview's system fallback is
specimen-only. **UPPERCASE only for `.t-eyebrow`-class labels — never body copy.** Stat numerals use
`tabular-nums` (already in the class).

### 3.6 Theme
Dark is primary/showcased. Ship dark; `prefers-color-scheme` handles auto-light. Only wire a `data-theme`
switch if you add a visible toggle (optional, not required).

---

## 4. App architecture

```
src/
  main.tsx                    # import tokens.css + fonts; mount <App/>
  App.tsx                     # <ModeProvider> + Lenis; renders sections in mode order
  index.css                   # only @font-face / wiring not already in tokens.css
  types.ts                    # Project, TimelineStep, Stat, Mode, IconName
  constants.ts                # ALL verified copy/facts from §6 — NOTHING invented
  context/ModeContext.tsx     # 'recruiter'|'builder', default 'recruiter', localStorage-persisted
  hooks/
    useLenis.ts               # "fluid PowerPoint" smooth scroll
    useScrollReveal.ts        # add .motion-rise/.motion-collapse when a section enters viewport
    useCountUp.ts             # animate .stat__value up on reveal (tabular-nums, no layout shift)
  design-system/tokens.css    # = ds-components.css (verbatim)
  icons/Icon.tsx              # 10 inline stroke SVGs
  components/
    Nav.tsx  ModeToggle.tsx  Ticker.tsx  Hero.tsx  About.tsx  Timeline.tsx
    ProjectsFlagship.tsx  FlagshipSection.tsx  ProjectsGallery.tsx  Skills.tsx  Contact.tsx
    mockups/{IPhone,IPad,MacBook,StudioDisplay,BrowserChrome}.tsx
    primitives/{Button,Pill,StatBlock,StatusTag,Eyebrow,BgGrid,FactChip}.tsx
    visuals/{ThreeTierDiagram,HiveMindPipeline,DoomCompression,PaletteStrip}.tsx  # hand-built SVG
```

**Section order (both modes):** `nav → hero → ticker → about → timeline → projects-flagship →
projects-gallery → skills → contact` (anchor IDs verbatim from `structure.md` §0.3).
**Flagship order by mode:**
- **Recruiter (default):** OffMode → HiveMind → Diabetes Indicator → TrocaTine → Notes → DOOM.
- **Builder:** DOOM → Notes → *(Agentic CI/CD callout)* → OffMode → HiveMind → Diabetes → TrocaTine.
**Mode toggle:** re-orders flagships + swaps the lead ticker phrase ONLY. Client state, no route/reload
(keeps cash.app momentum). Nothing hidden in either mode — same content, different emphasis.

---

## 5. Section build spec (DS component → treatment)
Full per-project asset detail: `structure.md` §1–§8. Content: §6 below. **Vary flagship modifier + accent
flood so no two look equal** (easol rule — binding).
- **hero** — `.t-display` name, off-center, person-not-product. Scroll-built tagline (`.motion-rise`
  word-by-word): Recruiter leads "Software Engineer…"; Builder leads "…ships SaaS, ML & agentic systems —
  once fit DOOM into a URL." No emoji. Scroll cue.
- **ticker** — Row 1: 10 `.pill--stack` (stack list §6). Row 2: `.fact-chip`s (numeral in `__num`). Two
  `.ticker__row` (one `--reverse`); `.grid-hoverable`.
- **about** — `.motion-collapse` continuous paragraph (WHOAMI arc, §6) + fixed aside of honor/interest
  `.pill--chip`s.
- **timeline** — 6 `.timeline__step` (§6 table); status pill per row; mark all but the last `.is-complete`.
- **projects-flagship** — one `.projects-flagship` per project; layout + visual per §6/§8.
- **projects-gallery** — 3 `.gallery-secondary` (live/blue) + 6 `.gallery-archive` (muted); `.grid-hoverable`.
- **skills** — grouped dense `.skills` grid (groups §6); `.grid-hoverable`.
- **contact** — `.btn` row (§6).

---

## 6. Verified content appendix (SELF-CONTAINED — no invented facts; every number traces here)

**Identity.** Kaique "kmads" Souza — Software Engineer, Brazil. LinkedIn headline "AI Engineering and
Agentic Workflows"; CV self-description: distributed systems, SaaS, backend/cloud/AI. **8 years total,
~3 focused on SWE.** Email **contact@kmads.dev**; GitHub `kmadsdev`; site kmads.dev + kmads.dev/projects.
Langs: **EN full-professional, PT native, ES limited.** Honors: **Math Kangaroo bronze 2024**; **beat a
2400-elo chess bot.** Interests: Muay Thai/boxing, chess, homelab, cars, quantum-computing curiosity.
WHOAMI arc: curious kid assembling/disassembling toys → **2018 Discord bots** → SaaS/OSS + teaching
aspiring engineers today.

**Ticker row 1 (stack pills):** Python · TypeScript/JavaScript · Go · PHP · FastAPI · React · Node.js ·
AWS · PostgreSQL · Docker.
**Ticker row 2 (facts, Recruiter order):** 97.9% ML accuracy (HiveMind) · 3-tier production architecture
(OffMode) · co-founded 2 startups · 8 years shipping software · ~99.999% AWS S3 cost reduction (HiveMind).
**Builder lead swaps in:** DOOM in a URL · hand-rolled RFC 1951/1952 inflate · Monaco browser editor ·
auto-revert CI/CD guard (Agentic).

**Timeline (6 steps):**
| Step | Window | Status tag | Verified detail |
|---|---|---|---|
| Discord Era | 2018–2023 | `[SHIPPED]` | 6 yrs, 10k+ member communities, Node.js/Discord.js/Java, Minescord plugin |
| dk-shipping | 2024-01→04 | `[CLOSED — 4 MOS]` | dropshipping electronics store, honest 4-month run |
| TrocaTine (Co-Founder) | 2024-01→12 | `[SHIPPED]` | led frontend + landing; Java/Tomcat/Maven/JDBC backend; PostgreSQL modeling; 4.5/5 @ ExpoTech 2024 |
| HiveMind (Co-Founder/ML) | 2025-01→12 | `[97.9% ACCURACY]` | modeled/trained/deployed ML; ~99.999% AWS S3 cost reduction; EC2+S3 API |
| PicPay — Data Engineer | 2025-03→11 | `[SHIPPED]` | Oracle SQL across 200+ tables/views; 2–5× query performance gains |
| PicPay — Software Engineer | 2025-11→Present | `[IN PROGRESS]` | BU Cards/Credit, HR Division, BU Bills/Vehicle Hub; Project Survey (PHP/Hyperf/Angular/MySQL/Redis); BodyShop (Go/Gin/React/Python/MongoDB/AWS) |

`[IN PROGRESS]` amber (`--c-status-progress`) appears on this last row ONLY — nowhere else in the site.

**Flagships (6):**
1. **OffMode** — Pomodoro productivity app; **3-tier**: React frontend → Express gateway → FastAPI/
   PostgreSQL (Supabase). Auth (email/password + Google OAuth), **cloud backup every 15 min**, streaks,
   focus-session tracking. Vite, JWT, Vercel serverless. Live kmads.dev/offmode. **Web-only** — never
   mention a desktop/Tkinter variant (deprecated). Register: shipped/live. Layout: `--layout-left`.
   Visual: 3-tier diagram (hand-built SVG) + iPhone (timer) + MacBook (code/arch).
2. **HiveMind Client Potential Engine** (3 repos as one product) — 10-question survey predicting a
   sales-qualified lead; **Logistic Regression / Random Forest, 97.9% accuracy**; FastAPI on **AWS EC2**
   pulling the model from **S3**; Python/scikit-learn/pandas/SQL(MySQL)/boto3. **~99.999% AWS S3 cost
   reduction.** Startup Jan–Dec 2025 (artifact still demonstrable → present-product voice). Layout:
   `--layout-right`. Visual: iPad (survey) + EC2/S3 pipeline diagram; `.stat--win` 97.9% + ~99.999%.
3. **Diabetes Indicator (+ backend)** — 17-question health survey → FastAPI + scikit-learn (public Kaggle
   dataset) → risk + **confidence %**; BMI calc, dark theme, mobile-first; vanilla HTML/CSS/JS frontend;
   API **`/predict` `/health` `/models`**; **v1.1.0** changelog. Live kmads.dev/diabetes-indicator.
   Origin: **CS50 final project → rebuilt into a live ML product** (cross-link to CS50x in archive).
   Layout: `--layout-left`. Visual: iPhone (mobile survey), confidence-score result as the money shot.
4. **TrocaTine** — sustainability **marketplace** for exchanging/selling children's items; **co-founded
   Jan–Dec 2024**; Java (Tomcat/Maven/JDBC/JSP) backend, PostgreSQL, vanilla landing. **4.5/5 stars +
   massive approval rate at ExpoTech 2024** (verbatim — do not embellish). Past-tense co-founder case
   study. Layout: `--layout-right`. Visual: iPad (marketplace listing) + Java/PostgreSQL backend diagram.
5. **Notes (BrowserNotes)** — VSCode-inspired in-browser editor, **single HTML file, Monaco engine,
   File System Access API** autosave-to-disk; previews **Markdown/YAML/JSON/Swagger/PlantUML**. Its own
   documented design tokens `#101010 #242424 #2DAAE4 #FF014F #C16D51`. Live kmads.dev/notes. Layout:
   `--layout-flood` (or minimal). Visual: MacBook/Studio-Display (Monaco) + literal palette strip of
   those tokens (a design-system callout, not just a screenshot).
6. **DOOM Offline** — DOOM (1993) compiled to **WASM** (linuxdoom-1.10 via Clang→wasm32) + a hand-written
   **MicroDOOM** raycaster; gzip+base64 into a **self-extracting HTML/data-URI** (zero hosting). Vanilla
   JS, Python encoding pipeline, **hand-rolled RFC 1951/1952 inflate in JS**. **−51% size** (7MB→4.4MB
   gzip); **MicroDOOM 44KB** ("smaller than a favicon"). Live kmads.dev/doom. **Craft piece, not a
   product pitch.** Layout: `--layout-left`. Visual: `.mockup-browser` (URL bar IS the device) +
   compression-pipeline diagram (hand-built SVG), not gameplay footage.

**Gallery — secondary (`.gallery-secondary`, live/blue register):**
- **Custom Square** — real-time CSS property/gradient/color playground; vanilla JS; localStorage theme
  persistence. Live kmads.dev/custom-square. Utility voice, not inflated.
- **Agentic** — React + Vite + TS landing, Lenis smooth scroll, self-hosting (built with its own
  template). **Surface the CI/CD:** typecheck + test gates, gh-pages guard workflow with
  **auto-revert-on-failed-smoke-test** + auto-filed incident issues, **secret scanning** (more impressive
  than the landing itself). Live kmads.dev/agentic *(confirm deployed state before wording as "live")*.
- **Cloudflare Dashboard** — Python **Textual TUI** + **FastAPI** backend for Cloudflare zone analytics,
  DNS records, page rules; **Docker-composed** (dev + prod). **Shipped voice** (user-confirmed ~3 days
  from prod) — **never** "coming soon"/"in development." Private repo.

**Gallery — archive (`.gallery-archive`, muted):**
- **DevOps Challenge** — PicPay Jr DevOps/SRE take-home; **Docker-composed 4-service** (Node.js web,
  Python writer, Go reader, Redis); arch diagram in repo.
- **SWE Challenge 1** — alerts/incidents/metrics REST API; MySQL schema, Prometheus-style `/metrics`,
  JSON logging; `app/ frontend/ docker/`.
- **SWE Challenge 2** — same brief, **TUI variant** (`python -m tui`) + `API-TESTING.md` — "solved the
  same problem twice with a different architecture" (range signal).
- **Engineer Student Tools** — curated free dev tools/credits via GitHub Student Pack (**~$5,000+ value**);
  community contribution, not code.
- **CS50x** — Harvard coursework (Scratch→C→Python→SQL→Flask→final); final project → **ancestor of
  Diabetes Indicator** (before/after arc).
- **dk-shipping** — dropshipping electronics store, **Jan–Apr 2024, 4-month run**; **closed chapter**
  (warm `--c-warm`, muted, no glow/counter). **Do NOT invent** revenue/order-volume/supplier detail.

**Skills groups (exactly, per CV — no invented groupings):** Languages · Frontend · Backend · Data & ML ·
Cloud & DevOps · Agentic-AI.
**Contact:** contact@kmads.dev · LinkedIn · GitHub (`kmadsdev`) · kmads.dev/projects. Short, no filler.

---

## 7. LARP / copy-register → design mapping (BINDING — `ds-README.md` §register, `structure.md` §0.2)
- **Shipped/live voice** → blue `--c-accent`, `.motion-count` stat reveals, `--glow-accent`/`--glow-energy`
  allowed, kinetic entrances. Applies to **all 6 flagships + Cloudflare Dashboard**. **Never** write
  "coming soon"/"in progress"/"under development" or use muted styling for these.
- **Closed-chapter voice** → muted, warm `--c-warm`, `--c-text-muted` body, `.motion-rise` only, **no
  glow, no counters**. **dk-shipping** only.
- **Archive/coursework/community** → neutral, dense, muted, minimal motion.
- **Amber `--c-status-progress` = PicPay employment row ONLY.** If about to put amber on anything that
  isn't the real, current job — stop.
- **No invented numbers.** Every stat traces to §6 / `selected-projects.md` / `cv-enhancer/base.md` /
  `linkedin-profile.md` and fills `.stat__source`. No emoji UI. No stock device photos. No GIF/MP4 where
  CSS/SVG works. Not all flagships equal. No centered product-object hero.

---

## 8. Mockup screens — blend (screenshot live + hand-build)
Device **frames** = DS CSS components (Apple only). Fill each `.mockup__screen`:
| Project | Frame(s) | Screen source |
|---|---|---|
| OffMode | iPhone + MacBook | **screenshot** kmads.dev/offmode → `public/mockups/`; + hand-built 3-tier SVG |
| Diabetes Indicator | iPhone | **screenshot** kmads.dev/diabetes-indicator |
| Notes | MacBook / Studio Display | **screenshot** kmads.dev/notes; + hand-built palette strip |
| DOOM | browser chrome | **screenshot** kmads.dev/doom; + hand-built compression diagram |
| HiveMind | iPad | **hand-build** survey UI + EC2/S3 pipeline diagram (no separate live UI) |
| TrocaTine | iPad | **hand-build** marketplace listing + Java/PG backend diagram |
| Cloudflare Dashboard | MacBook/terminal | **hand-build** Textual TUI rendition |

Capture via the browser tool (`mcp__claude-in-chrome__*`) against the live paths; store PNG/JPEG under
`public/mockups/`, reference by relative path. Frames stay CSS; screens are `<img>` or hand-built SVG/CSS
inside `.mockup__screen`. Keyboards/trackpads, if ever shown: all-black or all-white Magic set, or
all-gray/white MX set.

---

## 9. Motion & scroll choreography
- **Lenis** for the "fluid PowerPoint" scroll (cash.app). `useScrollReveal` adds `.motion-rise` /
  `.motion-collapse` on section enter; `useCountUp` drives `.stat__value` counters (tabular-nums, no
  layout shift). Ticker = CSS `.motion-ticker` (two identical sets, −50%), no JS.
- **`prefers-reduced-motion`**: tokens already degrade marquees/entrances to opacity; **also gate the JS
  counters** so they settle to final value instantly.
- **One-hover-dims-grid** (`.grid-hoverable`) on ticker, gallery, skills — pure CSS, no JS.
- **JS policy (from `ds-README.md`):** the DS needs none; the only sanctioned JS is scroll choreography,
  the count-up, and the Recruiter/Builder toggle state.

---

## 10. Suggested ultraplan → ultracode orchestration (refine in your plan phase)
Decomposed so `ultracode` can fan out safely. Interfaces between units = the DS class contract (§3.2) +
the content appendix (§6), so section agents are independent once the foundation exists.

- **Phase A — Foundation (SEQUENTIAL; everything depends on it).** Branch check `fable-ref`; wipe
  `src/**`; TS scaffold + tsconfigs; `tokens.css` (verbatim); load Rubik; `Icon.tsx` (10 SVGs); the 5
  mockup frame components; `primitives/*`; `ModeContext`; `useLenis`/`useScrollReveal`/`useCountUp`;
  empty `constants.ts` typed by `types.ts`. **Gate:** `tsc -b` green, tokens render.
- **Phase B — Sections (PARALLEL; one agent per unit, all read §3.2 + §6).** `nav`+`ModeToggle` ·
  `hero` · `ticker` · `about` · `timeline` · `skills` · `contact` · `projects-gallery` · **and each of
  the 6 flagships** (`FlagshipSection` variants) as its own unit — they are independent full-bleed
  sections with distinct layouts/floods. Populate `constants.ts` per unit (no cross-writes: give each
  section its own constants module, or assign disjoint keys).
- **Phase C — Assets (PARALLEL, independent of B).** Screenshot the 4 live projects (OffMode, Diabetes,
  Notes, DOOM) → `public/mockups/`. Hand-build the SVG visuals: OffMode 3-tier diagram, HiveMind EC2/S3
  pipeline, DOOM compression pipeline, HiveMind survey screen, TrocaTine listing, Cloudflare TUI, Notes
  palette strip.
- **Phase D — Integrate + verify (SEQUENTIAL after B/C).** Assemble `App.tsx` section order + mode
  toggle; wire Lenis + reveal + count-up; `tsc -b && vite build`. Then an **adversarial verification
  pass** (fan out independent checkers, one per guardrail):
  1. **LARP audit** — every stat sourced; no invented numbers; Cloudflare in shipped voice (no "coming
     soon"); dk-shipping muted (no glow/counter); amber ONLY on PicPay employment.
  2. **DS fidelity** — components use DS classes only; no hard-coded color/space/radius in app CSS.
  3. **a11y** — AA body contrast dark + light; `prefers-reduced-motion` disables motion incl. counters;
     focus-visible rings present.
  4. **Distinctiveness** — the 6 flagships genuinely look unequal (layout modifier + flood vary).
  5. **Responsive** — clean at 390px (iPhone) and ≥1280px; ticker loop seamless; timeline flips to vertical.
  Fix findings, re-verify. **Gate:** all pass.
- **Phase E — Deliver.** Commit on `fable-ref` in logical chunks. **Do NOT deploy.** Summarize what was
  built + how to `npm run deploy`.

---

## 11. Acceptance checklist (self-verify before handing back)
- [ ] `src/` fresh TS; old `.jsx`/`constants.js`/`projects.json`/`prototype/` unused.
- [ ] `tokens.css` == `ds-components.css` verbatim; app uses DS classes 1:1; no hard-coded design values.
- [ ] All 8 sections; anchor IDs = `structure.md` §0.3; Recruiter/Builder re-order works.
- [ ] 6 flagships, intentionally unequal; each visual per §8; screenshots captured + hand-built diagrams present.
- [ ] Rubik loaded in production; mono pairing set; UPPERCASE only on eyebrow-class.
- [ ] Register mapping enforced (§7); amber employment-only; every stat has `.stat__source`; no invented facts.
- [ ] Mockups Apple-only, no stock photos, no GIF/MP4; no emoji/icon-font icons.
- [ ] `tsc -b && vite build` green; AA contrast (both themes) + reduced-motion pass; mobile + desktop pass.
- [ ] Committed on `fable-ref`, **NOT deployed**.

---

## 12. DS ↔ contract compliance (verified by Step 6 — FYI, no action)
The delivered DS passes the `claude-design-prompt.md` §8 checklist: self-contained **JS-free** preview
(0 `<script>`); palette anchored on the `notes` seed `#101010 #242424 #2DAAE4 #FF014F #C16D51`;
dark-first + working light + reduced-motion; status semantics exact (amber employment-only); 10 inline
stroke icons; 5 Apple mockups pure-CSS; section names = `structure.md` §0.3 verbatim; four files agree.
**Additive tokens beyond the original prompt (use them):** `--c-frame`, `--c-frame-edge`, `--c-screen`
(mockup chassis/screen), `--dur-ticker`/`--dur-ticker-rev` (marquee), device radii
`--r-iphone*/--r-ipad*/--r-macbook`. Real flagship modifier classes = `.projects-flagship--layout-right`
/ `--layout-flood`; `--layout-left` is default (no class).
