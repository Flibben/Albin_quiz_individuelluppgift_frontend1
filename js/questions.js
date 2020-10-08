/* API_TOKEN: ld4F70jVN3D5kTkRKKfyVkvlCQoO6VwqhyMvlrDM


async Method getQuestions (Here we declare a class that uses fetch to get questions from an API.)
                          (async so we can AWAIT and halt code before promise from fetch is fullfilled.)
    fetch from API        (If promise is settled with a rejection from an error we use catch to log error and return empty object similar )
      If promise is settled with resolved
        add/modify answer with objects  (for easier handling later on)
        copy object with middlestep     (JSON.stringify(object to json) and JSON.parse(json to object) to get rid of references.)
      If settled with error
        log err
        return empytObject              (with simillar structure to what's expected so page doesnt crash)


Method updateQuestions
  forEach                 (takes in both value(here an object) and indexposition of value.)
    if isCurrentQuestion  (added in getQuestions. !!!OBS set to boolean value, no booleans from API. OBS!!!)
      set currentQuestion

  return CurrentQuesion    (to caller of method)

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
      data.forEach((object) => {
        object.playerChoice = JSON.parse(
          JSON.stringify(object.correct_answers)
        );
        for (const value in object.playerChoice) {
          object.playerChoice[value] = "false";
        }
      });
      this.currentQuestion = 0; // Used as pointer --> this.array[currentQuestion]
      this.array = data;
    } catch (err) {
      document.getElementById("mainContainer").innerHTML = "Nu gick något fel!"
      console.log(err);
      return {
        url: "",
        questionsArray: [],
      };
    }
  }
}
