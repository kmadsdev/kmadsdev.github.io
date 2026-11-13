# kmads.dev

[English](README.md) | [Português](README.pt-br.md)

The portfolio of Kaique Souza (Kmads), live at [kmads.dev](https://kmads.dev). One page, in English and Portuguese, with a dark and a light theme.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:1337
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm test` | Unit and page tests (Vitest) |
| `npm run build` | Production build in `dist/`, with the 404 page |
| `npm run preview` | Serves `dist/` at http://localhost:1338 |
| `npm run check:browser` | Opens the build in Chrome: desktop and phone, both languages, both themes |
| `npm run check:links` | Requests every link of the site |
| `npm run check` | Tests, build and browser check, in this order |

`npm run check:browser` needs Google Chrome on the machine.

## Change a text

All the text is in `src/content/`. No text is in a component.

```
src/content/
  facts.js     numbers, dates, names and links. Both languages read this file.
  en/          English sentences, one file per section
  pt/          Portuguese sentences, same files and same keys
  format.js    date and number formats
```

- To change a number, a date or a link: edit `facts.js`. Both languages change.
- To change a sentence: edit the same key in `en/` and in `pt/`.
- To add a project: add it to `facts.projects` and to `facts.projectOrder`, then add one item with the same `id` to `en/projects.js` and `pt/projects.js`.

`npm test` fails when the two languages do not have the same keys, when a flowchart has a node with no label, or when a text breaks a content rule (for example, a dash used as punctuation).

## Change the design

```
src/styles/
  ds/tokens.css      colours, spacing, type scale and motion (generated, do not edit)
  ds/editorial.css   reusable parts: rulers, dot field, readout strip, flowchart, tags
  site.css           layout of this page
```

The flowcharts are data: `facts.cases[id].flow` has the nodes and the edges, `src/components/flowGeometry.js` has the position of each node, and the language files have the labels. [`DESIGN.md`](DESIGN.md) records the design decisions.

## Deploy

A push to `main` runs the workflow in `.github/workflows/deploy.yml`: tests, build, browser check, publish to the `gh-pages` branch, then a check of the live site. A pull request runs the checks only.

To go back to an older version, revert the commit on `main` and push. The workflow publishes the older build.

## License

The code is under the [MIT license](LICENSE). The texts and the images are not: they belong to Kaique Souza.
