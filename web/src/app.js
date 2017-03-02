import request from "request";
import Surveys from './components/surveys'
import SurveyResult from './components/survey_result'

class App {
  constructor(body) {
    request.BASE_URL = 'http://localhost:4567';
    this.surveys = new Surveys(body, request);
    this.surveyResult = new SurveyResult(body, request);
  }
  init() {
    this.surveys.render();
    this.addEventListeners();
  }
  addEventListeners() {
    this.surveysEvents();
  }
  surveysEvents() {
    this.surveys.on('surveyClick', url => {
      this.surveyResult.render(url);
    });
    this.surveyResult.on('backClick', url => {
      this.surveys.render();
    });
  }
}

module.exports = App;
