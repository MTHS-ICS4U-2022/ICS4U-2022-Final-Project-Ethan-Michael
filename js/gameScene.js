/* global Phaser */

// Copyright (c) 2020 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Dec 2022
// This is the Game Scene 

import Square from './Square.js'
import SingleSquare from './singleSquare.js'

class gameScene extends Phaser.Scene {
  preload () {
    this.load.spritesheet("board", "assets/board.png", { frameWidth: 16, frameHeight: 16 })
    this.load.audio('explosion', 'assets/8bit_bomb_explosion.wav')
  }

  create () {
    this.cell = this.add.sprite(100, 100, 'board', 9)
    let singleSquare = new SingleSquare({scene:this, x:100, y:200})
    let square = new Square({scene:this, x:130, y:130, xpos:15, ypos:15, mine:15})
  }
}

export default gameScene