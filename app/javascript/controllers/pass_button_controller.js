import { Controller } from '@hotwired/stimulus';
import '../components/PassButton.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
      <sl-button variant="warning" id="button-pass" class="lieu-button" size="small" circle>
        <sl-icon name="caret-right-square-fill" label="pass move"></sl-icon>
        <pass-button></pass-button>
      </sl-button>
    `
  }
}
