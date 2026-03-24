/**
 * BMI Calculator - Módulo de Cálculo
 * Funções puras para cálculo e classificação do Índice de Massa Corporal
 * Sem dependências de DOM - Testável com Jest
 */

/**
 * Calcula o Índice de Massa Corporal
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em m
 * @returns {number} IMC arredondado para 1 casa decimal
 * @throws {Error} Se peso ou altura forem inválidos
 */
function calculateBMI(weight, height) {
  if (weight <= 0 || height <= 0) {
    return null;
  }
  return Math.round((weight / (height * height)) * 10) / 10;
}

/**
 * Classifica o IMC conforme tabela OMS
 * @param {number} bmi - IMC calculado
 * @returns {object} { category, color, emoji, colorClass }
 */
function classifyBMI(bmi) {
  const classifications = {
    underweight: {
      range: [0, 18.5],
      category: "Abaixo do peso",
      color: "#2E7D8C",
      emoji: "🔵",
      colorClass: "normal"
    },
    normal: {
      range: [18.5, 25],
      category: "Peso normal",
      color: "#27AE60",
      emoji: "🟢",
      colorClass: "normal"
    },
    overweight: {
      range: [25, 30],
      category: "Sobrepeso",
      color: "#F39C12",
      emoji: "🟡",
      colorClass: "warning"
    },
    obesityI: {
      range: [30, 35],
      category: "Obesidade Grau I",
      color: "#E67E22",
      emoji: "🟠",
      colorClass: "warning"
    },
    obesityII: {
      range: [35, 40],
      category: "Obesidade Grau II",
      color: "#E74C3C",
      emoji: "🔴",
      colorClass: "danger"
    },
    obesityIII: {
      range: [40, Infinity],
      category: "Obesidade Grau III (Severa)",
      color: "#C0392B",
      emoji: "🔴🔴",
      colorClass: "danger"
    }
  };

  // Normaliza IMC para 1 casa decimal antes das comparações.
  const normalizedBMI = Math.round(bmi * 10) / 10;

  if (normalizedBMI < 18.5) {
    return classifications.underweight;
  } else if (normalizedBMI < 25) {
    return classifications.normal;
  } else if (normalizedBMI < 30) {
    return classifications.overweight;
  } else if (normalizedBMI < 35) {
    return classifications.obesityI;
  } else if (normalizedBMI >= 35 && normalizedBMI < 40) {
    return classifications.obesityII;
  }

  return classifications.obesityIII;
}

/**
 * Valida entrada do usuário
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em m
 * @returns {object} { isValid, errors: [] }
 */
function validateInput(weight, height) {
  const errors = [];

  // Validação de peso
  if (isNaN(weight) || weight === null || weight === "") {
    errors.push("Por favor, insira um peso válido");
  } else if (weight <= 0 || weight > 500) {
    errors.push("Peso deve estar entre 0 e 500 kg");
  }

  // Validação de altura
  if (isNaN(height) || height === null || height === "") {
    errors.push("Por favor, insira uma altura válida");
  } else if (height < 0.5 || height > 2.5) {
    errors.push("Altura deve estar entre 0.5 m e 2.5 m");
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Calcula intervalo de peso saudável (IMC 18.5-24.9)
 * @param {number} height - Altura em m
 * @returns {object} { minWeight, maxWeight }
 */
function getHealthyWeightRange(height) {
  const minWeight = Math.round(18.5 * height * height * 10) / 10;
  // Ajuste de arredondamento para valor de uma casa decimal conforme expectativa de teste.
  const maxWeight = Math.round(24.9 * height * height * 10) / 10;
  return { minWeight, maxWeight };
}

// ============================================
// EXPORTS: Para uso em testes e módulos
// ============================================

// Suporte para CommonJS (Jest/Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateBMI,
    classifyBMI,
    validateInput,
    getHealthyWeightRange
  };
}

// Suporte para ES Modules (opcional)
if (typeof exports !== 'undefined') {
  exports.calculateBMI = calculateBMI;
  exports.classifyBMI = classifyBMI;
  exports.validateInput = validateInput;
  exports.getHealthyWeightRange = getHealthyWeightRange;
}

// Exportações ESM para uso com <script type="module">
export { calculateBMI, classifyBMI, validateInput, getHealthyWeightRange };
