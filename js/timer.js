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