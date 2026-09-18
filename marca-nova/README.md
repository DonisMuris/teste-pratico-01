# Marca nova — Vertex

Esta pasta contém as artes da marca **Vertex**, que substituem a marca **Órbita** usada hoje no sistema.

Ela é o material de entrada do teste prático: **não** é lida pelo código da aplicação. O candidato copia estes arquivos para dentro de `src/assets/brand/` como parte da tarefa.

---

## Arquivos

| Arquivo | `viewBox` | Onde aparece |
| --- | --- | --- |
| `logo-full.svg` | `0 0 240 64` | Topo da barra lateral **expandida** |
| `logo-icon.svg` | `0 0 64 64` | Topo da barra lateral **recolhida** |
| `watermark.svg` | `0 0 240 64` | Marca d'água do PDF, em opacidade baixa |

### Identidade

| Item | Valor |
| --- | --- |
| Nome | Vertex |
| Assinatura | TECNOLOGIA |
| Gradiente | `#10b981` → `#0ea5e9` |
| Texto da logo | `#064e3b` e `#0f766e` |
| Marca d'água | `#0f766e` sólido, sem gradiente |

A marca d'água é **monocromática** de propósito: sob opacidade baixa, um gradiente claro praticamente desaparece no PDF.

---

## Como aplicar

**1. Copiar as artes** para a pasta de assets da aplicação, substituindo as da Órbita:

```bash
cp marca-nova/logo-full.svg  src/assets/brand/logo-full.svg
cp marca-nova/logo-icon.svg  src/assets/brand/logo-icon.svg
cp marca-nova/watermark.svg  src/assets/brand/watermark.svg
```

**2. Atualizar a identidade** em `src/brand/brand.ts`:

```ts
export const brand: Brand = {
  name: 'Vertex',
  tagline: '...',
  // ...
};
```

O `name` aparece na tela inicial, no texto do certificado e no rodapé do PDF.

**3. Conferir**

```bash
npm run typecheck
npm run build
npm run dev
```

- barra lateral expandida → logo Vertex completa;
- barra lateral recolhida → ícone Vertex;
- PDF das páginas Relatório e Certificado → marca d'água Vertex, centralizada e discreta.

---

## Cuidados

- **Mantenha as proporções.** A logo completa e a marca d'água são `240 × 64` (razão 3,75) e o ícone é `64 × 64`. A rotina de PDF calcula a altura da marca d'água a partir dessa razão; mudá-la altera o enquadramento na página.
- **Mantenha a opacidade baixa.** `watermarkOpacity` em `src/brand/brand.ts` deve ficar em no máximo `0.15`, conforme a especificação `openspec/specs/pdf-watermark/spec.md`.
- **Nada de recursos externos no SVG.** A marca d'água é rasterizada num `<canvas>` antes de entrar no PDF, e fontes ou imagens externas não carregam nesse contexto. Use apenas formas, texto e a pilha de fontes do sistema.
- **IDs de gradiente únicos.** Dois SVGs com o mesmo `id` de gradiente no mesmo documento se sobrepõem. Aqui eles são `vertexFull` e `vertexIcon`.
- **Não altere componentes.** Se precisar editar `BrandLogo.tsx` ou `generatePdf.ts` para trocar a marca, algo saiu do lugar: a troca deve acontecer só nas artes e em `src/brand/brand.ts`.
