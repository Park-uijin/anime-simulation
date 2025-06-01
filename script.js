let currentStep = 0;
let currentStory = [];

const stories = {
  attack: [
    { type: "text", content: "당신은 훈련병으로 입단했다." },
    { type: "text", content: "사고로 거인이 침입했고, 이제 선택이 필요하다." },
    {
      type: "choice", choices: [
        { text: "싸운다", result: "당신은 무기를 들고 앞으로 나아갔다." },
        { text: "숨는다", result: "당신은 창고 뒤에 숨었다." }
      ]
    },
    { type: "text", content: "그 순간, 당신 앞에 새로운 선택지가 나타났다." },
    {
      type: "choice", choices: [
        { text: "동료를 구한다", result: "당신은 동료를 구하고 신뢰를 얻었다." },
        { text: "혼자 도망간다", result: "당신은 살아남았지만 죄책감에 시달린다." }
      ]
    },
    { type: "text", content: "당신의 여정은 이제 시작이다." }
  ],
  haikyuu: [
    { type: "text", content: "당신은 배구부에 새로 들어온 신입이다." },
    { type: "text", content: "첫 훈련에서 주장의 눈에 띄었다." },
    {
      type: "choice", choices: [
        { text: "열심히 따라간다", result: "팀워크가 점점 좋아진다." },
        { text: "혼자 연습한다", result: "기량은 늘었지만 팀과 소원해졌다." }
      ]
    },
    { type: "text", content: "연습 경기 당일, 중요한 순간이 왔다." },
    {
      type: "choice", choices: [
        { text: "서브를 한다", result: "훌륭한 서브로 점수를 얻었다!" },
        { text: "동료에게 넘긴다", result: "좋은 패스로 연결되어 득점!" }
      ]
    },
    { type: "text", content: "당신은 팀의 핵심으로 성장 중이다." }
  ]
};

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("choice-screen").classList.remove("hidden");
}

function selectStory(storyKey) {
  currentStory = stories[storyKey];
  currentStep = 0;
  document.getElementById("choice-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");
  displayStep();
}

function displayStep() {
  const step = currentStory[currentStep];
  const storyBox = document.getElementById("story-box");
  const choiceBox = document.getElementById("choice-buttons");
  const nextBtn = document.getElementById("next-button");

  choiceBox.innerHTML = "";
  choiceBox.classList.add("hidden");

  if (!step) {
    storyBox.innerText = "스토리가 종료되었습니다.";
    nextBtn.style.display = "none";
    return;
  }

  if (step.type === "text") {
    storyBox.innerText = step.content;
    nextBtn.style.display = "block";
  } else if (step.type === "choice") {
    storyBox.innerText = "선택하세요:";
    step.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => {
        storyBox.innerText = choice.result;
        nextBtn.style.display = "block";
        choiceBox.classList.add("hidden");
        currentStep++;
      };
      choiceBox.appendChild(btn);
    });
    choiceBox.classList.remove("hidden");
    nextBtn.style.display = "none";
  }
}

function nextStory() {
  currentStep++;
  displayStep();
}
