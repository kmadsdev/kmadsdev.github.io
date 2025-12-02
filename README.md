# Kmadsdev Portifolio (kmadsdev.github.io)
**Available at [https://kmads.dev/](https://kmads.dev/)**

---

### Initialize Project
```
npm install --save-dev gh-pages
```
### Run Dev Mode
```
npm run dev
```
### Run Preview Mode
```
npm run preview
```

---

### Apply changes & Send to Production:
```
npm run deploy
```
> This command wil automatically run:
- `npm run build && echo kmads.dev > dist/CNAME`
- `gh-pages -d dist --cname kmads.dev --nojekyll`

Which will create a `CNAME` file and send the contents of `dist/` to the `gh-pages` branch

---

### Project Structure
```
kmadsdev.github.io/
    ⊢ public/
    |    ⊢ assets/
    |    |  ⌞ ...
    |    ⌞ CNAME (Set the domain to the portifolio)
    ⊢ src/
    |    ⊢ components/
    |    |  ⌞ ...
    |    ⊢ styles/
    |    |  ⌞ ...
    |    ⊢ Constants.js
    |    ⊢ App.jsx
    |    ⊢ main.jsx
    |    ⊢ Projects.jsx
    |    ⌞ ProjectsPage.jsx
    ⊢ index.html
    ⊢ projects.html
    ⊢ 404.html
    ⊢ package.json
    ⊢ vite.config.js
    ⊢ CNAME (Set the domain to all projects within the github profile)
    ⌞ ...
```
After Build these ones will be added (they shouldn't be commited):
```
kmadsdev.github.io/
    ⊢ dist/
    |    ⊢ assets
    |    ⊢ index.html
    |    ⊢ projects.html
    |    ⊢ 404.html
    |    ⌞ CNAME
    ⊢ node_modules/
    |    ⌞ ...
    ⌞ package-lock.json
```
