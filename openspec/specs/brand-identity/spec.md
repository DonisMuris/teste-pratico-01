# brand-identity

## Purpose

Define como a identidade visual do projeto (nome e artes da marca) e aplicada na interface e concentrada em um unico ponto de configuracao, para que trocar a marca nao exija alterar componentes.

## Requirements

### Requirement: Ponto unico de configuracao da marca

O sistema SHALL concentrar nome, logo completa, icone e arte da marca d'agua em um unico modulo de configuracao. Componentes de interface e a geracao de PDF MUST ler a marca desse modulo e MUST NOT referenciar arquivos de imagem de marca diretamente.

#### Scenario: Troca da marca

- **WHEN** as artes e os valores do modulo de configuracao da marca sao substituidos
- **THEN** a nova marca passa a ser exibida na barra lateral e na marca d'agua do PDF sem alteracao em componentes de interface ou na rotina de geracao do PDF

### Requirement: Logo conforme o estado da barra lateral

O sistema SHALL exibir a logo completa da marca quando a barra lateral estiver expandida e apenas o icone da marca quando estiver recolhida.

#### Scenario: Barra lateral expandida

- **WHEN** a barra lateral esta expandida
- **THEN** a logo completa (simbolo e nome da marca) e exibida no topo da barra lateral e o icone isolado nao e exibido

#### Scenario: Barra lateral recolhida

- **WHEN** a barra lateral esta recolhida
- **THEN** apenas o icone da marca e exibido no topo da barra lateral e a logo completa nao e exibida

#### Scenario: Texto alternativo

- **WHEN** qualquer uma das duas versoes da logo e exibida
- **THEN** a imagem possui texto alternativo que identifica a marca

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
