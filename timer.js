/* global Phaser */

// Copyright (c) 2020 Ethan Prieur All rights reserved
//
// Created by: Ethan Prieur
// Created on: Jan 2023
// This is the timer file


let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;

document.getElementById('startTimer').addEventListener('click', () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);
});

document.getElementById('pauseTimer').addEventListener('click', () => {
  clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timerRef.innerHTML = '00 : 00 : 00 : 000 ';
});

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let hour = hours < 10 ? "0" + hours : hours;
  let minute = minutes < 10 ? "0" + minutes : minutes;
  let second = seconds < 10 ? "0" + seconds : seconds;
  let milli = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

  timerRef.innerHTML = ` ${hour} : ${minute} : ${second} : ${milli}`;
}