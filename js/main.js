/* 
Runs when DOM is loaded, creates all Objects.
Class hiearchy
.....GAME.........
.......|..........
...INTERFACE......
...../....\.......
PLAYER...QUESTIONS
..................

If class is below other class, it should not be able
to do something with the above class. Information
is fetched from bottom to the top.

*/

document.addEventListener("DOMContentLoaded", function (e) {
  const game = new GameClass(); //maybe create player from inside gameclass?
  const player = new PlayerClass();
  const questions = new QuestionsClass(); 
  const interface = new InterfaceClass(player, questions); 
  questions.questionAmount = game.startGame(interface);
});