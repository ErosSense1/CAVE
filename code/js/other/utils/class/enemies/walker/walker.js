import { ctx } from '../../../../main/main.mjs';

class Walker {
	constructor(pos = { x: 0, y: 0 }, w, h, face) {
		this.pos = pos;
		this.w = w;
		this.h = h;
		this.left = face;
		this.s = 0;
	}
	draw() {
		ctx.fillStyle = 'red';
		ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
	}
	update() {
		this.draw();
		if (this.left) {
			this.pos.x++;
			this.s = 1;
		} else {
			this.pos.x--;
			this.s = -1;
		}
	}
}

export { Walker };
