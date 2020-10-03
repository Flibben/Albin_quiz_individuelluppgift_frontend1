/* 
create div-containers for: questions, score/current question
create elements for: question, each answer,
create eventlistener for: answers

 */

class InterfaceClass {
  constructor(player, question) {
    this.name = player.name;
    this.question = question.currentQuestion;
    this.score = player.score;
  }
  createInputInterface() {}
  createQuizzInterface() {}
  updateQuizzInterface() {}
  createEndQuizzInterface() {}
}
