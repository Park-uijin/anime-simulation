// ─── script.js ───────────────────────────────────────────────────

// 전역 변수 선언
let currentStep = 0;       // 현재 스텝 인덱스
let currentStory = [];     // 현재 화면에 보여주는 스토리 배열
let currentKey = "";       // 현재 사용 중인 스토리 키 (예: "attack_root", "attack_run" 등)
let selectedCharacter = "";// 플레이어 이름 (필요할 경우 사용)

const bgMap = {
  default:    'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/start-bg.jpg',
  attack_fight: 'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/fight-bg.jpg',
  attack_run:   'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/root-bg.jpg',
  attack_test:  'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/test-bg.jpg',
  attack_get:   'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/get-bg.jpg',
  attack_out:   'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/out-bg.jpg',
  attack_in:    'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/in-bg.jpg',
  attack_plan:  'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/plan-bg.jpg'
};

// ─── 스토리 데이터 정의 ────────────────────────────────────────────
const stories = {
  attack_root: [
    { type: "text", content: "눈을 뜨니 세상이 빨갛다." },
    { type: "text", content: "거인이 침입해 문이 뚫렸고, 이제 선택이 필요하다." },
    {
      type: "choice",
      choices: [
        {
          text: "싸운다",
          result: "당신은 무기를 들고 앞으로 나아갔다.",
          nextKey: "attack_fight"   // <-- 이 분기로 넘어갑니다
        },
        {
          text: "도망친다",
          result: "월 로제로 도망친다.",
          nextKey: "attack_run"
        }
      ]
    }
  ],

  // ――――――――――――――――――――――――――――――――――――――――――――――――――――――
  // (2) “싸운다” 분기: choice 없이 순수 텍스트만 작성
  attack_fight: [
    // 이곳에 텍스트만 넣으면, 배열이 끝나자마자 displayStep()에서 `step`이 undefined가 되어 엔딩 화면으로 넘어갑니다.
    { type: "text", content: "나아갔지만 공포에 사로잡혀 몸이 움직이지 않는다." },
    { type: "text", content: "거인이 기괴하게 다가오고 있다." },
    { type: "text", content: ".........." },
    { type: "text", content: "붉은 피가 흩어지며 ${selectedCharacter}은 그 자리에서 먹혔다. 사망했다." }
    // 배열 끝〈여기까지〉 → displayStep()에서 step이 undefined가 되어 엔딩 화면으로 이동
  ],

  // (3) “도망친다” 분기 등 다른 분기는 그대로 두거나 필요에 따라 수정
  attack_run: [
    { type: "text", content: "${selectedCharacter}은 필사적으로 도망쳤다," },
    { type: "text", content: "뒤에서 비명과 울음이 뒤섞인 소리가 난다…" },
    { type: "text", content: "다행히 배에 탑승해 월 로제에 도착했다." },
    {
      type: "choice",
      choices: [
        {
          text: "훈련병이 된다.",
          result: "고된 훈련을 받는다.",
          nextKey: "attack_test"
        },
        {
          text: "식량난 해결을 위해 전쟁에 간다.",
          result: "월 로제를 나가게 되었다.",
          nextKey: "attack_get"
        }
      ]
    }
  ],
  // (4) "훈련병이 된다"
  attack_test: [
    { type: "text", content: "훈련이 생각한 것보다 더 힘들다."},
    { type: "text", content: "이렇게 저렇게 하다보니 살아남았다."},
    { type: "text", content: "동료들과 유대를 쌓았다. 장과 친해졌다."},
    { type: "text", content: "......<몇 년 후>"},
    { type: "text", content: "드디어 훈련이 끝났다."},
    { 
      type: "choice",
      choices: [
        {
          text: "힘든 조사병단에 입단한다.",
          result: "벽외 조사를 나간다.",
          nextKey: "attack_out"
        },
        {
          text: "편한 헌병단에 입단한다.",
          result: "왕을 호위하러 벽의 가장 안쪽으로 간다.",
          nextKey: "attack_in"
        }
      ]
    }    
  ], 
  // (5) " 식량 전쟁에 참여한다."
  attack_get: [
    { type: "text", content: "안전한 월 로제에서 벗어났으므로 ${selectedCharacter}은 사망했다." }
  ],
  // (6) "조사병단에 입단"
  attack_out: [
    { type: "text", content: "${selectedCharacter}은 조사병단에 입단해 힘겨운 임무를 수행한다." },
    { type: "text", content: "벽 밖을 처음 나가본다."},
    { type: "text", content: "세계의 비밀을 밝혀내야한다."},
    { 
      type: "choice",
      choices: [
        {
          text: "숨겨진 비밀이 있는 지하실로 간다.",
          result: "내려간다.",
          nextKey: "attack_plan"
        }
      ]
    }    
  ], 
  //(7) "헌병단에 입단"
  attack_in: [
    { type: "text", content: "${selectedCharacter}은 헌병단에 입단해 왕을 호위하게 되었다." },
    { type: "text", content: "다른 병단에 비해 하는 게 별로 없다."},
    { type: "text", content: "그로 인해 술을 너무 마셔서 거인이 되었다."}
  ],
  //(8) "숨겨진 비밀이 있는 지하실로 간다."
  attack_plan: [
    { type: "text", content: "지하실을 둘러봤다." },
    { type: "text", content: "잠겨진 서랍을 발견했다." },
    { type: "text", content: "서랍을 뿌셔서 의문의 책을 발견했다." },
    { type: "text", content: "세계의 진실이 담겨있다." },
  ]
};

// ─── 게임 흐름 함수 정의 
────────────────────────────────────────────

function showBookAnimation() {
  // book.png는 프로젝트에 반드시 존재해야 합니다. 혹은 URL을 넣어주세요.
  const img = document.createElement("img");
  img.src = 'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/book.png'; 
  img.alt = "의문의 책";
  img.className = "book-image";
  document.body.appendChild(img);

  // 3초 뒤에 자동으로 책 이미지 제거 (필요에 따라 시간 조정)
  setTimeout(() => {
    img.remove();
  }, 3000);
}

// 시작 화면 → 이름 입력 화면으로 전환
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
  alert("입력된 이름: " + nameInput);
  selectedCharacter = nameInput;

  // 루트 스토리(attack_root) 로드
  currentKey = "attack_root";
  currentStory = JSON.parse(JSON.stringify(stories[currentKey]));

  document.body.style.backgroundImage = `url('${bgMap.default}')`;

  // 플레이어 이름 반영 구문이 있다면(예: stories의 텍스트 안에 ${selectedCharacter} 등),
  // 현재 예시에는 ‘거인이 ’ 뒤에 이름을 넣고 싶다면 아래처럼 조정할 수도 있습니다.
  // (지금은 예시 텍스트가 Player 이름을 넣도록 설계되어 있진 않기 때문에 생략)

  // 화면 전환: 이름 입력 화면 숨기고, 스토리 화면 보여주기
  document.getElementById("name-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");

  currentStep = 0;
  displayStep();
}

// 스토리 한 스텝씩 화면에 그려주는 함수
function displayStep() {
  const step = currentStory[currentStep];
  const storyBox = document.getElementById("story-box");
  const choiceBox = document.getElementById("choice-buttons");
  const nextBtn = document.getElementById("next-button");
  const beforeBtn = document.getElementById("before-button");
  const endingScreen = document.getElementById("ending-screen");
  const customEnding = document.getElementById("custom-ending");

  customEnding.classList.add("hidden");

  // 1) 선택지 영역 초기화
  choiceBox.innerHTML = "";
  choiceBox.classList.add("hidden");

  // 2) 스텝이 존재하지 않으면 (배열 끝) → 엔딩 화면으로 이동
  if (!step) {
    document.getElementById("story-screen").classList.add("hidden");
    document.getElementById("ending-screen").classList.remove("hidden");
    return;
  }

  // 3) 스텝 타입에 따라 분리
  if (!step) {
    // “숨겨진 비밀이 있는 지하실” 분기에서 custom ending 출력
    if (currentKey === "attack_plan") {
      // 스토리 화면 완전히 숨기기
      document.getElementById("story-screen").classList.add("hidden");
      // 커스텀 엔딩 텍스트 삽입 및 표시
      customEnding.textContent = "진실은 애니를 통해 확인하세요";
      customEnding.classList.remove("hidden");
    } else {
      // 기본 엔딩 화면
      document.getElementById("story-screen").classList.add("hidden");
      endingScreen.classList.remove("hidden");
    }
    return;
  }  

  if (step.type === "text") {
    // ── 텍스트 스텝 ──────────────────────────────────────
    storyBox.style.display = "block";

    // 이전 스텝이 text 타입이면 이어 붙이기, 아니면 새로 쓰기
    const prevStep = currentStory[currentStep - 1];
    if (prevStep && prevStep.type === "text") {
      storyBox.innerText += "\n" + step.content;
    } else {
      storyBox.innerText = step.content;
    }

    // “다음” 버튼만 표시 (“이전” 버튼은 currentStep > 0일 때만)
    nextBtn.style.display = "inline-block";
    beforeBtn.style.display = currentStep > 0 ? "inline-block" : "none";

    if (
      currentKey === "attack_plan" &&
      step.content.includes("의문의 책을 발견했다")
    ) {
      showBookAnimation();
    }
  }
  else if (step.type === "choice") {
    // ── 선택지 스텝 ──────────────────────────────────────
    storyBox.style.display = "none";   // 텍스트 박스 완전 숨김
    nextBtn.style.display = "none";    // 다음 버튼 숨김
    beforeBtn.style.display = "none";  // 이전 버튼 숨김

    // choice 버튼들 생성
    step.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = choice.text;
      btn.style.width = "100%";
      btn.style.fontSize = "1.1rem";
      btn.style.padding = "12px 0";

     btn.onclick = () => {
        // 1) 배경 먼저 변경 (nextKey가 정의되어 있을 때만)
        if (choice.nextKey && bgMap[choice.nextKey]) {
          document.body.style.backgroundImage = `url('${bgMap[choice.nextKey]}')`;
        }
        storyBox.style.display = "block";
        storyBox.innerText = choice.result;
        
        // 2) result 텍스트만 굵게 표시
        storyBox.style.display = "block";
        storyBox.innerHTML = `<span class="bold-text">${choice.result}</span>`;

        // 3) 3초 뒤에 분기 처리
        setTimeout(() => {
          // nextKey가 없으면(=null) → 기존 스토리에서 다음 스텝으로 넘어가기
          if (!choice.nextKey) {
            currentStep++;
            displayStep();
            return;
          }

          // nextKey가 있으면 → 분기 키로 스토리 배열 교체
          currentKey = choice.nextKey;
          currentStory = JSON.parse(JSON.stringify(stories[currentKey]));
          currentStep = 0;
          displayStep();
        }, 4000);
      };

      choiceBox.appendChild(btn);
    });

    choiceBox.classList.remove("hidden");
  }
}

// “다음” 버튼 클릭 시
function nextStory() {
  currentStep++;
  displayStep();
}

// “이전” 버튼 클릭 시
function beforeStory() {
  if (currentStep > 0) {
    currentStep--;
    displayStep();
  }
}

// “처음으로” 버튼 (페이지 새로고침)
function goHome() {
  location.reload();
}

  
// ────────────────────────────────────────────────────────────────────