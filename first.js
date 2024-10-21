document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operatorClicked = false;

    // Add click event to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            handleInput(this.dataset.value);
        });
    });

    // Handle keyboard input
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key >= '0' && key <= '9' || key === '.' || key === '/' || key === '*' || key === '-' || key === '+') {
            handleInput(key);
        } else if (key === 'Enter' || key === '=') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('C');
        }else if(key === 'Delete'){
            handleInput('DE')
        }
    });

    function handleInput(value) {
        if (value === 'C') {
            if(currentInput === "Infinity" || currentInput === "undefined"){
                currentInput = "";
                display.value = "";

            }else{
                currentInput = currentInput.substring(0,currentInput.length-1);
                display.value = currentInput;
                operatorClicked = false;
            }
        }else if(value === 'DE') {
            currentInput = "";
            display.value = "";
        }else if (value === '=' || value === 'Enter') {
            try {
                if(currentInput === "Infinity" || currentInput === "undefined"){
                    currentInput = "";
                    display.value = "";
                }else{
                    display.value = eval(currentInput);
                    currentInput = display.value;
                    operatorClicked = false;
                }  
            } catch (error) {
                display.value = 'Error';
                currentInput = '';
            }
        } else {
            if (['/', '*', '-', '+'].includes(value)) {
                if (operatorClicked) {
                    currentInput = currentInput.slice(0, -1);
                }
                operatorClicked = true;
            } else {
                operatorClicked = false;
            }

            currentInput += value;
            display.value = currentInput;
        }
    }
});