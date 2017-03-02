class SurveyResultDecorator {
  static decorate(data) {
    data.participationRate = Number(data.response_rate * 100).toFixed(0);

    const agreementRating = [
      'Strongly disagree',
      'Disagree',
      'Indifferent',
      'Agree',
      'Strongly agree'
    ];
    data.themes.map(theme => {
      theme.questions.map(question => {
        const responsesFiltered = question.survey_responses.map(response => {
          return Number(response.response_content)
        }).filter(n => {
          return n !== 0;
        });
        const responsesSum = responsesFiltered.reduce((responseContent,n) => {
          return responseContent + n;
        });
        const responsesAverage = Number(responsesSum/responsesFiltered.length).toFixed(0);
        question.agreementRating = agreementRating[responsesAverage-1];
      });
    });

    return data;
  }
}

module.exports = SurveyResultDecorator;
