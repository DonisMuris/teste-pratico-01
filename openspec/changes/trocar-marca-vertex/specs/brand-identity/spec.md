## ADDED Requirements

### Requirement: Marca vigente Vertex

O sistema SHALL apresentar a marca Vertex em todos os pontos em que a identidade visual e exibida: barra lateral, textos das telas e documentos PDF gerados. Nenhum desses pontos MUST exibir o nome ou as artes da marca anterior (Orbita).

#### Scenario: Logo completa na barra lateral expandida

- **WHEN** a barra lateral esta expandida
- **THEN** a logo completa da Vertex e exibida no topo da barra lateral, com texto alternativo que identifica a marca Vertex

#### Scenario: Icone na barra lateral recolhida

- **WHEN** a barra lateral esta recolhida
- **THEN** o icone da Vertex e exibido no topo da barra lateral, com texto alternativo que identifica a marca Vertex

#### Scenario: Nome da marca nas telas

- **WHEN** o usuario acessa a tela Inicio ou a tela Certificado
- **THEN** o nome da marca exibido no texto da tela e "Vertex"

#### Scenario: Marca nos PDFs gerados

- **WHEN** um PDF e gerado a partir da tela Relatorio ou da tela Certificado
- **THEN** todas as paginas trazem a marca d'agua da Vertex e o rodape identifica o documento como gerado pela Vertex

### Requirement: Identificacao da marca na aba do navegador

O sistema SHALL identificar a marca vigente no titulo do documento e no icone exibidos pelo navegador, em qualquer uma das telas.

#### Scenario: Titulo da aba

- **WHEN** qualquer tela do sistema esta aberta
- **THEN** o titulo exibido pelo navegador contem o nome da marca vigente

#### Scenario: Icone da aba

- **WHEN** qualquer tela do sistema esta aberta
- **THEN** o icone exibido pelo navegador e o simbolo da marca vigente
