import TinyEmitter from "tiny-emitter";
import Template from "../templates/survey_result.html.js";

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
      method: "GET",
      url: `${this.request.BASE_URL}${url}`,
      json: true
    };
    this.request(opts, (err, xhr, data) => {
      this.el.innerHTML = Template.render(data['survey_result_detail']);
      this.addEventListeners();
    });
  }
  backClick() {
    this.el.querySelector('.js-back-link').addEventListener('click', e => {
      this.emit("backClick");
    });
  }
}

module.exports = SurveyResult;
