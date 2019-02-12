import Mesh from './mesh';
import Camera from './camera';
import Vec3 from './vec3';

export function drawMesh(mesh: Mesh, camera: Camera, context: CanvasRenderingContext2D) {
  context.strokeStyle = mesh.color;

  mesh.polygons.forEach(polygon => {
    const projectedPolygon = polygon.map((point: [number, number, number]) => ({...point}));

    projectedPolygon.forEach((point: Vec3) => {
      mesh.transform(point);
      camera.project(point);
    });

    drawPolygon(projectedPolygon, context);
  });
}

function drawPolygon(polygon: Array<Vec3>, context: CanvasRenderingContext2D) {
  polygon.forEach((point: Vec3) => {
    offsetToCenter(point, context);
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

function offsetToCenter(point: Vec3, context: CanvasRenderingContext2D) {
  point.x += context.canvas.width / 2;
  point.y += context.canvas.height / 2;
}
