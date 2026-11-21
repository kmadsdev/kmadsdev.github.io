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

All the text and all the addresses of the site are in three files. No sentence and no address is in a component. Each file starts with a short "how to edit" note and a table of contents.

```
src/content/
  contents.global.js   all that is equal in both languages: addresses, numbers, dates, names,
                       stacks, list orders, anchor ids, the data of each drawing, the page
                       metadata (`meta`, English only) and the music (`music`)
  contents.en.js       English text, in the order of the page
  contents.pt.js       Portuguese text, the same keys in the same order
  index.js             exports `content` ({ en, pt }) and every named export of contents.global.js
  rich.js              paragraphs with links and bold text: link(text, to), strong(text)
  format.js            date, time and number formats: period(), duration(), ptNumber(), local()
```

- To change where a button or a link goes: edit its address in `contents.global.js` (`links`, or `projects` for an application).
- To change a number, a date or a name: edit `contents.global.js`. Both languages change.
- To change a sentence, a label or a button text: edit the same key in `contents.en.js` and in `contents.pt.js`. Search the file for words that you see on the page.
- `index.html` has no text of its own: Vite writes its title, description, link preview tags and JSON-LD from `meta` and its `<noscript>` text from the two language files (`scripts/index-html.mjs`). The 404 page comes from `notFound` (`scripts/build-404.mjs`). `node scripts/seo-files.mjs` writes `public/robots.txt`, `public/sitemap.xml` and `public/llms.txt` from `contents.global.js`.
- A paragraph with links is a list of parts: a string, a link `{ text, to }` or a bold part `{ text, strong: true }`. `to` is an id of `anchors` with `#` (`'#app-consignado'`) or an `https://` address.

`npm test` fails when the two languages do not have the same keys, when a link points to an anchor that does not exist, when a flowchart has a node with no label, or when a text breaks a content rule (for example, a dash used as punctuation).

## Add an application with a clip

1. Make the clip and its poster from a screen recording (needs `ffmpeg`):

   ```bash
   scripts/import-clip.sh <recording> <name> [start s] [length s] [poster time s]
   ```

   It writes `public/assets/projects/<name>.mp4` (1280 wide, 24 fps, no sound) and `<name>.jpg`.
2. In `src/content/contents.global.js`, add the application to `projects`: `name`, `stack`, and `live`, `repo`, `image` and `video` (the addresses). A study project has `repoName` and `repo`, and no picture.
3. Add its id to `order.apps.production`, `order.apps.other` or `order.apps.study`, and its anchor `app-<id>` to `anchors.applications`.
4. Add one item with the same id and anchor to `applications.production.items`, `applications.other.items` or `applications.study.items` in `contents.en.js` and in `contents.pt.js`, with the keys of the items next to it.
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

The drawings are SVG made from data: `art.<key>` in `contents.global.js` holds the structure, `t.intro.art.<key>` the labels, and `src/components/art/` the drawing. The flowcharts work the same way: `cases[id].flow` has the nodes and the edges, `src/components/flowGeometry.js` the position of each node. [`DESIGN.md`](DESIGN.md) records the design decisions.

## Deploy

A push to `main` runs the workflow in `.github/workflows/deploy.yml`: tests, build, browser check, responsive check, publish to the `gh-pages` branch, then a check of the live site. A pull request runs the checks only.

To go back to an older version, revert the commit on `main` and push. The workflow publishes the older build.

## License

The code is under the [MIT license](LICENSE). The texts and the images are not: they belong to Kaique Souza.

## Credits

Music: "may" by [Birocratic](https://birocratic.com), from the album [beets 3](https://birocratic.bandcamp.com/album/beets-3) (2015). All rights belong to the artist. The song is not under the MIT license. It is used here with credit, as the artist asks for free projects.
