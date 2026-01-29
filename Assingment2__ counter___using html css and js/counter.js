

let count = 0;

const counter_display = document.getElementById('count')
const increment_btn = document.getElementById('increment')
const decrement_btn = document.getElementById('decrement')
const reset_btn = document.getElementById('reset')



decrement_btn.addEventListener('click', () => {
    count--;
    updateDisplay();
});

increment_btn.addEventListener('click', () => {
    count++;
    updateDisplay();
});
reset_btn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});



function updateDisplay() {
    counter_display.textContent = count;

    if (count > 0) {
        counter_display.style.color = 'green';
    }
    else if (count < 0) {
        counter_display.style.color = 'red';
    }
    else {
        counter_display.style.color = 'black';
    }
}