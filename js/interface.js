/* 
create div-containers for: questions, score/current question DONE
create elements for: question, each answer, DONE 
create eventlistener for: answers DONE
Empty answersContainer from elements before adding elements. DONE

add eventlistener for key rigth and left to go forward and backwards?
 */

/* createQuizInterface()
      save variable from index.html (can set visibility to hidden and later change
       when put back so user never sees this) and then delete node? */

class InterfaceClass {
  constructor(player, questions) {
    this.player = player;
    this.name = player.name;
    this.questions = questions;
    this.score = player.score;
    this.createEndScreen();
  }

  addEvtListAndSavePChoice() {
    //use map to show ability to use it? getelementsbyclass, loop over, set if statements for ++ or --
    const backward = document.getElementById("backward");
    const forward = document.getElementById("forward");

    /* eventlisteners that move currentQuestion number back and forth in value  */
    forward.addEventListener("click", this.pressForward.bind(this));
    /* arrow function --> no need to use "bind this"*/
    backward.addEventListener("click", (e) => {
      if (this.questions.currentQuestion > 0) {
        const answersContainer = Array.from(document.getElementsByClassName("answersContainer")[0].children);
        const currentQuestionObject = this.questions.array[this.questions.currentQuestion];
        let keys = Object.keys(currentQuestionObject.playerChoice);

        for (let i = 0; i < answersContainer.length; i++) {
          if (answersContainer[i].classList.contains("answerSelected")) {
            currentQuestionObject.playerChoice[keys[i]] = "true";
          } else {
            currentQuestionObject.playerChoice[keys[i]] = "false";
          }
        }
        this.questions.currentQuestion--;
        this.updateQuizzInterface();
      } else {
        console.log("hur fan ska du backa längre bak än " + this.questions.currentQuestion + " ?!?!?");
      }
    });
  }
  pressForward(e) {
    // const answersContainer = Array.from(document.getElementsByClassName("answersContainer")[0].children);
    const qArrayLength = this.questions.array.length - 1;

    if (this.questions.currentQuestion < qArrayLength) {
      const answersContainer = Array.from(document.getElementsByClassName("answersContainer")[0].children);
      const currentQuestionObject = this.questions.array[this.questions.currentQuestion];
      let keys = Object.keys(currentQuestionObject.playerChoice);
      for (let i = 0; i < answersContainer.length; i++) {
        if (answersContainer[i].classList.contains("answerSelected")) {
          currentQuestionObject.playerChoice[keys[i]] = "true";
        } else {
          currentQuestionObject.playerChoice[keys[i]] = "false";
        }
      }
      this.questions.currentQuestion++;
      this.updateQuizzInterface();
    } else {
      console.log("Det finns INGE FLER FRÅGOR ÄN " + this.questions.currentQuestion + " FÖR HELVETE; SLUTA TRYCK!");
    }
  }

  async initializeAndGetQuestions() {
    await this.questions.getQuestions();
    let pContainer = document.getElementById("playerName");
    // pContainer.innerText = this.name;
    pContainer.innerText = "Welcome " + this.player.name + "!";
    if (!this.player.playedBefore) {
      this.addEvtListAndSavePChoice();
    }
    this.updateQuizzInterface();
    console.log(this.questions.array);
  }

  updateQuizzInterface() {
    /* Get containers and create new elements and define variables*/
    const questionContainer = document.getElementsByClassName("questionContainer")[0];
    const questionContainerHTML = document.createElement("p");
    const questionCounter = document.createElement("p");
    const answersContainer = document.getElementsByClassName("answersContainer")[0];
    const wrappedAnswer = document.createElement("span");
    const index = this.questions.currentQuestion;
    const currentQuestionObject = this.questions.array[index];
    const entriesPlayer = Object.entries(currentQuestionObject.playerChoice);
    const prefixAnswerHTML = document.createElement("p");
    const answerHTML = document.createElement("p");

    this.resetQandAContainers(answersContainer, questionContainer);

    /*  fill containers with element wrapped question and answers,  information from API */
    console.log("creating new elements and filling them with question and answers ");
    questionCounter.textContent = index + 1 + "/" + this.questions.array.length;
    questionContainerHTML.textContent = currentQuestionObject.question;
    questionContainer.append(questionCounter);
    questionContainer.append(questionContainerHTML);

    /* object -> array -> forEach -> if true -> eventlistener */
    this.addElementsWithListenerForEachAnswerChoice(currentQuestionObject, wrappedAnswer, prefixAnswerHTML, answerHTML, answersContainer);
    this.setClassDependingOnPlayerChoiceObject(entriesPlayer);
  }

  resetQandAContainers(answersContainer, questionContainer) {
    while (answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }
    while (questionContainer.firstChild) {
      questionContainer.removeChild(questionContainer.firstChild);
    }
    console.log("removed previous elements in answersContainer");
  }
  addElementsWithListenerForEachAnswerChoice(currentQuestionObject, wrappedAnswer, prefixAnswerHTML, answerHTML, answersContainer) {
    Object.entries(currentQuestionObject.answers).forEach((element) => {
      if (element[1]) {
        const temp = wrappedAnswer.cloneNode(true);

        temp.addEventListener("click", (e) => {
          temp.classList.toggle("answerSelected");
        });

        prefixAnswerHTML.textContent = element[0];
        temp.append(prefixAnswerHTML.cloneNode(true));
        answerHTML.textContent = element[1];
        temp.append(answerHTML.cloneNode(true));
        answersContainer.append(temp);
      }
    });
  }

  setClassDependingOnPlayerChoiceObject(entriesPlayer) {
    // let currentQuestionObject = this.questions.array[index];
    // let entriesPlayer = Object.entries(currentQuestionObject.playerChoice);
    let answersContainer = Array.from(document.getElementsByClassName("answersContainer")[0].children);
    for (let i = 0; i < answersContainer.length; i++) {
      if (entriesPlayer[i][1] == "true") {
        answersContainer[i].classList.add("answerSelected");
      } else if (entriesPlayer[i][1] == "false" && answersContainer[i].classList.contains("answerSelected")) {
        answersContainer[i].classList.remove("answerSelected");
      }
    }
  }

  createEndScreen() {
    //correct() checking right answers - should take 2 parameters (playerchoice, array.correct_answers)
    document.getElementById("gameFinnished").addEventListener("click", (e) => {
      this.resetQandAContainers(document.getElementsByClassName("answersContainer")[0], document.getElementsByClassName("questionContainer")[0]); //breake out answercontainer and questioncontainer from updatequizzinterface? reuse code!
      document.getElementsByClassName("questionContainer")[0].innerText = this.correct();
      this.getNewQuestions()
    });
  }
  correct() {
    //skapa arrayerna elsewhere -> this is perfect for map. map what now is correctarray and pcarray to one array with 2 arrays in each index.
    let qArrayLength = this.questions.array.length;
    let rightAnswers = 0;
    let wrongAnswers = 0;
    for (let i = 0; i < qArrayLength; i++) {
      //For every everyquestion, check playerChoice to correctAnswer
      let correctArray = Object.values(this.questions.array[i].correct_answers);
      let pcArray = Object.values(this.questions.array[i].playerChoice);
      let checkLength = correctArray.length;
      let checkSum = 0;

      for (let index = 0; index < checkLength; index++) {
        if (correctArray[index] == pcArray[index]) {
          checkSum++;
        }
      }

      if (checkSum == checkLength) {
        console.log("du fick en poäng! " + ++rightAnswers + "p än så länge!");
      } else {
        console.log("wrong answers: " + ++wrongAnswers);
      }
    }
    const answersCorrectedAndGoodBye = "Thanks for playing, you got: " + rightAnswers + " right and " + wrongAnswers + " wrong. Wanna try again?";
    return answersCorrectedAndGoodBye;
  }
 getNewQuestions(){
    const newQuestionsBtn = document.createElement("button");
    const newQuestionsAmount = document.createElement("input");
    console.log(newQuestionsBtn);
    newQuestionsAmount.setAttribute("type","text");
    newQuestionsAmount.setAttribute("id","newQuestionsAmount");
    newQuestionsAmount.setAttribute("placeholder","number from 5 to 10");
    const questionContainer = document.getElementsByClassName("questionContainer")[0]; 
    newQuestionsBtn.setAttribute("id","getNewQuestions");
    newQuestionsBtn.innerText = "Get new questions";
    questionContainer.append(newQuestionsBtn);
    questionContainer.append(newQuestionsAmount)
    newQuestionsBtn.addEventListener("click", (e) => {
      this.questions.questionAmount =  Number(newQuestionsAmount.value);
      console.log(newQuestionsAmount.value);
      this.initializeAndGetQuestions();
      this.player.playedBefore = true;
    } )

  }
}
// console.log(aArray);
// console.log(cArray);
// if (JSON.stringify(aArray) == JSON.stringify(cArray)){
//   console.log("tjaba");
// }

/*let rightAnswers = 
    this.questions.array
      reduce
      every question/iteration
        loop 
          placyerchoice(make array?)
          correct_answers(make array?)
          if playerchoice(s) values === correct_answer(s) values
            return 1 point
          else
            return 0 point
    */
