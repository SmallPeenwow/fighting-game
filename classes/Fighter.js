import { context, canvas, gravity } from '../index.js';
import { Sprite } from './Sprite.js';

export class Fighter extends Sprite {
	constructor({ position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
		super({
			position,
			imageSrc,
			scale,
			framesMax,
			offset,
		});

		this.velocity = velocity;
		this.width = 50;
		this.height = 150;
		this.lastKey;
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			offset: offset,
			width: 100,
			height: 50,
		};
		this.color = color;
		this.isAttacking;
		this.health = 100;
		this.framesCurrent = 0;
		this.framesElapsed = 0;
		this.framesHold = 9;
	}

	// draw() {
	// 	context.fillStyle = this.color;
	// 	context.fillRect(this.position.x, this.position.y, this.width, this.height);

	// 	if (this.isAttacking) {
	// 		// Attack box color
	// 		context.fillStyle = 'green';
	// 		// Attack box
	// 		context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
	// 	}
	// }

	update() {
		this.draw();
		this.animateFrames();

		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
			this.velocity.y = 0;
		} else {
			this.velocity.y += gravity;
		}
	}

	attack() {
		this.isAttacking = true;

		setTimeout(() => {
			this.isAttacking = false;
		}, 100);
	}
}
