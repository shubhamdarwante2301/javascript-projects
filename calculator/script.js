"use strict";

var buttons = document.querySelectorAll(".button");
var output = document.getElementById("output");
var expression = document.getElementById("expression");
// console.log(expression);
let operand1 = "";
let operand2 = "";
let operator = "";
let res = "";
function calculate(value) {
  let x = parseFloat(operand1);
  let y = parseFloat(operand2);

  if(operand1==="" || operand2==="" || operator==="") {
    output.value = res;
    clearCalci();
    return;
  }

  if (operator === "+") {
    res = x + y;
  } else if (operator === "-") {
    res = x - y;
  } else if (operator === "/") {
    res = x / y;
  } else if (operator === "*") {
    res = x * y;
  } else if (operator === "%") {
    res = (x / 100) * y;
  } else if (operator === "pow") {
    res = Math.pow(operand1, operand2);
  }

  if (value === "=") {
    operand1 = res;
    operand2 = "";
    operator = "";
    output.value = res;
    expression.innerText = "";
  } else {
    operand1 = res;
    operand2 = "";
    operator = "";
    // console.log(operand1 + operator + operand2);
    expression.innerText = res;
  }
}

function clearCalci() {
  operand1 = "";
  operand2 = "";
  operator = "";
  output.value = "";
  expression.innerText = "";
}

function calculation() {
  let value = this.getAttribute("data-value");
  output.value = output.value + value;
  // console.log(value);
  if (value === "AC") {
    clearCalci();
    return;
  } else if (value == "+" || value == "-" || value == "*" || value == "/" || value == "%" || value == "pow") {
    if (operand1 != "" && operator != "" && operand2 != "") {
      calculate(value);
    }
    operator = value;
    return;
  } else if (value == "=") {
    calculate(value);
    return;
  } else {
    if (operator == "") {
      operand1 += value;
    } else {
      operand2 += value;
    }
  }
}
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", calculation);
}
