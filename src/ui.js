import { calculateBMI, classifyBMI, validateInput, getHealthyWeightRange } from './calculator.js';

const weightInput = document.getElementById('weightInput');
const heightInput = document.getElementById('heightInput');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const errorMessage = document.getElementById('errorMessage');
const resultCard = document.getElementById('resultCard');
const resultBMI = document.getElementById('resultBMI');
const resultEmoji = document.getElementById('resultEmoji');
const resultCategory = document.getElementById('resultCategory');
const resultRange = document.getElementById('resultRange');

function showError(text) {
  errorMessage.textContent = text;
  errorMessage.classList.add('show');
}

function hideError() {
  errorMessage.textContent = '';
  errorMessage.classList.remove('show');
}

function clearResults() {
  resultCard.classList.remove('show');
  resultBMI.textContent = '--';
  resultEmoji.textContent = '📊';
  resultCategory.textContent = '--';
  resultCategory.className = 'result-category';
  resultRange.textContent = '-- a -- kg';
}

function showResults(bmi, classification, range) {
  resultBMI.textContent = bmi.toFixed(1);
  resultEmoji.textContent = classification.emoji;
  resultCategory.textContent = classification.category;
  resultCategory.className = `result-category ${classification.colorClass}`;
  resultRange.textContent = `${range.minWeight.toFixed(1)} a ${range.maxWeight.toFixed(1)} kg`;
  resultCard.classList.add('show');
}

function onCalculateClick() {
  hideError();

  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  const validation = validateInput(weight, height);
  if (!validation.isValid) {
    showError(validation.errors.join(' | '));
    return;
  }

  const bmi = calculateBMI(weight, height);
  const classification = classifyBMI(bmi);
  const range = getHealthyWeightRange(height);

  showResults(bmi, classification, range);
}

function onClearClick() {
  weightInput.value = '';
  heightInput.value = '';
  hideError();
  clearResults();
}

calculateBtn.addEventListener('click', onCalculateClick);
clearBtn.addEventListener('click', onClearClick);

// Inicialização
clearResults();
