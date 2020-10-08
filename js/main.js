/* 
game.questions points to the object questions of QuestionsClass, if something is done with questions.xxx then
game.questions.xxx will also be updated.
*/

document.addEventListener("DOMContentLoaded", function (e) {
  const game = new GameClass(); //maybe create player from inside gameclass?
  const player = new PlayerClass();
  const questions = new QuestionsClass(); 
  const interface = new InterfaceClass(player, questions); 
  questions.questionAmount = game.startGame(interface);
});