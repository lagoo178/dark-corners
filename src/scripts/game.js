import 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import StatsScene from './scenes/statsScene'
import HelpScene from './scenes/helpScene'
import GameScene from './scenes/GameScene'
import InventoryScene from './scenes/InventoryScene'
import GameOverScene from './scenes/gameoverScene'
import CreditScene from './scenes/CreditScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  dom: {
    createContainer: true,
  },
  scene: [PreloadScene, MainScene, StatsScene, HelpScene, GameScene, GameOverScene, InventoryScene, CreditScene],
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      Gravity: { x: 0, y: 0 }
    }
  }
}
const game = new Phaser.Game(config);
game.config.musicStatus = true;
//window.addEventListener('load', () => {
//  const game = new Phaser.Game(config)
//  game.config.musicStatus = true;
//})

