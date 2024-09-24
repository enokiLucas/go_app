import { loadStyles } from '../../utils/StyleLoader.js';

class PanelRight extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		const styleUrl = document.querySelector('[panel-right-url]').getAttribute('panel-right-url');
		console.log(styleUrl);
		await loadStyles(this.shadowRoot, styleUrl);
		this.switchTabs();
	}
}

customElements.define('panel-right', PanelRight);
