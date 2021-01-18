'use strict';

/**
 * SIMPLE POMODORO
 */

//Create temp variables
let timerId = 0;
let state = 0;
let isActive = false;

//Local store
let data = {
    min: 0,
    sec: 0,
    shortT: 0,
    longT: 0
};

//Config minutes input
const min = document.querySelector('.pomodoro-minutes');
min.addEventListener('change', () => check(min.value, '25'));

//Config seconds input
const sec = document.querySelector('.pomodoro-seconds');
sec.addEventListener('change', () => check(sec.value, '0'));

//Config longBreak input
const longT = document.querySelector('.pomodoro-long-break');
longT.addEventListener('change', () => check(longT.value, '15'));

//Config shortBreak input
const shortT = document.querySelector('.pomodoro-short-break');
shortT.addEventListener('change', () => check(shortT.value, '5'));

//Init timer
const timer = document.querySelector('.pomodoro-timer');

refreshData();
timer.innerText = `${timeView(data.min)}:${timeView(data.sec)}`;

//Config start button
const start = document.querySelector('.pomodoro-start');
start.addEventListener('click', () => {
    document.querySelectorAll('input').forEach((item) => item.disabled = true);
    document.querySelector('.pomodoro-restart').disabled = true;
    start.disabled = true;
    count(data.min, data.sec);
});


//Config stop button
const stop = document.querySelector('.pomodoro-stop');
stop.addEventListener('click', () => {
    document.querySelectorAll('input').forEach((item) => item.disabled = false);
    document.querySelector('.pomodoro-restart').disabled = false;
    clearInterval(timerId);
});

//Config restart button
const restart = document.querySelector('.pomodoro-restart');
restart.addEventListener('click', () => {
    refreshData();
    timer.innerText = `${timeView(data.min)}:${timeView(data.sec)}`;
});

//Start timer
function count(min, sec) {
    timerId = setInterval(() => {
        data.min = min;
        data.sec = sec--;
        timer.innerText = `${timeView(data.min)}:${timeView(data.sec)}`;
        if (data.min === 0 && data.sec === 0) {
            isActive = !isActive;
            wait(timerId);
        } else if (data.sec === 0) {
            --min;
            sec = 59;
        }
    }, 1000);
}

//Chose scenario
function wait(timerId) {
    clearInterval(timerId);
    if (!isActive) {
        count(+min.value, +sec.value);
    } else if (!Boolean(state % 4)) {
        state = 0;
        count(data.longT, 0);
    } else {
        state++;
        count(data.shortT, 0);
    }
}

//Check number format for inputs
const regEx = new RegExp('[0-9]');

function check(val, def) {
    if (!(val).match(regEx) || +val < 0 || +val > 59) {
        alert('Only numbers are available! Value should be 0-59 only!');
        val.value = def;
    }
}

function refreshData() {
    data.min = Number(min.value);
    data.sec = Number(sec.value);
    data.shortT = Number(shortT.value);
    data.longT = Number(longT.value);
}

function timeView(time) {
    if (String(time).length < 2) {
        time = `0${time}`;
    }
    return time;
}