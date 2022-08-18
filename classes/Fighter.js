import { context, canvas, gravity } from '../index.js';
import { Sprite } from './Sprite.js';

export class Fighter extends Sprite {
	constructor({ position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites }) {
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
		this.sprites = sprites;

		for (const sprite in this.sprites) {
			sprites[sprite].image = new Image();
			sprites[sprite].image.src = sprites[sprite].imageSrc;
		}
	}

	update() {
		this.draw();
		this.animateFrames();

		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
			this.velocity.y = 0;
			this.position.y = 330;
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

	switchSprite(sprite) {
		switch (sprite) {
			case 'idle':
				if (this.image !== this.sprites.idle.image) {
					this.image = this.sprites.idle.image;
					this.framesMax = this.sprites.idle.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'runRight':
				if (this.image !== this.sprites.runRight.image) {
					this.image = this.sprites.runRight.image; // Run Right
					this.framesMax = this.sprites.runRight.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'runLeft':
				if (this.image !== this.sprites.runLeft.image) {
					this.image = this.sprites.runLeft.image; // Run Left
					this.framesMax = this.sprites.runLeft.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'jump':
				if (this.image !== this.sprites.jump.image) {
					this.image = this.sprites.jump.image;
					this.framesMax = this.sprites.jump.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'fall':
				if (this.image !== this.sprites.fall.image) {
					this.image = this.sprites.fall.image;
					this.framesMax = this.sprites.fall.framesMax;
					this.framesCurrent = 0;
				}
				break;
		}
	}
}
