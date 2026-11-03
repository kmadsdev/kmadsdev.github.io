# Portfolio Structure — Robust Plan (Step 3)

Concrete structure spec built on `base-structure.md` (site map) and `selected-projects.md` (tiered,
now-resolved project list). This turns the abstract map into section IDs, content slots, per-project
asset lists, and one concrete decision on the Recruiter/Builder mechanic — everything Step 4 (Opus,
Claude Design prompt) and Step 5 (Fable 5 design tokens) need without re-deriving intent.

Per the user's instruction: **stop after this step.** Do not proceed to Step 4.

---

## 0. Global spec decisions

### 0.1 Recruiter/Builder mode — concrete mechanism
- **Implementation:** single persistent toggle pinned in the nav (two pills: `RECRUITER` / `BUILDER`,
  all-caps per the niklasbubori structural-label rule). Not two routes, not a hard page reload — a
  client-side state flag that:
  1. Re-orders the flagship project sequence (§5) between two pre-defined orderings.
  2. Swaps which phrase leads the ticker band (§2).
  3. Persists via a simple in-memory/localStorage flag — no backend needed.
- **Why this shape:** keeps the "one fluid scroll" cash.app quality intact (no route swap breaks
  momentum) while still giving two honest lenses over the same real content — nothing is hidden in
  either mode, only order and emphasis change.
- **Default on load:** Recruiter mode (matches the CLAUDE.md career-goals priority: mid-level SWE/
  fullstack first).

### 0.2 Copy register (LARP guardrail, restated with resolutions folded in)
- Every stat/number in copy must trace to: `selected-projects.md`, `cv-enhancer/base.md`, or
  `linkedin-profile.md`. No new numbers invented at any step downstream.
- Projects finishable in the 3–45 day window are written in the **present-perfect "shipped" voice** —
  this now explicitly includes **Cloudflare Dashboard** (user-confirmed ~3 days from prod). Never write
  "coming soon," "in progress," or "under development" for it anywhere in the site.
- dk-shipping is written in **past-tense, closed-chapter voice** ("ran for 4 months, Jan–Apr 2024") —
  it is not being revived, so it should not borrow the "shipped and live" voice used elsewhere.

### 0.3 Section ID reference (for Step 4/5 hand-off)
```
hero
ticker
about
timeline
projects-flagship
  ├─ flagship-offmode
  ├─ flagship-hivemind
  ├─ flagship-diabetes-indicator
  ├─ flagship-trocatine
  ├─ flagship-notes
  └─ flagship-doom
projects-gallery
  ├─ gallery-secondary   (custom-square, agentic, cloudflare-dashboard)
  └─ gallery-archive     (devops-challenge, swe-challenge-1, swe-challenge-2,
                           engineer-student-tools, cs50x, dk-shipping)
skills
contact
```

---

## 1. `hero`
- **Copy source:** LinkedIn headline ("AI Engineering and Agentic Workflows") + CV opening line
  (Software Engineer — distributed systems, SaaS, backend/cloud/AI, 8 years total / 3 focused on SWE).
- **Content slot:** name, build-up tagline (scroll-revealed per `base-structure.md` §1), scroll cue.
- **Recruiter mode default emphasis:** "Software Engineer" leads.
- **Builder mode emphasis:** "...who ships SaaS, ML, and agentic systems — and once fit DOOM into a
  URL" leads instead, foreshadowing the craft-piece closer.

## 2. `ticker`
- **Row 1 (stack pills):** Python, TypeScript/JavaScript, Go, PHP, FastAPI, React, Node.js, AWS,
  PostgreSQL, Docker — sourced from CV's ranked stack list, not invented.
- **Row 2 (fact phrases) — Recruiter-mode order:**
  "97.9% ML accuracy (HiveMind)" → "3-tier production architecture (OffMode)" → "co-founded 2 startups"
  → "8 years shipping software" → "~99.999% AWS S3 cost reduction (HiveMind)"
- **Row 2 — Builder-mode order:**
  "DOOM compressed into a URL" → "hand-rolled RFC 1951/1952 inflate in JS" → "Monaco-powered browser
  editor" → "auto-revert CI/CD guard on every deploy (Agentic)" → "97.9% ML accuracy (HiveMind)"

## 3. `about`
- **Copy source:** `cv-enhancer/base.md` §WHOAMI verbatim narrative arc (curious kid → 2018 Discord
  bots → SaaS/OSS/teaching focus today), §Honors, §Interests, §Languages.
- **Content slot:** one continuous choreographed paragraph (niklasbubori collapse-together text) +
  a fixed side element listing honors/interests as short tags (Muay Thai, chess, homelab, quantum
  computing curiosity, cars).

## 4. `timeline`
Progress-step sequence (easol pattern), each step click/hover-expandable. Left column = role/step,
right column = status tag, expanded state = verified bullets.

| Step | Window | Status tag | Expanded bullets (verified source) |
|---|---|---|---|
| Discord Era | 2018–2023 | `[SHIPPED]` | 6 yrs, 10k+ member communities, Node.js/Discord.js/Java, Minescord plugin |
| dk-shipping | 2024-01 – 2024-04 | `[CLOSED — 4 MOS]` | Dropshipping electronics store; closed chapter, honest short-run venture |
| TrocaTine (Co-Founder) | 2024-01 – 2024-12 | `[SHIPPED]` | Led frontend + landing page; Java/Tomcat/Maven/JDBC backend contribution; PostgreSQL modeling; 4.5/5 rating at ExpoTech 2024 |
| HiveMind (Co-Founder / ML) | 2025-01 – 2025-12 | `[97.9% ACCURACY]` | Modeled/trained/deployed ML model; ~99.999% AWS S3 cost reduction; EC2+S3 API deploy |
| PicPay — Data Engineer | 2025-03 – 2025-11 | `[SHIPPED]` | Oracle SQL across 200+ tables/views; 2–5x query performance gains |
| PicPay — Software Engineer | 2025-11 – Present | `[IN PROGRESS]` | BU Cards/Credit, HR Division, BU Bills/Vehicle Hub; Project Survey (PHP/Hyperf/Angular/MySQL/Redis); BodyShop (Go/Gin/React/Python/MongoDB/AWS) |

- **Note:** this is the one place in the site where an "in progress" tag is correct and intentional —
  it's a real, current job, not a stalled project (the CLAUDE.md rule targets *projects*, not employment
  status).

## 5. `projects-flagship` — per-project asset spec

Order below is **Recruiter mode**; **Builder mode** re-orders to: DOOM → Notes → Agentic's CI/CD system
(surfaced from gallery into a callout) → OffMode → HiveMind → Diabetes Indicator → TrocaTine.

### 5.1 `flagship-offmode`
- **Hero visual:** 3-tier architecture diagram (frontend → gateway → backend) as the lead asset.
- **Device mockups:** iPhone 16 Pro (timer UI), MacBook Pro 14" (architecture/code view).
- **Callouts:** auth (email/password + Google OAuth), cloud backup every 15 min, streaks.
- **Copy register:** shipped voice, web-only — no desktop variant mentioned anywhere (resolved).

### 5.2 `flagship-hivemind` (3 repos unified as one product: "HiveMind Client Potential Engine")
- **Hero visual:** survey UI + 97.9%-accuracy stat callout + AWS EC2/S3 pipeline diagram, composited
  into one narrative flow (survey → model → result), not three separate repo links.
- **Device mockup:** iPad Pro/Air (survey UI).
- **Callouts:** 97.9% accuracy, ~99.999% AWS S3 cost reduction — both CV-verified, reuse verbatim.
- **Copy register:** founder/AI-engineering narrative, present-tense product voice even though the
  startup itself ran Jan–Dec 2025 (the product artifact still stands and is demonstrable).

### 5.3 `flagship-diabetes-indicator`
- **Hero visual:** before/after arc explicitly staged: CS50 final project screenshot/reference →
  live product result screen (confidence-score UI).
- **Device mockup:** iPhone 16 Pro (mobile-responsive survey).
- **Callouts:** 17-question survey, v1.1.0 changelog existing (proof of iteration), API surface
  (`/predict`, `/health`, `/models`).
- **Cross-link:** explicit callout to CS50x in `gallery-archive` — "started here" ancestry link.

### 5.4 `flagship-trocatine`
- **Hero visual:** marketplace listing UI (iPad Pro), Java/PostgreSQL backend diagram.
- **Callouts:** 4.5/5 rating + "massive approval rate" at ExpoTech 2024 (CV-verbatim), co-founder/
  team-lead framing.
- **Copy register:** past-tense startup case study — real users, real rating, contract concluded 2024.

### 5.5 `flagship-notes`
- **Hero visual:** Monaco editor on MacBook Pro/Studio Display XDR, with the repo's own documented
  design-token swatches (`#101010`/`#242424`/`#2DAAE4`/`#FF014F`/`#C16D51`) shown as a literal palette
  strip inside the section — a design-system callout, not just a screenshot.
- **Callouts:** File System Access API autosave, Markdown/YAML/JSON/Swagger/PlantUML preview support.

### 5.6 `flagship-doom` (technical-depth closer)
- **Hero visual:** compression pipeline diagram (7MB raw → 4.4MB gzip, -51%), not gameplay footage.
- **Device mockup:** any modern browser chrome (no specific Apple device needed — this one's about the
  URL bar itself as the "device").
- **Callouts:** WASM (linuxdoom-1.10 → wasm32), hand-rolled RFC 1951/1952 inflate, MicroDOOM at 44KB
  ("smaller than a favicon").
- **Copy register:** craft-piece voice, explicitly not pitched as a business/product.

---

## 6. `projects-gallery`

### 6.1 `gallery-secondary` (larger cards, still not full sections)
| Project | Copy register | Key callout |
|---|---|---|
| Custom Square | present, utility voice | real-time CSS/gradient playground, localStorage theming |
| Agentic | present, shipped voice | CI/CD auto-revert guard, secret scanning, live smoke tests |
| **Cloudflare Dashboard** | present, **shipped voice (resolved)** | Textual TUI, FastAPI backend, Docker-composed zone analytics/DNS/page-rules dashboard |

### 6.2 `gallery-archive` (dense strip, smallest cards)
| Project | Copy register | Key callout |
|---|---|---|
| DevOps Challenge | past, solved-challenge voice | 4-service Docker system (Node/Python/Go/Redis) |
| SWE Challenge 1 | past, solved-challenge voice | Alerts/incidents/metrics REST API, MySQL, JSON logging |
| SWE Challenge 2 | past, solved-challenge voice | Same brief, TUI-based second implementation — range signal |
| Engineer Student Tools | community-contribution voice | GitHub Student Pack curation, ~$5,000+ value |
| CS50x | past, coursework voice | ancestry link to `flagship-diabetes-indicator` |
| **dk-shipping** | **past, closed-chapter voice (resolved)** | Dropshipping electronics store, Jan–Apr 2024, 4-month run |

---

## 7. `skills`
- Grouped exactly per CV categories (no invented groupings): Languages / Frontend / Backend / Data & ML
  / Cloud & DevOps / Agentic-AI.
- vercel-style packed grid, mathematical spacing.

## 8. `contact`
- Email, LinkedIn, GitHub, kmads.dev/projects. Short, direct, no filler.

---

## Handoff note
This structure is content-complete and resolution-complete (all 4 open items from Step 2 answered by
the user on 2026-07-08, folded into §0.2, §5.1, §5.4/timeline, and §6.2). Per explicit user instruction,
**this session stops here — do not proceed to Step 4 (Opus / Claude Design prompt) automatically.**
