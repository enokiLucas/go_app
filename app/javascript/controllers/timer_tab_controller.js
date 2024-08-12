import { Controller } from '@hotwired/stimulus';
import '../components/PanelRight/tabs/TimerTab.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `<timer-tab></timer-tab>`;
  }
}