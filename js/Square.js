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
  CLICKCOUNT: 0,
}

const squareConsts = {
  CELLS: [],
  WIDTH: 10,
  HEIGHT: 10,
  CLICKCOUNT: 0,
}

class Square extends Phaser.GameObjects.Sprite {
  constructor(board, scene, x, y, xpos, ypos, mine) {
    let default_state = cellStates.COVERED

    super(board, scene, x, y, xpos, ypos, default_state)
    board.scene.add.existing(this)

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

    for (let counter = 0; counter < squareConsts.WIDTH; counter++) {
      squareConsts.CELLS[counter] = []
      for (let counter2 = 0; counter2 < squareConsts.HEIGHT; counter2++) {
        squareConsts.CELLS[counter][counter2] = new Square(this, scene, x + 16 * counter, y + 16 * counter2, counter, counter2, false)
      }
    }
  }

  createRandomMines () {
    let mineCount = 0
    while (mineCount < mines) {
      let rand_x = Math.floor(Math.random() * squareConsts.WIDTH)
      let rand_y = Math.floor(Math.random() * squareConsts.HEIGHT)
      
      if (squareConsts.CELLS[rand_x][rand_y].mined) {
        squareConsts.CELLS[rand_x][rand_y].mined = true;
        mineCount++;
      }
    }
  }

  click () {
    if (this.input.activePointer.rightButtonDown()) {
      this.rightClick()
    } else {
      this.leftClick()
    }
  }

    leftClick () {
      if (this.cellState != cellStates.FLAGGED) {
        if (cellStates.CLICKCOUNT == 0) {
          do {
            this.createRandomMines();
          } while (this.mined)
        }
        cellStates.CLICKCOUNT++
      }

      if (this.mined) {
        for (let counter = 0; counter < squareConsts.CELLS.length; counter++) {
          for (let counter2 = 0; counter2 < squareConsts.CELLS[0].length; counter2++) {
            if (squareConsts.CELLS[counter][counter2].mined) {
              squareConsts.CELLS[counter][counter2].setState(cellStates.MINE);
            } else if (squareConsts.CELLS[counter][counter2].flagged) {
              squareConsts.CELLS[counter][counter2].setState(cellStates.WRONGMINE);
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
          if (counter > -1 && counter < squareConsts.CELLS.length && counter2 > -1 && counter2 < squareConsts.CELLS[0].length) {
            if (!squareConsts.CELLS[counter][counter2].already_clicked && squareConsts.CELLS[counter][counter2].cellState != cellStates.FLAGGED) {
              if (numMines > 0) {
                return
              }
              squareConsts.CELLS[counter][counter2].discoverBoard(numMines);
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
          if (counter > -1 && counter < squareConsts.CELLS.length && counter2 > -1 && counter2 < squareConsts.CELLS[0].length)
            sum += squareConsts.CELLS[counter][counter2].mined ? 1 : 0;
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
export default Square