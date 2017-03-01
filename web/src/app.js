import request from "browser-request";
import Surveys from './components/surveys'

class App {
  constructor(body) {
    request.BASE_URL = 'http://localhost:4567';
    this.surveys = new Surveys(body, request);
  }
  init() {
    this.surveys.render();
  }
}

module.exports = App;
