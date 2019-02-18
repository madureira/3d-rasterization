import Vec3 from './vec3';

class Mesh {
  public position: Vec3;
  public rotation: Vec3;
  public polygons: Array<any>;
  public color: string;

  constructor(model: Array<any>) {
    this.polygons = model.map(this.toPolygon, this);
    this.position = new Vec3();
    this.rotation = new Vec3();
    this.color = '';
  }

  *[Symbol.iterator] () {
    for (const polygon of this.polygons) {
        yield polygon.map((point: [number, number, number]) => ({...point}));
    }
  }

  public transform(point: Vec3): void {
    this.rotate(point, this.rotation);
    this.offset(point, this.position);
  }

  private toPolygon(shape: Array<any>) {
    return shape.map(this.toPoint, this);
  }

  private toPoint([x, y, z]: [number, number, number]): Vec3 {
    return new Vec3(x, y, z);
  }

  private offset(point: Vec3, position: Vec3): void {
    point.x += position.x;
    point.y += position.y;
    point.z += position.z;
  }

  private rotate(point: Vec3, rotation: Vec3): void {
    const sin = new Vec3(
      Math.sin(rotation.x),
      Math.sin(rotation.y),
      Math.sin(rotation.z)
    );

    const cos = new Vec3(
      Math.cos(rotation.x),
      Math.cos(rotation.y),
      Math.cos(rotation.z)
    );

    let temp1, temp2;

    temp1 = cos.x * point.y + sin.x * point.z;
    temp2 = -sin.x * point.y + cos.x * point.z;
    point.y = temp1;
    point.z = temp2;

    temp1 = cos.y * point.x + sin.y * point.z;
    temp2 = -sin.y * point.x + cos.y * point.z;
    point.x = temp1;
    point.z = temp2;

    temp1 = cos.z * point.x + sin.z * point.y;
    temp2 = -sin.z * point.x + cos.z * point.y;
    point.x = temp1;
    point.y = temp2;
  }
}

export default Mesh;
