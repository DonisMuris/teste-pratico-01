# Proposal

## Why

O sistema ainda se apresenta como **Orbita**, mas a identidade visual oficial passou a ser **Vertex**, com artes finais ja entregues em `marca-nova/`. Enquanto a troca nao acontece, a barra lateral, as telas e todo PDF gerado continuam carregando a marca antiga.

## What Changes

- A barra lateral passa a exibir a logo completa da Vertex (expandida) e o icone da Vertex (recolhida), com texto alternativo identificando a Vertex.
- Os PDFs das telas Relatorio e Certificado passam a receber a marca d'agua da Vertex (arte monocromatica), mantendo opacidade baixa (no maximo 0,15), centralizacao e presenca em todas as paginas.
- O nome da marca exibido na tela Inicio, no texto do certificado e no rodape do PDF passa a ser "Vertex".
- A aba do navegador (titulo e icone) passa a identificar a Vertex, eliminando o ultimo ponto visivel da marca Orbita.
- A troca e feita apenas nas artes e no modulo unico de configuracao da marca, sem alterar componentes de interface nem a rotina de geracao do PDF.

## Capabilities

### New Capabilities

_Nenhuma._

### Modified Capabilities

- `brand-identity`: passa a definir qual e a marca vigente (Vertex) e onde ela deve ser reconhecivel, incluindo a identificacao na aba do navegador. Os requisitos existentes (ponto unico de configuracao e logo conforme o estado da barra lateral) permanecem inalterados.

`pdf-watermark` e `sidebar-navigation` nao mudam de comportamento: a marca d'agua continua obedecendo as mesmas regras de posicionamento e opacidade, apenas com a arte da marca vigente.

## Impact

- **Artes**: `src/assets/brand/logo-full.svg`, `logo-icon.svg` e `watermark.svg` substituidas pelas versoes de `marca-nova/`.
- **Configuracao**: `src/brand/brand.ts` (nome da marca).
- **Documento HTML e favicon**: `index.html` e `public/favicon.svg`.
- **Contexto dos agentes**: `openspec/config.yaml` deixa de descrever o projeto como "Orbita".
- **Testes**: nova suite Playwright em `tests/e2e/` cobrindo barra lateral, navegacao e download do PDF.
- Sem novas dependencias, sem mudanca de rotas, sem mudanca na API dos componentes.
