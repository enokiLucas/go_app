import { gameStateManager } from '../../../services/GameStateManager.js';
import { timer } from '../../../services/time/Timer.js';
import { loadStyles } from '../../../utils/StyleLoader.js';
import { newMatchManager } from '../../../services/NewMatchManager.js'

class ButtonNewGame extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const button = document.getElementById('bt-new-game');

		// Add event listener
		button.addEventListener('click', () => {
			this.startNewGame();
		});
	}

	startNewGame() {
		gameStateManager.resetGameState();
		timer.setTime();
		timer.setTimerBeforeMatch();
		timer.startCountdown(); // Start the timer for the new game

		const newMatchSettings = newMatchManager.getNewMatchSettings();
		gameStateManager.boardSize = newMatchSettings.boardSize;


		// Emit an event to indicate a new game has started
		document.dispatchEvent(new CustomEvent('new-game-started'));
		console.log('New game started'); // Debug log
	}
}

customElements.define('button-new-game', ButtonNewGame);
