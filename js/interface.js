/* 
create div-containers for: questions, score/current question
create elements for: question, each answer,
create eventlistener for: answers
create key with interfaceObject on questions from method createQuizzInterface
 */

/* createQuizInterface()
      save variable from index.html (can set visibility to hidden and later change
       when put back so user never sees this) and then delete node? */

class InterfaceClass {
  constructor(player, questions) {
    this.name = player.name;
    this.question = questions.currentQuestion;
    this.score = player.score;
    // this.createQuizzInterface();
  }
  createInputInterface() {} // For name and amount of questions 5-10
  // createQuizzInterface() {
  //   /* reduce and map object.entries with html tags into one array to be displayed as innerHTML at answerContainer
  //   träna för helvete i mindre format om du behöver för map och reduce, lös det bara så det kommer ut på sidan på
  //   ett acceptabelt sätt. hur jävla svårt kan det vara?! */
  //   let answersInHTML = Object.entries(this.question.answers).reduce(function (acc, item) {});
  //   let questionContainer = document.getElementsByClassName("questionContainer")[0];
  //   let answerContainer = document.getElementsByClassName("answersContainer")[0];
  //   questionContainer.innerHTML = this.question.question;
  //   answerContainer.innerHTML = Object.entries(this.question.answers);
  //   console.log(Object.entries(this.question.answers));
  // }
  updateQuizzInterface(questionObject) {
    //should start with a delete/remove of childnodes under at least answersContainer, maybe also questionContainer
    document.getElementsByClassName("questionContainer")[0].innerHTML = questionObject.question;
    let answersContainer = document.getElementsByClassName("answersContainer")[0];
    let prefixAnswerHTML = document.createElement("p");
    let answerHTML = document.createElement("p")
    Object.entries(questionObject.answers).forEach(element => {
      console.log(element);
      if(element[1]) {
        // element.forEach(answer => {
          prefixAnswerHTML.textContent = element[0]
          answersContainer.append(prefixAnswerHTML.cloneNode(true))
        };
        answerHTML.textContent = element[1];
        answersContainer.append(answerHTML.cloneNode(true))
        // element.forEach(answer){
        //   document.createElement("p")
        //   answersContainer.append()
        // }

      // }
    });


    // document.getElementsByClassName("answersContainer")[0].innerHTML = Object.entries(questionObject.answers)
    //   .reduce((HTMLString, createdHTML) => {
    //     if (createdHTML[1]) {
    //       createdHTML[0] = document.createElement("p").append(document.createTextNode(createdHTML[0]));
    //       // console.log(createdHTML[0]);
    //       createdHTML[1] = "<p>" + createdHTML[1] + "</p>";
    //       console.log(createdHTML);
    //     }
    //     return HTMLString + createdHTML
    //   })
      // .reduce((string, createdHTML) => {
      //   return string + createdHTML;
      // });

    // return;
  }
  createEndScreen() {}
}
