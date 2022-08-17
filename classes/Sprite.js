import { context, canvas } from '../index.js';

export class Sprite {
	constructor({ position, imageSrc }) {
		this.position = position;
		this.width = 50;
		this.height = 150;
		this.image = new Image();
		this.image.src = imageSrc;
	}

	draw() {
		context.drawImage(this.image, this.position.x, this.position.y);
	}

	update() {
		this.draw();
	}
}
