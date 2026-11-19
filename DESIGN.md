# Design of kmads.dev

The page is a board of modules, like a motherboard or a gauge cluster. I tune car ECUs, build PCs and run servers, so the layout of my site is the layout of a board: a grid of tiles, small labels printed next to the parts, and lines that carry signal. The board is told with restraint. You feel it in the grid, the labels and the line art, not in decoration.

## Decisions

| Area | Decision |
|---|---|
| Theme | One theme: dark. Ground `#0B0B10`, tiles one soft step lighter (`#12121A`). |
| Colour | One accent per view: red `#FF014F`. It marks identity and action: the badge, the primary button, the scroll index, the line in use, the sun. The violet to blue gradient (`#B300FF` to `#009DFF`) means data in motion and lives only inside drawings. Mint `#00FFBB` is a status dot: "live now". Body text is never red, violet or blue. |
| Type | Archivo, wide and heavy, for headlines and numbers. Geist for text, 17 to 19px with a long line height. Geist Mono for facts: dates, labels, stack names. Sentence case. An uppercase poster word is rare: at most one per chapter. |
| Column | The content stands on one centred column (72rem). The base font size grows from 16px to 24px on very wide screens, so the column grows with it. Only the rulers, the dot field, section grounds and the sunset run edge to edge. |
| Air | A chapter has one label, one headline, one short lead, then its tiles. The space between chapters is large (about 180px on a laptop). No more than about five tiles on one screen. |
| Tiles | Radius 22px, a border you can hardly see. A tile holds one idea: a picture or a diagram on top, a short title, at most three lines of text. Long text goes in the text column of the chapter. A tile that is a link shows an arrow and reacts to the pointer. A tile that is not a link does not react. |
| Labels | A drawing or diagram tile can carry a small mono label with a reference number, as on a circuit board (`D10 · REQUEST PATH`). Screen readers get the plain name only. |
| Light | One soft red light per view is allowed behind the main object (the badge, a featured tile), like the light of the sunset. No glass, no noise, no gradient text. |
| Rulers | A fixed ruler on the left edge and one under the top bar, on every section. The red index shows scroll progress. Grey marks show the pointer position. Hidden below 1024px. |
| Hero | Name, role, a short summary, four links, place and local time. The dot field exists only here. Two bodies bend it: the badge (the dots leave its disc and turn around it) and the pointer. |
| Badge | My globe badge. The globe stays still and the red ring of text turns around it, only while it is on screen. The two parts keep the proportion of my original badge file. A press on it stops the turn. |
| Drawings | SVG, drawn from zero, in one hand: 1.5px strokes that do not scale, round joins, halftone dots for tone. A drawing moves only to show a real mechanism (a request on its path, the cell an engine control unit reads) and only while it is on screen. A number on a drawing is real, or the drawing has no numbers. |
| Flowcharts | SVG made from data. One step is active: its line is red and a packet moves on it. The step list next to the chart is the text form of the same data. |
| Disclosure | One control look for every "Read the full story" and "Show the details": the label and a small round plus that becomes a minus (`.toggle` in `bento.css`, `ToggleSign.jsx`). A case file row uses the same sign, larger. |
| Pause | A drawing that loops has a small pause button in its label row (`art/kit/Playback.jsx`). The flowcharts, the clips and the badge have their own. With reduced motion there is no button, because nothing moves. |
| Motion | One entrance for tiles: a 420ms fade with a 12px rise, 40ms apart, once. The hero name has its own entrance. All other motion shows a state change. With reduced motion: no packet, no turn, a still dot field, fades only. Nothing is lost: each moving picture has its meaning in text. |
| End of the page | The contact block, then my sunset. The sun keeps its proportions at every width and goes down behind the footer line. Red dots under the line are what is left of its light. |

## Files

| File | Holds |
|---|---|
| `src/styles/ds/tokens.css` | The palette (`--c-*`), shape, layout and motion values. The `--wh-*` names are older names of the same values. |
| `src/styles/ds/editorial.css` | Reusable parts: display type, rulers, dot field, readout, tags, segmented control, flowchart (classes that start with `wh-`). |
| `src/styles/site.css` | The page: top bar, hero, end of the page, and the older sections. |
| `src/styles/bento.css` + `src/components/bento/` | Chapters, the grid and the tiles. |
| `src/styles/art.css` + `src/components/art/kit/` | The frame and the parts of every drawing. |
| `scripts/og.mjs` | Makes `public/og.png` (1200 x 630) from the hero of the built site: name, alias, role line and badge. Reads `PF_DIST`. |
| `scripts/sunset.mjs` | Makes the sunset pictures from `scripts/sources/sunset.svg`. The SVG has 19 blur filters and needs a long paint, so the page loads a WebP made from it. |

## Checks

- `node scripts/contrast.mjs`: every text colour pair is at least 4.5:1. Text on the red button is the ground colour (5.0:1). White on red fails (3.9:1) and is not used.
- `npm run check:responsive`: 19 screens from 320x568 to 5120x1440, in both languages. Nothing scrolls sideways, no text is cut, controls are 44px on touch screens.
- `npm run check:browser`: no console error, no failed request, no request to another host.
- Every control has a visible focus ring. The skip link goes to the content.
