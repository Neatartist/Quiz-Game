const startEl = document.getElementById("#start");
const main = document.getElementById("#display-quiz");
const questions = document.getElementById("#questions");
const timeEl = document.getElementById("#time");
const submitEl = document.getElementById("#submit");
const highScoreEl = document.getElementById("#highScore");
const showScoreEl = document.getElementById("#show-score");
const clearEl = document.getElementById("#clear");


// quiz questions for javascript

const JAVAQuestions = [
  question1 = {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
      Correct: '<script src="xxx.js">', 
      Wrong1: '<script name="xxx.js">', 
      Wrong2: '<script href="xxx.js">', 
  },
  question2 = {
    question: 'How do you write "Hello World" in an alert box?',
      Wrong1: 'msg("Hello World")',
      Correct: 'alert("Hello World");',
      Wrong2: 'alertBox("Hello World")', 
  },
  question3 = {
    question: 'How do you create a function in JavaScript?',
      Wrong1: 'function:myFunction()', 
      Correct: 'function myFunction()',
      Wrong2: 'function = myFunction()', 
  },
  question4 = {
    question: 'How do you call a function named "myFunction"?',
      Wrong1: 'call function myFunction()', 
      Correct: 'myFunction()', 
      Wrong2: 'call myFunction()', 
  },
  question5 = {
    question: 'How to write an IF statement in JavaScript?',
      Wrong1: 'if i = 5',
      Wrong2: 'if i == 5 then', 
      Correct: 'if (i == 5)', 
  },
  question6 = {
    question: 'How does a FOR loop start?',
      Wrong1: 'for (i = 0; i <= 5)', 
      Correct: 'for (i = 0; i <= 5; i++)', 
      Wrong2: 'for i = 1 to 5',
  },
  question7 = {
  question: 'How can you add a comment in a JavaScript?',
    Correct: '//This is a comment',
    Wrong1: '<!--This is a comment-->', 
    Wrong2: '"This is a comment',
  },
  question8 = {
    question: 'how to insert a comment that has more than one line?',
      Wrong1: '/*This comment has more than one line*/', 
      Wrong2: '//This comment has more than one line//', 
      Correct: '/*This comment has more than one line*/', 
  },
];

allQuest = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8"]; 

// quiz answers for javascript


const timer; 

if(startEl !== null) {
  startEl.addEventListener("click", startQuiz) { 
    event.preventDefault();
    main.style.display = "none";
    questions.style.display = "flex";  
    timer = 60;
  
  const timerInt = setinterval(function() {
    timer--;
    timerEl.textContent = "Time" + timer;
    
    if(timer === 0 ){
      clearInterval(timerInt);
    }
  }, 1000);
  const endQuestions = setTimeout(showScoreEl, timer * 1000);

  showQuestions(JAVAQuestions[allQuest[0]], 0, endQuestions, timerInt);

  return;
  };
}

// clear local storage and reload the page 

if (clearEl !== null) {
  clearEl.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });
}

function showQuestions(question, index, endQuestions, timerInt) {
  const choices = ['Correct', 'Wrong1', 'Wrong2'];
  choices = shuffle(choices); 

  document.getElementById("#question").textContent = question.question;

  for (let i = 0; i < choices.length; i++) {
    let ques = document.createElement("li")
    document.querySelector('#answers').appendChild(ques);
    ques = document.createElement("button");
    ques.textContent = question[choices[i]];
    ques.setAttribute("id", choices[i]);
    document.querySelector('#answers').children[i].appendChild(ques);

    if(choices[i] === "correct" ){
      document.querySelector('#answers').children[i].addEventListener("click", function () {
        for(let i = 0; i < choices.length; i++){
          document.querySelector('#answers').children[0].remove();
    }

    document.querySelector('#results').textContent = "Correct!";

    setTimeout(function () {
      document.querySelector('#results').textContent = "";
    }, 1000);

    index++;

    if(index === allQuest.length || timer <= 0 ){ 
      clearTimeout(endQuestions)
      clearInterval(timerInt);

      showScoreEl();
      return;
    }

    showQuestions(JAVAQuestions[allQuest[index]], index, endQuestions, timerInt);
  });
  return; 
}
}
}

function shuffleArray(choices ) {
  const currentValue = choices.length;
  const randomValue;
  const temp; 

  while (currentValue != 0) {
    randomValue = Math.floor(Math.random() * currentValue);
    currentValue--;

    temp = choices[currentValue];

    choices[currentValue] = choices[randomValue];
    choices[randomValue] = temp;
  }
  return choices;
}

function showScoreEl(){
  questions.style.display = "none";
  showScoreEl.style.display = "flex";

  if(timer < 0){
    timer = 0;
  }

  timerEl.textContent = "time"+ timer;

  document.querySelector('#final-score').textContent = "your final score is" + timer;

  submitEl.addEventListener('click', function (event) {
    const userInfo = {
      name: userInitials.value,
      score: timer
    };
    if(userInitials.value === null || userInitials.value === ""){
      userInfo['name'] = "unknown"; 
    }
    const startScores = [];
    const prevScores = JSON.parsel(localStorage.getItem("scores"));

    if(prevScores !== null){
      sortScores(startScores, prevScores);
    }
    else  {
      startScores.push(userInfo);
      localStorage.setItem("scores", JSON.stringify(startScores));
    }
    location.replace("replace later ")
  }); 
}

function sortScores(prevScores, startScores) {
  const newIndex = 0; 
  for(let i = 0; i < prevScores.length; i++){
    if(userInfo[score] <= prevScores[i][prevScores]){
      newIndex++;
    }
  }
  prevScores.splice(newIndex, 0, userInfo);

  if(prevScores.length > 9){
    prevScores.pop();
  }
  localStorage.setItem("scores", JSON.stringify(prevScores));
} 

function  highScoreDisplay(){
  showScores.innerHTML = ""; 
  const allscores = JSON.parse(localStorage.getItem("scores"));

  if (allscores !== null ){
    for (let i = 0; i < allscores.length; i++){
      const userScore = document.createElement("li");
      userScore.textContent = allScores[i]['name'] + " - " + allScores[i]['score'];
      showScores.appendChild(userScore);
    }
  }
};