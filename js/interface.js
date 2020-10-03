/* 
create div-containers for: questions, score/current question
create elements for: question, each answer,
create eventlistener for: answers
create key with interfaceObject on questions from method createQuizzInterface
 */

class InterfaceClass {
  constructor(player, questions) {
    this.name = player.name;
    this.question = questions.currentQuestion;
    this.score = player.score;
    this.createQuizzInterface();
    //create div-container for questions
    //create div-container for score/name/currentQuestion(number)
  }
  createInputInterface() {} // For name and amount of questions 5-10
  createQuizzInterface() {
    /*save variable from index.html (can set visibility to hidden and later change
       when put back so user never sees this) and then delete node??
        Create variables here through javascript doesnt seem to be a very readable way of doing it.
        And, definitly a waste of time */
    this.divContainerQuestions = document.createElement("div");
    this.divContainerQuestions.setAttribute("id", "divCointainerQuestions");
    this.divCurrentQuestion = document.createElement("div");
    this.divCurrentQuestion.setAttribute("id", "currentQuestion");

    console.log(this.divContainerQuestions);
  }
  updateQuizzInterface(/*take currentQuestion as parameter*/) {}
  createEndScreen() {}
}
