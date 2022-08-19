import { context, canvas, gravity } from '../index.js';
import { Sprite } from './Sprite.js';

export class Fighter extends Sprite {
	constructor({ position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites, attackStyle }) {
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
		this.attackStyle = attackStyle; //

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
		this.switchSprite('attack1Right');
		this.isAttacking = true;

		setTimeout(() => {
			this.isAttacking = false;
		}, 100);
	}

	switchSprite(sprite) {
		if (this.image === this.sprites.attack1Right.image && this.framesCurrent < this.sprites.attack1Right.frames - 1) return;

		switch (sprite) {
			case 'idleRight':
				if (this.image !== this.sprites.idleRight.image) {
					this.image = this.sprites.idleRight.image;
					this.framesMax = this.sprites.idleRight.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'idleLeft':
				if (this.image !== this.sprites.idleLeft.image) {
					this.image = this.sprites.idleLeft.image;
					this.framesMax = this.sprites.idleLeft.framesMax;
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
			case 'jumpRight':
				if (this.image !== this.sprites.jumpRight.image) {
					this.image = this.sprites.jumpRight.image;
					this.framesMax = this.sprites.jumpRight.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'jumpLeft':
				if (this.image !== this.sprites.jumpLeft.image) {
					this.image = this.sprites.jumpLeft.image;
					this.framesMax = this.sprites.jumpLeft.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'fallRight':
				if (this.image !== this.sprites.fallRight.image) {
					this.image = this.sprites.fallRight.image;
					this.framesMax = this.sprites.fallRight.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'fallLeft':
				if (this.image !== this.sprites.fallLeft.image) {
					this.image = this.sprites.fallLeft.image;
					this.framesMax = this.sprites.fallLeft.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'attack1Right':
				if (this.image !== this.sprites.attack1Right.image) {
					this.image = this.sprites.attack1Right.image;
					this.framesMax = this.sprites.attack1Right.framesMax;
					this.framesCurrent = 0;
				}
				break;
		}
	}
}
