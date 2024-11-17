const score = document.getElementById("score");
const timer = document.getElementById("timer");
const endOverlay = document.getElementById("end-overlay");
const messageBox = document.querySelector("#end-overlay div");
const newGameButton = document.querySelector("#end-overlay button");
const cardsWrapper = document.querySelector("div .cards-wrapper");

let minutes = 1;
let seconds = 30;
let interval = null;

function displayTimer() {
  const minutesText = `${minutes}`.padStart(2, "0");
  const secondsText = `${seconds}`.padStart(2, "0");
  timer.innerHTML = `Time:&nbsp;${minutesText}:${secondsText}`;
}

export function startTimer() {
  if (interval) return;
  interval = setInterval(updateTimer, 1000);
}

export function stopTimer() {
  clearInterval(interval);
  interval = null;
}

export function updateTimer() {
  if (seconds === 0 && minutes === 0) {
    stopTimer();
    cardsWrapper.classList.remove("active");
    cardsWrapper.closest(".memory-game").classList.remove("start");

    messageBox.innerHTML = `Time's up!<br> 
                        <p>Your ${score.innerText}</p>`;
    newGameButton.innerHTML = "Try Again?";
    endOverlay.classList.add("active");
    return;
  }

  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  displayTimer();
}

export function resetTimer() {
  stopTimer();
  minutes = 1;
  seconds = 30;
  displayTimer();
}
