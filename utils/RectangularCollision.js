export function rectangularCollision({ rectangleOne, rectangleTwo, DamageWidth }) {
	// Left side of player is [player.attackBox.position.x] ?? Right side of player is [player.attackBox.position.x + player.attackBox.width] ?? Bottom of player is [player.attackBox.position.y + player.attackBox.height]
	// Detect for collision
	console.log(DamageWidth, 'peen');
	return (
		rectangleOne.attackBox.position.x + DamageWidth >= rectangleTwo.position.x &&
		rectangleOne.attackBox.position.x <= rectangleTwo.position.x + rectangleTwo.width &&
		rectangleOne.attackBox.position.y + rectangleOne.attackBox.height >= rectangleTwo.position.y &&
		rectangleOne.attackBox.position.y <= rectangleTwo.position.y + rectangleTwo.height
	);
}
