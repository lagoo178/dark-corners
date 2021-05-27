import Phaser from 'phaser';

export default class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.setCollideWorldBounds(false);
        this.health = 5;
        this.setDisplaySize(60, 60);
        this.setOrigin(0.5, 0.5);
        this.play('zombie-idle');
    }

    
}
