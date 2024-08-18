import { Controller } from '@hotwired/stimulus';
import '../components/PassButton.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
      <sl-button id="button-pass" class="lieu-button">
        Pass
        <pass-button></pass-button>
      </sl-button>
    `
  }
}