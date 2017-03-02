const renderQuestions = questions => {
  return questions.map(question => {
    return `
      <li class="survey-theme__question">
        <strong>${question['description']}</strong>
        <br>
        ${question.agreementRating}
      </li>
    `;
  }).join("");
};

const renderThemes = themes => {
  return themes.map(theme => {
    return `
      <h3>${theme['name']}</h3>
      <ul class="survey-theme">
        ${renderQuestions(theme['questions'])}
      </ul>
    `;
  }).join("");
};

exports.render = surveyResult => {
  return `
    <p><a href="javascript:;" class="js-back-link">Return back</a></p>
    <h1>${surveyResult['name']}</h1>
    <p>
      Total of ${surveyResult['participant_count']} participants
      <br>
      ${surveyResult.participationRate}% of participation rate
    </p>
    ${renderThemes(surveyResult['themes'])}
  `;
}
