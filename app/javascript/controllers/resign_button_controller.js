import { Controller } from '@hotwired/stimulus';
import '../components/ResignButton.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
      <sl-button variant="danger" id="button-resign" class="lieu-button" size="small" circle>
        <sl-icon name="flag-fill" label="Resign"></sl-icon>
        <resign-button></resign-button>
      </sl-button>
    `
  }
}
