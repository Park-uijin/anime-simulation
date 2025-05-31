const startScreen = document.getElementById('start-screen');
    const choiceScreen = document.getElementById('choice-screen');
    const gameScreen = document.getElementById('game-screen');
    const introText = document.getElementById('intro-text');
    const choicesDiv = document.getElementById('choices');

    function goToStart() {
      startScreen.classList.remove('hidden');
      choiceScreen.classList.add('hidden');
      gameScreen.classList.add('hidden');
    }

    function goToChoice() {
      startScreen.classList.add('hidden');
      choiceScreen.classList.remove('hidden');
    }

    function startGame(anime) {
      choiceScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');

      let text = '';
      let options = [];

      if (anime === 'attack') {
        text = '...눈을 떴다. 거대한 벽이 눈앞에 펼쳐졌다.';
        options = ['조사병단에 입단한다', '헌병단에 입단한다', '도망친다다'];
      } else if (anime === 'haikyu') {
        text = '...눈을 떴다. 체육관의 소리가 들려온다.';
        options = ['히나타에게 말을 건다', '카게야마에게 말을 건다'];
      }

      introText.innerText = text;
      choicesDiv.innerHTML = '';
      choicesDiv.style.position = 'absolute';
      choicesDiv.style.bottom = '50px';
      choicesDiv.style.display = 'flex';
      choicesDiv.style.gap = '20px';

      options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.onclick = () => alert(`선택한 행동: ${option}`);
        choicesDiv.appendChild(btn);
      });
    }
