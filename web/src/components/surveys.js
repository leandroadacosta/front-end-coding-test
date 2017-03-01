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
    const opts = {
      method: "GET",
      url: `${this.request.BASE_URL}/index.json`,
      json: true
    };
    this.request(opts, (err, xhr, data) => {
      this.el.innerHTML = Template.render(data['survey_results']);
      this.addEventListeners();
    });
  }
  surveyClick() {
    this.el.querySelectorAll('.js-survey-link').forEach(link => {
      link.addEventListener('click', e => {
        this.emit("surveyClick", e.target.dataset.surveyUrl);
      });
    });
  }
}

module.exports = Surveys;
