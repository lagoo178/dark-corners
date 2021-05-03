import Phaser from "phaser"

/* ------------------------------------ GameOver Scene  ------------------------ */
 
class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

    create(data) {
    
    // camera transition effect
      this.cameras.main.fadeIn(5000);

    this.add.text(this.game.renderer.width /2, this.game.renderer.height * 0.30, "game over").setDepth(1)

    this.add.image(0,0, "main_bg").setOrigin(0).setDepth(0)

    this.add.text(this.game.renderer.width /2, this.game.renderer.height / 1.75, "try again").setDepth(1)

    const yesButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 30, "yes").setDepth(1)

    const noButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 100, "no").setDepth(1)

    // takes you back to the game again
    yesButton.setInteractive();
    yesButton.on("pointerup", () => {
      //sceneEvents.emit("player-death", data);
      this.scene.start("GameScene")
      console.log("restarting game")
    })

    // takes you back to the start screen
    noButton.setInteractive();
    noButton.on("pointerup", () => {
      //sceneEvents.emit("player-death", data);
      this.scene.start("MainScene")
      console.log("back to menu")
    })

  
  }
};