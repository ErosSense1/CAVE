import { ctx } from '../../../main/main.mjs';

class Weapon {
	constructor(
		pos = {
			x: 0,
			y: 0,
		},
		radius,
		velocity,
	) {
		this.pos = pos;
		this.radius = radius;
		this.velocity = velocity;
	}
	draw() {
		ctx.fillStyle = 'white';
		ctx.fillRect(this.pos.x, this.pos.y, this.radius, this.radius);
	}
	update() {
		this.draw();
		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;
	}
}

export { Weapon };
