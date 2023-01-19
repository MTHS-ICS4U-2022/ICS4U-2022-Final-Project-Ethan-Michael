/* global Phaser */

// Copyright (c) 2023 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Jan 2023
// This is the square sprite

const cellStates = {
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
  MINE: 11,
  BLOWNMINE: 12,
  WRONGMINE: 13,
}

class Cell extends Phaser.GameObjects.Sprite {
  constructor(board, scene, x, y, xpos, ypos, mine) {
    let default_state = cellStates.COVERED
    
    super(board, scene, x, y, 'board', ypos, default_state)
    scene.add.existing(this)

    this.x = x
    this.y = y
    this.xpos = xpos
    this.ypos = ypos
    this.already_clicked = false
    this.board = board
    this.mined = mine
    this.flagged = false
    this.cell_state = cellStates.COVERED
    this.nearby_mines = 0;

    this.click = function () {
      if (game.input.activePointer.rightButtonDown()) {
        this.rightClick();
      } else {
        this.leftClick();
      }
    };
    
    this.leftClick = function () {
      if (!(this.cell_state == cellStates.FLAGGED)) {
        if (this.board.click_count == 0) {
          do {
            this.board.createRandomMines()
          } while (this.mined)
        }
        this.board.click_count++;
        
        if (this.mined) {
          for (let i = 0; i < this.board.cells.length; i++) {
            for (let j = 0; j < this.board.cells[0].length; j++) {
              if (this.board.cells[i][j].mined) {
                this.board.cells[i][j].setState(cellStates.MINE);
              } else if (this.board.cells[i][j].flagged) {
                this.board.cells[i][j].setState(cellStates.WRONGMINE);
              }
            }
          }
          this.setState(cellStates.BLOWNMINE);
        } else {
          this.discoverBoard();
        }
      }
    }
      
    this.rightClick = function () {
      if (this.cell_state == cellStates.COVERED || this.cell_state == cellStates.FLAGGED) {
        this.flagged = !this.flagged;
        this.setState(this.flagged ? cellStates.FLAGGED : cellStates.COVERED);
      }
    }
    this.discoverBoard = function (flag) {
      let mines = this.getNearbyMines();
      
      if (!flag) {
        flag = 0; 
      }
      
      if (mines > 0) {
                flag++
      }
      
      if (!this.mined) {
        this.setState(mines)
      }
      
      this.already_clicked = true
        
      for (let i = this.xpos - 1; i <= this.xpos + 1; i++) {
        for (let j = this.ypos - 1; j <= this.ypos + 1; j++) {
          if (!(i == this.xpos && j == this.ypos)) {
            if (i > -1 && i < this.board.cells.length && j > -1 && j < this.board.cells[0].length) {
              if (!this.board.cells[i][j].already_clicked && this.board.cells[i][j].cell_state != cellStates.FLAGGED) {
                if (flag > 0) {
                  return
                }
                this.board.cells[i][j].discoverBoard(flag);
              }
            }
          }
        }
      }
    }
    
    this.getNearbyMines = function () {
      let sum = 0;
      for (let i = this.xpos - 1; i <= this.xpos + 1; i++) {
        for (let j = this.ypos - 1; j <= this.ypos + 1; j++) {
          if (!(i == this.xpos && j == this.ypos)) {
            if (i > -1 && i < this.board.cells.length && j > -1 && j < this.board.cells[0].length)
              sum += this.board.cells[i][j].mined ? 1 : 0;
          }
        }
      }
      return sum;
    }

    this.setState = function (state) {
      this.cell_state = state;
      this.setFrame(state);
    }

    this.setInteractive()
    this.on('pointerdown', this.click)
  }
}

class Board extends Cell {
  constructor(board, scene, x, y, width, height, mines) {
    this.cells = []
    this.click_count = 0

    for (let i = 0; i < width; i++) {
      this.cells[i] = []
      for (let j = 0; j < height; j++) {
        this.cells[i][j] = new Cell(this, scene, x + 16 * i, y + 16 * j, i, j, false)
      }
    }
    
    this.createRandomMines = function () {
      let mine_count = 0
      while (mine_count < mines) {
        let rand_x = Math.floor(Math.random() * width)
        let rand_y = Math.floor(Math.random() * height)
        
        if (!this.cells[rand_x][rand_y].mined) {
          this.cells[rand_x][rand_y].mined = true;
          mine_count++;
        }
      }
    }
  }
}
export default Cell