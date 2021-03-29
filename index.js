const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement = document.getElementById('timer-count')
var timerCount;

//set the variables for the questions//
let shuffledQuestions, currentQuestionIndex

//Cycling through the questions on next click//
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

//What happens when start game is clicked//
function startGame() {
    timerCount = 60;
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5) 
    currentQuestionIndex = 0 
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    startTimer()
}

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount <= 0) {
            console.log("end time")
        }
    }, 6000);
}

function setNextQuestion() {
    resetstate()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

//Shows the question and possible answers//
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

//Resets the interface between questions//
function resetstate() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

//Cycles through the various answers for the corresponding questions//
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length >= currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
    startButton.classList.remove('hide')
    }
}

//Adds the corresponding color settings for correct and incorrect answers//
function setStatusClass(element, correct) {
    clearStatusClass (element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

//Clears the color setting between questions//
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//Set of questions for the game//
const questions = [
    {
        question: 'What is the traditional wing sauce?',
        answers: [
            { text: 'buffalo', correct: true},
            { text: 'ranch', correct: false},
            { text: 'dry', correct: false},
            { text: 'wet', correct: false}
        ]
    },
    {
        question: 'What does HTML stand for',
        answers: [
            { text: 'salad', correct: false},
            { text: 'text', correct: false},
            { text: 'HyperTextMarkupLink', correct: true},
            { text: 'link', correct: false}
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'camera stars sound', correct: false},
            { text: 'Style', correct: false},
            { text: 'sheet', correct: false},
            { text: 'CascadingStyleSheet', correct: true}
        ]
    },
    {
        question: 'What is an array?',
        answers: [
            { text: 'A string of Elements', correct: true},
            { text: 'rainbow', correct: false},
            { text: 'Sunshine', correct: false},
            { text: 'water', correct: false}
        ]
    },
    {
        question: 'How many hours have you worked?',
        answers: [
            { text: 'As many as needed', correct: true},
            { text: 'a lot', correct: false},
            { text: 'too many', correct: false},
            { text: 'none', correct: false}
        ]
    }
 ]