/*
File: script.js
Enhanced logic: varied spawn pattern over 45s, spark effect on click, updated feedback thresholds including 80% tier.
*/
console.log("💖 script.js loaded");
window.addEventListener('DOMContentLoaded', () => {
  const bgMusic      = document.getElementById('bgMusic');
  const introScreen  = document.getElementById('intro-screen');
  const infoScreen   = document.getElementById('info-screen');
  const gameScreen   = document.getElementById('game-screen');
  const introBtn     = document.getElementById('intro-button');
  const startBtn     = document.getElementById('start-button');
  const gameArea     = document.getElementById('game-area');
  const scoreDiv     = document.getElementById('score');
  const messageDiv   = document.getElementById('message');
  let score = 0, totalSpawned = 0;

  introBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    infoScreen.classList.remove('hidden');
  });

  startBtn.addEventListener('click', () => {
    infoScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startGame();
  });

  function startGame() {
    bgMusic.play();
    score = 0; totalSpawned = 0;
    scoreDiv.textContent = 'Score: 0';
    messageDiv.textContent = '';
    const totalTime = 45000; // 45 seconds
    const startTime = Date.now();

    function scheduleSpawn() {
      const elapsed = Date.now() - startTime;
      if (elapsed >= totalTime) {
        endGame();
        return;
      }
      spawnHeart();
      const elapsedSec = elapsed / 1000;
      let interval;
      if (elapsedSec < 9) interval = 1200;        // slow
      else if (elapsedSec < 18) interval = 800;  // a bit faster
      else if (elapsedSec < 27) interval = 400;  // fast
      else if (elapsedSec < 36) interval = 1200; // slow again
      else interval = 400;                        // fast finale
      setTimeout(scheduleSpawn, interval);
    }
    scheduleSpawn();
  }

  function spawnHeart() {
    totalSpawned++;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '❤️';
    const size = 40;
    const x = Math.random() * (gameArea.clientWidth - size);
    const y = Math.random() * (gameArea.clientHeight - size);
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.addEventListener('click', () => {
      score++;
      scoreDiv.textContent = `Score: ${score}`;
      heart.classList.add('spark');
      setTimeout(() => heart.remove(), 600);
    });
    gameArea.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }

  function endGame() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    removeAllHearts();
    const percent = Math.round((score / totalSpawned) * 100);
    let comment;
    if (percent >= 80) {
      comment = `Incredible, ${percent}%! You caught almost every heart! Nihar adores you! 🌟`;
    } else if (percent >= 70) {
      comment = `Wow, ${percent}%! Nihar loves you a lot! ❤️`;
    } else if (percent >= 60) {
      comment = `Great, you caught ${percent}% of hearts! You’re amazing! 💕`;
    } else if (percent >= 50) {
      comment = `Nice, ${percent}% caught! You’re getting closer to my heart! 💖`;
    } else if (percent >= 40) {
      comment = `Okay, ${percent}% caught! Not bad, but give it another shot! 😊`;
    } else {
      comment = `Oh no, only ${percent}%... Focus Pahi, focus! But don't worry, Nihar still loves you.`;
    }
    messageDiv.textContent = `Time's up! You caught ${score} hearts (${percent}%). ${comment}`;
  }

  function removeAllHearts() {
    document.querySelectorAll('.heart').forEach(el => el.remove());
  }
});