/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// Starting Screen


class TitleScreen extends Phaser.Scene {
  initialize () {
    Phaser.Scene.call(this, { key: "titleScreen", active: true });
  }
  
  preload () {
    this.cameras.main.setBackgroundColor("#C0C0C0");
  }

  create () {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    let text = this.add.text(screenCenterX, screenCenterY, 'Welcome to The Minesweeper Game').setOrigin(0.5);
    let text2 = this.add.text(screenCenterX + 20, screenCenterY + 20, 'You can start playing the game by pressing S').setOrigin(0.5);
    text.setFontSize(15)
    text2.setFontSize(15)
  }

  update (time, delta) {
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    if (keyS.isDown) {
      this.scene.switch('gameScreen')
    }
  }
}
export default TitleScreen