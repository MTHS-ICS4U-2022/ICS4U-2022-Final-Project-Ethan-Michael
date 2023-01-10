/* global Phaser */

// Copyright (c) 2020 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Dec 2022
// This is the Game Scene

import Square from './square.js'

class GameScreen extends Phaser.Scene {
  preload() {
    // images
    this.load.spritesheet('board', 'assets/board.png', { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    let board = new Board(this, 130, 130, 15, 15, 15);
  }
}

export default GameScreen