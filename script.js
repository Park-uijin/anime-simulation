// script.js

// 전역 변수 선언
let currentStep = 0;
let currentStory = [];
let selectedCharacter = "";

// 스토리 데이터 (예시)
const stories = {
  attack: [
    // 0번: 이름 반영 부분은 시작 전 별도로 처리
    { type: "text", content: "당신은 조사병단 훈련병으로 입단했다." },
    { type: "text", content: "벽이 무너져 거인이 침입했고, 이제 선택이 필요하다." },
    {
      type: "choice",
      choices: [
        { text: "싸운다", result: "당신은 무기를 들고 앞으로 나아갔다." },
        { text: "도망친다", result: "월로제로 도망친다." }
      ]
    },
    { type: "text", content: "그 순간, 당신 앞에 새로운 선택지가 나타났다." },
    {
      type: "choice",
      choices: [
        { text: "동료를 구한다", result: "당신도 죽고 동료도 죽었다." },
        { text: "혼자 도망간다", result: "당신은 살아남았지만 죄책감에 시달린다." }
      ]
    },
    { type: "text", content: "당신의 여정은 이제 시작이다." }
  ]
};

// 시작 버튼(시작 화면 → 이름 입력 화면)
function goToNameInput() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("name-screen").classList.remove("hidden");
}

// 이름 입력 후 → 스토리 시작
function startStory() {
  const nameInput = document.getElementById("player-name").value.trim();
  if (!nameInput) {
    alert("이름을 입력하세요.");
    return;
  }
  selectedCharacter = nameInput;

  // 스토리 복제해서 사용 (원본 훼손 방지)
  currentStory = JSON.parse(JSON.stringify(stories["attack"]));

  // 첫 번째 텍스트에 이름을 반영
  currentStory[0].content = `웰컴, ${selectedCharacter}! 당신은 조사병단 훈련병으로 입단했다.`;

  // 화면 전환
  document.getElementById("name-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");

  // 스토리 출력
  currentStep = 0;
  displayStep();
}

// 스토리 한 단계 출력
function displayStep() {
  const step = currentStory[currentStep];
  const storyBox = document.getElementById("story-box");
  const choiceBox = document.getElementById("choice-buttons");
  const nextBtn = document.getElementById("next-button");
  const beforeBtn = document.getElementById("before-button");

  // 선택지 영역 초기화
  choiceBox.innerHTML = "";
  choiceBox.classList.add("hidden");

  if (!step) {
    // 스토리가 끝나면 엔딩 화면으로
    document.getElementById("story-screen").classList.add("hidden");
    document.getElementById("ending-screen").classList.remove("hidden");
    return;
  }

  if (step.type === "text") {
    // 일반 텍스트 출력
    storyBox.innerText = step.content;
    nextBtn.style.display = "inline-block";
    beforeBtn.style.display = currentStep > 0 ? "inline-block" : "none";
  }
  else if (step.type === "choice") {
    // 선택지 화면으로 전환
    storyBox.innerText = "";
    nextBtn.style.display = "none";
    beforeBtn.style.display = "none";

    step.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      // button-group 내부 버튼 스타일
      btn.style.width = "100%";
      btn.style.fontSize = "1.1rem";
      btn.style.padding = "12px 0";
      btn.onclick = () => {
        // 선택 결과 먼저 보여주기
        storyBox.innerText = choice.result;

        // 만약 '동료를 구한다'를 선택했다면 바로 엔딩으로 (게임오버)
        if (choice.text === "동료를 구한다") {
          setTimeout(() => {
            document.getElementById("story-screen").classList.add("hidden");
            document.getElementById("ending-screen").classList.remove("hidden");
          }, 2000);
          return;
        }

        // 그 외 선택지는 currentStep을 증가시키고, 1.5초 뒤 다음 스텝 출력
        currentStep++;
        setTimeout(() => {
          displayStep();
        }, 1500);
      };
      choiceBox.appendChild(btn);
    });

    choiceBox.classList.remove("hidden");
  }
}

// 다음 버튼 클릭 시
function nextStory() {
  currentStep++;
  displayStep();
}

// 이전 버튼 클릭 시
function beforeStory() {
  if (currentStep > 0) {
    currentStep--;
    displayStep();
  }
}

// 처음으로 돌아가기 (페이지 리로드)
function goHome() {
  location.reload();
}
