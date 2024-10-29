const questions = [
    { question: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: 0 },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], answer: 2 },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3 },
    { question: "What is the currency of the United Kingdom?", options: ["Dollar", "Euro", "Pound", "Yen"], answer: 2 },
   
    // ... Add remaining questions up to 10
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let incorrectAnswers = []; // Track incorrect answers
const timeLimit = 10;

function startQuiz() {
    // Hide registration form and show quiz container
    document.getElementById('registration-container').style.display = "none";
    document.getElementById('quiz-container').style.display = "block";
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionButtons = document.querySelectorAll('.option-btn');
    questionElement.textContent = questions[currentQuestionIndex].question;
    
    optionButtons.forEach((button, index) => {
        button.textContent = questions[currentQuestionIndex].options[index];
        button.classList.remove('correct', 'wrong');
    });

    startTimer(timeLimit);
}

function startTimer(duration) {
    let timeRemaining = duration;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;

    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            selectOption(-1); // Mark unanswered
            timerDisplay.textContent = "Time's up!";
        } else {
            timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;
            timeRemaining--;
        }
    }, 1000);
}

function selectOption(selectedIndex) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestionIndex].answer;
    const optionButtons = document.querySelectorAll('.option-btn');

    if (selectedIndex === correctAnswer) {
        score++;
        optionButtons[selectedIndex].classList.add('correct');
    } else {
        if (selectedIndex !== -1) {
            optionButtons[selectedIndex].classList.add('wrong');
        }
        optionButtons[correctAnswer].classList.add('correct');
        // Track incorrect answers
        incorrectAnswers.push({
            question: questions[currentQuestionIndex].question,
            selectedOption: selectedIndex === -1 ? "No Answer" : questions[currentQuestionIndex].options[selectedIndex],
            correctOption: questions[currentQuestionIndex].options[correctAnswer]
        });
    }
    document.getElementById('next-btn').style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('next-btn').style.display = "none";
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById('quiz-container').style.display = "none";
    document.getElementById('result-container').style.display = "block";
    document.getElementById('score').textContent = score;

    // Show additional buttons for Restart and Mistakes
    document.getElementById('show-mistakes-btn').style.display = "inline-block";
    document.getElementById('restart-btn').style.display = "inline-block";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    incorrectAnswers = [];
    document.getElementById('result-container').style.display = "none";
    document.getElementById('quiz-container').style.display = "none";
    document.getElementById('registration-container').style.display = "block";
}

function showMistakes() {
    let mistakesContainer = document.getElementById('mistakes-container');
    mistakesContainer.innerHTML = "<h2>Incorrect Answers:</h2>";
    incorrectAnswers.forEach(mistake => {
        mistakesContainer.innerHTML += `
            <p><strong>Question:</strong> ${mistake.question}</p>
            <p><strong>Your Answer:</strong> ${mistake.selectedOption}</p>
            <p><strong>Correct Answer:</strong> ${mistake.correctOption}</p>
            <hr>
        `;
    });
    mistakesContainer.style.display = "block";
}
