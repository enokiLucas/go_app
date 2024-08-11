import { Controller } from '@hotwired/stimulus';
import '../components/PanelRight/PanelRight.js';
import '../components/PanelRight/tabs/TabMatchSettings.js';
import '../components/PanelRight/tabs/TimerTab.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `
    <panel-right>
          <timer-tab></timer-tab>
    </panel-right>`;
  }
}