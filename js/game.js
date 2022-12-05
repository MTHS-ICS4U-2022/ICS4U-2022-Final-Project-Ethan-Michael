/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// Hello World program

class Demo extends Phaser.Scene {
  create() {
    var rect = this.add.rectangle(100, 100, 30, 30, 0x1aff1a);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  // set background color
  backgroundColor: 0x00cc66,
  scene: Demo,
};

const game = new Phaser.Game(config);