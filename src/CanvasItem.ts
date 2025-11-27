import CanvasRenderer from './CanvasRenderer.js';

export default abstract class CanvasItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  public constructor(image: HTMLImageElement, posX: number, posY: number) {
    this.image = image;
    this.posX = posX;
    this.posY = posY;
  }

  /**
   * rendered de image
   * @param canvas HTMLCanvasElement
   */
  public render(canvas: HTMLCanvasElement): void {
    if (this.image.src === '') {
      throw new Error(`${this.constructor.name}: Image not found`);
    }

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
}
