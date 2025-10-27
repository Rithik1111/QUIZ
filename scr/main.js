// --- 1. DEFINE QUIZ QUESTIONS ---
// An array of objects, where each object is a question.
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Tech Markup Language", correct: false },
      { text: "Hyperlink and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "Which CSS property is used to change the text color?",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "color", correct: true },
      { text: "font-style", correct: false },
    ],
  },
  {
    question: "What is the correct syntax for a JavaScript comment?",
    answers: [
      { text: "<!-- This is a comment -->", correct: false },
      { text: "// This is a comment", correct: true },
      { text: "/* This is a comment", correct: false },
      { text: "# This is a comment", correct: false },
    ],
  },
  {
    question: "Which of these is NOT a JavaScript data type?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Number", correct: false },
      { text: "Float", correct: true }, // 'Float' is not a distinct type; it's just 'number'
    ],
  },
];

// --- 2. GET HTML ELEMENTS ---
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.querySelector(".quiz-container");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");

// --- 3. INITIALIZE STATE ---
let currentQuestionIndex = 0;
let score = 0;

// --- 4. MAIN FUNCTIONS ---

/**
 * Starts the quiz by resetting the state and loading the first question.
 */
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  nextButton.innerText = "Next";
  nextButton.classList.add("hidden"); // Hide next button initially
  showQuestion();
}

/**
 * Loads the current question and its answers into the DOM.
 */
function showQuestion() {
  // 1. Reset the state from the previous question
  resetState();

  // 2. Get the current question object
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;

  // 3. Create and display buttons for each answer
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButtonsElement.appendChild(button);

    // 4. Store the 'correct' status in the button's dataset
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    // 5. Add click event listener to the button
    button.addEventListener("click", selectAnswer);
  });
}

/**
 * Resets the answer buttons and hides the 'Next' button.
 */
function resetState() {
  nextButton.classList.add("hidden");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/**
 * Handles the click event on an answer button.
 */
function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // 1. Update score if correct
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  // 2. Show which answer was correct (by highlighting it)
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    // 3. Disable all buttons after an answer is selected
    button.disabled = true;
  });

  // 4. Show the 'Next' button
  nextButton.classList.remove("hidden");
}

/**
 * Displays the final score to the user.
 */
function showScore() {
  resetState();
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.innerText = `${score} out of ${questions.length}`;
}

/**
 * Handles the 'Next' button click.
 */
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    // No more questions, show the score
    showScore();
  }
}

// --- 5. EVENT LISTENERS ---

// When the 'Next' button is clicked
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  }
});

// When the 'Restart' button is clicked
restartButton.addEventListener("click", startQuiz);

// --- 6. START QUIZ ---
// Initial call to begin the quiz when the script loads
startQuiz();
