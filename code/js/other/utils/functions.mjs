import { ctx, HEIGHT, WIDTH } from '../main/main.mjs';
import { Fly } from './class/enemies/fly/fly.mjs';
import { Walker } from './class/enemies/walker/walker.js';
import { player } from './class/player/player.mjs';

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
function flySpawn(enemies) {
	let random = Math.floor(Math.random() * -50 + 25);
	let x = 0;
	if (random < 0) {
		x = -100;
	} else {
		x = WIDTH + 100;
	}
	enemies.push(new Fly({ x: x, y: 50 }, 50, 35, player));
}
export { animate, walkerSpawn, flySpawn };
