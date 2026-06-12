# AGENTS.md — Triscal Salesforce Project Instructions

> Arquivo curto de instruções do repositório.
> Objetivo: reduzir consumo de tokens, evitar alucinações e direcionar o Codex para os arquivos certos.

## Regra principal

Antes de qualquer análise, implementação, refatoração, documentação ou code review:

1. Consulte `docs/PROJECT_INDEX.md`.
2. Consulte `AI_HANDLERS.md`.
3. Use a Skill local `agents/skills/triscal-salesforce/SKILL.md` quando a tarefa envolver Salesforce.
4. Quando a tarefa envolver um domínio coberto por `agents/skills/sf-skills/`, selecione e leia integralmente o `SKILL.md` específico antes de agir.
5. Abra somente os arquivos relevantes para a demanda.
6. Carregue arquivos de `docs/agent-reference/`, `references/`, `assets/`, `scripts/` ou `samples/` apenas quando o tema exigir detalhe.

Não leia o projeto inteiro sem necessidade.

---

## Estrutura esperada

```text
meu-projeto-salesforce/
├─ AGENTS.md
├─ AI_HANDLERS.md
├─ docs/
│  ├─ PROJECT_INDEX.md
│  └─ agent-reference/
│     ├─ SALESFORCE_BUILD_GUIDELINES.md
│     ├─ SALESFORCE_FLOW_GUIDE.md
│     ├─ SALESFORCE_METADATA_GUIDE.md
│     ├─ SALESFORCE_COMMENTS_TESTS_GUIDE.md
│     └─ SALESFORCE_SECURITY_DEVOPS_GUIDE.md
├─ agents/
│  └─ skills/
│     ├─ triscal-salesforce/
│     │  └─ SKILL.md
│     └─ sf-skills/
│        ├─ README.md
│        ├─ skills/
│        │  └─ <skill-salesforce>/
│        │     ├─ SKILL.md
│        │     ├─ references/
│        │     ├─ assets/
│        │     └─ scripts/
│        └─ samples/
├─ force-app/
├─ manifest/
└─ sfdx-project.json
```

---

## Uso obrigatório de `agents/skills/sf-skills`

`agents/skills/sf-skills` é uma biblioteca de workflows Salesforce especializados.
Ela complementa, mas não substitui, a Skill Triscal.

Fluxo de decisão:

```text
1. Aplicar sempre `agents/skills/triscal-salesforce/SKILL.md` para padrões Triscal.
2. Identificar o domínio técnico pelo pedido, pelos arquivos alterados e pelo PROJECT_INDEX.md.
3. Selecionar uma ou mais skills específicas em `agents/skills/sf-skills/skills/<nome>/SKILL.md`.
4. Ler integralmente cada `SKILL.md` selecionado.
5. Carregar `references/`, `assets/`, `scripts/`, `docs/`, `examples/` ou `implementation/` da skill apenas se necessário.
6. Reutilizar scripts e templates da skill quando reduzirem risco ou padronizarem a entrega.
7. Se houver conflito, priorizar: regras deste `AGENTS.md` > `AI_HANDLERS.md` > Skill Triscal > skill específica `sf-skills`.
```

Não execute scripts de `sf-skills` sem entender pré-requisitos, impacto na org, alias Salesforce, dependências externas e se alteram arquivos, dados ou metadados.

### Roteamento inteligente de skills

Use a matriz abaixo para escolher a skill específica. Se a demanda cruzar domínios, combine skills na ordem de dependência natural: metadado/base > lógica > UI > permissão > teste > análise/deploy.

| Demanda | Skill `sf-skills` |
|---|---|
| Apex, Trigger, Batch, Queueable, Schedulable, Service, Selector | `generating-apex` |
| Teste Apex, cobertura, mocks, TestDataFactory | `generating-apex-test`, `running-apex-tests` |
| Debug log, limite de governor, stack trace Salesforce | `debugging-apex-logs` |
| SOQL/SOSL, query plan, relacionamento, agregação | `querying-soql` |
| Operação de dados, import/export, massa, cleanup, anonymous Apex | `handling-sf-data` |
| Object, Field, Tab, List View, Validation Rule, Custom Application | `generating-custom-object`, `generating-custom-field`, `generating-custom-tab`, `generating-list-view`, `generating-validation-rule`, `generating-custom-application` |
| Permission Set, FLS, object permissions, app permissions | `generating-permission-set` |
| Flow Screen/Autolaunched/Record-Triggered/Scheduled | `generating-flow` |
| Lightning App completa | `generating-lightning-app` |
| FlexiPage / Lightning Page | `generating-flexipage` |
| LWC, wire, Jest, componente Lightning | `generating-lwc-components` |
| SLDS, blueprints, styling hooks, icons | `applying-slds`, `validating-slds`, `uplifting-components-to-slds2` |
| Mobile offline LWC / Komaci | `reviewing-lwc-mobile-offline` |
| Mobile SDK, app iOS/Android Salesforce | `building-mobile-apps` |
| Recursos nativos mobile em LWC | `using-mobile-native-capabilities` |
| Integração, Named Credential, External Credential, REST/SOAP, CDC, Platform Event | `building-sf-integrations` |
| Connected App, External Client App, OAuth, JWT | `configuring-connected-apps` |
| Deploy metadata, scratch org, sandbox, CI/CD, erro de deploy | `deploying-metadata` |
| Salesforce Code Analyzer, PMD, ESLint, CPD, SFGE, static analysis | `running-code-analyzer` |
| Trocar org/default alias Salesforce CLI | `switching-org` |
| Documentação oficial Salesforce | `fetching-salesforce-docs` |
| Diagramas Mermaid | `generating-mermaid-diagrams` |
| Diagramas visuais/renderizados | `generating-visual-diagrams` |
| Agentforce desenvolvimento, `.agent`, aiAuthoringBundle | `developing-agentforce` |
| Agentforce testes | `testing-agentforce` |
| Agentforce produção, sessão, STDM, telemetria | `observing-agentforce`, `investigating-agentforce-d360` |
| Arquitetura/inventário de Agentforce | `investigating-agentforce-architecture` |
| Custom Lightning Type para Agentforce | `generating-custom-lightning-type` |
| UI Bundle app nova React/SPAs | `building-ui-bundle-app` |
| UI Bundle frontend existente | `building-ui-bundle-frontend` |
| UI Bundle metadata, features, site, custom app, deploy, data, file upload, Agentforce client | `generating-ui-bundle-metadata`, `generating-ui-bundle-features`, `generating-ui-bundle-site`, `generating-ui-bundle-custom-app`, `deploying-ui-bundle`, `using-ui-bundle-salesforce-data`, `implementing-ui-bundle-file-upload`, `implementing-ui-bundle-agentforce-conversation-client` |
| OmniStudio OmniScript, FlexCard, Integration Procedure, Data Mapper, Callable Apex | `building-omnistudio-omniscript`, `building-omnistudio-flexcard`, `building-omnistudio-integration-procedure`, `building-omnistudio-datamapper`, `building-omnistudio-callable-apex` |
| OmniStudio dependências ou DataPacks | `analyzing-omnistudio-dependencies`, `deploying-omnistudio-datapacks` |
| EPC/CME catálogo, Product2, ofertas, atributos | `modeling-omnistudio-epc-catalog` |
| B2B Commerce store ou componentes open source | `creating-b2b-commerce-store`, `integrating-b2b-commerce-open-code-components` |
| Data Cloud ponta a ponta | `orchestrating-datacloud` |
| Data Cloud conexão, preparo, harmonização, schema, consulta, segmentação, ativação | `connecting-datacloud`, `preparing-datacloud`, `harmonizing-datacloud`, `getting-datacloud-schema`, `retrieving-datacloud`, `segmenting-datacloud`, `activating-datacloud` |
| Data Cloud Code Extension | `developing-datacloud-code-extension` |
| CMS brand ou mídia existente | `applying-cms-brand`, `searching-media` |
| Managed Event Subscription | `managing-managed-event-subscription` |

### Uso de exemplos, scripts e assets

- `samples/` serve como referência de arquitetura e padrão, não como fonte para copiar cegamente.
- Antes de usar um sample, leia o `README.md` do sample e somente os arquivos equivalentes ao problema.
- `assets/` pode conter templates de Apex, XML, JSON, YAML ou configuração. Adapte nomes, namespaces, permissões e labels ao projeto.
- `scripts/` deve ser preferido quando a skill indicar validação, diagnóstico, geração ou deploy padronizado.
- Não alterar arquivos dentro de `agents/skills/sf-skills/` salvo quando a tarefa for manter a própria biblioteca de skills.
- Para novos projetos Salesforce, iniciar pelo padrão Triscal e usar `sf-skills` como catálogo de capacidades por domínio.

---

## Uso obrigatório do PROJECT_INDEX.md

`docs/PROJECT_INDEX.md` é o mapa leve do projeto.

Ele deve conter apenas referências estruturais, sem copiar código inteiro:

- Estrutura de pastas.
- Controllers / FlowActions.
- Services / ServiceAgents.
- DTOs / Helpers / Selectors / Repositories.
- LWCs / Visualforce.
- Flows / Triggers / Invocable Apex.
- Objetos, campos e RecordTypes relevantes.
- Layouts, FlexiPages e Permission Sets relevantes.
- Custom Metadata, Named Credentials e integrações.
- Classes de teste.
- Fluxos técnicos principais.

Se o índice não existir ou estiver desatualizado, atualize-o de forma objetiva antes de aprofundar a análise.

---

## Princípios obrigatórios

- Ser pontual, conclusivo e técnico.
- Não inventar informações não encontradas no repositório ou na org.
- Não implementar antes de ler os arquivos relevantes.
- Implementar a menor solução segura.
- Preferir configuração nativa antes de Flow, Apex ou LWC.
- Preferir Flow antes de Apex quando for sustentável.
- Usar Apex quando houver complexidade, volume, integração, transação ou necessidade de controle fino.
- Usar LWC apenas quando componentes padrão, App Builder, Dynamic Forms ou Screen Flow não atenderem.
- Preservar arquitetura existente.
- Evitar overengineering.
- Evitar alterações fora do escopo.

---

## Arquitetura Triscal Salesforce

Padrão principal:

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

- Controller e FlowAction devem ser finos.
- Service concentra regra de negócio.
- ServiceAgent concentra integração externa.
- Trigger deve conter apenas roteamento.
- DTO representa payload estruturado.
- Não fazer SOQL/DML em loop.
- Não fazer Get/DML dentro de Loop em Flow.
- Não usar IDs hardcoded.
- Não expor segredo, token, senha, API key ou stack trace.

---

## Referências sob demanda

Use estes arquivos somente quando a tarefa exigir detalhe:

| Tema | Arquivo |
|---|---|
| Objetos, campos, layouts, validações, LWC e ordem de solução | `docs/agent-reference/SALESFORCE_BUILD_GUIDELINES.md` |
| Flow, bulk safety, idempotência e fault paths | `docs/agent-reference/SALESFORCE_FLOW_GUIDE.md` |
| Dados, metadados, Describe, Tooling API, Metadata API, UI API | `docs/agent-reference/SALESFORCE_METADATA_GUIDE.md` |
| Comentários, JSDoc Apex/LWC e testes | `docs/agent-reference/SALESFORCE_COMMENTS_TESTS_GUIDE.md` |
| Segurança, permissões, Flosum e DevOps | `docs/agent-reference/SALESFORCE_SECURITY_DEVOPS_GUIDE.md` |

---

## Formato de resposta esperado

Para análise ou implementação:

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

## Regra final

Antes de entregar, valide:

```text
Li os arquivos certos?
Consultei o PROJECT_INDEX.md?
Usei a Skill local quando aplicável?
Apliquei os AI Handlers?
A solução é a menor segura?
Respeitei Controller/FlowAction > Service > ServiceAgent?
Considerei segurança, testes e risco?
```

## Encoding UTF-8 obrigatório

Antes de qualquer deploy, retrieve, geração ou alteração de metadados Salesforce, o agente deve garantir que os arquivos estejam em UTF-8.

Regras:

- Preservar `encoding="UTF-8"` nos XML Salesforce.
- Não salvar arquivos como ANSI, Latin-1, ISO-8859-1 ou Windows-1252.
- Não aceitar labels/descriptions quebrados como `CategorizaÃ§Ã£o`.
- Não remover acentos como solução.
- Validar objetos, campos, labels, descriptions, validation messages, flows, custom labels e help texts.
- Executar checagem de mojibake antes de deploy.
- Em caso de caracteres quebrados, corrigir o source antes de publicar na org.

O agente deve carregar `docs/agent-reference/SALESFORCE_UTF8_METADATA_GUIDE.md` sempre que a tarefa envolver:

```text
Objeto
Campo
Label
Description
Help Text
Validation Message
Flow text/label
Custom Label
FlexiPage
Layout
Custom Metadata com texto
Deploy para org destino
```

Checklist mínimo antes do deploy:

```text
XML mantém UTF-8?
Labels e descriptions estão legíveis?
Não há caracteres Ã, Â, � ou â€?
O diff do Git não mostra mojibake?
O deploy foi validado/dry-run quando aplicável?
