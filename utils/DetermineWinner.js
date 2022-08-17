export function determineWinner({ player, enemy, timerId }) {
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
