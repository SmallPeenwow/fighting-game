import { Fighter } from '../classes/Fighter.js';

export const SamuraiMack = new Fighter({
	position: { x: 150, y: 330 },
	velocity: { x: 0, y: 0 },
	offset: { x: 0, y: 0 },
	imageSrc: './warriorImages/samuraiMack/Idle-Right.png',
	framesMax: 8,
	scale: 2.5,
	offset: {
		x: 215,
		y: 156,
	},
	sprites: {
		idleRight: {
			imageSrc: './warriorImages/samuraiMack/Idle-Right.png',
			framesMax: 8,
		},
		idleLeft: {
			imageSrc: './warriorImages/samuraiMack/Idle-Left.png',
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
		jumpRight: {
			imageSrc: './warriorImages/samuraiMack/Jump-Right.png',
			framesMax: 2,
		},
		jumpLeft: {
			imageSrc: './warriorImages/samuraiMack/Jump-Left.png',
			framesMax: 2,
		},
		fallRight: {
			imageSrc: './warriorImages/samuraiMack/Fall-Right.png',
			framesMax: 2,
		},
		fallLeft: {
			imageSrc: './warriorImages/samuraiMack/Fall-Left.png',
			framesMax: 2,
		},
		attack1Right: {
			imageSrc: './warriorImages/samuraiMack/Attack1-Right.png',
			framesMax: 3,
		},
		attack2Right: {
			imageSrc: './warriorImages/samuraiMack/Attack2-Right.png',
			framesMax: 3,
		},
		attack1Left: {
			imageSrc: './warriorImages/samuraiMack/Attack1-Left.png',
			framesMax: 3,
		},
		attack2Left: {
			imageSrc: './warriorImages/samuraiMack/Attack2-Left.png',
			framesMax: 3,
		},
		takeHitRight: {
			imageSrc: './warriorImages/samuraiMack/Take Hit Right - white silhouette.png',
			framesMax: 4,
		},
		takeHitLeft: {
			imageSrc: './warriorImages/samuraiMack/Take Hit Right - white silhouette.png',
			framesMax: 4,
		},
		deathRight: {
			imageSrc: './warriorImages/samuraiMack/Death-Right.png',
			framesMax: 6,
		},
		deathLeft: {
			imageSrc: './warriorImages/samuraiMack/Death-Right.png',
			framesMax: 6,
		},
	},
	attackBox: {
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
			x: 175,
			y: 50,
		},
		height: 70,
		width: 80,
	},
});
