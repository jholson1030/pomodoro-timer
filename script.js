// Variables

const display = document.querySelector('.display');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');


// Timer variables
let timerDuration = 25 * 60; // 25 minutes in seconds
let remainingTime = timerDuration;
let timerInterval;

let breakDuration = 5 * 60; // 5 minutes in seconds
let remainingBreakTime = breakDuration;
let breakInterval;

// Function to update the display
function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}