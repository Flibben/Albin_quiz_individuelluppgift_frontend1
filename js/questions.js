/* API_TOKEN: ld4F70jVN3D5kTkRKKfyVkvlCQoO6VwqhyMvlrDM

Fetches questions with async method to force halt while getting info from API.

*/

class QuestionsClass {
  constructor() {
    this.fetchUrl = "https://quizapi.io/api/v1/questions?apiKey=ld4F70jVN3D5kTkRKKfyVkvlCQoO6VwqhyMvlrDM&limit=";
    this.currentQuestion = 0;
    this.questionAmount = 0;
  }

  async getQuestions() {
    try {
      const response = await fetch(this.fetchUrl + this.questionAmount);
      const data = await response.json(); // response converted to array.
      this.array = data.map((object) => {
        object.playerChoice = JSON.parse(JSON.stringify(object.correct_answers));
        for (const value in object.playerChoice) {
          object.playerChoice[value] = "false";
        }
        return object;
      });
      this.currentQuestion = 0; // Used as pointer --> this.array[currentQuestion]
    } catch (err) {
      document.getElementById("mainContainer").innerHTML = "Nu gick något fel!";
      console.log(err);
      return {
        questionsArray: [
          {
            "question": "It seems like something went wrong",
            "answers": {
              "It's not supposed to be like this": "Contact developer!"
            },
          },
        ],
      };
    }
  }
}
