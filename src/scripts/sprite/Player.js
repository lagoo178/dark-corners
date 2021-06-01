import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 0.5);
        this.setDisplaySize(60, 60);
        this.health = 3;
        this.score = 0;
        this.hurtFlag = false;
        this.kills = 0;
        this.shots = 0;
        this.scoreCalc = 0;
    }
}
