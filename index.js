const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
	constructor({ position, velocity, color = 'red', offset }) {
		this.position = position;
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
	}

	draw() {
		context.fillStyle = this.color;
		context.fillRect(this.position.x, this.position.y, this.width, this.height);

		if (this.isAttacking) {
			// Attack box color
			context.fillStyle = 'green';
			// Attack box
			context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
		}
	}

	update() {
		this.draw();
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

const player = new Sprite({
	position: { x: 0, y: 0 },
	velocity: { x: 0, y: 0 },
	offset: { x: 0, y: 0 },
});

const enemy = new Sprite({
	position: { x: 400, y: 100 },
	velocity: { x: 0, y: 0 },
	color: 'blue',
	offset: { x: -50, y: 0 },
});

const keys = {
	a: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
	ArrowRight: {
		pressed: false,
	},
	ArrowLeft: {
		pressed: false,
	},
};

function rectangularCollision({ rectangleOne, rectangleTwo }) {
	// Left side of player is [player.attackBox.position.x] ?? Right side of player is [player.attackBox.position.x + player.attackBox.width] ?? Bottom of player is [player.attackBox.position.y + player.attackBox.height]
	// Detect for collision
	return (
		rectangleOne.attackBox.position.x + rectangleOne.attackBox.width >= rectangleTwo.position.x &&
		rectangleOne.attackBox.position.x <= rectangleTwo.position.x + rectangleTwo.width &&
		rectangleOne.attackBox.position.y + rectangleOne.attackBox.height >= rectangleTwo.position.y &&
		rectangleOne.attackBox.position.y <= rectangleTwo.position.y + rectangleTwo.height
	);
}

function determineWinner({ player, enemy, timerId }) {
	clearTimeout(timerId);

	document.querySelector('#display-result').style.display = 'flex';

	if (player.health === enemy.health) {
		document.querySelector('#display-result').textContent = 'Draw';
	} else if (player.health > enemy.health) {
		document.querySelector('#display-result').textContent = 'Player 1 Wins';
	} else if (player.health < enemy.health) {
		document.querySelector('#display-result').textContent = 'Player 2 Wins';
	}
}

let timer = 120;
let timerId;

function decreaseTimer() {
	if (timer > 0) {
		timerId = setTimeout(decreaseTimer, 1000);
		timer--;
		document.querySelector('#timer').textContent = timer;
	}

	if (timer === 0) {
		determineWinner({ player, enemy, timerId });
	}
}

decreaseTimer();

function animate() {
	window.requestAnimationFrame(animate);
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height); // clears the canvas
	player.update();
	enemy.update();

	player.velocity.x = 0; // Default player velocity is 0
	enemy.velocity.x = 0; // Default enemy velocity is 0

	// Player movement
	if (keys.a.pressed && player.lastKey === 'a') {
		player.velocity.x = -5;
	} else if (keys.d.pressed && player.lastKey === 'd') {
		player.velocity.x = 5;
	}

	// Enemy movement
	if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
		enemy.velocity.x = -5;
	} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
		enemy.velocity.x = 5;
	}

	if (rectangularCollision({ rectangleOne: player, rectangleTwo: enemy }) && player.isAttacking) {
		player.isAttacking = false;

		// Health bar decreases
		enemy.health -= 5;
		document.querySelector('#enemy-health-decrease-bar').style.width = enemy.health + '%';
	}

	if (rectangularCollision({ rectangleOne: enemy, rectangleTwo: player }) && enemy.isAttacking) {
		enemy.isAttacking = false;

		// Health bar decreases
		player.health -= 5;
		document.querySelector('#player-health-decrease-bar').style.width = player.health + '%';
	}

	//End game based on health
	if (enemy.health <= 0 || player.health <= 0) {
		determineWinner({ player, enemy, timerId });
	}
}

animate();

window.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'd':
			keys.d.pressed = true;
			player.lastKey = 'd';
			break;
		case 'a':
			keys.a.pressed = true;
			player.lastKey = 'a';
			break;
		case 'w':
			if (player.velocity.y === 0) {
				player.velocity.y = -20;
			}
			break;
		case ' ':
			player.attack();
			break;

		// Enemy player
		case 'ArrowRight':
			keys.ArrowRight.pressed = true;
			enemy.lastKey = 'ArrowRight';
			break;
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = true;
			enemy.lastKey = 'ArrowLeft';
			break;
		case 'ArrowUp':
			if (enemy.velocity.y === 0) {
				enemy.velocity.y = -20;
			}
			break;
		case 'ArrowDown':
			enemy.attack();
			break;
	}
});

window.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'd':
			keys.d.pressed = false;
			break;
		case 'a':
			keys.a.pressed = false;
			break;
	}

	// Enemy player
	switch (event.key) {
		case 'ArrowRight':
			keys.ArrowRight.pressed = false;
			enemy.lastKey = 'ArrowRight';
			break;
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = false;
			enemy.lastKey = 'ArrowLeft';
			break;
	}
});
