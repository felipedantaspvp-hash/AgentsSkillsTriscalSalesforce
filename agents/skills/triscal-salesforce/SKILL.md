---
name: triscal-salesforce
description: Use esta Skill para qualquer tarefa Salesforce no padrão Triscal, incluindo Apex, LWC, Flow, Visualforce, Page Layout, Lightning Record Page, Dynamic Forms, Record Type, permissões, integrações, testes, Flosum, DevOps, análise de bugs e documentação técnica. Antes de implementar, consulte/crie o índice do projeto, leia arquivos relevantes, identifique o fluxo Controller/FlowAction > Service > ServiceAgent e entregue solução pontual, segura e conclusiva.
---

# Skill: Triscal Salesforce Enterprise

## Como usar

Coloque este arquivo em:

```text
.agents/skills/triscal-salesforce/SKILL.md
```

Use esta Skill em conjunto com o `AGENTS.md` do projeto.

O `AGENTS.md` define as regras do repositório. Esta Skill define o padrão técnico reutilizável da Triscal para execução de tarefas Salesforce.

---

## Sumário

1. Objetivo
2. Modo obrigatório de trabalho
3. Indexação do projeto
4. Princípios Triscal
5. Arquitetura padrão
6. Controller e FlowAction
7. Service
8. ServiceAgent
9. DTOs
10. SOQL, DML e limites
11. Automação, reentrada e idempotência
12. LWC
13. Apex Tests
14. Integrações
15. Logs e erros
16. Flosum e DevOps Salesforce
17. Análise de bugs
18. Refatoração
19. Segurança
20. Documentação
21. Economia de tokens
22. Formato final esperado
23. Critérios de aceite gerais
24. Salesforce Declarativo: Flow, Layouts, Record Pages e Configuração

---

## 1. Objetivo

Orientar o Codex a atuar como agente Salesforce completo no padrão Triscal, cobrindo desenvolvimento programático e configuração declarativa com economia de tokens, análise prévia dos arquivos e entrega conclusiva.

Use esta Skill para demandas envolvendo:

- Apex
- LWC
- Visualforce
- Flow
- Page Layout
- Lightning Record Page
- Dynamic Forms
- Record Type
- Integrações
- Testes unitários
- Refatorações
- Análise de bugs
- Flosum
- DevOps Salesforce
- Segurança e permissões
- Documentação técnica e executiva

---

## 2. Modo obrigatório de trabalho

Antes de propor ou implementar qualquer solução:

1. Consultar/criar o índice do projeto.
2. Consultar e indexar os arquivos relevantes.
3. Ler classes, testes, LWCs, Flows, metadados e configurações associadas.
4. Identificar o fluxo real da solução.
5. Verificar padrões já existentes no repositório.
6. Definir a menor solução segura.
7. Só então alterar código, configuração ou propor correção.

Nunca assumir nomes de classes, objetos, campos, métodos, RecordTypes, Custom Metadata, Named Credentials, Flows ou layouts sem verificar no projeto.

Se não houver evidência suficiente, responder de forma objetiva:

```text
Não encontrei evidência suficiente nos arquivos analisados para concluir com segurança.

Arquivos analisados:
Hipótese mais provável:
Arquivos que ainda precisam ser validados:
```

---

## 3. Indexação do projeto

Antes de trabalhar, consultar:

```text
docs/PROJECT_INDEX.md
```

Se o arquivo não existir, criar um índice leve do projeto antes de iniciar a análise.

Se existir, validar se está suficiente para a demanda atual e atualizar somente quando necessário.

O índice deve ser objetivo e não deve copiar código inteiro. O objetivo é economizar tokens e orientar leitura seletiva.

O índice deve mapear:

- Estrutura do projeto.
- Controllers.
- FlowActions / Invocable Apex.
- Services.
- ServiceAgents.
- Helpers, Selectors e Repositories.
- DTOs.
- LWCs.
- Visualforce.
- Flows.
- Objetos, campos e RecordTypes.
- Page Layouts.
- Lightning Record Pages.
- Dynamic Forms.
- Validation Rules.
- Permission Sets e Profiles.
- Custom Metadata.
- Named Credentials.
- Classes de teste.
- Manifests/package.xml.
- Padrões arquiteturais encontrados.
- Fluxos técnicos conhecidos.

Após consultar o índice, abrir apenas os arquivos realmente relevantes para a tarefa.

---

## 4. Princípios Triscal

Toda entrega deve ser:

- Pontual.
- Conclusiva.
- Técnica.
- Segura.
- Aderente ao padrão existente.
- Econômica em tokens.
- Sem overengineering.
- Sem arquitetura nova desnecessária.
- Com separação clara de responsabilidades.
- Com testes quando houver alteração de Apex.
- Com risco e validação indicados.
- Com análise de impacto declarativo quando envolver Flow, Layout, Record Page ou permissões.

Evitar respostas genéricas, longas ou teóricas quando a demanda pede solução prática.

---

## 5. Arquitetura padrão

Sempre respeitar:

```text
LWC / Visualforce / Flow / API
        ↓
Controller / FlowAction
        ↓
Service
        ↓
ServiceAgent / Helper / Selector
        ↓
Sistema externo / SObject / Metadata
```

Para integração externa:

```text
LWC / Visualforce / Flow / API
        ↓
Controller / FlowAction
        ↓
Service
        ↓
ServiceAgent
        ↓
Named Credential / Custom Metadata / API externa
```

Para dados internos:

```text
LWC / Visualforce / Flow / API
        ↓
Controller / FlowAction
        ↓
Service
        ↓
Selector / Repository / Helper
        ↓
SObject / SOQL / DML
```

Não misturar responsabilidades entre camadas.

---

## 6. Controller e FlowAction

Controller e FlowAction devem ser finos.

Podem:

- Receber parâmetros.
- Mapear entrada para DTO.
- Chamar Service.
- Retornar DTOs ou respostas simples.
- Tratar exceções para a camada consumidora.
- Expor métodos `@AuraEnabled`, REST ou invocáveis.

Não podem:

- Concentrar regra de negócio.
- Fazer callout.
- Montar payload externo complexo.
- Executar DML complexa.
- Fazer SOQL desnecessário.
- Decidir regra de integração.
- Substituir a Service.

Regra:

```text
Controller/FlowAction recebe, delega e retorna.
```

Para Flow:

```text
Flow
  ↓
FlowAction / Invocable Apex
  ↓
Service
  ↓
ServiceAgent / Helper / Selector
```

---

## 7. Service

A Service concentra a regra de negócio.

Deve:

- Orquestrar o processo.
- Validar regras.
- Chamar ServiceAgent quando houver integração.
- Chamar Selector/Repository/Helper quando necessário.
- Executar DML quando fizer sentido no padrão do projeto.
- Controlar idempotência e reentrada.
- Validar estado atual antes de reprocessar registros.
- Tratar erros de negócio.
- Ser testável.
- Interpretar respostas externas para o contexto de negócio.

Regra:

```text
A decisão de negócio fica na Service.
```

---

## 8. ServiceAgent

A ServiceAgent concentra integração externa.

Deve:

- Executar callout.
- Usar Named Credential.
- Buscar paths/configurações em Custom Metadata.
- Montar request HTTP.
- Serializar request.
- Desserializar response.
- Tratar status HTTP, timeout, body vazio e payload inválido.
- Converter payload externo em DTO.

Não deve:

- Executar DML.
- Conter regra de negócio Salesforce.
- Conhecer LWC, Flow ou tela.
- Expor segredo em log.
- Decidir fluxo de negócio.

Regra:

```text
Named Credential = endpoint base/autenticação.
Custom Metadata = path, flags e parâmetros.
ServiceAgent = chamada técnica.
Service = decisão de negócio.
```

---

## 9. DTOs

Usar DTOs quando a estrutura for conhecida.

Aplicar em:

- Request de tela.
- Response para tela.
- Payload de API.
- Response de API.
- Invocable Apex.
- REST Apex.
- Mensagens de erro estruturadas.

Evitar `Map<String, Object>` quando for possível ter DTO tipado.

Padrões de nome:

```text
MinhaRequestDTO
MinhaResponseDTO
MinhaApiRequestDTO
MinhaApiResponseDTO
MinhaErrorDTO
```

DTO não deve virar classe de regra de negócio.

---

## 10. SOQL, DML e limites

Regras obrigatórias:

- Não fazer SOQL em loop.
- Não fazer DML em loop.
- Consultar apenas campos necessários.
- Bulkificar métodos sempre que aplicável.
- Usar filtros seletivos.
- Usar `Schema.describe` quando for melhor que SOQL.
- Preferir RecordType via describe quando aplicável.
- Evitar queries redundantes.
- Respeitar governor limits.
- Evitar query dinâmica sem necessidade.
- Proteger query dinâmica contra parâmetros inseguros.

Para alto volume, considerar:

- Batch Apex.
- Queueable.
- Platform Event.
- Objeto de fila.
- Controle de status.
- Retry controlado.
- Idempotência.
- Logs técnicos.

---

## 11. Automação, reentrada e idempotência

Sempre avaliar risco de:

- Trigger chamando Flow.
- Flow chamando Apex.
- Batch gerando Batch.
- Queueable encadeado indevidamente.
- Atualização que dispara nova automação.
- Integração recebendo retorno duplicado.
- Status operacional reabrindo processo encerrado.
- Registro sendo roteirizado/reprocessado sem validar estado atual.

Quando houver risco, aplicar travas:

- Validação de status atual.
- Verificação de mudança real de campo.
- Flag de processamento.
- Controle de origem.
- Chave funcional de idempotência.
- Histórico de execução.
- Bloqueio por estado final.
- Controle de tentativa.

Nunca reprocessar, reenfileirar, reagendar ou reintegrar sem validar se o registro ainda é elegível.

---

## 12. LWC

Para LWC:

- Usar SLDS.
- Construir UI limpa, enterprise e responsiva.
- JS controla estado, eventos e chamadas Apex.
- HTML cuida da estrutura visual.
- Apex cuida da regra.
- Usar loading state.
- Usar empty state.
- Usar error state.
- Usar feedback de sucesso.
- Não colocar regra pesada no JavaScript.
- Evitar hardcode quando houver Custom Labels.
- Exibir nomes amigáveis em vez de IDs técnicos.

Para telas administrativas:

- Listagem com paginação.
- Busca e filtros quando aplicável.
- Modal para criar/editar.
- Modal de confirmação para excluir.
- Ações com ícones quando fizer sentido.
- Layout enterprise.

---

## 13. Apex Tests

Sempre que alterar Apex:

- Criar ou atualizar teste.
- Não depender de dados reais da org.
- Criar massa própria.
- Usar mocks para callout.
- Usar `Test.startTest()` e `Test.stopTest()`.
- Usar `Assert.areEqual`, `Assert.areNotEqual`, `Assert.isTrue`, etc.
- Evitar `System.assertEquals`.
- Usar `Test.setCreatedDate()` quando precisar manipular `CreatedDate`.
- Testar cenário positivo.
- Testar cenário negativo.
- Testar exceção relevante.
- Testar bulk quando aplicável.
- Validar comportamento, não apenas cobertura.

Nomes de teste devem indicar intenção:

```text
deveExecutarComSucesso
deveRetornarErroQuandoRequestInvalido
deveIgnorarRegistroQuandoStatusNaoElegivel
deveTratarErroDeIntegracao
deveProcessarListaEmBulk
```

---

## 14. Integrações

Toda integração deve seguir:

```text
Service → ServiceAgent → Named Credential / Custom Metadata → API externa
```

Regras:

- Não hardcodar endpoint.
- Não hardcodar token.
- Não hardcodar API key.
- Não expor segredo em log.
- Tratar HTTP status.
- Tratar timeout.
- Tratar response vazio.
- Tratar JSON inválido.
- Criar mock de callout.
- Reutilizar utilitários existentes de metadata/configuração.
- Registrar log técnico conforme padrão existente.

Separação esperada:

```text
Service:
- Decide se deve integrar.
- Interpreta resposta para o negócio.
- Atualiza registros.

ServiceAgent:
- Executa chamada HTTP.
- Trata protocolo.
- Desserializa payload.
```

---

## 15. Logs e erros

Quando houver erro:

- Diferenciar erro técnico de erro de negócio.
- Não expor stack trace para usuário final.
- Registrar detalhe técnico em LogService ou padrão existente.
- Não usar `System.debug` como estratégia principal de log.
- Não engolir exceção sem ação útil.
- Retornar mensagem clara para LWC, Flow ou API.

Formato esperado em análise:

```text
Causa identificada:
Impacto:
Ponto de falha:
Correção proposta:
Teste necessário:
```

---

## 16. Flosum e DevOps Salesforce

Quando envolver Flosum/deploy:

- Preservar rastreabilidade.
- Identificar branch, pacote, ambiente e metadados impactados.
- Considerar UAT, SIT, QA, Hotfix e Produção.
- Validar dependências.
- Considerar testes unitários obrigatórios.
- Avaliar risco de rollback.
- Considerar backpromotion.
- Não remover metadados sem validar impacto.
- Separar erro de deploy, validação, status, dependência, permissão, metadado, teste e versão/API.

Conceitos importantes:

```text
Branch
Snapshot
Predeploy Fix
Overwrite Protection
Peer Review
Aprovação técnica
Aprovação de negócio
Pipeline
Deploy
Backpromotion
```

---

## 17. Análise de bugs

Para bug, responder com diagnóstico conclusivo.

Formato preferido:

```text
Causa identificada:
Impacto:
Fluxo onde ocorre:
Arquivo/classe provável:
Correção proposta:
Risco da correção:
Teste necessário:
```

Evitar:

```text
Pode ser trigger.
Pode ser permissão.
Verifique os logs.
```

Preferir apontar causa provável com evidência dos arquivos analisados.

Sempre verificar:

- Trigger.
- Flow.
- Apex invocável.
- Batch.
- Queueable.
- Schedule.
- Integração.
- Atualização indireta de status.
- Critérios de entrada.
- Ausência de idempotência.
- Ausência de validação do estado atual.

---

## 18. Refatoração

Ao refatorar:

- Preservar comportamento.
- Reduzir duplicação.
- Melhorar responsabilidade das classes.
- Não alterar contrato público sem necessidade.
- Não quebrar testes existentes.
- Não mover regra para Controller.
- Não mover callout para fora da ServiceAgent.
- Atualizar testes impactados.
- Evitar reescrita total quando ajuste pontual resolve.

Antes de refatorar, identificar:

```text
Problema atual:
Motivo da refatoração:
Classes impactadas:
Risco:
Como validar:
```

---

## 19. Segurança

Sempre considerar:

- CRUD/FLS.
- Sharing model.
- `with sharing`, `without sharing` ou `inherited sharing`.
- Permission Sets.
- Dados sensíveis.
- LGPD.
- Segredos em Named Credentials.
- Custom Metadata apenas para configuração, não segredo sensível.
- Validação de entrada.
- Proteção de métodos `@AuraEnabled`.
- Logs sem dados confidenciais.

Não expor segredo, token, senha, API key ou stack trace para usuário final.

---

## 20. Documentação

Quando solicitado documento técnico, usar:

```text
1. Contexto
2. Objetivo
3. Problema identificado
4. Causa raiz
5. Solução proposta
6. Arquitetura envolvida
7. Componentes impactados
8. Fluxo técnico
9. Riscos
10. Testes recomendados
11. Próximos passos
```

Quando solicitado resumo executivo:

```text
1. Contexto
2. Diagnóstico
3. Impacto para o negócio
4. Ação recomendada
5. Riscos
6. Próximos passos
```

---

## 21. Economia de tokens

Responder sempre com foco.

Evitar:

- Teoria desnecessária.
- Repetição do pedido.
- Introduções longas.
- Muitas alternativas quando uma solução é claramente melhor.
- Código enorme quando diff ou trecho pontual resolve.
- Explicações genéricas.

Preferir:

```text
Conclusão:
...

Causa:
...

Correção:
...

Arquivos:
...

Teste:
...
```

---

## 22. Formato final esperado

Para análise ou implementação, responder preferencialmente:

```text
Conclusão:
...

Arquivos analisados:
- ...

Alteração proposta/realizada:
- ...

Risco:
Baixo/Médio/Alto — motivo.

Testes:
- ...

Próximo passo:
...
```

Para correção simples:

```text
Causa:
...

Correção:
...

Teste:
...
```

---

## 23. Critérios de aceite gerais

A entrega só é boa quando:

- Arquivos relevantes foram analisados.
- A solução é pontual.
- A resposta é conclusiva.
- O padrão Controller/FlowAction > Service > ServiceAgent foi respeitado.
- A Controller continua fina.
- A FlowAction continua fina.
- A Service concentra regra de negócio.
- A ServiceAgent concentra integração.
- Não há SOQL/DML indevido em loop.
- Não há Get/DML indevido dentro de Loop em Flow.
- Não há hardcode de endpoint, token ou segredo.
- Testes foram criados ou ajustados quando necessário.
- Não há overengineering.
- Não há quebra de contrato sem justificativa.
- Risco e validação foram indicados.
- O código/configuração é legível, sustentável e aderente ao projeto.


## 24. Salesforce Declarativo: Flow, Layouts, Record Pages e Configuração

O agente deve ser completo em Salesforce, não limitado a Apex e LWC. Sempre que a demanda envolver automação, experiência de usuário, layout, permissões ou configuração declarativa, o agente deve analisar também:

- Flow
- Record-Triggered Flow
- Screen Flow
- Autolaunched Flow
- Subflow
- Flow Action / Invocable Apex
- Page Layout
- Lightning Record Page
- Dynamic Forms
- Record Type
- Compact Layout
- Search Layout
- Quick Actions
- Global Actions
- Buttons and Links
- Validation Rules
- Assignment Rules
- Approval Processes
- Permission Sets
- Profiles
- Custom Permissions
- Custom Metadata
- Field Sets
- Tabs
- App Builder configuration

O agente deve avaliar o impacto declarativo antes de propor Apex. Nem toda demanda precisa de código; quando Flow ou configuração resolverem melhor, o agente deve indicar isso de forma objetiva.

---

## Boas práticas obrigatórias para Flow

Antes de criar ou alterar Flow, o agente deve:

1. Identificar o tipo de Flow.
2. Identificar objeto, gatilho e critérios de entrada.
3. Verificar se é Before-Save ou After-Save.
4. Verificar se há Apex invocável chamado pelo Flow.
5. Verificar se há outros Flows, Triggers ou automações no mesmo objeto.
6. Avaliar risco de recursão, reentrada e atualização em cascata.
7. Avaliar limites de SOQL, DML e processamento.
8. Verificar se o Flow está bulkificado.
9. Validar se existe teste Apex quando o Flow chama Apex.
10. Validar impacto em deploy e dependências.

Regras obrigatórias:

- Nunca colocar Get Records dentro de Loop.
- Nunca colocar Create Records dentro de Loop.
- Nunca colocar Update Records dentro de Loop.
- Nunca colocar Delete Records dentro de Loop.
- Nunca chamar Apex dentro de Loop sem justificativa técnica forte.
- Nunca fazer lógica de reprocessamento sem validação de estado atual.
- Nunca atualizar o mesmo registro que disparou o Flow sem avaliar recursão.
- Nunca criar vários Flows concorrentes no mesmo objeto sem mapear ordem e responsabilidade.
- Preferir Before-Save Flow para atualização simples no próprio registro.
- Usar After-Save Flow quando precisar criar/atualizar registros relacionados ou chamar Apex.
- Usar coleções para acumular registros dentro do Loop.
- Executar DML fora do Loop.
- Executar Get Records antes do Loop, quando possível.
- Usar Decision para bloquear reentrada.
- Usar critérios de entrada seletivos.
- Verificar se o campo realmente mudou antes de executar ação.
- Documentar variáveis, decisões e responsabilidades do Flow.
- Evitar Flow monolítico.
- Usar Subflow quando houver reutilização real e clara.
- Evitar Subflow desnecessário que dificulte manutenção.
- Não misturar muitas responsabilidades em um único Flow.
- Evitar nomes genéricos como “Flow Novo”, “Atualiza Registro” ou “Processo Geral”.
- Usar nomenclatura clara e funcional.

Padrão recomendado para Loop em Flow:

```text
Get Records antes do Loop
        ↓
Loop apenas para avaliar/montar registros
        ↓
Assignment adiciona itens em uma Collection
        ↓
Create/Update/Delete Records após o Loop
```

Padrão proibido:

```text
Loop
  ↓
Get Records
  ↓
Update Records
```

Se um Flow estiver fazendo DML ou Get dentro de Loop, o agente deve apontar como risco técnico e propor correção.

---

## Padrão de análise para Flow

Quando analisar um Flow, responder com:

```text
Tipo de Flow:
Objeto:
Gatilho:
Before/After:
Critérios de entrada:
Elementos críticos:
Risco de reentrada:
Uso de Get/DML em Loop:
Apex chamado:
Correção recomendada:
Teste/validação:
```

Para bug em Flow, verificar:

- Ordem de execução Salesforce.
- Critérios de entrada.
- Condições de decisão.
- Atualização do mesmo registro.
- Atualização de registros relacionados.
- Chamada Apex.
- Subflows.
- Pausas e caminhos assíncronos.
- Scheduled Paths.
- Loops.
- Coleções.
- Elementos de Get/Create/Update/Delete.
- Uso de variável nula.
- Falta de tratamento de fault path.
- Falta de validação de status atual.
- Dependência de RecordType.
- Dependência de permissões e FLS.

---

## Invocable Apex chamado por Flow

Quando Flow chamar Apex, aplicar o padrão:

```text
Flow
  ↓
FlowAction / Invocable Apex
  ↓
Service
  ↓
ServiceAgent / Helper / Selector
```

A classe Invocable deve:

- Ser fina.
- Receber lista de requests.
- Ser bulkificada.
- Mapear input para DTO.
- Chamar Service.
- Retornar lista de responses.
- Não conter regra de negócio pesada.
- Não fazer callout diretamente.
- Não executar SOQL/DML em loop.
- Tratar erros de forma clara para o Flow.

A Service continua sendo a camada de regra de negócio.

---

## Page Layout, Lightning Record Page e Dynamic Forms

O agente deve saber analisar e propor ajustes em experiência declarativa de tela.

Sempre considerar:

- Page Layout controla campos, seções, botões e related lists no layout clássico/base.
- Lightning Record Page controla composição da página Lightning via App Builder.
- Dynamic Forms pode controlar visibilidade de campos/seções diretamente na Lightning Record Page.
- Record Type pode direcionar Page Layout, valores de picklist e processo de negócio.
- Compact Layout impacta highlights panel e visualização resumida.
- Search Layout impacta resultados de busca e lookup.
- Quick Actions impactam produtividade e ações disponíveis ao usuário.

Antes de alterar layout, verificar:

1. Objeto impactado.
2. RecordTypes existentes.
3. Profiles/Permission Sets impactados.
4. Page Layout Assignment.
5. Lightning Record Page Activation.
6. App, Profile e Form Factor da ativação.
7. Campos obrigatórios no layout versus obrigatoriedade real no objeto/regra.
8. Field-Level Security.
9. Related Lists.
10. Quick Actions.
11. Dynamic Forms e regras de visibilidade.
12. Dependências com Validation Rules, Flows e Apex.

---

## Boas práticas para Page Layout

Regras:

- Agrupar campos por contexto de negócio.
- Não criar layout poluído.
- Não expor campos técnicos sem necessidade.
- Não usar Page Layout como única camada de segurança.
- Validar FLS e Permission Sets.
- Separar layout por RecordType quando fizer sentido.
- Manter nomes de seções claros.
- Evitar duplicidade de campos em seções diferentes.
- Priorizar campos mais usados no topo.
- Related Lists devem ser relevantes para o processo.
- Botões e ações devem refletir o fluxo de trabalho.
- Campos obrigatórios visualmente devem ser coerentes com regra de negócio real.
- Não remover campo de layout sem avaliar impacto operacional.
- Não adicionar campo em layout sem avaliar permissão e uso.

Quando houver Dynamic Forms:

- Preferir visibilidade condicional por regra clara.
- Evitar regras de visibilidade muito complexas.
- Validar comportamento por perfil, app e form factor.
- Verificar se o campo também precisa estar no Page Layout para compatibilidade.

---

## Boas práticas para Lightning Record Page

Regras:

- Usar App Builder para organizar experiência por perfil, app e contexto.
- Considerar desktop e mobile.
- Evitar excesso de componentes na página.
- Usar componentes relevantes para o processo.
- Usar Tabs ou Accordion para reduzir poluição visual.
- Usar componentes condicionais com critério claro.
- Validar ativação por App, RecordType e Profile.
- Não criar múltiplas páginas semelhantes sem necessidade.
- Documentar quando uma Lightning Page for específica de um processo.
- Verificar performance da página quando houver muitos componentes customizados.

Ao alterar Lightning Record Page, identificar:

```text
Objeto:
Página Lightning:
Ativação:
App:
RecordType:
Profiles:
Componentes impactados:
Visibilidades condicionais:
Risco:
Validação:
```

---

## Record Types

Ao trabalhar com RecordType:

- Verificar DeveloperName, não apenas Label.
- Verificar Page Layout Assignment.
- Verificar picklists por RecordType.
- Verificar Business Process quando aplicável.
- Verificar Lightning Record Page Activation.
- Buscar RecordType por describe quando possível em Apex.
- Evitar SOQL desnecessário para RecordType.
- Não hardcodar Id de RecordType.
- Validar impacto em Flow, Validation Rule, Apex e LWC.

---

## Validation Rules

Ao criar ou alterar Validation Rule:

- Confirmar regra de negócio.
- Avaliar impacto por perfil, RecordType e fase/status.
- Evitar bloquear integrações sem exceção planejada.
- Usar Custom Permission quando houver necessidade de bypass governado.
- Evitar fórmulas gigantes sem legibilidade.
- Usar mensagem clara para usuário.
- Testar cenários positivos e negativos.
- Avaliar impacto em cargas, integrações, automações e testes unitários.

---

## Permissões, Profiles e Permission Sets

Antes de concluir demanda de tela, Flow ou campo:

- Verificar Object Permission.
- Verificar Field-Level Security.
- Verificar Apex Class Access.
- Verificar Flow Access quando aplicável.
- Verificar Custom Permission.
- Verificar Permission Set Assignment.
- Verificar se o usuário terá acesso ao RecordType.
- Verificar se o layout/página foi ativado para o perfil correto.

Nunca assumir que adicionar campo no layout garante acesso. Segurança deve ser validada por permissão.

---

## Critério de aceite para configuração declarativa

Uma entrega declarativa só é aceita quando:

- O Flow não possui Get/DML dentro de Loop.
- O Flow possui critérios de entrada claros.
- O Flow tem tratamento de Fault quando aplicável.
- O Flow evita reentrada e recursão.
- Page Layout foi validado por RecordType/Profile.
- Lightning Record Page foi validada por App/Profile/Form Factor.
- FLS e permissões foram consideradas.
- Validation Rules não quebram integração/carga sem análise.
- RecordTypes não usam Id hardcoded.
- Dependências de Apex/LWC/Flow foram consideradas.
- Deploy foi pensado com metadados dependentes.

---

## Consulta correta de dados e metadados Salesforce

O agente deve saber consultar dados e metadados Salesforce de forma correta, escolhendo a fonte certa para cada tipo de informação. Não deve inferir estrutura da org sem validar em arquivos locais, describe, Tooling API, Metadata API, REST API, UI API ou SOQL, conforme o caso.

### Princípio principal

Antes de responder ou implementar algo que dependa da org Salesforce, o agente deve identificar se precisa consultar:

```text
Dados de negócio
Metadados de configuração
Metadados de desenvolvimento
Permissões e segurança
Automação declarativa
Código Apex/LWC
Layout e experiência de usuário
Logs e execução
```

A fonte de consulta deve ser escolhida de acordo com o objetivo técnico.

---

## Matriz de decisão: qual fonte usar

### 1. Arquivos locais do repositório

Usar primeiro quando a informação deve estar versionada no projeto.

Consultar arquivos locais para:

- Apex Classes
- Apex Triggers
- LWC
- Aura
- Visualforce
- Objects
- Fields
- RecordTypes
- Validation Rules
- Flows
- Layouts
- Lightning Record Pages
- Permission Sets
- Custom Metadata
- Named Credentials versionáveis
- package.xml
- Configurações já trazidas para source

Regra:

```text
Se o metadado está no repositório, consultar o arquivo local primeiro.
Se houver dúvida se a org está diferente do source, consultar a org depois.
```

---

### 2. Describe / REST sObject Describe

Usar Describe quando precisar entender estrutura de objetos e campos em tempo de execução.

Usar para consultar:

- Objetos disponíveis
- Campos de um objeto
- Tipos de campo
- Picklists
- Labels
- Required / Nillable
- Updateable / Createable
- Child Relationships
- RecordTypeInfos
- Informações gerais do objeto

Preferir Describe para:

```text
Quais campos existem no objeto?
Esse campo é createable/updateable?
Quais picklists existem?
Quais RecordTypes estão disponíveis?
Qual o tipo de um campo?
```

Evitar SOQL para descobrir estrutura quando Describe resolve.

Exemplo conceitual em Apex:

```apex
Schema.DescribeSObjectResult describeResult = Account.SObjectType.getDescribe();
Map<String, Schema.SObjectField> fields = describeResult.fields.getMap();
```

Para RecordType em Apex, preferir:

```apex
Schema.SObjectType.Account
    .getRecordTypeInfosByDeveloperName()
    .get('Meu_RecordType')
    .getRecordTypeId();
```

Não hardcodar Id de RecordType.

---

### 3. SOQL em dados de negócio

Usar SOQL quando precisar consultar registros transacionais ou dados de negócio.

Usar para:

- Account, Contact, Opportunity, Case etc.
- Registros customizados
- Dados relacionados
- Histórico funcional
- Logs customizados
- Configurações em Custom Metadata quando acessadas em Apex
- Validações baseadas em registros

Regras obrigatórias:

- Não fazer SOQL dentro de loop.
- Consultar somente campos necessários.
- Usar filtros seletivos.
- Usar LIMIT quando aplicável.
- Bulkificar consultas.
- Não usar SOQL para descobrir metadado quando Describe/Tooling/Metadata for melhor.
- Não consultar dados reais em testes unitários.

Exemplo correto:

```apex
Set<Id> accountIds = new Set<Id>();

for (Contact contato : contatos) {
    accountIds.add(contato.AccountId);
}

Map<Id, Account> contasPorId = new Map<Id, Account>(
    [SELECT Id, Name FROM Account WHERE Id IN :accountIds]
);
```

Exemplo proibido:

```apex
for (Contact contato : contatos) {
    Account conta = [SELECT Id, Name FROM Account WHERE Id = :contato.AccountId];
}
```

---

### 4. Tooling API

Usar Tooling API para acesso fino a metadados de desenvolvimento e análise técnica da org.

Usar para consultar:

- ApexClass
- ApexTrigger
- ApexCodeCoverage
- ApexTestResult
- FlowDefinition
- Flow
- EntityDefinition
- FieldDefinition
- ValidationRule
- WorkflowRule legado
- Layout metadata disponível via Tooling, quando aplicável
- TraceFlag
- DebugLevel
- AsyncApexJob
- ApexLog

Usar Tooling API quando a pergunta for:

```text
Quais classes existem na org?
Qual o corpo de uma classe Apex na org?
Qual trigger está ativa?
Qual Flow está ativo?
Qual versão ativa do Flow?
Qual cobertura de teste?
Quais jobs Apex estão rodando?
Quais logs existem?
Quais campos existem por EntityDefinition/FieldDefinition?
```

Regra:

```text
Tooling API é preferencial para inspeção técnica fina da org, diagnóstico, código Apex, cobertura, logs e metadados consultáveis via SOQL de tooling.
```

Não usar Tooling API para deploy completo de pacote quando Metadata API/SF CLI for mais adequado.

---

### 5. Metadata API / Salesforce CLI retrieve

Usar Metadata API ou Salesforce CLI retrieve quando precisar trazer ou comparar metadados como arquivos.

Usar para:

- Retrieve de package.xml
- Deploy de metadados
- Comparação source x org
- Page Layouts
- Lightning Record Pages / FlexiPages
- Flows
- Objects
- Fields
- Validation Rules
- Permission Sets
- Profiles
- Custom Metadata
- Tabs
- Applications
- Quick Actions
- Record Types

Usar quando a pergunta for:

```text
Como está o XML real desse layout?
Como está a Lightning Record Page?
Quais metadados serão deployados?
O source local está diferente da org?
Preciso recuperar o Flow completo.
Preciso recuperar Permission Set/Profile/Layout.
```

Regra:

```text
Metadata API é a fonte correta para retrieve/deploy e análise file-based de metadados.
```

Preferir recuperar metadados para arquivo quando a análise exigir estrutura XML completa.

---

### 6. UI API

Usar UI API quando a demanda depender da experiência real do usuário.

Usar para:

- Layout efetivo por usuário
- Campos visíveis/editáveis para usuário
- Picklists por RecordType
- Informações de tela considerando FLS
- Record UI
- Object Info
- Layouts e actions orientados à UI

Usar quando a pergunta for:

```text
O usuário enxerga esse campo?
Esse campo aparece/editável para esse usuário?
Quais picklists aparecem para esse RecordType?
Como a UI deve renderizar esse registro?
```

Regra:

```text
UI API é preferível quando a resposta depende de segurança, FLS, RecordType e experiência efetiva do usuário.
```

---

### 7. Setup Audit Trail, Event Monitoring e logs

Usar quando a demanda envolver auditoria, segurança ou rastreabilidade.

Consultar:

- Setup Audit Trail
- EventLogFile
- LoginHistory
- LoginEvent
- AsyncApexJob
- ApexLog
- FlowInterview / Paused Flow Interviews, quando aplicável
- Debug Logs
- Custom logs do projeto

Usar quando a pergunta for:

```text
Quem alterou configuração?
Quando o metadado foi modificado?
Qual usuário executou a ação?
Houve erro em execução Apex/Flow?
Qual job falhou?
Houve exportação/consulta sensível?
```

---

## Ordem recomendada de consulta

Sempre seguir esta ordem quando aplicável:

```text
1. AGENTS.md
2. docs/PROJECT_INDEX.md
3. Arquivos locais do repositório
4. Describe / Global Describe
5. SOQL para dados de negócio
6. Tooling API para metadados técnicos e diagnóstico
7. Metadata API / SF CLI retrieve para XML e comparação source x org
8. UI API para experiência efetiva do usuário
9. Logs/Auditoria para execução e rastreabilidade
```

O agente deve evitar consultar a org desnecessariamente se o arquivo local versionado já responde com segurança.

---

## Regras para consulta de metadados

Nunca assumir que:

- Campo existe.
- Campo é editável.
- Campo está no layout.
- Campo está liberado por FLS.
- RecordType existe.
- Flow está ativo.
- Layout está atribuído ao perfil correto.
- Lightning Record Page está ativada para app/perfil/RecordType.
- Permission Set concede o acesso necessário.
- Named Credential existe.
- Custom Metadata está configurado.
- Classe Apex da org está igual ao repositório.
- Produção, UAT, SIT e QA estão iguais.

Validar na fonte correta.

---

## Estratégia para comparar source local x org

Quando houver suspeita de divergência entre repositório e org:

1. Identificar metadados envolvidos.
2. Consultar arquivos locais.
3. Recuperar metadados da org via Metadata API/SF CLI.
4. Comparar diferenças.
5. Separar:
   - Diferença esperada
   - Diferença acidental
   - Diferença crítica
   - Diferença que impede deploy
6. Propor correção pontual.

Formato esperado:

```text
Metadado:
Fonte local:
Fonte org:
Diferença encontrada:
Impacto:
Correção recomendada:
```

---

## Estratégia para análise de Flow na org

Para Flow, o agente deve validar:

- Arquivo local do Flow, se existir.
- FlowDefinition para versão ativa.
- Versões existentes.
- Status ativo/inativo.
- Objeto e tipo de trigger.
- Critérios de entrada.
- Elementos Get/Create/Update/Delete.
- Loops.
- Subflows.
- Apex invocável.
- Fault paths.
- Scheduled paths.
- Dependências de RecordType, campos, permissões e objetos.

Quando possível, recuperar XML completo do Flow via Metadata API/SF CLI para análise.

Não analisar Flow apenas pelo nome.

---

## Estratégia para Page Layout e Lightning Record Page

Para Page Layout:

- Consultar arquivo local de layout.
- Se necessário, recuperar layout da org via Metadata API.
- Validar Page Layout Assignment.
- Validar RecordType.
- Validar Profile/Permission Set.
- Validar FLS dos campos.
- Validar botões, actions e related lists.

Para Lightning Record Page / FlexiPage:

- Consultar arquivo local de FlexiPage.
- Se necessário, recuperar da org via Metadata API.
- Validar ativação por App, RecordType, Profile e Form Factor.
- Validar componentes condicionais.
- Validar dependências de LWC/Aura.
- Validar impacto de Dynamic Forms.

---

## Estratégia para permissões

Quando a demanda envolver acesso, tela, campo, Apex, Flow ou dados, o agente deve validar:

- Profile
- Permission Set
- Permission Set Group
- Object Permission
- Field-Level Security
- Apex Class Access
- Flow Access
- Custom Permission
- Tab Visibility
- RecordType access
- Sharing Rules
- Role Hierarchy
- Org-Wide Defaults
- Restriction Rules, quando aplicável

Não concluir problema de permissão olhando apenas Page Layout.

---

## Estratégia para integrações

Quando a demanda envolver integração, validar:

- Named Credential
- External Credential, quando aplicável
- Auth Provider, quando aplicável
- Custom Metadata com paths/configuração
- Remote Site Settings, se legado
- Apex ServiceAgent
- DTOs de request/response
- Logs de integração
- Status HTTP
- Timeout
- Payload enviado
- Payload recebido
- Mapeamento JSON x Salesforce
- Tratamento de erro

Segredos não devem ser buscados, impressos ou expostos.

---

## Estratégia para testes e cobertura

Quando a demanda envolver teste ou deploy:

- Consultar classes de teste locais.
- Consultar cobertura via Tooling API quando necessário.
- Consultar ApexTestResult quando necessário.
- Identificar testes relacionados por dependência funcional.
- Validar se Flow chama Apex.
- Validar se metadado novo exige ajuste de teste.
- Não criar teste apenas para cobertura.

Formato esperado:

```text
Classe alterada:
Classe de teste relacionada:
Cobertura/risco:
Cenários necessários:
Dados mockados:
Callout mock:
```

---

## Boas práticas de consulta em Apex

Dentro de Apex:

- Preferir Describe para metadados simples.
- Preferir Custom Metadata para configuração versionável.
- Preferir Named Credential para endpoint/autenticação.
- Evitar SOQL em loop.
- Evitar DML em loop.
- Evitar chamada HTTP em loop sem controle.
- Usar collections e maps.
- Consultar somente campos necessários.
- Tratar nulls.
- Tratar ausência de configuração.
- Não hardcodar IDs.

---

## Boas práticas de consulta em Flow

Dentro de Flow:

- Nunca usar Get Records dentro de Loop.
- Nunca usar Create/Update/Delete dentro de Loop.
- Buscar dados antes do Loop.
- Usar collections.
- Atualizar/criar/deletar após o Loop.
- Usar Decision para validar elegibilidade.
- Validar se campo mudou antes de executar.
- Evitar reentrada.
- Tratar Fault Path.
- Não chamar Invocable Apex dentro de Loop sem justificativa forte.

---

## Resultado esperado da análise de dados/metadados

Quando a solução depender de consulta Salesforce, o agente deve responder indicando:

```text
Fonte consultada:
Tipo de informação:
Por que essa fonte foi usada:
Evidência encontrada:
Impacto:
Ação recomendada:
```

Exemplo:

```text
Fonte consultada:
- Arquivo local do Flow
- FlowDefinition via Tooling API
- Layout via Metadata API

Conclusão:
O Flow local existe, mas a versão ativa na org é diferente. A correção deve considerar primeiro o retrieve da versão ativa antes de alterar o source.
```

---

## Critério de aceite para consultas Salesforce

A análise só é considerada confiável quando:

- A fonte correta foi usada para o tipo de informação.
- Dados de negócio foram separados de metadados.
- Describe foi usado quando apropriado.
- SOQL não foi usado para resolver problema de metadado simples.
- Tooling API foi considerada para diagnóstico técnico.
- Metadata API/SF CLI foi considerada para XML/retrieve/deploy.
- UI API foi considerada quando o comportamento depende do usuário.
- Permissões foram analisadas além do Page Layout.
- Divergência source x org foi considerada quando aplicável.
- A conclusão não foi baseada em suposição.

---

## Padrão obrigatório de comentários e documentação no código

O agente deve sempre priorizar código legível para humanos e agentes. Toda implementação, refatoração ou criação de classe deve incluir comentários técnicos úteis, objetivos e padronizados.

Comentários não devem ser usados para repetir o óbvio. Devem explicar responsabilidade, intenção de negócio, decisão técnica, regra relevante, dependência, exceção ou contexto de manutenção.

---

## Comentário obrigatório em classes Apex

Toda classe Apex criada ou alterada de forma relevante deve possuir cabeçalho no padrão:

```apex
/**
 * @description       : Descreve de forma objetiva a responsabilidade principal da classe.
 * @author            : Triscal
 * @group             : Nome do domínio, módulo ou frente funcional, quando aplicável.
 * @last modified on  : MM-DD-YYYY
 * @last modified by  : Nome do responsável pela última alteração
 **/
```

Quando o autor ou responsável for conhecido no contexto da demanda, preencher o nome correto. Quando não for conhecido, usar `Triscal` ou preservar o padrão já existente no arquivo.

Exemplo:

```apex
/**
 * @description       : Service responsável por orquestrar o processamento de contratos PJ, validando dados da proposta e montando DTOs para geração documental.
 * @author            : Mário Oliveira
 * @group             : Contratos PJ
 * @last modified on  : 05-19-2026
 * @last modified by  : Felipe Cardozo
 **/
public with sharing class ContratosPJService {
}
```

Regras:

- Não remover cabeçalhos existentes sem necessidade.
- Preservar estilo de comentário já adotado no projeto, quando houver.
- Atualizar `@last modified on` e `@last modified by` quando a alteração for relevante.
- Não alterar autoria original sem justificativa.
- Não preencher informações falsas.
- Se não houver informação segura, usar valor genérico e objetivo.

---

## Comentário obrigatório em métodos Apex

Todo método público, global, invocable, aura-enabled, batch, schedulable, queueable, método de service, método de integração ou método com regra de negócio relevante deve possuir comentário no padrão:

```apex
/**
 * @description Método responsável por descrever, de forma objetiva, o que o método faz e por que existe.
 * @param nomeParametro Descreve o parâmetro quando aplicável.
 * @return TipoRetorno Descreve o retorno quando aplicável.
 **/
```

Exemplo:

```apex
/**
 * @description Método responsável por mapear registros de Proposta para DTO do Contratante e retorná-lo ao batch para processamento do contrato PJ.
 * @param proposta Registro de proposta utilizado como origem dos dados do contratante.
 * @return ContratosPJBatch.ContratanteDTO DTO do contratante preenchido para processamento.
 **/
private ContratosPJBatch.ContratanteDTO mapearContratanteDTO(Opportunity proposta) {
    ContratosPJBatch.ContratanteDTO dtoContratante = new ContratosPJBatch.ContratanteDTO();
    return dtoContratante;
}
```

Regras:

- Métodos privados simples podem não precisar de comentário se forem autoexplicativos.
- Métodos privados com regra de negócio, integração, transformação ou validação devem ser comentados.
- O comentário deve explicar a intenção funcional do método, não apenas repetir o nome.
- Sempre documentar `@param` quando o método possuir parâmetros relevantes.
- Sempre documentar `@return` quando o método retornar valor.
- Para método `void`, não usar `@return`, salvo padrão existente no projeto.

---

## Comentário em construtores

Construtores com dependências, injeção, inicialização de contexto ou parâmetros de negócio devem ser documentados.

Exemplo:

```apex
/**
 * @description Construtor responsável por inicializar o service com a proposta base utilizada no processamento do contrato PJ.
 * @param proposta Registro de proposta utilizado como contexto principal do processamento.
 **/
public ContratosPJService(Opportunity proposta) {
    this.proposta = proposta;
}
```

---

## Comentário em classes Batch, Queueable e Schedulable

Classes assíncronas devem deixar claro:

- O objetivo do processamento.
- Critério de seleção dos registros.
- Volume esperado, quando relevante.
- Regras de retry/idempotência.
- Objetos impactados.
- Integrações chamadas, quando houver.

Exemplo:

```apex
/**
 * @description       : Batch responsável por processar propostas PJ elegíveis para geração de contrato, montando DTOs de contratante, produtos e condições comerciais.
 * @author            : Triscal
 * @group             : Contratos PJ
 * @last modified on  : 05-19-2026
 * @last modified by  : Felipe Cardozo
 **/
public with sharing class ContratosPJBatch implements Database.Batchable<SObject> {
}
```

Métodos `start`, `execute` e `finish` também devem ser documentados quando houver regra relevante.

---

## Comentário em integrações e ServiceAgents

ServiceAgents e métodos de callout devem documentar:

- API chamada.
- Origem do endpoint.
- Named Credential utilizado.
- Custom Metadata utilizado.
- Tipo de request/response.
- Tratamento esperado de erro.

Exemplo:

```apex
/**
 * @description Método responsável por consultar os dados de pessoa física na API SGU utilizando Named Credential e path configurado em Custom Metadata.
 * @param requestDTO DTO com CPF e dados necessários para montagem da requisição.
 * @return PessoaFisicaApiResponseDTO Resposta estruturada retornada pela API SGU.
 **/
public static PessoaFisicaApiResponseDTO consultarPessoaFisica(PessoaFisicaApiRequestDTO requestDTO) {
}
```

Não incluir tokens, segredos, API keys ou dados sensíveis em comentários.

---

## Comentário em DTOs

DTOs devem possuir comentário quando representarem payload relevante de tela, Flow ou API.

Exemplo:

```apex
/**
 * @description DTO utilizado para transportar os dados do contratante entre o processamento da proposta e o batch de geração de contrato PJ.
 **/
public class ContratanteDTO {
    public String nome;
    public String documento;
}
```

Campos de DTO podem receber comentário quando a origem ou regra de preenchimento não for óbvia.

---

## Comentários de regra de negócio

Trechos com regra de negócio importante devem ter comentário curto explicando o motivo da regra.

Exemplo:

```apex
// Valida se a vistoria ainda está elegível para roteirização antes de reenfileirar o processamento.
if (!RoteiroStatusUtils.isElegivelParaRoteirizacao(vistoria.Status__c)) {
    return;
}
```

Comentários devem explicar o porquê, não apenas o que o código já mostra.

Evitar:

```apex
// Faz if
if (status == 'Ativo') {
}
```

Preferir:

```apex
// Somente propostas ativas devem seguir para geração de contrato.
if (status == 'Ativo') {
}
```

---

## Comentários para mudanças solicitadas, chamados e pendências

Quando houver código comentado temporariamente, pendência de negócio, melhoria aguardando confirmação ou referência a chamado, o comentário deve informar contexto, motivo e identificador.

Padrão:

```apex
// Melhoria solicitada - Aguardando confirmação do chamado [TRSCL-9461]
// Campos abaixo ainda não foram enviados ao batch porque dependem de validação funcional.
```

Exemplo:

```apex
// Melhoria solicitada - Aguardando confirmação do chamado [TRSCL-9461] de campos para serem enviados ao batch e processados no contrato PJ.
// dtoContratante.p_tpsocietario  = (this.PROPOSTA.Tipo_Societario__c != null) ? this.PROPOSTA.Tipo_Societario__c : '';
// dtoContratante.p_cdvendedor    = (this.PROPOSTA.Codigo_Vendedor__c != null) ? this.PROPOSTA.Codigo_Vendedor__c : '';
// dtoContratante.p_empindividual = (this.PROPOSTA.Empresario_Individual__c != null) ? this.PROPOSTA.Empresario_Individual__c : '';
```

Regras:

- Código comentado só deve permanecer quando houver justificativa clara.
- Sempre informar chamado, motivo ou pendência.
- Não deixar código comentado “morto” sem contexto.
- Se a decisão for definitiva, remover código comentado.
- Se for pendência temporária, indicar o motivo.

---

## Comentários em Flow, Layout e metadados declarativos

Quando criar ou alterar Flow, o agente deve preencher descrições dos elementos sempre que possível:

- Descrição do Flow.
- Descrição de Decisions.
- Descrição de Assignments relevantes.
- Descrição de Get Records críticos.
- Descrição de Subflows.
- Descrição de Apex Actions.
- Descrição de variáveis relevantes.
- Fault paths com contexto claro.

Padrão esperado:

```text
Este Flow atualiza o status da vistoria após retorno da integração, validando elegibilidade para evitar reentrada de roteirização.
```

Para Page Layout, Lightning Record Page, Dynamic Forms, Validation Rules e Custom Metadata, sempre que houver campo de descrição disponível, preencher com objetivo funcional e contexto da configuração.

---

## Comentários em LWC JavaScript

Em LWC, comentar métodos relevantes, integrações com Apex, transformações de dados e regras de UI.

Exemplo:

```javascript
/**
 * @description Carrega os contratos relacionados à proposta e prepara os dados para renderização da tabela.
 */
async carregarContratos() {
}
```

Comentários inline devem ser usados apenas para regras de negócio ou decisões não óbvias.

Evitar excesso de comentários em código autoexplicativo.

---

## Comentários em testes

Testes devem possuir comentários mínimos para clareza de intenção, especialmente em Arrange, Act e Assert.

Padrão:

```apex
@IsTest
static void deveMapearContratanteComSucesso() {
    // Arrange - cria proposta PJ com dados mínimos para montagem do DTO.

    Test.startTest();
    // Act - executa o mapeamento do contratante.
    Test.stopTest();

    // Assert - valida os campos obrigatórios enviados ao batch.
}
```

Comentários devem ajudar a entender o cenário testado.

---

## Boas práticas gerais de comentários

O agente deve:

- Comentar classes novas.
- Comentar métodos relevantes.
- Comentar regras de negócio não óbvias.
- Comentar decisões técnicas importantes.
- Comentar pendências com referência de chamado.
- Manter comentários atualizados após alteração de código.
- Usar português do Brasil nos comentários, salvo padrão diferente do projeto.
- Evitar comentários genéricos.
- Evitar comentários desatualizados.
- Evitar comentário que apenas repete o código.
- Não expor dados sensíveis em comentários.
- Não incluir segredo, token, senha, endpoint sigiloso ou payload real sensível.

---

## Critério de aceite para comentários

Uma entrega só é aceita quando:

- Classes novas ou alteradas possuem cabeçalho quando aplicável.
- Métodos públicos/relevantes possuem `@description`.
- Métodos com parâmetros relevantes possuem `@param`.
- Métodos com retorno possuem `@return`.
- Regras de negócio importantes possuem comentário objetivo.
- Código comentado temporário possui motivo e referência de chamado, quando aplicável.
- Comentários ajudam leitura humana e leitura por agentes.
- Comentários estão atualizados com o comportamento real do código.
- Não há comentários falsos, genéricos ou enganosos.

---

## Diretrizes Triscal para construção de projetos Salesforce

O agente deve aplicar estas diretrizes sempre que criar, alterar ou revisar artefatos Salesforce. O objetivo é garantir governança, padronização, manutenibilidade, segurança, clareza humana e leitura eficiente por agentes.

---

## Idioma, tradução e ambientes multilíngues

O Salesforce será utilizado em inglês pelos administradores. Porém, diversos clientes podem possuir ambientes multilíngues.

Regras:

- Sempre criar metadados técnicos considerando o padrão Salesforce em inglês quando aplicável.
- Sempre que criar artefatos traduzíveis, avaliar se o contexto precisa ser multilíngue.
- Artefatos traduzíveis incluem, quando aplicável:
  - Object Labels.
  - Field Labels.
  - Custom Labels.
  - Picklist Values.
  - Validation Rule messages.
  - Flow labels e mensagens.
  - Lightning Page labels.
  - Help Text.
  - Descriptions visíveis ou administráveis.
- Quando houver necessidade de múltiplos idiomas, perguntar quais idiomas devem ser considerados.
- Sempre que criar valores em outro idioma, traduzir considerando o contexto de negócio, não apenas tradução literal.
- Quando não houver definição de multilíngue, registrar a premissa antes de implementar.

Formato esperado quando houver dúvida:

```text
Este artefato possui labels/mensagens traduzíveis. O contexto deve ser multilíngue? Se sim, quais idiomas devem ser considerados?
```

---

## Objetos personalizados

Sempre que criar objeto novo, o agente deve preencher `Description` com:

- Finalidade do objeto.
- Projeto relacionado.
- Contexto funcional.
- Funcionalidade atendida.
- Observações relevantes para administradores e agentes.

Antes de criar um objeto novo, o agente deve confirmar ou recomendar:

- Se haverá relatórios.
- Se haverá Activities.
- Se haverá Track Field History.
- Se o campo `Name` será Text ou Auto Number.
- Se `Allow Search` deve ser habilitado.
- Se será criada Tab.
- Se o objeto precisa de Record Types.
- Se o objeto precisa de Page Layout específico.
- Se o objeto precisa de Lightning Record Page.
- Se o objeto precisa de Permission Set específico.
- Se o objeto precisa de relacionamento Master-Detail ou Lookup.
- Se o objeto contém dados sensíveis ou pessoais.

Regra para `Name`:

- Sugerir Auto Number quando o objeto representar registro técnico, controle, fila, log ou processo interno.
- Sugerir Text quando o nome for funcional e reconhecido pelo usuário de negócio.
- Nunca decidir sem explicar a recomendação.

---

## Campos personalizados

Sempre que criar campo novo, preencher `Description` com:

- Finalidade do campo.
- Projeto relacionado.
- Contexto funcional.
- Funcionalidade atendida.
- Origem do dado, quando aplicável.
- Regra de preenchimento, quando aplicável.
- Observação de integração, quando aplicável.

Regras obrigatórias:

- Dar permissão de visualização e edição inicialmente apenas ao perfil Administrador padrão, salvo orientação diferente.
- Questionar se o permissionamento será feito por Permission Set ou Profile.
- Preferir Permission Sets em vez de criação de Profiles específicos.
- Não usar prefixos de identificação como `TCF`, salvo padrão obrigatório do cliente.
- Não usar preposições desnecessárias na nomenclatura.
- Evitar nomes longos, genéricos ou pouco claros.
- Não usar campos do tipo Time; quando houver necessidade, criar como Text e documentar o motivo.
- Para Long Text e Rich Text, sugerir tamanhos factíveis.
- Não usar Long Text/Rich Text em demasia.
- Avaliar FLS antes de uso em Flow, Apex, LWC, Layout ou integração.
- Não atribuir valor a campo fórmula, Auto Number, Roll-Up Summary, calculado, somente leitura ou controlado pelo sistema.

Antes de criar campo, validar:

```text
Tipo do campo:
Obrigatoriedade:
FLS:
Uso em Layout:
Uso em Flow:
Uso em Apex/LWC:
Uso em relatório:
Uso em integração:
Necessidade de tradução:
Dados sensíveis/LGPD:
```

---

## Layouts, Lightning Pages e experiência declarativa

Sempre que houver novos campos:

- Adicionar ao Page Layout padrão do objeto, salvo orientação contrária.
- Avaliar se há múltiplos Record Types e múltiplos Page Layout Assignments.
- Avaliar se o campo também deve aparecer em Dynamic Forms.
- Validar FLS antes de concluir que o campo estará visível.

Regras para Lightning Record Pages:

- Ao criar Lightning Page, usar Field Section em vez de Record Detail.
- Em Lightning Pages, Highlights Panel deve utilizar Dynamic Actions.
- Como padrão para criação de Lightning Page, utilizar o template `Header and Right Sidebar`.
- Ao criar uma Lightning Page, perguntar ou definir:
  - O que ficará na tela principal.
  - O que ficará na sidebar direita.
  - Quais componentes serão condicionais.
  - Quais perfis/apps/RecordTypes receberão a ativação.
  - Se a página será desktop, mobile ou ambos.
- Evitar páginas poluídas.
- Usar Tabs ou Accordion quando houver muitos blocos.
- Validar impacto de performance quando houver muitos componentes customizados.

Formato esperado ao propor Lightning Page:

```text
Template recomendado:
Header and Right Sidebar

Área principal:
- ...

Sidebar direita:
- ...

Dynamic Actions:
- ...

Ativação:
- App:
- RecordType:
- Profile:
- Form Factor:
```

---

## Validation Rules

Sempre que criar ou alterar Validation Rule:

- Preencher descrição com o cenário esperado e o motivo da validação.
- Garantir que a mensagem de erro seja coerente, clara e orientada à ação.
- Restringir a regra exatamente à finalidade onde ela será aplicada.
- Evitar interferência em processos paralelos.
- Avaliar impacto em integrações, cargas, Flow, Apex, testes e usuários.
- Considerar bypass governado por Custom Permission quando aplicável.
- Rodar classes de teste após criar ou alterar Validation Rule.
- Testar cenários positivos e negativos.

Mensagem ruim:

```text
Erro inesperado.
```

Mensagem adequada:

```text
Não foi possível salvar porque a proposta está em fase de aprovação e o campo Data de Início não foi preenchido. Informe a Data de Início e tente novamente.
```

---

## Ordem de preferência para solução Salesforce

Antes de propor Apex ou LWC, validar se a necessidade pode ser resolvida com:

1. Configuração nativa Salesforce.
2. Flow / Record-Triggered Flow.
3. Apex.
4. LWC.

Ordem de preferência:

```text
Configuração nativa > Flow > Apex > LWC
```

Nunca usar código customizado apenas por preferência.

Sempre explicar por que a solução escolhida é a mais adequada.

Critérios:

- Usar configuração nativa quando resolver com segurança, clareza e baixa manutenção.
- Usar Flow quando a regra puder ser resolvida de forma declarativa, sustentável e performática.
- Usar Apex quando houver complexidade, volume, transação, integração ou necessidade de controle fino.
- Usar LWC quando componentes padrão, App Builder, Dynamic Forms ou Screen Flow não atenderem à experiência necessária.

---

## Flow: tipos permitidos e uso adequado

Tipos de Flow permitidos:

- Record-Triggered Flow.
- Screen Flow.
- Autolaunched Flow.
- Scheduled Flow.
- Platform Event-Triggered Flow.
- Subflow.

Priorizar:

- Before-Save Record-Triggered Flow para atualizações simples no próprio registro.
- After-Save Record-Triggered Flow para criar/atualizar registros relacionados, enviar notificações ou executar ações que dependem do ID do registro.
- Screen Flow para interações guiadas com usuário.
- Autolaunched Flow para lógica reutilizável.
- Scheduled Flow para processamentos programados.
- Platform Event-Triggered Flow para eventos assíncronos.

Quando houver necessidade de Flows de trigger paralelos no mesmo objeto, usar Flow Trigger Explorer para definir ordem correta de execução.

---

## Flow: bulk safety obrigatório

Todo Record-Triggered Flow deve ser desenhado para funcionar corretamente com múltiplos registros.

O agente deve considerar:

- Execução em massa.
- Importação de dados.
- Data Loader.
- Integrações.
- Atualizações em lote.
- Processos assíncronos.
- Reprocessamento.
- Possível recursão.

Nunca desenhar um Record-Triggered Flow pensando apenas em um registro isolado.

---

## Flow: proibição de Get/DML dentro de Loop

Ao usar Loop em Flow, é proibido colocar dentro do Loop:

- Get Records.
- Create Records.
- Update Records.
- Delete Records.
- Actions repetitivas sem necessidade.
- Subflows que executem DML sem controle.
- Chamadas externas repetitivas sem justificativa técnica.

Padrão correto:

```text
1. Antes do Loop:
   - Executar os Get Records necessários.
   - Preparar coleções.
   - Preparar variáveis auxiliares.
   - Preparar critérios de comparação.

2. Durante o Loop:
   - Avaliar condições.
   - Fazer Assignments.
   - Montar coleções para criação, atualização ou exclusão.

3. Depois do Loop:
   - Executar Create Records, Update Records ou Delete Records uma única vez usando coleção.
```

Objetivo:

- Evitar estouro de governor limits.
- Melhorar performance.
- Garantir comportamento bulkificado.
- Reduzir risco de falhas.
- Manter o Flow escalável.
- Manter o Flow sustentável.

---

## Flow: validação de campos antes de Assignment, Create ou Update

Antes de definir qualquer Assignment, Create Records ou Update Records, o agente deve identificar se o campo pode receber valor.

Validar se o campo é:

- Editável.
- Obrigatório.
- Somente leitura.
- Fórmula.
- Auto Number.
- Roll-Up Summary.
- Calculado.
- Controlado pelo sistema.
- Sem permissão de escrita.
- Com FLS restritivo.
- Dependente de Record Type ou processo específico.

Nunca atribuir valor a campos:

- Fórmula.
- Somente leitura.
- Auto Number.
- Roll-Up Summary.
- Calculados.
- Controlados pelo sistema.
- Sem permissão de escrita no contexto esperado.

Quando houver dúvida sobre a metadata, declarar a premissa e sugerir validação na org.

---

## Flow: descrições em elementos críticos

Elementos críticos do Flow devem conter descrição.

Adicionar descrição especialmente em:

- Start.
- Decisions principais.
- Assignments complexos.
- Get Records relevantes.
- Create Records.
- Update Records.
- Delete Records.
- Actions.
- Subflows.
- Fault paths.
- Elementos que tratam dados sensíveis.
- Elementos que afetam permissões.
- Elementos que executam integrações.

A descrição deve explicar:

- O que o elemento faz.
- Por que existe.
- Qual regra de negócio atende.
- Quais premissas são relevantes.

---

## Flow: idempotência

Flows que possam ser reprocessados devem ser idempotentes.

O agente deve garantir que o Flow não gere efeitos duplicados se for executado mais de uma vez para o mesmo registro ou evento.

Sempre avaliar:

- O Flow pode ser disparado novamente pelo mesmo registro?
- Existe risco de criar registros duplicados?
- Existe risco de enviar notificações duplicadas?
- Existe risco de atualizar o mesmo registro repetidamente?
- Existe risco de recursão?
- Existe critério para identificar se a ação já foi executada?
- Existe controle para evitar reprocessamento indevido?

Quando necessário, usar:

- Campos de controle.
- Status.
- Chaves externas.
- Custom Metadata.
- Critérios de entrada mais restritos.
- Verificações antes de criar registros.
- Verificações antes de enviar notificações.
- Lógica de deduplicação.
- Controle de data/hora de última execução.

---

## Flow: Fault Paths e mensagens de erro

Flows críticos devem possuir tratamento de erro.

Sempre considerar:

- Fault path em elementos de DML.
- Fault path em Actions.
- Registro de erro quando aplicável.
- Mensagem amigável para o usuário quando aplicável.
- Evitar exposição de dados técnicos sensíveis.
- Estratégia para análise em homologação e produção.

Mensagens de erro devem ser claras, úteis e orientadas à ação.

Toda mensagem de erro deve:

- Explicar o problema em linguagem simples.
- Informar o que o usuário pode corrigir.
- Evitar termos técnicos desnecessários.
- Não expor IDs internos.
- Não expor stack trace.
- Não expor dados sensíveis.
- Ser adequada ao perfil do usuário final.

---

## Flow: proibição de IDs hardcoded

Nunca usar IDs hardcoded em Flow, Apex ou LWC.

É proibido hardcodar:

- UserId.
- ProfileId.
- RoleId.
- QueueId.
- RecordTypeId.
- GroupId.
- PermissionSetId.
- TerritoryId.
- BusinessHoursId.
- IDs de registros de configuração.
- IDs de usuários específicos.
- IDs de filas.
- IDs de grupos.
- IDs de Record Types.

Alternativas recomendadas:

- DeveloperName.
- API Name.
- Custom Metadata Type.
- Custom Setting, quando aplicável.
- Custom Permission.
- Permission Set.
- Record Type DeveloperName.
- Queue DeveloperName.
- Public Group DeveloperName.
- Labels, quando adequado.
- Busca dinâmica por critérios estáveis.

---

## Flow: reutilização, variáveis e redução de duplicidade

Separar lógica reutilizável em Subflow quando a mesma lógica for usada em mais de um Flow.

Usar Subflow para:

- Validações reutilizáveis.
- Cálculos reutilizáveis.
- Processos comuns.
- Regras compartilhadas.
- Montagem de mensagens.
- Regras de roteamento.
- Lógica de apoio.

Não criar Subflows excessivamente pequenos sem ganho real de reutilização ou clareza.

Variáveis devem ter nomes objetivos e funcionais.

Evitar:

```text
var1
record
temp
item
collection1
decision1
assignment2
```

Preferir:

```text
varAccountId
varCurrentUserId
recOpportunity
colCasesToUpdate
colAccountsWithoutOwner
decHasActiveContract
asgPrepareCasesForUpdate
getActiveRecordTypeByDeveloperName
```

Evitar:

- Get Records repetidos sem necessidade.
- Actions duplicadas.
- Decisions duplicadas.
- Critérios repetidos.
- Caminhos paralelos que fazem a mesma coisa.
- Ramificações redundantes.

Quando houver decisões parecidas, consolidar em uma única Decision ou reorganizar o desenho do Flow.

---

## Apex: quando usar

Usar Apex somente quando Flow ou configuração nativa não forem adequados.

Apex é indicado quando houver:

- Alto volume de registros.
- Necessidade de bulkificação avançada.
- Lógica complexa com múltiplos objetos.
- Consultas SOQL complexas.
- Regras transacionais críticas.
- Necessidade de controle fino de exceções.
- Integrações REST ou SOAP.
- Callouts.
- Processamento assíncrono.
- Queueable Apex.
- Batch Apex.
- Scheduled Apex.
- Platform Events.
- Reutilização de lógica entre Flow, LWC, API e jobs.
- Risco de Flow ficar grande, frágil ou difícil de manter.
- Necessidade de melhor performance.
- Necessidade de testes automatizados mais rigorosos.

Quando Apex for necessário, gerar código limpo, performático, bulkificado, seguro e testável.

---

## Apex: regras obrigatórias

- Nunca fazer SOQL dentro de loop.
- Nunca fazer DML dentro de loop.
- Usar List, Set e Map corretamente.
- Tratar múltiplos registros sempre.
- Evitar código monolítico.
- Separar responsabilidades.
- Evitar hardcode.
- Evitar IDs hardcoded.
- Evitar nomes de perfil hardcoded.
- Evitar RecordTypeId hardcoded.
- Usar Custom Metadata quando regras forem configuráveis.
- Usar constantes para valores fixos.
- Tratar exceções de forma significativa.
- Não silenciar exceções.
- Não usar System.debug excessivo.
- Considerar governor limits.
- Considerar segurança.
- Considerar sharing.
- Considerar CRUD e FLS quando aplicável.
- Criar classe de teste para todo Apex entregue.
- Entregar classes de teste completas com objetivo mínimo de 95% de cobertura para o código novo/alterado, salvo justificativa técnica.

---

## Apex: padrão de arquitetura

Preferir separação em camadas quando aplicável:

- Trigger.
- Trigger Handler.
- Service.
- Selector ou Repository.
- Domain.
- DTO ou Wrapper.
- Controller para LWC.
- FlowAction / Invocable Apex para Flow.
- Classe de teste.
- Test Data Factory, quando fizer sentido.

Triggers devem conter apenas roteamento.

Exemplo de padrão:

```apex
trigger AccountTrigger on Account (
    before insert,
    before update,
    after insert,
    after update
) {
    AccountTriggerHandler handler = new AccountTriggerHandler();

    if (Trigger.isBefore) {
        if (Trigger.isInsert) {
            handler.beforeInsert(Trigger.new);
        }

        if (Trigger.isUpdate) {
            handler.beforeUpdate(Trigger.new, Trigger.oldMap);
        }
    }

    if (Trigger.isAfter) {
        if (Trigger.isInsert) {
            handler.afterInsert(Trigger.new);
        }

        if (Trigger.isUpdate) {
            handler.afterUpdate(Trigger.new, Trigger.oldMap);
        }
    }
}
```

---

## LWC: quando usar e boas práticas

Usar LWC somente quando componentes padrão, Lightning App Builder, Dynamic Forms ou Screen Flow não atenderem à experiência necessária.

Todo LWC deve:

- Usar Lightning Web Components modernos.
- Usar componentes base Salesforce sempre que possível.
- Seguir SLDS 2 quando disponível no projeto.
- Ser acessível.
- Ser responsivo.
- Evitar CSS customizado desnecessário.
- Separar responsabilidade entre HTML, JavaScript, Apex e metadata.
- Tratar loading, erro, empty state e success state.
- Não expor dados indevidamente.
- Não conter regra crítica apenas no front-end.
- Respeitar CRUD/FLS no backend quando aplicável.
- Usar Custom Labels quando houver necessidade de tradução.

---

## Segurança e permissionamento

Quando houver criação ou edição de objetos, campos, telas, Flows ou Apex, o agente deve questionar ou indicar como será feito o permissionamento.

Regras:

- Preferir Permission Sets em vez de criação de Profiles específicos.
- Evitar criar perfis específicos sem necessidade.
- Deixar o permissionamento operacional a cargo de Permission Sets sempre que possível.
- Evitar crescimento desnecessário de Profiles, pois dificulta administração.
- Avaliar CRUD.
- Avaliar FLS.
- Avaliar Apex Class Access.
- Avaliar Flow Access.
- Avaliar Custom Permissions.
- Avaliar RecordType access.
- Avaliar Tab Visibility.
- Avaliar Sharing quando aplicável.
- Avaliar dados sensíveis e LGPD.

Pergunta padrão quando criar campo/objeto:

```text
O acesso será controlado por Permission Set ou por Profile? A recomendação Triscal é usar Permission Sets para evitar engessamento operacional e excesso de perfis.
```

---

## Critério de aceite adicional para construção Salesforce

Uma entrega de construção Salesforce só é aceita quando:

- Foi avaliado se configuração nativa resolve antes de Flow/Apex/LWC.
- Foi avaliado se Flow resolve antes de Apex.
- Foi avaliado se LWC é realmente necessário.
- Objetos novos possuem Description com finalidade, projeto, contexto e funcionalidade.
- Campos novos possuem Description com finalidade, projeto, contexto e funcionalidade.
- Permissões foram pensadas por Permission Set, salvo exceção justificada.
- Campos novos foram avaliados para Page Layout, Dynamic Forms e FLS.
- Lightning Pages usam Field Section em vez de Record Detail quando aplicável.
- Highlights Panel usa Dynamic Actions.
- Template padrão de Lightning Page foi considerado.
- Validation Rules possuem descrição, mensagem clara e escopo restrito.
- Flows são bulk safe.
- Não há Get/DML dentro de Loop em Flow.
- Não há SOQL/DML dentro de Loop em Apex.
- Não há IDs hardcoded.
- Apex novo/alterado possui teste com objetivo mínimo de 95% de cobertura.
- LWC foi usado apenas quando configuração, Dynamic Forms, App Builder ou Flow não atendem.
- Comentários foram usados para explicar regras, decisões, pendências e contexto relevante.
- Não há código morto ou comentado sem justificativa.
- Não há exposição de dados sensíveis em mensagens de erro ou comentários.
