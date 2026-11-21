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

Todo o texto e todos os endereços do site ficam em três arquivos. Nenhuma frase e nenhum endereço fica em componente. Cada arquivo começa com uma nota curta de "como editar" e um sumário.

```
src/content/
  contents.global.js   tudo o que é igual nas duas línguas: endereços, números, datas, nomes,
                       stacks, ordem das listas, ids de âncora, os dados de cada desenho, os
                       metadados da página (`meta`, só em inglês) e a música (`music`)
  contents.en.js       o texto em inglês, na ordem da página
  contents.pt.js       o texto em português, com as mesmas chaves na mesma ordem
  index.js             exporta `content` ({ en, pt }) e cada export de contents.global.js
  rich.js              parágrafos com links e negrito: link(text, to), strong(text)
  format.js            formatos de data, hora e número: period(), duration(), ptNumber(), local()
```

- Para mudar para onde um botão ou um link vai: edite o endereço em `contents.global.js` (`links`, ou `projects` para uma aplicação).
- Para mudar um número, uma data ou um nome: edite `contents.global.js`. As duas línguas mudam.
- Para mudar uma frase, um rótulo ou o texto de um botão: edite a mesma chave em `contents.en.js` e em `contents.pt.js`. Busque no arquivo as palavras que você vê na página.
- O `index.html` não tem texto próprio: o Vite escreve o título, a descrição, as tags de prévia de link e o JSON-LD a partir de `meta`, e o texto do `<noscript>` a partir dos dois arquivos de língua (`scripts/index-html.mjs`). A página 404 vem de `notFound` (`scripts/build-404.mjs`). O `node scripts/seo-files.mjs` escreve `public/robots.txt`, `public/sitemap.xml` e `public/llms.txt` a partir de `contents.global.js`.
- Um parágrafo com links é uma lista de partes: um texto, um link `{ text, to }` ou uma parte em negrito `{ text, strong: true }`. `to` é um id de `anchors` com `#` (`'#app-consignado'`) ou um endereço `https://`.

`npm test` falha quando os dois idiomas não têm as mesmas chaves, quando um link aponta para uma âncora que não existe, quando um fluxograma tem um nó sem rótulo ou quando um texto quebra uma regra de conteúdo (por exemplo, travessão usado como pontuação).

## Como adicionar uma aplicação com clipe

1. Faça o clipe e o pôster a partir de uma gravação de tela (precisa do `ffmpeg`):

   ```bash
   scripts/import-clip.sh <gravação> <nome> [início s] [duração s] [tempo do pôster s]
   ```

   Ele grava `public/assets/projects/<nome>.mp4` (1280 de largura, 24 fps, sem som) e `<nome>.jpg`.
2. Em `src/content/contents.global.js`, adicione a aplicação em `projects`: `name`, `stack`, e `live`, `repo`, `image` e `video` (os endereços). Um projeto de estudo tem `repoName` e `repo`, e nenhuma imagem.
3. Adicione o id em `order.apps.production`, `order.apps.other` ou `order.apps.study`, e a âncora `app-<id>` em `anchors.applications`.
4. Adicione um item com o mesmo id e a mesma âncora em `applications.production.items`, `applications.other.items` ou `applications.study.items` em `contents.en.js` e em `contents.pt.js`, com as chaves dos itens ao lado.
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

Os desenhos são SVG feitos a partir de dados: `art.<chave>` em `contents.global.js` tem a estrutura, `t.intro.art.<chave>` os rótulos, e `src/components/art/` o desenho. Os fluxogramas funcionam do mesmo jeito: `cases[id].flow` tem os nós e as arestas, `src/components/flowGeometry.js` a posição de cada nó. O [`DESIGN.md`](DESIGN.md) registra as decisões de design.

## Deploy

Um push na `main` roda o workflow em `.github/workflows/deploy.yml`: testes, build, verificação no navegador, verificação responsiva, publicação na branch `gh-pages` e, por fim, uma verificação do site no ar. Um pull request roda só as verificações.

Para voltar a uma versão anterior, reverta o commit na `main` e faça o push. O workflow publica o build anterior.

## Licença

O código está sob a [licença MIT](LICENSE). Os textos e as imagens não: eles pertencem a Kaique Souza.

## Créditos

Música: "may", de [Birocratic](https://birocratic.com), do álbum [beets 3](https://birocratic.bandcamp.com/album/beets-3) (2015). Todos os direitos pertencem ao artista. A música não está sob a licença MIT. Ela é usada aqui com crédito, como o artista pede para projetos gratuitos. Capa do álbum: fotografia, design gráfico e arte de Brian Ecklund.
