import {drawMesh} from './draw';
import Canvas from './canvas';
import Camera from './camera';
import Mesh from './mesh';

export function createRenderer(canvas: Canvas) {
  const context = canvas.getContext();

  return function render(scene: Array<Mesh>, camera: Camera) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    scene.forEach((mesh: Mesh) => {
      drawMesh(mesh, camera, context);
    });
  }
}
