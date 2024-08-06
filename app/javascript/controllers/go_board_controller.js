import { Controller } from '@hotwired/stimulus';
import '../components/GoBoard.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `<go-board></go-board>`;
    this.testEventListeners();
    console.log('hello111');
  }

  testEventListeners() {
    console.log('ciaoqq')
    document.addEventListener('testing-event', () => {
      console.log('helloABC');
    });
  }
}