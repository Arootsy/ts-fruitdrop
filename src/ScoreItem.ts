import CanvasRenderer from './CanvasRenderer.js';

export default abstract class ScoreItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  protected score: number;

  protected sound: string;

  public constructor() {
    this.posX = 0;
    this.posY = 0;
    this.score = 0;
    this.image = new Image();
    this.sound = '';
  }

  public abstract update(delta: number): void;

  /**
   * render
   */
  public render(canvas: HTMLCanvasElement): void {
    if (this.image.src === '') {
      throw new Error(`${this.constructor.name}: Image not found`);
    }

    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public getScore(): number {
    return this.score;
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    if (this.image.src === '') {
      throw new Error(`${this.constructor.name}: Image not found`);
    }

    return this.image.width;
  }

  public getHeight(): number {
    if (this.image.src === '') {
      throw new Error(`${this.constructor.name}: Image not found`);
    }

    return this.image.height;
  }

  /**
   * playSound
   */
  public playSound(): void {
    if (this.sound === '') {
      throw new Error(`${this.constructor.name}: Soundtrack not found`);
    }

    const audio: HTMLAudioElement = new Audio(this.sound);
    audio.play();
  }
}
