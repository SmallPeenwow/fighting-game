import { Fighter } from '../classes/Fighter.js';

export const Kenji = new Fighter({
	position: { x: 750, y: 330 },
	velocity: { x: 0, y: 0 },
	color: 'blue',
	offset: { x: -50, y: 0 },
	imageSrc: './warriorImages/kenji/Idle-Left.png',
	framesMax: 4,
	scale: 2.5,
	offset: {
		x: 215,
		y: 166,
	},
	sprites: {
		idleLeft: {
			imageSrc: './warriorImages/kenji/Idle-Left.png',
			framesMax: 4,
		},
		runLeft: {
			imageSrc: './warriorImages/kenji/Run-Left.png',
			framesMax: 8,
		},
		jumpLeft: {
			imageSrc: './warriorImages/kenji/Jump-Left.png',
			framesMax: 2,
		},
		fallLeft: {
			imageSrc: './warriorImages/kenji/Fall-Left.png',
			framesMax: 2,
		},
		attack1Left: {
			imageSrc: './warriorImages/kenji/Attack1-Left.png',
			framesMax: 4,
		},
		attack2Left: {
			imageSrc: './warriorImages/kenji/Attack1-Left.png',
			framesMax: 4,
		},
		attack1Right: {
			imageSrc: './warriorImages/kenji/Attack1-Left.png',
			framesMax: 4,
		},
		attack2Right: {
			imageSrc: './warriorImages/kenji/Attack2-Left.png',
			framesMax: 4,
		},
		takeHitRight: {
			imageSrc: './warriorImages/kenji/Take Hit Left- white silhouette.png',
			framesMax: 4,
		},
		takeHitLeft: {
			imageSrc: './warriorImages/kenji/Take Hit Left- white silhouette.png',
			framesMax: 4,
		},
		deathRight: {
			imageSrc: './warriorImages/kenji/Death.png',
			framesMax: 7,
		},
		deathLeft: {
			imageSrc: './warriorImages/kenji/Death.png',
			framesMax: 7,
		},
	},
	attackBox: {
		// Not synced yet
		attackRight1: {
			offset: {
				x: 175,
				y: 50,
			},
			height: 70,
			width: 80,
		},
		attackLeft1: {
			offset: {
				x: -185,
				y: 50,
			},
			height: 70,
			width: 80,
		},
		attackRight2: {
			offset: {
				x: 175,
				y: 45,
			},
			height: 70,
			width: 90,
		},
		attackLeft2: {
			offset: {
				x: -195,
				y: 45,
			},
			height: 70,
			width: 90,
		},
		offset: {
			x: -190,
			y: 50,
		},
		width: 175,
		height: 50,
	},
});
