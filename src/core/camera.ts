import Vec3 from './vec3';

class Camera {
  public pos: Vec3;
  public zoom: number;

  constructor() {
    this.pos = new Vec3(0, 0, 100);
    this.zoom = 8;
  }

  public project(point: Vec3): void {
      this.perspective(point, this.pos.z);
      this.setZoom(point, this.zoom);
  }

  private perspective(point: Vec3, distance: number): void {
    const fov = point.z + distance;
    point.x /= fov;
    point.y /= fov;
  }

  private setZoom(point: Vec3, factor: number): void {
    const scale = Math.pow(factor, 2);
    point.x *= scale;
    point.y *= scale;
  }
}

export default Camera;
