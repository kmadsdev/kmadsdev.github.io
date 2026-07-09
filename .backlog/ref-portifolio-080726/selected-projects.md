# Selected Projects — Full Selection (per instruction: select ALL repos in projects.md)

Source of truth: `projects.md`. Every repo listed there is selected — nothing dropped. Below, each is
tagged with a **tier** (how much visual/narrative weight it gets in the portfolio) and annotated with
facts verified directly from each repo's README (cloned to `~/workaholic/github/`), so downstream
agents build on confirmed reality, not assumption.

Per `CLAUDE.md`: no false statements, exaggeration of framing is fine, and any project finishable in
3–45 days should be presented as already shipped (not "coming soon"). Each entry below flags where that
applies ("Ship-gap" = real gap between current repo state and the portfolio-ready state).

---

## Tier 1 — Flagship (full case-study treatment, one custom full-bleed section each)

### 1. OffMode
- **Links:** [kmads.dev/offmode](https://kmads.dev/offmode/) · Repo private (`offmode`)
- **What it is:** Productivity Pomodoro app — React frontend + Express gateway + FastAPI/PostgreSQL
  (Supabase) backend. Auth (email/password + Google OAuth), cloud backup every 15 min, streaks, focus
  session tracking.
- **Verified stack:** React, Vite, Express.js (gateway), FastAPI, PostgreSQL via Supabase, JWT, Vercel
  serverless backend.
- **Status:** Real, live, most architecturally complete project (3-tier: frontend → gateway → backend).
- **Ship-gap:** None functionally significant — this is the strongest technical showcase.
- **Resolved (user, 2026-07-08):** The Tkinter desktop client mentioned in the CV was the *old*
  kmads.dev/offmode — a deprecated prior version. The current OffMode is web-only (React). Do not
  reference a desktop variant anywhere in copy.

### 2. Diabetes Indicator (+ Backend)
- **Links:** [kmads.dev/diabetes-indicator](https://kmads.dev/diabetes-indicator/) · `diabetes-indicator`
  (frontend, open source) · `diabetes-indicator-backend` (open source)
- **What it is:** 17-question health survey → FastAPI backend serving a scikit-learn model trained on a
  public Kaggle dataset, returns diabetes risk + confidence %. BMI calculator, dark theme, mobile-first.
- **Verified stack:** Vanilla HTML/CSS/JS frontend, Python FastAPI + scikit-learn backend, deployed
  Vercel. Clean `/predict`, `/health`, `/models` API surface.
- **Status:** Real, live, versioned (v1.1.0 changelog present) — genuinely one of the most "finished"
  projects with visible iteration history.
- **Ship-gap:** None. Strong ML-in-production story for AI Engineer / Data Engineer target roles.

### 3. HiveMind trio (client-potential app + ML model + ML API) — startup story
- **Links:** `hivemind-client-potential` (GitHub Pages frontend) · `hivemind-ml` (EDA + model training) ·
  `hivemind-ml-api` (FastAPI on AWS EC2/S3)
- **What it is:** A 10-question survey predicting whether a company is a sales-qualified lead, backed by
  a real trained classifier (Logistic Regression / Random Forest, 97.9% accuracy per the changelog) served
  from an EC2-hosted API pulling the model from S3.
- **Verified stack:** Python, scikit-learn, pandas, SQL (MySQL schema + synthetic data generator),
  FastAPI, boto3, AWS EC2 + S3.
- **Status:** Real. This is the strongest **founder/AI-engineering narrative** in the whole portfolio —
  ties to the CV's HiveMind co-founder role (Jan–Dec 2025, model accuracy + ~99.999% S3 cost reduction
  claims already exist in his own CV — reuse those verified numbers, don't invent new ones).
- **Ship-gap:** None for the story; three repos should be presented as one product ("HiveMind Client
  Potential Engine") rather than three disconnected links.

### 4. DOOM Offline
- **Links:** [kmads.dev/doom](https://kmads.dev/doom) · `doom` (open source)
- **What it is:** DOOM (1993, compiled to WASM) + a handwritten "MicroDOOM" raycasting FPS, both
  gzip+base64-encoded into a single self-extracting HTML/data-URI — playable with zero hosting.
- **Verified stack:** Vanilla JS, WebAssembly (linuxdoom-1.10 via Clang→wasm32), Python encoding
  pipeline, hand-rolled RFC 1951/1952 inflate in JS.
- **Status:** Real, live, technically the most "look how deep this goes" project — genuinely unusual
  (browser data-URI + compression engineering). README even documents exact size reductions (-51%).
  Strong technical-depth signal for engineering interviews.
- **Ship-gap:** None. This is a talking-point project, not a business one — position accordingly (the
  "for the love of the craft" project in the gallery, not a flagship pretending to be a product).

### 5. Notes (BrowserNotes)
- **Links:** [kmads.dev/notes](https://kmads.dev/notes) · `notes` (open source)
- **What it is:** VSCode-inspired in-browser text editor, single HTML file, Monaco editor engine, File
  System Access API for autosave-to-disk, previews for Markdown/YAML/JSON/Swagger/PlantUML.
- **Verified stack:** Vanilla HTML/CSS/JS, Monaco editor, File System Access API.
- **Status:** Real, live, polished (has its own design tokens documented — `#101010`/`#242424`/
  `#2DAAE4`/`#FF014F`/`#C16D51` — and a `prototype.svg` Figma export).
- **Ship-gap:** None.

### 6. TrocaTine — startup story
- **Links:** [kmads.dev/trocatine](https://kmads.dev/trocatine) (landing, open source) · org
  `github.com/trocatine` (backend, open source)
- **What it is:** Sustainability marketplace for exchanging/selling children's items. Co-founded Jan–Dec
  2024. Java backend (Tomcat/Maven/JDBC/JSP), PostgreSQL, landing page in vanilla HTML/CSS/JS.
- **Verified facts from CV:** "4.5/5 stars and massive approval rate at ExpoTech 2024" — his own claim,
  reusable verbatim, do not embellish further.
- **Status:** Dormant/past (2024, contract ended), but a legitimate co-founder case study — different
  narrative register from the current solo projects (team leadership, backend architecture, real users).
- **Ship-gap:** Landing-page repo (`trocatine`, kmadsdev fork) is only 2 lines of README — needs a
  proper case-study write-up sourced from the CV facts above, not the repo itself.

---

## Tier 1.5 — Promoted (see resolution below)

### Cloudflare Dashboard (TUI) — promoted to Flagship-adjacent, full card treatment
- **Links:** Private repo, not yet deployed anywhere (local only per CV)
- **What it is:** Python Textual TUI + FastAPI backend for Cloudflare zone analytics, DNS records, page
  rules — real, structured, Docker-composed (dev + prod compose files), clear architecture diagram in
  README.
- **Verified stack:** Python, Textual, FastAPI, Docker.
- **Resolved (user, 2026-07-08):** Functionally done — needs ~3 days of polish to reach prod. Per
  CLAUDE.md's rule (finishable in 3–45 days → present as already shipped), this is written up as a
  **live, finished project**, no "coming soon"/"in development" language anywhere in copy. Promote from
  Secondary to its own full card in the project gallery (Section 6), with the same "already done" voice
  as every flagship.

---

## Tier 2 — Secondary (real, smaller scope; grid entries with their own card, no full section)

### 7. Custom Square (CSS Property Customizer)
- **Links:** [kmads.dev/custom-square](https://kmads.dev/custom-square/) · open source
- **What it is:** Real-time CSS property/gradient/color playground, vanilla JS, localStorage theme
  persistence. Small but complete and genuinely useful as a demo of UI fundamentals.
- **Ship-gap:** None — it's small by design, present it as a utility, not inflated.

### 8. Agentic (agentic-template landing page)
- **Links:** [kmads.dev/agentic](https://kmads.dev/agentic/) · private repo (landing only; the template
  itself lives in a separate, unlisted repo `agentic-template`)
- **What it is:** React + Vite + TypeScript landing page, Lenis smooth scroll, self-hosting (built using
  its own template — "eats its own dog food"). Has real CI/CD: typecheck + test gates, a `gh-pages` guard
  workflow with auto-revert-on-failed-smoke-test and auto-filed incident issues.
- **Verified stack:** React, TypeScript, Vite, Lenis, GitHub Actions (two workflows: CI + Pages guard).
- **Status:** "In Dev" per `projects.md`, but the CI/CD guard system described in the README is a
  genuinely strong DevOps/SRE signal (auto-rollback, secret scanning, smoke tests) — worth surfacing
  explicitly in copy, it's more impressive than the landing page itself.
- **Ship-gap:** Landing page marked in-dev; confirm current deployed state before claiming "live."

---

## Tier 3 — Challenges & Archive (dense low-weight grid, "Labs" section — proof of range, not headliners)

### 10. DevOps Challenge
- PicPay Jr DevOps/SRE take-home. Docker-composed 4-service system (Node.js web, Python writer, Go
  reader, Redis), architecture diagram included in repo. Real, runnable, well-documented.

### 11. Software Engineer Challenge 1 (SWE Observability Challenge V1)
- Alert/incident/metrics REST API challenge. Full spec in README (MySQL schema, Prometheus-style
  `/metrics` format, JSON logging requirement). Repo includes a working `app/`, `frontend/`, `docker/`.

### 12. Software Engineer Challenge 2 (SWE Observability Challenge V2)
- Same challenge brief, second implementation — repo shows a TUI-based variant (Python venv + `python -m
  tui`) plus API testing docs (`API-TESTING.md`). Worth noting as "solved the same problem twice with a
  different architecture" — a legitimate range signal, not a duplicate.

### 13. Engineer Student Tools
- Community contribution: curated spreadsheet of free dev tools/credits via GitHub Student Pack
  (~$5,000+ in listed value). Not code, but real community value — keep in an "Open Source & Community"
  strip, not the main project grid.

### 14. CS50x
- Harvard CS50x coursework (Scratch → C → Python → SQL → Flask → final project). Final project note
  in its own README points to `diabetesIndicatorCS50x` — the ancestor of the now-live Diabetes Indicator.
  **Worth an explicit callout**: "started as a CS50 final project, later rebuilt into a live ML product"
  is a true, compelling before/after arc — use it.

---

## dk-shipping — past startup (resolved, promoted to a small case study)

### 15. dk-shipping
- **Links:** Private repo, [dkshipping.store](https://dkshipping.store/home/)
- **What it is (user-confirmed, 2026-07-08):** An online dropshipping store for electronics. Ran for
  4 months (Jan 2024 – Apr 2024), then shut down.
- **Presentation angle:** This is the honest "first real business attempt, ran it, learned fast, cut
  losses at 4 months" story — a legitimate entrepreneurial data point, not a failure to hide. Belongs in
  the Archive/Past-projects strip (Section 6) as a compact card: what it was, the 4-month window, and
  one line on the takeaway — not inflated into a flagship, but no longer link-only either since it now
  has real, user-confirmed facts behind it.
- **Do not** invent revenue, order volume, or supplier details — only the confirmed scope (dropshipping
  electronics store) and dates (2024-01 to 2024-04) are usable.

---

## Summary counts (post-resolution, 2026-07-08)
- Flagship (full sections): **6** — OffMode, Diabetes Indicator, HiveMind trio, DOOM Offline, Notes,
  TrocaTine
- Full-card, "already shipped" (promoted): **1** — Cloudflare Dashboard
- Secondary (grid cards): **2** — Custom Square, Agentic
- Challenges/Archive (dense strip): **6** — DevOps Challenge, SWE Challenge 1, SWE Challenge 2, Engineer
  Student Tools, CS50x, dk-shipping

**Total repos selected: all 19 referenced in `projects.md` — none dropped.**

## Resolved items (user answers, 2026-07-08)
1. **dk-shipping:** confirmed — dropshipping electronics store, 2024-01 to 2024-04 (4 months). Promoted
   from link-only to a small archive-tier case study card.
2. **Cloudflare Dashboard:** confirmed done, ~3 days from prod. Write it up as shipped, no "coming soon."
3. **BurnRate:** skipped — not added to the portfolio.
4. **OffMode desktop (Tkinter):** skipped — that was the old, deprecated kmads.dev/offmode. Current
   OffMode is web-only (React). Never reference a desktop variant.
