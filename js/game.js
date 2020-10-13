/* GAME CLASS -> Highest in class hierarky.
Method StartGame imports object Interface.
Eventlistener for  Startbutton, sets playerName(player object) and Amount of questions (questionobject)
Runs interface method initilaizeAndGetQuestions.

*/
class GameClass {
  constructor() {}

  startGame(iface) {
    const startButton = document.getElementById("startGame");
    startButton.addEventListener("click", function (e) {
      const playerName = document.getElementById("playerNameInput").value;
      if (playerName) {
        iface.player.name = playerName;
      }
      const questionAmount = document.getElementById("questionAmount").value;
      iface.questions.questionAmount = Number(questionAmount);
      iface.initializeAndGetQuestions();
    });
  }
  updateScore() {}
  updateQuestion() {}
}
