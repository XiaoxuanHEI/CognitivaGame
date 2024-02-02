const questions = [
  {
    image: 'imgs/q1.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'K',
    userAnswer: null,
    explanation: 'imgs/a1.png'
  },
  {
    image: 'imgs/q2.png',
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 'A',
    userAnswer: null,
    explanation: 'imgs/a2.png'
  },
  {
    image: 'imgs/q3.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Set B',
    userAnswer: null,
    explanation: 'imgs/a3.png'
  },
  {
    image: 'imgs/q4.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'F',
    userAnswer: null,
    explanation: 'imgs/a4.png'
  },
  {
    image: 'imgs/q5.png',
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 'D',
    userAnswer: null,
    explanation: 'imgs/a5.png'
  },
  {
    image: 'imgs/q6.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Neither set A or set B',
    userAnswer: null,
    explanation: 'imgs/a6.png'
  },
  {
    image: 'imgs/q7.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'H',
    userAnswer: null,
    explanation: 'imgs/a7.png'
  },
  {
    image: 'imgs/q8.png',
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 'B',
    userAnswer: null,
    explanation: 'imgs/a8.png'
  },
  {
    image: 'imgs/q9.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Set B',
    userAnswer: null,
    explanation: 'imgs/a9.png'
  },
  {
    image: 'imgs/q10.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'A',
    userAnswer: null,
    explanation: 'imgs/a10.png'
  },
  {
    image: 'imgs/q11.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F'],
    correctAnswer: 'C',
    userAnswer: null,
    explanation: 'imgs/a11.png'
  },
  {
    image: 'imgs/q12.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Set A',
    userAnswer: null,
    explanation: 'imgs/a12.png'
  },
  {
    image: 'imgs/q13.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'B',
    userAnswer: null,
    explanation: 'imgs/a13.png'
  },
  {
    image: 'imgs/q14.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F'],
    correctAnswer: 'A',
    userAnswer: null,
    explanation: 'imgs/a14.png'
  },
  {
    image: 'imgs/q15.png',
    options: ['Set A', 'Set B', 'Neither set A or set B'],
    correctAnswer: 'Set A',
    userAnswer: null,
    explanation: 'imgs/a15.png'
  },
  {
    image: 'imgs/q16.png',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    correctAnswer: 'A',
    userAnswer: null,
    explanation: 'imgs/a16.png'
  },

];

let currentQuestionIndex = 0;
let countdownTimer; // 用于存储倒计时的定时器

document.addEventListener('DOMContentLoaded', function () {
  loadQuestion();
  // startCountdown(); // 开始第一题的倒计时
});

function loadQuestion() {
  clearCountdown(); // 清除上一题的定时器

  const currentQuestion = questions[currentQuestionIndex];

  // 更新题目图片
  const questionImage = document.querySelector('.question-image');
  questionImage.src = currentQuestion.image;

  // 更新选项
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
    });
    label.appendChild(radioInput);
    label.appendChild(document.createTextNode(` ${option}`));
    optionsContainer.appendChild(label);
  });

  // 判断是否是最后一题，如果是，则将按钮文本修改为 "Show Result"，否则为 "Next"
  const nextButton = document.getElementById('nextButton');
  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Show Result' : 'Next';
  
  startCountdown(); // 开始新题的倒计时
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
      countdownElement.textContent = '时间到!';
      clearInterval(countdownTimer); // 清除定时器
      nextQuestion(); // 跳转到下一题
    }
  }

  updateCountdown(); // 初始更新一次
  countdownTimer = setInterval(updateCountdown, 1000); // 每秒更新一次
}

function clearCountdown() {
  clearInterval(countdownTimer); // 清除上一题的定时器
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    // alert('恭喜，所有题目已经答完了！');
    // 这里可以添加完成所有题目后的操作
    displayResults();
  }
}

function displayResults() {
  const questionDisplay = document.getElementById('questionDisplay');
  questionDisplay.innerHTML= '';
  const resultsDisplay = document.getElementById('resultsDisplay');
  resultsDisplay.innerHTML = ''; // 清空之前的内容

  const results = [];

  questions.forEach((question, index) => {
    const result = {
      image: question.image,
      userAnswer: question.userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: question.userAnswer === question.correctAnswer,
      explanation: question.explanation || ''
    };

    // 生成结果元素
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.style.marginBottom = '30px'; // 添加样式，例如 margin-bottom

    // 添加题号、对错标识和对应颜色
    const questionNumber = index + 1;
    const resultText = document.createElement('p');
    resultText.innerHTML = `Q${questionNumber}: ${result.isCorrect ? 'correct' : 'wrong'}`;
    resultText.style.color = result.isCorrect ? 'green' : 'red';
    resultElement.appendChild(resultText);

    // 答案解释图片
    if (result.explanation) {
      const explanationImage = document.createElement('img');
      explanationImage.src = result.explanation;
      explanationImage.style.maxWidth = '1000px'; // 设置最大宽度为600px
      resultElement.appendChild(explanationImage);
    }
  

    // 将结果元素插入到显示区域
    resultsDisplay.appendChild(resultElement);

    results.push(result);
  });

  console.log(results); // 这里可以根据需求处理结果数组，比如显示在页面上、存储到数据库等



}
