import { gameStateManager } from '../services/GameStateManager.js'

class ResignButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const button = document.getElementById('button-resign');

		button.addEventListener('click', () => {
			document.dispatchEvent(new CustomEvent('end-game', { detail: {
				type: 'resignation',
				player: gameStateManager.currentPlayer
			} }));
		});
	}
}

customElements.define('resign-button', ResignButton);
