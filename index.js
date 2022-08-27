import { Sprite } from './classes/Sprite.js';
import { rectangularCollision } from './utils/RectangularCollision.js';
import { determineWinner } from './utils/DetermineWinner.js';
import { decreaseTimer, timerId } from './utils/Timer.js';
import { SamuraiMack } from './HeroFighters/SamuraiMack.js';
import { Kenji } from './HeroFighters/Kenji.js';

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

const flyingObelisk = new Sprite({
	position: {
		x: 10,
		y: 255,
	},
	imageSrc: './backgroundImages/FlyingObelisk.png',
	scale: 0.5,
	framesMax: 13,
});

//Create player title like one player or enemy later to get attack side
export const player = SamuraiMack;

export const enemy = Kenji;

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
	flyingObelisk.update();

	// Control canvas lighter tone
	// context.fillStyle = 'rgba(255, 255, 255, 0.07)';
	// context.fillRect(0, 0, canvas.width, canvas.height);

	player.update();
	enemy.update();

	player.velocity.x = 0; // Default player velocity is 0
	enemy.velocity.x = 0; // Default enemy velocity is 0

	// Change the different attack ranges // TODO Work on other direction that might need the offset to change for it to work
	// let playerAttackWidth = player.attackStyle === 'attackOne' ? 157 : 145;
	// let enemyAttackWidth = enemy.attackStyle === 'attackOne' ? 150 : 170;

	// Player movement
	if (keys.a.pressed && player.lastKey === 'a') {
		player.velocity.x = -5;
		player.switchSprite('runLeft');
	} else if (keys.d.pressed && player.lastKey === 'd') {
		player.velocity.x = 5;
		player.switchSprite('runRight');
	} else if (!keys.a.pressed && player.lastKey === 'a') {
		player.switchSprite('idleLeft');
	} else {
		// Player idle ?? facing side TODO
		player.switchSprite('idleRight');
	}

	// Player Jump Check Left
	if (player.velocity.y < 0 && player.lastKey === 'a') {
		player.switchSprite('jumpLeft');
	} else if (player.velocity.y > 0 && player.lastKey === 'a') {
		player.switchSprite('fallLeft');
	} else if (player.velocity.y < 0) {
		//Player Jump check Right
		player.switchSprite('jumpRight');
	} else if (player.velocity.y > 0) {
		player.switchSprite('fallRight');
	}

	// Enemy movement
	if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
		enemy.velocity.x = -5;
		enemy.switchSprite('runLeft');
	} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
		enemy.velocity.x = 5;
		enemy.switchSprite('runLeft');
	} else {
		enemy.switchSprite('idleLeft');
	}

	// Enemy Jump Check
	if (enemy.velocity.y < 0) {
		enemy.switchSprite('jumpLeft');
	} else if (enemy.velocity.y > 0) {
		enemy.switchSprite('fallLeft');
	}

	// Detect for collision & enemy gets hit
	if (
		// rectangularCollision({ rectangleOne: player, rectangleTwo: enemy, DamageWidth: playerAttackWidth }) &&
		rectangularCollision({ rectangleOne: player, rectangleTwo: enemy }) &&
		player.isAttacking &&
		player.framesCurrent === 1
	) {
		player.isAttacking = false;

		enemy.takeHit();

		gsap.to('#enemy-health-decrease-bar', {
			width: enemy.health + '%',
		});
	}

	// Player misses
	if (player.isAttacking && player.framesCurrent === 1) {
		player.isAttacking = false;
	}

	if (rectangularCollision({ rectangleOne: enemy, rectangleTwo: player }) && enemy.isAttacking && enemy.framesCurrent === 1) {
		enemy.isAttacking = false;

		player.takeHit();

		gsap.to('#player-health-decrease-bar', {
			width: player.health + '%',
		});
	}

	// Enemy misses
	if (enemy.isAttacking && enemy.framesCurrent === 1) {
		enemy.isAttacking = false;
	}

	//End game based on health
	if (enemy.health <= 0 || player.health <= 0) {
		determineWinner({ player, enemy, timerId });
	}
}

animate();

// Will be used to swap attack styles quickly
let attackTriggered = false;

window.addEventListener('keydown', (event) => {
	if (!player.dead) {
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
				// Maybe do check here to stop be chuck of health taken away when held in or something else
				player.attack();
				break;
		}
	}

	if (!enemy.dead) {
		switch (event.key) {
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
