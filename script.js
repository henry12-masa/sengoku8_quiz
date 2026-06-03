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

const quizData = {

battle:[
{
q:"関ヶ原の戦いで勝利したのは？",
c:["東軍","西軍","武田軍","上杉軍"],
a:"東軍"
},
{
q:"桶狭間の戦いで勝ったのは？",
c:["織田信長","今川義元","武田信玄","北条氏康"],
a:"織田信長"
}
],

strongest:[
{
q:"武田軍の精鋭騎馬隊で有名なのは？",
c:["赤備え","母衣衆","雑賀衆","黒鍬衆"],
a:"赤備え"
},
{
q:"鉄砲傭兵集団として有名なのは？",
c:["雑賀衆","忍者衆","赤備え","新撰組"],
a:"雑賀衆"
}
],

huge:[
{
q:"桶狭間の戦いの織田軍は約？",
c:["2千","2万","5万","10万"],
a:"2千"
},
{
q:"関ヶ原の戦いの総兵力は？",
c:["16万","3万","5千","40万"],
a:"16万"
}
],

earlier:[
{
q:"先に起きたのは？",
c:["応仁の乱","関ヶ原の戦い"],
a:"応仁の乱"
},
{
q:"先に起きたのは？",
c:["桶狭間の戦い","本能寺の変"],
a:"桶狭間の戦い"
}
],

surprise:[
{
q:"桶狭間で奇襲した武将は？",
c:["織田信長","武田信玄","上杉謙信","徳川家康"],
a:"織田信長"
},
{
q:"厳島の戦いで奇襲を仕掛けたのは？",
c:["毛利元就","伊達政宗","豊臣秀吉","真田幸村"],
a:"毛利元就"
}
],

retreat:[
{
q:"島津の退き口で有名なのは？",
c:["島津義弘","武田信玄","徳川家康","直江兼続"],
a:"島津義弘"
},
{
q:"金ヶ崎の退き口で殿を務めたのは？",
c:["羽柴秀吉","石田三成","前田利家","黒田官兵衛"],
a:"羽柴秀吉"
}
],

tactic:[
{
q:"長篠の戦いで有名な戦術は？",
c:["三段撃ち","車懸り","釣り野伏せ","火牛の計"],
a:"三段撃ち"
},
{
q:"島津家の有名戦術は？",
c:["釣り野伏せ","鶴翼の陣","魚鱗の陣","車懸り"],
a:"釣り野伏せ"
}
],

formation:[
{
q:"魚鱗の陣で有名なのは？",
c:["武田信玄","徳川家康","毛利元就","伊達政宗"],
a:"武田信玄"
},
{
q:"鶴翼の陣で有名な戦いは？",
c:["長篠の戦い","桶狭間の戦い","関ヶ原の戦い","厳島の戦い"],
a:"長篠の戦い"
}
]

};

const info = quizInfo[type];
const allQuestions = quizData[type];

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

let questions = shuffle(allQuestions);

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