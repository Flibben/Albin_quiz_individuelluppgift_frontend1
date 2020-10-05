/* 
MAIN.js runs when DOM is loaded and triggers an async function.
AWAIT tells questions.array -wait for fetch promise in questions.js to be fullfilled.

Here the game starts and objects are set from classes.
game.questions points to the object questions of QuestionsClass, if something is done with questions.xxx then
game.questions.xxx will also be updated.
*/

document.addEventListener("DOMContentLoaded", async function (e) {
  let game = new GameClass();
  let player = new PlayerClass("Albin");
  let questions = new QuestionsClass();
  questions.array = await questions.getQuestions();
  let interface = new InterfaceClass(player, questions);
  
  interface.updateQuizzInterface(questions.currentQuestion)
  console.log(questions.currentQuestion);
});