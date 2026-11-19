# kmads.dev

[English](README.md) | [Português](README.pt-br.md)

My portfolio, live at [kmads.dev](https://kmads.dev). One page, in English and Portuguese, dark only. The top of the page says what I do. The rest of the page is the proof: my work at companies, the cases with their flowcharts, the applications I run in production with clips of them, and the code.

## Sections

| Id | What it shows |
|---|---|
| `top` | Name, role, the four main links, place and local time, the turning badge |
| `intro` | Who I am, then one chapter per area: architecture, backend, cloud, CI/CD, full-stack, finance, AI and end-to-end projects. Each chapter has a drawing that runs and links to its proof lower on the page |
| `experience` | Companies, roles, responsibilities and impact, and the case files with their flowcharts |
| `education` | My technical program and three certificates |
| `applications` | What runs in production, then my study projects, with clips of the working apps. `kmads.dev/projects` opens the page at this section |
| `more` | Volunteering, languages, hobbies and future projects |
| `contact` | Email and links, the sunset and the footer |

Long parts open in place (a `<details>` element). Their text stays in the page, so search and find-in-page still see it.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:1337
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm test` | Content, page and flowchart tests (Vitest) |
| `npm run build` | Production build in `dist/`, with the 404 page and `projects.html` |
| `npm run preview` | Serves `dist/` at http://localhost:1338 |
| `npm run check:browser` | Opens the build in a real browser, desktop and phone, both languages. Fails on a console error, a failed request, a request to another host, sideways scroll or a missing section |
| `npm run check:responsive` | Checks the layout at 19 screens, from 320x568 to 5120x1440: sideways scroll, cut text, small touch targets |
| `npm run check:links` | Requests every link of the site |
| `npm run check` | All the gates in this order: tests, build, browser check, responsive check |
| `node scripts/section-heights.mjs [en\|pt]` | Height of each section in screens, at 1440x900, 390x844 and 3440x1440 |
| `node scripts/shots.mjs <dir> [desktop\|phone\|WIDTHxHEIGHT] [en\|pt] <selector>...` | Screenshots of parts of the page |

Two environment variables change what the scripts use:

- `PF_DIST=<folder>`: the build that the check and screenshot scripts serve. The default is `dist`. To build to another folder:

  ```bash
  export PF_DIST=/some/folder/dist
  npx vite build --outDir "$PF_DIST" --emptyOutDir && node scripts/build-404.mjs
  PF_DIST="$PF_DIST" node scripts/browser-check.mjs
  ```

- `PF_BROWSER=chrome` or `PF_BROWSER=shell`: the browser that the scripts start. By default they use the Playwright headless shell when it is in the Playwright cache, and the installed Google Chrome when it is not.

## Change a text

All the text is in `src/content/`. No sentence is in a component.

```
src/content/
  facts.js     numbers, dates, names, links, anchor ids and the structure of each drawing.
               Both languages read this file.
  en/          English sentences, one file per section
  pt/          Portuguese sentences, same files and same keys
  rich.js      paragraphs with links
  format.js    date and number formats
```

- To change a number, a date or a link: edit `facts.js`. Both languages change.
- To change a sentence: edit the same key in `en/` and in `pt/`.
- A paragraph with links is a list of parts: a string, or a link `{ text, to }`. `to` is an anchor id of `facts.anchors` (`'#app-consignado'`) or an `https://` address.

`npm test` fails when the two languages do not have the same keys, when a link points to an anchor that does not exist, when a flowchart has a node with no label, or when a text breaks a content rule (for example, a dash used as punctuation).

## Add an application with a clip

1. Make the clip and its poster from a screen recording (needs `ffmpeg`):

   ```bash
   scripts/import-clip.sh <recording> <name> [start s] [length s] [poster time s]
   ```

   It writes `public/assets/projects/<name>.mp4` (1280 wide, 24 fps, no sound) and `<name>.jpg`.
2. Add the application to `facts.projects` in `facts.js`: `name`, `status` (`'live'` or `'study'`), `stack`, `live` and `source` addresses, `image: '/assets/projects/<name>.jpg'` and `video: '/assets/projects/<name>.mp4'`.
3. Add its id to `facts.appOrder.live` or `facts.appOrder.study`. The anchor `#app-<id>` comes from this list.
4. Add one item with the same id to `live.items` or `study.items` in `en/applications.js` and `pt/applications.js` (a tagline and two to four sentences).
5. Run `npm test`.

A clip is muted, loops, and loads and plays only while it is on screen. With reduced motion or Save-Data, only the poster shows. The play and pause button is always there.

## Change the design

```
src/styles/
  ds/tokens.css      colours, spacing, type and motion
  ds/editorial.css   shared parts: rulers, dot field, labels, flowchart, tags
  site.css           page frame, header, hero, contact and footer
  bento.css          chapters, the grid and the tiles
  art.css            the line style of the drawings
  sections/          one file per section
```

The drawings are SVG made from data: `facts.art.<key>` holds the structure, `t.intro.art.<key>` the labels, and `src/components/art/` the drawing. The flowcharts work the same way: `facts.cases[id].flow` has the nodes and the edges, `src/components/flowGeometry.js` the position of each node. [`DESIGN.md`](DESIGN.md) records the design decisions.

## Deploy

A push to `main` runs the workflow in `.github/workflows/deploy.yml`: tests, build, browser check, responsive check, publish to the `gh-pages` branch, then a check of the live site. A pull request runs the checks only.

To go back to an older version, revert the commit on `main` and push. The workflow publishes the older build.

## License

The code is under the [MIT license](LICENSE). The texts and the images are not: they belong to Kaique Souza.
