export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.loadBar();
    // Menu
    this.load.image('background', 'assets/menu/bgnew.png');
    this.load.image('stats-bg', 'assets/menu/stats-bg.png');
    this.load.image('tittle', 'assets/menu/darkcorners1.png');
    this.load.image('buttonBG', 'assets/menu/button1.png');
    this.load.image('buttonBH', 'assets/menu/button2.png');
    this.load.image('buttonBI', 'assets/menu/button3.png');
    this.load.image('buttonBJ', 'assets/menu/button4.png');
    this.load.image('buttonBL', 'assets/menu/button5.png');
    this.load.image('soundon', 'assets/menu/buttonon.png');
    this.load.image('soundoff', 'assets/menu/buttonoff.png');
    this.load.image('buttonbackb', 'assets/menu/buttonback.png');
    this.load.image('backgroundd', 'assets/menu/help1.png');
    this.load.image('buttonbackc', 'assets/menu/buttonback.png');

    // Sprites
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    this.load.atlas('zombie', 'assets/zombieSS.png', 'assets/zombieSS.json');     
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('target', 'assets/crosshair.png');
    this.load.image('lives', 'assets/heart.png');

    // Audio
    this.load.audio('gun-fire', 'assets/sound/gun-fire.mp3');
    this.load.audio('player-hit', 'assets/sound/player-hit.mp3');
    this.load.audio('player-running', 'assets/sound/player-running.mp3');
    this.load.audio('zombie-idling', 'assets/sound/zombie-idle.mp3');
    this.load.audio('zombie-hit', 'assets/sound/zombie-hit.mp3');
    this.load.audio('main-score', 'assets/sound/main-score.mp3');
    //this.load.image('background', 'background.png');

    // Tiles
    this.load.image('tiles', 'assets/battle-royale.png');
    this.load.tilemapTiledJSON('map', 'assets/1.json');
    this.load.image('item', 'assets/item.png');
    this.load.spritesheet('items', 'assets/items.png',
        { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    this.soundtrack = this.sound.add('main-score');
    const soundtrackConfig = {
      mute: false,
      volume: 0.5,
      loop: true,
    };
    this.soundtrack.play(soundtrackConfig);
    this.scene.start('MainScene', { soundtrack: this.soundtrack });

    
  }
  loadBar() {
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0x3587e2,
      },
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    });
  }
}
