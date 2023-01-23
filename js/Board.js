/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// Board class

import game from './game.js'

const cell_states = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    COVERED: 9,
    FLAGGED: 10,
    MARKED: 11,
    GRAY_MINE: 12,
    RED_MINE: 13,
    WRONG_MINE: 14,
    MARKED_CLICKED: 15,
};

class Cell extends Phaser.GameObjects.Sprite {
  constructor(board, scene, x, y, xpos, ypos, mine) {
    let default_state = cell_states.COVERED;
    
    super(scene, x, y, 'board', default_state);
    scene.add.existing(this);
    
    this.x = x;
    this.y = y;
    this.xpos = xpos;
    this.ypos = ypos;
    this.already_clicked = false;
    this.board = board;
    this.mined = mine;
    this.flagged = false;
    this.cell_state = cell_states.COVERED;
    this.nearby_mines = 0;
    
    this.click = function () {
      if (game.input.activePointer.rightButtonDown()) {
        this.rightClick();
      } else {
        this.leftClick();
      }
    };
    
    this.leftClick = function () {
      console.log(this.cell_state);
      if (!(this.cell_state == cell_states.FLAGGED)) {
        if (this.board.click_count == 0) {
          do {
            this.board.createRandomMines();
          } while (this.mined);
        }
        
        this.board.click_count++;
        
        if (this.mined) {
          for (let counter = 0; counter < this.board.cells.length; counter++) {
            for (let counter2 = 0; counter2 < this.board.cells[0].length; counter2++) {
              if (this.board.cells[counter][counter2].mined) {
                this.board.cells[counter][counter2].setState(cell_states.GRAY_MINE);
              } else if (this.board.cells[counter][counter2].flagged) {
                this.board.cells[counter][counter2].setState(cell_states.WRONG_MINE);
              }
            }
          }
          this.setState(cell_states.RED_MINE);
        } else {
          this.discoverBoard();
        }
      }
    };
    
    this.rightClick = function () {
      if (this.cell_state == cell_states.COVERED || this.cell_state == cell_states.FLAGGED) {
        this.flagged = !this.flagged;
        this.setState(this.flagged ? cell_states.FLAGGED : cell_states.COVERED);
      }
    };
    
    this.discoverBoard = function (flag) {
      let mines = this.getNearbyMines();
      
      if (!flag) {
        flag = 0;
      }
      
      if (mines > 0) {
        flag++;
      }
      
      if (!this.mined) {
        this.setState(mines);
      }
      
      this.already_clicked = true;
      
      for (let counter = this.xpos - 1; counter <= this.xpos + 1; counter++) {
        for (let counter2 = this.ypos - 1; counter2 <= this.ypos + 1; counter2++) {
          if (!(counter == this.xpos && counter2 == this.ypos)) {
            if (counter > -1 && counter < this.board.cells.length && counter2 > -1 && counter2 < this.board.cells[0].length) {
              if (!this.board.cells[counter][counter2].already_clicked && this.board.cells[counter][counter2].cell_state != cell_states.FLAGGED) {
                if (flag > 0) {
                  return;
                }
                this.board.cells[counter][counter2].discoverBoard(flag);
              }
            }
          }
        }
      }
    };
    
    this.getNearbyMines = function () {
      let sum = 0;
      for (let counter = this.xpos - 1; counter <= this.xpos + 1; counter++) {
        for (let counter2 = this.ypos - 1; counter2 <= this.ypos + 1; counter2++) {
          if (!(counter == this.xpos && counter2 == this.ypos)) {
            if (counter > -1 && counter < this.board.cells.length && counter2 > -1 && counter2 < this.board.cells[0].length)
              sum += this.board.cells[counter][counter2].mined ? 1 : 0;
          }
        }
      }
      return sum;
    };
    
    this.setState = function (state) {
      this.cell_state = state;
      this.setFrame(state);
    };
    
    this.setInteractive();
    this.on('pointerdown', this.click);
  }
}

class Board {
  constructor(scene, x, y, width, height, mines) {
    this.cells = [];
    this.click_count = 0;
    
    for (let counter = 0; counter < width; counter++) {
      this.cells[counter] = [];
      for (let counter2 = 0; counter2 < height; counter2++) {
        this.cells[counter][counter2] = new Cell(this, scene, x + 16 * counter, y + 16 * counter2, counter, counter2, false);
      }
    }
    
    this.createRandomMines = function () {
      let mine_count = 0;
      while (mine_count < mines) {
        let rand_x = Math.floor(Math.random() * width);
        let rand_y = Math.floor(Math.random() * height);
        
        if (!this.cells[rand_x][rand_y].mined) {
          this.cells[rand_x][rand_y].mined = true;
          mine_count++;
        }
      }
    };
  }
}

export default Board