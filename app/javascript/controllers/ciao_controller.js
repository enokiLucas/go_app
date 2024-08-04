// app/javascript/controllers/ciao_controller.js
import { Controller } from '@hotwired/stimulus';
import '../components/ciao_component.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
      <ciao-component>
        <slot>Bye bye, world!</slot>
      </ciao-component>
    `;
  }
}