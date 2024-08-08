import { Controller } from '@hotwired/stimulus';
import '../components/GoBoard.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = `<go-board></go-board>`;
    this.testEventListeners();
    this.testEventFromOtherComponent();
    console.log('hello from connect');
  }

  testEventListeners() {
    console.log('hello from test')
    document.addEventListener('testing-event', () => {
      console.log('hello after event');
    });
  }

  testEventFromOtherComponent() {
    console.log('hello from test 2');
    document.addEventListener('click', () => {
      console.log('Listened to the click');
    })
  }
}