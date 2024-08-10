import { Controller } from '@hotwired/stimulus';
import '../components/PanelRight';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `<panel-right></panel-right>`;
  }
}