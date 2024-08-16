import { Controller } from '@hotwired/stimulus';
import '../components/PanelRight/buttons/ButtonBoardSize.js'

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
    <sl-button>
      <button-board-size board-size="5"></button-board-size>
    </sl-button>

    <sl-button>
      <button-board-size board-size="9"></button-board-size>
    </sl-button>
    `;
  }
}