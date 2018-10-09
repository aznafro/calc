let display = document.querySelector(".display");
let input = document.querySelector(".input");
let numbers = [];
let operators = [];
const MAX_DIGITS = 13;

function equals() {
	// if theres nothing on the stack, don't bother
	if(numbers.length == 0) {
		return;
	}
	// otherwise, if the input has nothing in it, don't bother
	else if(input.value == "" || input.value == ".") {
		return;
	}
	
	// now push the current input value and do order of operations
	numbers.push(parseFloat(input.value));

	let j=0;
	for(let i=0; i < operators.length; i++) {
		if(operators[i] == "÷" || operators[i] == "x") {
			if(operators[i] == "÷") {
				numbers[j] = div(numbers[j], numbers[j+1]);
			} else if(operators[i] == "x") {
				numbers[j] = mult(numbers[j], numbers[j+1]);
			}
			numbers.splice(j+1, 1);
		}
	}

	j=0;
	for(let i=0; i < operators.length; i++) {
		if(operators[i] == "+" || operators[i] == "-") {
			if(operators[i] == "+") {
				numbers[j] = add(numbers[j], numbers[j+1]);
			} else if(operators[i] == "-") {
				numbers[j] = sub(numbers[j], numbers[j+1]);
			}
			numbers.splice(j+1, 1);
		}
	}

	input.value = parseFloat(numbers[0].toFixed(10));
	display.value = "";
	numbers = [];
	operators = [];
}

function add(x, y) {
	return x + y;
}

function sub(x, y) {
	return x - y;
}

function mult(x, y) {
	return x * y;
}

function div(x, y) {
	return x / y;
}

function isOp(ch) {
	return /[^0-9.]/.test(ch);
}

function isNonSubOp(ch) {
	return /[^0-9.-]/.test(ch);
}

function isNum(ch){
	return /[0-9]/.test(ch);
}

function isDotAllowed() {
	return input.value.indexOf(".") == -1;
}

document.querySelectorAll(".btn-d").forEach(btn => {
	btn.addEventListener("click", function() {
		let ch = this.textContent;
		let currentLength = input.value.length;

		// numbers and one dot are allowed 
		if(isNum(ch) || (ch == "." && isDotAllowed())) {
			input.value += ch;
			return;
		}

		// at this point an operator was pressed
		// and it shouldn't do anything if there's nothing in the input
		else if(currentLength == 0) {
			return;
		}

		// also if it doesn't contain a digit
		else if(!/[0-9]/.test(input.value)) {
			return;
		}
		
		// finally, push the values into their arrays
		numbers.push(parseFloat(input.value));
		operators.push(ch);
		display.value += input.value + " " + ch;
		input.value = "";
	});
});

// CLEAR
document.getElementById("clearInput").addEventListener("click", function() {
	input.value = "";
});

document.getElementById("clearAll").addEventListener("click", function() {
	display.value = "";
	input.value = "";
});

// BACKSPACE
document.getElementById("backspace").addEventListener("click", function() {
	input.value = input.value.substring(0, input.value.length - 1);
});

// EQUALS
document.getElementById("equals").addEventListener("click", equals);

// POS/NEG
document.getElementById("posneg").addEventListener("click", function() {
	let current = input.value;
	if(current.indexOf("-") == -1) {
		input.value = "-" + input.value;
	} else {
		input.value = input.value.substring(1);
	}
});