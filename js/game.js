/* HERE WE HANDLE GAME FLOW, KEEP TRACK OF QUESTIONS LEFT
0. Class Game

1.1 Start game (method)
1.2 Create object for player name, desired amount of questions
1.3 get player name as string and desired amount of questions as array

2. Use class questions to get array with questions
 2.1 random one question and let userface handle it
 2.2 when a questions is answered/done: add amount of points (score attribute in object from class player), splice out from array
 2.3 return to 2.1 until .length < 0

3.1 End game-round
3.2 Show score, give opportunity to see what player answered and rigth the right answers
3.3 Give opportunity to play again(start game)
(Need to reset questions? Maybe it isnt needed because of new object? Is it desired for a player to keep it's score or reset?) 

*/
class Game {
  constructor() {
    this.questionNumber = 0;
    this.player = {}; // game.player = player?
    this.questions = {};
  }
  startGame() {}
  updateScore() {}
  updateQuestion() {}
}
