"use strict";

var buttons = document.querySelectorAll('.button');
var output = document.getElementById('output');
// console.log(input);
let operand1 = "";
let operand2 = "";
let operator = "";
let sign = "";
let res =  "";
function calculation() {
    let value = this.getAttribute('data-value');
    // console.log(value);
    if(value === "AC") {
        operand1 = "";
        operand2 = "";
        operator = "";
        sign = "";
        output.value = "";
    } else if(value=="+" || value=="-" || value=="*" || value=="/" || value=="%" || value=="pow"){
        operator = value;
        output.value = "";
        
    } else if(value=="=") {
        let x = parseFloat(operand1);
        let y = parseFloat(operand2);

        if(operator === "+") {
            res = x + y;
        } else if(operator === "-") {
            res = x - y;
        } else if(operator === "/") {
            res = x / y;
        } else if(operator === "*") {
            res = x * y;
        } else if(operator === "%") {
            res = (x/100) * y;
        } else if(operator === "pow") {
            res = Math.pow(operand1, operand2);
        }
        operand1 = "";
        operand2 = "";
        operator = "";
        sign = "";
        output.value = res;
    } else {
        if(operator=="") {
            operand1 += value;
            output.value = operand1;
        } else {
            operand2 += value;
            output.value = operand2;
        }
    }
    // console.log(operand1, operand2, operator);
}
for(var i=0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', calculation);
}