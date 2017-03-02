import TinyEmitter from "tiny-emitter";
import Template from "../templates/surveys.html.js";

class Surveys extends TinyEmitter {
  constructor(el, request) {
    super();
    this.el = el;
    this.request = request;
  }
  render() {
    this.renderSurveys();
  }
  addEventListeners() {
    this.surveyClick();
  }
  renderSurveys() {
    this.el.innerHTML = "Loading surveys...";
    const opts = {
      url: `${this.request.BASE_URL}/index.json`,
      json: true
    };
    this.request.get(opts, (err, xhr, body) => {
      this.el.innerHTML = Template.render(body['survey_results']);
      this.addEventListeners();
    });
  }
  surveyClick() {
    this.surveyLink().forEach(link => {
      link.addEventListener('click', e => {
        this.emit("surveyClick", e.target.getAttribute('data-survey-url'));
      });
    });
  }
  surveyLink() {
    return this.el.querySelectorAll('.js-survey-link');
  }
}

module.exports = Surveys;
