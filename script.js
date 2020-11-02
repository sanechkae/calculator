var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


	const equalsButton = document.querySelector('[data-equals]');
	const allClearButton = document.querySelector('[data-all-clear]');
	const historyDiv = document.querySelector('[data-history]');
	const previousOperandTextElement = document.querySelector(
	  '[data-previous-operand]'
	);
	const currentOperandTextElement = document.querySelector(
	  '[data-current-operand]'
	);


	var firstOperandValue = '';
	var operation = '';
	var secondOperandValue = '';
	var step = 0;

	function clearCalc(cleardiv = false) {
		step = 0;
		firstOperandValue = '';
		operation = '';
		secondOperandValue = '';
		if (cleardiv) {
			currentOperandTextElement.innerHTML = '0';
			previousOperandTextElement.innerHTML = '';
			
		}
	}
	
	equalsButton.addEventListener('click', event => {
		if (step == 2) {
			var result = eval(firstOperandValue + operation + '(' + secondOperandValue + ')');
			previousOperandTextElement.innerHTML = firstOperandValue + ' ' + operation + ' ' + secondOperandValue ;
			currentOperandTextElement.innerHTML = ' = ' + result;
			historyDiv.innerHTML = historyDiv.innerHTML + '<br/>' + firstOperandValue + ' ' + operation + ' ' + secondOperandValue + ' = ' + result;
			clearCalc();
		}
	});

	allClearButton.addEventListener('click', event => {
		clearCalc(true);
	});

	var numberButtons = document.querySelectorAll('[data-number]');
	numberButtons.forEach(function(elem) {
		elem.addEventListener("click", function() {
			var go = true;
			if (elem.innerHTML == '.') {
				if (firstOperandValue == '') {
					firstOperandValue = '0';
				}
				if (firstOperandValue.indexOf('.') >= 0) {
					go = false;
				}
				console.log (firstOperandValue.substr(firstOperandValue.length-1));
			}
			if (go) {
				if (step == 0) {
					firstOperandValue = firstOperandValue + elem.innerHTML;
					currentOperandTextElement.innerHTML = firstOperandValue;
				} else if (step > 0) {
					step = 2;
					secondOperandValue = secondOperandValue + elem.innerHTML;
					currentOperandTextElement.innerHTML = firstOperandValue + ' ' + operation + ' ' + secondOperandValue;
				}
			}
		});
	});
		
		
	var operationButtons = document.querySelectorAll('[data-operation]');
	operationButtons.forEach(function(elem) {
		elem.addEventListener("click", function() {
			console.log(elem.innerHTML);
			if (firstOperandValue.length > 0 && (step == 0 || step == 1)) {
				if (elem.innerHTML == '√') {
					var result = Math.sqrt(firstOperandValue);
					currentOperandTextElement.innerHTML = '√'+firstOperandValue + ' = ' + result;
					historyDiv.innerHTML = historyDiv.innerHTML + '<br/>√'+firstOperandValue + ' = ' + result;
					clearCalc();
				} else {
					step = 1;
					operation = elem.innerHTML;
					currentOperandTextElement.innerHTML = firstOperandValue + ' ' + operation;
				}
			}
		});
	});
	
	var orOperation = document.getElementById("or");
	orOperation.addEventListener('click', event => {
		if (step == 0) {
			if (firstOperandValue[0] == '-') {
				firstOperandValue = firstOperandValue.substring(1);
			} else {
				firstOperandValue = '-' + firstOperandValue;
			}
			currentOperandTextElement.innerHTML = firstOperandValue;
		} else if (step > 1) {
			if (secondOperandValue[0] == '-') {
				secondOperandValue = secondOperandValue.substring(1);
			} else {
				secondOperandValue = '-' + secondOperandValue;
			}
			currentOperandTextElement.innerHTML = firstOperandValue + ' ' + operation + ' ' + secondOperandValue;
		}
	});


