import { loadStyles } from '../../../utils/StyleLoader.js';
import { gameStateManager } from '../../../services/GameStateManager.js';
import { newMatchManager } from '../../../services/NewMatchManager.js';

class ButtonBoardSize extends HTMLElement {
	constructor() {
		super(); // Always call super() first in a Web Component constructor.

		// Attach a shadow root to the element.
		this.attachShadow({ mode: 'open' });

		// Set up the initial state or properties
		this.boardSize = this.getAttribute('board-size')
	}

	connectedCallback() {
		const button = document.getElementById(`slButton-${this.boardSize}`);

		// Add event listener
		button.addEventListener('click', () => {
			gameStateManager.boardSize = this.boardSize;
			newMatchManager.updateNewMatchSettings('boardSize', this.boardSize);
		});
	}

}

// Define the custom element
customElements.define('button-board-size', ButtonBoardSize);
