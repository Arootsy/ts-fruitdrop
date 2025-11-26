import Game from './Game.js';
import Spider from './Spider.js';
import CanvasRenderer from './CanvasRenderer.js';
import Fruit from './Fruit.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';

export default class FruitDrop extends Game {
  private canvas: HTMLCanvasElement;

  private spiders: Spider[] = [];

  private fruits: Fruit[] = [];

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
      this.spiders.push(new Spider(this.canvas.width));
    } else {
      this.fruits.push(new Fruit(this.canvas.width));
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

      this.spiders.forEach((spider: Spider, index: number) => {
        spider.update(delta);
        const isColliding: boolean = this.player.isCollidingSpider(spider);

        if (isColliding) {
          this.score += spider.getScore();

          spider.playSound();

          this.spiders.splice(index, 1);
        }

        if (spider.getPosY() > this.canvas.height) {
          this.spiders.splice(index, 1);
        }
      });

      this.fruits.forEach((fruit: Fruit, index: number) => {
        fruit.update(delta);
        const isColliding: boolean = this.player.isCollidingFruit(fruit);

        if (isColliding) {
          this.score += fruit.getScore();

          fruit.playSound();

          this.fruits.splice(index, 1);
        }

        if (fruit.getPosY() > this.canvas.height) {
          this.fruits.splice(index, 1);
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
      this.spiders = [];
      this.fruits = [];

      if (this.score > this.player.getHighScore()) {
        this.player.setHighScore(this.score);
      }

      CanvasRenderer.writeText(this.canvas, 'Game Over!', this.canvas.width / 2, this.canvas.height / 2, 'center', 'Arial', 72, 'white');
      CanvasRenderer.writeText(this.canvas, `High Score: ${this.player.getHighScore()}`, this.canvas.width / 2, (this.canvas.height / 2) + 80, 'center', 'Arial', 72, 'white');
    } else {
      this.player.render(this.canvas);

      for (const spider of this.spiders) {
        spider.render(this.canvas);
      }

      for (const fruit of this.fruits) {
        fruit.render(this.canvas);
      }
    }

    CanvasRenderer.writeText(this.canvas, `Score: ${this.score} Time: ${Math.round(this.timeLeft / 1000)}`, 15, 30, 'left', 'Arial', 24, 'white');
  }
}
