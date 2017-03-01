import Template from "../templates/surveys.html.js";

class Surveys {
  constructor(el, request) {
    this.el = el;
    this.request = request;
  }
  render() {
    const opts = {
      method: "GET",
      url: `${this.request.BASE_URL}/index.json`,
      json: true
    };
    this.request(opts, (err, xhr, data) => {
      this.el.innerHTML = Template.render(data['survey_results']);
    });
  }
}

module.exports = Surveys;
