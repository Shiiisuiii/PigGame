import '../css/style.css';
import { store } from './store.js';
import { init } from './init.js';
import { gameLogic } from './gameLogic.js';
import { changeControl } from './changeControl.js';
import dice1 from '../img/dice-1.png';
import dice2 from '../img/dice-2.png';
import dice3 from '../img/dice-3.png';
import dice4 from '../img/dice-4.png';
import dice5 from '../img/dice-5.png';
import dice6 from '../img/dice-6.png';

init();

store.btnRoll.addEventListener('click', (e) => {
	if (gameLogic.gamePlay === true) {
		let randomDice = Math.round(Math.random() * 5 + 1);
		store.dice.src = `img/dice-${randomDice}.png`;

		if (randomDice > 1) {
			gameLogic.roundScore = gameLogic.roundScore + randomDice;
			document.querySelector(`#current-${gameLogic.activePlayer}`).textContent =
				gameLogic.roundScore;
		} else {
			changeControl();
		}
	}
});

store.btnHold.addEventListener('click', (e) => {
	if (gameLogic.gamePlay === true) {
		gameLogic.scores[gameLogic.activePlayer] =
			gameLogic.scores[gameLogic.activePlayer] + gameLogic.roundScore;

		document.querySelector(`#score-${gameLogic.activePlayer}`).textContent =
			gameLogic.scores[gameLogic.activePlayer];

		if (gameLogic.scores[gameLogic.activePlayer] >= 100) {
			document.getElementById(`name-${gameLogic.activePlayer}`).textContent =
				'Winner!';
			document
				.querySelector(`.player-${gameLogic.activePlayer}-panel`)
				.classList.add('winner');
			gameLogic.gamePlay = false;
		}

		changeControl();
	}
});

store.new.addEventListener('click', init);
