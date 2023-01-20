/* global Phaser */

// Copyright (c) 2023 Michael Clermont All rights reserved
//
// Created by: Michael Clermont
// Created on: Jan 2023
// This is the square sprite

class singleSquare extends Phaser.GameObjects.Sprite {
  constructor (config) {

    super(config.scene, config.x, config.y, 'board', 9)
    config.scene.add.existing(this)
  }
}
export default singleSquare