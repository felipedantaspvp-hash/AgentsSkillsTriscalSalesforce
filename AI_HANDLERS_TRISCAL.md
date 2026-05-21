# AI_HANDLERS.md — Triscal Salesforce Quality Handlers

## Objetivo

Este arquivo define os **Handlers de IA** que devem ser aplicados pelo Codex/Agent antes, durante e depois de qualquer análise, implementação, refatoração, documentação ou code review em projetos Salesforce da Triscal.

A função dos Handlers é garantir qualidade, reduzir alucinações, economizar tokens, preservar arquitetura, validar boas práticas Salesforce e assegurar que a entrega esteja aderente ao padrão Triscal.

Este arquivo complementa:

```text
AGENTS.md
.agents/skills/triscal-salesforce/SKILL.md
docs/PROJECT_INDEX.md
```

---

## Como o agente deve usar este arquivo

Antes de iniciar qualquer tarefa, o agente deve aplicar mentalmente os Handlers abaixo na ordem correta.

Fluxo obrigatório:

```text
1. Context Handler
2. Index Handler
3. Scope Handler
4. Salesforce Metadata Handler
5. Architecture Handler
6. Declarative First Handler
7. Security Handler
8. Implementation Handler
9. Test Handler
10. Documentation Handler
11. Quality Gate Handler
12. Final Response Handler
```

Cada Handler funciona como um checkpoint de qualidade.

O agente não deve pular Handlers sem justificativa.

---

# 1. Context Handler

## Objetivo

Garantir que o agente entenda o contexto da demanda antes de agir.

## Regras

Antes de responder, o agente deve identificar:

```text
Tipo de solicitação:
- Análise
- Bug
- Implementação
- Refatoração
- Documentação
- Code Review
- Deploy/Flosum
- Configuração declarativa
- Integração
- Testes

Domínio Salesforce envolvido:
- Apex
- LWC
- Flow
- Visualforce
- Object/Field
- Page Layout
- Lightning Record Page
- Permission Set/Profile
- Validation Rule
- Custom Metadata
- Named Credential
- Flosum/DevOps
```

## Perguntas internas obrigatórias

```text
O pedido está claro?
Existe risco de alterar algo sem contexto?
Preciso consultar arquivos?
Preciso consultar metadados?
Preciso validar org/source?
A solução pode ser declarativa antes de código?
```

## Saída esperada

O agente deve seguir apenas quando souber:

```text
O que precisa ser feito.
Onde provavelmente está o impacto.
Qual tipo de artefato Salesforce será analisado.
```

---

# 2. Index Handler

## Objetivo

Garantir economia de tokens e evitar leitura desnecessária de arquivos.

## Regras

Antes de abrir muitos arquivos, o agente deve consultar:

```text
docs/PROJECT_INDEX.md
```

Se não existir, deve criar ou sugerir a criação do índice leve.

O índice deve mapear:

```text
Controllers
FlowActions / Invocable Apex
Services
ServiceAgents
DTOs
LWCs
Flows
Objects
Fields
RecordTypes
Layouts
FlexiPages
Permission Sets
Custom Metadata
Named Credentials
Classes de teste
Fluxos técnicos principais
```

## Regras de economia de tokens

O agente deve:

```text
Consultar primeiro o índice.
Selecionar arquivos candidatos.
Abrir apenas arquivos relevantes.
Evitar ler o projeto inteiro sem necessidade.
Não copiar código inteiro para a resposta.
Preferir conclusão objetiva.
```

## Bloqueio

Se não houver índice e a demanda depender de contexto amplo, o agente deve indicar:

```text
Não encontrei PROJECT_INDEX.md. Vou criar/atualizar um índice leve antes de aprofundar a análise.
```

---

# 3. Scope Handler

## Objetivo

Evitar overengineering e mudanças fora do escopo.

## Regras

Antes de implementar, o agente deve delimitar:

```text
Escopo da alteração:
Arquivos impactados:
Arquivos que não devem ser alterados:
Risco:
Menor solução segura:
```

## O agente deve evitar

```text
Reescrever arquitetura inteira.
Criar abstrações desnecessárias.
Alterar contrato público sem necessidade.
Refatorar código não relacionado.
Remover metadados sem análise.
Criar Apex/LWC quando configuração nativa resolve.
```

## Saída esperada

Para toda implementação, o agente deve saber responder:

```text
Qual é a menor alteração segura?
Por que essa solução é suficiente?
Qual risco ela reduz?
```

---

# 4. Salesforce Metadata Handler

## Objetivo

Garantir consulta correta de dados e metadados Salesforce.

## Matriz de decisão

```text
Arquivos versionados no source
→ consultar arquivos locais primeiro.

Estrutura de objeto/campo
→ usar Describe / sObject Describe.

Dados de negócio
→ usar SOQL / REST API.

Metadados técnicos e diagnóstico
→ usar Tooling API.

XML, retrieve, deploy e comparação source x org
→ usar Metadata API / Salesforce CLI.

Experiência efetiva do usuário
→ usar UI API.

Logs, execução e auditoria
→ usar ApexLog, AsyncApexJob, Setup Audit Trail, Event Monitoring.
```

## Regras

O agente nunca deve assumir:

```text
Campo existe.
Campo é editável.
Campo está no layout.
Campo está liberado por FLS.
RecordType existe.
Flow está ativo.
Lightning Page está ativada para app/perfil/RecordType.
Permission Set concede acesso.
Named Credential existe.
Custom Metadata está configurado.
Org está igual ao source local.
```

## Saída esperada

Quando a tarefa depender de metadados, informar:

```text
Fonte usada:
Motivo da fonte:
Evidência:
Conclusão:
```

---

# 5. Architecture Handler

## Objetivo

Garantir aderência ao padrão Triscal.

## Padrão obrigatório

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

## Regras

```text
Controller deve ser fina.
FlowAction deve ser fina.
Service concentra regra de negócio.
ServiceAgent concentra integração externa.
Selector/Repository concentra consulta quando existir esse padrão.
DTO representa payload estruturado.
Trigger deve conter apenas roteamento.
```

## Bloqueios

O agente deve bloquear ou apontar risco quando encontrar:

```text
Regra de negócio na Controller.
Callout fora da ServiceAgent.
DML na ServiceAgent.
SOQL/DML em loop.
ID hardcoded.
Map<String,Object> desnecessário quando DTO tipado é possível.
LWC com regra crítica apenas no front-end.
Flow com Get/DML dentro de Loop.
```

---

# 6. Declarative First Handler

## Objetivo

Garantir que o agente escolha a solução Salesforce mais simples, sustentável e nativa possível.

## Ordem de preferência

```text
1. Configuração nativa Salesforce.
2. Flow / Record-Triggered Flow.
3. Apex.
4. LWC.
```

## Regras

Antes de propor Apex ou LWC, o agente deve avaliar:

```text
A configuração nativa resolve?
Flow resolve de forma sustentável?
Apex é necessário por complexidade, volume, transação ou integração?
LWC é realmente necessário para experiência customizada?
```

## Critérios para Apex

Usar Apex quando houver:

```text
Alto volume.
Bulkificação avançada.
Lógica complexa.
Integração REST/SOAP.
Callout.
Processamento assíncrono.
Controle fino de exceção.
Reutilização entre Flow, LWC, API e jobs.
Risco de Flow ficar grande/frágil.
```

## Critérios para LWC

Usar LWC apenas quando:

```text
Componentes padrão não atendem.
Lightning App Builder não atende.
Dynamic Forms não atende.
Screen Flow não atende.
Experiência exige UI customizada.
```

---

# 7. Flow Quality Handler

## Objetivo

Garantir que Flows sejam bulk safe, legíveis, sustentáveis e seguros.

## Regras obrigatórias

```text
Nunca usar Get Records dentro de Loop.
Nunca usar Create Records dentro de Loop.
Nunca usar Update Records dentro de Loop.
Nunca usar Delete Records dentro de Loop.
Nunca usar Actions repetitivas dentro de Loop sem justificativa.
Nunca usar Subflow com DML dentro de Loop sem controle.
Nunca hardcodar IDs.
Sempre validar campos antes de Assignment/Create/Update.
Sempre considerar Fault Paths em Flows críticos.
Sempre considerar idempotência.
Sempre considerar reentrada/recursão.
```

## Padrão correto de Loop

```text
Antes do Loop:
- Get Records necessários.
- Preparar coleções.
- Preparar variáveis auxiliares.

Durante o Loop:
- Avaliar condições.
- Fazer Assignments.
- Montar coleções.

Depois do Loop:
- Executar DML uma única vez usando coleção.
```

## Descrições obrigatórias

Elementos críticos devem ter descrição:

```text
Start
Decision
Assignment complexo
Get Records relevante
Create/Update/Delete
Action
Subflow
Fault Path
Elemento com dado sensível
Elemento com integração
```

---

# 8. Security Handler

## Objetivo

Garantir segurança, permissionamento e conformidade.

## Regras

Sempre avaliar:

```text
CRUD
FLS
Sharing
Permission Sets
Profiles
Custom Permissions
RecordType access
Apex Class Access
Flow Access
Tab Visibility
Dados sensíveis
LGPD
Logs com dados confidenciais
Segredos em código/metadados
```

## Permissionamento

Preferência Triscal:

```text
Permission Sets > Profiles específicos
```

O agente deve evitar criar Profiles específicos sem justificativa.

Quando criar objeto/campo:

```text
Perguntar ou indicar se o acesso será por Permission Set ou Profile.
Recomendar Permission Set como padrão.
Inicialmente liberar campo apenas para Administrador padrão, salvo orientação diferente.
```

## Bloqueios

Nunca expor:

```text
Token
Senha
API Key
Segredo
Stack trace para usuário final
Payload sensível em log
ID interno desnecessário em mensagem
```

---

# 9. Implementation Handler

## Objetivo

Garantir implementação limpa, segura e aderente ao projeto.

## Regras para Apex

```text
Nunca SOQL em loop.
Nunca DML em loop.
Usar List, Set e Map.
Bulkificar métodos.
Evitar hardcode.
Evitar IDs hardcoded.
Evitar ProfileName hardcoded.
Evitar RecordTypeId hardcoded.
Usar Custom Metadata para regras configuráveis.
Usar constantes para valores fixos.
Tratar exceções com significado.
Não silenciar exceções.
Não usar System.debug excessivo.
Considerar sharing, CRUD e FLS.
```

## Regras para LWC

```text
Usar componentes base Salesforce.
Seguir SLDS.
Ser acessível.
Ser responsivo.
Tratar loading, erro, empty state e success state.
Não ter regra crítica apenas no front-end.
Não expor dados indevidamente.
Usar Custom Labels quando houver tradução.
```

## Regras para metadados

```text
Objetos novos devem ter Description.
Campos novos devem ter Description.
Validation Rules devem ter Description e mensagem clara.
Lightning Pages devem usar Field Section em vez de Record Detail.
Highlights Panel deve usar Dynamic Actions.
Template padrão para LP: Header and Right Sidebar.
```

---

# 10. Comment Handler

## Objetivo

Garantir código legível para humanos e agentes.

## Classes Apex

Toda classe nova ou alterada de forma relevante deve possuir cabeçalho:

```apex
/**
 * @description       : Descreve de forma objetiva a responsabilidade principal da classe.
 * @author            : Triscal
 * @group             : Nome do domínio, módulo ou frente funcional, quando aplicável.
 * @last modified on  : MM-DD-YYYY
 * @last modified by  : Nome do responsável pela última alteração
 **/
```

## Métodos Apex

Métodos públicos, globais, invocable, aura-enabled, batch, schedulable, queueable, service, integração ou regra relevante devem ter:

```apex
/**
 * @description Método responsável por descrever, de forma objetiva, o que o método faz e por que existe.
 * @param nomeParametro Descreve o parâmetro quando aplicável.
 * @return TipoRetorno Descreve o retorno quando aplicável.
 **/
```

## Comentários de regra de negócio

Comentários devem explicar o porquê, não o óbvio.

Evitar:

```apex
// Faz if
```

Preferir:

```apex
// Somente propostas ativas devem seguir para geração de contrato.
```

## Comentários de pendência/chamado

Código comentado temporário deve ter motivo e referência:

```apex
// Melhoria solicitada - Aguardando confirmação do chamado [TRSCL-9461]
// Campos abaixo ainda não foram enviados ao batch porque dependem de validação funcional.
```

---

# 11. Test Handler

## Objetivo

Garantir cobertura, qualidade e segurança de regressão.

## Regras

Sempre que alterar Apex:

```text
Criar ou atualizar teste.
Não depender de dados reais da org.
Criar massa própria.
Usar mocks para callout.
Usar Test.startTest() e Test.stopTest().
Usar Assert.areEqual / Assert.areNotEqual / Assert.isTrue.
Evitar System.assertEquals.
Usar Test.setCreatedDate() quando necessário.
Testar cenário positivo.
Testar cenário negativo.
Testar exceção relevante.
Testar bulk quando aplicável.
```

## Meta

```text
Código novo/alterado deve buscar mínimo de 95% de cobertura, salvo justificativa técnica.
```

## Teste bom

Teste deve validar comportamento, não apenas cobertura.

---

# 12. Documentation Handler

## Objetivo

Garantir documentação útil, clara e rastreável.

## Quando documentar

Documentar quando houver:

```text
Mudança de arquitetura.
Nova integração.
Novo Flow crítico.
Novo objeto/campo relevante.
Nova regra de negócio.
Mudança de segurança/permissão.
Mudança de deploy/Flosum.
Correção de bug relevante.
```

## Estrutura técnica

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

---

# 13. Quality Gate Handler

## Objetivo

Executar checklist final antes de entregar.

## Checklist obrigatório

Antes da resposta final, validar:

```text
Arquivos relevantes foram analisados?
PROJECT_INDEX.md foi consultado?
A solução é a menor segura?
Foi avaliado se configuração nativa resolve?
Foi avaliado se Flow resolve antes de Apex?
Arquitetura Controller/FlowAction > Service > ServiceAgent foi respeitada?
Não há SOQL/DML em loop?
Não há Get/DML dentro de Loop em Flow?
Não há ID hardcoded?
Segurança/CRUD/FLS foram considerados?
Permission Sets foram preferidos a Profiles?
Comentários obrigatórios foram aplicados?
Testes foram criados/ajustados?
Risco foi indicado?
Validação foi indicada?
```

## Se falhar

Se qualquer item crítico falhar, o agente deve:

```text
Corrigir antes de entregar.
Ou declarar explicitamente a limitação e o risco.
```

---

# 14. Final Response Handler

## Objetivo

Garantir resposta curta, conclusiva e útil.

## Formato preferido

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

## Para correções simples

```text
Causa:
...

Correção:
...

Teste:
...
```

## Regras de economia

Evitar:

```text
Introdução longa.
Teoria genérica.
Repetir o pedido.
Muitas alternativas desnecessárias.
Código gigante quando trecho/diff resolve.
```

Preferir:

```text
Resposta objetiva.
Diagnóstico claro.
Ação recomendada.
Risco e validação.
```

---

# Critério de aceite dos AI Handlers

Os Handlers são considerados aplicados quando:

```text
A resposta não depende de suposição.
A fonte de verdade foi validada.
O índice foi considerado.
A solução respeita padrão Triscal.
O escopo foi controlado.
Segurança foi considerada.
A solução é declarativa quando possível.
Código customizado só foi usado quando justificado.
Comentários e testes foram considerados.
A entrega final é objetiva e conclusiva.
```

---

# Regra final

O agente deve tratar este arquivo como uma esteira de qualidade.

Nenhuma implementação deve ser considerada pronta sem passar pelos Handlers aplicáveis.

Se houver conflito entre velocidade e qualidade, priorizar qualidade, segurança e rastreabilidade.
