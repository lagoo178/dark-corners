import Phaser from 'phaser';
import { postScore } from '../helpers/savescore';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.score = data.score;
  }
  

  create() {
    this.addDisplayElements();
    this.endKeys = this.input.keyboard.addKeys('enter, space');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.endKeys.space)) {
      this.toLeaderBoard();
    }

    if (Phaser.Input.Keyboard.JustDown(this.endKeys.enter) && this.inputText.node.value !== '') {
      postScore(this.inputText.node.value, this.score);
      this.toLeaderBoard();
    }
  }

  addDisplayElements() {
    var bg = this.add.sprite(0,0,'stats-bg');
    bg.setOrigin(0,0);
    //this.add.image(400, 400, 'enter').setScale(3);

    this.add.text(500, 30,
      'Game Over', {
        fontFamily: 'monospace',
        fontSize: 40,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
    this.add.text(510, 100,
      `Your score is: ${this.score}`, {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
    this.add.text(375, 200,
      'Please enter your name to save your score:', {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });

    this.add.text(440, 400,
      'Press ENTER to save your score', {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });

    this.add.text(440, 500,
      'Press SPACE to skip this step', {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });

    this.inputText = this.add.dom(600, 300, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '28px',
      backgroundColor: '#fff',
    });
  }

  toLeaderBoard() {
    this.scene.start('StatsScene');
  }
}