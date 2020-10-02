/* 
MAIN.js runs when DOM is loaded and triggers an async function.
AWAIT tells questionsArray to wait fetch in questions.js before it's set.
If not done like this, it's going to be set as a promise. 

Here the game starts and objects are set from classes.
game.questions points to the object questions of QuestionsClass, if something is done with questions.xxx then
game.questions.xxx will also be updated.
*/

document.addEventListener("DOMContentLoaded", async function (e) {
  let game = new Game();
  let player = new Player("Albin");
  let questions = new QuestionsClass();
  game.player = player;
  game.questions = questions;
  questions.array = await questions.getQuestions();
});
