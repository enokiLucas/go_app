import { Controller } from '@hotwired/stimulus';
import '../components/PanelRight/buttons/ButtonBoardSize.js'

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
    <button-board-size board-size="5"></button-board-size>
    <button-board-size board-size="9"></button-board-size>
    `;
  }
}