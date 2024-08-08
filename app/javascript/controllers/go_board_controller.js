import { Controller } from '@hotwired/stimulus';
import '../components/GoBoard.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `<go-board></go-board>`;
    this.testEventListeners();
    this.testClick();
    this.testEventFromGameStateManager();
    console.log('hello from connect');
  }

  testEventListeners() {
    console.log('hello from test')
    document.addEventListener('testing-event', () => {
      console.log('hello after event');
    });
  }

  testClick() {
    console.log('hello from test click');
    document.addEventListener('click', () => {
      console.log('Listened to the click');
    })
  }

  testEventFromGameStateManager() {
    console.log('hello from test of GMS');
    document.addEventListener('captures-changed', (e) => {
      console.log(e.detail);
    })
  }
}