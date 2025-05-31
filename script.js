document.getElementById('start-button').addEventListener('click', () => {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('choice-screen').style.display = 'block';
});

document.querySelectorAll('.choice-button').forEach(button => {
  button.addEventListener('click', () => {
    const anime = button.dataset.anime;
    let story = "";

    if (anime === "attack") {
      story = "당신은 거인을 처치하는 조사병단의 신병입니다...";
    } else if (anime === "haikyuu") {
      story = "당신은 카라스노 고교의 새로운 세터입니다...";
    }

    document.getElementById('choice-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('story-text').innerText = story;
  });
});

document.getElementById('home-button').addEventListener('click', () => {
  location.reload();
});
document.getElementById('home-button-game').addEventListener('click', () => {
  location.reload();
});
