import { ctx, HEIGHT, WIDTH } from '../main/main.mjs';
import { Walker } from './class/enemies/walker/walker.js';

//creates a loop
function animate(func) {
	let id;
	id = requestAnimationFrame(func);
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	return id;
}
function walkerSpawn(enemies) {
	let face = Math.random() * -50 + 25;
	let faceX;
	let x = 0;
	if (face < 0) {
		faceX = true;
		x = -100;
	} else {
		faceX = false;
		x = WIDTH + 100;
	}
	enemies.push(new Walker({ x: x, y: HEIGHT - 35 }, 50, 35, faceX));
}
export { animate, walkerSpawn };
