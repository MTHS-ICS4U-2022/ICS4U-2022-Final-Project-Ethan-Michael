/* global Phaser */

// Copyright (c) 2020 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Dec 2022
// This is the Game Scene

import Square from './Square.js'

class gameScene extends Phaser.Scene {
  preload () {
    this.load.spritesheet('board', 'assets/board.png', { frameWidth: 16, frameHeight: 16 })
  }

  create () {
    let square = new Square(this, 130, 130, 15, 15, 15)
  }
}

export default gameScene