# Especificação: Calculadora de IMC

## 1. Visão Geral

Uma aplicação web simples para calcular o Índice de Massa Corporal (IMC) de um usuário e classificar seu peso conforme as diretrizes da Organização Mundial de Saúde (OMS).

**Objetivo:** Fornecer uma ferramenta rápida e intuitiva para cálculo e classificação de IMC com feedback visual claro.

---

## 2. Requisitos Funcionais

### RF-001: Entrada de Dados do Usuário
- O sistema deve aceitar **peso do usuário em quilogramas (kg)** como número decimal com até 2 casas decimais
- O sistema deve aceitar **altura do usuário em metros (m)** como número decimal com até 2 casas decimais
- Os campos devem estar claramente rotulados em português
- Campo de peso: `weightInput` (variável em inglês)
- Campo de altura: `heightInput` (variável em inglês)

### RF-002: Cálculo do IMC
- O sistema deve calcular o IMC usando a fórmula: **IMC = peso (kg) / (altura (m))²**
- O resultado deve ser apresentado com 1 casa decimal
- Exemplo: Para peso 70kg e altura 1.75m, IMC = 22.9

### RF-003: Classificação de Peso (OMS)
O sistema deve classificar o IMC de acordo com a tabela oficial da OMS:

| IMC | Classificação | Cor | Emoji |
|-----|---------------|-----|-------|
| < 18.5 | Abaixo do peso | Azul | 🔵 |
| 18.5 - 24.9 | Peso normal | Verde | 🟢 |
| 25.0 - 29.9 | Sobrepeso | Amarelo | 🟡 |
| 30.0 - 34.9 | Obesidade Grau I | Laranja | 🟠 |
| 35.0 - 39.9 | Obesidade Grau II | Vermelho | 🔴 |
| ≥ 40.0 | Obesidade Grau III (Severa) | Vermelho Escuro | 🔴🔴 |

### RF-004: Exibição de Resultado
- Ao clicar no botão "Calcular", o sistema deve exibir:
  - Valor do IMC calculado (ex: "IMC: 22.9")
  - Classificação (ex: "Peso normal")
  - Indicador visual com cor e emoji
  - Intervalo de peso saudável para sua altura (min-max kg)

### RF-005: Validação de Entrada
- O sistema deve validar que peso > 0 e ≤ 500 kg
- O sistema deve validar que altura > 0.5m e ≤ 2.5m
- Se os valores forem inválidos, exibir mensagem de erro clara
- Mensagens de erro em português
- Bloquear cálculo se dados inválidos

### RF-006: Reset/Limpar
- Deve existir botão "Limpar" que limpe os campos de entrada e o resultado
- Restaurar a tela ao estado inicial

---

## 3. Requisitos Não-Funcionais

### RNF-001: Design
- Interface limpa e minimalista
- Responsivo: funcionar em dispositivos de 320px (mobile) a 1920px (desktop)
- Fonte legível, bom contraste
- Sem frameworks ou bibliotecas JavaScript externas

### RNF-002: Performance
- Cálculo deve ser instantâneo (< 100ms)
- Sem requisições de rede
- Totalmente funcional offline

### RNF-003: Acessibilidade
- Labels associados aos inputs
- Mensagens de erro acessíveis
- Suporte a navegação por teclado
- ARIA labels onde apropriado

### RNF-004: Código
- Variáveis e funções em inglês
- Código bem comentado
- Estrutura clara: HTML, CSS e JavaScript separados
- Sem minificação (código legível)

---

## 4. Critérios de Aceitação

### CA-001: Cálculo Correto
**Dado** que o usuário insira peso = 70 kg e altura = 1.75 m  
**Quando** clicar em "Calcular"  
**Então** o IMC exibido deve ser 22.9 e a classificação ser "Peso normal"

### CA-002: Classificação Correta
**Dado** que o IMC seja calculado  
**Quando** o resultado for exibido  
**Então** a classificação e código de cor devem corresponder à tabela OMS

### CA-003: Validação de Peso
**Dado** que o usuário insira peso = -5 kg ou peso = 600 kg  
**Quando** tentar calcular  
**Então** exibir erro "Peso deve estar entre 0 e 500 kg"

### CA-004: Validação de Altura
**Dado** que o usuário insira altura = 0.3 m ou altura = 3.0 m  
**Quando** tentar calcular  
**Então** exibir erro "Altura deve estar entre 0.5 m e 2.5 m"

### CA-005: Intervalo de Peso Saudável
**Dado** que a altura seja 1.75 m  
**Quando** o cálculo for realizado  
**Então** exibir intervalo de peso saudável: 56.4 kg a 75.7 kg (baseado em IMC 18.5-24.9)

### CA-006: Função Limpar
**Dado** que exista um resultado exibido  
**Quando** clicar em "Limpar"  
**Então** todos os campos e resultado devem ser limpos

### CA-007: Responsividade Mobile
**Dado** viewport de 320px (mobile)  
**Quando** abrir a calculadora  
**Então** interface deve ser totalmente usável sem scroll horizontal

---

## 5. Casos de Uso

### CU-001: Calcular IMC Básico
**Ator:** Usuário  
**Precondição:** Página carregada  
**Fluxo Principal:**
1. Usuário insere peso em kg
2. Usuário insere altura em m
3. Usuário clica "Calcular"
4. Sistema exibe IMC, classificação e intervalo saudável
5. Sistema destaca resultado com cor apropriada

### CU-002: Corrigir e Recalcular
**Ator:** Usuário  
**Precondição:** Resultado anterior exibido  
**Fluxo:**
1. Usuário altera um ou ambos os valores
2. Usuário clica "Calcular" novamente
3. Sistema atualiza o resultado com novos dados

### CU-003: Iniciar Nova Consulta
**Ator:** Usuário  
**Fluxo:**
1. Usuário clica "Limpar"
2. Página retorna ao estado inicial
3. Usuário pode inserir novos dados

---

## 6. Exemplos de Entrada/Saída

### Exemplo 1: Peso Normal
```
Entrada:
- Peso: 70 kg
- Altura: 1.75 m

Saída:
- IMC: 22.9
- Classificação: Peso normal 🟢
- Intervalo saudável: 56.4 - 75.7 kg
```

### Exemplo 2: Sobrepeso
```
Entrada:
- Peso: 85 kg
- Altura: 1.75 m

Saída:
- IMC: 27.8
- Classificação: Sobrepeso 🟡
- Intervalo saudável: 56.4 - 75.7 kg
```

### Exemplo 3: Abaixo do Peso
```
Entrada:
- Peso: 50 kg
- Altura: 1.70 m

Saída:
- IMC: 17.2
- Classificação: Abaixo do peso 🔵
- Intervalo saudável: 53.5 - 71.5 kg
```

### Exemplo 4: Obesidade Grau I
```
Entrada:
- Peso: 100 kg
- Altura: 1.75 m

Saída:
- IMC: 32.7
- Classificação: Obesidade Grau I 🟠
- Intervalo saudável: 56.4 - 75.7 kg
```

### Exemplo 5: Entrada Inválida
```
Entrada:
- Peso: -10 kg
- Altura: 1.75 m

Saída:
- Erro: Peso deve estar entre 0 e 500 kg
- Sem cálculo realizado
```

---

## 7. Estrutura de Arquivo

```
projeto/
├── index.html           # Estrutura HTML
├── styles.css           # Estilos CSS (responsivo)
├── calculator.js        # Lógica de cálculo (testável)
├── ui.js                # Interação com DOM
├── tests/
│   └── calculator.test.js  # Testes unitários
└── README.md            # Documentação
```

---

## 8. Fluxo de Dados

```
Usuário Input (peso, altura)
        ↓
Validação de Entrada
        ↓
Calcular IMC (weight / (height²))
        ↓
Determinar Classificação (tabela OMS)
        ↓
Calcular Intervalo Saudável
        ↓
Atualizar UI com Resultado + Cor + Emoji
```

---

## 9. Considerações de Design

### Paleta de Cores
- **Abaixo do peso:** #2E7D8C (Azul)
- **Peso normal:** #27AE60 (Verde)
- **Sobrepeso:** #F39C12 (Amarelo/Ouro)
- **Obesidade I:** #E67E22 (Laranja)
- **Obesidade II/III:** #E74C3C (Vermelho)

### Layout Recomendado
- Card centralizado com sombra suave
- Inputs lado a lado (desktop) ou empilhados (mobile)
- Botões lado a lado (desktop) ou empilhados (mobile)
- Resultado em grande destaque com cor de fundo

### Tipografia
- Fonte principal: Sans-serif (ex: Segoe UI, Roboto)
- Tamanho: 16px base
- Heading do resultado: 32px, bold
- Labels: 14px
- Resultado: 28px, bold

---

## 10. Dependências e Restrições

- ❌ **Sem frameworks** (React, Vue, Angular, etc.)
- ❌ **Sem jQuery ou bibliotecas de cálculo**
- ✅ **Vanilla JavaScript ES6+**
- ✅ **HTML5 semântico**
- ✅ **CSS3 puro (Flexbox/Grid)**
- ✅ **Testes unitários com Jest ou Vitest**

---

## 11. Teste de Aceitação Técnico

| Teste | Input | Esperado | Status |
|-------|-------|----------|--------|
| Cálculo Normal | 70kg, 1.75m | IMC 22.9 | ⬜ |
| Validação Peso Negativo | -5kg, 1.75m | Erro | ⬜ |
| Validação Peso Excessivo | 600kg, 1.75m | Erro | ⬜ |
| Validação Altura Baixa | 70kg, 0.3m | Erro | ⬜ |
| Validação Altura Alta | 70kg, 3.0m | Erro | ⬜ |
| Intervalo Saudável | 1.75m | 56.4-75.7kg | ⬜ |
| Responsividade Mobile | 320px | Sem scroll | ⬜ |
| Cor Verde (Normal) | 22.9 IMC | Verde | ⬜ |
| Cor Amarela (Sobrepeso) | 27.8 IMC | Amarela | ⬜ |
| Limpar Campos | Após resultado | Vazio | ⬜ |

---

## 12. Referências

- [Organização Mundial de Saúde - IMC](https://www.who.int/)
- Fórmula: IMC = peso (kg) / altura (m)²
- Classificação: Conforme tabela oficial OMS 2023

---

**Versão:** 1.0.0  
**Data:** 2026-03-23  
**Status:** ✅ Aprovada  
**Autor:** Especificação gerada via Speckit
