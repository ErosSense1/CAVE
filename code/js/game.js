import {
	back_Menu,
	back_MS,
	canvas,
	cursor,
	eco_Button,
	game_Menu,
	HEIGHT,
	lose_Menu,
	main_Menu,
	playpause,
	retry,
	self_Button,
	settings_Menu,
	shoot_Button,
	tuto,
	WIDTH,
} from './other/main/main.mjs';
import { particleCreator } from './other/utils/class/particles/particles.mjs';
import { player } from './other/utils/class/player/player.mjs';
import { Weapon } from './other/utils/class/weapon/weapon.mjs';
import { animate, flySpawn, walkerSpawn } from './other/utils/functions.mjs';

// stuff
let weapons = [];
let enemies = [];

// main menu buttons
let PLAY = document.getElementById('play');
let SETTINGS = document.getElementById('settings');

//cooldowns
let eco_Cooldown = 0;
let self_Cooldown = 0;
let shoot_Cooldown = 0;
let secCounter = 0;

let id;
//game loop
function game() {
	id = animate(game);

	secCounter++;
	//Cooldowns
	if (secCounter % 60 === 0) {
		eco_Cooldown--;
		self_Cooldown--;
		shoot_Cooldown--;
		if (eco_Cooldown <= 0) {
			eco_Cooldown = 0;
		}
		if (self_Cooldown <= 0) {
			self_Cooldown = 0;
		}
		if (shoot_Cooldown <= 0) {
			shoot_Cooldown = 0;
		}
		self_Button.innerText = self_Cooldown;
		shoot_Button.innerText = shoot_Cooldown;
		eco_Button.innerText = eco_Cooldown;
	}

	weapons.forEach((weapon) => {
		weapon.update();
		if (
			weapon.pos.y > HEIGHT ||
			weapon.pos.y < 0 ||
			weapon.pos.x < 0 ||
			weapon.pos.x > WIDTH
		) {
			let random = Math.floor(Math.random() * 10);
			if (random < 5) {
				walkerSpawn(enemies);
			} else {
				flySpawn(enemies);
			}
			weapons.splice(0, 1);
		}
	});

	enemies.forEach((block) => {
		block.update();
		if (
			player.pos.x + player.w > block.pos.x &&
			player.pos.x < block.pos.x + block.w &&
			player.pos.y + player.h > block.pos.y &&
			player.pos.y < block.pos.y + block.h
		) {
			game_Menu.style.visibility = 'hidden';
			lose_Menu.style.visibility = 'visible';
		}
		weapons.forEach((bullet) => {
			if (
				bullet.pos.x > block.pos.x &&
				bullet.pos.x < block.pos.x + block.w &&
				bullet.pos.y > block.pos.y &&
				bullet.pos.y < block.pos.y + block.h
			) {
				block.kill = true;
				block.pos.y = HEIGHT + 50;
			}
		});
		particleCreator.particles.forEach((particle) => {
			if (
				particle.x > block.pos.x &&
				particle.x < block.pos.x + block.w &&
				particle.y > block.pos.y &&
				particle.y < block.pos.y + block.h
			) {
				particle.time = 100;
				particle.color = {
					r: 255,
					g: 0,
					b: 0,
				};
				particle.direction.x = block.s;
				particle.direction.y = 0;
			}
		});
	});
	particleCreator.particles.forEach((par) => {
		par.update();
		if (par.y + par.size > HEIGHT) {
			par.direction.y = 0;
			par.direction.x = 0;
		}
		if (par.y - par.size > HEIGHT) {
			par.direction.y = 0;
			par.direction.x = 0;
		}
		if (par.x + par.size > WIDTH) {
			par.direction.y = 0;
			par.direction.x = 0;
		}
		if (par.y < 0) {
			par.direction.y = 0;
			par.direction.x = 0;
		}
		if (par.y + par.size < 0) {
			par.direction.y = 0;
			par.direction.x = 0;
		}
		if (par.x + par.size < 0) {
			par.direction.y = 0;
			par.direction.x = 0;
		}
	});
	player.update();

	//player controls
	document.addEventListener('keydown', (e) => {
		if (e.key === 'w') {
			if (player.y === 0) {
				player.y = -15;
				tuto.style.visibility = 'hidden';
			}
		}
		if (e.key === 'd') {
			player.x = 4;
			tuto.style.visibility = 'hidden';
		}

		if (e.key === 'a') {
			player.x = -4;
			tuto.style.visibility = 'hidden';
		}
	});
	document.addEventListener('keyup', (e) => {
		if (e.key === 'd') {
			player.x = 0;
		}

		if (e.key === 'a') {
			player.x = 0;
		}

		if (e.key === 'e') {
			if (eco_Cooldown <= 0) {
				particleCreator.create();
				eco_Cooldown = 3;
				tuto.style.visibility = 'hidden';
			}
		}
		if (e.key === 'f') {
			if (self_Cooldown <= 0) {
				player.color = 500;
				self_Cooldown = 15;
				tuto.style.visibility = 'hidden';
			}
		}
		if (e.key === 'p') {
			playpause.click();
		}
		if (e.key === 'Escape') {
			back_Menu.click();
		}
	});
	eco_Button.addEventListener('click', () => {
		if (eco_Cooldown <= 0) {
			particleCreator.create();
			eco_Cooldown = 3;
		}
	});
	self_Button.addEventListener('click', () => {
		if (self_Cooldown <= 0) {
			player.color = 500;
			self_Cooldown = 15;
		}
	});
}

// menu vars
let pause = true;
// main menu events
playpause.addEventListener('click', () => {
	if (pause) {
		cancelAnimationFrame(id);
	}
	if (!pause) {
		requestAnimationFrame(game);
	}
	if (pause) {
		pause = false;
	} else {
		pause = true;
	}
});
back_Menu.addEventListener('click', () => {
	window.location.reload();
});

retry.addEventListener('click', () => {
	window.location.reload();
});
back_MS.addEventListener('click', () => {
	main_Menu.style.visibility = 'visible';
	settings_Menu.style.visibility = 'hidden';
});
PLAY.addEventListener('click', () => {
	main_Menu.style.visibility = 'hidden';
	game_Menu.style.visibility = 'visible';
	game();
});
SETTINGS.addEventListener('click', () => {
	main_Menu.style.visibility = 'hidden';
	settings_Menu.style.visibility = 'visible';
});

canvas.addEventListener('mousedown', (e) => {
	tuto.style.visibility = 'hidden';
	if (shoot_Cooldown <= 0) {
		const myAngle = Math.atan2(
			e.clientY - player.pos.y + player.h / 2 / 2,
			e.clientX - player.pos.x + player.w / 2,
		);
		weapons.push(
			new Weapon(
				{ x: player.pos.x + player.w / 2, y: player.pos.y + player.h / 2 },
				15,
				{ x: Math.cos(myAngle) * 10, y: Math.sin(myAngle) * 10 },
			),
		);
		shoot_Cooldown = 2;
	}
});
window.addEventListener('mousemove', (e) => {
	cursor.style.visibility = 'visible';
	cursor.style.top = e.clientY + 1 + 'px';
	cursor.style.left = e.clientX + 1 + 'px';
});
