import Phaser from 'phaser';
import Bullet from '../objects/bullets';
import Player from '../sprite/Player';
import Zombie from '../sprite/Zombie';
import Inventory from './Inventory.js'


var player = null;
var enemy = null;
var healthpoints = null;
var reticle = null;
var hp1 = null;
var hp2 = null;
var hp3 = null;
var score = 0;
var scoreText;
var moveKeys = null;
var playerBullets = null;
var enemyBullets = null;
var inventory = null;
var timedEvent;

export default class gameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
        this.inventory = new Inventory();
    }
    preload() {
        // Load in images and sprites
        //this.load.spritesheet('player_handgun', 'assets/testing-dude(2).png',
        //    { frameWidth: 66, frameHeight: 60 });
        //this.load.spritesheet('zombie', 'assets/testing-zombie(3).png',
        //    { frameWidth: 66, frameHeight: 60 });
        this.load.atlas('player', 'assets/player.png', 'assets/player.json');
        this.load.atlas('zombie', 'assets/zombieSS.png', 'assets/zombieSS.json');        
        //this.load.atlas('zombie', 'assets/zombieSS.png', 'assets/zombieSS.json');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('target', 'assets/crosshair.png');
        this.load.image('lives', 'assets/heart.png');
        //this.load.image('background', 'background.png');
        this.load.image('tiles', 'assets/battle-royale.png');
        this.load.tilemapTiledJSON('map', 'assets/1.json');
        this.load.image('item', 'assets/item.png');
        this.load.spritesheet('items', 'assets/items.png',
            { frameWidth: 32, frameHeight: 32 });
    }
    create() {
        this.createMap();
        this.createPlayer();      
        enemy = this.physics.add.sprite(300, 600, 'zombie'); 
        this.createCrosshair();      
        enemy.setOrigin(0.5, 0.5).setDisplaySize(60, 60).setCollideWorldBounds(true);
        enemy.health = 3;
        this.createAnims();
        this.createGroups();
        this.camera();
        this.InputManager();
        this.createHud();
        this.scene.launch('InventoryScene', {gameScene:this});
        this.initialTime = 120;

        // Each 1000 ms call onEvent
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    }

    createMap() 
    {
        // Add background player, enemy, reticle, healthpoint sprites
        //const background = this.add.image(800, 600, 'background');

        // buat masukin tilemap yang dibuat dari tilemap editor (tiled)
        this.map = this.make.tilemap({ key: 'map' });
        // buat masukkin gambar tilesetnya yang dipake di tilemap
        const tileset = this.map.addTilesetImage("battle-royale", "tiles");
        // layer buat floor/lantai, buat player sama zombienya jalan
        const floorLayer = this.map.createStaticLayer("floor", tileset, 0, 0);
        // layer buat tembok/ buat si player sama zombienya gabisa jalanin lewat itu
        this.block = this.map.createStaticLayer("block", tileset, 0, 0);
        this.block.setCollisionByExclusion([-1]);
        //Set world bounds
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;
        //this.physics.world.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight);
    }

    createHud() 
    {
        // Set Hud location
        hp1 = this.add.image(25, 25, 'lives').setScrollFactor(0);
        hp2 = this.add.image(75, 25, 'lives').setScrollFactor(0);
        hp3 = this.add.image(125, 25, 'lives').setScrollFactor(0);
        //scoreText = this.add.text(350, 25, 'score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        const fontConfig = {
          fontFamily: 'monospace',
          fontSize: 50,
          fontStyle: 'bold',
          color: '#FFFFFF',
          align: 'center',
        };

        this.killDisplay = this.add.text(1000, 8, 'KILLS:', fontConfig).setScrollFactor(0);
        this.timeDisplay = this.add.text(500, 8, 'TIME:', fontConfig).setScrollFactor(0);
        this.levelDisplay = this.add.text(750, 8, 'LEVEL:', fontConfig).setScrollFactor(0);
        this.scoreDisplay = this.add.text(200, 8, 'SCORE:', fontConfig).setScrollFactor(0);

        // Set hud properties
        hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        //scoreText.setOrigin(0.5, 0.5);
    }
    createCrosshair()
    {
        reticle = this.physics.add.sprite(800, 700, 'target');
        reticle.setOrigin(0.5, 0.5).setDisplaySize(50, 50).setCollideWorldBounds(true);
    }

    interactionManager() 
    {
        
        //this.physics.add.collider(player, enemy, playerHitCallback, null, this);

        // Set Collider
        this.physics.add.collider(player, this.block);
        this.physics.add.collider(enemy, this.block);
        this.physics.add.collider(enemy, enemy);
        this.physics.overlap(player, enemy, this.hurtPlayer, null, this);
        this.physics.overlap(enemy, playerBullets, this.shotImpact, null, this);
        //this.physics.add.collider(playerBullets, this.block);
        //this.physics.add.collider(player, enemy, playerHitCallback, null, this);
    }


    InputManager()
    {
        // Creates object for input with WASD kets
        moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        // Enables movement of player with WASD keys
        this.input.keyboard.on('keydown-W', function (event) {
            player.setAccelerationY(-800);
            console.log('W key pressed');
            player.play('handgun-move');
        });
        this.input.keyboard.on('keydown-S', function (event) {
            player.setAccelerationY(800);
            console.log('S key pressed');
            player.play('handgun-move');
        });
        this.input.keyboard.on('keydown-A', function (event) {
            player.setAccelerationX(-800);
            console.log('A key pressed');
            player.play('handgun-move');
        });
        this.input.keyboard.on('keydown-D', function (event) {
            player.setAccelerationX(800);
            console.log('D key pressed');
            player.play('handgun-move');
        });

        // Stops player acceleration on uppress of WASD keys
        this.input.keyboard.on('keyup-W', function (event) {
            if (moveKeys['down'].isUp)
                player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup-S', function (event) {
            if (moveKeys['up'].isUp)
                player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup-A', function (event) {
            if (moveKeys['right'].isUp)
                player.setAccelerationX(0);
        });
        this.input.keyboard.on('keyup-D', function (event) {
            if (moveKeys['left'].isUp)
                player.setAccelerationX(0);
        });

        // Fires bullet from player on left click of mouse
        this.input.on('pointerdown', function (pointer, time, lastFired) {
            if (player.active === false)
                return;

            // Get bullet from bullets group
            const bullet = playerBullets.get().setActive(true).setVisible(true);

            if (bullet)
            {
                bullet.fire(player, reticle);
                //this.physics.add.collider(enemy, bullet, this.enemyHitCallback);
               // this.physics.add.collider(bullet, this.block);
            }



        }, this);

        // Pointer lock will only work after mousedown
        //this.canvas.addEventListener('mousedown', function () {
        //    this.input.mouse.requestPointerLock();
        //});

        this.input.on('pointerdown', function (pointer) {
            this.input.mouse.requestPointerLock();
        }, this);

        this.input.mouse.requestPointerLock();
        // Exit pointer lock when Q or escape (by default) is pressed.
        this.input.keyboard.on('keydown-Q', function (event) {
            if (this.input.mouse.locked)
                this.input.mouse.releasePointerLock();
        }, 0, this);

        // Move reticle upon locked pointer move
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked)
            {
                reticle.x += pointer.movementX;
                reticle.y += pointer.movementY;
            }
        }, this);
    }

    camera()
    {
        // Set camera properties
        //this.cameras.main.zoom = 0.5;
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    createPlayer() {
        player = this.physics.add.sprite(800, 300, 'player');
        player.setOrigin(0.5, 0.5).setDisplaySize(60, 60).setCollideWorldBounds(true);
        player.health = 3;
        player.score = 0;
        player.hurtFlag = false;
        player.kills = 0;
        player.shots = 0;
        player.scoreCalc = 0;
        //this.player = new Player(this, 800, 300, 'player');
        //this.player.setDisplaySize(60, 60);
        //this.add.existing(this.player);
    }

    createGroups() {
        //this.enemiesGroup = this.add.group();
        // Add 2 groups for Bullet objects
        playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    }
    createZombies() {
        this.enemy = this.add.group({
            maxSize: 5,
            runChildUpdate: true
        });

        for (let i = 0; i < 5; i++) {
            this.enemy.add(new Enemy(this, Phaser.Math.Between(0, 800), Phaser.Math.Between(600, 200), 'zombie'), true);
        };
        this.enemy.setSize(60, 60);
    } 

    createAnims()
    {
        // Animation

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
            frameRate: 8, 
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
            frameRate: 8, 
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
            frameRate: 8,  
            repeat: -1 
        });

        // zombie animation

        this.anims.create({ 
            key: 'zombie-idle', 
            frames: this.anims.generateFrameNames('zombie', { 
                prefix: 'skeleton-idle_',
                suffix: '.png', 
                start:1,
                end: 16,
                zeropad: 2 
            }),
            frameRate: 15, 
            repeat: -1 
        });
        this.anims.create({ 
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
        player.play('handgun-idle');
        enemy.play('zombie-idle');
    }

    scoreManager(time) 
    {   
        player.scoreCalc = (player.health * 200
          + player.kills * 100);
        this.scoreDisplay.setText(`SCORE:${player.scoreCalc}`);
    }

    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }


    onEvent ()
    {
        this.initialTime -= 1; // One second
        this.timeDisplay.setText(`TIME:` + this.formatTime(this.initialTime));
    }
    hurtPlayer(player) 
    {
        if (player.hurtFlag) {
          return;
        }

        player.hurtFlag = true;
        this.time.addEvent({
          delay: 2000,
          callback: this.resetHurtTime,
          callbackScope: this,
        });

        player.alpha = 0.5;
        player.health -= 1;
        this.updateHealthDisplay();
        //play audio here

        if (player.health < 1) {
          player.scoreCalc -= 200;
          //this.gameOver();
        }
    }
    updateHealthDisplay() 
    {
        switch (player.health) {
          case 2:
            hp3.destroy();
            break;
          case 1:
            hp2.destroy();
            break;
          case 0:
            hp1.destroy();
            break;
          default:
        }
    }

    resetHurtTime() 
    {
        player.hurtFlag = false;
        player.alpha = 1;
    }

    shotImpact(enemy, bullet) 
    {
        
        enemy.health = enemy.health - 1;
        console.log("Enemy hp: ", enemy.health);

        // Kill enemy if health <= 0
        if (enemy.health <= 0)
        {
            enemy.destroy();
            player.kills += 1;
            // enemy death audio play
            this.killDisplay.setText(`KILLS:${player.kills}`);
        }
        bullet.destroy();
        
    }

    // Ensures sprite speed doesnt exceed maxVelocity while update is called
    constrainVelocity(sprite, maxVelocity)
    {
        if (!sprite || !sprite.body)
          return;

        var angle, currVelocitySqr, vx, vy;
        vx = sprite.body.velocity.x;
        vy = sprite.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity)
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            sprite.body.velocity.x = vx;
            sprite.body.velocity.y = vy;
        }
    }

    // Ensures reticle does not move offscreen
    constrainReticle(reticle)
    {
        var distX = reticle.x-player.x; // X distance between player & reticle
        var distY = reticle.y-player.y; // Y distance between player & reticle

        // Ensures reticle cannot be moved offscreen (player follow)
        if (distX > 800)
            reticle.x = player.x+800;
        else if (distX < -800)
            reticle.x = player.x-800;

        if (distY > 600)
            reticle.y = player.y+600;
        else if (distY < -600)
            reticle.y = player.y-600;
    }

    checkCollision = function(x,y){
        var tile = this.map.getTileAt(x, y);
        return tile.properties.collide == true;
    }

    getTileID = function(x,y){
        var tile = this.map.getTileAt(x, y);
        //return tile.index;
    }

    update(delta, time) {
        // Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);

        // Rotates enemy to face towards player
        enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);

        //Make reticle move with player
        reticle.body.velocity.x = player.body.velocity.x;
        reticle.body.velocity.y = player.body.velocity.y;

        this.scoreManager(time);
        this.interactionManager();

        // Constrain velocity of player
        this.constrainVelocity(player, 500);

        // Constrain position of constrainReticle
        this.constrainReticle(reticle);

        // Make enemy fire
        //enemyFire(enemy, player, time, this);

        //this.physics.moveToObject(enemy, player, 240);
    }

    

    gameOver() {
       this.scene.start('GameOverScene', { score: player.scoreCalc });
    }
}