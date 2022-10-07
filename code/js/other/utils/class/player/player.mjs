import { ctx, HEIGHT, WIDTH } from '../../../main/main.mjs';

class Player {
	constructor() {
		//size
		this.w = 35;
		this.h = 50;

		//speeed
		this.x = 0;
		this.y = 0;

		this.color = 1;
		this.colorx = 500;

		//position
		this.pos = {
			x: WIDTH / 2 - this.w / 2,
			y: HEIGHT - this.h,
		};

		//gravity
		this.grav = 0.7;
	}
	draw() {
		//it draws the player on canvas
		ctx.strokeStyle = `rgba(255,255,255,${this.color / this.colorx})`;
		ctx.strokeRect(this.pos.x, this.pos.y, this.w, this.h);

		ctx.fillStyle = 'black';
		ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
	}
	update() {
		//draw
		this.color--;

		this.draw();

		//apply gravity
		this.y += this.grav;

		// update position for movement
		this.pos.x += this.x;
		this.pos.y += this.y;

		// prevents from falling on the void
		if (this.pos.y > HEIGHT - 1 - this.h) {
			this.pos.y = HEIGHT - this.h - 1;
			this.grav = 0;
			this.y = 0;
		} else {
			this.grav = 0.7;
		}
	}
}

let player = new Player();
export { player };
