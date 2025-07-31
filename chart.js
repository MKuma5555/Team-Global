//   診断チャート用JS

const questionData = [
  {
    question: "META LEAFへの参加は初めてですか？",
    options: [
      { text: "はい、初めてです", value: 0 },
      { text: "数回参加したことがあります", value: 1 },
      { text: "かなり参加しています", value: 2 },
    ],
  },
  {
    question: "他のメンバーとの交流は得意な方ですか？",
    options: [
      { text: "はい、得意です！", value: 2 },
      { text: "積極的に話しかけるのは少し苦手です", value: 1 },
      { text: "一人で作業するのが好きです", value: 0 },
    ],
  },
  {
    question: "主にMETA LEAFで達成したいことは何ですか？",
    options: [
      { text: "プログラミングスキルを向上させたい", value: 1 },
      { text: "仲間を増やし、情報交換したい", value: 2 },
      { text: "集中して作業を進めたい", value: 0 },
    ],
  },
  {
    question: "あなたの得意な時間帯はありますか？",
    options: [
      { text: "朝早くから活動できます", value: 2 },
      { text: "夜に集中できます", value: 1 },
      { text: "特に決まっていません", value: 0 },
    ],
  },
  {
    question: "META LEAFに週にどれくらい参加したいですか？",
    options: [
      { text: "週に何度も参加したい", value: 2 },
      { text: "週に1〜2回程度", value: 1 },
      { text: "時間がある時に参加したい", value: 0 },
    ],
  },
];

const resultData = [
  {
    // 新規参加や一人作業を好む方向け
    range: [0, 2],
    title: "まずは体験・個別相談",
    description:
      "META LEAFへの参加が初めての方や、一人で集中して作業したいあなたには、まずはメタリーフの主である陽介さんやてつさんに直接質問してみるのがおすすめです。個別の疑問を解消し、META LEAFの雰囲気を掴みましょう。また、もくもくルームで集中して作業し、息抜きにみんなと交流するのも良いでしょう。",
  },
  {
    // 交流は苦手だが、質問したい方向け
    range: [3, 5],
    title: "初心者質問会・作業会活用",
    description:
      "積極的に話すのは苦手だけど、疑問を解決したいあなたには、毎週木曜日開催の初心者質問会がぴったりです。安心して質問できる場で、疑問を解消しましょう。また、毎週月曜日の作業会に参加して、他のメンバーの体験談や情報を得るのもおすすめです。",
  },
  {
    // 朝活や交流をしたい方向け
    range: [6, 7],
    title: "朝活・情報交換重視",
    description:
      "朝の時間を有効活用したいあなたには、朝5時から空いている朝会への参加がおすすめです。効率よく時間を使って、一日をスタートさせましょう。また、仲間との情報交換を重視するなら、月曜作業会で多くのメンバーと交流を深めましょう。",
  },
  {
    // 積極的な交流やイベント参加をしたい方向け
    range: [8, 10],
    title: "積極的な交流・イベント参加",
    description:
      "多くの仲間と交流し、さらにMETA LEAFを楽しみたいあなたは、ハッカソンや飲み会などのイベントに積極的に参加して、人脈を広げましょう！きっと新たな発見や刺激が見つかるはずです。",
  },
];
let currentStep = 0;

let totalValue = 0;

function goToNextStep() {
  if (currentStep < questionData.length - 1) {
    renderStepsBar(currentStep);
    renderQuestion(currentStep);
  }
}

function goToPrevStep() {
  if (currentStep > 0) {
    currentStep--;
    renderStepsBar(currentStep);
    renderQuestion(currentStep);
  }
}

const chartQuestions = document.getElementsByClassName("chart-question");
const choiceButtons = document.querySelector(".choice-buttons");

const renderQuestion = (step) => {
  const question = questionData[step];
  if (chartQuestions.length > 0) {
    chartQuestions[0].textContent = question.question;
  }

  choiceButtons.innerHTML = "";

  question.options.forEach((option, index) => {
    const choiceButton = document.createElement("button");
    choiceButton.classList.add(`chart-answer${index + 1}`);
    choiceButton.textContent = option.text;
    choiceButton.value = option.value;

    choiceButton.addEventListener("click", () => {
      currentStep++;
      console.log("Current step:", currentStep);
      totalValue += parseInt(choiceButton.value, 10);
      console.log("Value check", totalValue);

      if (currentStep < questionData.length) {
        renderStepsBar(currentStep); // ←ここが重要！
        renderQuestion(currentStep);
      } else {
        displayResult();
      }
    });

    choiceButtons.appendChild(choiceButton);
  });
};

const resultCard = document.querySelector(".result-card");
const resetButton = document.querySelector(".reset-btn");
resultCard.hidden = true;

function displayResult() {
  resultCard.hidden = false;
  resultCard.style.display = "flex";
  resultCard.querySelector("h3")?.remove();
  resultCard.querySelector("p")?.remove();

  const title = document.createElement("h3");
  const description = document.createElement("p");
  for (let i = 0; i < resultData.length; i++) {
    if (
      totalValue >= resultData[i].range[0] &&
      totalValue <= resultData[i].range[1]
    ) {
      console.log("check", resultData[i].title, resultData[i].description);
      title.textContent = resultData[i].title;
      description.innerHTML = resultData[i].description;
    }
  }
  resultCard.insertBefore(title, resetButton);
  resultCard.insertBefore(description, resetButton);
}

resetButton.addEventListener("click", () => {
  currentStep = 0;
  resultCard.hidden = true;
  resultCard.style.display = "none";
  choiceButtons.innerHTML = "";
  totalValue = 0;

  const oldTitle = resultCard.querySelector("h3");
  const oldDesc = resultCard.querySelector("p");
  if (oldTitle) oldTitle.remove();
  if (oldDesc) oldDesc.remove();
  renderStepsBar(currentStep); // ←リセット時もステップバー更新！
  renderQuestion(currentStep);
});

function renderStepsBar(currentStep) {
  const stepsBar = document.querySelector(".steps-bar");
  stepsBar.innerHTML = ""; // 一度中身をリセット

  for (let i = 0; i < questionData.length; i++) {
    const stepItem = document.createElement("li");
    stepItem.textContent = `${i + 1}`;
    if (i <= currentStep) {
      stepItem.classList.add("current");
    } else {
      stepItem.classList.add("before");
    }
    stepsBar.appendChild(stepItem);
  }
}

// 初期描画
renderStepsBar(currentStep);
renderQuestion(currentStep);

//
const chartStartBtn = document.getElementsByClassName("chart-start")[0];
const chartDiv = document.querySelector(".chart-wizard");

chartStartBtn.addEventListener("click", () => {
  console.log("Start button clicked");
  chartStartBtn.style.display = "none";
  chartDiv.style.display = "block";
});
