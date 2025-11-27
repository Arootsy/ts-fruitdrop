import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Player extends CanvasItem {
  private maxX: number;

  private speed: number = 0.8;

  private movingLeft: boolean = false;

  private movingRight: boolean = false;

  private highscore: number = 0;

  public constructor(maxX: number, maxY: number) {
    super(CanvasRenderer.loadNewImage('./assets/basket.png'), maxY - 67, Math.floor(maxX / 2));
    this.maxX = maxX;
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
    return this.posX < item.getPosX()
    + item.getWidth() && this.posX
    + this.image.width > item.getPosX() && this.posY < item.getPosY()
    + item.getHeight() && this.posY
    + this.image.height > item.getPosY();
  }

  /**
   * update
   * @returns void
   */
  public update(delta: number): void {
    if (this.movingLeft && this.posX > 10) {
      this.speed += this.speed * 0.0001;
      this.posX -= delta * this.speed;
      this.movingLeft = false;
    }

    if (this.movingRight && this.posX < this.maxX - (this.image.width + 10)) {
      this.speed += this.speed * 0.0001;
      this.posX += delta * this.speed;
      this.movingRight = false;
    }
  }

  private static setCookie(name: string, val: number): void {
    const date: Date = new Date();
    const value: string = val.toString();

    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

    document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
  }

  private static getCookie(name: string): string {
    const value: string = '; ' + document.cookie;
    const parts: string[] = value.split('; ' + name + '=');

    if (parts.length == 2) {
      const part: string | undefined = parts.pop();
      return part?.split(';').shift() || '0';
    }

    return '0';
  }

  public setHighScore(value: number): void {
    this.highscore = value;
    Player.setCookie('highscore', value);
  }

  public getHighScore(): number {
    return Player.getCookie('highscore') ? Number(Player.getCookie('highscore')) : this.highscore;
  }
}
