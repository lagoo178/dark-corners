import PhaserLogo from '../objects/phaserLogo';
import Phaser from 'phaser';

var text;
var button;
var ipsum = "\n\nCreated By : \n\n•  Sutan Daffa Satria Hertanto (Gameplay & AI Programmer)\n\n• Laila Lutfiah (Game Artist & Level Programmer) \n\nPublished and Owned By : \n\nPoliteknik Negeri Jakarta \n\nTools used : \n\n•  Javascript ES6 \n\n•  JSON \n\n•  Github \n\n•  Tiled \n\n• Webpack \n\n• Babel \n\n• NPM \n\n• Phaser 3 \n\n•  Sublime Text Editor \n\n• MAGIX ACID Music Studio 10 \n\n•  MAGIX SoundForge Audio Studio 10 \n\n•  Adobe Photoshop CC 2021 \n\nAssets Used : \n\n• Ross Burgen & Ethan Munrau – The Wasteland (As Main Theme) \n\n•  Kenney’s Top Down Shooter Pack (For Some Tileset) \n\n• Poncho Veloso Rulloda's Art - Abandoned Hospital \n\n•  Fantasy game UI by Imogia on DevianArt \n\nCOPYRIGHT © POLITEKNIK NEGERI JAKARTA 2021 / ALL RIGHTS RESERVED";


//  h = horizontal, v = vertical
//  a = the text alignment (see comments below)
var align = [ 
    { h: 'left', v: 'top', a: 'left' },
    { h: 'center', v: 'top', a: 'center' },
    { h: 'right', v: 'top', a: 'right' },
    { h: 'left', v: 'middle', a: 'left' },
    { h: 'center', v: 'middle', a: 'center' },
    { h: 'right', v: 'middle', a: 'right' },
    { h: 'left', v: 'bottom', a: 'left' },
    { h: 'center', v: 'bottom', a: 'center' },
    { h: 'right', v: 'bottom', a: 'right' }
];

var i = 0;


export default class creditScene extends Phaser.Scene {
  

  constructor() {
    super({ key: 'CreditScene' })
  }
  preload() {
    this.load.image('backgrounde', 'assets/menu/stats-bg.png');
    this.load.image('buttonbacke', 'assets/menu/buttonback.png');
  }
  create() {
    //emitter = new Phaser.Events.EventEmitter();
        //controller = new Controller();

        //var title = this.add.text(600,130, 'Credits..........', {fontFamily:'Anton'}, {fontSize:'1200px'});

        var bg1 = this.add.image(0,0,'backgrounde');
        bg1.setOrigin(0,0);


    
        var buttonkm = this.add.image(1050,680, 'buttonbacke').setInteractive();

        buttonkm.on('pointerdown', function () {

        this.scene.start('MainScene')

        }, this); 

         var style = { font: "11px Arial", fill: "#fff", 
          align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
          boundsAlignH: "left", 
          boundsAlignV: "top", 
          wordWrap: true, wordWrapWidth: 300 };

          text = this.add.text(450, 0, ipsum, style);

          //this.setTextBounds(16, 16, 768, 568);

          //this.input.onDown.add(changeAlign);


  }

  changeAlign() {

    i++;

    if (i === align.length)
    {
        i = 0;
    }

    //  Un-comment this line to keep the text left-aligned
    text.align = align[i].a;

    text.boundsAlignH = align[i].h;
    text.boundsAlignV = align[i].v;

}
  update() {
    //this.fpsText.update()
  }
}


