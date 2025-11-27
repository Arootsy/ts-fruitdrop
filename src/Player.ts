import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

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
  public isColliding(item: ScoreItem): boolean {
    return this.posX < item.getPosX() + item.getWidth() &&
           this.posX + this.image.width > item.getPosX() &&
           this.posY < item.getPosY() + item.getHeight() &&
           this.posY + this.image.height > item.getPosY();
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
