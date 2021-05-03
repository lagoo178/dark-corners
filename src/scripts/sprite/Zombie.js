import Entity  from "./objects/Entity";
import Pathfinder  from "./object/pathfinding.js";

let zombieShot = 0;

class Zombie extends Entity {

  constructor(scene, x, y, textureKey, target, speed, health) {
    super(scene, x, y, textureKey);
    this.health = 3; // initialized as 3 (for now) 
    this.scene = scene;
    

    // set target to player
    this.target = target;
    this.speed = speed; // px per second
    
    const anims = scene.anims;

    // zombie animation

    anims.create({ 
        key: 'zombie-idle', 
        frames: anims.generateFrameNames('zombie', { 
            prefix: 'skeleton-idle_',
            suffix: '.png', 
            start:1,
            end: 16,
            zeropad: 2 
        }),
        frameRate: 15, 
        repeat: -1 
    });
    anims.create({ 
        key: 'zombie-move', 
        frames: this.anims.generateFrameNames('zombie', { 
            prefix: 'skeleton-move_',
            suffix: '.png', 
            start:1,
            end: 16,
            zeropad: 2 
        }), 
        frameRate: 15, 
        repeat: -1 
    });
    this.anims.create({ 
        key: 'zombie-attack', 
        frames: this.anims.generateFrameNames('zombie', { 
            prefix: 'skeleton-attack_',
            suffix: '.png', 
            start:1,
            end: 8,
            zeropad: 2 
        }), 
        frameRate: 15, 
        repeat: -1 
    });
    this.anims.play('zombie-idle');
    //this.setFrame(this.idleFrame.down);
    
  } //// end constructor

  bounceBack(direction){
    this.body.setVelocity(direction.x, direction.y);
    zombieShot = 1;
  }

  update() {
    const walkingSpeed = this.speed; //  px / second
    const prevVelocity = this.body.velocity.clone();
    const spriteKey = this.textureKey; 


    if (zombieShot > 0){
      zombieShot++;
      if (zombieShot > 70){
        zombieShot = 0;
      }
    } else {
      this.body.setVelocity(0);
    }
    
    // Zombie Path Finding for Player
    const targetX = this.target.x;
    const targetY = this.target.y;

    const dx = targetX - this.x;
    const dy = targetY - this.y;

    // Rotates enemy to face towards player
    const rotation = Phaser.Math.Angle.Between(this.x, this.y, targetX.x, targetY.y);

    ////// Set velocity // reset Y and X to zero for orthogonal movements to prevent diagonal movement
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (targetX < this.x) {
        this.body.setVelocityY(0);
        this.body.setVelocityX(-walkingSpeed);
        //this.anims.play(spriteKey + '-left', true);
      } else if (targetX > this.x) {
        this.body.setVelocityY(0);
        this.body.setVelocityX(walkingSpeed);
        //this.anims.play(spriteKey + '-right', true);
      } 
    }

    if (Math.abs(dx) < Math.abs(dy)) {
      if (targetY < this.y) {
        this.body.setVelocityX(0);
        this.body.setVelocityY(-walkingSpeed);
        //this.anims.play(spriteKey + '-up', true);
      } else if (targetY > this.y) {
        this.body.setVelocityX(0);
        this.body.setVelocityY(walkingSpeed);
        //this.anims.play(spriteKey + '-down', true);
      } 
    }

    // Normalize and scale the velocity so that zombie can't move faster along a diagonal
    this.body.velocity.normalize().scale(walkingSpeed);

  }

}