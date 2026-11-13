# kmads.dev

[English](README.md) | [Português](README.pt-br.md)

O portfólio de Kaique Souza (Kmads), no ar em [kmads.dev](https://kmads.dev). Uma página, em inglês e português, com tema escuro e tema claro.

## Como rodar

Você precisa do Node.js 20 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:1337
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm test` | Testes de unidade e de página (Vitest) |
| `npm run build` | Build de produção em `dist/`, com a página 404 |
| `npm run preview` | Serve o `dist/` em http://localhost:1338 |
| `npm run check:browser` | Abre o build no Chrome: desktop e celular, os dois idiomas, os dois temas |
| `npm run check:links` | Faz uma requisição para cada link do site |
| `npm run check` | Testes, build e verificação no navegador, nesta ordem |

O `npm run check:browser` precisa do Google Chrome instalado.

## Como mudar um texto

Todo o texto fica em `src/content/`. Nenhum texto fica em componente.

```
src/content/
  facts.js     números, datas, nomes e links. Os dois idiomas leem este arquivo.
  en/          frases em inglês, um arquivo por seção
  pt/          frases em português, mesmos arquivos e mesmas chaves
  format.js    formatos de data e de número
```

- Para mudar um número, uma data ou um link: edite o `facts.js`. Os dois idiomas mudam.
- Para mudar uma frase: edite a mesma chave em `en/` e em `pt/`.
- Para adicionar um projeto: adicione em `facts.projects` e em `facts.projectOrder`, depois adicione um item com o mesmo `id` em `en/projects.js` e em `pt/projects.js`.

O `npm test` falha quando os dois idiomas não têm as mesmas chaves, quando um fluxograma tem um nó sem rótulo ou quando um texto quebra uma regra de conteúdo (por exemplo, travessão usado como pontuação).

## Como mudar o design

```
src/styles/
  ds/tokens.css      cores, espaçamento, escala de tipos e movimento (gerado, não edite)
  ds/editorial.css   partes reutilizáveis: réguas, campo de pontos, faixa de leitura, fluxograma, tags
  site.css           layout desta página
```

Os fluxogramas são dados: `facts.cases[id].flow` tem os nós e as arestas, `src/components/flowGeometry.js` tem a posição de cada nó, e os arquivos de idioma têm os rótulos. O [`DESIGN.md`](DESIGN.md) registra as decisões de design.

## Deploy

Um push na `main` roda o workflow em `.github/workflows/deploy.yml`: testes, build, verificação no navegador, publicação na branch `gh-pages` e, por fim, uma verificação do site no ar. Um pull request roda só as verificações.

Para voltar a uma versão anterior, reverta o commit na `main` e faça o push. O workflow publica o build anterior.

## Licença

O código está sob a [licença MIT](LICENSE). Os textos e as imagens não: eles pertencem a Kaique Souza.
