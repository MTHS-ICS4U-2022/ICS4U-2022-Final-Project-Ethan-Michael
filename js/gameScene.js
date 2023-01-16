/* global Phaser */

// Copyright (c) 2020 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Dec 2022
// This is the Game Scene

import Board from './Board.js'

const board = new Board(this, 130, 130, 15, 15, 15)

class gameScene extends Phaser.Scene {
  preload () {
    this.load.spritesheet('board', 'assets/board.png', { frameWidth: 16, frameHeight: 16 })
  }

  create () {
    this.add.sprite(board)
  }
}

export default gameScene