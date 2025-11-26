import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Fruit extends ScoreItem {
  private speed: number;

  public constructor(maxX: number) {
    super();
    this.posX = 0;
    this.posY = 0;
    this.score = 0;
    this.speed = 0.1;

    const random: number = Math.random();
    if (random > 0.9) {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-cherries.png');
      this.score = 10;
      this.sound = './assets/music/cherry.mp3';
    } else if (random > 0.7) {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-strawberry.png');
      this.score = 7;
      this.sound = './assets/music/cherry.mp3';
    } else if (random > 0.4) {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-orange.png');
      this.score = 5;
      this.sound = './assets/music/cherry.mp3';
    } else if (random > 0.2) {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-grapes.png');
      this.score = 3;
      this.sound = './assets/music/cherry.mp3';
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-banana.png');
      this.score = 1;
      this.sound = './assets/music/cherry.mp3';
    }

    this.posX = Math.random() * maxX;
    this.posY = -32;
  }

  /**
   * update
   * @param delta elapsed time from the game
   */
  public update(delta: number): void {
    this.speed += 0.0001 * delta;
    this.posY += delta * this.speed;
  }

  /**
   * getSound
   * @returns string
   */
  public getSound(): string {
    return this.sound;
  }
}
