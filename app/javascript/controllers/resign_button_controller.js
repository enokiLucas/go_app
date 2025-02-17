import { Controller } from '@hotwired/stimulus';
import '../components/ResignButton.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
      <sl-button variant="danger" id="button-resign" class="lieu-button" size="medium">
        Resign
        <resign-button></resign-button>
      </sl-button>
    `
  }
}
