# kmads.dev

[English](README.md) | [Português](README.pt-br.md)

Meu portfólio, no ar em [kmads.dev](https://kmads.dev). Uma página, em inglês e português, só com tema escuro. O topo da página diz o que eu faço. O resto da página é a prova: meu trabalho em empresas, os casos com os fluxogramas, as aplicações que eu rodo em produção com clipes delas, e o código.

## Seções

| Id | O que mostra |
|---|---|
| `top` | Nome, cargo, os quatro links principais, local e hora local, o selo que gira |
| `intro` | Quem eu sou, depois um capítulo por área: arquitetura, backend, cloud, CI/CD, full-stack, finanças, IA e projetos de ponta a ponta. Cada capítulo tem um desenho que roda e links para a prova mais abaixo na página |
| `experience` | Empresas, cargos, responsabilidades e impacto, e os casos com os fluxogramas |
| `education` | Meu curso técnico e três certificados |
| `applications` | O que roda em produção, depois meus projetos de estudo, com clipes das aplicações funcionando. `kmads.dev/projects` abre a página nesta seção |
| `more` | Voluntariado, idiomas, hobbies e projetos futuros |
| `contact` | E-mail e links, o pôr do sol e o rodapé |

As partes longas abrem no lugar (um elemento `<details>`). O texto delas fica na página, então a busca e o "localizar na página" ainda encontram o texto.

## Como rodar

Você precisa do Node.js 20 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:1337
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm test` | Testes de conteúdo, de página e dos fluxogramas (Vitest) |
| `npm run build` | Build de produção em `dist/`, com a página 404 e o `projects.html` |
| `npm run preview` | Serve o `dist/` em http://localhost:1338 |
| `npm run check:browser` | Abre o build em um navegador real, desktop e celular, os dois idiomas. Falha com erro no console, requisição com falha, requisição para outro host, rolagem lateral ou seção faltando |
| `npm run check:responsive` | Verifica o layout em 19 telas, de 320x568 a 5120x1440: rolagem lateral, texto cortado, alvos de toque pequenos |
| `npm run check:links` | Faz uma requisição para cada link do site |
| `npm run check` | Todas as verificações nesta ordem: testes, build, verificação no navegador, verificação responsiva |
| `node scripts/section-heights.mjs [en\|pt]` | Altura de cada seção em telas, em 1440x900, 390x844 e 3440x1440 |
| `node scripts/shots.mjs <pasta> [desktop\|phone\|LARGURAxALTURA] [en\|pt] <seletor>...` | Capturas de tela de partes da página |

Duas variáveis de ambiente mudam o que os scripts usam:

- `PF_DIST=<pasta>`: o build que os scripts de verificação e de captura servem. O padrão é `dist`. Para fazer o build em outra pasta:

  ```bash
  export PF_DIST=/alguma/pasta/dist
  npx vite build --outDir "$PF_DIST" --emptyOutDir && node scripts/build-404.mjs
  PF_DIST="$PF_DIST" node scripts/browser-check.mjs
  ```

- `PF_BROWSER=chrome` ou `PF_BROWSER=shell`: o navegador que os scripts abrem. Por padrão eles usam o headless shell do Playwright quando ele está no cache do Playwright, e o Google Chrome instalado quando não está.

## Como mudar um texto

Todo o texto e todos os endereços do site ficam em um arquivo: `src/content/content.js`. Nenhuma frase e nenhum endereço fica em componente. O arquivo começa com uma nota curta de "como editar" e um sumário.

```
src/content/content.js
  PART 1  links    todos os endereços: perfis, aplicações no ar, repositórios, documentos,
                   imagens, clipes, /projects e a seção que ele abre
  PART 2  facts    números, datas, nomes, stacks, ordem das listas, ids de âncora e a
                   estrutura de cada desenho. Os dois idiomas leem esta parte.
  PART 3  en       texto em inglês, na ordem da página
  PART 4  pt       texto em português, as mesmas chaves na mesma ordem
src/content/
  index.js     exporta content, facts e links (componentes e testes importam daqui)
  rich.js      parágrafos com links: link(texto, destino)
  format.js    formatos de data, tempo e número: period(), duration(), ptNumber()
```

- Para mudar para onde um botão ou um link vai: edite o endereço na PART 1.
- Para mudar um número, uma data ou um nome: edite a PART 2. Os dois idiomas mudam.
- Para mudar uma frase, um rótulo ou o texto de um botão: edite a mesma chave na PART 3 e na PART 4. Busque no arquivo as palavras que você vê na página.
- O `index.html` não tem texto próprio: o Vite escreve o título, a descrição, as tags de prévia de link e o texto do `<noscript>` a partir do `content.js` (`scripts/index-html.mjs`). A página 404 vem de `notFound` (`scripts/build-404.mjs`). O `public/sitemap.xml` e o `public/robots.txt` têm o endereço do site escrito à mão.
- Um parágrafo com links é uma lista de partes: uma string, ou um link `{ text, to }`. `to` é um id de âncora de `facts.anchors` (`'#app-consignado'`) ou um endereço `https://`.

O `npm test` falha quando os dois idiomas não têm as mesmas chaves, quando um link aponta para uma âncora que não existe, quando um fluxograma tem um nó sem rótulo ou quando um texto quebra uma regra de conteúdo (por exemplo, travessão usado como pontuação).

## Como adicionar uma aplicação com clipe

1. Faça o clipe e o pôster a partir de uma gravação de tela (precisa do `ffmpeg`):

   ```bash
   scripts/import-clip.sh <gravação> <nome> [início s] [duração s] [tempo do pôster s]
   ```

   Ele grava `public/assets/projects/<nome>.mp4` (1280 de largura, 24 fps, sem som) e `<nome>.jpg`.
2. No `src/content/content.js`, adicione os endereços na PART 1 (`<nome>Live`, `<nome>Repo`, `<nome>Image`, `<nome>Video`). Depois adicione a aplicação em `facts.projects` na PART 2: `name`, `status` (`'live'` ou `'study'`), `stack`, e `live`, `source`, `image` e `video` lendo esses endereços (`live: links.<nome>Live`).
3. Adicione o id em `facts.appOrder.live` ou `facts.appOrder.study`. A âncora `#app-<id>` vem desta lista.
4. Adicione um item com o mesmo id em `applications.live.items` ou `applications.study.items` na PART 3 e na PART 4 (uma tagline, de duas a quatro frases e as outras chaves `null`, como nos itens ao lado).
5. Rode `npm test`.

Um clipe fica sem som, em loop, e só carrega e toca enquanto está na tela. Com movimento reduzido ou Save-Data, só o pôster aparece. O botão de tocar e pausar sempre existe.

## Como mudar o design

```
src/styles/
  ds/tokens.css      cores, espaçamento, tipos e movimento
  ds/editorial.css   partes compartilhadas: réguas, campo de pontos, rótulos, fluxograma, tags
  site.css           moldura da página, cabeçalho, hero, contato e rodapé
  bento.css          capítulos, o grid e os tiles
  art.css            o estilo de linha dos desenhos
  sections/          um arquivo por seção
```

Os desenhos são SVG feitos a partir de dados: `facts.art.<chave>` tem a estrutura, `t.intro.art.<chave>` os rótulos, e `src/components/art/` o desenho. Os fluxogramas funcionam do mesmo jeito: `facts.cases[id].flow` tem os nós e as arestas, `src/components/flowGeometry.js` a posição de cada nó. O [`DESIGN.md`](DESIGN.md) registra as decisões de design.

## Deploy

Um push na `main` roda o workflow em `.github/workflows/deploy.yml`: testes, build, verificação no navegador, verificação responsiva, publicação na branch `gh-pages` e, por fim, uma verificação do site no ar. Um pull request roda só as verificações.

Para voltar a uma versão anterior, reverta o commit na `main` e faça o push. O workflow publica o build anterior.

## Licença

O código está sob a [licença MIT](LICENSE). Os textos e as imagens não: eles pertencem a Kaique Souza.
