import Physics  from "phaser";
import Entity  from "../objects/Entity";
  
  /* --------------------------------- Player Class ----------------------------------- */

export default class Player extends Entity {
  

  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey);
    this.health = 3; // initialized as 3 (for now) 
    this.kills = 0;
    this.scene = scene;

    const anims = scene.anims;
 
    // player animation (handgun)
    anims.create({ 
        key: 'handgun-idle', 
        frames: anims.generateFrameNames('player', { 
            prefix: 'handgun/idle/',
            suffix: '.png', 
            start:1,
            end: 20,
            zeropad: 2  
        }), 
        frameRate: 15, 
        repeat: -1 
    });
    anims.create({ 
        key: 'handgun-move', 
        frames: anims.generateFrameNames('player', { 
            prefix: 'handgun/move/',
            suffix: '.png', 
            start:1,
            end: 20,
            zeropad: 2 
        }), 
        frameRate: 15, 
        repeat: -1 
    });
    anims.create({ 
        key: 'handgun-shoot', 
        frames: anims.generateFrameNames('player', { 
            prefix: 'handgun/shoot/',
            suffix: '.png', 
            start:1,
            end: 3,
            zeropad: 2 
        }),
        frameRate: 15,  
        repeat: -1 
    });

    this.anims.play('handgun-idle');

    /////////// Keyboard Inputs 
    const {LEFT, RIGHT, UP, DOWN, W, A, S, D} = Phaser.Input.Keyboard.KeyCodes;

    this.keys = scene.input.keyboard.addKeys({
      left: LEFT, 
      right: RIGHT, 
      up: UP, 
      down: DOWN,
      w: W, 
      a: A, 
      s: S, 
      d: D
    });
    
    
  } //// end constructor
  
  bounceBack(direction){
    this.body.setVelocity(direction.x, direction.y);
    playerHit = 1;
  }

  update() {

    if (this.health <= 0) {
      this.isDead = true;
    }

    const { keys } = this; 
    const walkingSpeed = 600; // velocity is in px / second
    const prevVelocity = this.body.velocity.clone();
    

    ////// Set velocity // reset Y and X to zero for orthogonal movements to prevent diagonal movement
    if (keys.left.isDown || keys.a.isDown) {
      this.body.setVelocityY(0);
      this.body.setVelocityX(-walkingSpeed);
      this.anims.play('handgun-move', true);
    } else if (keys.right.isDown || keys.d.isDown) {
      this.body.setVelocityY(0);
      this.body.setVelocityX(walkingSpeed);
      this.anims.play('handgun-move', true);
    } else if (keys.up.isDown || keys.w.isDown) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(-walkingSpeed);
      this.anims.play('handgun-move', true);
    } else if (keys.down.isDown || keys.s.isDown) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(walkingSpeed);
      this.anims.play('handgun-move', true);
    } else {
      this.anims.stop();
    }
  
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.body.velocity.normalize().scale(walkingSpeed);

    //// Set Idle animation frame when no keys are pressed
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      // show idle animation frame
      if (prevVelocity.x < 0) {
        this.anims.play('handgun-idle', true);
      } else if (prevVelocity.x > 0) {
        this.anims.play('handgun-idle', true);
      } else if (prevVelocity.y < 0) {
        this.anims.play('handgun-idle', true);
      } else if (prevVelocity.y > 0) {
        this.anims.play('handgun-idle', true);
      }
    }

  }
  
}