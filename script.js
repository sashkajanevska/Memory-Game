import { displayCardFront, displayCardBack } from "./cardContentDisplay.js";
import {
  startTimer,
  updateTimer,
  stopTimer,
  resetTimer,
} from "./timerDisplay.js";

const score = document.getElementById("score");
const resetButton = document.getElementById("reset-button");
const startOverlay = document.getElementById("start-overlay");
const startButton = document.getElementById("start-button");
const endOverlay = document.getElementById("end-overlay");
const messageBox = document.querySelector("#end-overlay div");
const newGameButton = document.querySelector("#end-overlay button");
const cardsWrapper = document.querySelector("div .cards-wrapper");
const cardsArray = document.querySelectorAll("div .card");
let hasFlippedCard;
let firstCard, secondCard;
let lockBoard;
let count = 0;


// GAME LOGIC

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkMatch();
}

function checkMatch() {
  let first = firstCard.lastChild.dataset.name;
  let second = secondCard.lastChild.dataset.name;
  let isMattch = first === second;

  isMattch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  count++;
  score.innerHTML = `Score:&nbsp;${count}/${cardsArray.length / 2}`;

  resetBoard();
  checkScore();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1500);
}

function checkScore() {
  if (count === 12) {
    stopTimer();
    setTimeout(() => {
      cardsWrapper.classList.remove("active");

      messageBox.innerHTML = "Rock On!";
      newGameButton.innerHTML = "Play Again?";
      endOverlay.classList.add("active", "success");
    }, 500);
    return;
  }
  updateTimer();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


// GAME START/GAME RESET

function startGame() {
  startOverlay.classList.remove("active");
  endOverlay.classList.remove("active");
  messageBox.innerHTML = "";
  newGameButton.innerHTML = "";

  for (let card of cardsArray) {
    card.innerHTML = "";
    card.classList.remove("flipped");
    cardsArray.forEach((card) => card.addEventListener("click", flipCard));
  }

  displayCardBack();
  displayCardFront();

  setTimeout(() => {
    cardsWrapper.classList.add("active");
    cardsWrapper.closest(".memory-game").classList.add("start");
    startTimer();
  }, 200);
}

function resetGame() {
  resetTimer();
  startGame();

  count = 0;
  score.innerHTML = `Score:&nbsp;${count}/${cardsArray.length / 2}`;
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
