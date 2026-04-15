let currentInput = '';
let previousInput = '';
let operation = null;
let total = 0;
let mode = 'purchase'; // 'purchase' or 'change'

const display = document.getElementById('calc-display');
const totalAmount = document.getElementById('total-amount');
const changeAmount = document.getElementById('change-amount');
const totalMessage = document.getElementById('total-message');
const changeMessage = document.getElementById('change-message');
const purchaseModeBtn = document.getElementById('purchase-mode');
const changeModeBtn = document.getElementById('change-mode');

function updateDisplay() {
    display.value = currentInput;
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput.length < 10) {
        currentInput += number;
        updateDisplay();
    }
}

function setOperation(op) {
    if (mode === 'purchase') {
        if (currentInput !== '') {
            total += parseFloat(currentInput) || 0;
            currentInput = '';
            updateTotalDisplay();
        }
    } else if (mode === 'change') {
        if (currentInput !== '') {
            previousInput = currentInput;
            operation = op;
            currentInput = '';
        }
    }
}

function calculate() {
    if (mode === 'purchase') {
        if (currentInput !== '') {
            total += parseFloat(currentInput) || 0;
            currentInput = '';
            updateTotalDisplay();
        }
    } else if (mode === 'change') {
        if (previousInput !== '' && currentInput !== '' && operation === '-') {
            const payment = parseFloat(previousInput);
            const cost = parseFloat(currentInput);
            const change = payment - cost;
            changeAmount.textContent = change.toFixed(0);
            totalMessage.style.display = 'none';
            changeMessage.style.display = 'block';
            currentInput = '';
            updateDisplay();
        }
    }
}

function updateTotalDisplay() {
    totalAmount.textContent = total.toFixed(0);
    totalMessage.style.display = 'block';
    changeMessage.style.display = 'none';
}

function switchMode(newMode) {
    mode = newMode;
    clearCalculator();
    total = 0;
    updateTotalDisplay();
    purchaseModeBtn.classList.toggle('active', mode === 'purchase');
    changeModeBtn.classList.toggle('active', mode === 'change');
}

// Event listeners
document.querySelectorAll('.number').forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.dataset.value));
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => setOperation(btn.dataset.value));
});

document.querySelector('.equals').addEventListener('click', calculate);
document.querySelector('.clear').addEventListener('click', clearCalculator);

purchaseModeBtn.addEventListener('click', () => switchMode('purchase'));
changeModeBtn.addEventListener('click', () => switchMode('change'));

// Initialize
updateDisplay();
updateTotalDisplay();