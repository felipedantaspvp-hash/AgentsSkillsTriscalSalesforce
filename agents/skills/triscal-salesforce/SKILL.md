---
name: triscal-salesforce
description: Use esta Skill para tarefas Salesforce no padrão Triscal. Aplica análise seletiva por PROJECT_INDEX.md, arquitetura Controller/FlowAction > Service > ServiceAgent, solução declarativa-first, segurança, testes e resposta objetiva. Carregue referências detalhadas em docs/agent-reference apenas quando necessário.
---

# Skill: Triscal Salesforce Enterprise

## Objetivo

Orientar o Codex a trabalhar em projetos Salesforce da Triscal com qualidade, baixo consumo de tokens e baixa alucinação.

Use para:

- Apex, Trigger, Batch, Queueable, Schedulable.
- LWC, Visualforce e Screen Flow.
- Record-Triggered Flow, Autolaunched Flow, Scheduled Flow e Platform Event Flow.
- Objetos, campos, layouts, RecordTypes, Validation Rules, Permission Sets e Profiles.
- Integrações, Named Credentials, Custom Metadata, Flosum/DevOps.
- Testes, análise de bugs, refatoração e documentação.

---

## Fluxo obrigatório

Antes de agir:

1. Consulte `docs/PROJECT_INDEX.md`.
2. Identifique arquivos candidatos.
3. Abra somente os arquivos relevantes.
4. Aplique `AI_HANDLERS.md`.
5. Verifique se precisa de referência detalhada em `docs/agent-reference/`.
6. Proponha ou implemente a menor solução segura.

Não assumir nomes de classes, campos, objetos, RecordTypes, Flows, layouts, metadados ou permissões sem validar.

---

## Ordem de solução Salesforce

Sempre avaliar nesta ordem:

```text
Configuração nativa > Flow > Apex > LWC
```

Use Apex quando houver volume, integração, transação, lógica complexa, processamento assíncrono, reuso entre canais ou necessidade de controle fino.

Use LWC apenas quando componentes padrão, App Builder, Dynamic Forms ou Screen Flow não atenderem a experiência necessária.

---

## Arquitetura obrigatória

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

Regras:

- Controller/FlowAction recebe, delega e retorna.
- Service decide regra de negócio.
- ServiceAgent executa integração externa.
- Selector/Repository concentra consulta quando esse padrão existir.
- DTOs representam payloads estruturados.
- Trigger contém apenas roteamento.

---

## Regras essenciais Apex

- Nunca SOQL em loop.
- Nunca DML em loop.
- Usar `List`, `Set` e `Map`.
- Bulkificar métodos.
- Evitar código monolítico.
- Não usar IDs hardcoded.
- Não hardcodar ProfileName ou RecordTypeId.
- Usar Custom Metadata para regras configuráveis.
- Usar Named Credential para endpoint/autenticação.
- Tratar exceções com significado.
- Não silenciar exceções.
- Considerar sharing, CRUD e FLS.
- Criar/ajustar teste para todo Apex alterado.
- Preferir `Assert.areEqual`, `Assert.areNotEqual`, `Assert.isTrue`.
- Buscar 95% de cobertura para código novo/alterado, salvo justificativa.

Detalhes: `docs/agent-reference/SALESFORCE_COMMENTS_TESTS_GUIDE.md`.

---

## Regras essenciais Flow

- Todo Record-Triggered Flow deve ser bulk safe.
- Nunca Get/Create/Update/Delete dentro de Loop.
- Fazer Get antes do Loop.
- Montar coleções durante o Loop.
- Executar DML uma vez após o Loop.
- Validar campos antes de Assignment/Create/Update.
- Considerar Fault Paths em Flows críticos.
- Considerar idempotência, reentrada e recursão.
- Não usar IDs hardcoded.
- Usar Flow Trigger Explorer quando houver múltiplos Flows no mesmo objeto.
- Descrever elementos críticos.

Detalhes: `docs/agent-reference/SALESFORCE_FLOW_GUIDE.md`.

---

## Regras essenciais LWC

- Usar componentes base Salesforce quando possível.
- Seguir SLDS.
- Ser responsivo e acessível.
- Tratar loading, empty, error e success state.
- Não manter regra crítica apenas no front-end.
- Apex deve validar segurança e regra.
- Usar Custom Labels quando houver tradução.
- Não expor IDs técnicos ou dados sensíveis sem necessidade.

---

## Dados e metadados Salesforce

Escolha a fonte correta:

```text
Arquivos locais → source versionado.
Describe / sObject Describe → objetos, campos, picklists, RecordTypes.
SOQL / REST → dados de negócio.
Tooling API → Apex, FlowDefinition, cobertura, logs, diagnóstico técnico.
Metadata API / SF CLI retrieve → XML, deploy, layouts, flows, permission sets.
UI API → experiência efetiva por usuário, FLS, layout e picklists.
Logs/Auditoria → ApexLog, AsyncApexJob, Setup Audit Trail, Event Monitoring.
```

Nunca assumir que campo, Flow, RecordType, layout, Permission Set ou Named Credential existe sem validar.

Detalhes: `docs/agent-reference/SALESFORCE_METADATA_GUIDE.md`.

---

## Construção declarativa

Ao criar/alterar metadados:

- Objetos e campos devem ter `Description`.
- Campos novos devem considerar FLS, layout, Dynamic Forms, relatório, integração e tradução.
- Perguntar se contexto é multilíngue quando criar labels, picklists, mensagens ou textos traduzíveis.
- Não usar campo tipo Time; preferir Text quando necessário.
- Preferir Permission Sets a Profiles específicos.
- Lightning Pages: preferir Field Section em vez de Record Detail.
- Highlights Panel deve usar Dynamic Actions.
- Template padrão de Lightning Page: Header and Right Sidebar.
- Validation Rules precisam de descrição, mensagem clara e escopo restrito.

Detalhes: `docs/agent-reference/SALESFORCE_BUILD_GUIDELINES.md`.

---

## Comentários obrigatórios

Classes Apex novas/alteradas de forma relevante devem ter cabeçalho:

```apex
/**
 * @description       : Responsabilidade principal da classe.
 * @author            : Triscal
 * @group             : Domínio ou módulo, quando aplicável.
 * @last modified on  : MM-DD-YYYY
 * @last modified by  : Responsável pela alteração
 **/
```

Métodos públicos, globais, invocable, aura-enabled, batch, schedulable, queueable, service, integração ou regra relevante devem ter `@description`, `@param` e `@return` quando aplicável.

Comentários devem explicar o porquê, não o óbvio. Código comentado temporário deve ter motivo e referência de chamado.

Detalhes: `docs/agent-reference/SALESFORCE_COMMENTS_TESTS_GUIDE.md`.

---

## Segurança e DevOps

Sempre considerar:

- CRUD/FLS.
- Sharing.
- Permission Sets.
- Custom Permissions.
- Apex Class Access.
- Flow Access.
- RecordType access.
- Dados sensíveis/LGPD.
- Logs sem dados confidenciais.
- Flosum, branch, snapshot, predeploy fix, overwrite protection, peer review, pipeline, deploy e backpromotion quando aplicável.

Detalhes: `docs/agent-reference/SALESFORCE_SECURITY_DEVOPS_GUIDE.md`.

---

## Resposta final

Use formato objetivo:

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

## Encoding UTF-8 obrigatório para metadados Salesforce

O agente deve preservar UTF-8 em todos os arquivos criados ou alterados.

Problema que deve ser evitado:

```text
Correto: Categorização
Quebrado: CategorizaÃ§Ã£o
```

Regras obrigatórias:

- Todo arquivo Salesforce, XML, Apex, LWC, JSON, YAML, Markdown e configuração deve ser lido/escrito como UTF-8.
- Todo XML Salesforce deve manter `<?xml version="1.0" encoding="UTF-8"?>`.
- Nunca salvar metadata em ANSI, Latin-1, ISO-8859-1 ou Windows-1252.
- Nunca remover acentos como solução.
- Nunca aceitar labels, plural labels, descriptions, help texts, messages ou picklist values com mojibake.
- Antes de deploy, executar checagem de caracteres quebrados.
- Após deploy crítico, recuperar metadata da org e comparar se os acentos foram preservados.

Validar principalmente:

```text
CustomObject.label
CustomObject.pluralLabel
CustomObject.description
CustomObject.nameField.label
CustomField.label
CustomField.description
CustomField.inlineHelpText
ValidationRule.errorMessage
ValidationRule.description
Flow labels/descriptions/textTemplates
CustomLabel.value
FlexiPage labels/descriptions
Layout section labels
CustomMetadata text fields
```

Padrões proibidos:

```text
Ã
Â
�
â€™
â€œ
â€
â€“
â€”
Ã§
Ã£
Ã¡
Ã©
Ãª
Ã³
Ãº
```

Exemplo correto:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">
    <label>Categorização</label>
    <pluralLabel>Categorizações</pluralLabel>
    <description>Categorização - objeto criado para operação Service Cloud Wilson Sons.</description>
</CustomObject>
```

Exemplo proibido:

```xml
<label>CategorizaÃ§Ã£o</label>
<pluralLabel>CategorizaÃ§Ãµes</pluralLabel>
<description>CategorizaÃ§Ã£o - objeto criado para operaÃ§Ã£o Service Cloud Wilson Sons.</description>
```

Quando usar scripts:

Python:

```python
Path(path).read_text(encoding="utf-8")
Path(path).write_text(content, encoding="utf-8")
```

Node/TypeScript:

```ts
await fs.promises.readFile(path, "utf8");
await fs.promises.writeFile(path, content, { encoding: "utf8" });
```

Antes de deploy:

```bash
grep -RInE "Ã|Â|�|â€™|â€œ|â€|Ã§|Ã£|Ã¡|Ã©|Ãª|Ã³|Ãº" force-app manifest docs .agents AGENTS.md AI_HANDLERS.md 2>/dev/null
```

Se encontrar ocorrência, corrigir antes de deploy.