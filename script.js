const questions = [
  {
    image: 'imgs/q1.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'K',
    userAnswer: null,
    explanation: 'imgs/a1.png',
    hint: 'Please pay attention to the position of the circle and the shaded segments from left to right.'
  },
  {
    image: 'imgs/q2.png',
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 'A',
    userAnswer: null,
    explanation: 'imgs/a2.png',
    hint: 'Please look at the total number of circles, the number of circles that are grouped together, and the number of shaded circles.'
  },
  {
    image: 'imgs/q3.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'F',
    userAnswer: null,
    explanation: 'imgs/a3.png',
    hint: 'From top to bottom, pay attention to the missing edge. From left to right, pay attention to the shaded segment.'
  },
  {
    image: 'imgs/q4.png',
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 'D',
    userAnswer: null,
    explanation: 'imgs/a4.png',
    hint: 'First only upper storey windows are leaded, then only the lower storey windows are leaded, then all windows are leaded. This pattern then repeats.'
  },
  {
    image: 'imgs/q5.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Neither set A or set B',
    userAnswer: null,
    explanation: 'imgs/a5.png',
    hint: 'Let‘s look at the position of circles and crossed square.'
  },
  {
    image: 'imgs/q6.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'H',
    userAnswer: null,
    explanation: 'imgs/a6.png',
    hint: 'Please look at the rotation of the line and the total number of edges on the shapes in each box.'
  },
  {
    image: 'imgs/q7.png',
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 'B',
    userAnswer: null,
    explanation: 'imgs/a7.png',
    hint: 'Consider the rules for the two sloping cross-hatching circles separately. And pay attention to the direction that the arrow points to.'
  },
  {
    image: 'imgs/q8.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Set B',
    userAnswer: null,
    explanation: 'imgs/a8.png',
    hint: 'Look at the number of crossed boxes and shaded boxes.'
  },
  {
    image: 'imgs/q9.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F'],
    correctAnswer: 'C',
    userAnswer: null,
    explanation: 'imgs/a9.png',
    hint: 'Let‘s think of the figures as Tetris. When the entire bottom is filled, that row disappears.'
  },
  {
    image: 'imgs/q10.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Set A',
    userAnswer: null,
    explanation: 'imgs/a10.png',
    hint: 'Let‘s focus on the number of empty circles.'
  },
  {
    image: 'imgs/q11.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F'],
    correctAnswer: 'E',
    userAnswer: null,
    explanation: 'imgs/a11.png',
    hint: 'Pay attention to the total number of objects and the number of upward arrows.'
  },
  {
    image: 'imgs/q12.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Set A',
    userAnswer: null,
    explanation: 'imgs/a12.png',
    hint: 'Look at the number of half shaded squares.'
  },
  {
    image: 'imgs/q13.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'A',
    userAnswer: null,
    explanation: 'imgs/a13.png',
    hint: 'Pay attention to the total number of objects and the number of shaded objects.'
  },
];

let gameData = [];
let userName;
let startTime;
let endTime;
let timeSpent;
let helpTime = "";
let timeSpentBeforeHelp = "";
let userAnswer;
let helpRound = 0;
let timeSpentBeforeHelpSum = 0;

let currentQuestionIndex = 0;
let countdownTimer;


function start() {
  // Get user's name
  userName = document.getElementById("nameInput").value;
  document.getElementById('intro').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
  loadQuestion();
}


// document.addEventListener('DOMContentLoaded', function () {
//   loadQuestion();
// });

function loadQuestion() {
  clearCountdown();

  const currentQuestion = questions[currentQuestionIndex];

  startTime = new Date();


  const questionImage = document.querySelector('.question-image');
  questionImage.src = currentQuestion.image;


  const optionsContainer = document.querySelector('.options');
  optionsContainer.innerHTML = '';
  currentQuestion.options.forEach(option => {
    const label = document.createElement('label');
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'option';
    radioInput.value = option;
    radioInput.addEventListener('change', () => {
      currentQuestion.userAnswer = option;
      userAnswer = option;
    });
    label.appendChild(radioInput);
    label.appendChild(document.createTextNode(` ${option}`));
    optionsContainer.appendChild(label);
  });


  const nextButton = document.getElementById('nextButton');
  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Show Result' : 'Next';

  startCountdown();
}

function startCountdown() {
  const targetTime = new Date().getTime() + 2 * 60 * 1000;

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeDifference <= 0) {
      countdownElement.textContent = 'Time up!';
      clearInterval(countdownTimer);
      nextQuestion();
    }
  }

  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
}

function clearCountdown() {
  clearInterval(countdownTimer);
}

function nextQuestion() {
  document.getElementById("helpButton").disabled = false;
  endTime = new Date();
  addData(currentQuestionIndex);

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    clearInterval(countdownTimer);
    displayResults();
  }
}

function clickHelp() {
  sendMessage(questions[currentQuestionIndex].hint)
  helpTime = new Date();
  helpRound++;
  timeSpentBeforeHelpSum += (helpTime - startTime) / 1000;
  document.getElementById("helpButton").disabled = true;
}

function addData(currentQuestionIndex) {
  data = {
    no: currentQuestionIndex + 1,
    userAnswer: userAnswer,
    isCorrect: userAnswer === questions[currentQuestionIndex].correctAnswer,
    startTime: startTime.toLocaleString(),
    endTime: endTime.toLocaleString(),
    timeSpent: (endTime - startTime) / 1000,
    helpTime: helpTime.toLocaleString() || '',
    timeSpentBeforeHelp: helpTime === "" ? "" : (helpTime - startTime) / 1000,
  };
  gameData.push(data);
  helpTime = "";
}

function displayResults() {
  const questionDisplay = document.getElementById('questionDisplay');
  questionDisplay.innerHTML = '';
  const resultsDisplay = document.getElementById('resultsDisplay');
  resultsDisplay.innerHTML = '';

  const results = [];

  questions.forEach((question, index) => {
    const result = {
      userAnswer: question.userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: question.userAnswer === question.correctAnswer,
      explanation: question.explanation || '',
    };

    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.style.marginBottom = '30px';

    const questionNumber = index + 1;
    const resultText = document.createElement('p');
    resultText.innerHTML = `Q${questionNumber}: ${result.isCorrect ? 'correct' : 'wrong'}`;
    resultText.style.color = result.isCorrect ? 'green' : 'red';
    resultElement.appendChild(resultText);


    if (result.explanation) {
      const explanationImage = document.createElement('img');
      explanationImage.src = result.explanation;
      explanationImage.style.maxWidth = '700px';
      resultElement.appendChild(explanationImage);
    }

    resultsDisplay.appendChild(resultElement);
    results.push(result);
  });

  const downloadButton = document.createElement('button');
  downloadButton.textContent = 'Download Results';
  downloadButton.addEventListener('click', () => {
    downloadResults(results);
  });
  resultsDisplay.appendChild(downloadButton);
}

function downloadResults(results) {
  const correctAnswers = gameData.filter(item => item.isCorrect);
  const accuracy = parseFloat((correctAnswers.length / gameData.length).toFixed(3));

  const totalTimeSpent = gameData.reduce((total, game) => total + game.timeSpent, 0);
  const avgTimeSpent = parseFloat(totalTimeSpent / gameData.length.toFixed(3));

  const interactionData = {
    userName: userName,
    gameData: gameData,
    accuracy: accuracy,
    averageTimeSpent: avgTimeSpent,
    helpRound: helpRound,
    averageTimeSpentBeforeHelp: parseFloat((timeSpentBeforeHelpSum / helpRound).toFixed(3))
  };

  // Convert interaction data to JSON string
  const interactionJson = JSON.stringify(interactionData, null, 2);

  // Create Blob object
  const blob = new Blob([interactionJson], { type: 'application/json' });

  // Create download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);

  // Set download file name
  downloadLink.download = `${userName}_quiz.json`;

  // Append download link to the body and simulate click
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Remove download link
  document.body.removeChild(downloadLink);
}

var websocket = new WebSocket("ws://192.168.2.133:8080"); // 替换为您的 Pepper 机器人的 IP 地址和端口号

websocket.onopen = function (event) {
  console.log("WebSocket connection open");
};

websocket.onerror = function (event) {
  console.error("WebSocket connection error");
};

function sendMessage(message) {
  websocket.send(message);
}