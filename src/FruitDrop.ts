import Game from './Game.js';
import Spider from './Spider.js';
import CanvasRenderer from './CanvasRenderer.js';
import Fruit from './Fruit.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import ScoreItem from './ScoreItem.js';

export default class FruitDrop extends Game {
  private canvas: HTMLCanvasElement;

  private scoreItems: ScoreItem[] = [];

  private nextItem: number;

  private keyListener: KeyListener;

  private player: Player;

  private score: number = 0;

  private timeLeft: number = 60 * 1000;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.nextItem = Math.random() * 3000;
    this.keyListener = new KeyListener();
    this.player = new Player(this.canvas.width, this.canvas.height);
  }

  private makeItem(): void {
    const random: number = Math.random();

    if (random > 0.9) {
      this.scoreItems.push(new Spider(this.canvas.width));
    } else {
      this.scoreItems.push(new Fruit(this.canvas.width));
    }
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    } else if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER) && this.isInState(Game.STATE_STOPPING)) {
      this.timeLeft = 60 * 1000;
      this.score = 0;
      this.scoreItems = [];
      this.nextItem = Math.random() * 3000;
      this.start();
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(delta: number): boolean {
    if (this.timeLeft > 0) {
      this.timeLeft -= delta;

      this.player.update(delta);

      this.scoreItems.forEach((item: ScoreItem, index: number) => {
        item.update(delta);
        const isColliding: boolean = this.player.isColliding(item);

        if (isColliding) {
          this.score += item.getScore();

          item.playSound();

          this.scoreItems.splice(index, 1);
        }

        if (item.getPosY() > this.canvas.height) {
          this.scoreItems.splice(index, 1);
        }
      });
    }

    this.nextItem -= delta;

    if (this.nextItem <= 0) {
      if (this.timeLeft > 0 ) {
        this.makeItem();
      }

      this.nextItem = Math.random() * 300;
    }

    return true;
  }

  /**
   * Render all the elements in the screen.
  */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);

    if (this.timeLeft <= 0) {
      this.scoreItems = [];

      if (this.score > this.player.getHighScore()) {
        this.player.setHighScore(this.score);
      }

      CanvasRenderer.writeText(this.canvas, 'Game Over!', this.canvas.width / 2, this.canvas.height / 2, 'center', 'Arial', 86, 'red');
      CanvasRenderer.writeText(this.canvas, `Press ${KeyListener.KEY_ENTER} to Play Again`, this.canvas.width / 2, (this.canvas.height / 2) + 90, 'center', 'Arial', 72, 'white');

      this.stop();
    } else {
      this.player.render(this.canvas);

      for (const item of this.scoreItems) {
        item.render(this.canvas);
      }
    }

    CanvasRenderer.writeText(this.canvas, `High Score: ${this.player.getHighScore()}`, this.canvas.width - 10, 30, 'right', 'Arial', 24, 'white');
    CanvasRenderer.writeText(this.canvas, `Score: ${this.score} Time: ${Math.round(this.timeLeft / 1000)}`, 15, 30, 'left', 'Arial', 24, 'white');
  }
}
