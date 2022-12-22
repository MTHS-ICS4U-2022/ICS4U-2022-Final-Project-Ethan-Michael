/* global Phaser */

// Copyright (c) 2020 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Dec 2022
// This is the Game Scene

class GameScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScreen' })
  }

  preload() {
    // images
    this.load.image('board', 'assets/board.png');
  }

  create() {
    this.background = this.add.image(130, 130, 'board');
  }
}

export default GameScreen