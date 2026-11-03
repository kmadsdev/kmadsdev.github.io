# Media Library · kmads.dev

> Inventory of every brand asset shipped under `public/assets/`. Paths preserved at deploy: `kmads.dev/assets/<…>`.
> Visual previews live in [`index.html` §17–18](./index.html). This file is the text inventory.

---

## Folder map

```
kmadsdev.github.io/public/assets/
├── kmads_logo_zoomedout.png        # primary logomark
├── favicon.png                     # tab favicon
├── badge.svg                       # static decorative badge
├── globe.svg                       # hero badge inner (static)
├── globe-text.svg                  # hero badge outer (CCW spin 20s)
├── footer-banner.svg               # full-bleed footer illustration
├── arrow-redirect.svg              # external redirect arrow
├── arrow-scroll.svg                # scroll cue
├── 45deg-white-arrow.svg           # 45° external arrow
├── icons/                          # tech stack icons (full color SVG)
├── projects/                       # project covers + demo videos
├── social/                         # github / linkedin / email (red + white)
└── ui/                             # arrow-external · footer-banner · heart
```

---

## Brand marks

| Path | Format | Use | Sizing rule |
|---|---|---|---|
| `assets/kmads_logo_zoomedout.png` | PNG | About-section logo, fallback favicon | ≥ 80px diameter, never < 40px |
| `assets/favicon.png` | PNG | `<link rel="icon">` in every HTML entry | 32×32 minimum |
| `assets/badge.svg` | SVG | Decorative only | Free-scaling |
| `assets/globe.svg` | SVG | Hero spinning badge — inner | 65% of badge container |
| `assets/globe-text.svg` | SVG | Hero spinning badge — outer (rotates) | 100% of badge container |
| `assets/footer-banner.svg` | SVG | Full-bleed footer illustration | min-height 1200px desktop, 150–250px mobile |

---

## Tech-stack icons — `public/assets/icons/`

Used inside `Skill` cards. Full-color **official brand SVGs**. Square viewBox; rendered at 60% of card.

| File | Stack |
|---|---|
| `python.svg` | Python |
| `javascript.svg` | JavaScript |
| `typescript.svg` | TypeScript |
| `php.svg` | PHP |
| `c.svg` · `clang.svg` | C / Clang |
| `java.svg` | Java |
| `go.svg` | Go |
| `react.svg` | React |
| `vite.svg` | Vite |
| `nodejs.svg` | Node.js |
| `fastapi.svg` | FastAPI |
| `laravel.svg` | Laravel |
| `hyperf.svg` | Hyperf |
| `postgresql.svg` | PostgreSQL |
| `mysql.svg` | MySQL |
| `sqlite.svg` | SQLite |
| `redis.svg` | Redis |
| `aws.svg` | AWS |
| `gcp.svg` | Google Cloud |
| `vercel.svg` | Vercel |
| `docker.svg` | Docker |
| `githubactions.svg` | GitHub Actions |
| `github.svg` | GitHub (mark) |
| `pandas.svg` | Pandas |
| `scikit.svg` | scikit-learn |
| `tkinter.svg` | Tkinter |

**Rule:** Don't recolor. Each project's own brand guidelines apply.

---

## Social icons — `public/assets/social/`

Two color variants per platform: `-red` (active/hover) and `-white` (resting in some contexts).

| File | Use |
|---|---|
| `github-icon-red.svg` | Hero CTA row (GitHub link) |
| `linkedin-icon-red.svg` | Hero CTA row (LinkedIn link) |
| `email-icon-red.svg` | Hero CTA row (mailto) |
| `gituhb-icon-white.svg` | Footer brand column (GitHub) — **typo'd filename, kept for compat** |
| `linkedin-icon-white.svg` | Footer brand column (LinkedIn) |
| `email-icon-white.svg` | Footer brand column (email) |
| `gituhb-icon-red.svg` | Legacy duplicate — **typo'd, prefer `github-icon-red.svg`** |

**TODO:** Rename `gituhb-*` → `github-*` and update `FOOTER_CONFIG.socialLinks` in `src/constants.js`. Until then, leave the typo'd files in place.

---

## UI affordances — `public/assets/ui/` & root

| Path | Use |
|---|---|
| `ui/arrow-external.svg` | External link arrow (footer links, project tags) |
| `ui/heart.svg` | Sponsor button glyph (footer) |
| `arrow-redirect.svg` | Project card hover overlay (CTA in circle) |
| `arrow-scroll.svg` | Scroll cue indicator |
| `45deg-white-arrow.svg` | Decorative 45° arrow |

---

## Project media — `public/assets/projects/`

| File | Project | Type |
|---|---|---|
| `offmode.png` | OffMode | Cover |
| `diabetes-indicator.png` | Diabetes Indicator | Cover |
| `diabetes-indicator-demo.mp4` | Diabetes Indicator | Hover video (mp4, muted, looped) |
| `trocatine.png` | TrocaTine | Cover |

### Format rules

- **Cover image required** (PNG or JPG). Aspect target ~16:10. Rendered at `height: 200–260px`, `object-fit: cover`.
- **Video optional** (MP4, H.264). ≤ 5s loop. ≤ 2 MB encoded. Plays on card hover, muted/looped/autoplay.
- File naming: `<project-slug>.png` for cover, `<project-slug>-demo.mp4` for video.

### Adding new project media

1. Drop cover at `public/assets/projects/<slug>.png`.
2. (Optional) Drop demo at `public/assets/projects/<slug>-demo.mp4`.
3. Append entry to `src/constants.js` → `PROJECTS` (image, video, tags, link).
4. Add a row to `projects.json` (the SSoT for the `/projects` page).
5. `npm run deploy`.

---

## What lives elsewhere

- **CV / Resume:** Hosted at `kmads.dev/cv` — owned by `kmadsdev/cv`, not this repo.
- **External icon sources** (e.g. `react-icons` package): pulled at runtime from `react-icons` npm package (used in some components instead of local SVG).

---

## Audit checklist (run before each release)

- [ ] Every `assets/icons/*.svg` referenced by `TECH_SKILLS` exists on disk.
- [ ] Every `PROJECTS[].image` and `PROJECTS[].video` resolves (404 = silent broken card).
- [ ] No new asset committed without an entry in this file.
- [ ] No raster asset > 500 KB (compress with `pngquant` / `cwebp`).
- [ ] Favicon updated whenever logomark changes.
