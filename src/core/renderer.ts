import Canvas from './canvas';
import Camera from './camera';
import Mesh from './mesh';
import Vec3 from './vec3';

class Renderer {
  private _width: number;
  private _height: number;
  private _context: CanvasRenderingContext2D;

  constructor(canvas: Canvas) {
    this._width = canvas.width;
    this._height = canvas.height;
    this._context = canvas.getContext();
  }

  public clear(): void {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  public render(scene: Array<Mesh>, camera: Camera): void {
    scene.forEach((mesh: Mesh) => {
      this.drawMesh(mesh, camera, this._context);
    });
  }

  private drawMesh(mesh: Mesh, camera: Camera, context: CanvasRenderingContext2D): void {
    context.strokeStyle = mesh.color;

    mesh.polygons.forEach(polygon => {
      const projectedPolygon = polygon.map((point: [number, number, number]) => ({...point}));

      projectedPolygon.forEach((point: Vec3) => {
        mesh.transform(point);
        camera.project(point);
      });

      this.drawPolygon(projectedPolygon, context);
    });
  }

  private drawPolygon(polygon: Array<Vec3>, context: CanvasRenderingContext2D): void {
    polygon.forEach((point: Vec3) => {
      this.offsetToCenter(point, context);
    });

    const first = polygon[0];

    context.beginPath();
    context.moveTo(first.x, first.y);
    for (const point of polygon) {
      context.lineTo(point.x, point.y);
    }
    context.lineTo(first.x, first.y);
    context.stroke();
  }

  private offsetToCenter(point: Vec3, context: CanvasRenderingContext2D): void {
    point.x += context.canvas.width / 2;
    point.y += context.canvas.height / 2;
  }
}

export default Renderer;
