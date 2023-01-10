/* global Phaser */

// Copyright (c) 2023 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Jan 2023
// This is the square sprite

const cellStates = {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 9,
  COVERED = 10,
  FLAGGED = 11,
  MINE = 12,
  BLOWNMINE = 13
}

class Square extends Phaser.GameObjects.Sprite {
  leftClick () {
    game.input.mouse.capture = true;
    if (game.input.activePointer.leftButton.isDown === true) {
      game.stage.backgroundColor = "#4488AA";
    }
  }
}

export default Square