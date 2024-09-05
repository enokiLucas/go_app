class AiPlayerSwitch extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open'});
  }
}

customElements.define('ai-player-switch', AiPlayerSwitch);