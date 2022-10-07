import { ctx } from '../../../main/main.mjs';
import { player } from '../player/player.mjs';

class Particle {
	constructor({
		pos,
		color = { r: 255, g: 255, b: 255 },
		size,
		direction,
		lifeTime,
	}) {
		this.x = pos.x + 17.5;
		this.time = lifeTime;
		this.v = lifeTime;
		this.y = pos.y + 25;
		this.color = color;
		this.size = size;
		this.direction = direction;
		this.colorx = `rgba(${this.color.r},${this.color.g},${this.color.b},${
			this.time / this.v
		})`;
	}
	draw() {
		this.colorx = `rgba(${this.color.r},${this.color.g},${this.color.b},${
			this.time / this.v
		})`;
		ctx.fillStyle = this.colorx;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
	update() {
		this.time--;
		if (this.time > 0) {
			this.draw();
		}
		this.x += this.direction.x;
		this.y += this.direction.y;
	}
}
class Particles {
	constructor({
		pos,
		lifeTime,
		amount,
		direction = { x: 0, y: 0 },
		size,
		color,
	}) {
		this.pos = pos;
		this.time = lifeTime;
		this.amount = amount;
		this.direction = direction;
		this.size = size;
		this.particles = [];
		this.color = color;
	}
	create() {
		for (let i = 0; i < this.amount; i++) {
			let randx = Math.random() * -5 + 2.5;
			let randy = Math.random() * -5 + 2.5;
			this.particles.push(
				new Particle({
					pos: this.pos,
					color: this.color,
					size: this.size * randx * 0.2,
					direction: {
						x: randx - this.direction.x,
						y: randy - this.direction.y,
					},
					lifeTime: this.time,
				}),
			);
		}
	}
}

let particleCreator = new Particles({
	pos: player.pos,
	amount: 500,
	lifeTime: 350,
	color: {
		r: 255,
		g: 255,
		b: 255,
	},
	size: 10,
});
export { particleCreator };
