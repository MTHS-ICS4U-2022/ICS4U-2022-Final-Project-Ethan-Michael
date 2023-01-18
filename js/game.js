/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// Hello World program

import GameScene from './gameScene.js'

// Game scenes
const gameScene = new GameScene()

const config = {
  type: Phaser.AUTO,
  width: 1920, 
  height: 1080,
  disableContextMenu: false,
  pixelArt: true,
  // set background color
  backgroundColor: 0x57929e,
}

const game = new Phaser.Game(config)

// load scenes
game.scene.add('gameScene', gameScene)
game.scene.start('gameScene')