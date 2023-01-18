/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// Hello World program

import Square from './Square.js'

class Board extends Square {
  constructor(scene, x, y, width, height, mines) {
    //super(scene, x, y, width, height, mines)
    this.cells = []
    this.clickCount = 0

    for (let counter = 0; counter < width; counter++) {
      cells[counter] = []
      for (let counter2 = 0; counter2 < height; counter2++) {
        this.cells[counter][counter2] = new Square(this, scene, x + 16 * counter, y + 16 * counter2, counter, counter2, false)
      }
    }
    
    this.createRandomMines = function () {
      let mineCount = 0
      while (mineCount < mines) {
        let rand_x = Math.floor(Math.random() * width)
        let rand_y = Math.floor(Math.random() * height)
            
        if (!this.cells[rand_x][rand_y].mined) {
          this.cells[rand_x][rand_y].mined = true;
          mineCount++;
        }
      }
    }
  }
}
export default Board