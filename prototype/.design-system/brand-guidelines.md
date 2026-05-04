# kmadsdev Portfolio — Brand Guidelines

> Hard rules. The text-only canon for the portfolio at `kmads.dev`.
> When in doubt, this file wins over taste; `prototype/index.html` wins
> over this file.

---

## 1. Brand essence

**kmadsdev** is the personal brand of Kaique Souza — a software engineer
who's been building things in the open since 2018. The portfolio stands
for:

- **Production engineer at work, hobbyist after hours.** Same discipline
  in both contexts.
- **Show, don't pitch.** Numbers, timestamps, links to source — over
  adjectives.
- **Self-aware, not self-deprecating.** It's allowed to be honest about
  not having all the answers; it's not allowed to pretend that's a
  personality.
- **Built in the open.** Every project links to its repo. Legacy stuff
  stays visible. Failures stay visible.

**Tagline:** _50+ projects since 2018. Still no idea what I'm doing._

**One-liner:** Software engineer. Open-source by default. Currently
shipping at PicPay; tinkering at home.

---

## 2. Logo

### Files

- `assets/globe.svg` — primary mark. The rotating globe icon. Goes
  **big** in the hero.
- `assets/globe-text.svg` — accompanying outer ring with "kmadsdev"
  rotating text. Pairs with the globe.
- `assets/kmads_logo_zoomedout.png` — favicon and OG fallback (raster).

### Usage

| ✅ Do | ❌ Don't |
|---|---|
| Render the globe **massive** in the hero — let it occupy as much vertical space as the headline. It IS the brand. | Shrink it to a navbar icon. The wordmark is enough there. |
| Keep both rings (`globe.svg` + `globe-text.svg`) when both are visible — they're a lockup | Animate one without the other |
| Outer ring rotates at `20s` (clockwise). Inner globe rotates at `0s` (still — its motion is the position counter-rotating) | Reverse direction, change speed without an ADR |
| Wrap the globe in a **modular frame** (cell with bordered edge + indexed label) — that's the "blueprint" gesture | Place the globe over busy textures or photos |
| Navbar uses the wordmark `kmadsdev` in mono, no globe | Use the globe as a 30px favicon next to text — too detailed at that size |

### Lockup (hero)

```
┌──────────────────────────────────┬────────────────────────────────┐
│  00 / KMADSDEV                   │                                │
│                                  │      ┌──────────────────┐      │
│  Kaique Souza.                   │      │                  │      │
│  Software engineer.              │      │   ◯  globe-text  │      │
│                                  │      │   ◉  globe       │      │
│  50+ projects since 2018.        │      │                  │      │
│  Still no idea what I'm doing.   │      └──────────────────┘      │
│                                  │                                │
│  [ Resume ↓ ]  [ GitHub ↗ ]      │                                │
└──────────────────────────────────┴────────────────────────────────┘
```

---

## 3. Color

### Tokens (mirror of `prototype/styles/prototype.css :root`)

| Token | Value | Role |
|---|---|---|
| `--color-background` | `#0e0e10` | Canvas. The default everything sits on. Slightly cooler than pure black. |
| `--color-background-secondary` | `#131316` | Subtle alternate sections, module bodies. |
| `--color-background-elevated` | `#1a1a1f` | Cards, modules, elevated surfaces. |
| `--color-accent` | `#ff014f` | The single brand accent. CTAs, active links, highlights, glow centers. |
| `--color-accent-strong` | `#ff3d72` | Hover state, focus rings, gradient companion. |
| `--color-accent-dim` | `rgba(255, 1, 79, 0.12)` | Tinted backgrounds for code, chips, mono pills. |
| `--color-text` | `#ffffff` | Primary copy. |
| `--color-text-secondary` | `#c4cfde` | Subtitles, body copy on dark (kept from old portfolio — works). |
| `--color-text-muted` | `#6e7480` | Labels, captions, footnotes. |
| `--shield-bg` | `rgba(15, 12, 14, 0.72)` | `.blurred-shield` glass surfaces. |
| `--shield-border` | `#5a1530` | Border for shields and accent pills. Deep red, not bright. |
| `--module-line` | `#262629` | Module frame borders. Base weight. |
| `--module-line-soft` | `#1c1c1f` | Cell borders inside modules. Quieter. |
| `--module-line-strong` | `#3a3a40` | Hero stage frame, terminal cards. Earns more attention. |

### Rules

| ✅ Do | ❌ Don't |
|---|---|
| Use **one** accent (`--color-accent`) per section | Add secondary accents (blue, green, purple) — even if a project's logo is blue |
| Reach for `--color-accent-dim` for tinted backgrounds (mono pills, code blocks, hover halos) | Use solid `#ff014f` for large fills — it's a CTA color, not a wallpaper |
| Use `--color-text-muted` for eyebrows, indexed labels, project years, captions | Place `--color-text-muted` on `--color-background` for body copy — labels only |
| The "before" comparison state (when introduced) uses `#ff6b6b` only inside `.compare-card--before` | Use any other red anywhere |
| `::selection` is `var(--color-accent)` background with `var(--color-background)` text | Override |

### What changed from the old portfolio

- Background `#131313` → `#0e0e10` (slightly cooler, more depth on dark
  panels).
- Accent `#ff014f` **kept**. This is the recognizable kmadsdev signal.
- Text-gray `#c4cfde` **kept** (worked, no reason to break it).
- Added the full `--module-line-*` triplet from the agentic system to
  carry the modular composition.

---

## 4. Typography

### Families

- **Sans:** `Rubik`, weights 300/400/500/600/700/800/900 + italic — body,
  headlines, UI. Keeps the original portfolio's voice. **The universal
  font** — same family used across kmadsdev projects (workspace decision,
  see `WORKAHOLIC/.backlog/planning/universal-design-system-rubik.md`).
- **Mono:** `JetBrains Mono`, weights 400/500/600 — eyebrows, indexed
  section labels (`01 / WHO`), badges, code blocks, step numbers,
  micro-labels, tags.

Loaded via Google Fonts. System fallbacks in `--font-sans` /
`--font-mono`.

### Scale

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero `h1` | `clamp(56px, 8vw, 120px)` | 800 | Letter-spacing `-0.03em`, line-height `1.0` |
| Hero subtitle | `clamp(18px, 1.6vw, 22px)` | 400 | `--color-text-secondary` |
| Section `h2` | `clamp(32px, 4vw, 56px)` | 700 | Letter-spacing `-0.025em`, line-height `1.05` |
| Section subtitle | `clamp(15px, 1.2vw, 17px)` | 400 | `--color-text-secondary` |
| Card `h3` / `h4` | 16-18 px | 600/700 | Letter-spacing `-0.01em` |
| Body | 14-15 px | 400 | Line-height `1.6` |
| Nav links | 13 px | 500 | Mono. `--color-text-secondary`. |
| Button | 14 px | 600 | Letter-spacing `0.02em` |
| Indexed label / eyebrow | 11-12 px | 600-700 | **Mono**, `letter-spacing: 0.18em`, `text-transform: uppercase` |
| Caption | 11 px | 400 | `--color-text-muted` |

### Rules

| ✅ Do | ❌ Don't |
|---|---|
| Use `clamp()` for any text that crosses breakpoints | Hardcode `font-size: 56px` |
| Use **mono** for technical micro-copy: indexed labels, badges, tags, code, file paths | Use mono for body or headlines |
| Apply negative letter-spacing on headlines (`-0.01em` to `-0.03em`) | Apply letter-spacing to body copy |
| Italic 400 reserved for inline emphasis | Italic for whole paragraphs |
| Indexed labels always: `NN / SECTION` (mono, uppercase, `letter-spacing: 0.2em`, `--color-text-muted`) | Skip the index — it's the visual rhythm of the page |

---

## 5. Voice & content

### Tone — the "kmadsdev voice"

Distilled from the way Kaique actually writes:

1. **Auto-ironic with confidence.** The numbers earn the joke.
   ✅ "50+ projects since 2018. Still no idea what I'm doing."
   ❌ "I've built tons of cool stuff!"
2. **Numbers and timestamps first.** Years in parens, counts spelled out.
   ✅ "TrocaTine (2024). Java + Tomcat."
   ❌ "A really exciting e-commerce platform."
3. **Parallel constructions.** Comma-separated noun groups carry weight.
   ✅ "Software / Hardware / Mechanics."
   ❌ "Software, hardware, and also mechanics among other things."
4. **Short imperative CTAs.** Verbs only.
   ✅ "Resume", "GitHub", "View source"
   ❌ "Click here to download my resume", "Learn more about me"
5. **Sentence-case headlines with periods.** Periods make declarative
   statements feel like commits.
   ✅ "Software engineer. Open-source by default."
   ❌ "Software Engineer And Open Source Developer"
6. **Specific over vague.** Name the tools, the company, the year.
   ✅ "Allocated on the IT Corp / HR squad at PicPay."
   ❌ "Working on impactful enterprise initiatives."

### Rewriting the old copy

| Old | New |
|---|---|
| `👋 HELLO, MY NAME IS KAIQUE, ALSO KNOWN AS KMADS` | `00 / KMADSDEV` (mono eyebrow) + `Kaique Souza.` (h1) |
| `Software Engineer • Open-Source Developer` | `Software engineer. Open-source by default.` |
| `Full-time Engineer + Full-time student. I love contributing…` | `50+ projects since 2018. Still no idea what I'm doing.` |
| `About Me` | `01 / WHO` |
| `Hi! My name is Kaique Souza, i'm an systems engineer…` | `Systems engineer (software, hardware, mechanics). Born in Brazil. Building since 2018.` |
| `My professional journey and academic background` | `Where I worked. Where I studied.` |
| `Technologies and tools I work with` | `Tools I reach for. Agents I work with.` |
| `My featured Projects & Applications` | `Things I shipped. Links go to source.` |
| `Send Message 📩` | `Send` |
| `Become a Sponsor` | `Sponsor on GitHub` |

### Forbidden

- "Revolutionary", "magical", "innovative", "next-gen", "10x",
  "passionate", "world-class", "cutting-edge".
- Marketing exclamation marks (`!`) outside dialog quotes.
- Title-Case Headlines.
- "Click here" / "Learn more" / "Get started today".

### Emoji policy

**Production:** zero in shipped copy (headlines, body, sections).
Allowed temporarily as **icon placeholders** in cells/cards while real
SVG icons aren't ready — they get replaced before "ready to merge".
**Allowed in:** GitHub READMEs, changelog entries, this design system
when documenting the rule.

---

## 6. Motion

### Tokens

- `--transition-fast: 0.15s ease` — hover color shifts, micro-interactions.
- `--transition-base: 0.22s ease` — backgrounds, borders, box-shadows.
- `--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1)` — kept from old
  portfolio for fade-in reveals.

### Patterns

| Pattern | Spec |
|---|---|
| Globe rotation | Outer ring `20s linear infinite`. Inner globe still (counter-position via container). |
| Button hover | `translateY(-1px)` + `::after` overlay `rgba(255, 255, 255, 0.06)` |
| Card hover | `translateY(-2px)` + cell glow tint `rgba(255, 1, 79, 0.08)` |
| Scroll reveal | `.reveal` → opacity 0 → 1, `translateY(18px) → none`, `0.6s ease-out-expo` with `--d` stagger (0.05s, 0.1s, 0.15s…) |
| Navbar scroll | Adds `.scrolled`: background `rgba(14, 14, 16, 0.82)`, border-bottom `--module-line`, `backdrop-filter: blur(12px)` |
| Focus ring | `2px solid var(--color-accent-strong)` with `outline-offset: 3px` |

### Rules

| ✅ Do | ❌ Don't |
|---|---|
| Honor `@media (prefers-reduced-motion: reduce)` globally — disable globe rotation, disable reveal transforms | Add bounce, spring, elastic easings |
| Use Lenis (kept from old portfolio) for vertical smooth scroll only | Build scroll-jacking on top |
| Stagger reveals with `--d` in 50-100ms increments | Animate distances > 24px |

---

## 7. Iconography

- **Hand-tuned SVG only.** No icon library (Heroicons, Lucide, Feather).
- **Stack icons** in `assets/icons/` — vendor-original SVGs for languages
  and tools (Python, React, AWS…). Render at 24-32px.
- **Agent icons** — Claude Code, OpenCode, Codex, Copilot. Currently
  not in `assets/`; need to be sourced/created. **Until they exist,
  emoji placeholder is allowed in cells** (with a `data-todo="icon"`
  marker for `prototype/` find-and-replace).
- **Social icons** in `assets/social/` — kept from old portfolio.
  `*-red.svg` variants align with `--color-accent`.
- **UI icons** in `assets/ui/` — arrow-external, scroll arrow, etc.

---

## 8. Layout & spacing

- Container: `max-width: 1240px`, inline padding `clamp(20px, 4vw, 72px)`.
- Module max width: `1180px` (slightly tighter — borders breathe against
  the page bg).
- Section padding: `clamp(56px, 8vh, 104px)` vertical.
- Cell padding: `clamp(20px, 2.5vw, 32px)`.
- Cell min-height: 220px (consistent rhythm across sections).
- Radii: `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (20px),
  pill (999px).
- **Modular cells inside a module are radius-0.** Cards float, cells
  belong. Only chips/buttons/inputs get radius.

### Modular grid

12-column grid as background hairlines (`linear-gradient` painted into
`.module`). Cells snap with `grid-column: span N`. See
[`modular-design.html`](./modular-design.html) for the live anatomy.

### Diagonal stripe dividers

Three places only:
1. **Between sections** as the closer band (`.section__footer-stripe`).
2. **Top of footer** as the opener.
3. **Empty cells** rendered intentionally (the "negative space made
   visible" gesture from agentic).

Spec: `repeating-linear-gradient(135deg, transparent 0 18px,
var(--module-line) 18px 19px, transparent 19px 38px)`.

---

## 9. Accessibility floor

- Color contrast: WCAG AA minimum.
  - White on `#0e0e10` ✓
  - `#ff014f` on `#0e0e10` ✓ (4.7:1)
  - `--color-text-secondary` (`#c4cfde`) on `#0e0e10` ✓
- Focus states: visible `outline` on every interactive element
  (`:focus-visible`).
- Hit targets: 36×36 px minimum.
- `prefers-reduced-motion: reduce` disables globe rotation and reveal
  transforms.
- Alt text on every `<img>`. Decorative SVGs use `aria-hidden="true"`.
- Globe `<img>` carries a meaningful `alt="kmadsdev"` — it IS the brand.

---

## 10. Don't ship without

- Globe present in hero **and** kmadsdev wordmark in navbar.
- Indexed labels (`00 / …` through `-1 / THE END`) on every section.
- One single accent (`#ff014f`) per page region.
- Rubik loaded with `font-display: swap`.
- All headlines using `clamp()`.
- All animated elements honoring reduced-motion.
- Footer with link to `github.com/kmadsdev`, the LinkedIn, and the email.
- A diagonal stripe band closing the last content section before the
  footer (`-1 / THE END` opener handles the visual handoff).

---

## Owner

`@kmadsdev` · changes affecting this file require a commit message that
explains why. When in conflict with `prototype/index.html`, code wins —
update this file to catch up.
