const params = new URLSearchParams(location.search);
const type = params.get("type") || "battle";

const quizInfo = {

  battle:{
    title:"この戦い、どっちが勝った？",
    desc:"戦国時代の勝敗を当てるクイズ"
  },

  strongest:{
    title:"戦国最強軍団クイズ",
    desc:"最強軍団・精鋭部隊クイズ"
  },

  huge:{
    title:"兵力差エグすぎ合戦クイズ",
    desc:"兵力差がヤバい戦いクイズ"
  },

  earlier:{
    title:"先に起きたのどっち？",
    desc:"時系列クイズ"
  },

  surprise:{
    title:"戦国時代の奇襲クイズ",
    desc:"奇襲作戦クイズ"
  },

  retreat:{
    title:"撤退戦が上手い武将クイズ",
    desc:"撤退戦の名人クイズ"
  },

  tactic:{
    title:"実際にあったヤバ戦術クイズ",
    desc:"実在戦術クイズ"
  },

  formation:{
    title:"この布陣、何の戦い？",
    desc:"布陣クイズ"
  }

};

const allQuestions =
  window.quizData[type] || window.quizData.battle;

const info = quizInfo[type];


document.title = info.title;

document.getElementById("pageTitle").textContent = info.title;
document.getElementById("pageDesc").textContent = info.desc;

const quizList = document.getElementById("quizList");

quizList.innerHTML = Object.keys(quizInfo).map(key => `
<a href="?type=${key}" class="${key===type ? "active" : ""}">
${quizInfo[key].title}
</a>
`).join("");

function shuffle(array){
  return [...array].sort(() => Math.random() - 0.5);
}

let questions = shuffle(allQuestions).slice(0, 50);

let current = 0;
let score = 0;
let answered = false;

function showQuestion(){

  if(current >= questions.length){
    finishQuiz();
    return;
  }

  answered = false;

  const q = questions[current];

  document.getElementById("counter").textContent =
    `${current + 1} / ${questions.length}`;

  document.getElementById("score").textContent =
    `スコア: ${score}`;

  document.getElementById("question").textContent =
    q.q;

  document.getElementById("result").textContent = "";

  document.getElementById("progressBar").style.width =
    `${(current / questions.length) * 100}%`;

  document.getElementById("choices").innerHTML =
    shuffle(q.c).map(choice => `
      <button onclick="checkAnswer(this,'${choice}')">
        ${choice}
      </button>
    `).join("");
}

function checkAnswer(button, choice){

  if(answered) return;

  answered = true;

  const q = questions[current];

  const buttons =
    document.querySelectorAll("#choices button");

  buttons.forEach(btn => {

    btn.disabled = true;

    if(btn.textContent.trim() === q.a){
      btn.classList.add("correct");
    }

  });

  if(choice === q.a){

    score++;

    button.classList.add("correct");

    document.getElementById("result").textContent =
      "正解！";

  }else{

    button.classList.add("wrong");

    document.getElementById("result").textContent =
      `不正解！ 正解は「${q.a}」`;

  }

  document.getElementById("score").textContent =
    `スコア: ${score}`;

  setTimeout(() => {

    current++;

    showQuestion();

  }, 1200);

}

function finishQuiz(){

  document.getElementById("counter").textContent =
    "終了";

  document.getElementById("question").textContent =
    "結果発表";

  document.getElementById("choices").innerHTML = `
    <div class="finish">
      <p>${questions.length}問中 ${score}問正解！</p>

      <button onclick="location.reload()">
        もう一度遊ぶ
      </button>
    </div>
  `;

}

showQuestion();
