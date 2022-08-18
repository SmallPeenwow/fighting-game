import { Fighter } from './classes/Fighter.js';
import { Sprite } from './classes/Sprite.js';
import { rectangularCollision } from './utils/RectangularCollision.js';
import { determineWinner } from './utils/DetermineWinner.js';
import { decreaseTimer, timerId } from './utils/Timer.js';

export const canvas = document.querySelector('canvas');

export const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

export const gravity = 0.7;

context.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	imageSrc: './backgroundImages/background.png',
});

const shop = new Sprite({
	position: {
		x: 600,
		y: 128,
	},
	imageSrc: './backgroundImages/shop.png',
	scale: 2.75,
	framesMax: 6,
});

export const player = new Fighter({
	position: { x: 150, y: 330 },
	velocity: { x: 0, y: 0 },
	offset: { x: 0, y: 0 },
	imageSrc: './warriorImages/samuraiMack/Idle.png',
	framesMax: 8,
	scale: 2.5,
	offset: {
		x: 215,
		y: 156,
	},
	sprites: {
		idle: {
			imageSrc: './warriorImages/samuraiMack/Idle.png',
			framesMax: 8,
		},
		runRight: {
			imageSrc: './warriorImages/samuraiMack/Run-Right.png',
			framesMax: 8,
		},
		runLeft: {
			imageSrc: './warriorImages/samuraiMack/Run-Left.png',
			framesMax: 8,
		},
		jump: {
			imageSrc: './warriorImages/samuraiMack/Jump.png',
			framesMax: 2,
		},
		fall: {
			imageSrc: './warriorImages/samuraiMack/Fall.png',
			framesMax: 2,
		},
	},
});

export const enemy = new Fighter({
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

decreaseTimer();

function animate() {
	window.requestAnimationFrame(animate);
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height); // clears the canvas
	background.update();
	shop.update();
	player.update();
	//enemy.update();

	player.velocity.x = 0; // Default player velocity is 0
	enemy.velocity.x = 0; // Default enemy velocity is 0

	// Player movement
	if (keys.a.pressed && player.lastKey === 'a') {
		player.velocity.x = -5;
		player.switchSprite('runLeft');
	} else if (keys.d.pressed && player.lastKey === 'd') {
		player.velocity.x = 5;
		player.switchSprite('runRight');
	} else {
		// Player idle ?? facing side TODO
		player.switchSprite('idle');
	}

	// Player Jump check
	if (player.velocity.y < 0) {
		player.switchSprite('jump');
	} else if (player.velocity.y > 0) {
		player.switchSprite('fall');
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
				player.velocity.y = -17;
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
				enemy.velocity.y = -17;
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
