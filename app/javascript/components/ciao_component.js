// app/javascript/components/ciao_component.js
class CiaoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        /* styles here */
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('ciao-component', CiaoComponent);