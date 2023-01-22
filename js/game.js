/* global Phaser */

// Copyright (c) 2022 Michael Clermont All rights reserved
//
// Created By: Michael Clermont
// Created on: Dec 2022
// Hello World program

import Board from './Board.js'

let TitleScreen = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function TitleScreen() {
        Phaser.Scene.call(this, { key: "titleScreen", active: true });
    },

    preload: function () {
        this.cameras.main.setBackgroundColor("#C0C0C0");

    },

    create: function () {
        this.add.text(20, 20, "Loading...");
    }
})

let GameScreen = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function GameScreen() {
        Phaser.Scene.call(this, { key: "gameScreen", active: true });
    },

    preload: function () {
        this.load.spritesheet("board", "assets/board.png", { frameWidth: 16, frameHeight: 16 });
    },

    create: function () {
        //this.cell = this.add.sprite(10, 10, "board", 2);
        //this.cell.setInteractive();
        let board = new Board(this, 130, 130, 15, 15, 15);
    }
})

let config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    scene: [TitleScreen, GameScreen],
    disableContextMenu: true,
    pixelArt: true
};

let game = new Phaser.Game(config);

export default game