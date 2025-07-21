//   診断チャート用JS

const questionData = [
  {
    question: "META LEAFを知っていますか？",
    options: [
      { text: "知っている", value: 2 },
      { text: "聞いたことがある", value: 1 },
      { text: "知らない", value: 0 },
    ],
  },
  {
    question: "ウェブデザインの経験はありますか？",
    options: [
      { text: "経験あり", value: 2 },
      { text: "少し学んだことがある", value: 1 },
      { text: "全くの初心者", value: 0 },
    ],
  },
  {
    question: "現在の学習スタイルは？",
    options: [
      { text: "一人で勉強", value: 2 },
      { text: "スクールで勉強", value: 1 },
      { text: "特に決まってない", value: 0 },
    ],
  },
  {
    question: "最も重視することは？",
    options: [
      { text: "スキルアップ", value: 2 },
      { text: "仲間とのつながり", value: 1 },
      { text: "案件獲得", value: 0 },
    ],
  },
  {
    question: "1日の学習時間は？",
    options: [
      { text: "1時間未満", value: 2 },
      { text: "1−３時間", value: 1 },
      { text: "3時間以上", value: 0 },
    ],
  },
];
const resultData = [
  {
    range: [0, 4],
    title: "初心者",
    description:
      "ウェブデザインの経験がほとんどない方。まずは基礎から学ぶことをおすすめします。",
  },
  {
    range: [5, 8],
    title: "中級者",
    description:
      "基本的な知識はあるものの、実践経験が少ない方。プロジェクトに参加して実践力を高めましょう。",
  },
  {
    range: [9, 10],
    title: "上級者",
    description:
      "豊富な経験とスキルを持つ方。さらなるスキルアップや案件獲得に挑戦しましょう。",
  },
];

let currentStep = 0;

function goToNextStep() {
  if (currentStep < questionData.length - 1) {
    currentStep++;
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
  const title = document.createElement("h3");
  const description = document.createElement("p");
  title.textContent = "診断結果を表示！";
  description.innerHTML = "<p>結果に応じた内容をここに表示します。</p>";
  resultCard.insertBefore(title, resetButton);
  resultCard.insertBefore(description, resetButton);
}

resetButton.addEventListener("click", () => {
  currentStep = 0;
  resultCard.hidden = true;
  choiceButtons.innerHTML = "";
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
