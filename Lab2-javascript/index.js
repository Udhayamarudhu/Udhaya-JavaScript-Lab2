let score;
let questionIndex;
function Quiz(questions){
    this.score=0;
    this.questions=questions;
    this.questionIndex=0;
}

function Question(text,options,answer){
    this.text=text;
    this.options = options;
    this.answer=answer;

}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex]
}

Quiz.prototype.checkOptionWithAnswer = function(answer){
    if(this.getQuestionByIndex().answer==answer){
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function(){
    return this.questionIndex == this.questions.length;
}

let questions = [
    new Question("What is the capital of japan?",["paris","tokyo","seoul","canberra"],"tokyo"),
    new Question("How many states are in india?",[32,28,30,26],28),
    new Question("Which continent india is located? ",["Asia","Europe","North America","Africa"], "Asia"),
    new Question("What is the capital of United Kingdom?",["Berlin","Oslo","London","canberra"],"London"),
    new Question("Which country is also a condinent?",["USA","Australia","Austria","Chile"],"Australia")
]
  
let quiz = new Quiz(questions);
console.log(quiz);
function displayQuestions(){
    if(quiz.isEnded()){
        showScore();
    }
    else{
    let questionElem = document.getElementById('question')
    questionElem.innerText = quiz.getQuestionByIndex().text

    let choices = quiz.getQuestionByIndex().options
    for(let i=0;i<choices.length;i++){
        let elem = document.getElementById("choice"+i)
        elem.innerText =choices[i]
        handleBtnClick('btn'+i,choices[i])
    }

    showProgress();
}
}
function showProgress(){
    let current = quiz.questionIndex+1
    let elem =  document.getElementById('progress')
    elem.innerHTML =`Question ${current} of ${quiz.questions.length}`
}

function handleBtnClick(id,choice){
    let buttonElem = document.getElementById(id)
    buttonElem.onclick=function(){
        quiz.checkOptionWithAnswer(choice)
        displayQuestions()
    }
}

function showScore(){
    let result = `<h1>Result</h1><h2 id="score">Your score : ${quiz.score}, And mark percentage ${(quiz.score/questions.length)*100}%`
    let quizElem = document.getElementById("quiz")
    quizElem.innerHTML = result
}

displayQuestions();
