/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// Main game file

import TitleScreen from './titleScreen.js'
import GameScreen from './gameScreen.js'

// Game scenes
const gameScreen = new GameScreen()
const titleScreen = new TitleScreen()

const config = {
  type: Phaser.AUTO,
  width: 500, 
  height: 500,
  disableContextMenu: true,
  pixelArt: true,
  // set background color
  backgroundColor: 0x57929e,
}

const game = new Phaser.Game(config)

// load scenes
game.scene.add('gameScreen', gameScreen)
game.scene.add('titleScreen', titleScreen)
game.scene.start('titleScreen')

export default game