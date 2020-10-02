/* API_TOKEN: ld4F70jVN3D5kTkRKKfyVkvlCQoO6VwqhyMvlrDM
Here we declare a class that uses fetch to get questions from an API.
Method set to async so we can use AWAIT and halt code before promise from fetch is fullfilled.
If promise is fullfilled with a throw/error we use catch to log error and return empty object similar
to what's expected. 
In try we add attribute currentQuestion

*/

class QuestionsClass {
  constructor() {
    this.url = "";
    this.currentQuestion;
  }

  async getQuestions() {
    let url =
      "https://quizapi.io/api/v1/questions?apiKey=ld4F70jVN3D5kTkRKKfyVkvlCQoO6VwqhyMvlrDM&limit=10";

    try {
      const response = await fetch(url);
      const data = await response.json(); // response converted to array.
      data.forEach((object) => {
        object.isCurrentQuestion = false;
      });
      data[0].isCurrentQuestion = true;
      this.array = data;
      return data;
    } catch (err) {
      console.log(err);
      return {
        url: "",
        questionsArray: [],
      };
    }
  }
  updateCurrentQuestion() {
    //forEach (first parameter is current value in indexposition, second is index for current value)
    this.array.forEach((object, index) => {
      if (object.isCurrentQuestion) {
        this.currentQuestion = this.array[index];
        return this.array[index];
      }
    });
  }
}
