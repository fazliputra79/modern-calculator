let expression = "";

const result = document.getElementById("result");
const history = document.getElementById("history");

function updateDisplay() {
    result.textContent = expression || "0";
}

function appendNumber(number) {
    expression += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (!expression) return;

    if (/[+\-*/]$/.test(expression)) {
        expression = expression.slice(0, -1);
    }

    expression += operator;
    updateDisplay();
}

function appendDecimal() {
    const currentNumber = expression.split(/[+\-*/]/).pop();

    if (!currentNumber.includes(".")) {
        expression += ".";
        updateDisplay();
    }
}

function clearDisplay() {
    expression = "";
    history.textContent = "";
    updateDisplay();
}

function deleteNumber() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function percentage() {
    try {
        const value = Function('"use strict"; return (' + expression + ')')();
        expression = String(value / 100);
        updateDisplay();
    } catch {
        result.textContent = "Error";
    }
}

function calculate() {
    try {
        if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) {
            return;
        }

        const answer = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(answer)) {
            throw new Error("Invalid");
        }

        history.textContent = expression + " =";
        expression = String(Number(answer.toPrecision(12)));
        updateDisplay();

    } catch {
        result.textContent = "Error";
        expression = "";
    }
}