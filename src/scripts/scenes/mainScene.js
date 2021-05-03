import PhaserLogo from '../objects/phaserLogo';
import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  

  constructor() {
    super({ key: 'MainScene' })
  }
  preload() {
    this.load.image('background', 'assets/menu/mainbg.png');
    this.load.image('buttonBG', 'assets/menu/buttona.png');
    this.load.image('buttonBH', 'assets/menu/buttonb.png');
    this.load.image('buttonBI', 'assets/menu/buttonc.png');
    this.load.image('buttonBJ', 'assets/menu/buttond.png');
    this.load.image('buttonBK', 'assets/menu/sound.png');
  }
  create() {
    var bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);

    var title = this.add.text(260,80, 'Welcome to Dark-Corners!', {fontFamily:'Anton'}, {fontSize:'40px'});
    var titlemenu = this.add.text(310,130, 'MAIN MENU', {fontFamily:'Anton'}, {fontSize:'500px'});
    var button1 = this.add.image(350,180, 'buttonBG').setInteractive();
    var button2 = this.add.image(350,240, 'buttonBH').setInteractive();
    var button3 = this.add.image(350,300, 'buttonBI').setInteractive();
    var button4 = this.add.image(350,360, 'buttonBJ').setInteractive();
    var button5 = this.add.image(700,520, 'buttonBK').setInteractive();

    button1.on('pointerdown', function () {

        this.scene.start('GameScene');

    }, this);

    button2.on('pointerdown', function () {

        //this.scene.start('MainMenu');

    }, this);

    button3.on('pointerdown', function () {

        this.scene.start('StatsScene')

    }, this);

    button4.on('pointerdown', function () {

        this.scene.start('HelpScene')

    }, this);

    button5.on('pointerdown', function () {

        //this.scene.start('MainMenu');
        //var sb = new SoundButtons({
        //    scene: this
        //});

    }, this);

    /**
     * Delete all the code below to start a fresh scene
     */
    //new PhaserLogo(this, this.cameras.main.width / 2, 0)
    //this.fpsText = new FpsText(this)

    // async/await example
    //const pause = ms => {
    //  return new Promise(resolve => {
    //    window.setTimeout(() => {
    //      resolve()
    //    }, ms)
    //  })
    //}
    //const asyncFunction = async () => {
    //  console.log('Before Pause')
    //  await pause(4000) // 4 seconds pause
    //  console.log('After Pause')
    //}
    //asyncFunction()

    // Spread operator test
    //const numbers = [0, 1, 2, 3]
    //const moreNumbers = [...numbers, 4, 5]
    //console.log(`All numbers: ` + moreNumbers)

    // display the Phaser.VERSION
    //this.add
    //  .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
    //    color: '#000000',
    //    fontSize: 24
    //  })
    //  .setOrigin(1, 0)
  }

  update() {
    //this.fpsText.update()
  }
}
