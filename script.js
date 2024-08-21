// Variables

const display = document.querySelector('.display');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const breakButton = document.querySelector('.break');
const workButton = document.querySelector('.work');


// Timer variables
let timerDuration = 25 * 60; // 25 minutes in seconds
let remainingTime = timerDuration;
let timerInterval;
let isRunning = false; // Trach whether the timer is running

let breakDuration = 5 * 60; // 5 minutes in seconds
let remainingBreakTime = breakDuration;
let breakInterval;
let isBreakRunning = false;

let cycleCount = 0; //Track the number of work-break cycles

// Alarm sounds
let slimeSquish = new Audio('./slime-squish-12-219047.mp3');
slimeSquish.volume = 1.0;

let slimePlayCount = 0;
const maxSlimePlays = 4;

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
    let minutes, seconds;
    if (isRunning) {
        minutes = Math.floor(remainingTime / 60);
        seconds = remainingTime % 60;
    } else if (isBreakRunning) {
        minutes = Math.floor(remainingBreakTime / 60);
        seconds = remainingBreakTime % 60;
    } else {
        minutes = Math.floor(timerDuration / 60);
        seconds = timerDuration % 60;
    }
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to start the work timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            remainingTime--;
            updateDisplay();
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                cycleCount++; // Incriment the cycle count
                playSlime(); // Play the alarm
                handleCycleEnd(); // Determine what happens next
            }
        }, 1000);
    }
}

// Function to handle the end of a work/break cycle
function handleCycleEnd() {
    if (cycleCount % 2 === 1) { // After a work session

    }
}

// Stop timer function
function stopTimer() {
    clearInterval(timerInterval);
    clearInterval(breakInterval);
    isRunning = false;
    isBreakRunning = false;
}

// Reset timer function
function resetTimer() {
    clearInterval(timerInterval);
    clearInterval(breakInterval);
    remainingTime = timerDuration;
    remainingBreakTime = breakDuration;
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