import PhaserLogo from '../objects/phaserLogo';
import Phaser from 'phaser';

export default class helpScene extends Phaser.Scene {
  

  constructor() {
    super({ key: 'HelpScene' })
  }
  create() {
    //emitter = new Phaser.Events.EventEmitter();
        //controller = new Controller();
        var bg = this.add.sprite(0,0,'backgroundd');
        bg.setOrigin(0,0);

    
        var buttonm = this.add.image(1050,680, 'buttonbackc').setInteractive();

        buttonm.on('pointerdown', function () {

            this.scene.start('MainScene')

        }, this); 
  }

  update() {
    //this.fpsText.update()
  }
}