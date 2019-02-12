import { cube, pyramid } from './models';
import Canvas from './core/canvas';
import Camera from './core/camera';
import {createMesh} from './core/mesh';
import {createRenderer} from './core/renderer';

const canvas: Canvas = new Canvas('.stage', 600, 600);

const mesh1 = createMesh(pyramid);
mesh1.color = '#81ff02';
const mesh2 = createMesh(cube);
mesh2.color = '#ff02f0';
const mesh3 = createMesh(cube);
mesh3.color = '#ff026d';

const scene = [mesh1, mesh2, mesh3];

const camera = new Camera();
camera.pos.z = 200;
camera.zoom = 10;

const render = createRenderer(canvas);

function animate(time: number) {
    mesh1.position.x = Math.sin(time / 1000) * 100;
    mesh1.position.z = Math.sin(time / 1200) * 100;
    mesh1.rotation.x += 0.01;
    mesh1.rotation.y += 0.01;

    mesh2.position.x = Math.sin(time / 500) * 75;
    mesh2.position.z = Math.sin(time / 2000) * 120;
    mesh2.rotation.x -= 0.01;
    mesh2.rotation.y -= 0.01;

    mesh3.position.x = Math.sin(time / 500) * 100;
    mesh3.position.y = Math.cos(time / 500) * 100;
    mesh3.rotation.y -= 0.005;

    render(scene, camera);

    requestAnimationFrame(animate);
}

animate(1);
