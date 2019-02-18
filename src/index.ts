import { cube, pyramid } from './models';
import Canvas from './core/canvas';
import Renderer from './core/renderer';
import Camera from './core/camera';
import Mesh from './core/mesh';

const canvas: Canvas = new Canvas('.stage', 600, 600);
const render: Renderer = new Renderer(canvas);

const mesh1: Mesh = new Mesh(pyramid);
mesh1.color = '#81ff02';

const mesh2: Mesh = new Mesh(cube);
mesh2.color = '#ff02f0';

const mesh3: Mesh = new Mesh(cube);
mesh3.color = '#ff026d';

const scene = [mesh1, mesh2, mesh3];

const camera = new Camera();
camera.pos.z = 200;
camera.zoom = 10;

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

    render.clear();
    render.render(scene, camera);
    requestAnimationFrame(animate);
}

animate(1);
