function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {

        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;


        var choices = quiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + " And your percentage is: " + (quiz.score / questions.length * 100) + "%" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question(" 'A' for ?", ["Bat", "Dog", "Apple", "Cat"], "Apple"),
    new Question("10 + 5 ?", ["5", "10", "15", "20"], "15"),
    new Question("What is the capital of India ?", ["Hyderabad", "Delhi", "Banglore", "Chennai"], "Delhi"),
    new Question("Chemical formula for water is ?", ["H2O", "H2SO4", "CaCO3", "NH3"], "H2O"),
    new Question("One meter has how many centimeters ?", ["10", "100", "1000", "10000"], "100")
];


var quiz = new Quiz(questions);


loadQuestions();