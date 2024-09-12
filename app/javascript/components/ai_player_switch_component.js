import { newMatchManager } from "../services/NewMatchManager";

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
      let ai_bool = matchSettings['ai_player'];

      if (ai_bool) {
        ai_bool = false;
      } else {
        ai_bool = true;
      }
      
      newMatchManager.updateNewMatchSettings('ai_player', ai_bool);
    });
  }
}

customElements.define('ai-player-switch', AiPlayerSwitch);