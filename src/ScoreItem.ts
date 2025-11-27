import CanvasItem from './CanvasItem.js';

export default abstract class ScoreItem extends CanvasItem {
  protected score: number;

  protected sound: string;

  public constructor() {
    super(new Image(), 0, 0);
    this.score = 0;
    this.sound = '';
  }

  public abstract update(delta: number): void;

  public getScore(): number {
    return this.score;
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
