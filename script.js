// --- Grundfunktionen für Rechenoperationen ---
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Nicht durch 0 teilen!";
  return a / b;
}

// --- operate() wählt die richtige Funktion aus ---
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return null;
  }
}

// --- Variablen für den Zustand ---
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// --- Anzeigeelement ---
const display = document.getElementById("display");

// --- Funktionen für Anzeige ---
function updateDisplay(value) {
  if (shouldResetDisplay) {
    display.textContent = value;
    shouldResetDisplay = false;
  } else {
    display.textContent =
      display.textContent === "0" ? value : display.textContent + value;
  }
}

// --- Ziffern ---
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (display.textContent === "Nicht durch 0 teilen!") clearAll();
    updateDisplay(button.textContent);
  });
});

// --- Dezimalpunkt ---
const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
  if (shouldResetDisplay) {
    display.textContent = "0";
    shouldResetDisplay = false;
  }
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
});

// --- Operatoren ---
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
  button.addEventListener("click", () => setOperator(button.textContent));
});

function setOperator(op) {
  if (currentOperator !== null && !shouldResetDisplay) {
    evaluate();
  }
  firstNumber = display.textContent;
  currentOperator = op;
  shouldResetDisplay = true;
}

// --- Gleichheitszeichen ---
const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", evaluate);

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNumber = display.textContent;
  const result = operate(currentOperator, firstNumber, secondNumber);

  display.textContent =
    typeof result === "number" ? Math.round(result * 1000) / 1000 : result;

  firstNumber = display.textContent;
  currentOperator = null;
  shouldResetDisplay = true;
}

// --- Clear ---
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearAll);

function clearAll() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
  display.textContent = "0";
}

// --- Backspace ---
const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", () => {
  if (shouldResetDisplay) return;
  display.textContent =
    display.textContent.length > 1
      ? display.textContent.slice(0, -1)
      : "0";
});

// --- Tastaturunterstützung ---
window.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) updateDisplay(e.key);
  if (e.key === ".") decimalButton.click();
  if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
  if (e.key === "Enter" || e.key === "=") evaluate();
  if (e.key === "Backspace") backspaceButton.click();
  if (e.key === "Escape") clearAll();
}