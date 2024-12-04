let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function formateTime(ms){
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function updateDisplay(){
    elapsedTime = Date.now() - startTime;
    display.textContent = formateTime(elapsedTime);
}

startStopButton.addEventListener('click', () => {
    if (isRunning){
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    }
    else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 1000);
        startStopButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    // laps.innerHTML = '';
});

function recordLap(){
    lapTimes.push(elapsedTime);
    const lapTime = document.createElement('div');
    lapTime.textContent = ` Lap ${lapTimes.length}: ${formateTime(elapsedTime)}`;
    laps.appendChild(lapTime);
}

lapButton.addEventListener('click', () => {
    if (isRunning){
        recordLap();
    }
})

