# Base Portfolio Structure

Site map + section-by-section intent for kmads.dev, synthesized from `selected-projects.md`,
`github-README.md`, `linkedin-profile.md`, and `~/workaholic/github/cv-enhancer/base.md` (richest bio
source). Design DNA is fixed by `CLAUDE.md` §Design — this document maps that DNA onto real content.

Person, not product: every section frames Kaique ("kmads") as the subject — never a bank-app-style
centered hero object (explicitly ruled out for both cash.app and vercel inspirations).

---

## 0. Global mechanics (apply across all sections)

- **Scroll choreography** (cash.app): every section transition is a smooth, slide-like scroll — not a
  standard document scroll. Numbers, stat counters, and project media animate in/collapse as they enter
  the choreography, using HTML/CSS/JS transitions/animations — not GIFs/MP4s (per the niklasbubori
  "avoid" note).
- **Ticker band** (easol `.section--animated-tickers`): two rows, opposite scroll direction, synced to
  page scroll position. Row 1: tech stack pills (Python, TypeScript, Go, FastAPI, React, AWS, Docker,
  PostgreSQL…). Row 2: alternating icon + short real phrase pulled from verified facts (e.g. "97.9% ML
  accuracy" · "6 years shipping Discord apps" · "co-founded 2 startups" · "DOOM in a URL"). No invented
  stats — every phrase must trace to `selected-projects.md` or the CV.
- **Background grids** (easol): subtle grid overlay, present across sections for visual continuity.
- **One hover affects the whole grid** (easol): in every grid-based section (ticker, project gallery,
  skills), hovering one cell dims/de-saturates siblings rather than just highlighting the target.
- **Section-swapping buttons** (easol): at least one control point (likely nav or hero) lets a visitor
  jump the whole viewport into a different "mode" (e.g. Recruiter view vs. Builder view) — reframes
  which section is emphasized without literally being a different page.
- **All-uppercase text** used selectively for structural labels (nav, section eyebrows, ticker phrases)
  — never for body copy (niklasbubori pattern).
- **Mockups**: only Apple devices (iPhone 16 Pro/Pro Max, iPad Pro/Air M-series, MacBook Pro 14"/16",
  Studio Display XDR, Mac Mini/Studio) rendered as HTML/CSS/JS or hand-built SVGs — never stock device
  photos, never gifs/mp4s where an SVG+CSS animation can do the job.

---

## 1. Hero / Opening scroll-slide

- **Content:** Name (Kaique Souza / kmads), role tagline synthesized from LinkedIn headline ("AI
  Engineering and Agentic Workflows") + CV self-description (Software Engineer — distributed systems,
  SaaS, backend/cloud/AI). Not a static tagline — first scroll-slide reveal (cash.app-style) that builds
  the sentence as you scroll: e.g. "Software Engineer." → "...who ships SaaS, ML, and agentic systems."
- **What NOT to do:** no centered hero object standing in for "the product" — Kaique himself (name,
  short intro line) is the visual anchor, off-center per easol's "position that matters" principle.
- **Exit motion:** hero content collapses/slides to make way for the ticker band.

## 2. Ticker band (easol `.section--animated-tickers`, verbatim structural copy)

- Two synced counter-scrolling rows as described in §0. This is the "personality + credibility at a
  glance" strip before the visitor commits to reading further.

## 3. About / WHOAMI

- **Source:** `cv-enhancer/base.md` §WHOAMI — the "always curious... assembling and disassembling toys"
  origin story, 2018 Discord-bot start, current SaaS/OSS focus, teaching-aspiring-engineers angle.
- **Treatment:** niklasbubori-style choreography — text gradually scrolls/collapses together while a
  fixed image or icon set stays in place (mirroring the "Services overview" reference).
- **Includes:** language proficiency (EN full pro, PT native, ES limited), honors (Math Kangaroo bronze
  2024, beat a 2400-elo chess bot), interests (Muay Thai/boxing, chess, homelab, cars, quantum computing
  curiosity) — these humanize without inflating anything technical.

## 4. Experience timeline — "progress sections" (easol pattern, literal)

Render career history as a sequence of completed-state progress steps, e.g.:

```
Discord Era (2018) ... [SHIPPED] -> TrocaTine Co-Founder (2024) ... [SHIPPED]
  -> HiveMind Co-Founder / ML (2025) ... [97.9% ACCURACY] -> PicPay Data Engineer (2025) ... [SHIPPED]
  -> PicPay Software Engineer (2025-Present) ... [IN PROGRESS]
```

- **Source:** LinkedIn experience section + CV Work Experience (dates, stack, contributions) — reuse
  verified bullet points (e.g. "Improved query performance by 2-5x," "~99.999% reduction in AWS S3
  costs," "designed and optimized large-scale Oracle SQL queries across 200+ tables/views").
- Each step expands on interaction (click/hover) to reveal the stack + real contribution bullets for
  that role — keeps the timeline scannable at a glance, detailed on demand.

## 5. Flagship projects — one full-bleed section each (niklasbubori "one different presentation per
   project" pattern; sizes/alignments/media intentionally unequal per easol's explicit warning against
   making projects "look all equal")

Order (strongest recruiter-facing signal first, technical-depth closer at the end):

1. **OffMode** — 3-tier architecture diagram as the hero visual (frontend → gateway → backend), iPhone
   16 Pro mockup for the timer UI, MacBook Pro for the architecture/code view. Full-bleed, generous.
2. **HiveMind Client Potential Engine** (3 repos unified into one story) — presented as one product:
   survey UI (iPad mockup) + model accuracy stat (97.9%) + AWS EC2/S3 pipeline diagram. This is the
   founder/AI narrative — give it real weight, not a footnote.
3. **Diabetes Indicator** — before/after arc explicitly called out ("started as a CS50 final project →
   rebuilt into a live ML product with a public API"), iPhone mockup for the mobile-responsive survey,
   confidence-score result screen as the money shot.
4. **TrocaTine** — startup case study register (co-founder, team leadership, 4.5/5 ExpoTech rating),
   Java/PostgreSQL backend diagram, marketplace listing UI on iPad.
5. **Notes** — smallest footprint but most "crafted" — Monaco editor on MacBook Pro/Studio Display,
   design-token swatches shown directly (the repo's own documented palette: `#101010` / `#242424` /
   `#2DAAE4` / `#FF014F` / `#C16D51`) as a literal design-system callout within the section.
6. **DOOM Offline** — the technical-depth closer. Show the compression pipeline as a diagram (7MB → 4.4MB
   gzip, -51%), not just gameplay. This is the "look how far I'll push a browser" signal — treat it as
   a craft piece, not a product pitch.

## 6. Full project gallery (vercel-style dense grid — niklasbubori's `/projects` full-gallery pattern)

- Grid of remaining tiers, resolved 2026-07-08:
  - **Secondary (larger cards):** Custom Square, Agentic, **Cloudflare Dashboard** (promoted — user
    confirmed it's ~3 days from prod, so it's written and shown as already shipped, no "in dev" language).
  - **Challenges/Archive (dense strip):** DevOps Challenge, SWE Challenge 1 & 2, Engineer Student Tools,
    CS50x, **dk-shipping** (promoted from link-only to a compact case-study card: dropshipping
    electronics store, Jan–Apr 2024, 4-month run — presented as an honest early-founder data point).
  - TrocaTine keeps its own flagship section above; not duplicated here.
- Uniform card size, denser than the flagship sections, built for tech leads/talent scanning quickly —
  matches the "more detail for tech leads to know what the project is about" brief.
- Grid-hover-affects-siblings behavior (§0) applies here most visibly, since this is the largest grid.

## 7. Skills / Stack

- **Source:** CV's ranked lists (favorites vs. most-experienced) + LinkedIn skills.
- **Treatment:** vercel-style packed grid — dense, mathematically arranged, not a generic icon soup.
  Group by Languages / Frontend / Backend / Data & ML / Cloud & DevOps / Agentic-AI, mirroring the CV's
  own categories so nothing is invented.

## 8. Contact / footer

- Email (contact@kmads.dev), LinkedIn, GitHub, kmads.dev/projects link. Short direct CTA — matches the
  "packed with information but still sharp" brief; no filler.

---

## Section-swap "modes" (easol pattern applied)

Two lenses over the same content, toggled from the hero or nav, without literally being separate pages:

- **Recruiter mode** (default): leads with Experience timeline + flagship projects in recruiter-relevant
  order (OffMode, HiveMind, Diabetes Indicator first).
  - Career targets driving this framing (`CLAUDE.md` §My Career Goals): mid-level SWE / fullstack first,
    junior as fallback, AI-engineering / agentic-workflow angle secondary — the ordering above should
    keep backend+ML credibility ahead of the DOOM craft-piece, matching that priority.
- **Builder mode**: re-orders to foreground DOOM Offline, Notes, and the Agentic template's CI/CD
  guard-rail system first — the "I build for the craft of it" register, for technical peers/tech leads.

---

## Open questions — resolved by user, 2026-07-08
1. **dk-shipping:** confirmed as a dropshipping electronics store, Jan–Apr 2024 (4 months). Promoted to
   an archive-tier case-study card (§6).
2. **Cloudflare Dashboard:** confirmed done, ~3 days from prod — write it up as shipped (§6), promoted
   out of Secondary-link-only into a full Secondary card.
3. **BurnRate:** skipped, not added to the portfolio.
4. **OffMode desktop (Tkinter):** skipped — that was the old, now-deprecated kmads.dev/offmode. Current
   OffMode (§5.1) is web-only (React); never reference a desktop variant.
