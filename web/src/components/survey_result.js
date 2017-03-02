import TinyEmitter from "tiny-emitter";
import Template from "../templates/survey_result.html.js";
import SurveyResultDecorator from "../decorators/survey_result_decorator.js";

class SurveyResult extends TinyEmitter {
  constructor(el, request) {
    super();
    this.el = el;
    this.request = request;
  }
  render(url) {
    this.renderSurveyResult(url);
  }
  addEventListeners() {
    this.backClick();
  }
  renderSurveyResult(url) {
    const opts = {
      url: `${this.request.BASE_URL}${url}`,
      json: true
    };
    this.request.get(opts, (err, xhr, body) => {
      this.el.innerHTML = Template.render(
          SurveyResultDecorator.decorate(body['survey_result_detail'])
      );
      this.addEventListeners();
    });
  }
  backClick() {
    backLink().addEventListener('click', e => {
      this.emit("backClick");
    });
  }
  backLink() {
    return this.el.querySelector('.js-back-link');
  }
}

module.exports = SurveyResult;
