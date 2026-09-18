# Design

## Context

A marca ja esta centralizada em `src/brand/brand.ts`: `BrandLogo`, as paginas e `generatePdf` leem nome, artes e parametros da marca d'agua desse modulo. As artes vivem em `src/assets/brand/` e sao importadas apenas por ele. As artes Vertex em `marca-nova/` mantem os mesmos `viewBox` das atuais (240x64 para logo completa e marca d'agua, 64x64 para o icone) e usam IDs de gradiente proprios (`vertexFull`, `vertexIcon`).

Ficam **fora** do modulo de marca e ainda citam Orbita:

- `index.html` (`<title>Orbita</title>`), servido estaticamente pelo Vite;
- `public/favicon.svg`, copia da arte do icone Orbita;
- `src/hooks/useSidebar.ts`, chave de `localStorage` `orbita:sidebar-collapsed`;
- `openspec/config.yaml`, contexto textual dos agentes.

Motivacao: ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**

- Trocar a marca alterando apenas artes, `brand.ts` e os pontos estaticos (HTML e favicon), sem tocar em componentes nem em `src/lib/pdf/`.
- Preservar o enquadramento da marca d'agua (mesma razao 3,75) e a opacidade atual.
- Cobrir o comportamento observavel com testes Playwright.

**Non-Goals:**

- Redesenhar ou ajustar as artes da Vertex.
- Tornar o titulo da aba dinamico a partir de `brand.ts` (exigiria alterar componente ou `main.tsx`).
- Alterar o texto do desafio no `README.md` da raiz.

## Decisions

### 1. Substituir os arquivos em vez de reapontar imports

Copiar `marca-nova/*.svg` sobre `src/assets/brand/*.svg`, mantendo os nomes de arquivo.

- **Por que:** `brand.ts` continua importando os mesmos caminhos; a mudanca de codigo se resume ao `name`. `marca-nova/` segue como material de entrada, fora do bundle.
- **Alternativa considerada:** apontar os imports de `brand.ts` para `marca-nova/`. Rejeitada: acopla a aplicacao a uma pasta que o README declara como "nao lida pela aplicacao".

### 2. Parametros da marca d'agua inalterados

Manter `watermarkOpacity: 0.08`, `watermarkWidthRatio: 0.62` e `watermarkRotation: 30`.

- **Por que:** a arte nova tem a mesma razao de aspecto, entao o enquadramento se mantem. A arte e monocromatica (`#0f766e`), mais escura que o gradiente Orbita; 0,08 continua dentro do limite de 0,15 e deve ser conferido visualmente no PDF.
- **Alternativa considerada:** reduzir a opacidade para compensar a cor mais escura. Adiada para a conferencia visual (tarefa 3.3); so muda se a leitura for prejudicada.

### 3. `tagline` mantida

O texto atual ("Mini sistema de demonstracao para o teste pratico.") nao cita a marca, entao continua valido. Muda-se apenas `name`.

### 4. Titulo e favicon atualizados como arquivos estaticos

`index.html` passa a `<title>Vertex</title>` e `public/favicon.svg` recebe o conteudo de `marca-nova/logo-icon.svg`.

- **Por que:** sao os unicos pontos visiveis fora do modulo de marca; deixa-los como Orbita violaria o requisito "Marca vigente Vertex". Sao arquivos estaticos, nao componentes, entao a restricao de nao alterar componentes e respeitada.
- **Alternativa considerada:** gerar titulo e favicon a partir de `brand.ts` em tempo de execucao. Rejeitada por exigir codigo novo em componente ou ponto de entrada, fora do escopo de uma troca de marca.

### 5. Chave de `localStorage` mantida (`orbita:sidebar-collapsed`)

- **Por que:** a chave nao e visivel ao usuario. Renomea-la faria quem ja usa o sistema perder a preferencia de barra lateral recolhida, e exigiria editar um hook, o que contraria a meta de nao tocar codigo de interface.
- **Trade-off:** fica um resquicio do nome antigo no codigo. Registrado aqui para ser uma escolha consciente, e nao um esquecimento.

### 6. Testes Playwright gerados por codegen e depois refinados

Gravar os fluxos com `npm run codegen` e ajustar o resultado para usar os `data-testid` existentes, com um arquivo por area: barra lateral, navegacao e PDF. O download e verificado com `page.waitForEvent('download')` e pelo sufixo `.pdf` do nome sugerido.

## Risks / Trade-offs

- [Fonte do sistema diferente na rasterizacao da marca d'agua] → As artes usam apenas a pilha de fontes do sistema, sem recursos externos; conferir o PDF gerado no Chromium.
- [Marca d'agua monocromatica mais visivel que a anterior] → Conferencia visual dos dois PDFs; se atrapalhar a leitura, reduzir `watermarkOpacity` sem ultrapassar 0,15.
- [Cache do favicon no navegador] → Pode continuar mostrando o icone antigo durante a revisao local; recarregar sem cache.
- [Chave `orbita:` no localStorage] → Ver decisao 5.
