let currentStep = 0;
let currentStory = [];

const stories = {
  attack: [
    { type: "text", content: "당신은 조사병단 훈련병으로 입단했다." },
    { type: "text", content: "벽이 무너져 거인이 침입했고, 이제 선택이 필요하다." },
    {
      type: "choice", choices: [
        { text: "싸운다", result: "당신은 무기를 들고 앞으로 나아갔다." },
        { text: "도망친다", result: "월로제로 도망친다." }
      ]
    },
    { type: "text", content: "그 순간, 당신 앞에 새로운 선택지가 나타났다." },
    {
      type: "choice", choices: [
        { text: "동료를 구한다", result: "당신도 죽고 동료도 죽었다." },
        { text: "혼자 도망간다", result: "당신은 살아남았지만 죄책감에 시달린다." }
      ]
    },
    { type: "text", content: "당신의 여정은 이제 시작이다." }
  ]
};

// 게임 시작
function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");
  currentStory = stories["attack"]; // 스토리 고정
  currentStep = 0;
  displayStep();
}

// 시작 화면 → 이름 입력 화면으로 전환
function goToNameInput() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("name-screen").classList.remove("hidden");
}

// 이름 입력 후 → 스토리 시작
function startStory() {
  const name = document.getElementById("player-name").value.trim();
  if (!name) {
    alert("이름을 입력하세요.");
    return;
  }

  selectedCharacter = name;
  currentStory = stories["attack"]; // 스토리 유지

  // 이름을 반영하여 스토리 시작 메시지 변경
  story[0].content = `웰컴, ${selectedCharacter}! 당신은 조사병단 훈련병으로 입단했다.`;

  // 게임 화면 전환
  document.getElementById("name-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");

  displayStep();
 }


// 스토리 출력
function displayStep() {
  const step = currentStory[currentStep];
  const storyBox = document.getElementById("story-box");
  const choiceBox = document.getElementById("choice-buttons");
  const nextBtn = document.getElementById("next-button");

  choiceBox.innerHTML = "";
  choiceBox.classList.add("hidden");

  if (!step) {
    document.getElementById("story-screen").classList.add("hidden");
    document.getElementById("ending-screen").classList.remove("hidden");
    return;
  }

  if (step.type === "text") {
    storyBox.innerText = step.content;
    nextBtn.style.display = "block";
  } else if (step.type === "choice") {
    step.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.className = "button"; // 공통 버튼 스타일 적용
      btn.onclick = () => {
          storyBox.innerText = choice.result;
          currentStep++;
    
          setTimeout(() => {
              displayStep(); // 1.5초 후 자동 진행
          }, 1500);


        if (choice.text === "동료를 구한다") {
            storyBox.innerText = choice.result;

            setTimeout(() => {
                document.getElementById("story-screen").classList.add("hidden");
                ocument.getElementById("ending-screen").classList.remove("hidden");
            }, 2000); // 2초 후 게임 오버 화면 전환
        }
      };
      choiceBox.appendChild(btn);
    });

    choiceBox.classList.remove("hidden");
    nextBtn.style.display = "none";
    storyBox.innerText = ""; // 선택 안내 메시지 제거
  }
}

// 다음 스텝으로 이동
function nextStory() {
  currentStep++;
  displayStep();
}

// 이전 스텝 (옵션)
function beforeStory() {
  if (currentStep > 0) {
    currentStep--;
    displayStep();
  }
}

// 처음으로
function goHome() {
  location.reload(); // 페이지 새로고침
}
