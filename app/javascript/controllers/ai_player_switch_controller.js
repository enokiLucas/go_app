import { Controller } from '@hotwired/stimulus';
import '../components/ai_player_switch_component.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
      <ai-player-switch></ai-player-switch>
    `;
  }
}