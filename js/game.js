/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// Hello World program

import GameScreen from './gameScreen.js'

// Game scenes
const gameScreen = new GameScreen()

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
};

const game = new Phaser.Game(config)

// load scenes
game.scene.add('gameScreen', gameScreen)
game.scene.start('gameScreen')