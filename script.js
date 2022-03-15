function Calculator() {
    this.operationSummary = document.querySelector('[data-summary]');
    this.operationCurrent = document.querySelector('[data-current]');
    this.numberButtons = document.querySelectorAll('[data-number]');
    this.operatorButtons = document.querySelectorAll('[data-operator]');
    this.clearButton = document.querySelector('[data-clear]');
    this.deleteButton = document.querySelector('[data-del]');
    this.equalButton = document.querySelector('[data-equal]');
    this.operatorClicked = false;
    this.equalClicked = false;
    this.firstOperand = null;
    this.secondOperand = null;
    this.operator = '';

    this.appendNumber = function(number) {
        if (number === '.' && this.operationCurrent.innerText.includes('.')) return;
        if (this.operatorClicked) { this.updateCurrent(''); this.operatorClicked = false; }
        if (this.equalClicked) { this.clear(); this.equalClicked = false;}
        this.operationCurrent.innerText += number.toString();
    }

    this.appendSummary = function(operator) {
        if (this.operatorClicked) return;
        if (this.operationCurrent.innerText.length === 0) return;
        this.operationSummary.innerText += ` ${this.operationCurrent.innerText} ${operator.innerText} `;
    }

    this.updateCurrent = function(newText) {
        this.operationCurrent.innerText = newText.toString();
    }

    this.deletion = function() {
        this.operationCurrent.innerText = this.operationCurrent.innerText.slice(0, -1);
    }

    this.clear = function() {
        this.operationCurrent.innerText = '';
        this.operationSummary.innerText = '';
        this.firstOperand = null;
        this.secondOperand = null;
        this.operator = '';
    }

    this.changeOperator = function(operator) {
        if (this.operatorClicked) return;
        this.operatorClicked = true;
        this.evaluate();
        this.operator = operator;
    }

    this.evaluate = function() {
        if (this.equalClicked) return;
        if (this.firstOperand == null) {
            this.firstOperand += parseFloat(this.operationCurrent.innerText);
        } else {
            let evaluation = null;
            this.secondOperand = parseFloat(this.operationCurrent.innerText);
            switch(this.operator) {
                case '+':
                   evaluation = this.firstOperand += this.secondOperand;
                    break;
                case '-':
                    evaluation = this.firstOperand -= this.secondOperand;
                    break;
                case '*':
                    evaluation = this.firstOperand *= this.secondOperand;
                    break;
                case '/':
                    evaluation = this.firstOperand /= this.secondOperand;
                    break;
                default:
                    return;
            }
            this.updateCurrent(evaluation);
            console.log(this.firstOperand, this.secondOperand)
        }
    }
}

function Listener() {
    calculator.numberButtons.forEach(numberButton => {
        numberButton.addEventListener('click', function(){
            calculator.appendNumber(numberButton.innerText); 
        }); 
    });

    calculator.operatorButtons.forEach(operatorButton => {
        operatorButton.addEventListener('click', function() {
            calculator.appendSummary(operatorButton);
            calculator.changeOperator(operatorButton.innerText)
        })
    })

    calculator.deleteButton.addEventListener('click', function(){ calculator.deletion(); });

    calculator.clearButton.addEventListener('click', function(){ calculator.clear(); });

    calculator.equalButton.addEventListener('click', function(){ calculator.evaluate(); calculator.equalClicked = true; });
}

// Initialization
const calculator = new Calculator();
const listener = new Listener();