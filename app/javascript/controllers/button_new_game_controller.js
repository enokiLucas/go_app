import { Controller } from '@hotwired/stimulus';
import '../components/PanelRight/buttons/ButtonNewGame.js'

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
      <sl-button id="bt-new-game">
        Start New Game!
        <button-new-game></button-new-game>
      </sl-button>
    `
  }
}