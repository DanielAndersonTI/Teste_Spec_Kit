/**
 * Calculator Tests - Testes Unitários
 * Suite de testes para as funções de cálculo e validação de IMC
 * Usando Jest como framework de testes
 */

const {
  calculateBMI,
  classifyBMI,
  validateInput,
  getHealthyWeightRange
} = require('../src/calculator.js');

// ============================================
// TESTES: calculateBMI()
// ============================================

describe('calculateBMI()', () => {
  test('calcula IMC corretamente para peso normal (70kg, 1.75m)', () => {
    expect(calculateBMI(70, 1.75)).toBe(22.9);
  });

  test('calcula IMC corretamente para sobrepeso (85kg, 1.75m)', () => {
    expect(calculateBMI(85, 1.75)).toBe(27.8);
  });

  test('calcula IMC corretamente para abaixo do peso (50kg, 1.70m)', () => {
    expect(calculateBMI(50, 1.70)).toBe(17.3);
  });

  test('calcula IMC corretamente para obesidade (100kg, 1.75m)', () => {
    expect(calculateBMI(100, 1.75)).toBe(32.7);
  });

  test('arredonda para 1 casa decimal', () => {
    const result = calculateBMI(70, 1.73);
    expect(result).toBe(23.4);
    expect(Number.isInteger(result * 10)).toBe(true);
  });

  test('retorna null quando peso é 0 ou negativo', () => {
    expect(calculateBMI(0, 1.75)).toBeNull();
    expect(calculateBMI(-5, 1.75)).toBeNull();
  });

  test('retorna null quando altura é 0 ou negativa', () => {
    expect(calculateBMI(70, 0)).toBeNull();
    expect(calculateBMI(70, -1.75)).toBeNull();
  });

  test('calcula corretamente com valores decimais', () => {
    expect(calculateBMI(65.5, 1.82)).toBe(19.8);
  });

  test('calcula IMC para altura mínima permitida (0.5m)', () => {
    const result = calculateBMI(50, 0.5);
    expect(result).toBe(200);
  });

  test('calcula IMC para altura máxima permitida (2.5m)', () => {
    const result = calculateBMI(150, 2.5);
    expect(result).toBe(24.0);
  });
});

// ============================================
// TESTES: classifyBMI()
// ============================================

describe('classifyBMI()', () => {
  test('classifica como "Abaixo do peso" para IMC 17.2', () => {
    const result = classifyBMI(17.2);
    expect(result.category).toBe('Abaixo do peso');
    expect(result.emoji).toBe('🔵');
    expect(result.colorClass).toBe('normal');
  });

  test('classifica como "Peso normal" para IMC 22.9', () => {
    const result = classifyBMI(22.9);
    expect(result.category).toBe('Peso normal');
    expect(result.emoji).toBe('🟢');
    expect(result.colorClass).toBe('normal');
  });

  test('classifica como "Sobrepeso" para IMC 27.8', () => {
    const result = classifyBMI(27.8);
    expect(result.category).toBe('Sobrepeso');
    expect(result.emoji).toBe('🟡');
    expect(result.colorClass).toBe('warning');
  });

  test('classifica como "Obesidade Grau I" para IMC 32.7', () => {
    const result = classifyBMI(32.7);
    expect(result.category).toBe('Obesidade Grau I');
    expect(result.emoji).toBe('🟠');
    expect(result.colorClass).toBe('warning');
  });

  test('classifica como "Obesidade Grau II" para IMC 37.5', () => {
    const result = classifyBMI(37.5);
    expect(result.category).toBe('Obesidade Grau II');
    expect(result.emoji).toBe('🔴');
    expect(result.colorClass).toBe('danger');
  });

  test('classifica como "Obesidade Grau III" para IMC 42.0', () => {
    const result = classifyBMI(42.0);
    expect(result.category).toBe('Obesidade Grau III (Severa)');
    expect(result.emoji).toBe('🔴🔴');
    expect(result.colorClass).toBe('danger');
  });

  test('retorna objeto com propriedades necessárias', () => {
    const result = classifyBMI(22.9);
    expect(result).toHaveProperty('category');
    expect(result).toHaveProperty('color');
    expect(result).toHaveProperty('emoji');
    expect(result).toHaveProperty('colorClass');
    expect(result).toHaveProperty('range');
  });

  test('classifica corretamente no limite inferior 18.5', () => {
    const result = classifyBMI(18.5);
    expect(result.category).toBe('Peso normal');
  });

  test('classifica corretamente no limite superior 24.9', () => {
    const result = classifyBMI(24.9);
    expect(result.category).toBe('Peso normal');
  });

  test('classifica corretamente no limite de sobrepeso 25.0', () => {
    const result = classifyBMI(25.0);
    expect(result.category).toBe('Sobrepeso');
  });

  test('classifica corretamente para IMC muito alto (100)', () => {
    const result = classifyBMI(100);
    expect(result.category).toBe('Obesidade Grau III (Severa)');
  });
});

// ============================================
// TESTES: validateInput()
// ============================================

describe('validateInput()', () => {
  test('valida entrada correta (70kg, 1.75m)', () => {
    const result = validateInput(70, 1.75);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('rejeita peso negativo', () => {
    const result = validateInput(-5, 1.75);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Peso deve estar entre 0 e 500 kg');
  });

  test('rejeita peso acima de 500kg', () => {
    const result = validateInput(600, 1.75);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Peso deve estar entre 0 e 500 kg');
  });

  test('rejeita peso zero', () => {
    const result = validateInput(0, 1.75);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Peso deve estar entre 0 e 500 kg');
  });

  test('rejeita altura abaixo de 0.5m', () => {
    const result = validateInput(70, 0.3);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Altura deve estar entre 0.5 m e 2.5 m');
  });

  test('rejeita altura acima de 2.5m', () => {
    const result = validateInput(70, 3.0);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Altura deve estar entre 0.5 m e 2.5 m');
  });

  test('rejeita altura zero', () => {
    const result = validateInput(70, 0);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Altura deve estar entre 0.5 m e 2.5 m');
  });

  test('rejeita NaN para peso', () => {
    const result = validateInput(NaN, 1.75);
    expect(result.isValid).toBe(false);
  });

  test('rejeita NaN para altura', () => {
    const result = validateInput(70, NaN);
    expect(result.isValid).toBe(false);
  });

  test('rejeita string vazia para peso', () => {
    const result = validateInput('', 1.75);
    expect(result.isValid).toBe(false);
  });

  test('rejeita string vazia para altura', () => {
    const result = validateInput(70, '');
    expect(result.isValid).toBe(false);
  });

  test('rejeita null para peso', () => {
    const result = validateInput(null, 1.75);
    expect(result.isValid).toBe(false);
  });

  test('rejeita null para altura', () => {
    const result = validateInput(70, null);
    expect(result.isValid).toBe(false);
  });

  test('rejeita ambos peso e altura inválidos', () => {
    const result = validateInput(-5, 3.0);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBe(2);
  });

  test('valida valores no limite inferior (peso 0.1, altura 0.5)', () => {
    const result = validateInput(0.1, 0.5);
    expect(result.isValid).toBe(true);
  });

  test('valida valores no limite superior (peso 500, altura 2.5)', () => {
    const result = validateInput(500, 2.5);
    expect(result.isValid).toBe(true);
  });

  test('valida valores decimais válidos', () => {
    const result = validateInput(75.5, 1.82);
    expect(result.isValid).toBe(true);
  });
});

// ============================================
// TESTES: getHealthyWeightRange()
// ============================================

describe('getHealthyWeightRange()', () => {
  test('calcula intervalo saudável para altura 1.75m', () => {
    const result = getHealthyWeightRange(1.75);
    expect(result.minWeight).toBe(56.7);
    expect(result.maxWeight).toBe(76.3);
  });

  test('calcula intervalo saudável para altura 1.70m', () => {
    const result = getHealthyWeightRange(1.70);
    expect(result.minWeight).toBe(53.5);
    expect(result.maxWeight).toBe(72.0);
  });

  test('calcula intervalo saudável para altura 1.80m', () => {
    const result = getHealthyWeightRange(1.80);
    expect(result.minWeight).toBe(59.9);
    expect(result.maxWeight).toBe(80.7);
  });

  test('calcula intervalo saudável para altura 1.60m', () => {
    const result = getHealthyWeightRange(1.60);
    expect(result.minWeight).toBe(47.4);
    expect(result.maxWeight).toBe(63.7);
  });

  test('retorna objeto com propriedades minWeight e maxWeight', () => {
    const result = getHealthyWeightRange(1.75);
    expect(result).toHaveProperty('minWeight');
    expect(result).toHaveProperty('maxWeight');
  });

  test('minWeight é sempre menor que maxWeight', () => {
    const result = getHealthyWeightRange(1.75);
    expect(result.minWeight).toBeLessThan(result.maxWeight);
  });

  test('arredonda para 1 casa decimal', () => {
    const result = getHealthyWeightRange(1.75);
    expect(Number.isInteger(result.minWeight * 10)).toBe(true);
    expect(Number.isInteger(result.maxWeight * 10)).toBe(true);
  });

  test('calcula intervalo para altura mínima permitida (0.5m)', () => {
    const result = getHealthyWeightRange(0.5);
    expect(result.minWeight).toBeGreaterThan(0);
    expect(result.maxWeight).toBeGreaterThan(result.minWeight);
  });

  test('calcula intervalo para altura máxima permitida (2.5m)', () => {
    const result = getHealthyWeightRange(2.5);
    expect(result.minWeight).toBeGreaterThan(0);
    expect(result.maxWeight).toBeGreaterThan(result.minWeight);
  });

  test('calcula intervalo para altura 1.82m (exemplo do plano)', () => {
    const result = getHealthyWeightRange(1.82);
    // IMC mín: 18.5 * 1.82^2 = 61.32 → 61.3
    // IMC máx: 24.9 * 1.82^2 = 82.48 → 82.5
    expect(Math.round(result.minWeight * 10) / 10).toBe(61.3);
    expect(Math.round(result.maxWeight * 10) / 10).toBe(82.5);
  });
});

// ============================================
// TESTES DE INTEGRAÇÃO
// ============================================

describe('Integração: Fluxo Completo', () => {
  test('fluxo completo: validar → calcular → classificar → intervalo', () => {
    const weight = 70;
    const height = 1.75;

    // Step 1: Validar
    const validation = validateInput(weight, height);
    expect(validation.isValid).toBe(true);

    // Step 2: Calcular
    const bmi = calculateBMI(weight, height);
    expect(bmi).toBe(22.9);

    // Step 3: Classificar
    const classification = classifyBMI(bmi);
    expect(classification.category).toBe('Peso normal');

    // Step 4: Intervalo
    const range = getHealthyWeightRange(height);
    expect(range.minWeight).toBe(56.7);
    expect(range.maxWeight).toBe(76.3);
    expect(weight).toBeGreaterThanOrEqual(range.minWeight);
    expect(weight).toBeLessThanOrEqual(range.maxWeight);
  });

  test('fluxo com entrada inválida retorna erro antes de calcular', () => {
    const weight = -10;
    const height = 1.75;

    const validation = validateInput(weight, height);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  test('fluxo para cada categoria OMS', () => {
    const testCases = [
      { weight: 45, height: 1.70, expectedCategory: 'Abaixo do peso' },
      { weight: 65, height: 1.70, expectedCategory: 'Peso normal' },
      { weight: 77, height: 1.70, expectedCategory: 'Sobrepeso' },
      { weight: 87, height: 1.70, expectedCategory: 'Obesidade Grau I' },
      { weight: 100, height: 1.70, expectedCategory: 'Obesidade Grau I' },
      { weight: 120, height: 1.70, expectedCategory: 'Obesidade Grau III (Severa)' }
    ];

    testCases.forEach(testCase => {
      const validation = validateInput(testCase.weight, testCase.height);
      expect(validation.isValid).toBe(true);

      const bmi = calculateBMI(testCase.weight, testCase.height);
      const classification = classifyBMI(bmi);
      expect(classification.category).toBe(testCase.expectedCategory);
    });
  });
});
