const renderSurvey = surveys => {
  return surveys.map(survey => {
    return `<li>${survey.name}</li>`;
  }).join("");
};
exports.render = surveys => {
  return `<ul>${renderSurvey(surveys)}</ul>`;
};
