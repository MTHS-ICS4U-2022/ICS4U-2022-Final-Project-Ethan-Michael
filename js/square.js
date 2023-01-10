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

class SquareScreen extends Phaser.GameObjects.Sprite {
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

  rightClick () {
    if (this.cell_state == cellStates.COVERED || this.cell_state == cellStates.FLAGGED) {
      this.flagged = !this.flagged;
      this.setState(this.flagged ? cellStates.FLAGGED : cellStates.COVERED);
    }
  }

  discoverBoard (flag) {
    
  }
}

export default SquareScreen