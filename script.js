// ─── script.js ───────────────────────────────────────────────────

// 전역 변수 선언
let currentStep = 0;       // 현재 스텝 인덱스
let currentStory = [];     // 현재 화면에 보여주는 스토리 배열
let currentKey = "";       // 현재 사용 중인 스토리 키
let selectedCharacter = ""; // 플레이어 이름

// 배경 맵 (분기별 배경 이미지 경로)
const bgMap = {
  default:      'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/start-bg.jpg',
  attack_root:  'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/root-bg.jpg',
  attack_fight: 'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/fight-bg.jpg',
  attack_run:   'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/run-bg.jpg',
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
          result: "무기를 들고 앞으로 나아갔다.",
          nextKey: "attack_fight"
        },
        {
          text: "도망친다",
          result: "월 로제로 도망친다.",
          nextKey: "attack_run"
        }
      ]
    }
  ],

  attack_fight: [
    { type: "text", content: "나아갔지만 공포에 사로잡혀 몸이 움직이지 않는다." },
    { type: "text", content: "기괴한 거인이 다가왔다." },
    { type: "text", content: ".........." },
    { type: "text", content: "${name}은 그 자리에서 거인의 핏방울에 물들었다. 사망했다."}
  ],

  attack_run: [
    { type: "text", content: "${name}은 필사적으로 도망쳤다." },
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
          result: "${name}은 월 로제를 나가 전쟁터로 향했다.",
          nextKey: "attack_get"
        }
      ]
    }
  ],

  attack_test: [
    { type: "text", content: "훈련이 생각한 것보다 더 힘들다." },
    { type: "text", content: "이렇게 저렇게 하다보니 살아남았다." },
    { type: "text", content: "동료들과 유대를 쌓았다." },
    { type: "text", content: "......<몇 년 후>" },
    { type: "text", content: "드디어 훈련이 끝났다." },
    {
      type: "choice",
      choices: [
        {
          text: "편한 헌병단에 입단한다.",
          result: "${name}은 왕을 호위하러 헌병단에 입단했다.",
          nextKey: "attack_in"
        },
        {
          text: "힘든 조사병단에 입단한다.",
          result: "벽외 조사를 나간다.",
          nextKey: "attack_out"
        }
      ]
    }
  ],

  attack_get: [
    { type: "text", content: "안전한 월 로제에서 벗어났으므로 ${name}은 사망했다." }
  ],

  attack_out: [
    { type: "text", content: "${name}은 조사병단에 입단해 힘겨운 임무를 수행한다." },
    { type: "text", content: "벽 밖을 처음 나가본다." },
    { type: "text", content: "세계의 비밀을 밝혀내야한다." },
    {
      type: "choice",
      choices: [
        {
          text: "숨겨진 비밀이 있는 지하실로 간다.",
          result: "지하실로 내려간다.",
          nextKey: "attack_plan"
        }
      ]
    }
  ],

  attack_in: [
    { type: "text", content: "${name}은 헌병단에 입단해 왕을 호위하게 되었다." },
    { type: "text", content: "다른 병단에 비해 하는 게 별로 없다." },
    { type: "text", content: "그로 인해 술을 너무 마셔서 거인이 되었다." }
  ],

  attack_plan: [
    { type: "text", content: "지하실을 둘러봤다." },
    { type: "text", content: "잠겨진 서랍을 발견했다." },
    { type: "text", content: "서랍을 뿌셔서 의문의 책을 발견했다." },
    { type: "text", content: "세계의 진실이 담겨있다." }
  ]
};

// ─── 책 이미지 애니메이션 함수 ────────────────────────────────────
function showBookAnimation() {
  const img = document.createElement("img");
  img.src = 'https://raw.githubusercontent.com/Park-uijin/anime-simulation/main/book.png';
  img.alt = "의문의 책";
  img.className = "book-image";
  document.body.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 3000);
}

// ─── 시작 화면 → 이름 입력 화면 전환 ─────────────────────────────────
function goToNameInput() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("name-screen").classList.remove("hidden");
}


// ─── 이름 입력 후 스토리 시작 ────────────────────────────────────────
function startStory() {
  const nameInput = document.getElementById("player-name").value.trim();
  if (!nameInput) {
    alert("이름을 입력하세요.");
    return;
  }
  alert("입력된 이름: " + nameInput);
  selectedCharacter = nameInput;

  // 루트 스토리 로드
  currentKey = "attack_root";
  currentStory = JSON.parse(JSON.stringify(stories[currentKey]));
  changeBackground();

  currentStory.forEach(step=>{
  if (step.type==="text"){
    step.content = replaceName(step.content);
  }else if (step.type==="choice"){
    step.choices.forEach(c=>{
      c.result = replaceName(c.result);
    });
  }
});

  document.getElementById("name-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");

  currentStep = 0;
  displayStep();
}

const $ = sel => document.getElementById(sel);

// util
function replaceName(str){
  return str.replace(/\$\{name\}/g, selectedCharacter);
}

function changeBackground() {
  document.body.style.backgroundImage =
    `url('${bgMap[currentKey] || bgMap.default}')`;
}

function loadBranch(key){
  currentKey   = key;
  currentStory = JSON.parse(JSON.stringify(stories[key]))
                      .map(step => {
                        if (step.type === "text"){
                          step.content = replaceName(step.content);
                        }else if(step.type === "choice"){
                          step.choices.forEach(c=>{
                            c.result = replaceName(c.result);
                          });
                        }
                        return step;
                      });
  changeBackground();
  currentStep = 0;
  displayStep();
}

// ─── 스토리 한 스텝씩 렌더링 ────────────────────────────────────────
function displayStep() {
  const step   = currentStory[currentStep];
  const box    = $("story-box");
  const cBox   = $("choice-buttons");
  const next   = $("next-button");
  const prev   = $("before-button");
  const home   = $("home-button");
  const endScr = $("ending-screen");
  const cusScr = $("custom-ending-screen");

  
  
  nextBtn.style.display = "inline-block";
  beforeBtn.style.display = "inline-block";
  if (homeBtn) homeBtn.style.display = "inline-block"; // null 안전 처리


  [next, prev, home].forEach(el => el && el.classList.remove("hidden"));
  
  // 선택지 영역 초기화
  cBox.innerHTML = "";
  cBox.classList.add("hidden");

  // 1) 지금 스텝이 없으면 → 엔딩 처리
  if (!step) {
    $("story-screen").classList.add("hidden");
    if (currentKey === "attack_plan") {
      cusScr.classList.remove("hidden");
    } else {
      endScr.classList.remove("hidden");
    }
    return;
  }

  // --- 텍스트 스텝 -------------------------------------
  if (step.type === "text") {
    box.style.display = "block";

    const line = replaceName(step.content);
    const prevStep = currentStory[currentStep - 1];
    box.innerText = (prevStep && prevStep.type === "text")
                    ? box.innerText + "\n" + line
                    : line;

    next.style.display = "inline-block";
    prev.style.display = currentStep > 0 ? "inline-block" : "none";

    if (currentKey === "attack_plan" &&
        step.content.includes("의문의 책을 발견했다")) {
      showBookAnimation();
    }
    return;
  }

  // 3) 선택지 스텝 처리
    // --- 선택지 스텝 -------------------------------------
  if (step.type === "choice") {

    box.style.display  = "none";
    next.style.display = prev.style.display = "none";

    step.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (choice.nextKey) {           // 바로 분기로
          loadBranch(choice.nextKey);
          return;
        }
        // 분기 없으면 결과 보여주고 다음 스텝
        box.style.display = "block";
        box.innerHTML = `<span class="bold-text">${choice.result}</span>`;
        setTimeout(() => { currentStep++; displayStep(); }, 1500);
      };
      cBox.appendChild(btn);
    });
      
    cBox.classList.remove("hidden");
  }
}

function nextStory()   { currentStep++; displayStep(); }
function beforeStory() { if (currentStep>0) { currentStep--; displayStep(); } }

// ─── “처음으로” 버튼 클릭 시 (페이지 새로고침) ─────────────────────────
function goHome() {
  location.reload();
}

