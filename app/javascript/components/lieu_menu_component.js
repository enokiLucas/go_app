import { loadStyles } from '../../utils/StyleLoader.js';

class LieuMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: open });
  }

  async connectedCallback() {
    const styleUrl = document.querySelector('[lieu-menu-url]').getAttribute('lieu-menu-url')
    await loadStyles(this.shadowRoot, styleUrl);
  }
}

customElements.define('lieu-menu', LieuMenu);
