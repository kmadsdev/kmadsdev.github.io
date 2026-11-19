# Design of kmads.dev

The page is a board of modules, like a motherboard or a gauge cluster. I tune car ECUs, build PCs and run servers, so the layout of my site is the layout of a board: a grid of tiles, small labels printed next to the parts, and lines that carry signal. The board is told with restraint. You feel it in the grid, the labels and the line art, not in decoration.

## Decisions

| Area | Decision |
|---|---|
| Theme | One theme: dark. The page ground is one solid colour (`#0B0B10`). A tile is one solid step lighter (`#12121A`) with a hairline. No gradient ground, no glow, no soft shadow, no glass. |
| Colour | One accent per view: red `#FF014F`. It marks identity and action: the badge, the primary button, the scroll index, the line in use, the sun. The violet to blue gradient (`#B300FF` to `#009DFF`) means data in motion and lives only inside drawings. Mint `#00FFBB` is a status dot: "live now". Body text is never red, violet or blue. |
| Type | Archivo, wide and heavy, for headlines and numbers. Geist for text. Geist Mono only for facts: dates, periods, stack names, repository names, the marks of the board. One scale of 11 steps (see "The system"). Sentence case. Capitals only on a board mark, the readout row of the hero and a language code. Bold is for titles; a name inside a sentence is medium weight. |
| Column | The content stands on one centred column (72rem). The base font size grows from 16px to 24px on very wide screens, so the column grows with it. Prose is 66 to 72 characters wide (`50ch`). Only the rulers, the dot field, section grounds and the sunset run edge to edge. |
| Air | Related things are close and unrelated things are one calm step apart, never an empty band. Seven vertical steps, from 8px (a label and its headline) to 64 to 104px (section to section). A section has one label, one headline, one short lead, then its content. |
| Tiles | Radius 12px, a hairline, a solid surface. A tile holds one idea: a picture or a diagram on top (a band of the ground from edge to edge of the tile, not a second card inside the card), a short title, at most three lines of text. Long text goes in the text column. A tile that is a link shows an arrow and reacts to the pointer. A tile that is not a link does not react. |
| Labels | A group has a quiet name in sentence case ("Impact", "Projects", "Source code"). A drawing or a flowchart carries a board mark in mono capitals with a reference number, as on a circuit board (`D10 · REQUEST PATH`). Screen readers get the plain name only. |
| Light | None. Red is the one accent and it is always a solid mark: the badge, the primary button, the scroll index, the line in use, the square before a section label, the underline of a link to the proof, the sun. |
| Rulers | A fixed ruler on the left edge and one under the top bar, on every section. The red index shows scroll progress. Grey marks show the pointer position. Hidden below 1024px. |
| Hero | Name, role, a short summary, four links, place and local time. The dot field exists only here. Two bodies bend it: the badge (the dots leave its disc and turn around it) and the pointer. |
| Badge | My globe badge. The globe stays still and the red ring of text turns around it, only while it is on screen. The two parts keep the proportion of my original badge file. A press on it stops the turn. |
| Drawings | SVG, drawn from zero, in one hand: 1.5px strokes that do not scale, round joins. A drawing moves only to show a real mechanism (a request on its path, a stage that completes) and only while it is on screen. The violet to blue gradient is only on data that moves (a packet, a trace bar). Halftone dots appear only where the area has a meaning (the free margin of a salary, the part of a bar that is done). A number on a drawing is real, or the drawing has no numbers. |
| Flowcharts | SVG made from data. One step is active: its line is red and a packet moves on it. The step list next to the chart is the text form of the same data. |
| Disclosure | One control look for every "Read the full story" and "Show the details": the label and a small round plus that becomes a minus (`.toggle` in `bento.css`, `ToggleSign.jsx`). A case file row uses the same sign, larger. |
| Pause | A drawing that loops has a small pause button in its label row (`art/kit/Playback.jsx`). The flowcharts, the clips and the badge have their own. With reduced motion there is no button, because nothing moves. |
| Motion | One entrance for tiles: a 420ms fade with a 12px rise, 40ms apart, once. The hero name has its own entrance. All other motion shows a state change. Nothing pulses. With reduced motion: no packet, no turn, a still dot field, fades only. Nothing is lost: each moving picture has its meaning in text. |
| Scroll | The wheel is smoothed a little with Lenis (`src/smooth.js`, lerp 0.2): the page follows the wheel at once and only the end of the move is eased. It is off with reduced motion and on touch screens, and it is not loaded there. It moves the real scroll position, so the keyboard, find-in-page, anchors, `/projects` and sticky parts work as in any page. Three parts stay in view while their text scrolls: my photo beside "Who am I?", the facts tile of a company, the flowchart beside its step list. All three stop at the same point under the top bar, and none is sticky on a screen lower than 640px. |
| End of the page | The contact block, then my sunset picture, with nothing added around it. The sun keeps its proportions at every width and goes down behind the footer line. |

## The system

All values are tokens in `src/styles/ds/tokens.css`. A rule in a stylesheet uses a token. A raw value in a rule has a comment that says why (most are drawing units inside an SVG).

Type scale:

| Step | Size | Line height | Tracking | Used for |
|---|---|---|---|---|
| `hero` | 48 to 96px | 0.92 | -0.035em | my name (`h1`), Archivo 850 |
| `h2` | 30 to 52px | 1.08 | -0.03em | section headline, Archivo 780 |
| `h3` | 22 to 28px | 1.15 | -0.02em | chapter, company, group, application, Archivo 780 |
| `h4` | 18 to 20px | 1.3 | -0.01em | tile title, case title, role, Geist 600 |
| `lead` | 17 to 18px | 1.5 | 0 | lead under a headline |
| `body` | 16px | 1.6 | 0 | prose |
| `sm` | 15px | 1.5 | 0 | tile text, controls, secondary text |
| `xs` | 13px | 1.5 | 0 | captions, quiet labels, mono facts |
| `mark` | 12px | 1.5 | 0.06em | board mark in mono capitals; a dense line of mono facts (no capitals, no tracking) |
| `num-lg` | 36 to 48px | 1.1 | -0.02em | one large number, Archivo 780 |
| `num` | 22px | 1.1 | -0.02em | a number in a row |

Sizes are in rem, so they grow with the base size on wide screens. Weights: 400, 500, 600, 780 (display), 850 (my name and the wordmark).

Spacing scale: 4, 8, 12, 16, 24, 32, 48px (`--sp-1` to `--sp-12`). The steps by meaning:

| Step | Value | Between |
|---|---|---|
| `pair` | 8px | a label and the thing it names, a title and its meta line |
| `group` | 12px | paragraph and paragraph, headline and lead, a text and its links |
| `stack` | 16px | the groups of one block, the head of a chapter and its content |
| `block` | 24 to 36px | block and block, the head of a section and its content |
| `chapter` | 40 to 64px | chapter and chapter inside a section |
| `section` | 64 to 104px | section and section |
| `col` | 24 to 56px | two columns |
| `pad-tile` | 16 to 24px | the edge of a tile and its content |
| `pad-row` | 8px | a row and its hairline |

Two columns are always 7 parts and 5 parts (my photo: 8 and 4). Radii: 12px (tiles, frames, pictures), 8px (controls, thumbnails), 4px (tags), round (round buttons, dots). Lines: a hairline (8% white), a strong line (18% white), a solid grey for marks that must read as a shape.

## Files

| File | Holds |
|---|---|
| `src/styles/ds/tokens.css` | Every value: colour (`--c-*`), type scale (`--fs-*`, `--lh-*`, `--ls-*`, `--fw-*`), space (`--sp-*`, `--gap-*`, `--pad-*`), widths, radii (`--r-*`), motion. |
| `src/styles/ds/editorial.css` | Reusable parts: display type, rulers, dot field, readout, tags, segmented control, flowchart (classes that start with `wh-`). |
| `src/styles/site.css` | The page: base, links and buttons, top bar, hero, end of the page. |
| `src/smooth.js` | Lenis: when it runs, its settings, and `goTo()`, the one function that moves the page to an element. |
| `src/styles/bento.css` + `src/components/bento/` | Chapters, the grid and the tiles. |
| `src/styles/art.css` + `src/components/art/kit/` | The frame and the parts of every drawing. |
| `scripts/og.mjs` | Makes `public/og.png` (1200 x 630) from the hero of the built site: name, alias, role line and badge. Reads `PF_DIST`. |
| `scripts/sunset.mjs` | Makes the sunset pictures from `scripts/sources/sunset.svg`. The SVG has 19 blur filters and needs a long paint, so the page loads a WebP made from it. |

## Checks

- `node scripts/contrast.mjs`: every text colour pair is at least 4.5:1. Text on the red button is the ground colour (5.0:1). White on red fails (3.9:1) and is not used.
- `npm run check:responsive`: 19 screens from 320x568 to 5120x1440, in both languages. Nothing scrolls sideways, no text is cut, controls are 44px on touch screens.
- `npm run check:browser`: no console error, no failed request, no request to another host.
- Every control has a visible focus ring. The skip link goes to the content.
