# Orbita — Teste prático

Mini sistema web com **barra lateral retrátil** e **exportação de PDF com marca d'água**, usado como base para um teste prático de desenvolvimento guiado por especificações ([OpenSpec](https://openspec.dev/)).

O projeto já está **pronto e funcionando**. A tarefa do candidato está descrita em [Tarefa do candidato](#tarefa-do-candidato).

---

## Sumário

- [Telas](#telas)
- [Stack](#stack)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como rodar](#como-rodar)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Onde fica a marca](#onde-fica-a-marca)
- [Testes com Playwright](#testes-com-playwright)
- [OpenSpec](#openspec)
- [Tarefa do candidato](#tarefa-do-candidato)
- [Critérios de avaliação](#critérios-de-avaliação)

---

## Telas

| Rota | Tela | Botão de PDF |
| --- | --- | --- |
| `/` | Início — boas-vindas e atalhos | não |
| `/relatorio` | Relatório mensal de vendas (tabela) | sim |
| `/certificado` | Certificado de conclusão (texto) | sim |

A barra lateral é comum às três telas:

- **expandida** → mostra a **logo completa** e o rótulo de cada item;
- **recolhida** → mostra apenas o **ícone da marca** e os ícones dos itens.

O estado escolhido é preservado ao recarregar a página.

O botão central **Gerar PDF** baixa um arquivo com o conteúdo da tela e a **marca d'água do projeto** aplicada centralizada, rotacionada e com opacidade baixa em todas as páginas.

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Linguagem | TypeScript |
| Interface | React 19 + React Router |
| Build / dev server | Vite |
| Runtime e tooling | Node.js |
| Geração de PDF | jsPDF (no navegador, sem backend) |
| Ícones | lucide-react |
| Testes end-to-end | Playwright |
| Fluxo de especificação | OpenSpec |

---

## Pré-requisitos

- **Node.js 20.19 ou superior** (recomendado: Node 22 — veja o arquivo `.nvmrc`)
- **npm 10 ou superior**

Verifique sua versão:

```bash
node --version
npm --version
```

Usando `nvm`:

```bash
nvm install
nvm use
```

---

## Instalação

```bash
git clone https://github.com/MN-TECHH/teste-pratico-01.git
cd teste-pratico-01
npm install
```

Instale o navegador usado pelo Playwright (necessário apenas uma vez):

```bash
npx playwright install chromium
```

---

## Como rodar

```bash
npm run dev
```

Abra <http://localhost:5173>.

Para conferir a versão de produção:

```bash
npm run build
npm run preview   # http://localhost:4173
```

---

## Scripts disponíveis

| Script | O que faz |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento em `http://localhost:5173` |
| `npm run build` | Checa os tipos e gera a build de produção em `dist/` |
| `npm run preview` | Serve a build de produção em `http://localhost:4173` |
| `npm run typecheck` | Checagem de tipos do TypeScript, sem gerar arquivos |
| `npm run codegen` | Abre o **Playwright codegen** apontando para `http://localhost:5173` |
| `npm run test:e2e` | Executa os testes Playwright de `tests/e2e/` |
| `npm run test:e2e:ui` | Executa os testes no modo interativo do Playwright |
| `npm run openspec` | Atalho para o CLI do OpenSpec |

---

## Estrutura do projeto

```
.
├── .claude/          # comandos e skills do OpenSpec para o Claude Code
├── .agents/          # skills do OpenSpec para o Codex
├── .gemini/          # comandos e skills do OpenSpec para o Gemini CLI
├── marca-nova/       # ARTES DA MARCA NOVA (Vertex) — material do desafio
│   ├── README.md     # como aplicar a marca nova
│   ├── logo-full.svg
│   ├── logo-icon.svg
│   └── watermark.svg
├── openspec/
│   ├── config.yaml   # contexto do projeto usado pelos agentes
│   ├── specs/        # especificações do comportamento ATUAL do sistema
│   └── changes/      # propostas de mudança (é aqui que sua proposta vai nascer)
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/brand/         # SVGs da marca: logo-full, logo-icon, watermark
│   ├── brand/brand.ts        # PONTO ÚNICO de configuração da marca
│   ├── components/
│   │   ├── BrandLogo.tsx         # escolhe ícone ou logo completa
│   │   ├── GeneratePdfButton.tsx # botão central de gerar PDF
│   │   └── layout/
│   │       ├── AppShell.tsx      # sidebar + área de conteúdo
│   │       └── Sidebar.tsx       # barra lateral retrátil
│   ├── hooks/useSidebar.ts       # estado recolhido/expandido + localStorage
│   ├── lib/pdf/
│   │   ├── generatePdf.ts        # monta o PDF e aplica a marca d'água
│   │   └── rasterize.ts          # converte SVG em PNG para o jsPDF
│   ├── pages/                    # HomePage, RelatorioPage, CertificadoPage
│   ├── styles/global.css
│   ├── App.tsx                   # rotas
│   └── main.tsx                  # ponto de entrada
└── tests/e2e/        # seus testes Playwright (vazio de propósito)
```

### `data-testid` disponíveis

Os elementos relevantes já expõem `data-testid`, o que deixa os seletores gerados pelo codegen estáveis:

`sidebar`, `sidebar-toggle`, `brand-logo-full`, `brand-logo-icon`, `nav-inicio`, `nav-relatorio`, `nav-certificado`, `page-inicio`, `page-relatorio`, `page-certificado`, `generate-pdf`, `generate-pdf-error`, `tabela-relatorio`, `certificado-conteudo`.

---

## Onde fica a marca

Toda a identidade visual está concentrada em **um único arquivo**: `src/brand/brand.ts`.

```ts
export const brand: Brand = {
  name: 'Orbita',
  tagline: 'Mini sistema de demonstracao para o teste pratico.',
  logoFull,             // sidebar expandida
  logoIcon,             // sidebar recolhida
  watermark,            // marca d'água do PDF
  watermarkOpacity: 0.08,
  watermarkWidthRatio: 0.62,
  watermarkRotation: 30,
};
```

As artes ficam em `src/assets/brand/`:

| Arquivo | Uso |
| --- | --- |
| `logo-full.svg` | logo completa, sidebar expandida |
| `logo-icon.svg` | ícone da marca, sidebar recolhida |
| `watermark.svg` | arte aplicada como marca d'água no PDF |

> Nenhum componente importa um arquivo de logo diretamente. Trocar a marca é trocar as artes e os valores desse módulo.

### A marca de destino

As artes da marca **Vertex**, para a qual o sistema deve migrar, estão prontas em **`marca-nova/`** na raiz do projeto. Essa pasta não é lida pela aplicação: ela é o material de entrada do desafio. Veja `marca-nova/README.md` para os detalhes e os cuidados de formato.

| Arquivo em `marca-nova/` | Destino em `src/assets/brand/` |
| --- | --- |
| `logo-full.svg` | `logo-full.svg` |
| `logo-icon.svg` | `logo-icon.svg` |
| `watermark.svg` | `watermark.svg` |

---

## Testes com Playwright

O diretório `tests/e2e/` está **vazio de propósito** — criar os testes faz parte da tarefa.

### Gerando testes com o codegen

1. Em um terminal, suba a aplicação:

   ```bash
   npm run dev
   ```

2. Em **outro** terminal, abra o gravador:

   ```bash
   npm run codegen
   ```

3. Navegue pela aplicação. O Playwright escreve o código do teste enquanto você clica.

4. Copie o código gerado e salve como `tests/e2e/<nome>.spec.ts`.

5. Rode a suíte:

   ```bash
   npm run test:e2e
   ```

O `playwright.config.ts` já sobe o servidor de desenvolvimento automaticamente durante os testes — não é preciso deixar o `npm run dev` rodando para executar `npm run test:e2e`.

---

## OpenSpec

O [OpenSpec](https://openspec.dev/) é um fluxo de **desenvolvimento guiado por especificação**: em vez de pedir a mudança direto ao agente de IA, você primeiro **escreve a proposta e a especificação**, revisa, e só então implementa. A especificação descreve o **comportamento observável** do sistema, não a implementação.

Este repositório **já vem com o OpenSpec instalado** para Claude Code, Codex e Gemini CLI.

### O ciclo

```
explore  →  propose  →  apply  →  archive
```

| Etapa | O que faz |
| --- | --- |
| **explore** | Investiga o código e as opções antes de decidir o que propor |
| **propose** | Cria a mudança em `openspec/changes/<nome>/` com `proposal.md`, `specs/`, `design.md` e `tasks.md` |
| **apply** | Implementa a mudança seguindo o `tasks.md` |
| **archive** | Sincroniza as specs principais e move a mudança para `openspec/changes/archive/` |

### Comandos por ferramenta

| Ferramenta | Como chamar |
| --- | --- |
| **Claude Code** | `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:archive` |
| **Gemini CLI** | `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:archive` |
| **Codex** | `$openspec-explore`, `$openspec-propose`, `$openspec-apply-change`, `$openspec-archive-change` |

### Comandos úteis do CLI

```bash
npx openspec list --specs        # lista as especificações do sistema
npx openspec show pdf-watermark --type spec   # mostra uma especificação
npx openspec list                # lista as mudanças em andamento
npx openspec status --change <nome>           # progresso dos artefatos de uma mudança
npx openspec validate --all --strict          # valida specs e mudanças
npx openspec view                # painel interativo
```

### Instalando em outro projeto

```bash
npx @fission-ai/openspec@latest init --tools claude,codex,gemini
```

### Especificações atuais deste projeto

| Capacidade | O que descreve |
| --- | --- |
| `openspec/specs/sidebar-navigation/spec.md` | Barra lateral retrátil, persistência do estado e navegação entre as três telas |
| `openspec/specs/brand-identity/spec.md` | Ponto único de configuração da marca e troca de logo conforme o estado da sidebar |
| `openspec/specs/pdf-watermark/spec.md` | Botão de gerar PDF, conteúdo do documento e marca d'água |

**Documentação:** <https://openspec.dev/> · **Repositório:** <https://github.com/Fission-AI/OpenSpec>

---

## Tarefa do candidato

O objetivo é **trocar a identidade visual do projeto** usando o fluxo do OpenSpec e **cobrir o resultado com testes Playwright gerados por codegen**.

### O que entregar

A marca de destino é a **Vertex**, e as três artes já estão prontas em **`marca-nova/`**. Você não precisa desenhar nada.

1. **Trocar a logo** do sistema (versão completa e versão ícone) pela logo da Vertex.
2. **Trocar a marca d'água** do PDF pela arte de marca d'água da Vertex, mantendo a opacidade baixa.
3. **Criar os testes Playwright** em `tests/e2e/`, gerados com `npm run codegen`.

### Passo a passo

**1. Preparar o ambiente**

```bash
npm install
npx playwright install chromium
npm run dev
```

**2. Conhecer o sistema**

Abra as três telas, recolha e expanda a barra lateral e gere um PDF em cada página de conteúdo. Depois leia as especificações atuais:

```bash
npx openspec list --specs
npx openspec show brand-identity --type spec
```

Abra também `marca-nova/README.md` e as três artes que você vai aplicar.

**3. Criar a proposta no OpenSpec**

No seu agente, rode o comando de proposta descrevendo a mudança. Por exemplo, no Claude Code:

```
/opsx:propose trocar a marca do sistema de Orbita para Vertex, usando as artes da pasta marca-nova
```

> No Codex use `$openspec-propose`. No Gemini CLI, `/opsx:propose`.

Isso cria `openspec/changes/<nome-da-mudanca>/` com `proposal.md`, `specs/`, `design.md` e `tasks.md`.

**4. Revisar a proposta**

Leia os artefatos gerados e ajuste o que for necessário. A especificação deve descrever **comportamento**, não implementação. Valide:

```bash
npx openspec validate --all --strict
```

**5. Implementar**

```
/opsx:apply
```

Ou implemente manualmente: copie as três artes de `marca-nova/` para `src/assets/brand/` e ajuste `src/brand/brand.ts`.

```bash
cp marca-nova/logo-full.svg  src/assets/brand/logo-full.svg
cp marca-nova/logo-icon.svg  src/assets/brand/logo-icon.svg
cp marca-nova/watermark.svg  src/assets/brand/watermark.svg
```

**6. Conferir**

```bash
npm run typecheck
npm run build
```

Suba a aplicação e verifique:

- logo completa da Vertex com a sidebar expandida;
- ícone da Vertex com a sidebar recolhida;
- PDF das duas páginas com a marca d'água da Vertex em opacidade baixa;
- nome da marca atualizado na tela inicial, no certificado e no rodapé do PDF.

**7. Criar os testes com codegen**

Com o `npm run dev` rodando em um terminal, abra o gravador em outro:

```bash
npm run codegen
```

Grave ao menos estes cenários e salve em `tests/e2e/`:

- a barra lateral recolhe e expande, e a logo troca entre versão completa e ícone;
- a navegação leva às três telas;
- o botão **Gerar PDF** dispara o download do arquivo nas páginas Relatório e Certificado.

Execute a suíte:

```bash
npm run test:e2e
```

**8. Arquivar a mudança**

```
/opsx:archive
```

Isso sincroniza as specs principais em `openspec/specs/` e move a mudança para `openspec/changes/archive/`.

**9. Abrir o Pull Request**

Descreva no PR o que mudou, anexe uma captura das telas e um PDF gerado.

---

## Critérios de avaliação

| Critério | O que é avaliado |
| --- | --- |
| **Uso do OpenSpec** | A mudança foi proposta, revisada, aplicada e arquivada pelo fluxo; as specs descrevem comportamento, não implementação |
| **Troca da marca** | As três artes da Vertex aplicadas de forma consistente, a partir do ponto único de configuração, sem alterar componentes |
| **Marca d'água** | Presente em todas as páginas do PDF, centralizada e com opacidade baixa que não atrapalha a leitura |
| **Testes Playwright** | Cobrem sidebar, navegação e download do PDF; passam com `npm run test:e2e` |
| **Qualidade** | `npm run typecheck` e `npm run build` sem erros; commits claros; sem código morto |
