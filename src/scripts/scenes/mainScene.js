import PhaserLogo from '../objects/phaserLogo';
import Phaser from 'phaser';

var button1;
var button2;
var button3;
var button4;
var button5;
var button6;

export default class MainScene extends Phaser.Scene {
  

  constructor() {
    super({ key: 'MainScene' })
  }

  init(data) {
    this.soundtrack = data.soundtrack;
  }

  create() {
    var bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);
    this.mute = this.add.image(40, 40, 'soundoff').setScale(0.8).setAlpha(0);
    this.play = this.add.image(40, 40, 'soundon').setScale(0.8).setAlpha(1);
    var tittle1 = this.add.image(620,70, 'tittle');
    //var titlemenu = this.add.text(600,130, 'MAIN MENU', {fontFamily:'Anton'}, {fontSize:'1200px'});
    button1 = this.add.image(650,190, 'buttonBG').setInteractive();
    button3 = this.add.image(650,260, 'buttonBI').setInteractive();
    button4 = this.add.image(650,330, 'buttonBJ').setInteractive();
    button6 = this.add.image(650,400, 'buttonBL').setInteractive();
    this.menuKeys = this.input.keyboard.addKeys('m');


    button1.on('pointerdown', function () {

        this.scene.start('GameScene');

    }, this);

    button3.on('pointerdown', function () {

        this.scene.start('StatsScene')

    }, this);

    button4.on('pointerdown', function () {

        this.scene.start('HelpScene')

    }, this);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.m)) {
      this.game.config.musicStatus = !this.game.config.musicStatus;
      this.game.config.musicStatus ? this.play.setAlpha(1) : this.play.setAlpha(0);
      this.game.config.musicStatus ? this.mute.setAlpha(0) : this.mute.setAlpha(1);
      this.game.config.musicStatus ? this.soundtrack.play() : this.soundtrack.stop();
    }
  }
}
