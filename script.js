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
  ],
 
function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("choice-screen").classList.remove("hidden");
  currentStory = stories['attack']; // 진격의 거인 스토리 자동 설정
  currentStep = 0;
  displayStep();

}

function selectCharacter(character) {
  selectedCharacter = character; // 선택한 캐릭터 저장
  document.getElementById("character-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");
  currentStory = stories['attack']; // ✅ 선택 없이 바로 '진격의 거인' 진행
  currentStep = 0;
  displayStep();
}

function displayStep() {
  const step = currentStory[currentStep];
  const storyBox = document.getElementById("story-box");
  const choiceBox = document.getElementById("choices-container");
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
      btn.onclick = () => {
        storyBox.innerText = choice.result;
        nextBtn.style.display = "block";
        
        choiceBox.classList.add("hidden"); // ✅ 선택 후 버튼 숨김
        currentStep++;

        if (choice.text === "동료를 구한다") {
          document.getElementById("story-screen").classList.add("hidden");
          document.getElementById("ending-screen").classList.remove("hidden");
        }
      };
      choiceBox.appendChild(btn);
    });

    choiceBox.classList.remove("hidden");
    nextBtn.style.display = "none";
    storyBox.innerText = ""; // "선택하세요" 제거
  }
}

function nextStory() {
  currentStep++;
  displayStep();
}

function goHome() {
  location.reload(); // 초기화
}
