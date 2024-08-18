import { gameStateManager } from '../services/GameStateManager.js'
import { getPlayerSGFColor } from '../utils/SGFUtil.js'

class PassButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const button = document.getElementById('button-pass');

		button.addEventListener('click', () => {
			gameStateManager.makePass(getPlayerSGFColor(gameStateManager.currentPlayer));
		});
	}
}

customElements.define('pass-button', PassButton);
