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

	switchTabs() {
		const tabs = this.shadowRoot.querySelectorAll(".tabs h3");
		const tabContents = this.shadowRoot.querySelectorAll(".tab-content .custom-tab");

		tabs.forEach((tab, index) => {
			tab.addEventListener("click", () => {
				tabContents.forEach(content => {
					content.classList.remove("active");
				});
				tabs.forEach((tab) => {
					tab.classList.remove("active");
				});
				tabContents[index].classList.add("active");
				tabs[index].classList.add("active");
			});
		});
	}
}

customElements.define('panel-right', PanelRight);
