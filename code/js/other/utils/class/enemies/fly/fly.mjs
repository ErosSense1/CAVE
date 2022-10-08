import {
	charge,
	ctx,
	game_Menu,
	HEIGHT,
	lose_Menu,
	shoot,
} from '../../../../main/main.mjs';

class Fly {
	constructor(pos = { x: 0, y: 0 }, w, h, target) {
		this.pos = pos;
		this.w = w;
		this.h = h;
		this.s = 0;
		this.target = target;
		this.time = 1000;
	}
	draw() {
		ctx.fillStyle = 'rgba(255,250,250,0.1)';

		ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
	}
	update() {
		this.time--;
		if (this.time > -250 && !this.kill) {
			this.draw();
			if (this.pos.x + this.w < this.target.pos.x + this.target.w / 2) {
				this.pos.x += 1;
			}
			if (this.pos.x > this.target.pos.x - this.target.w / 2) {
				this.pos.x -= 1;
			}
			if (this.time < 200) {
				charge.play();
			}
			if (this.time < 0) {
				shoot.play();
				ctx.fillStyle = 'white';
				ctx.fillRect(this.pos.x, this.pos.y, this.w, HEIGHT);
				if (
					this.target.pos.x + this.target.w < this.pos.x &&
					this.pos.x > this.target.pos.x + this.w
				) {
					game_Menu.style.visibility = 'hidden';
					lose_Menu.style.visibility = 'visible';
				}
			}
		} else {
			this.pos.y = HEIGHT * 2;
			shoot.pause();
			charge.pause();
		}
	}
}

export { Fly };
