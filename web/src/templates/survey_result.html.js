exports.render = surveyResult => {
  return `
    <p><a href="javascript:;" class="js-back-link">Return back</a></p>
    <h1>${surveyResult.name}</h1>
  `;
}
