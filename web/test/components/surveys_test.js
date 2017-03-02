import assert from "assert";
import server from "../api/index.js";
import request from "request";
import jsdom from "jsdom";
import sinon from "sinon";
import fs from "fs";
import Surveys from "../../src/components/surveys.js";
import Template from "../../src/templates/surveys.html.js";

describe('Surveys', () => {
  describe('#render()', () => {
    request.BASE_URL = 'http://localhost:4567';
    let document;
    let surveyResults = JSON.parse(fs.readFileSync("./../api/index.json", "utf8"))['survey_results'];

    before(function () {
      document = jsdom.jsdom().defaultView.document;
      server.listen(4567);
    });

    after(function () {
      server.close();
    });

    it('should consume the API and render the template', (done) => {
      let el = document.createElement("div");
      new Surveys(el, request).render();

      setTimeout(() => {
        assert.equal(el.innerHTML, Template.render(surveyResults));
        done();
      }, 20);
    });

    it('should bind events on the elements', (done) => {
      let el = document.createElement("div");
      let surveys = new Surveys(el, request);
      surveys.render();

      setTimeout(() => {
        let callbackOne = sinon.spy();
        surveys.on("surveyClick", callbackOne);
        surveys.surveyLink()[0].click();
        assert(callbackOne.withArgs(surveyResults[0]['url']).calledOnce);

        let callbackTwo = sinon.spy();
        surveys.on("surveyClick", callbackTwo);
        surveys.surveyLink()[1].click();
        assert(callbackOne.withArgs(surveyResults[1]['url']).calledOnce);

        done();
      }, 20);
    });
  });
});
