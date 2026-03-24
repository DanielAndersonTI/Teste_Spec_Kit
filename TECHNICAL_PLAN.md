# Plano Técnico: Calculadora de IMC

## 1. Visão Geral do Plano

Este documento descreve a abordagem técnica para implementar a Calculadora de IMC em Vanilla JavaScript, seguindo a Constituição do Projeto e a Especificação (BMI_CALCULATOR.md).

**Objetivo:** Entrega iterativa, com validação TDD e testes de aceitação.

---

## 2. Fases de Desenvolvimento

### Fase 1: Prototipagem & Teste Inicial ⏱️ (1-2 horas)

**Objetivo:** Validar a lógica de negócio com arquivo único HTML.

**Artifacts:**
- `index.html` - Single File App com CSS e JS incorporados
- Testes manuais de aceitação

**Tarefas:**
1. ✅ Criar HTML semântico com inputs e botões
2. ✅ Criar CSS inline responsivo (mobile-first)
3. ✅ Implementar lógica de cálculo em JS inline
4. ✅ Implementar validações
5. ✅ Implementar exibição de resultado com cores
6. ✅ Testar manualmente todos os casos de aceitação

**Critérios de Conclusão:**
- Todos os CA-001 até CA-007 validados manualmente
- Interface responsiva em 320px e 1920px
- Nenhum erro de console

---

### Fase 2: Refatoração & TDD ⏱️ (2-3 horas)

**Objetivo:** Separar código para testeabilidade e criar suite de testes.

**Artifacts:**
- `calculator.js` - Lógica de cálculo puro (testável)
- `ui.js` - Interação com DOM
- `styles.css` - Estilos separados
- `tests/calculator.test.js` - Suite de testes

**Tarefas:**
1. Extrair lógica de cálculo para `calculator.js`
2. Extrair DOM manipulation para `ui.js`
3. Escrever testes unitários (TDD Red-Green-Refactor)
4. Configurar Jest ou Vitest
5. Refatorar para 100% test coverage na lógica

**Critérios de Conclusão:**
- Todos os testes passando
- Cobertura > 95% da lógica de cálculo
- Sem warnings de console

---

### Fase 3: Polimento & Deploy ⏱️ (1 hora)

**Objetivo:** Documentação, acessibilidade e deploy.

**Artifacts:**
- `README.md` - Guia de uso
- `.github/pages` - Publicação via GitHub Pages
- `docs/` - Documentação técnica

**Tarefas:**
1. Adicionar ARIA labels e atributos de acessibilidade
2. Criar README.md com instruções
3. Configurar GitHub Actions (optional)
4. Deploy em GitHub Pages

**Critérios de Conclusão:**
- Cobertura de acessibilidade validada
- README completo
- App funcionando online

---

## 3. Estrutura de Arquivos (Final)

```
projeto-bmi-calculator/
├── index.html              # Single file app (Fase 1 - prototipagem)
├── README.md               # Documentação
├── src/
│   ├── calculator.js       # Lógica de cálculo (Fase 2)
│   ├── ui.js               # Interação com DOM (Fase 2)
│   └── styles.css          # Estilos (Fase 2)
├── tests/
│   ├── calculator.test.js  # Testes unitários
│   └── setup.js            # Configuração Jest
├── specs/
│   └── BMI_CALCULATOR.md   # Especificação completa
├── .specify/
│   └── memory/
│       └── constitution.md # Constituição do projeto
├── package.json            # Dependências (Fase 2)
└── jest.config.js          # Configuração Jest (Fase 2)
```

---

## 4. Stack Técnico

### Fase 1 (Prototipagem)
- **HTML5:** Semântico, sem frameworks
- **CSS3:** Flexbox, Grid, Custom Properties, Media Queries
- **JavaScript:** Vanilla ES6+ (classes, arrow functions, template literals)
- **Browser:** Moderno (Chrome, Firefox, Safari, Edge)
- **Sem dependências:** Tudo inline no HTML

### Fase 2 (Modularização)
- **Build Tool:** Nenhum (arquivos separados, carregamento direto)
- **Testing:** Jest ou Vitest
- **Linter:** ESLint (optional)

### Fase 3 (Deploy)
- **Hosting:** GitHub Pages (grátis)
- **CI/CD:** GitHub Actions (optional)

---

## 5. Especificação Técnica: Lógica de Cálculo

### Função `calculateBMI(weight, height)`
```javascript
/**
 * Calcula o Índice de Massa Corporal
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em m
 * @returns {number} IMC arredondado para 1 casa decimal
 */
function calculateBMI(weight, height) {
  return Math.round((weight / (height * height)) * 10) / 10;
}
```

### Função `classifyBMI(bmi)`
```javascript
/**
 * Classifica o IMC conforme tabela OMS
 * @param {number} bmi - IMC calculado
 * @returns {object} { category, colorHex, emoji, min, max }
 */
function classifyBMI(bmi) {
  const classifications = [
    { range: [0, 18.5], category: "Abaixo do peso", color: "#2E7D8C", emoji: "🔵", min: 0, max: 18.4 },
    { range: [18.5, 25], category: "Peso normal", color: "#27AE60", emoji: "🟢", min: 18.5, max: 24.9 },
    { range: [25, 30], category: "Sobrepeso", color: "#F39C12", emoji: "🟡", min: 25, max: 29.9 },
    { range: [30, 35], category: "Obesidade Grau I", color: "#E67E22", emoji: "🟠", min: 30, max: 34.9 },
    { range: [35, 40], category: "Obesidade Grau II", color: "#E74C3C", emoji: "🔴", min: 35, max: 39.9 },
    { range: [40, Infinity], category: "Obesidade Grau III", color: "#C0392B", emoji: "🔴🔴", min: 40, max: Infinity }
  ];
  
  const found = classifications.find(c => bmi >= c.range[0] && bmi < c.range[1]);
  return found || classifications[classifications.length - 1];
}
```

### Função `validateInput(weight, height)`
```javascript
/**
 * Valida entrada do usuário
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em m
 * @returns {object} { isValid, errors: [] }
 */
function validateInput(weight, height) {
  const errors = [];
  
  if (isNaN(weight) || weight <= 0 || weight > 500) {
    errors.push("Peso deve estar entre 0 e 500 kg");
  }
  if (isNaN(height) || height <= 0.5 || height > 2.5) {
    errors.push("Altura deve estar entre 0.5 m e 2.5 m");
  }
  
  return { isValid: errors.length === 0, errors };
}
```

### Função `getHealthyWeightRange(height)`
```javascript
/**
 * Calcula intervalo de peso saudável (IMC 18.5-24.9)
 * @param {number} height - Altura em m
 * @returns {object} { minWeight, maxWeight }
 */
function getHealthyWeightRange(height) {
  const minWeight = Math.round(18.5 * height * height * 10) / 10;
  const maxWeight = Math.round(24.9 * height * height * 10) / 10;
  return { minWeight, maxWeight };
}
```

---

## 6. Fluxo de Interação (UI)

```
┌─────────────────────────────────┐
│   Página Carregada              │
│ - Inputs vazios                 │
│ - Resultado oculto              │
└────────────┬────────────────────┘
             │ Usuário clica "Calcular"
             ▼
┌─────────────────────────────────┐
│   Validar Entrada               │
│ - Peso: 0 < w ≤ 500             │
│ - Altura: 0.5 < h ≤ 2.5         │
└────────┬───────────────┬────────┘
         │ VÁLIDO        │ INVÁLIDO
         ▼               ▼
    ┌────────┐      ┌──────────┐
    │Calcular│      │Exibir    │
    │IMC     │      │Erro      │
    └────┬───┘      └──────────┘
         │
         ▼
    ┌────────────┐
    │Classificar │
    │(OMS)       │
    └────┬───────┘
         │
         ▼
    ┌────────────────────────────┐
    │ Calcular Intervalo         │
    │ Saudável (18.5-24.9)       │
    └────┬───────────────────────┘
         │
         ▼
    ┌────────────────────────────┐
    │ Exibir Resultado           │
    │ - IMC com cor              │
    │ - Classificação + emoji    │
    │ - Intervalo saudável       │
    └────────────────────────────┘
```

---

## 7. Casos de Teste Unitários (Fase 2)

### Suite: `calculator.test.js`

```javascript
// calculateBMI() Tests
test('calcula IMC corretamente para peso normal', () => {
  expect(calculateBMI(70, 1.75)).toBe(22.9);
});

test('calcula IMC para sobrepeso', () => {
  expect(calculateBMI(85, 1.75)).toBe(27.8);
});

test('arredonda para 1 casa decimal', () => {
  expect(calculateBMI(70, 1.73)).toBe(23.4);
});

// classifyBMI() Tests
test('classifica como Peso normal', () => {
  expect(classifyBMI(22.9).category).toBe("Peso normal");
  expect(classifyBMI(22.9).emoji).toBe("🟢");
});

test('classifica como Sobrepeso', () => {
  expect(classifyBMI(27.8).category).toBe("Sobrepeso");
  expect(classifyBMI(27.8).emoji).toBe("🟡");
});

// validateInput() Tests
test('válida peso correto', () => {
  const result = validateInput(70, 1.75);
  expect(result.isValid).toBe(true);
});

test('rejeita peso negativo', () => {
  const result = validateInput(-5, 1.75);
  expect(result.isValid).toBe(false);
  expect(result.errors).toContain("Peso deve estar entre 0 e 500 kg");
});

test('rejeita altura fora do intervalo', () => {
  const result = validateInput(70, 3.0);
  expect(result.isValid).toBe(false);
  expect(result.errors).toContain("Altura deve estar entre 0.5 m e 2.5 m");
});

// getHealthyWeightRange() Tests
test('calcula intervalo saudável corretamente', () => {
  const range = getHealthyWeightRange(1.75);
  expect(range.minWeight).toBe(56.4);
  expect(range.maxWeight).toBe(75.7);
});
```

---

## 8. Checklist de Validação (Fase 1)

### Testes de Aceitação Manual

- [ ] **CA-001:** Entrada 70kg / 1.75m → IMC 22.9 "Peso normal"
- [ ] **CA-002:** IMC 22.9 com cor verde, 27.8 com cor amarela
- [ ] **CA-003:** Peso -5kg → Erro: "Peso deve estar entre 0 e 500 kg"
- [ ] **CA-004:** Altura 0.3m → Erro: "Altura deve estar entre 0.5 m e 2.5 m"
- [ ] **CA-005:** Altura 1.75m → Intervalo 56.4-75.7 kg exibido
- [ ] **CA-006:** Botão Limpar apaga todos os campos
- [ ] **CA-007:** Interface funciona em viewport 320px sem scroll horizontal

### Testes de Design

- [ ] Layout centralizado com card
- [ ] Inputs lado a lado (desktop) / empilhados (mobile)
- [ ] Botões lado a lado (desktop) / empilhados (mobile)
- [ ] Fonte legível (16px base)
- [ ] Contraste adequado (WCAG AA)
- [ ] Sem scroll horizontal em qualquer resolução

### Testes de Código

- [ ] Todas as variáveis em inglês
- [ ] Código sem console errors
- [ ] Sem dependências externas
- [ ] HTML validado com W3C
- [ ] CSS validado

---

## 9. Dependências (Fase 2)

### `package.json`
```json
{
  "name": "bmi-calculator",
  "version": "1.0.0",
  "description": "Calculadora de IMC simples com Vanilla JS",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "serve": "python -m http.server 8000"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
```

---

## 10. Arquitetura da Solução

### Separação de Responsabilidades

```
┌─────────────────────────────────────┐
│         index.html                  │
│  (Markup semântico + ARIA labels)   │
└─────────────────────────────────────┘
             │
             ├─────────────────┬──────────────────┐
             ▼                 ▼                  ▼
      ┌──────────┐      ┌──────────┐      ┌─────────────┐
      │styles.css│      │ui.js     │      │calculator.js│
      │ (Estilos)│      │(DOM API) │      │ (Lógica)    │
      └──────────┘      └──────────┘      └─────────────┘
             │                 │                  │
             └─────────────────┴──────────────────┘
                     │
                     ▼
            ┌──────────────────────┐
            │ tests/calculator.   │
            │ test.js (Unit Tests) │
            └──────────────────────┘
```

**Princípios:**
- `calculator.js`: Puro, testável, sem dependência de DOM
- `ui.js`: Chama funções de `calculator.js`, atualiza DOM
- `styles.css`: Responsivo mobile-first
- Sem coupling entre componentes

---

## 11. Roadmap Temporal

```
Start                                                    End
|----|----|----|----|----|----|----|----|----|----|----|----|
Fase 1: Prototipagem (Single File)    ← 2h
     Fase 2: Refatoração & TDD           ← 2-3h
          Fase 3: Polimento & Deploy        ← 1h
     
Total: ~5-6 horas (desenvolvedor 1)
```

---

## 12. Definição de Pronto (DoD - Definition of Done)

### Para cada feature:
- ✅ Código escrito (ou testes passando)
- ✅ Especificação cumprida
- ✅ Testes passando (unitários + aceitação)
- ✅ Nomes em inglês
- ✅ Sem console errors
- ✅ Code review (self-review mínimo)
- ✅ Documentação atualizada

### Para o projeto:
- ✅ Todas as Ca de aceitação validadas
- ✅ Deploy em produção (GitHub Pages)
- ✅ README completo
- ✅ Acessibilidade validada
- ✅ Browsers testados (Chrome, Firefox, Safari)

---

## 13. Ambiente de Desenvolvimento

### Ferramentas Recomendadas
- **Editor:** VS Code
- **Live Server:** Extensão VS Code (vscode.liveserver)
- **Debugger:** DevTools do navegador
- **Testing:** Jest CLI

### Desenvolvimento Local (Fase 1)
```bash
# Abrir com Live Server ou simples HTTP
# VS Code: Ctrl+Shift+P → "Live Server: Open with Live Server"
# Ou: python -m http.server 8000
```

### Desenvolvimento Local (Fase 2+)
```bash
npm install       # Instalar dependencies
npm test          # Rodar testes
npm run test:watch  # Testes contínuos
npm run serve     # Servidor local
```

---

## 14. Métricas de Sucesso

| Métrica | Meta | Atual |
|---------|------|-------|
| Cobertura de Testes | > 95% | ⬜ |
| Tempo de Cálculo | < 100ms | ⬜ |
| Score Acessibilidade | > 90 | ⬜ |
| Responsividade | 320-1920px | ⬜ |
| Conformidade Especificação | 100% CA | ⬜ |

---

## 15. Risco & Mitigação

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Validação insuficiente | Alto | Média | Testes automatizados |
| Problema responsividade | Alto | Baixa | Mobile-first, testing |
| Erro de cálculo | Alto | Muito baixa | TDD, validação manual |
| Acessibilidade ruim | Médio | Média | ARIA labels, testing |

---

**Versão:** 1.0.0  
**Data:** 2026-03-23  
**Status:** ✅ Pronto para Implementação  
**Próximo:** Iniciar Fase 1 (Prototipagem)
