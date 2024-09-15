import { newMatchManager } from "../services/NewMatchManager.js";

class AiPlayerSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.innerHTML = `
      <form class="switch-ai-player">
        <sl-switch checked>Switch</sl-switch>
      </form>
    `;
  }

  connectedCallback() {
    const form = this.shadowRoot.querySelector('.switch-ai-player');

    form.addEventListener('sl-change', () => {
      const matchSettings = newMatchManager.getNewMatchSettings();
      let aiBool = matchSettings['aiPlayer'];

      if (aiBool) {
        aiBool = false;
      } else {
        aiBool = true;
      }
      newMatchManager.updateNewMatchSettings('aiPlayer', aiBool);
    });
  }
}

customElements.define('ai-player-switch', AiPlayerSwitch);