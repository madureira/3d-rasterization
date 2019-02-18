class Canvas {
  private _canvasElem: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;

  constructor(elementSelector: string, width: number, height: number) {
    this._width = width;
    this._height = height;
    const element: HTMLElement | null = document.querySelector(elementSelector);

    if (element) {
      this._canvasElem = <HTMLCanvasElement> document.createElement('canvas');
      this._canvasElem.width = this._width;
      this._canvasElem.height = this._height;
      this._context = <CanvasRenderingContext2D> this._canvasElem.getContext('2d');
      element.appendChild(this._canvasElem);
    }
  }

  public getContext(): CanvasRenderingContext2D {
    return this._context;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }
}

export default Canvas;
