class AiPlayerSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.innerHTML = `
      <sl-switch checked>Switch</sl-switch>
    `;
  }
}

customElements.define('ai-player-switch', AiPlayerSwitch);