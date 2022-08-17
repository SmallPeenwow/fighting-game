import { determineWinner } from './DetermineWinner.js';
import { player, enemy } from '../index.js';

let timer = 120;
export let timerId;

export function decreaseTimer() {
	if (timer > 0) {
		timerId = setTimeout(decreaseTimer, 1000);
		timer--;
		document.querySelector('#timer').textContent = timer;
	}

	if (timer === 0) {
		determineWinner({ player, enemy, timerId });
	}
}
