/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// End Screen


class EndScreen extends Phaser.Scene {
  initialize () {
    Phaser.Scene.call(this, { key: "endScreen", active: true });
  }
  
  preload () {
    this.load.image('lost', "assets/you_lost_screen.png");
  }

  create () {
    //let text = this.add.text(100, 100, 'Welcome to The Minesweeper Game').setOrigin(0.5);
    //text.setFontSize(15)
    this.add.image(10, 10, 'lost')
  }
}
export default EndScreen