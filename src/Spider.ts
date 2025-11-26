import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Spider extends ScoreItem {
  public constructor(maxX: number) {
    super();
    this.posX = 0;
    this.posY = 0;
    this.score = 0;
    this.sound = './assets/music/oof.mp3';

    const random: number = Math.random();
    if (random > 0.9) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider01.png');
      this.score = -5;
    } else if (random > 0.7) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider02.png');
      this.score = -3;
    } else if (random > 0.4) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider03.png');
      this.score = -2;
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/spider04.png');
      this.score = -1;
    }

    this.posX = Math.random() * maxX;
    this.posY = -32;
  }

  /**
   * update
   * @param delta elapsed time from the game
   */
  public update(delta: number): void {
    this.posY += delta * 0.1;
  }
}
