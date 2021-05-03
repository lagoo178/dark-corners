import Phaser from 'phaser';

export default class statsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StatsScene' })
    }
    preload() {
        this.load.image('backgroundc', 'assets/menu/stats.png');
        this.load.image('buttonbackb', 'assets/menu/back.png');
    }
    create() {
        //emitter = new Phaser.Events.EventEmitter();
        //controller = new Controller();
        var bg = this.add.sprite(0,0,'backgroundc');
        bg.setOrigin(0,0);

    
        var buttonz = this.add.image(700,520, 'buttonbackb').setInteractive();

        buttonz.on('pointerdown', function () {

            this.scene.start('MainScene')

        }, this);  
    }
    update() {
        
    }
}