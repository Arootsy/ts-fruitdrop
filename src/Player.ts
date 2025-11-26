import Fruit from './Fruit.js';
import Spider from './Spider.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Player {
  private image: HTMLImageElement;

  private posX: number;

  private posY: number;

  private maxX: number;

  private speed: number = 0.8;

  private movingLeft: boolean = false;

  private movingRight: boolean = false;

  private highscore: number = 0;

  public constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.image = CanvasRenderer.loadNewImage('./assets/basket.png');
    this.posX = Math.floor((maxX / 2) - (this.image.width / 2));
    this.posY = maxY -67;
  }

  /**
   * moveLeft
   */
  public moveLeft(): void {
    this.movingLeft = true;
  }

  /**
   * moveRight
   */
  public moveRight(): void {
    this.movingRight = true;
  }

  /**
   * isCollidingFruit
   * @returns boolean
   */
  public isCollidingFruit(fruit: Fruit): boolean {
    return this.posX < fruit.getPosX() + fruit.getWidth() &&
           this.posX + this.image.width > fruit.getPosX() &&
           this.posY < fruit.getPosY() + fruit.getHeight() &&
           this.posY + this.image.height > fruit.getPosY();
  }

  /**
   * isCollidingSpider
   * @returns boolean
   */
  public isCollidingSpider(spider: Spider): boolean {
    return this.posX < spider.getPosX() + spider.getWidth() &&
           this.posX + this.image.width > spider.getPosX() &&
           this.posY < spider.getPosY() + spider.getHeight() &&
           this.posY + this.image.height > spider.getPosY();
  }

  /**
   * update
   * @returns void
   */
  public update(delta: number): void {
    if (this.movingLeft && this.posX > 10) {
      this.speed += this.speed * 0.0001;
      this.posX -= delta * this.speed;;
      this.movingLeft = false;
    }

    if (this.movingRight && this.posX < this.maxX - (this.image.width + 10)) {
      this.speed += this.speed * 0.0001;
      this.posX += delta * this.speed;
      this.movingRight = false;
    }
  }

  /**
   * render
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }

  public setHighScore(value: number): void {
    this.highscore = value;
  }

  public getHighScore(): number {
    return this.highscore;
  }
}
