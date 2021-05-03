import Physics  from "phaser";
import Entity  from ".objects/Entity";
  
  /* --------------------------------- Player Class ----------------------------------- */
  
let playerHit = 0;

class Player extends Entity {
  

  constructor(scene, x, y, textureKey, inventory, health, sampleLocations, kills) {
    super(scene, x, y, textureKey);
    this.health = 3; // initialized as 3 (for now) 
    this.kills = 0;
    this.scene = scene;
 
    // player animation (handgun)
    this.anims.create({ 
        key: 'handgun-idle', 
        frames: this.anims.generateFrameNames('player', { 
            prefix: 'handgun/idle/',
            suffix: '.png', 
            start:1,
            end: 20,
            zeropad: 2  
        }), 
        frameRate: 15, 
        repeat: -1 
    });
    this.anims.create({ 
        key: 'handgun-move', 
        frames: this.anims.generateFrameNames('player', { 
            prefix: 'handgun/move/',
            suffix: '.png', 
            start:1,
            end: 20,
            zeropad: 2 
        }), 
        frameRate: 15, 
        repeat: -1 
    });
    this.anims.create({ 
        key: 'handgun-shoot', 
        frames: this.anims.generateFrameNames('player', { 
            prefix: 'handgun/shoot/',
            suffix: '.png', 
            start:1,
            end: 3,
            zeropad: 2 
        }),
        frameRate: 15,  
        repeat: -1 
    });

    player.play('handgun-idle');

    this.idleFrame = {
      down: 1, 
      left: 4, 
      right: 7, 
      up: 10
    }

    this.setFrame(this.idleFrame.down);

    /////////// Keyboard Inputs 
    //keys = this.input.keyboard.createCursorKeys();
    const {LEFT, RIGHT, UP, DOWN, W, A, S, D, SPACE} = Phaser.Input.Keyboard.KeyCodes;

    this.keys = scene.input.keyboard.addKeys({
      left: LEFT, 
      right: RIGHT, 
      up: UP, 
      down: DOWN,
      w: W, 
      a: A, 
      s: S, 
      d: D,
      fireKey: SPACE
    });
    
    
  } //// end constructor
  
  bounceBack(direction){
    this.body.setVelocity(direction.x, direction.y);
    playerHit = 1;
  }

  update() {

    if (this.gameData.health <= 0) {
      this.isDead = true;
    }

    const { keys } = this; 
    const walkingSpeed = 200; // velocity is in px / second
    const prevVelocity = this.body.velocity.clone();
    
    if (playerHit > 0){
      playerHit++;
      if (playerHit >  5){
        playerHit = 0;
      }
    } else {
      this.body.setVelocity(0);
    }

    ////// Set velocity // reset Y and X to zero for orthogonal movements to prevent diagonal movement
    if (keys.left.isDown || keys.a.isDown) {
      this.body.setVelocityY(0);
      this.body.setVelocityX(-walkingSpeed);
      this.anims.play('left', true);
    } else if (keys.right.isDown || keys.d.isDown) {
      this.body.setVelocityY(0);
      this.body.setVelocityX(walkingSpeed);
      this.anims.play('right', true);
    } else if (keys.up.isDown || keys.w.isDown) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(-walkingSpeed);
      this.anims.play('up', true);
    } else if (keys.down.isDown || keys.s.isDown) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(walkingSpeed);
      this.anims.play('down', true);
    } else {
      this.anims.stop();
    }
  
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.body.velocity.normalize().scale(walkingSpeed);

    //// Set Idle animation frame when no keys are pressed
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      // show idle animation frame
      if (prevVelocity.x < 0) {
        this.setFrame(this.idleFrame.left);
      } else if (prevVelocity.x > 0) {
        this.setFrame(this.idleFrame.right);
      } else if (prevVelocity.y < 0) {
        this.setFrame(this.idleFrame.up);
      } else if (prevVelocity.y > 0) {
        this.setFrame(this.idleFrame.down)
      }
    }

  }
  
}