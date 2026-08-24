const sections = document.querySelectorAll('.section');
const buttons = document.querySelectorAll('.s-btn');

const time = document.querySelector('.time');
const todate = document.querySelector('.date');
const today = document.querySelector('.day');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const startSw = document.getElementById('startBtn');
const pauseTSw = document.getElementById('pauseBtn');
const resetSw = document.getElementById('resetBtn');
const swTime = document.querySelector(".sw-time");
let swHrs = 0;
let swMins = 0;
let swSecs = 0;
let swInterval = null;
let isRunning = false;

const timerDisplay = document.querySelector(".timer-display");
const timerHours = document.getElementById("hoursInput");
const timerMinutes = document.getElementById("minutesInput");
const timerSeconds = document.getElementById("secondsInput");
const startTimer = document.getElementById('startTimer');
const pauseTimer = document.getElementById('pauseTimer');
const resetTimer = document.getElementById('resetTimer');
let totalSeconds = 0;
let timerRunning = false;
let timerInterval = null;

const alarmInput = document.getElementById('alarmTime');
const setAlarm = document.getElementById('setAlarm');
const clearAlarm = document.getElementById('clearAlarm');
const alarmStatus = document.getElementById('alarmStatus'); 
let alarmRunning = false;
let alarmTime = null;


function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const sec = now.getSeconds();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    time.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    todate.innerHTML = `${date} ${month} ${year}`;
    today.innerHTML = `${day}`;
}

updateTime();
setInterval(updateTime, 1000);

function updateStockwatch() {
    swSecs++;
    if (swSecs === 60) {
        swSecs = 0;
        swMins++;
    }
    if (swMins === 60) {
        swMins = 0;
        swHrs++;
    }
    swTime.innerHTML = `${swHrs.toString().padStart(2, '0')}:${swMins.toString().padStart(2, '0')}:${swSecs.toString().padStart(2, '0')}`;
}

startSw.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    swInterval = setInterval(updateStockwatch, 1000);
});

pauseTSw.addEventListener('click', () => {
    clearInterval(swInterval);
    isRunning = false;
})

resetSw.addEventListener('click', () => {
    clearInterval(swInterval);
    isRunning = false;
    swHrs = 0;
    swMins = 0;
    swSecs = 0;
    swTime.innerHTML = `${swHrs.toString().padStart(2, '0')}:${swMins.toString().padStart(2, '0')}:${swSecs.toString().padStart(2, '0')}`;
});

function updateTimer() {
    if(totalSeconds <= 0) {
        timerRunning = false;
        clearInterval(timerInterval);
        alert("time's up");
        return;
    }
    totalSeconds--;
    const hrs = Math.floor(totalSeconds/3600);
    const mins = Math.floor((totalSeconds%3600)/60);
    const secs = totalSeconds%60;
    timerDisplay.innerHTML = `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}

startTimer.addEventListener('click', () => {
    if(timerRunning) return;
    const hrs = Number(timerHours.value) || 0;
    const mins= Number(timerMinutes.value) || 0;
    const secs  = Number(timerSeconds.value) || 0;
    if(totalSeconds === 0){
        totalSeconds = hrs*3600+mins*60+secs;
        if (totalSeconds <= 0) {
            alert('enter valid number') 
            return;
        }
        updateTimer();
    }
    timerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
});

pauseTimer.addEventListener('click', () => {
    timerRunning = false;
    clearInterval(timerInterval);
});

resetTimer.addEventListener('click', () => {
    timerRunning = false;
    clearInterval(timerInterval);
    totalSeconds = 0;
    timerDisplay.innerHTML = "00:00:00"; 
});

setAlarm.addEventListener('click', ()=>{
    if (alarmInput.value === "") {
        alert("Select a time.");
        return;
    }
    alarmTime = alarmInput.value;
    alarmRunning = true;
    alarmStatus.textContent = `Alarm is set ${alarmTime}`
});

clearAlarm.addEventListener('click', () =>{
    alarmRunning = false;
    alarmStatus.textContent = "No Alarm Set"; 
    alarmInput.value = "";
} );

function fireAlarm () {
    if(!alarmRunning) return;
    const now = new Date();
    let mins = now.getMinutes().toString().padStart(2,'0');
    let hrs = now.getHours().toString().padStart(2,'0');
    let currentTime = `${hrs}:${mins}`;
    if (currentTime === alarmTime) {
        alert('⏰ Alarm!');
        alarmRunning = false;
        alarmTime = null;
        alarmStatus.textContent = "No Alarm Set"; 
    }
}

setInterval(fireAlarm,1000);

function hideAll() {
    sections.forEach((sec) => {
        sec.classList.add('hidden');
    });
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        hideAll();
        const target = button.dataset.target;
        const section = document.querySelector(`.${target}`);
        section.classList.remove('hidden');

    });
});




