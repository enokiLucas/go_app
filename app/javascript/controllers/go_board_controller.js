import { Controller } from '@hotwired/stimulus';
import '../components/GoBoard.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `<go-board></go-board>`;
    this.testEventListeners();
    console.log('hello from connect');
  }

  testEventListeners() {
    console.log('hello from test')
    document.addEventListener('testing-event', () => {
      console.log('hello after event');
    });
  }

  
}