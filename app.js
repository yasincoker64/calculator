let firstOperand = '0';
let secondOperand = null;
let operator = null;
let result = null;
let displayValue = '';

const operators = document.querySelectorAll("#operator");
const operands = document.querySelectorAll("#operand");
const equalBtn = document.getElementById("equal");
const clearBtn = document.getElementById("clear");
const minusplusBtn = document.getElementById("minusplus");
const percentBtn = document.getElementById("percent");
const decimalBtn = document.getElementById("decimal");
const displayScreen = document.getElementById("display");

operators.forEach((input) => {
  input.addEventListener("click", () => inputOperator(input.value));
});
operands.forEach((num) => {
  num.addEventListener("click", () => inputOperand(num.value));
});
equalBtn.addEventListener("click", equalAction);
clearBtn.addEventListener("click", clear);
decimalBtn.addEventListener("click", toFloat);
minusplusBtn.addEventListener("click", minus);
percentBtn.addEventListener("click", toPercent)

function inputOperand(num) {
    num = parseFloat(num);
    
  if ((firstOperand === '0' && operator === null) || displayScreen.innerHTML ==="Error" || (firstOperand === result && operator === null)) {
    firstOperand = `${num}`;
    displayScreen.innerHTML = `${firstOperand}`;
  } else if (operator === null && firstOperand !== '0') {
    firstOperand += `${num}`;
    displayScreen.innerHTML = `${firstOperand}`;
    updateDisplay();
  } else if (operator !== null && secondOperand === null) {
    secondOperand = `${num}`;
    displayScreen.innerHTML = `${secondOperand}`;
  } else if (operator !== null && secondOperand !== null) {
    secondOperand += `${num}`;
    displayScreen.innerHTML = `${secondOperand}`;
    updateDisplay();
  }
}

function inputOperator(input) {
  if ((operator === null) || (operator !== null && secondOperand === null)) {
    operator = input;
  } 
  else if(secondOperand !== null && firstOperand !== null) {
    result = operate(firstOperand, secondOperand, operator);
    firstOperand = result;
    displayScreen.innerHTML = `${result}`;
    secondOperand = null;
    operator = input;
    updateDisplay();
  }
}

function updateDisplay() {
    const display = document.getElementById('display');
    displayValue = display.innerText
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 11);
    }
}

function equalAction() {
  if (firstOperand !== null && secondOperand !== null && operator !== null) {
    result = operate(firstOperand, secondOperand, operator);
    firstOperand = result;
    displayScreen.innerHTML = `${result}`;
    secondOperand = null;
    operator = null;
    updateDisplay();
  }
}

function clear() {
  firstOperand = '0';
  secondOperand = null;
  operator = null;
  result = null;
  displayScreen.innerHTML = '0';
}

function minus(){
    if(operator === null && secondOperand === null){
        firstOperand = parseInt(firstOperand) * -1;
        firstOperand = `${firstOperand}`
        displayScreen.innerHTML = `${firstOperand}`;
    }
    else if(secondOperand !== null){
        secondOperand = parseInt(secondOperand) * -1;
        secondOperand = `${secondOperand}`
        displayScreen.innerHTML = `${secondOperand}`;
    }
}

function toFloat(){
    if(operator === null && secondOperand === null){
        if(isFloat(firstOperand) && firstOperand[firstOperand.length-1] !== "."){
            firstOperand += '.';
            displayScreen.innerHTML = `${firstOperand}`;
        }
    }
    else if(secondOperand !== null && secondOperand[secondOperand.length-1] !== "."){
        if(isFloat(secondOperand)){
            secondOperand += '.';
            displayScreen.innerHTML = `${secondOperand}`;
        }
    }
}

function toPercent(){
    if(operator === null && secondOperand === null){
        firstOperand = parseInt(firstOperand) / 100;
        firstOperand = `${firstOperand}`
        displayScreen.innerHTML = `${firstOperand}`;
    }
    else if(secondOperand !== null){
        secondOperand = parseInt(secondOperand) / 100;
        secondOperand = `${secondOperand}`
        displayScreen.innerHTML = `${secondOperand}`;
    }
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
  if (operator === "+") {
    return Math.round((add(a, b)) * 100) / 100;;
  } else if (operator === "-") {
    return Math.round((extract(a, b)) * 100) / 100;;
  } else if (operator === "*") {
    return Math.round((multiply(a, b)) * 100) / 100;;
  } else if (operator === "/") {
    if (b === 0) {
      return "Error";
    }
    return Math.round((divide(a, b)) * 100) / 100;
  }
}

function add(a, b) {
  return a + b;
}

function extract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function isFloat(num){
    return num % 1 === 0;
}
