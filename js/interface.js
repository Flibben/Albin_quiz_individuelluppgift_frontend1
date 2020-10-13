/* 
This class creates, removes and/or gets elements and puts information inside of them
depending on the choices of player. Eventlisteners for buttons also is set here.
Most Methods, variables and eventlisteners should be self-explanatory.

Imports object Player and Questions.


*/

class InterfaceClass {
  constructor(player, questions) {
    this.player = player;
    this.name = player.name;
    this.questions = questions;
    this.score = player.score;
    this.createEndScreen();
  }

  async initializeAndGetQuestions() {
    await this.questions.getQuestions();
    let pContainer = document.getElementById("playerName");
    pContainer.innerText = "Welcome " + this.player.name + "!";
    if (!this.player.playedBefore) {
      this.addEvtListAndSavePChoice();
    }
    document.getElementById("backward").disabled = false;
    document.getElementById("forward").disabled = false;
    document.getElementById("gameFinnished").disabled = false;
    this.updateQuizzInterface();
  }

  /* Get containers and create new elements and define variables*/
  updateQuizzInterface() {
    const questionContainer = document.getElementsByClassName("questionContainer")[0];
    const questionContainerHTML = document.createElement("p");
    const questionCounter = document.createElement("p");
    questionCounter.setAttribute("class", "questionCounter");
    const answersContainer = document.getElementsByClassName("answersContainer")[0];
    const wrappedAnswer = document.createElement("span");
    const index = this.questions.currentQuestion;
    const currentQuestionObject = this.questions.array[index];
    const entriesPlayer = Object.entries(currentQuestionObject.playerChoice);
    const prefixAnswerHTML = document.createElement("p");
    const answerHTML = document.createElement("p");

    /* Reset Question and Answer containers*/
    this.resetQandAContainers(answersContainer, questionContainer);

    /*  fill containers with element wrapped question and answers,  information from API */
    console.log("creating new elements and filling them with question and answers ");
    questionCounter.textContent = "Question #" + (index + 1) + " of " + this.questions.array.length;
    questionContainerHTML.textContent = currentQuestionObject.question;
    questionContainer.append(questionCounter);
    questionContainer.append(questionContainerHTML);

    /* object -> array -> forEach -> if (question is not null) true -> eventlistener */
    this.addElementsWithListenerForEachAnswerChoice(currentQuestionObject, wrappedAnswer, prefixAnswerHTML, answerHTML, answersContainer);

    this.setClassDependingOnPlayerChoiceObject(entriesPlayer);
  }

  addEvtListAndSavePChoice() {
    const backward = document.getElementById("backward");
    const forward = document.getElementById("forward");

    /* eventlisteners moves currentQuestion number up and down in value  */
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
      //if there is a question - do this
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
    document.getElementById("gameFinnished").addEventListener("click", (e) => {
      this.resetQandAContainers(document.getElementsByClassName("answersContainer")[0], document.getElementsByClassName("questionContainer")[0]); //breake out answercontainer and questioncontainer from updatequizzinterface? reuse code!
      let p = document.createElement("p");
      //Run method Correct and save it to element.innertext
      p.innerText = this.correct();

      document.getElementsByClassName("questionContainer")[0].append(p);
      this.getNewQuestions();
      document.getElementById("backward").disabled = true;
      document.getElementById("forward").disabled = true;
      document.getElementById("gameFinnished").disabled = true;
    });
  }

  correct() {
    let qArrayLength = this.questions.array.length;
    let rightAnswers = 0;
    let wrongAnswers = 0;
    //For every everyquestion, check playerChoice to correctAnswer
    for (let i = 0; i < qArrayLength; i++) {
      let correctArray = Object.values(this.questions.array[i].correct_answers);
      let pcArray = Object.values(this.questions.array[i].playerChoice);
      let checkLength = correctArray.length;
      let checkSum = 0;
      //loops through index for answers and playerchoice. If true ++checksum
      for (let index = 0; index < checkLength; index++) {
        if (correctArray[index] == pcArray[index]) {
          checkSum++;
        }
      }

      //adds points to right or wrong answer depening on outcome. Works for multiple choice answers, all have to be right.
      if (checkSum == checkLength) {
        console.log("du fick en poäng! " + ++rightAnswers + "p än så länge!");
      } else {
        console.log("wrong answers: " + ++wrongAnswers);
      }
    }
    const answersCorrectedAndGoodBye = "Thanks for playing, you got: " + rightAnswers + " right and " + wrongAnswers + " wrong. Wanna try again?";
    return answersCorrectedAndGoodBye;
  }
  getNewQuestions() {
    const newQuestionsBtn = document.createElement("button");
    const newQuestionsAmount = document.createElement("input");
    console.log(newQuestionsBtn);
    newQuestionsAmount.setAttribute("type", "text");
    newQuestionsAmount.setAttribute("id", "newQuestionsAmount");
    newQuestionsAmount.setAttribute("placeholder", "number from 5 to 10");
    const questionContainer = document.getElementsByClassName("questionContainer")[0];
    newQuestionsBtn.setAttribute("id", "getNewQuestions");
    newQuestionsBtn.setAttribute("class", "button");
    newQuestionsBtn.innerText = "Get new questions";
    questionContainer.append(newQuestionsBtn);
    questionContainer.append(newQuestionsAmount);
    newQuestionsBtn.addEventListener("click", (e) => {
      this.questions.questionAmount = Number(newQuestionsAmount.value);
      console.log(newQuestionsAmount.value);
      this.initializeAndGetQuestions();
      this.player.playedBefore = true;
    });
  }
}
