import { loadStyles } from '../../../utils/StyleLoader.js';
import { gameStateManager } from '../../../services/GameStateManager.js';
import { timer } from '../../../services/time/Timer.js';

class TimerTab extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		const styleUrl = document.querySelector('[timer-url]').getAttribute('timer-url');

		this.shadowRoot.innerHTML = `
			<div class="timer black-turn">
				<div class="player-turn">Black's Turn</div>

				<div id="timer-head">
					<div class="timer-head-index black-section"> Black</div>
					<div class="timer-head-index white-section"> White</div>
				</div>

				<div id="timer-body">
					<div id="black-timer" class="black-section">00:00</div>
					<div id="white-timer" class="white-section">00:00</div>
				</div>

				<div id="timer-captures">
					<div class="captures-counter black-section">Captures: 0</div>
					<div class="captures-counter white-section">Captures: 0</div>
				</div>
			</div>
		`;
		
		await loadStyles(this.shadowRoot, styleUrl);
		
		document.addEventListener('moveMade', this.updateTimerDisplay);
		document.addEventListener('passMade', this.updateTimerDisplay);
		document.addEventListener('captures-changed', this.updateCaptureDisplay);
		this.testTimer();

	}

	disconnectedCallback() {
		// Remove the event listener when the component is removed from the DOM
		document.removeEventListener('moveMade', this.updateTimerDisplay);
		document.removeEventListener('passMade', this.updateTimerDisplay);
	}

	//Change the color of the display.
	updateTimerDisplay = (e) => {
		const currentPlayer = e.detail.player === 'black' ? 'white' : 'black';
		const timerDisplay = this.shadowRoot.querySelector('.timer');

		//Change the clor during normal play.
		if (currentPlayer === 'black') {
			timerDisplay.classList.add('black-turn');
			timerDisplay.classList.remove('white-turn');
			timerDisplay.querySelector('.player-turn').textContent = "Black's Turn";
		} else {
			timerDisplay.classList.add('white-turn');
			timerDisplay.classList.remove('black-turn');
			timerDisplay.querySelector('.player-turn').textContent = "White's Turn";
		}

		//Change the color of the display when a new game start.
		document.addEventListener('board-size-changed', () => {
			timerDisplay.classList.add('black-turn');
			timerDisplay.classList.remove('white-turn');
			timerDisplay.querySelector('.player-turn').textContent = "Black's Turn";
		});
	}

	//Change the timer depending on the time keeping method.
	async resetTimer(method) {
		const timerContainer = this.shadowRoot.getElementById('timer-body');
		try {
			// Clear the current timer display
			timerContainer.innerHTML = '';

			// Fetch and display the HTML for the selected timer method
			const methodHTML = await this.getMethodHTML(method);
			timerContainer.innerHTML = methodHTML;

			// Optionally, re-initialize or reset any timer logic here
			} catch (error) {
				console.error("Failed to load timer method HTML:", error);
			}
	}

	async getMethodHTML(method) {
		const response = await fetch(`/services/time/${method}/${method}.html`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.text();
	}

	//Update the capture display.
	updateCaptureDisplay = (e) => {
		const newScore = gameStateManager.getCaptureCounter();
		const captureCounter = this.shadowRoot.querySelector(`.captures-counter.${e.detail.player}-section`);
		captureCounter.textContent = `Captures: ${e.detail.captures}`;
	}

	testTimer() { //TEST
		timer.setTime();
		timer.setTimerPath(this.shadowRoot);
		timer.setTimerBeforeMatch();
		timer.startCountdown();
		document.addEventListener('moveMade', (e) => timer.switchTimer(e.detail.player));
		document.addEventListener('passMade', (e) => timer.switchTimer(e.detail.player));
	}

}

customElements.define('timer-tab', TimerTab);
