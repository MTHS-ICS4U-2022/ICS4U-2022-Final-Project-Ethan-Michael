/* global Phaser */

// Copyright (c) 2020 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Dec 2022
// This is the Game Scene 

import Board from './Square.js'

class gameScene extends Phaser.Scene {
  preload () {
    this.load.spritesheet("board", "assets/board.png", { frameWidth: 16, frameHeight: 16 })
    this.load.audio('explosion', 'assets/8bit_bomb_explosion.wav')
  }

  create () {
    this.cell = this.add.sprite(100, 100, 'board', 9)
    this.board = new Board(this, 130, 130, 15, 15, 15)
  }
}

export default gameScene