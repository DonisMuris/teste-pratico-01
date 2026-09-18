# pdf-watermark

## Purpose

Define a exportacao em PDF das telas de conteudo: onde o usuario dispara a geracao, o que o documento contem e como a marca d'agua do projeto e aplicada.

## Requirements

### Requirement: Botao central de geracao de PDF

O sistema SHALL apresentar, nas telas Relatorio e Certificado, um botao centralizado que gera o PDF daquela tela. A tela de Inicio MUST NOT apresentar esse botao.

#### Scenario: Gerar o PDF

- **WHEN** o usuario aciona o botao de gerar PDF em uma das duas telas de conteudo
- **THEN** o navegador recebe um arquivo PDF para download cujo nome identifica o documento e a data de geracao

#### Scenario: Retorno visual durante a geracao

- **WHEN** a geracao do PDF esta em andamento
- **THEN** o botao fica desabilitado e indica que o documento esta sendo gerado

#### Scenario: Falha na geracao

- **WHEN** a geracao do PDF falha
- **THEN** uma mensagem de erro e exibida ao usuario e o botao volta a ficar disponivel

### Requirement: Conteudo do documento

O PDF gerado SHALL conter o titulo da tela de origem e o conteudo apresentado nela, alem de um rodape com o nome da marca, a data de geracao e a numeracao das paginas.

#### Scenario: PDF do relatorio

- **WHEN** o PDF e gerado a partir da tela Relatorio
- **THEN** o documento contem o titulo do relatorio e a tabela de resultados exibida na tela

#### Scenario: PDF do certificado

- **WHEN** o PDF e gerado a partir da tela Certificado
- **THEN** o documento contem o titulo do certificado e o texto exibido na tela

### Requirement: Marca d'agua do projeto no PDF

Todo PDF gerado SHALL receber a arte de marca d'agua definida na configuracao da marca, centralizada na pagina, com opacidade baixa que nao prejudique a leitura do conteudo.

#### Scenario: Marca d'agua em todas as paginas

- **WHEN** o documento gerado possui mais de uma pagina
- **THEN** a marca d'agua aparece em todas as paginas do documento

#### Scenario: Opacidade baixa

- **WHEN** a marca d'agua e aplicada
- **THEN** sua opacidade e no maximo 0,15, permanecendo visivel sem obstruir o texto sobreposto

#### Scenario: Marca d'agua acompanha a marca configurada

- **WHEN** a arte de marca d'agua definida na configuracao da marca e substituida
- **THEN** os PDFs passam a ser gerados com a nova arte, sem alteracao na rotina de geracao
