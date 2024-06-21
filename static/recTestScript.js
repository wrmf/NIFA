const q1c1 = document.getElementById("q1c1");
const q1c2 = document.getElementById("q1c2");
const q1c3 = document.getElementById("q1c3");
const q1c4 = document.getElementById("q1c4");

const q2c1 = document.getElementById("q2c1");
const q2c2 = document.getElementById("q2c2");
const q2c3 = document.getElementById("q2c3");
const q2c4 = document.getElementById("q2c4");

const q3c1 = document.getElementById("q3c1");
const q3c2 = document.getElementById("q3c2");
const q3c3 = document.getElementById("q3c3");
const q3c4 = document.getElementById("q3c4");

// Define the correct answers

const answers = sessionData.answers;
const correctAnswers = {
      q1: `q1c${answers[0]+1}`,
      q2: `q2c${answers[1]+1}`,
      q3: `q3c${answers[2]+1}`
}

// Initialize counter
let correctCount = 0;

// Display initial counter value
const counterElement = document.getElementById("fun");
counterElement.textContent = correctCount;

// Function to handle click events
function handleClick(event) {
  const id = event.target.id;
  const question = id.substring(0, 2);
  const correctAnswer = correctAnswers[question];

  // Remove "noanswer" class from all choices of the question
  for (let choice of ['c1', 'c2', 'c3', 'c4']) {
    const element = document.getElementById(`${question}${choice}`);
    element.classList.remove("noanswer");
  }

  if (id === correctAnswer) {
    event.target.classList.add("right");

    // Disable further input for this question
    for (let choice of ['c1', 'c2', 'c3', 'c4']) {
      const element = document.getElementById(`${question}${choice}`);
      element.removeEventListener('click', handleClick);
    }
  } else {
    event.target.classList.add("wrong");
    console.log("Wrong!");

    // Disable further input for this question
    for (let choice of ['c1', 'c2', 'c3', 'c4']) {
      const element = document.getElementById(`${question}${choice}`);
      element.removeEventListener('click', handleClick);
    }

    // Highlight the correct answer
    const correctElement = document.getElementById(correctAnswer);
    correctElement.classList.add("right");
  }

  // Update counter display
  const counterElement = document.getElementById("fun");
  counterElement.textContent = correctCount;
}

// Add event listeners to all elements
for (let question of ['q1', 'q2', 'q3']) {
  for (let choice of ['c1', 'c2', 'c3', 'c4']) {
    const element = document.getElementById(`${question}${choice}`);
    element.addEventListener('click', handleClick);
  }
}

document.getElementById("nextButton").addEventListener("click", function() {
    document.getElementById("nextSubmitButton").click();
});

document.getElementById("submitButton").addEventListener("click", function() {
    document.getElementById("submitSubmitButton").click();
});

