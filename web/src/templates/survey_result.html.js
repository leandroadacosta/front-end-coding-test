const renderQuestions = questions => {
  const agreementRating = [
    'Strongly disagree',
    'Disagree',
    'Indifferent',
    'Agree',
    'Strongly agree'
  ];
  return questions.map(question => {
    return `
      <li>
        <strong>${question.description}</strong>
        <br>
        ${
          agreementRating[(question.survey_responses.map(response => {
            return Number(response.response_content)
          })
          .filter(n => {
            return n !== "";
          })
          .reduce((response_content,n) => {
            return response_content + n;
          }) / question.survey_responses.length).toFixed(0)-1]
        }
      </li>
    `;
  }).join("");
};

const renderThemes = themes => {
  return themes.map(theme => {
    return `
      <h3>${theme.name}</h3>
      <ul>
        ${renderQuestions(theme.questions)}
      </ul>
    `;
  }).join("");
};

exports.render = surveyResult => {
  return `
    <p><a href="javascript:;" class="js-back-link">Return back</a></p>
    <h1>${surveyResult.name}</h1>
    <p>
      Total of ${surveyResult.participant_count} participants
      <br>
      ${Number(surveyResult.response_rate * 100).toFixed(0)}% of participation rate
    </p>
    ${renderThemes(surveyResult.themes)}
  `;
}
