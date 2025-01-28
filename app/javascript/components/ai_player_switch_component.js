import { newMatchManager } from "../services/NewMatchManager.js";

class AiPlayerSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.innerHTML = `
      <form class="switch-ai-player">
        <p style="margin: 0px;">AI player</p>
        <sl-switch id="ai-switch" help-text="Toggle the AI player" checked>AI Player is ON</sl-switch>
      </form>
    `;
  }

  connectedCallback() {
    const form = this.shadowRoot.querySelector('.switch-ai-player');
    const switchLabel = this.shadowRoot.getElementById('ai-switch');

    form.addEventListener('sl-change', () => {
      const matchSettings = newMatchManager.getNewMatchSettings();
      let aiBool = matchSettings['aiPlayer'];

      if (aiBool) {
        aiBool = false;
        switchLabel.innerText = 'AI Player is OFF';
      } else {
        aiBool = true;
        switchLabel.innerText = 'AI Player is ON';
      }
      newMatchManager.updateNewMatchSettings('aiPlayer', aiBool);
    });
  }
}

customElements.define('ai-player-switch', AiPlayerSwitch);
