let display = document.querySelector(".display");

function equals() {

}

function isOp(ch) {
	return /[^0-9.]/.test(ch);
}

function isNum(ch){
	return /[0-9]/.test(ch);
}

// were going backwards to see if there is a case
// where a dot or an operator wouldn't be allowed
// operator : previous operator not allowed
// . : previous . before an operator not allowed
function isAllowed(ch) {
	for(let i=display.value.length-1; i > -1; i--) {
		let prevCh = display.value.charAt(i);
		if(ch == ".") {
			if(prevCh == ".") {
				return false;
			} else if(isOp(prevCh)) {
				return true;
			}
		} else {
			if(isOp(prevCh)) {
				return false;
			} else if(isNum(prevCh)) {
				return true;
			}
		}
	}
	return true;
}

document.querySelectorAll(".btn-d").forEach(btn => {
	btn.addEventListener("click", function() {
		let ch = this.textContent;
		if(display.value.length == 0 && isOp(ch)) {
			return;
		}
		else if((ch == "." || isOp(ch)) && !isAllowed(ch)) {
			return
		}
		else if(display.value.length == 13) {
			return;
		}

		display.value  += ch;
	});
});

// CLEAR
document.getElementById("clear").addEventListener("click", function() {
	display.value = "";
});

// BACKSPACE
document.getElementById("backspace").addEventListener("click", function() {
	display.value = display.value.substring(0, display.value.length - 1);
});