// Variables

const display = document.querySelector('.display');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');


// Timer variables
let timerDuration = 25 * 60; // 25 minutes in seconds
let remainingTime = timerDuration;
let timerInterval;
let isRunning = false; // Trach whether the timer is running

let breakDuration = 5 * 60; // 5 minutes in seconds
let remainingBreakTime = breakDuration;
let breakInterval;
let isBreakRunning = false;

// Alarm sounds
let slimeSquish = new Audio('./slime-squish-12-219047.mp3');
slimeSquish.volume = 1.0;

let slimePlayCount = 0;
const maxSlimePlays = 5;

// Function to play slimeSquish
function playSlime() {
    if (slimePlayCount < maxSlimePlays) {
        slimeSquish.play();
        slimePlayCount++;
    }
}

// Event listener for when the alarm ends
slimeSquish.addEventListener('ended', playSlime);

// Function to update the display
function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start break timer
function startBreakTimer() {
    isBreakRunning = true;
    remainingBreakTime = breakDuration; // Reset break time
    updateDisplay();
    breakInterval = setInterval(() => {
        remainingBreakTime--;
        updateDisplay();
        if (remainingBreakTime <= 0) {
            clearInterval(breakInterval);
            isBreakRunning = false;
        }
    }, 1000);
}

// Start timer function
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            remainingTime--;
            updateDisplay();
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                slimePlayCount = 0; // Reset play count
                slimeSquish.play(); // Play alarm
                startBreakTimer();
            }
        }, 1000);
    }
}

// Stop timer function
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isBreakRunning = false;
}

// Reset timer function
function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = timerDuration;
    updateDisplay();
    isRunning = false;
    isBreakRunning = false;
}

// Event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();