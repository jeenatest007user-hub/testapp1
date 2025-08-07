
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const popSound = new Audio('pop.mp3');

document.getElementById('start-btn').addEventListener('click', startQuiz);

function startQuiz() {
  fetch('questions.json')
    .then(res => res.json())
    .then(data => {
      questions = shuffleArray(data).slice(0, 10);
      document.getElementById('start-btn').classList.add('hidden');
      playMusic();
      showQuestion();
    });
}

function showQuestion() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  const question = questions[currentQuestionIndex];

  const qEl = document.createElement('h2');
  qEl.textContent = `Q${currentQuestionIndex + 1}. ${question.question}`;
  container.appendChild(qEl);

  const form = document.createElement('form');
  question.options.forEach((option, index) => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'option';
    radio.value = option;
    label.appendChild(radio);
    label.append(option);
    form.appendChild(label);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.textContent = 'Submit Answer';
  submitBtn.onclick = () => {
    const selected = form.querySelector('input[name="option"]:checked');
    if (selected) {
      playPop();
      const isCorrect = selected.value === question.correct;
      if (isCorrect) score++;
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    } else {
      alert("Please select an option!");
    }
  };

  form.appendChild(submitBtn);
  container.appendChild(form);
}

function showResult() {
  const container = document.getElementById('result-container');
  container.classList.remove('hidden');
  container.innerHTML = `<h2>Quiz Complete!</h2><p>Your score: ${score}/10</p>`;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function playMusic() {
  const audio = new Audio('background.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  audio.play().catch(e => console.log('Audio play was blocked.'));
}

function playPop() {
  popSound.currentTime = 0;
  popSound.play().catch(e => console.log('Pop sound play was blocked.'));
}
