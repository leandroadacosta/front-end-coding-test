const renderSurvey = surveys => {
  return surveys.map(survey => {
    return `<li>
      <a href="javascript:;" class="js-survey-link" data-survey-url="${survey.url}">
        ${survey.name}
      </a>
    </li>`;
  }).join("");
};

exports.render = surveys => {
  return `
    <h1>Survey results</h1>
    <ul>${renderSurvey(surveys)}</ul>
  `;
};
