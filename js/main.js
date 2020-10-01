document.addEventListener("DOMContentLoaded", async function (e) {
  //Create new player object
  let player = new Player("Albin");

  //Create new questions object
  let questions = new QuestionsClass(); //new Questions creates empty object

  // questions.getQuestions();

  //data sets to question.questionsArray after fetch has gotten back a promise that is fullfilled or rejected.
  //If fullfilled - data can be used as normal with the value thet we waited for.
  
    const questionsArray = await questions.getQuestions();
    console.log(questionsArray);
});
