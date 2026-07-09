# HANDOFF — Agent 1 (Repo/Project Selection) → Agent 2 (Base Structure)

**Status:** Step 1 complete (executed inline by Sonnet 5, no separate Haiku pass — same session).

## What was done
- Read `projects.md` (19 repos across Production / Articles & Archives / Not finished / Past projects).
- Cloned every repo not already present locally into `~/workaholic/github/` (13 new clones: this
  session added `diabetes-indicator-backend`, `cloudflare-dashboard`, `dk-shipping`, `trocatine`,
  `hivemind-client-potential`, `hivemind-ml`, `hivemind-ml-api`, `devops-challenge`,
  `software-engineer-challenge-1`, `software-engineer-challenge-2`, `CS50x`; `offmode`,
  `diabetes-indicator`, `doom`, `notes`, `custom-square`, `agentic`, `engineer-student-tools`,
  `cv-enhancer` were already present).
- Read every README (or equivalent) to verify real stack/status/features — no invented facts.
- Read `~/workaholic/github/cv-enhancer/base.md` — this is the richest bio source available (career
  trajectory 2018–2026, verified project descriptions, honors, tech stack self-rankings, WHOAMI
  narrative). **Treat this as the primary source for all bio/personality copy downstream.**
- Selected **all 19 repos** — nothing dropped, per explicit instruction — tiered by portfolio weight
  into Flagship (6) / Secondary (3) / Challenges-Archive (5), plus one flagged exclusion-pending-review
  (`dk-shipping`, insufficient source material) and one flagged "finish before shipping"
  (`cloudflare-dashboard`, realistically completable in the 3–45 day window CLAUDE.md allows).

## Output
- `selected-projects.md` — full tiered list with verified facts, links, ship-gaps, and the
  dk-shipping/cloudflare-dashboard flags for user follow-up.

## Open items for the user (do not silently resolve — CLAUDE.md requires asking)
1. **dk-shipping**: no CV/LinkedIn corroboration of role, dates, or scope beyond the single-line README
   and the live URL. Confirm details before any case-study copy is written, or accept it stays a
   link-only entry.
2. **Cloudflare Dashboard**: currently "not finished." CLAUDE.md wants anything finishable in 3–45 days
   presented as already shipped, not "coming soon." Confirm whether the user will actually finish a
   minimal working demo before launch, or whether it should be downgraded to archive-tier instead.
3. **BurnRate**: mentioned in `github-README.md` ("Finances Dashboard — soon") but **not present** in
   `projects.md` and no repo exists locally. Excluded per CLAUDE.md's "don't infer from outside this
   file" rule — flag to user if it should be added as a 20th project.
4. **OffMode desktop (Tkinter) variant**: mentioned in `cv-enhancer/base.md` but not present in the
   `offmode` repo as cloned (repo only shows frontend/gateway/backend, no Tkinter client). Do not
   reference the desktop variant in copy unless confirmed to exist.

## For Agent 2 (base structure)
Use `selected-projects.md` tiers directly to size each project's real estate in the site map. The
6 flagship projects each need a distinct full-bleed treatment (per CLAUDE.md's niklasbubori/easol
inspiration — no two flagships should look alike). Secondary and archive tiers are dense grid entries.
