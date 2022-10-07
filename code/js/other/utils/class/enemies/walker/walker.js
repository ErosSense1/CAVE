import { ctx } from '../../../../main/main.mjs';

class Walker {
	constructor(pos = { x: 0, y: 0 }, w, h, face) {
		this.pos = pos;
		this.w = w;
		this.h = h;
		this.left = face;
		this.s = 0;
		this.kill = false;
	}
	draw() {
		ctx.fillStyle = 'black';
		ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
	}
	update() {
		if (!this.kill) {
			this.draw();
			if (this.left) {
				this.pos.x += 0.5;
				this.s = 0.5;
			} else {
				this.pos.x -= 0.5;
				this.s = -0.5;
			}
		}
	}
}

export { Walker };
