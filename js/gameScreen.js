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
    this.load.image('board', 'assets/red-flag.png')
  }

  create(data) {
    this.board = this.add.image(0, 0, 'board')
  }
}

export default GameScreen