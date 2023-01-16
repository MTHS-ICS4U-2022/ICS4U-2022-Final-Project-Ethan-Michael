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
  EIGHT = 8,
  COVERED = 9,
  FLAGGED = 10,
  MINE = 11,
  BLOWNMINE = 12,
  WRONGMINE = 13,
}

class square extends Phaser.GameObjects.Sprite {
  constructor(board, scene, x, y, xpos, ypos, mine) {
    let default_state = cell_states.COVERED
    super(scene, x, y, 'board', default_state)
    scene.add.existing(this)
    this.x = x
    this.y = y
    this.xpos = xpos
    this.ypos = ypos
    this.already_clicked = false
    this.board = board
    this.mined = mine
    this.flagged = false
    this.cellState = cellStates.COVERED
    this.nearby_mines = 0
    this.setInteractive()
    this.on('pointerdown', this.click)
  }

  click () {
    if (game.input.activePointer.rightButtonDown()) {
      this.rightClick()
    } else {
      this.leftClick()
    }
  }

    leftClick () {
      if (this.cellState != cellStates.FLAGGED) {
        if (this.board.clickCount == 0) {
          do {
            this.board.createRandomMines();
          } while (this.mined)
        }
        this.board.clickCount++
      }

      if (this.mined) {
        for (let counter = 0; counter < this.board.cells.length; counter++) {
          for (let counter2 = 0; counter2 < this.board.cells[0].length; counter2++) {
            if (this.board.cells[counter[counter2].mined) {
              this.board.cells[counter][counter2].setState(cellStates.MINE);
            } else if (this.board.cells[counter][counter2].flagged) {
              this.board.cells[counter][counter2].setState(cellStates.WRONGMINE);
            }
          }
        }
        this.setState(cellStates.BLOWNMINE);
      } else {
        this.discoverBoard();
      }
  }

  rightClick () {
    if (this.cellState == cellStates.COVERED || this.cellState == cellStates.FLAGGED) {
      this.flagged = !this.flagged;
      this.setState(this.flagged ? cellStates.FLAGGED : cellStates.COVERED);
    }
  }

  discoverBoard (numMines) {
    let mines = this.getNearbyMines()
    
    if (!numMines) {
      numMines = 0
    }
    
    if (mines > 0) {
      numMines++
    }
    
    if (!this.mined) {
      this.setState(mines)
    }
    this.already_clicked = true
      
    for (let counter = this.xpos - 1; counter <= this.xpos + 1; counter++) {
      for (let counter2 = this.ypos - 1; counter2 <= this.ypos + 1; counter2++) {
        if (counter != this.xpos && counter2 != this.ypos) {
          if (counter > -1 && counter < this.board.cells.length && counter2 > -1 && counter2 < this.board.cells[0].length) {
            if (!this.board.cells[counter][counter2].already_clicked && this.board.cells[counter][counter2].cellState != cellStates.FLAGGED) {
              if (numMines > 0) {
                return
              }
              this.board.cells[counter][counter2].discoverBoard(numMines);
            }
          }
        }
      }
    }
  }

  getNearbyMines () {
    let sum = 0;
    for (let counter = this.xpos - 1; counter <= this.xpos + 1; counter++) {
      for (let counter2 = this.ypos - 1; counter2 <= this.ypos + 1; counter2++) {
        if (counter != this.xpos && counter2 != this.ypos) {
          if (counter > -1 && counter < this.board.cells.length && counter2 > -1 && counter2 < this.board.cells[0].length)
            sum += this.board.cells[counter][counter2].mined ? 1 : 0;
          }
        }
      }
    return sum;
  }
  setState (state) {
    this.cellState = state
    this.setFrame(state)
  }
}

export default square