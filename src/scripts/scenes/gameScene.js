import Phaser from 'phaser';
import Bullet from '../objects/bullets';
import Player from '../sprite/Player';
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
        // Add 2 groups for Bullet objects
        playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        // Add background player, enemy, reticle, healthpoint sprites
        //const background = this.add.image(800, 600, 'background');
        this.map = this.make.tilemap({ key: 'map' });
        const tileset = this.map.addTilesetImage("battle-royale", "tiles");
        const floorLayer = this.map.createStaticLayer("floor", tileset, 0, 0);
        //const herbeLayer = this.map.createStaticLayer("herbe", tileset, 0, 0);
        const block = this.map.createStaticLayer("block", tileset, 0, 0);
        //this.map["wallLayer"] = this.map.createStaticLayer("wall", tileset, 0, 0);

        block.setCollisionByExclusion([-1]);

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

        player = this.physics.add.sprite(800, 300, 'player').play('handgun-idle');
        enemy = this.physics.add.sprite(300, 600, 'zombie').play('zombie-idle');
        reticle = this.physics.add.sprite(800, 700, 'target');

        // Set Hud location
        hp1 = this.add.image(25, 25, 'lives').setScrollFactor(0);
        hp2 = this.add.image(75, 25, 'lives').setScrollFactor(0);
        hp3 = this.add.image(125, 25, 'lives').setScrollFactor(0);
        scoreText = this.add.text(350, 25, 'score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);

        // Set image/sprite properties
        //background.setOrigin(0.5, 0.5).setDisplaySize(1600, 1200);
        player.setOrigin(0.5, 0.5).setDisplaySize(60, 60).setCollideWorldBounds(true);
        enemy.setOrigin(0.5, 0.5).setDisplaySize(60, 60).setCollideWorldBounds(true);
        reticle.setOrigin(0.5, 0.5).setDisplaySize(50, 50).setCollideWorldBounds(true);

        // Set hud properties
        hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        scoreText.setOrigin(0.5, 0.5);

        // Set sprite variables
        player.health = 3;
        enemy.health = 3;
        enemy.lastFired = 0;

        // Set camera properties
        //this.cameras.main.zoom = 0.5;
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight);
        
        // Set world bounds
        this.physics.world.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight);
        //this.physics.add.collider(player, enemy, playerHitCallback, null, this);

        // Set Collider
        this.physics.add.collider(player, block);
        this.physics.add.collider(enemy, block);
        this.physics.add.collider(enemy, enemy);
        //this.physics.add.collider(playerBullets, block);
        //this.physics.add.collider(player, enemy, playerHitCallback, null, this);

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
            var bullet = playerBullets.get().setActive(true).setVisible(true);

            if (bullet)
            {
                bullet.fire(player, reticle);
                this.physics.add.collider(enemy, bullet, this.enemyHitCallback);
               // this.physics.add.collider(bullet, block);
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

        this.scene.launch('InventoryScene', {gameScene:this});

        // We create the 2D array representing all the tiles of our map
        var grid = [];
        for(var y = 0; y < this.map.height; y++){
            var col = [];
            for(var x = 0; x < this.map.width; x++){
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                col.push(this.getTileID(x,y));
            }
            grid.push(col);
        }

        var tile = this.map.tilesets[0];
        var properties = tile.tileProperties;
        var acceptableTiles = [];

        // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
        // and see what properties have been entered in Tiled.
        for(var i = tile.firstgid-1; i < tileset.total; i++){ // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
            if(!properties.hasOwnProperty(i)) {
                // If there is no property indicated at all, it means it's a walkable tile
                acceptableTiles.push(i+1);
                continue;
            }
            if(!properties[i].collide) acceptableTiles.push(i+1);
            //if(properties[i].cost) Game.finder.setTileCost(i+1, properties[i].cost); // If there is a cost attached to the tile, let's register it
        }
    }

    enemyHitCallback(enemyHit, bulletHit)
    {
        // Reduce health of enemy
        if (bulletHit.active === true && enemyHit.active === true)
        {
            score += 10;
            scoreText.setText('Score: ' + score);
            enemyHit.health = enemyHit.health - 1;
            console.log("Enemy hp: ", enemyHit.health);

            // Kill enemy if health <= 0
            if (enemyHit.health <= 0)
            {
               enemyHit.setActive(false).setVisible(false);
            }

            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
        }
    }

    playerHitCallback(playerHit, bulletHit)
    {
        // Reduce health of player
        if (bulletHit.active === true && playerHit.active === true)
        {
            playerHit.health = playerHit.health - 1;
            console.log("Player hp: ", playerHit.health);

            // Kill hp sprites and kill player if health <= 0
            if (playerHit.health == 2)
            {
                hp3.destroy();
            }
            else if (playerHit.health == 1)
            {
                hp2.destroy();
            }
            else
            {
                hp1.destroy();
                playerHit.setActive(false).setVisible(false);
                // Game over state should execute here
            }

            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
        }
    }


    enemyFire(enemy, player, time, gameObject)
    {
        if (enemy.active === false)
        {
            return;
        }

        if ((time - enemy.lastFired) > 1000)
        {
            enemy.lastFired = time;

            // Get bullet from bullets group
            var bullet = enemyBullets.get().setActive(true).setVisible(true);

            if (bullet)
            {
                bullet.fire(enemy, player);
                // Add collider between bullet and player
                gameObject.physics.add.collider(player, bullet, playerHitCallback);
                //this.physics.add.collider(bullet, block);
            }
        }
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

        // Constrain velocity of player
        this.constrainVelocity(player, 500);

        // Constrain position of constrainReticle
        this.constrainReticle(reticle);

        // Make enemy fire
        //enemyFire(enemy, player, time, this);

        this.physics.moveToObject(enemy, player, 240);
    }

    

    gameOver() {
       this.scene.start('GameOverScene', { score: player.scoreCalc });
    }
}