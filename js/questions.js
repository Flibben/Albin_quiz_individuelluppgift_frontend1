//API_TOKEN: ld4F70jVN3D5kTkRKKfyVkvlCQoO6VwqhyMvlrDM
// Define class that gets questions
class QuestionsClass {
  constructor() {
    this.url = "";
    this.returnValue;
  }

  // create asyncronus method that fetch from API.
  async getQuestions() {
    let url =
      "https://quizapi.io/api/v1/questions?apiKey=ld4F70jVN3D5kTkRKKfyVkvlCQoO6VwqhyMvlrDM&limit=20";

    // try this
    try {
      const response = await fetch(url); // set a constant that await for promise to be resolved before setting response to value.
      const json = await response.json(); // --||--, to object from json.
      return json;
    } catch (err) {
      //if a throw(error that breaks the try) happens, catch it with parameter here and return object.
      // set this object later to better match an empty version of the expected object.
      console.log(err);
      return {
        url: "",
        questionsArray: [],
      };
    }
  }
}
