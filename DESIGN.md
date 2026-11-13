# Design of kmads.dev

The page looks and behaves like a measuring instrument: a graphite ground, 1px hairlines, square corners, and one red index mark. It shows backend work, so the main objects are flowcharts that run, not screenshots.

## Decisions

| Area | Decision |
|---|---|
| Colour | Neutrals do the work. Red (`#FF014F`) marks where to act and where you are: the primary button, the scroll index, the active step. Green means "current" and nothing else. |
| Themes | Dark is the default. Light is a full theme with the same contrast relations. The choice is saved. |
| Type | Archivo (a little wide, heavy) for headlines and numbers. Geist for text. Geist Mono only for facts: dates, codes, labels, stack names. Sentence case. |
| Shape | Corners 0 to 2px. No card shadows. Depth comes from hairlines and one lighter surface step. |
| Rulers | A fixed ruler on the left and one under the top bar. The red index shows scroll progress. Grey marks show the pointer position. Hidden below 1024px. |
| Dot field | A canvas behind the page. Dots near the pointer grow and move away. It draws only when the pointer or the page moves. |
| Flowcharts | SVG made from data. One step is active: its line is red and a packet moves on it. The steps play while the chart is on screen and stop under the pointer. The step list next to the chart is the text form of the same data. |
| Layout | Each section has a mono label in a left column that stays in view. Case files keep the flowchart in view while the story scrolls. |
| Motion | One authored entrance (the hero headline). All other motion shows a state change. With reduced motion: no packet, no autoplay, a still dot field, fades only. |

## Tokens and parts

`src/styles/ds/tokens.css` is generated from the design system this site shares with my other apps. `src/styles/ds/editorial.css` holds the reusable parts (classes that start with `wh-`). `src/styles/site.css` is the layout of this page only.

## Checks

- Text contrast is at least 4.5:1 in both themes (the tokens are tested at the source).
- Nothing scrolls sideways at 390px. A flowchart scrolls inside its own frame.
- Every control has a visible focus ring and a 44px target on touch screens.
