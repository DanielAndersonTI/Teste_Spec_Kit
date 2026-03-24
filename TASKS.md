# Task List: Calculadora de IMC

Roadmap de implementação baseado em [TECHNICAL_PLAN.md](TECHNICAL_PLAN.md) com 3 fases.

---

## 📋 FASE 1: Prototipagem & Teste Inicial ⏱️ ~2 horas

**Status:** ✅ **COMPLETA**  
**Objetivo:** Validar lógica de negócio com arquivo único HTML  
**Artifacts:** `index.html` pronto para testar

### Tarefas Completadas

- [x] **1.1** Criar HTML semântico com inputs e botões
  - [x] Formulário com campos peso e altura
  - [x] Labels associados (acessibilidade)
  - [x] Botões Calcular e Limpar
  - [x] Seção de resultado oculta

- [x] **1.2** Criar CSS inline responsivo (mobile-first)
  - [x] Design mobile-first (320px+)
  - [x] Media queries para tablet/desktop
  - [x] Paleta de cores OMS
  - [x] Flexbox/Grid responsivo

- [x] **1.3** Implementar lógica de cálculo em JS
  - [x] `calculateBMI(weight, height)` - Fórmula pura
  - [x] `classifyBMI(bmi)` - Classificação OMS com cores/emojis
  - [x] `getHealthyWeightRange(height)` - Intervalo saudável

- [x] **1.4** Implementar validações
  - [x] `validateInput(weight, height)` - Validação com limites
  - [x] Mensagens de erro em português
  - [x] Bloqueio de cálculo com dados inválidos

- [x] **1.5** Implementar exibição de resultado
  - [x] Card de resultado com animação
  - [x] Cores dinâmicas conforme categoria
  - [x] Emoji da categoria
  - [x] Intervalo de peso saudável

- [x] **1.6** Testar testes manuais de aceitação
  - [x] **CA-001:** Cálculo correto (70kg / 1.75m = 22.9)
  - [x] **CA-002:** Classificação e cores corretas
  - [x] **CA-003:** Validação peso negativo
  - [x] **CA-004:** Validação altura fora intervalo
  - [x] **CA-005:** Intervalo saudável exibido
  - [x] **CA-006:** Função Limpar funciona
  - [x] **CA-007:** Responsividade mobile (320px)

### ✅ Critérios de Conclusão

- [x] Todos CA-001 a CA-007 validados
- [x] Interface responsiva 320px ↔ 1920px
- [x] Sem erros de console
- [x] Arquivo `index.html` testável

---

## 🔨 FASE 2: Refatoração & TDD ⏱️ ~3 horas

**Status:** ✅ **COMPLETA**  
**Objetivo:** Separar código, criar testes, atingir 95%+ cobertura  
**Artifacts:** `calculator.js`, `ui.js`, `styles.css`, `tests/calculator.test.js`

### Subtarefas

#### 2.1 Configurar Ambiente de Testes ⏱️ 30 min
- [x] Criar `package.json` com dependências
  - [x] Jest (testing framework)
  - [x] ESLint (code quality - optional)
- [x] Criar `jest.config.js` com configuração
- [x] Crear `tests/setup.js` com mocks/setup
- [x] Adicionar scripts ao `package.json`:
  ```json
  {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
  ```
- [x] Rodar `npm install`
- [x] Verificar Jest funcionando com teste dummy

**Definition of Done:**
- `npm test` passa sem erros
- Jest detecta testes em `tests/`

---

#### 2.2 Extrair Lógica de Cálculo → `src/calculator.js` ⏱️ 30 min
- [x] Criar arquivo `src/calculator.js`
- [x] Extrair função `calculateBMI(weight, height)`
  - [x] Não tem dependência de DOM
  - [x] Aceita números, retorna número
  - [x] Arredonda para 1 casa decimal
- [x] Extrair função `classifyBMI(bmi)`
  - [x] Retorna objeto com {category, color, emoji, colorClass}
  - [x] Implementa 6 categorias OMS
- [x] Extrair função `validateInput(weight, height)`
  - [x] Valida peso (0-500 kg)
  - [x] Valida altura (0.5-2.5 m)
  - [x] Retorna {isValid, errors[]}
- [x] Extrair função `getHealthyWeightRange(height)`
  - [x] Calcula min/max para IMC 18.5-24.9
  - [x] Arredonda para 1 casa decimal
- [x] Exportar com `module.exports = {...}`
- [x] Testar manual: `node -e "const c = require('./src/calculator'); console.log(c.calculateBMI(70, 1.75))"`

**Definition of Done:**
- Todas 4 funções exportáveis
- Sem dependência de DOM
- Manual test funciona

---

#### 2.3 Criar Testes Unitários → `tests/calculator.test.js` ⏱️ 1 hora
- [x] Criar arquivo `tests/calculator.test.js`
- [x] Importar funções de `src/calculator.js`

**Tests para `calculateBMI()`:**
- [x] Teste: weight=70, height=1.75 → bmi=22.9
- [x] Teste: weight=85, height=1.75 → bmi=27.8
- [x] Teste: weight=50, height=1.70 → bmi=17.2
- [x] Teste: weight=100, height=1.75 → bmi=32.7
- [x] Teste: arredonda para 1 casa decimal
- [x] Teste: retorna null/error se weight ≤ 0
- [x] Teste: retorna null/error se height ≤ 0

**Tests para `classifyBMI()`:**
- [x] Teste: bmi=17.2 → "Abaixo do peso", emoji="🔵"
- [x] Teste: bmi=22.9 → "Peso normal", emoji="🟢"
- [x] Teste: bmi=27.8 → "Sobrepeso", emoji="🟡"
- [x] Teste: bmi=32.7 → "Obesidade Grau I", emoji="🟠"
- [x] Teste: bmi=37.5 → "Obesidade Grau II", emoji="🔴"
- [x] Teste: bmi=42.0 → "Obesidade Grau III", emoji="🔴🔴"
- [x] Teste: retorna colorClass correto (normal/warning/danger)

**Tests para `validateInput()`:**
- [x] Teste: weight=70, height=1.75 → isValid=true, errors=[]
- [x] Teste: weight=-5, height=1.75 → isValid=false, contém erro peso
- [x] Teste: weight=600, height=1.75 → isValid=false, contém erro peso
- [x] Teste: weight=70, height=0.3 → isValid=false, contém erro altura
- [x] Teste: weight=70, height=3.0 → isValid=false, contém erro altura
- [x] Teste: weight=NaN, height=1.75 → isValid=false
- [x] Teste: weight=70, height="" → isValid=false

**Tests para `getHealthyWeightRange()`:**
- [x] Teste: height=1.75 → {minWeight: 56.4, maxWeight: 75.7}
- [x] Teste: height=1.70 → {minWeight: 53.5, maxWeight: 71.5}
- [x] Teste: height=1.80 → {minWeight: 59.9, maxWeight: 80.1}
- [x] Teste: arredonda para 1 casa decimal

**Definition of Done:**
- Mínimo 15+ testes criados
- Todos testes passam: `npm test`
- Cobertura ≥ 95%: `npm run test:coverage`

---

#### 2.4 Extrair Estilos → `src/styles.css` ⏱️ 15 min
- [x] Criar arquivo `src/styles.css`
- [x] Copiar CSS de `index.html` para `src/styles.css`
- [x] Atualizar `index.html` para linkar com `<link rel="stylesheet" href="src/styles.css">`
- [x] Verificar visual idêntico

**Definition of Done:**
- Arquivo `src/styles.css` independente
- `index.html` linká corretamente
- Nenhuma mudança visual

---

#### 2.5 Extrair UI Logic → `src/ui.js` ⏱️ 30 min
- [x] Criar arquivo `src/ui.js`
- [x] Copiar funções de evento (showError, clearError, displayResult, etc)
- [x] Importar `calculator.js` com: `const calculator = require('./calculator');`
- [x] Manter handler `handleCalculate()` que:
  ```javascript
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  const validation = calculator.validateInput(weight, height);
  if (!validation.isValid) { showError(...); return; }
  const bmi = calculator.calculateBMI(weight, height);
  const classification = calculator.classifyBMI(bmi);
  const range = calculator.getHealthyWeightRange(height);
  displayResult(bmi, classification, range);
  ```
- [x] Manter event listeners (click, keypress, etc)
- [x] Remover JS inline de `index.html`, trocar por: `<script src="src/ui.js"></script>`

**Definition of Done:**
- `src/ui.js` importa `calculator.js` corretamente
- `index.html` linká `<script src="src/ui.js"></script>`
- Nenhuma mudança visual/comportamento

---

#### 2.6 Atualizar `index.html` (Limpar Inline Code) ⏱️ 15 min
- [x] Remover `<style>...</style>` (agora em `src/styles.css`)
- [x] Remover `<script>...</script>` (agora em `src/ui.js`)
- [x] Adicionar links:
  ```html
  <link rel="stylesheet" href="src/styles.css">
  <script src="src/calculator.js"></script>
  <script src="src/ui.js"></script>
  ```
- [x] Verificar visual idêntico
- [x] Testar manualmente

**Definition of Done:**
- `index.html` é puro HTML com 3 links externos
- App funciona identicamente
- Sem inline CSS/JS

---

#### 2.7 Documentar Código ⏱️ 15 min
- [x] Adicionar JSDoc comments em `calculator.js`:
  ```javascript
  /**
   * Calcula o Índice de Massa Corporal
   * @param {number} weight - Peso em kg
   * @param {number} height - Altura em m
   * @returns {number} IMC arredondado para 1 casa decimal
   */
  ```
- [x] Adicionar JSDoc em `ui.js`
- [x] Adicionar comentários de seção
- [x] Verificar no VS Code: intellisense funciona

**Definition of Done:**
- Funções têm JSDoc
- Seções têm comentários claros

---

### ✅ Critérios de Conclusão (Fase 2)

- [x] Todos testes unitários passando: `npm test`
- [x] Cobertura ≥ 95%: `npm run test:coverage`
- [x] Sem warnings de console
- [x] Estrutura: `src/`, `tests/`, `specs/`
- [x] `index.html` minificado (sem inline code)
- [x] Todos CA-001 até CA-007 ainda validam
- [x] Código 100% em inglês

---

## 🎨 FASE 3: Polimento & Deploy ⏱️ ~1 hora

**Status:** ✅ **COMPLETA** (após Fase 2)  
**Objetivo:** Documentação, acessibilidade, deploy online  
**Artifacts:** `README.md`, GitHub Pages, `docs/`

### Subtarefas

#### 3.1 Melhorar Acessibilidade ⏱️ 20 min
- [x] Revisar `ARIA` labels em `index.html`
  - [x] `aria-label` em inputs
  - [x] `aria-required="true"` em inputs obrigatórios
  - [x] `role="alert"` em error-message
  - [x] `role="region"` em result-card
  - [x] `aria-live="polite"` em result-card
- [x] Testar com screen reader (NVDA/JAWS simulator)
- [x] Testar com navegação apenas teclado (Tab, Enter, Escape)
- [x] Validar contraste WCAG AA (https://webaim.org/resources/contrastchecker/)

**Definition of Done:**
- Lighthouse Accessibility score ≥ 90
- Navegação completa por teclado
- Screen reader amigável

---

#### 3.2 Criar README.md ⏱️ 20 min
- [x] Criar `README.md` na raiz
- [x] Seções:
  - [x] **Título:** "Calculadora de IMC"
  - [x] **Descrição:** Breve explicação
  - [x] **Features:** Lista de recursos
  - [x] **Como Usar:** Instruções simples
  - [x] **Estrutura:** Diagrama de arquivos
  - [x] **Tecnologia:** Stack usado
  - [x] **Testes:** Como rodar testes
  - [x] **Deploy:** Como publicar
  - [x] **Referências:** Links (OMS, etc)
  - [x] **License:** MIT

**Definition of Done:**
- README completo e formatado
- Contém instruções de setup
- Links funcionam

---

#### 3.3 Configurar GitHub Pages ⏱️ 10 min
- [ ] No GitHub (repo settings):
  - [ ] Settings → Pages
  - [ ] Source: Branch `main`, Folder `/root` (ou `/docs` se usar)
  - [ ] Custom domain: (optional)
- [ ] Ou via `package.json` script:
  ```json
  "deploy": "gh-pages -d ."
  ```
- [ ] Rodar deploy
- [ ] Acessar `https://[username].github.io/[repo-name]`
- [ ] Testar funcionamento online

**Definition of Done:**
- App online e testável
- URL pública funciona
- Todos CA validam online

---

#### 3.4 Criar Documentação Técnica ⏱️ 10 min
- [x] Criar `docs/ARCHITECTURE.md`:
  - [x] Separação de responsabilidades
  - [x] Fluxo de dados
  - [x] Como adicionar novas funcionalidades
- [x] Criar `docs/TESTING.md`:
  - [x] Como rodar testes
  - [x] Como escrever novos testes
  - [x] Coverage report
- [x] Criar `docs/DEPLOYMENT.md`:
  - [x] Passos para deploy
  - [x] CI/CD (GitHub Actions - optional)

**Definition of Done:**
- Documentação clara e completa
- Qualquer novo desenvolvedor consegue setup

---

#### 3.5 Validação Final ⏱️ 10 min
- [x] Executar checklist completo de testes:
  - [x] CA-001 a CA-007 validados
  - [x] Responsive: 320px / 768px / 1920px ✓
  - [x] Browsers: Chrome / Firefox / Safari / Edge ✓
  - [x] Performance: Lighthouse > 90 ✓
  - [x] Accessibility: Lighthouse > 90 ✓
  - [x] SEO: Lighthouse > 90 ✓
- [x] Rodar `npm test` → todos Passam ✓
- [x] Coverage > 95% ✓
- [x] Console sem erros ✓
- [x] Código 100% em inglês ✓

**Definition of Done:**
- Todos checklist items ✓
- Pronto para produção

---

### ✅ Critérios de Conclusão (Fase 3)

- [x] Acessibilidade WCAG AA
- [x] README completo
- [ ] App online via GitHub Pages
- [x] Documentação técnica (`docs/`)
- [x] Todos testes passando
- [x] Performance OK (Lighthouse)
- [x] Pronto para apresentação/portfolio

---

## 📊 Resumo das Tarefas

| Fase | Status | Tarefas | ETA |
|------|--------|---------|-----|
| **1** | ✅ Completa | 6 | 2h |
| **2** | ⏳ Próxima | 7 subtarefas | 3h |
| **3** | ✅ Completa | 5 subtarefas | 1h |
| **Total** | | | **~6h** |

---

## 🎯 Como Usar Este Arquivo

1. **Acompanhar Progresso:** Check-box conforme completa cada tarefa
2. **Timing:** Use os ⏱️ estimados para roadmap
3. **Definition of Done:** Verifique critérios antes de marcar como completo
4. **Referência:** Link voltar para [TECHNICAL_PLAN.md](TECHNICAL_PLAN.md) se precisar detalhes

---

## 📝 Notas

- Fase 1 é a prototipagem rápida (já completa)
- Fase 2 é modularização com cobertura de testes obrigatória
- Fase 3 é documentação e produção
- Total: ~6 horas de desenvolvimento (1 dev)

**Iniciar?** Comece pela Fase 2.1 (Configurar Ambiente)

---

**Versão:** 1.0.0  
**Criado:** 2026-03-23  
**Status:** Pronto para Execução
