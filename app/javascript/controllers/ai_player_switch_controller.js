import { Controller } from '@hotwired/stimulus';
import '../components/ai_player_switch_component.js';

export default class extends Controller {
    connect() {
        this.element.innerHTML = `
            <form class="switch-ai-player">
                <sl-switch>AI player</sl-switch>
            </form>
        `;
    }
}