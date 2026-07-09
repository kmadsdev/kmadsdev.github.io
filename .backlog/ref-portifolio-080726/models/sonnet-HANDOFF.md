# HANDOFF — Agent 2 (Base Structure + Robust Portfolio Plan, Steps 2–3) → Agent 2 (Step 4, Opus)

**Status:** Steps 2 AND 3 complete (Sonnet 5, same session, 2026-07-08). **User instructed: stop here —
do not auto-proceed to Step 4.** This handoff is prepared for whenever the user chooses to resume.

## What was done this step
- Cloned and read all 19 project repos (see `models/haiku-HANDOFF.md` for the full clone list).
- Read `~/workaholic/github/cv-enhancer/base.md` in full — this is the canonical bio/trajectory/skills
  source; richer than either `github-README.md` or `linkedin-profile.md` alone. Use it as the primary
  source for any copy involving career narrative, honors, or the WHOAMI section.
- Produced `base-structure.md`: an 8-section site map (Hero → Ticker → About → Experience timeline →
  6 flagship project sections → dense project gallery → Skills → Contact) plus a global-mechanics layer
  (scroll choreography, ticker band, grid-hover behavior, section-swap "Recruiter/Builder mode") mapped
  directly onto the four design inspirations in `CLAUDE.md` §Design.
- Every content claim in both `selected-projects.md` and `base-structure.md` traces back to a repo
  README, the CV, or LinkedIn — nothing invented, per CLAUDE.md's explicit prohibition on false
  statements and its "ask, don't infer" rule.

## Outputs
- `selected-projects.md` (Step 1 deliverable, updated with all 4 resolutions below)
- `base-structure.md` (Step 2 deliverable, updated with all 4 resolutions below)
- `structure.md` (Step 3 deliverable — concrete section IDs, per-flagship asset specs, resolved
  Recruiter/Builder mechanism, full copy-register rules)
- `models/haiku-HANDOFF.md` (Step 1 handoff)

## Resolutions received from the user (2026-07-08) — already folded into all three docs above
1. **dk-shipping:** confirmed — dropshipping electronics store, 2024-01 to 2024-04 (4 months, closed).
   Promoted from link-only to a compact archive-tier case-study card (`structure.md` §6.2).
2. **Cloudflare Dashboard:** confirmed functionally done, ~3 days from prod. Written up everywhere as
   already shipped — no "coming soon"/"in dev" language permitted (`structure.md` §0.2, §6.1).
3. **BurnRate:** skipped, not added to the portfolio anywhere.
4. **OffMode desktop (Tkinter):** skipped — confirmed as the old, deprecated kmads.dev/offmode. Current
   OffMode is web-only (React). Never reference a desktop variant (`structure.md` §5.1).

## Decisions made in Step 3 that Step 4 (Opus) should treat as settled, not re-litigate
- **Recruiter/Builder mode mechanism:** a single nav-pinned toggle (not routes) that re-orders the
  flagship sequence and swaps the ticker's lead phrase — client-side state only, no backend. See
  `structure.md` §0.1 for the exact ordering in both modes.
- **Section ID tree** (`structure.md` §0.3) — reuse these IDs verbatim in the Claude Design prompt so
  Fable 5 receives consistent naming all the way through.
- **Per-flagship asset lists** (`structure.md` §5.1–5.6) — device mockup assignments, hero visual choice,
  and callout stats are already decided; Step 4 should translate these into the actual Claude Design
  prompt language, not re-derive them.

## What Step 4 ("Create Instructions to Claude Design" → `claude-design-prompt.md`) needs to do
1. Translate `structure.md`'s section-by-section spec into an extremely graphic, detailed design-token
   prompt (per `CLAUDE.md`'s haiku→sonnet→opus escalation note) for Fable 5 to consume as a design
   system, not a page-by-page build spec.
2. Preserve the resolved copy-register rules from `structure.md` §0.2 verbatim — especially the
   Cloudflare Dashboard "shipped voice" and dk-shipping "closed-chapter voice" distinction, since these
   affect tone/color/motion choices too (e.g. a closed venture shouldn't get the same celebratory motion
   treatment as a live shipped product).
3. Produce the `models/opus-HANDOFF.md` deliverable per the Agentic Plan in `CLAUDE.md`.

## Status
**Per explicit user instruction, this session stops after Step 3.** Do not invoke Step 4 automatically —
wait for the user to resume.
