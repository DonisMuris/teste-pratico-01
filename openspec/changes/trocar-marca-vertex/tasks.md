# Tasks

## 1. Artes e configuracao da marca

- [ ] 1.1 Copiar `marca-nova/logo-full.svg`, `logo-icon.svg` e `watermark.svg` para `src/assets/brand/`, substituindo as artes Orbita, e verificar com `git diff --stat` que so esses tres arquivos mudaram nessa pasta
- [ ] 1.2 Alterar `name` para `'Vertex'` em `src/brand/brand.ts`, mantendo os demais campos, e verificar que `npm run typecheck` passa
- [ ] 1.3 Confirmar que nenhum componente nem `src/lib/pdf/` foi alterado, com `git diff --stat src/components src/lib src/pages` vazio

## 2. Identificacao na aba do navegador

- [ ] 2.1 Atualizar `<title>` em `index.html` para `Vertex` e verificar o titulo da aba com `npm run dev`
- [ ] 2.2 Substituir `public/favicon.svg` pelo conteudo de `marca-nova/logo-icon.svg` e verificar o icone da aba (recarregar sem cache)

## 3. Conferencia manual

- [ ] 3.1 Com a barra lateral expandida e recolhida, verificar a logo completa e o icone da Vertex, com texto alternativo "Vertex"
- [ ] 3.2 Verificar "Vertex" nos textos da tela Inicio e do Certificado
- [ ] 3.3 Gerar os PDFs de Relatorio e Certificado e verificar a marca d'agua Vertex centralizada, legivel e discreta em todas as paginas, com rodape "Vertex - gerado em ..."; guardar os PDFs e as capturas para o PR

## 4. Testes Playwright

- [ ] 4.1 Gravar com `npm run codegen` e salvar `tests/e2e/sidebar.spec.ts`: recolher e expandir alterna `brand-logo-full` e `brand-logo-icon`, o `alt` contem "Vertex" e o estado recolhido persiste apos recarregar; verificar com `npm run test:e2e`
- [ ] 4.2 Gravar e salvar `tests/e2e/navegacao.spec.ts`: `nav-inicio`, `nav-relatorio` e `nav-certificado` exibem `page-*` e a URL correspondente, e a tela Inicio exibe "Vertex"; verificar com `npm run test:e2e`
- [ ] 4.3 Gravar e salvar `tests/e2e/pdf.spec.ts`: `generate-pdf` dispara um download com sufixo `.pdf` nas telas Relatorio e Certificado; verificar com `npm run test:e2e`
- [ ] 4.4 Refinar o codigo gerado pelo codegen (seletores por `data-testid`, `test.describe` por area, sem passos redundantes) e verificar que a suite inteira passa com `npm run test:e2e`

## 5. Qualidade e contexto

- [ ] 5.1 Atualizar a descricao do projeto em `openspec/config.yaml` de "Orbita" para "Vertex" e verificar com `npx openspec validate --all --strict`
- [ ] 5.2 Verificar que `npm run typecheck` e `npm run build` concluem sem erros
- [ ] 5.3 Verificar com `grep -ri orbita src public index.html` que a unica ocorrencia restante e a chave de `localStorage` documentada no design (decisao 5)
