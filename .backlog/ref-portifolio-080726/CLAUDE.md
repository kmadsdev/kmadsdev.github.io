# Portifolio Refactor 08-07-26

- Project path: `~/workaholic/projects/kmadsdev.github.io/`

# Description

I need a refresh in my portifolio.

Sadly because of the current tech market, I'll have to *larp* (LARP or 'Live Action Role-Play' is used to describe someone who is performative, or pretending to be something they are not) a little bit on the projects, there can't be any false statement - but exageration is allowed. Also plan tangible changes within the projects (in which I can do later, do not use terms such as "will be", "coming soon" for projects or ideas that can be finished easily within 3-45 days - make it look like the features already exist, I'll take care of actually implementing later).

The core idea: use Anthropic's **Fable 5** (medium effort, very limited budget) + **Claude Design** (extremely limited, about 1-3 design pages in the best case scenarios, good to make DESIGN SYSTEM from EXTEMELY graphic and detailed prompts (from haiku -> sonnet -> opus), which will be consumed by Fable 5 afterwards) all expenses blowing on my Claude Pro Account to create the best portifolio design possible.

## What I'm expecting:

1. All my latest relevant projects are listed in the portifolio.
2. The design pictures the best of each listed source website, exactly on what I want and don't want.
3. Portifolio looks extremely sharp and exagerated UI/UX and represents my personality while still keeping it technical and packed with information about my experience, companies, startups, projects, ideas, contributions, etc.

# Agentic Plan

- Step 1 (Agent 1 `Claude Code / Haiku 4.5`): Select Repositories & Projects
    - Input
        - Context (this file): `~/workaholic/.backlog/CLAUDE.md`
        - All my projets (updated 08-07-26): `~/workaholic/.backlog/projects.md`
    - Output:
        - `selected-projects.md`
        - HANDOFF `~/workaholic/.backlog/ref-portifolio-080726/models/haiku-HANDOFF.md`
        - Information to the user on how to proceed
- Step 2 (Agent 2 `Claude Code / Sonnet 5`): Create Base Portifolio Structure
    - Input:
        - Context (this file): `~/workaholic/.backlog/CLAUDE.md`
        - `~/workaholic/.backlog/ref-portifolio-080726/models/haiku-HANDOFF.md`
        - `selected-projects.md`
        - Github README.md (updated 08-07-26): `~/workaholic/.backlog/github-README.md`
        - Linkedin profile (updated 08-07-26): `~/workaholic/.backlog/linkedin-profile.md`
    - Output:
        - `base-structure.md` or/and `base-structure.yaml`
        - HANDOFF `~/workaholic/.backlog/ref-portifolio-080726/models/sonnet-HANDOFF.md`
        - Information to the user on how to proceed
- Step 3 (Agent 2 `Claude Code / Sonnet 5`): Create a robust Portifolio Plan
    - Input:
        - Context (this file): `~/workaholic/.backlog/CLAUDE.md`
        - `~/workaholic/.backlog/ref-portifolio-080726/models/sonnet-HANDOFF.md`
        - `base-structure.md` or/and `base-structure.yaml`
        - `selected-projects.md`
        - Github README.md (updated 08-07-26): `~/workaholic/.backlog/github-README.md`
        - Linkedin profile (updated 08-07-26): `~/workaholic/.backlog/linkedin-profile.md`
    - Output:
        - `structure.md` or/and `structure.yaml`
        - HANDOFF `~/workaholic/.backlog/ref-portifolio-080726/models/sonnet-HANDOFF.md`
        - Information to the user on how to proceed
- Step 4 (Agent 2 `Claude Code / Opus 4.8`): Create Instructions (input) to Claude Design
    - Input:
        - Context (this file): `~/workaholic/.backlog/CLAUDE.md`
        - `~/workaholic/.backlog/ref-portifolio-080726/models/sonnet-HANDOFF.md`
        - `base-structure.md` or/and `base-structure.yaml`
        - `selected-projects.md`
    - Output:
        - `claude-design-prompt.md`
        - HANDOFF `~/workaholic/.backlog/ref-portifolio-080726/models/opus-HANDOFF.md`
        - Information to the user on how to proceed
- Step 5 (Agent 3 `Claude Design / Fable 5`): Generate **DESIGN SYSTEM** as **DESIGN TOKENS**
    - Requirements
        - inline CSS
        - no JS unless absolutely necessary
        - every component shown once
        - every typography style shown
        - every color shown
        - spacing examples
        - radius examples
        - icon examples
        - responsive enough to inspect
    - Input:
        - `claude-design-prompt.md`
        - Other stuff as needed
    - Output:
        - `ds-spec.yaml` (all tokens/components/rules, generate this second)
        - `ds-components.css` (implementation, generate this third)
        - `ds-preview.html` (visual preview, generate this first)
        - `ds-README.md` (usage notes, generate this fourthy)
- Step 6 (Agent 4 `Claude Code / Opus 4.8`): Generate plan to Fable 5 to implement the design
    - Input:
        - Context (this file): `~/workaholic/.backlog/CLAUDE.md`
        - `~/workaholic/.backlog/ref-portifolio-080726/models/opus-HANDOFF.md`
        - `ds-spec.yaml`
        - `ds-components.css`
        - `ds-preview.html`
        - `ds-README.md`
    - Output:
        - `/plan` to next model -> **Fable 5**
        - Information to the user on how to proceed or auto call plan on the `fable-5`/`fable` model
- Step 7 (Agent 5 `Claude Code / Fable 5`): Implement plan
    - Input: `/plan` (only)
    - Output: Full project rebase

---

# Design

## Sources of inspiration

### 1. https://cash.app/ 

**What to replicate:**

- Slide-like scroll, scrolling feels like an EXTREME fluid powerpoint, smooth transitions, numbers / images / videos have animations and transitions.
- Overall design appearance (color, elements, flow).

**What not to replicate (avoid):**

- Centered elements (the phone is the main element in the middle of the screen)
- Presenting a ~~Product/App~~ (bank app) **Person** (me)


### 2. https://niklasbubori.com/

**What to replicate:**

- The way images scroll, elements stay, text gradually scroll and colapse togheter like choreography (on `Services overview` section).
- Fullscreen project, one different presentation for EACH project, shocasing its colors, format, images (phone format, tablet format, laptop format) (on `Projects` section).
- Full projects gallery view (https://niklasbubori.com/projects), only ith more detail for tech leads and talent to know what the project is about.
- All uppercase text on the right places.

**What not to replicate (avoid):**

- Ads/Annoying Redirects Tags (like the awwwards `Honors` link on the right on the screen).
- Small cards that are difficult to read, only big text and cards.
- Too much video movement (too many gifs and mp4s moving around), replace most mp4s and gifs with actual HTML/CSS/JS animations (those are higher quality), always prefer SVGs or PNGs/JPEGS.

### 3. https://easol.com/

**What to replicate:**

- **Personality**
- Colors and position that matters.
- Images and position that matters.
- Text size, position, alignment.
- Full `.section--animated-tickers` (straight copy this hole element, two lines of `...[IMAGE] phrase [IMAGE] phrase...` that spins like a carousel in different positions left-right or right-left synced on the scroll).
- Background grids
- Progress sections (`First Step ... [OK] -> Second Step ... [OK] -> Third Step [PROCESSING] ...`, `Your boring S&P500 portifolio ... [X] -$500.00 -> Appling magic formula ... [OK] -> +$13,000`, ...)
- One hover affects the whole grid
- Buttons change the portifolio's current section design (shows a different section)

**What not to replicate (avoid):**

- Do not make up projects I haven't made, do not fit my current projects like they are all equal, they should have VERY different sizes, alignments, images, texts, etc (like its one full landing for each, divide them into components on react at the end).
- Do not add random images and media, each image, gif or icon must have a deep reason behind it.

### 4. https://vercel.com/frameworks/nextjs

**What to replicate:**

- Information structure, how packed each element is
- Grid of elements, text and media
- Simple yet well-produced gifs
- Responsivity to clicks, selection and scroll
- Mathematical geometry & patterns

**What not to replicate (avoid):**

- Presenting a ~~Product/App~~ (bank app) **Person** (me)


## Mockups

- Use only apple divices for showcases
    - Phone: Apple IPhone 16 Pro (preferrably) & 16 Pro Max (only fitment on screen matters) or alternative: S26 Ultra
    - Apple IPad Pro/Air M3/M4/M5 11" or 13"
    - Apple MacBook Pro 2022+ 14" (general use) or 16" (specific massive dev workflows)
    - Monitor: Apple Studio Display XDR
    - Mac Mini 2024+ or Mac Studio 2023+
    - Magic Keyboard + Magic Trackpad (all black or all white) OR Logitech MX Master 3/4 + Logitech MX Keys Mini (all gray or all white)
- Preferably generate mockups in pure html/css/js or straight raw studio-quality SVGS

---

# My Career Goals

> [!] Instructions for the agent - not specifically for the company talent.

## Roles i'm currently searching for:

1. Mid-level Software Engineer (current search target)
3. Mid-level FullStack Engineer / FullStack Software Engineer (secondary target)
4. Junior Software Engineer (Also would accept depending on salary and company)
5. Junior FullStack Engineer / FullStack Software Engineer (Also would accept depending on salary and company)
3. Senior Software Engineer (Very unlikely, but wouldn't back off an opportunity - maybe some startup ould hire me at this role)
4. AI Engineer (Not platform, like actual LLM API integration / RAG and stuff, but agentic workflow configuration, Team AI environment setup, like a vibe coding cleanup specialist - Mid-level or Junior if exists)
5. Vibe Coding Cleanup Specialist (heavy local AI setup, cross platform setup Anthropic/OpenAI/Github/xAI/etc, not workflows)
6. Data Engineer (High profeciency with SQL, Pandas/PySpark, still have to search for some names, theory fine, 2-4 months to adapt - Junior or in specific startups at Mid-level/Senior)
7. Cloud/DevSecOps/SRE Engineer (Last case, low current knowledge but I can learn/ship 4x faster than a fresh-starting junior)
8. Engineering Manager / Tech Lead (Desperate startups only + larp, I have only 3-6y of valid proofable experience in SWE)

## Place to work

1. United States (USD) - Full Remote
2. Other countries (USD/EUR/Pound/...) - Full Remote
3. Brazil (BRL/USD) - Full Remote

## Contract

1. PJ (if salary beats most CLT benefits or work hours is 100% flexible)
2. CLT (most common)
3. Indirect/Other (meh)

# Additional FAQ
- If you need acess to any repository, just check `~/workaholic/github/*`, if doesn't exist you're allowed to `cd ~/workaholic/github && git clone git@github.com:kmadsdev/<any-repo>.git`, even private repositories. Use this to gather information about me.
- My latest (probably old but still have gold informaton) Curriculum Vitae in HTML is at `~/workaholic/github/cv-enhancer/`
- [!] ANY QUESTIONS ASK ME, DO NOT INFER INFORMATION FROM OUTSIDE THIS FILE OR FROM MY INSTRUCTIONS.
