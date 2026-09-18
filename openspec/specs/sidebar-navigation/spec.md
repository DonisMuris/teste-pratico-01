# sidebar-navigation

## Purpose

Define a navegacao lateral do sistema: as telas disponiveis, como o usuario alterna entre elas e como a barra lateral recolhe e expande mantendo a escolha entre visitas.

## Requirements

### Requirement: Barra lateral retratil

O sistema SHALL exibir uma barra lateral permanente com um controle que alterna entre os estados expandido e recolhido.

#### Scenario: Recolher a barra lateral

- **WHEN** o usuario aciona o controle de recolher com a barra lateral expandida
- **THEN** a barra lateral passa ao estado recolhido, exibindo apenas os icones dos itens de navegacao, sem os rotulos de texto

#### Scenario: Expandir a barra lateral

- **WHEN** o usuario aciona o controle com a barra lateral recolhida
- **THEN** a barra lateral volta ao estado expandido, exibindo icone e rotulo de cada item de navegacao

#### Scenario: Estado anunciado para tecnologias assistivas

- **WHEN** a barra lateral esta em qualquer um dos dois estados
- **THEN** o controle de alternancia expoe o estado atual por meio de atributo de acessibilidade e possui rotulo acessivel descrevendo a acao

### Requirement: Persistencia do estado da barra lateral

O sistema SHALL preservar o estado recolhido ou expandido da barra lateral entre recarregamentos da pagina no mesmo navegador.

#### Scenario: Estado preservado apos recarregar

- **WHEN** o usuario recolhe a barra lateral e recarrega a pagina
- **THEN** a barra lateral e apresentada recolhida

#### Scenario: Armazenamento indisponivel

- **WHEN** o armazenamento local do navegador nao pode ser lido ou gravado
- **THEN** a aplicacao continua funcionando com a barra lateral expandida, sem exibir erro ao usuario

### Requirement: Navegacao entre as telas

O sistema SHALL oferecer navegacao para tres telas: Inicio, Relatorio e Certificado.

#### Scenario: Navegar para uma tela

- **WHEN** o usuario aciona um item de navegacao da barra lateral
- **THEN** o conteudo correspondente aquela tela e exibido na area principal e o endereco do navegador reflete a rota escolhida

#### Scenario: Destaque do item ativo

- **WHEN** uma tela esta sendo exibida
- **THEN** o item de navegacao correspondente e apresentado com destaque visual distinto dos demais

#### Scenario: Rota desconhecida

- **WHEN** o usuario acessa um endereco que nao corresponde a nenhuma das tres telas
- **THEN** o sistema redireciona para a tela de Inicio
