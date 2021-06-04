import Phaser from 'phaser';
import { getScores } from '../helpers/savescore';

export default class statsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StatsScene' })
    }
    create() {
        var bg = this.add.sprite(0,0,'stats-bg');
        bg.setOrigin(0,0);
        this.add.text(625, 100, 'LeaderBoard', {
          color: 'white',
          fontSize: '32px ',
        }).setOrigin(0.5, 0.5);

        this.loading = this.add.text(625, 150, 'Loading...', {
          color: 'white',
          fontSize: '16px ',
        }).setOrigin(0.5, 0.5);

        getScores().then((scores) => {
          const scoreStyle = {
            color: 'white',
            fontSize: '38px ',
          };
          const { result } = scores;
          const resultsCount = 5;
          result.sort((x, y) => y.score - x.score);
          result.slice(0, resultsCount).forEach((topscore, index) => {
            if (topscore) {
              this.add.text(300, 200 + (40 * index),
                `${index + 1}. Name: ${topscore.user} -- Score: ${topscore.score}`,
                scoreStyle);
            }
          });
        });   
        var buttonz = this.add.image(1050,680, 'buttonbackb').setInteractive();

        buttonz.on('pointerdown', function () {

            this.scene.start('MainScene')

        }, this);  
    }
    update() {
        
    }
    enterDisplay() {
        this.loading.destroy();
        this.add.image(400, 500, 'enter').setScale(3);
    }
}